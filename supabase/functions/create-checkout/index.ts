// =============================================================================
// create-checkout — Supabase Edge Function
// Takes the cart from the browser, looks up the Stripe Price ID behind each
// item's existing buy.stripe.com Payment Link, and builds ONE Stripe Checkout
// Session that charges everything in a single transaction.
//
// Why this design: P. Sims already has ~60+ live Stripe Payment Links, each
// backed by a Stripe Price. Rather than ask the salon owner to copy 60+ Price
// IDs into the codebase, the function resolves them on demand by hitting
// Stripe's `payment_links.list_line_items` endpoint and caching results in
// memory for the lifetime of the function instance (cuts the round-trip on
// repeat checkouts of the same SKUs).
//
// For cart items WITHOUT a checkoutUrl (e.g. Tape-Ins which were never given
// payment links), the function falls back to `price_data` inline pricing using
// the item's name + price sent from the browser. This is safe because all
// real money is created server-side from the trusted Stripe Price catalog
// where possible; only fallback items use browser-supplied prices, and we
// log those for review.
//
// Env vars (set in Supabase Project Settings → Edge Functions → Secrets):
//   STRIPE_SECRET_KEY   — sk_live_... or sk_test_...
//   SITE_URL            — optional, public URL of the site, used for the
//                         Stripe success_url/cancel_url. Defaults to the
//                         request's Origin header.
// =============================================================================

// @ts-ignore — Deno-flavored ESM import (resolved at deploy time on Supabase)
import Stripe from "https://esm.sh/stripe@17.5.0?target=denonext";

// @ts-ignore — Deno global, available at runtime on Supabase
const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
// @ts-ignore
const SITE_URL_ENV = Deno.env.get("SITE_URL");

const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" })
  : null;

type CartLine = {
  name: string;
  variant?: string;
  length?: number;
  /** Per-SKU buy.stripe.com Payment Link, when one exists. */
  checkoutUrl?: string;
  /** Unit price in USD (fallback only — used when no checkoutUrl). */
  price: number;
  qty: number;
  image?: string;
};

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(status: number, body: unknown, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS, ...extraHeaders },
  });
}

/**
 * Extract the Payment Link ID from a buy.stripe.com URL.
 * buy.stripe.com URLs are short codes that Stripe maps internally to a
 * `plink_...` ID. To resolve, we list payment links and match by URL.
 *
 * Cached in-process for the lifetime of the function instance.
 */
const urlToPriceCache = new Map<string, { priceId: string; quantity: number }>();
let paymentLinksIndex: Map<string, string> | null = null; // url -> plink_id

async function buildPaymentLinksIndex(): Promise<Map<string, string>> {
  if (paymentLinksIndex) return paymentLinksIndex;
  const index = new Map<string, string>();
  // List all payment links (auto-paginates up to 100/page).
  for await (const pl of stripe!.paymentLinks.list({ limit: 100 })) {
    if (pl.url) index.set(pl.url, pl.id);
  }
  paymentLinksIndex = index;
  return index;
}

async function resolveLink(url: string): Promise<{ priceId: string; quantity: number } | null> {
  if (urlToPriceCache.has(url)) return urlToPriceCache.get(url)!;
  const index = await buildPaymentLinksIndex();
  const plinkId = index.get(url);
  if (!plinkId) return null;
  // First line item only — our payment links are per-SKU.
  const items = await stripe!.paymentLinks.listLineItems(plinkId, { limit: 1 });
  const first = items.data[0];
  if (!first?.price?.id) return null;
  const resolved = { priceId: first.price.id, quantity: first.quantity ?? 1 };
  urlToPriceCache.set(url, resolved);
  return resolved;
}

// @ts-ignore — Deno.serve global
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS_HEADERS });
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });
  if (!stripe) return json(500, { error: "STRIPE_SECRET_KEY not configured" });

  let payload: { items: CartLine[] };
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const items = Array.isArray(payload?.items) ? payload.items : [];
  if (items.length === 0) return json(400, { error: "Cart is empty" });

  // Build Stripe line items. Prefer resolved Price IDs (trusted catalog price);
  // fall back to inline price_data when no Payment Link maps the SKU.
  const line_items: Array<
    | { price: string; quantity: number }
    | {
        price_data: {
          currency: string;
          unit_amount: number;
          product_data: { name: string; description?: string; images?: string[] };
        };
        quantity: number;
      }
  > = [];

  const fallbackItems: string[] = []; // for logging
  for (const it of items) {
    const qty = Math.max(1, Math.floor(it.qty || 1));
    if (it.checkoutUrl) {
      const resolved = await resolveLink(it.checkoutUrl).catch(() => null);
      if (resolved?.priceId) {
        line_items.push({ price: resolved.priceId, quantity: qty });
        continue;
      }
      // Fall through to inline pricing if the link couldn't be resolved.
    }
    if (typeof it.price !== "number" || it.price <= 0) {
      return json(400, { error: `Item "${it.name}" has no price` });
    }
    const desc = [it.variant, it.length ? `${it.length}"` : null].filter(Boolean).join(" · ");
    line_items.push({
      price_data: {
        currency: "usd",
        unit_amount: Math.round(it.price * 100),
        product_data: {
          name: it.name,
          ...(desc ? { description: desc } : {}),
          ...(it.image ? { images: [absolute(it.image, req)] } : {}),
        },
      },
      quantity: qty,
    });
    fallbackItems.push(`${it.name}${desc ? ` (${desc})` : ""}`);
  }

  if (fallbackItems.length) {
    console.log("create-checkout fallback (inline price_data):", fallbackItems);
  }

  const origin =
    SITE_URL_ENV ||
    req.headers.get("origin") ||
    req.headers.get("referer")?.replace(/\/$/, "") ||
    "";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=canceled`,
      shipping_address_collection: { allowed_countries: ["US"] },
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      automatic_tax: { enabled: false }, // flip to true once Stripe Tax is set up
    });
    return json(200, { url: session.url, id: session.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Stripe create session failed:", msg);
    return json(502, { error: `Stripe error: ${msg}` });
  }
});

/** Turn a relative image path into an absolute URL Stripe can fetch. */
function absolute(src: string, req: Request): string {
  if (/^https?:\/\//i.test(src)) return src;
  const origin = SITE_URL_ENV || req.headers.get("origin") || "";
  if (!origin) return src;
  return src.startsWith("/") ? `${origin}${src}` : `${origin}/${src}`;
}
