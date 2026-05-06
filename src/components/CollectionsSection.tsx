/* =============================================================================
   COLLECTIONS SECTION — Art Deco Noir Luxe
   Product grid with rose gold card borders, hover glow effects.
   ============================================================================= */

import { useEffect, useRef } from "react";
import { ShoppingBag, Eye } from "lucide-react";
import { toast } from "sonner";

const PRODUCTS_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663427685673/fHpYESz6PQmULupxkcDoCU/products-banner-ktaw88KDxmaM3mWVCaFzkS.webp";

const collections = [
  {
    id: 1,
    name: "Silky Straight Bundle",
    category: "Hair Extensions",
    price: "$189",
    originalPrice: "$240",
    description: "100% virgin Remy human hair. Silky smooth, tangle-free, and full of body.",
    badge: "Bestseller",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop",
  },
  {
    id: 2,
    name: "Body Wave Lace Front",
    category: "Wigs",
    price: "$349",
    originalPrice: null,
    description: "Pre-plucked HD lace front wig with natural hairline. 180% density.",
    badge: "New Arrival",
    img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Deep Wave Closure",
    category: "Closures",
    price: "$129",
    originalPrice: "$160",
    description: "5x5 HD lace closure with deep wave pattern. Bleached knots.",
    badge: null,
    img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop",
  },
  {
    id: 4,
    name: "Luxury Repair Serum",
    category: "Hair Care",
    price: "$68",
    originalPrice: null,
    description: "Argan oil & keratin infused serum for ultimate shine and repair.",
    badge: "Limited",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=500&fit=crop",
  },
  {
    id: 5,
    name: "Kinky Curly Bundle",
    category: "Hair Extensions",
    price: "$199",
    originalPrice: null,
    description: "Natural kinky curly texture. Blends seamlessly with natural hair.",
    badge: null,
    img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=500&fit=crop",
  },
  {
    id: 6,
    name: "Loose Deep Wave Wig",
    category: "Wigs",
    price: "$399",
    originalPrice: "$450",
    description: "Full lace wig with loose deep wave pattern. 13x6 lace frontal.",
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=500&fit=crop",
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
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
                  style={{ background: "oklch(0.06 0.004 285 / 0.7)" }}
                >
                  <button
                    onClick={() => toast(`Added "${product.name}" to cart!`)}
                    className="p-3 transition-all duration-200 hover:scale-110"
                    style={{
                      background: "oklch(0.68 0.09 22)",
                      color: "oklch(0.08 0.004 285)",
                    }}
                  >
                    <ShoppingBag size={18} />
                  </button>
                  <button
                    onClick={() => toast(`Viewing "${product.name}" — Full details coming soon!`)}
                    className="p-3 transition-all duration-200 hover:scale-110"
                    style={{
                      background: "oklch(0.16 0.006 285)",
                      border: "1px solid oklch(0.68 0.09 22 / 50%)",
                      color: "oklch(0.80 0.07 22)",
                    }}
                  >
                    <Eye size={18} />
                  </button>
                </div>
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
                    <span
                      className="font-['Playfair_Display'] text-xl font-bold"
                      style={{ color: "oklch(0.80 0.07 22)" }}
                    >
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span
                        className="font-['Cormorant_Garamond'] text-sm line-through"
                        style={{ color: "oklch(0.50 0.02 60)" }}
                      >
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toast(`Added "${product.name}" to cart!`)}
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
                    Add to Cart
                  </button>
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
    </section>
  );
}
