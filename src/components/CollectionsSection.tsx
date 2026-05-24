/* =============================================================================
   COLLECTIONS SECTION — Art Deco Noir Luxe
   Product grid with rose gold card borders, hover glow effects.
   ============================================================================= */

import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Sparkles, ChevronLeft, ChevronRight, X } from "lucide-react";
import { toast } from "sonner";

const PRODUCTS_IMG = "/images/gallery/photo-03.jpg";

type Length = { in: number; price?: number; checkoutUrl?: string };

type Variant = {
  name: string;
  description?: string;
  img: string;
  gallery?: string[];
  lengths: Length[];
  comingSoon?: boolean;
};

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice: string | null;
  description: string;
  badge: string | null;
  img: string;
  gallery?: string[];
  lengths?: Length[];
  variants?: Variant[];
  comingSoon?: boolean;
};

// Lowest known price across a product's lengths (or all its variants' lengths).
function fromPriceOf(product: Product): number | null {
  const lens = product.variants
    ? product.variants.flatMap((v) => v.lengths)
    : product.lengths ?? [];
  const priced = lens.filter((l) => l.price != null).map((l) => l.price as number);
  return priced.length ? Math.min(...priced) : null;
}

const collections: Product[] = [
  {
    id: 1,
    name: "Straight · Loose Wave · Body Wave Bundle",
    category: "Hair Extensions",
    price: "$180",
    originalPrice: null,
    description: "100% virgin Remy human hair bundles. Choose your texture.",
    badge: "Bestseller",
    img: "/images/gallery/photo-15.jpg",
    variants: [
      {
        name: "Straight",
        description:
          "Silky straight 100% virgin Remy human hair — smooth, tangle-free, and full of body.",
        img: "/images/gallery/photo-15.jpg",
        gallery: [
          "/images/gallery/photo-15.jpg",
          "/images/gallery/photo-13.jpg",
          "/images/gallery/photo-14.jpg",
          "/images/gallery/photo-16.jpg",
        ],
        lengths: [
          { in: 12, price: 180, checkoutUrl: "https://buy.stripe.com/28E7sDgMK7yK0Kjc5Kfbq02" },
          { in: 14, price: 185, checkoutUrl: "https://buy.stripe.com/dRmdR1aomaKW0Kj8Tyfbq03" },
          { in: 16, price: 190, checkoutUrl: "https://buy.stripe.com/14A14f542bP0dx54Difbq04" },
          { in: 18, price: 195, checkoutUrl: "https://buy.stripe.com/9B67sDfIGcT4ct16Lqfbq05" },
          { in: 20, price: 200, checkoutUrl: "https://buy.stripe.com/3cI9ALdAyf1c64DedSfbq06" },
          { in: 22, price: 210, checkoutUrl: "https://buy.stripe.com/7sY14feECg5g64D7Pufbq07" },
          { in: 24, price: 220, checkoutUrl: "https://buy.stripe.com/5kQaEP2VU6uG0Kj5Hmfbq09" },
          { in: 26, price: 230, checkoutUrl: "https://buy.stripe.com/dRm6ozgMK7yKct10n2fbq08" },
          { in: 28, price: 240, checkoutUrl: "https://buy.stripe.com/8x24grgMKcT478H2vafbq0a" },
          { in: 30, price: 250, checkoutUrl: "https://buy.stripe.com/fZu28j8ge4myct18Tyfbq0b" },
        ],
      },
      {
        name: "Loose Wave",
        description: "Loose wave bundles.",
        img: "/images/gallery/photo-04.jpg",
        lengths: [],
        comingSoon: true,
      },
      {
        name: "Body Wave",
        description: "Body wave bundles.",
        img: "/images/gallery/photo-09.jpg",
        lengths: [],
        comingSoon: true,
      },
    ],
  },
  {
    id: 2,
    name: "HD Lace Wigs",
    category: "Wigs",
    price: "$—",
    originalPrice: null,
    description: "Choose your construction — 13×4 HD lace frontal or 5×5 HD closure.",
    badge: "New Arrival",
    img: "/images/gallery/photo-05.jpg",
    variants: [
      {
        name: "13×4 HD Lace Frontal Wig",
        description:
          "Pre-plucked 13×4 HD lace frontal wig with a natural, melt-into-skin hairline.",
        img: "/images/gallery/photo-17.jpg",
        gallery: ["/images/gallery/photo-17.jpg", "/images/gallery/photo-05.jpg"],
        lengths: [
          { in: 14, price: 239.88, checkoutUrl: "https://buy.stripe.com/aFa28j3ZY1am8cLc5Kfbq0c" },
          { in: 18, price: 299.99, checkoutUrl: "https://buy.stripe.com/7sY5kv2VU6uGdx50n2fbq0e" },
          { in: 20, price: 349.99, checkoutUrl: "https://buy.stripe.com/8x23cnaom06i0Kjgm0fbq0f" },
          { in: 22, price: 434.99, checkoutUrl: "https://buy.stripe.com/eVq28j542aKWboX0n2fbq0g" },
          // 24" ($474.99) pending — need the full Stripe URL
        ],
      },
      {
        name: "5×5 HD Closure Wig",
        description:
          "5×5 HD lace closure wig. Glueless, beginner-friendly, and natural-looking.",
        img: "/images/gallery/photo-18.jpg",
        gallery: ["/images/gallery/photo-18.jpg", "/images/gallery/photo-19.jpg"],
        lengths: [
          { in: 14, price: 199.99, checkoutUrl: "https://buy.stripe.com/fZu6oz6863iu1On0n2fbq0k" },
          { in: 18, price: 239.99, checkoutUrl: "https://buy.stripe.com/cNicMX1RQf1cakT1r6fbq0l" },
          { in: 20, price: 299.99, checkoutUrl: "https://buy.stripe.com/9B600bdAy7yK8cL4Difbq0n" },
          { in: 22, price: 349.99, checkoutUrl: "https://buy.stripe.com/eVq28j3ZY8CO8cL8Tyfbq0p" },
          { in: 24, price: 399.99, checkoutUrl: "https://buy.stripe.com/4gMdR1dAy4my1On6Lqfbq0q" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Deep Wave Closure",
    category: "Closures",
    price: "$129",
    originalPrice: "$160",
    description: "5x5 HD lace closure with deep wave pattern. Bleached knots.",
    badge: null,
    img: "/images/gallery/photo-06.jpg",
    gallery: [
      "/images/gallery/photo-06.jpg",
      "/images/gallery/photo-20.jpg",
      "/images/gallery/photo-21.jpg",
      "/images/gallery/photo-22.jpg",
    ],
    lengths: [
      { in: 12, price: 129 },
      { in: 14, price: 149 },
      { in: 16, price: 169 },
      { in: 18, price: 199 },
    ],
  },
  {
    id: 4,
    name: "Luxury Repair Serum",
    category: "Hair Care",
    price: "$68",
    originalPrice: null,
    description: "Argan oil & keratin infused serum for ultimate shine and repair.",
    badge: "Limited",
    img: "/images/gallery/photo-07.jpg",
    comingSoon: true,
  },
  {
    id: 5,
    name: "Kinky Curly Bundle",
    category: "Hair Extensions",
    price: "$199",
    originalPrice: null,
    description: "Natural kinky curly texture. Blends seamlessly with natural hair.",
    badge: null,
    img: "/images/gallery/photo-08.jpg",
    gallery: [
      "/images/gallery/photo-08.jpg",
      "/images/gallery/photo-23.jpg",
      "/images/gallery/photo-24.jpg",
      "/images/gallery/photo-25.jpg",
    ],
    lengths: [
      { in: 12, price: 199 },
      { in: 14, price: 219 },
      { in: 16, price: 239 },
      { in: 18, price: 269 },
      { in: 20, price: 299 },
      { in: 22, price: 329 },
      { in: 24, price: 359 },
    ],
  },
  {
    id: 6,
    name: "Loose Deep Wave Wig",
    category: "Wigs",
    price: "$399",
    originalPrice: "$450",
    description: "Full lace wig with loose deep wave pattern. 13x6 lace frontal.",
    badge: "Sale",
    img: "/images/gallery/photo-02.jpg",
    gallery: [
      "/images/gallery/photo-02.jpg",
      "/images/gallery/photo-26.jpg",
      "/images/gallery/photo-28.jpg",
      "/images/gallery/photo-29.jpg",
    ],
    lengths: [
      { in: 14, price: 399 },
      { in: 16, price: 429 },
      { in: 18, price: 469 },
      { in: 20, price: 509 },
      { in: 22, price: 559 },
      { in: 24, price: 609 },
    ],
  },
];

const badgeColors: Record<string, string> = {
  Bestseller: "oklch(0.68 0.09 22)",
  "New Arrival": "oklch(0.52 0.10 22)",
  Limited: "oklch(0.40 0.08 22)",
  Sale: "oklch(0.68 0.09 22)",
};

export default function CollectionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [shopProduct, setShopProduct] = useState<Product | null>(null);
  const [variantIndex, setVariantIndex] = useState<number | null>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [lengthIndex, setLengthIndex] = useState(0);

  const openShop = (product: Product) => {
    setShopProduct(product);
    setVariantIndex(null);
    setImgIndex(0);
    setLengthIndex(0);
  };
  const closeShop = () => setShopProduct(null);
  const chooseVariant = (idx: number) => {
    setVariantIndex(idx);
    setImgIndex(0);
    setLengthIndex(0);
  };
  const backToVariants = () => setVariantIndex(null);

  useEffect(() => {
    if (!shopProduct) return;
    const inPicker = !!shopProduct.variants?.length && variantIndex === null;
    const detail = shopProduct.variants?.length
      ? shopProduct.variants[variantIndex ?? 0]
      : shopProduct;
    const photos = detail.gallery?.length ? detail.gallery : [detail.img];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeShop();
      else if (!inPicker && e.key === "ArrowRight")
        setImgIndex((i) => (i + 1) % photos.length);
      else if (!inPicker && e.key === "ArrowLeft")
        setImgIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shopProduct, variantIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("visible");
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.08 0.004 285)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 reveal">
          <span className="section-label mb-4">Our Collections</span>
          <h2
            className="font-['Playfair_Display'] font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "oklch(0.93 0.02 60)" }}
          >
            Signature{" "}
            <span
              className="italic"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.09 22), oklch(0.85 0.07 22))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Hair
            </span>{" "}
            Pieces
          </h2>
          <div className="deco-divider w-48 my-4">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect
                x="1"
                y="1"
                width="12"
                height="12"
                transform="rotate(45 7 7)"
                stroke="oklch(0.68 0.09 22)"
                strokeWidth="1"
              />
            </svg>
          </div>
          <p
            className="font-['Cormorant_Garamond'] text-lg max-w-xl leading-relaxed"
            style={{ color: "oklch(0.65 0.02 60)" }}
          >
            Each piece is meticulously sourced and crafted to deliver unparalleled quality, beauty, and confidence.
          </p>
        </div>

        {/* Products Banner */}
        <div className="reveal mb-16 relative overflow-hidden" style={{ height: "280px" }}>
          <img
            src={PRODUCTS_IMG}
            alt="Luxury Hair Products"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.06 0.004 285 / 0.8), oklch(0.06 0.004 285 / 0.4))",
            }}
          >
            <div className="text-center">
              <p
                className="font-['Josefin_Sans'] text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "oklch(0.68 0.09 22)" }}
              >
                Premium Quality
              </p>
              <h3
                className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold"
                style={{ color: "oklch(0.93 0.02 60)" }}
              >
                100% Virgin Remy Human Hair
              </h3>
            </div>
          </div>
          {/* Deco border */}
          <div
            className="absolute inset-3 pointer-events-none"
            style={{ border: "1px solid oklch(0.68 0.09 22 / 30%)" }}
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((product, i) => (
            <div
              key={product.id}
              className="reveal card-deco group relative overflow-hidden"
              style={{
                background: "oklch(0.11 0.005 285)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Badge */}
              {product.badge && (
                <div
                  className="absolute top-4 left-4 z-10 px-3 py-1"
                  style={{
                    background: badgeColors[product.badge] || "oklch(0.68 0.09 22)",
                    color: "oklch(0.08 0.004 285)",
                  }}
                >
                  <span className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.15em] uppercase font-600">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: "280px" }}>
                {product.comingSoon ? (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-3 text-center px-4"
                    style={{ background: "oklch(0.13 0.006 285)" }}
                  >
                    <Sparkles size={30} style={{ color: "oklch(0.68 0.09 22)" }} />
                    <span
                      className="font-['Playfair_Display'] text-2xl font-bold"
                      style={{ color: "oklch(0.85 0.07 22)" }}
                    >
                      Coming Soon
                    </span>
                    <span
                      className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.25em] uppercase"
                      style={{ color: "oklch(0.55 0.02 60)" }}
                    >
                      Restocking shortly
                    </span>
                  </div>
                ) : (
                  <>
                    <img
                      src={product.img}
                      alt={product.name}
                      onClick={() => openShop(product)}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none"
                      style={{ background: "oklch(0.06 0.004 285 / 0.7)" }}
                    >
                      <button
                        onClick={() => openShop(product)}
                        className="flex items-center gap-2 px-5 py-2.5 font-['Josefin_Sans'] text-[0.65rem] tracking-[0.2em] uppercase transition-all duration-200 hover:scale-105 pointer-events-auto"
                        style={{
                          background: "oklch(0.68 0.09 22)",
                          color: "oklch(0.08 0.004 285)",
                        }}
                      >
                        <ShoppingBag size={16} /> Shop Now
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <span
                  className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.2em] uppercase"
                  style={{ color: "oklch(0.68 0.09 22)" }}
                >
                  {product.category}
                </span>
                <h3
                  className="font-['Playfair_Display'] text-lg font-semibold mt-1 mb-2"
                  style={{ color: "oklch(0.93 0.02 60)" }}
                >
                  {product.name}
                </h3>
                <p
                  className="font-['Cormorant_Garamond'] text-sm leading-relaxed mb-4"
                  style={{ color: "oklch(0.60 0.02 60)" }}
                >
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    {fromPriceOf(product) != null ? (
                      <>
                        <span
                          className="font-['Cormorant_Garamond'] text-xs italic"
                          style={{ color: "oklch(0.55 0.02 60)" }}
                        >
                          from
                        </span>
                        <span
                          className="font-['Playfair_Display'] text-xl font-bold"
                          style={{ color: "oklch(0.80 0.07 22)" }}
                        >
                          ${fromPriceOf(product)}
                        </span>
                      </>
                    ) : product.variants ? (
                      <span
                        className="font-['Cormorant_Garamond'] text-base italic"
                        style={{ color: "oklch(0.70 0.04 60)" }}
                      >
                        {product.variants.length} styles
                      </span>
                    ) : (
                      <span
                        className="font-['Playfair_Display'] text-xl font-bold"
                        style={{ color: "oklch(0.80 0.07 22)" }}
                      >
                        {product.price}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span
                        className="font-['Cormorant_Garamond'] text-sm line-through"
                        style={{ color: "oklch(0.50 0.02 60)" }}
                      >
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.comingSoon ? (
                    <span
                      className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2"
                      style={{ color: "oklch(0.55 0.02 60)" }}
                    >
                      Coming Soon
                    </span>
                  ) : (
                    <button
                      onClick={() => openShop(product)}
                      className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 transition-all duration-200"
                      style={{
                        border: "1px solid oklch(0.68 0.09 22 / 60%)",
                        color: "oklch(0.80 0.07 22)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "oklch(0.68 0.09 22 / 15%)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      Shop Now
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom deco line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.68 0.09 22), transparent)",
                }}
              />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="flex justify-center mt-14 reveal">
          <button
            className="btn-outline-gold"
            onClick={() => toast("Full catalog coming soon!")}
          >
            View Full Collection
          </button>
        </div>
      </div>

      {/* Shop Now — style picker + product detail */}
      {shopProduct &&
        (() => {
          const isVariant = !!shopProduct.variants?.length;
          const inPicker = isVariant && variantIndex === null;
          const detail = isVariant
            ? shopProduct.variants![variantIndex ?? 0]
            : shopProduct;
          const photos = detail.gallery?.length ? detail.gallery : [detail.img];
          const lens = detail.lengths ?? [];
          const selected = lens[lengthIndex];
          return (
            <div
              className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto"
              style={{ background: "oklch(0.04 0.004 285 / 0.92)" }}
              onClick={closeShop}
            >
              <div
                className="relative w-full max-w-4xl my-auto"
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "oklch(0.10 0.005 285)",
                  border: "1px solid oklch(0.68 0.09 22 / 30%)",
                }}
              >
                <button
                  onClick={closeShop}
                  aria-label="Close"
                  className="absolute top-3 right-3 z-20 p-2 transition-transform hover:scale-110"
                  style={{
                    background: "oklch(0.08 0.004 285 / 0.6)",
                    color: "oklch(0.85 0.07 22)",
                  }}
                >
                  <X size={22} />
                </button>

                {inPicker ? (
                  /* STEP 1 — choose a style */
                  <div className="p-6 lg:p-10">
                    <span
                      className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.25em] uppercase"
                      style={{ color: "oklch(0.68 0.09 22)" }}
                    >
                      {shopProduct.category}
                    </span>
                    <h3
                      className="font-['Playfair_Display'] text-2xl lg:text-3xl font-bold mt-1 mb-2"
                      style={{ color: "oklch(0.95 0.02 60)" }}
                    >
                      {shopProduct.name}
                    </h3>
                    <p
                      className="font-['Cormorant_Garamond'] text-base leading-relaxed mb-6"
                      style={{ color: "oklch(0.65 0.02 60)" }}
                    >
                      {shopProduct.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {shopProduct.variants!.map((v, idx) => {
                        const vPriced = v.lengths
                          .filter((l) => l.price != null)
                          .map((l) => l.price as number);
                        const vFrom = vPriced.length ? Math.min(...vPriced) : null;
                        const soon = v.comingSoon;
                        return (
                          <button
                            key={v.name}
                            onClick={soon ? undefined : () => chooseVariant(idx)}
                            disabled={soon}
                            className={`group text-left overflow-hidden transition-all duration-200 ${
                              soon ? "cursor-not-allowed" : "hover:scale-[1.02]"
                            }`}
                            style={{
                              background: "oklch(0.12 0.005 285)",
                              border: "1px solid oklch(0.68 0.09 22 / 30%)",
                            }}
                          >
                            <div
                              className="relative overflow-hidden"
                              style={{ aspectRatio: "4 / 5" }}
                            >
                              <img
                                src={v.img}
                                alt={v.name}
                                className={`w-full h-full object-cover transition-transform duration-500 ${
                                  soon ? "opacity-40" : "group-hover:scale-110"
                                }`}
                              />
                              {soon && (
                                <div
                                  className="absolute inset-0 flex items-center justify-center font-['Josefin_Sans'] text-[0.6rem] tracking-[0.25em] uppercase"
                                  style={{
                                    background: "oklch(0.06 0.004 285 / 0.55)",
                                    color: "oklch(0.85 0.07 22)",
                                  }}
                                >
                                  Coming Soon
                                </div>
                              )}
                            </div>
                            <div className="p-3">
                              <span
                                className="font-['Playfair_Display'] text-base font-semibold block"
                                style={{ color: "oklch(0.93 0.02 60)" }}
                              >
                                {v.name}
                              </span>
                              <span
                                className="font-['Cormorant_Garamond'] text-sm"
                                style={{ color: "oklch(0.68 0.09 22)" }}
                              >
                                {soon
                                  ? "Coming soon"
                                  : vFrom != null
                                  ? `from $${vFrom}`
                                  : `${v.lengths.length} lengths`}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* STEP 2 — selected product detail */
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {isVariant && (
                      <button
                        onClick={backToVariants}
                        className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-2 font-['Josefin_Sans'] text-[0.6rem] tracking-[0.15em] uppercase transition-transform hover:scale-105"
                        style={{
                          background: "oklch(0.08 0.004 285 / 0.6)",
                          color: "oklch(0.85 0.07 22)",
                        }}
                      >
                        <ChevronLeft size={16} /> Styles
                      </button>
                    )}

                    {/* Gallery */}
                    <div style={{ background: "oklch(0.06 0.004 285)" }}>
                      <div
                        className="relative overflow-hidden"
                        style={{ aspectRatio: "4 / 5" }}
                      >
                        <img
                          src={photos[imgIndex]}
                          alt={detail.name}
                          className="w-full h-full object-cover"
                        />
                        {photos.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setImgIndex((i) => (i - 1 + photos.length) % photos.length)
                              }
                              aria-label="Previous photo"
                              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 transition-transform hover:scale-110"
                              style={{
                                background: "oklch(0.08 0.004 285 / 0.6)",
                                color: "oklch(0.85 0.07 22)",
                              }}
                            >
                              <ChevronLeft size={22} />
                            </button>
                            <button
                              onClick={() => setImgIndex((i) => (i + 1) % photos.length)}
                              aria-label="Next photo"
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 transition-transform hover:scale-110"
                              style={{
                                background: "oklch(0.08 0.004 285 / 0.6)",
                                color: "oklch(0.85 0.07 22)",
                              }}
                            >
                              <ChevronRight size={22} />
                            </button>
                          </>
                        )}
                      </div>
                      {photos.length > 1 && (
                        <div className="flex gap-2 p-3 overflow-x-auto">
                          {photos.map((p, idx) => (
                            <button
                              key={idx}
                              onClick={() => setImgIndex(idx)}
                              aria-label={`Photo ${idx + 1}`}
                              className="shrink-0 transition-opacity"
                              style={{
                                border:
                                  idx === imgIndex
                                    ? "2px solid oklch(0.80 0.07 22)"
                                    : "2px solid transparent",
                                opacity: idx === imgIndex ? 1 : 0.6,
                              }}
                            >
                              <img src={p} alt="" className="w-12 h-14 object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-6 lg:p-8 flex flex-col">
                      <span
                        className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.25em] uppercase"
                        style={{ color: "oklch(0.68 0.09 22)" }}
                      >
                        {shopProduct.category}
                      </span>
                      <h3
                        className="font-['Playfair_Display'] text-2xl lg:text-3xl font-bold mt-1 mb-3"
                        style={{ color: "oklch(0.95 0.02 60)" }}
                      >
                        {detail.name}
                      </h3>

                      {(selected?.price != null ||
                        (!isVariant && shopProduct.originalPrice)) && (
                        <div className="flex items-baseline gap-3 mb-4">
                          {selected?.price != null && (
                            <span
                              className="font-['Playfair_Display'] text-2xl font-bold"
                              style={{ color: "oklch(0.80 0.07 22)" }}
                            >
                              ${selected.price}
                            </span>
                          )}
                          {!isVariant && shopProduct.originalPrice && (
                            <span
                              className="font-['Cormorant_Garamond'] text-base line-through"
                              style={{ color: "oklch(0.50 0.02 60)" }}
                            >
                              {shopProduct.originalPrice}
                            </span>
                          )}
                        </div>
                      )}

                      <p
                        className="font-['Cormorant_Garamond'] text-base leading-relaxed mb-6"
                        style={{ color: "oklch(0.65 0.02 60)" }}
                      >
                        {detail.description ?? shopProduct.description}
                      </p>

                      {lens.length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.2em] uppercase"
                              style={{ color: "oklch(0.80 0.07 22)" }}
                            >
                              Length
                            </span>
                            {selected && (
                              <span
                                className="font-['Cormorant_Garamond'] text-sm"
                                style={{ color: "oklch(0.60 0.02 60)" }}
                              >
                                {selected.in}" selected
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {lens.map((l, idx) => {
                              const active = idx === lengthIndex;
                              return (
                                <button
                                  key={l.in}
                                  onClick={() => setLengthIndex(idx)}
                                  className="font-['Playfair_Display'] text-sm font-semibold px-3.5 py-2 transition-all duration-200"
                                  style={{
                                    border: active
                                      ? "1px solid oklch(0.80 0.07 22)"
                                      : "1px solid oklch(0.68 0.09 22 / 30%)",
                                    background: active
                                      ? "oklch(0.68 0.09 22 / 15%)"
                                      : "transparent",
                                    color: active
                                      ? "oklch(0.90 0.05 22)"
                                      : "oklch(0.75 0.03 60)",
                                  }}
                                >
                                  {l.in}"
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          if (selected?.checkoutUrl) {
                            window.location.href = selected.checkoutUrl;
                          } else {
                            toast(
                              selected
                                ? `Added ${detail.name} — ${selected.in}"${
                                    selected.price != null ? ` — $${selected.price}` : ""
                                  } to your bag`
                                : `Added ${detail.name} to your bag`
                            );
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 font-['Josefin_Sans'] text-xs tracking-[0.2em] uppercase py-3.5 mt-auto transition-all duration-200 hover:opacity-90"
                        style={{
                          background: "oklch(0.68 0.09 22)",
                          color: "oklch(0.08 0.004 285)",
                        }}
                      >
                        <ShoppingBag size={16} />
                        {selected?.checkoutUrl ? "Buy Now" : "Add to Bag"}
                        {selected?.price != null ? ` · $${selected.price}` : ""}
                      </button>

                      <p
                        className="font-['Cormorant_Garamond'] text-xs text-center mt-3 leading-relaxed"
                        style={{ color: "oklch(0.55 0.02 60)" }}
                      >
                        Free U.S. shipping over $200. To complete your order, text{" "}
                        <a href="tel:+17703835824" style={{ color: "oklch(0.80 0.07 22)" }}>
                          (770) 383-5824
                        </a>{" "}
                        or DM us on Instagram.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
    </section>
  );
}
