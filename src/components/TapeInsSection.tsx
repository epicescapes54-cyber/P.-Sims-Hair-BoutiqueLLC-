/* =============================================================================
   TAPE-INS SECTION — Art Deco Noir Luxe
   Product detail experience: texture + length pickers, delivery estimate,
   product details, and care instructions.
   ============================================================================= */

import { useEffect, useMemo, useRef, useState } from "react";
import { Truck, Info, Sparkles, ShieldCheck, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const TAPE_IMG =
  "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=900&h=1100&fit=crop";

const textures = [
  { name: "Silky Straight", pattern: "straight" },
  { name: "Body Wave", pattern: "body-wave" },
  { name: "Loose Wave", pattern: "loose-wave" },
  { name: "Deep Wave", pattern: "deep-wave" },
  { name: "Kinky Curly", pattern: "kinky-curly" },
  { name: "Curly", pattern: "curly" },
] as const;

const lengths = [12, 14, 16, 18, 20, 22, 24, 26];

const BASE_PRICE = 189;
const PRICE_PER_INCH_OVER_16 = 12;

function TexturePattern({ pattern }: { pattern: (typeof textures)[number]["pattern"] }) {
  const stroke = "oklch(0.80 0.07 22)";
  const faint = "oklch(0.80 0.07 22 / 50%)";

  if (pattern === "straight") {
    return (
      <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={6 + i * 8.5} y1="6" x2={6 + i * 8.5} y2="94" stroke={i % 2 === 0 ? stroke : faint} strokeWidth="1" />
        ))}
      </svg>
    );
  }
  if (pattern === "body-wave") {
    return (
      <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={i} d={`M${4 + i * 13} 6 Q${10 + i * 13} 30 ${4 + i * 13} 50 T${4 + i * 13} 94`} fill="none" stroke={i % 2 === 0 ? stroke : faint} strokeWidth="1" />
        ))}
      </svg>
    );
  }
  if (pattern === "loose-wave") {
    return (
      <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 5 }).map((_, i) => (
          <path key={i} d={`M${6 + i * 16} 6 Q${18 + i * 16} 35 ${6 + i * 16} 60 T${6 + i * 16} 94`} fill="none" stroke={i % 2 === 0 ? stroke : faint} strokeWidth="1" />
        ))}
      </svg>
    );
  }
  if (pattern === "deep-wave") {
    return (
      <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={i} d={`M${4 + i * 13} 6 Q${15 + i * 13} 22 ${4 + i * 13} 40 T${4 + i * 13} 74 T${4 + i * 13} 94`} fill="none" stroke={i % 2 === 0 ? stroke : faint} strokeWidth="1" />
        ))}
      </svg>
    );
  }
  if (pattern === "kinky-curly") {
    return (
      <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 24 }).map((_, i) => {
          const cx = 8 + (i % 4) * 21;
          const cy = 10 + Math.floor(i / 4) * 14;
          return <circle key={i} cx={cx} cy={cy} r="3.5" fill="none" stroke={i % 2 === 0 ? stroke : faint} strokeWidth="1" />;
        })}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="none">
      {Array.from({ length: 16 }).map((_, i) => {
        const cx = 10 + (i % 4) * 20;
        const cy = 14 + Math.floor(i / 4) * 22;
        return <path key={i} d={`M${cx - 5} ${cy} Q${cx} ${cy - 7} ${cx + 5} ${cy} T${cx + 15} ${cy}`} fill="none" stroke={i % 2 === 0 ? stroke : faint} strokeWidth="1" />;
      })}
    </svg>
  );
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function deliveryWindow() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() + 3);
  const end = new Date(now);
  end.setDate(now.getDate() + 6);
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export default function TapeInsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [texture, setTexture] = useState<string>("Silky Straight");
  const [length, setLength] = useState<number>(18);
  const [openPanel, setOpenPanel] = useState<"details" | "care" | null>("details");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("visible");
              }, i * 90);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const price = useMemo(() => {
    const extra = Math.max(0, length - 16) * PRICE_PER_INCH_OVER_16;
    return BASE_PRICE + extra;
  }, [length]);

  const window = useMemo(() => deliveryWindow(), []);

  const togglePanel = (panel: "details" | "care") => {
    setOpenPanel((cur) => (cur === panel ? null : panel));
  };

  return (
    <section
      id="tape-ins"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.09 0.004 285)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 reveal">
          <span className="section-label mb-4">Now Available</span>
          <h2
            className="font-['Playfair_Display'] font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "oklch(0.93 0.02 60)" }}
          >
            Seamless{" "}
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
              Tape-In
            </span>{" "}
            Extensions
          </h2>
          <div className="deco-divider w-48 my-3">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="12" height="12" transform="rotate(45 7 7)" stroke="oklch(0.68 0.09 22)" strokeWidth="1" />
            </svg>
          </div>
          <p
            className="font-['Cormorant_Garamond'] text-lg max-w-2xl leading-relaxed"
            style={{ color: "oklch(0.65 0.02 60)" }}
          >
            Discreet medical-grade adhesive wefts crafted from 100% virgin Remy human hair. Built to lay flat against the scalp — invisible from above, weightless all day.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image */}
          <div className="reveal relative">
            <div
              className="absolute -top-4 -left-4 right-8 bottom-8"
              style={{ border: "1px solid oklch(0.68 0.09 22 / 20%)" }}
            />
            <div className="relative overflow-hidden" style={{ height: "560px" }}>
              <img
                src={TAPE_IMG}
                alt="Tape-in extensions"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.06 0.004 285 / 0.45), transparent 50%)",
                }}
              />
              {/* Corner deco */}
              {["top-2 left-2", "top-2 right-2 rotate-90", "bottom-2 right-2 rotate-180", "bottom-2 left-2 -rotate-90"].map(
                (pos, i) => (
                  <svg key={i} className={`absolute ${pos} opacity-70 pointer-events-none`} width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M2 2 L2 14 M2 2 L14 2" stroke="oklch(0.68 0.09 22)" strokeWidth="1.5" />
                  </svg>
                )
              )}
            </div>

            {/* Floating spec card */}
            <div
              className="absolute -bottom-6 -right-6 px-5 py-4 max-w-[14rem]"
              style={{
                background: "oklch(0.08 0.004 285 / 0.97)",
                border: "1px solid oklch(0.68 0.09 22 / 35%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <p
                className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.25em] uppercase mb-1"
                style={{ color: "oklch(0.68 0.09 22)" }}
              >
                Wefts per Pack
              </p>
              <p
                className="font-['Playfair_Display'] text-2xl font-bold"
                style={{ color: "oklch(0.93 0.02 60)" }}
              >
                40 pcs · 100g
              </p>
              <p
                className="font-['Cormorant_Garamond'] text-sm italic mt-1"
                style={{ color: "oklch(0.65 0.02 60)" }}
              >
                Reusable up to 12 months
              </p>
            </div>
          </div>

          {/* Right: Configurator */}
          <div className="flex flex-col gap-7">
            <div className="reveal">
              <span className="section-label mb-3 block">Tape-In Bundle</span>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  className="font-['Playfair_Display'] text-4xl font-bold"
                  style={{ color: "oklch(0.80 0.07 22)" }}
                >
                  ${price}
                </span>
                <span
                  className="font-['Cormorant_Garamond'] text-base italic"
                  style={{ color: "oklch(0.55 0.02 60)" }}
                >
                  {texture} · {length}"
                </span>
              </div>
            </div>

            {/* Texture picker */}
            <div className="reveal">
              <div className="flex items-center justify-between mb-3">
                <h3
                  className="font-['Josefin_Sans'] text-xs tracking-[0.3em] uppercase"
                  style={{ color: "oklch(0.80 0.07 22)" }}
                >
                  Texture
                </h3>
                <span
                  className="font-['Cormorant_Garamond'] text-sm italic"
                  style={{ color: "oklch(0.55 0.02 60)" }}
                >
                  {texture}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {textures.map((t) => {
                  const active = texture === t.name;
                  return (
                    <button
                      key={t.name}
                      onClick={() => setTexture(t.name)}
                      className="group flex flex-col items-stretch text-left transition-all duration-300"
                      style={{
                        border: `1px solid ${active ? "oklch(0.80 0.07 22)" : "oklch(0.68 0.09 22 / 25%)"}`,
                        background: "oklch(0.11 0.005 285)",
                        boxShadow: active ? "0 0 18px oklch(0.68 0.09 22 / 30%)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.68 0.09 22 / 60%)";
                      }}
                      onMouseLeave={(e) => {
                        if (!active) (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.68 0.09 22 / 25%)";
                      }}
                    >
                      <div
                        className="relative overflow-hidden"
                        style={{
                          aspectRatio: "4 / 5",
                          background: "linear-gradient(135deg, oklch(0.10 0.005 285), oklch(0.14 0.006 285))",
                        }}
                      >
                        <div className="absolute inset-0 p-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <TexturePattern pattern={t.pattern} />
                        </div>
                      </div>
                      <div
                        className="px-2 py-1.5 text-center"
                        style={{ borderTop: "1px solid oklch(0.68 0.09 22 / 15%)" }}
                      >
                        <span
                          className="font-['Playfair_Display'] text-xs font-semibold leading-tight"
                          style={{ color: active ? "oklch(0.85 0.07 22)" : "oklch(0.93 0.02 60)" }}
                        >
                          {t.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Length picker */}
            <div className="reveal">
              <div className="flex items-center justify-between mb-3">
                <h3
                  className="font-['Josefin_Sans'] text-xs tracking-[0.3em] uppercase"
                  style={{ color: "oklch(0.80 0.07 22)" }}
                >
                  Length (Inches)
                </h3>
                <span
                  className="font-['Cormorant_Garamond'] text-sm italic"
                  style={{ color: "oklch(0.55 0.02 60)" }}
                >
                  {length}" selected
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {lengths.map((n) => {
                  const active = length === n;
                  const fillPct = ((n - 10) / 18) * 100;
                  return (
                    <button
                      key={n}
                      onClick={() => setLength(n)}
                      className="flex flex-col items-stretch transition-all duration-300"
                      style={{
                        border: `1px solid ${active ? "oklch(0.80 0.07 22)" : "oklch(0.68 0.09 22 / 25%)"}`,
                        background: "oklch(0.11 0.005 285)",
                        boxShadow: active ? "0 0 18px oklch(0.68 0.09 22 / 30%)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.68 0.09 22 / 60%)";
                      }}
                      onMouseLeave={(e) => {
                        if (!active) (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.68 0.09 22 / 25%)";
                      }}
                    >
                      <div className="relative flex items-end justify-center px-2" style={{ height: "60px" }}>
                        <div
                          className="w-1.5"
                          style={{
                            height: `${Math.max(20, fillPct)}%`,
                            background: active
                              ? "linear-gradient(180deg, oklch(0.85 0.07 22), oklch(0.68 0.09 22))"
                              : "linear-gradient(180deg, oklch(0.68 0.09 22 / 70%), oklch(0.52 0.10 22 / 70%))",
                          }}
                        />
                      </div>
                      <div
                        className="px-2 py-1.5 text-center"
                        style={{ borderTop: "1px solid oklch(0.68 0.09 22 / 15%)" }}
                      >
                        <span
                          className="font-['Playfair_Display'] font-bold"
                          style={{
                            fontSize: "0.9rem",
                            color: active ? "oklch(0.85 0.07 22)" : "oklch(0.93 0.02 60)",
                          }}
                        >
                          {n}"
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery estimate */}
            <div
              className="reveal flex items-start gap-4 p-5"
              style={{
                background: "oklch(0.11 0.005 285)",
                border: "1px solid oklch(0.68 0.09 22 / 25%)",
              }}
            >
              <div
                className="p-2.5 flex-shrink-0"
                style={{
                  background: "oklch(0.68 0.09 22 / 12%)",
                  border: "1px solid oklch(0.68 0.09 22 / 30%)",
                }}
              >
                <Truck size={18} style={{ color: "oklch(0.80 0.07 22)" }} />
              </div>
              <div className="flex-1">
                <p
                  className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.25em] uppercase mb-1"
                  style={{ color: "oklch(0.68 0.09 22)" }}
                >
                  Estimated Delivery
                </p>
                <p
                  className="font-['Playfair_Display'] text-base font-semibold"
                  style={{ color: "oklch(0.93 0.02 60)" }}
                >
                  Arrives {window}
                </p>
                <p
                  className="font-['Cormorant_Garamond'] text-sm italic mt-1"
                  style={{ color: "oklch(0.62 0.02 60)" }}
                >
                  Free U.S. shipping on orders over $150 · Tracking emailed within 24 hrs.
                </p>
              </div>
            </div>

            {/* CTA row */}
            <div className="reveal flex flex-wrap gap-3">
              <button
                className="btn-rose-gold flex items-center gap-2"
                onClick={() =>
                  toast.success(`Added ${texture} ${length}" Tape-Ins to cart — $${price}`)
                }
              >
                <ShoppingBag size={14} />
                Add to Cart
              </button>
              <button
                className="btn-outline-gold"
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Book Install
              </button>
            </div>

            {/* Accordion: Product Details + Care */}
            <div className="reveal flex flex-col gap-3">
              <AccordionPanel
                icon={Info}
                title="Product Details"
                open={openPanel === "details"}
                onToggle={() => togglePanel("details")}
              >
                <ul className="flex flex-col gap-2">
                  {[
                    "100% virgin Remy human hair, single-donor with cuticles aligned",
                    "40 wefts per pack — approx. 100g, covers a full head for most clients",
                    "Hypoallergenic medical-grade German adhesive (1.5\" wide tabs)",
                    "Lays flat to the scalp — invisible under fine and medium-density hair",
                    "Color-safe: can be lifted up to 2 levels or toned by a professional",
                    "Reusable up to 12 months with re-tape touch-ups every 6–8 weeks",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-1 w-3 flex-shrink-0"
                        style={{ background: "oklch(0.68 0.09 22)" }}
                      />
                      <span
                        className="font-['Cormorant_Garamond'] text-base leading-relaxed"
                        style={{ color: "oklch(0.72 0.02 60)" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionPanel>

              <AccordionPanel
                icon={Sparkles}
                title="How to Care For It"
                open={openPanel === "care"}
                onToggle={() => togglePanel("care")}
              >
                <ol className="flex flex-col gap-3 list-none">
                  {[
                    {
                      step: "Wash gently",
                      body:
                        "Use sulfate-free shampoo and conditioner. Wash in the direction of growth — never scrub side-to-side near the tabs.",
                    },
                    {
                      step: "Dry & detangle",
                      body:
                        "Air-dry or low-heat blow dry. Detangle from the ends upward with a loop brush. Always dry the tabs fully before sleeping.",
                    },
                    {
                      step: "Style with heat protectant",
                      body:
                        "Heat tools up to 350°F are safe. Avoid placing irons directly on the adhesive tabs.",
                    },
                    {
                      step: "Sleep smart",
                      body:
                        "Tie hair in a loose braid and use a silk or satin pillowcase to keep wefts smooth and reduce shedding.",
                    },
                    {
                      step: "Re-tape every 6–8 weeks",
                      body:
                        "Book a move-up with us so we can lift, replace tabs, and reposition as your hair grows.",
                    },
                  ].map((tip, i) => (
                    <li key={tip.step} className="flex items-start gap-3">
                      <span
                        className="font-['Playfair_Display'] text-sm font-bold flex-shrink-0"
                        style={{
                          color: "oklch(0.80 0.07 22)",
                          minWidth: "1.5rem",
                        }}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <p
                          className="font-['Playfair_Display'] text-sm font-semibold"
                          style={{ color: "oklch(0.93 0.02 60)" }}
                        >
                          {tip.step}
                        </p>
                        <p
                          className="font-['Cormorant_Garamond'] text-base leading-relaxed mt-0.5"
                          style={{ color: "oklch(0.65 0.02 60)" }}
                        >
                          {tip.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </AccordionPanel>

              {/* Quality strip */}
              <div
                className="flex items-center gap-3 p-4 mt-2"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.09 22 / 12%), oklch(0.52 0.10 22 / 8%))",
                  border: "1px solid oklch(0.68 0.09 22 / 25%)",
                }}
              >
                <ShieldCheck size={16} style={{ color: "oklch(0.80 0.07 22)" }} />
                <span
                  className="font-['Cormorant_Garamond'] text-sm italic"
                  style={{ color: "oklch(0.72 0.02 60)" }}
                >
                  30-day quality guarantee. If your wefts shed beyond normal, we'll replace them.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionPanel({
  icon: Icon,
  title,
  open,
  onToggle,
  children,
}: {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "oklch(0.11 0.005 285)",
        border: "1px solid oklch(0.68 0.09 22 / 25%)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <Icon size={16} style={{ color: "oklch(0.80 0.07 22)" }} />
          <span
            className="font-['Josefin_Sans'] text-xs tracking-[0.3em] uppercase"
            style={{ color: "oklch(0.93 0.02 60)" }}
          >
            {title}
          </span>
        </div>
        <span
          className="font-['Playfair_Display'] text-2xl leading-none"
          style={{
            color: "oklch(0.80 0.07 22)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            display: "inline-block",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          className="px-5 pb-5"
          style={{ borderTop: "1px solid oklch(0.68 0.09 22 / 15%)", paddingTop: "1rem" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
