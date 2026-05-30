/* =============================================================================
   CART DRAWER — Art Deco Noir Luxe
   Slide-out cart from the right. Matches the rose-gold-on-noir palette used
   across the site. Renders nothing when closed (still mounted, but offscreen).

   The Checkout button intentionally shows a "coming soon" toast right now — it
   will be wired to a Supabase Edge Function that creates a Stripe Checkout
   Session from `items` (see [[cart-checkout-decision]] in memory).
   ============================================================================= */

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

export default function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, updateQty, removeItem } =
    useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    // TODO: POST cart items to Supabase Edge Function `create-checkout`, then
    // window.location.href = data.url. Until that's deployed, fall back to the
    // existing per-item Stripe Payment Link if there's only one item, otherwise
    // tell the customer how to complete a multi-item order.
    if (items.length === 1 && items[0].checkoutUrl) {
      window.location.href = items[0].checkoutUrl;
      return;
    }
    toast(
      "Multi-item checkout is being set up. To complete your order now, text (770) 383-5824 or DM us on Instagram — we'll send a single invoice for all items."
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "oklch(0.04 0.004 285 / 0.7)", backdropFilter: "blur(2px)" }}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-[61] h-full w-full sm:w-[420px] flex flex-col transition-transform duration-400 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "oklch(0.08 0.004 285)",
          borderLeft: "1px solid oklch(0.68 0.09 22 / 25%)",
          boxShadow: "-20px 0 60px oklch(0.04 0.004 285 / 0.6)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid oklch(0.68 0.09 22 / 20%)" }}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} style={{ color: "oklch(0.80 0.07 22)" }} />
            <h2
              className="font-['Playfair_Display'] text-xl font-bold tracking-wide"
              style={{ color: "oklch(0.93 0.02 60)" }}
            >
              Your Bag
            </h2>
            {count > 0 && (
              <span
                className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.2em] uppercase px-2 py-0.5"
                style={{
                  background: "oklch(0.68 0.09 22 / 15%)",
                  color: "oklch(0.85 0.07 22)",
                  border: "1px solid oklch(0.68 0.09 22 / 30%)",
                }}
              >
                {count} {count === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 transition-colors"
            style={{ color: "oklch(0.75 0.03 60)" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Art-deco hairline */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.68 0.09 22 / 60%), transparent)",
          }}
        />

        {/* Items / Empty State */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
            <ShoppingBag size={42} style={{ color: "oklch(0.68 0.09 22 / 50%)" }} />
            <p
              className="font-['Playfair_Display'] text-2xl italic"
              style={{ color: "oklch(0.85 0.07 22)" }}
            >
              Your bag is empty
            </p>
            <p
              className="font-['Cormorant_Garamond'] text-base leading-relaxed"
              style={{ color: "oklch(0.65 0.02 60)" }}
            >
              Browse our collections and add a few pieces to begin.
            </p>
            <button
              onClick={closeCart}
              className="mt-2 font-['Josefin_Sans'] text-[0.65rem] tracking-[0.25em] uppercase px-5 py-3 transition-all hover:opacity-90"
              style={{
                background: "oklch(0.68 0.09 22)",
                color: "oklch(0.08 0.004 285)",
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="flex flex-col gap-4">
              {items.map((it) => (
                <li
                  key={it.key}
                  className="flex gap-4 p-3"
                  style={{
                    background: "oklch(0.10 0.004 285)",
                    border: "1px solid oklch(0.68 0.09 22 / 15%)",
                  }}
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-20 h-24 object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <p
                      className="font-['Playfair_Display'] text-sm font-semibold truncate"
                      style={{ color: "oklch(0.93 0.02 60)" }}
                    >
                      {it.name}
                    </p>
                    {(it.variant || it.length) && (
                      <p
                        className="font-['Cormorant_Garamond'] text-xs italic mt-0.5"
                        style={{ color: "oklch(0.65 0.02 60)" }}
                      >
                        {[it.variant, it.length ? `${it.length}"` : null]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                    <div className="mt-auto pt-2 flex items-center justify-between">
                      {/* Qty controls */}
                      <div
                        className="inline-flex items-center"
                        style={{ border: "1px solid oklch(0.68 0.09 22 / 30%)" }}
                      >
                        <button
                          onClick={() => updateQty(it.key, it.qty - 1)}
                          aria-label="Decrease quantity"
                          className="px-2 py-1 transition-colors"
                          style={{ color: "oklch(0.80 0.07 22)" }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          className="font-['Playfair_Display'] text-sm px-3 min-w-[2ch] text-center"
                          style={{ color: "oklch(0.93 0.02 60)" }}
                        >
                          {it.qty}
                        </span>
                        <button
                          onClick={() => updateQty(it.key, it.qty + 1)}
                          aria-label="Increase quantity"
                          className="px-2 py-1 transition-colors"
                          style={{ color: "oklch(0.80 0.07 22)" }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span
                        className="font-['Playfair_Display'] text-sm font-bold"
                        style={{ color: "oklch(0.80 0.07 22)" }}
                      >
                        ${(it.price * it.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(it.key)}
                    aria-label={`Remove ${it.name}`}
                    className="self-start p-1 transition-colors"
                    style={{ color: "oklch(0.55 0.02 60)" }}
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div
            className="px-6 py-5 flex flex-col gap-3"
            style={{ borderTop: "1px solid oklch(0.68 0.09 22 / 20%)" }}
          >
            <div className="flex items-baseline justify-between">
              <span
                className="font-['Josefin_Sans'] text-[0.65rem] tracking-[0.25em] uppercase"
                style={{ color: "oklch(0.75 0.03 60)" }}
              >
                Subtotal
              </span>
              <span
                className="font-['Playfair_Display'] text-2xl font-bold"
                style={{ color: "oklch(0.85 0.07 22)" }}
              >
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p
              className="font-['Cormorant_Garamond'] text-xs italic"
              style={{ color: "oklch(0.60 0.02 60)" }}
            >
              Free U.S. shipping on orders over $200. Taxes calculated at checkout.
            </p>
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 font-['Josefin_Sans'] text-xs tracking-[0.25em] uppercase py-3.5 transition-all hover:opacity-90"
              style={{
                background: "oklch(0.68 0.09 22)",
                color: "oklch(0.08 0.004 285)",
              }}
            >
              Checkout · ${subtotal.toFixed(2)}
            </button>
            <button
              onClick={closeCart}
              className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.25em] uppercase py-2 transition-colors"
              style={{ color: "oklch(0.75 0.03 60)" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
