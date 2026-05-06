/* =============================================================================
   QUICK SHOP — Texture + Length tile rows directly under the hero.
   Inspired by Luvme's quick-shop browser. Art Deco Noir Luxe restyling:
   rose gold borders, obsidian fills, hover glow.
   ============================================================================= */

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Texture = {
  name: string;
  pattern: "body-wave" | "straight" | "kinky-curly" | "deep-wave" | "water-wave" | "loose-wave" | "curly";
};

const textures: Texture[] = [
  { name: "Body Wave", pattern: "body-wave" },
  { name: "Straight", pattern: "straight" },
  { name: "Kinky Curly", pattern: "kinky-curly" },
  { name: "Deep Wave", pattern: "deep-wave" },
  { name: "Water Wave", pattern: "water-wave" },
  { name: "Loose Wave", pattern: "loose-wave" },
  { name: "Curly", pattern: "curly" },
];

const lengths = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

const extensions = [
  { name: "Tape-Ins", icon: "tape" },
  { name: "Halo", icon: "halo" },
  { name: "Ponytail", icon: "ponytail" },
  { name: "Wefts", icon: "wefts" },
];

function TexturePattern({ pattern }: { pattern: Texture["pattern"] }) {
  const stroke = "oklch(0.80 0.07 22)";
  const strokeFaint = "oklch(0.80 0.07 22 / 50%)";

  if (pattern === "straight") {
    return (
      <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={6 + i * 8.5} y1="6" x2={6 + i * 8.5} y2="94" stroke={i % 2 === 0 ? stroke : strokeFaint} strokeWidth="1" />
        ))}
      </svg>
    );
  }
  if (pattern === "body-wave") {
    return (
      <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={i} d={`M${4 + i * 13} 6 Q${10 + i * 13} 30 ${4 + i * 13} 50 T${4 + i * 13} 94`} fill="none" stroke={i % 2 === 0 ? stroke : strokeFaint} strokeWidth="1" />
        ))}
      </svg>
    );
  }
  if (pattern === "deep-wave") {
    return (
      <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={i} d={`M${4 + i * 13} 6 Q${15 + i * 13} 22 ${4 + i * 13} 40 T${4 + i * 13} 74 T${4 + i * 13} 94`} fill="none" stroke={i % 2 === 0 ? stroke : strokeFaint} strokeWidth="1" />
        ))}
      </svg>
    );
  }
  if (pattern === "water-wave") {
    return (
      <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={i} d={`M${3 + i * 11} 6 Q${8 + i * 11} 28 ${3 + i * 11} 50 T${3 + i * 11} 94`} fill="none" stroke={i % 2 === 0 ? stroke : strokeFaint} strokeWidth="0.9" />
        ))}
      </svg>
    );
  }
  if (pattern === "loose-wave") {
    return (
      <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 5 }).map((_, i) => (
          <path key={i} d={`M${6 + i * 16} 6 Q${18 + i * 16} 35 ${6 + i * 16} 60 T${6 + i * 16} 94`} fill="none" stroke={i % 2 === 0 ? stroke : strokeFaint} strokeWidth="1" />
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
          return <circle key={i} cx={cx} cy={cy} r="3.5" fill="none" stroke={i % 2 === 0 ? stroke : strokeFaint} strokeWidth="1" />;
        })}
      </svg>
    );
  }
  // curly
  return (
    <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="none">
      {Array.from({ length: 16 }).map((_, i) => {
        const cx = 10 + (i % 4) * 20;
        const cy = 14 + Math.floor(i / 4) * 22;
        return <path key={i} d={`M${cx - 5} ${cy} Q${cx} ${cy - 7} ${cx + 5} ${cy} T${cx + 15} ${cy}`} fill="none" stroke={i % 2 === 0 ? stroke : strokeFaint} strokeWidth="1" />;
      })}
    </svg>
  );
}

function ExtensionIcon({ icon }: { icon: string }) {
  const stroke = "oklch(0.80 0.07 22)";
  if (icon === "tape") {
    return (
      <svg viewBox="0 0 60 60" className="w-8 h-8" fill="none">
        <rect x="10" y="10" width="40" height="14" stroke={stroke} strokeWidth="1.5" />
        <line x1="10" y1="24" x2="10" y2="50" stroke={stroke} strokeWidth="1" />
        <line x1="20" y1="24" x2="20" y2="50" stroke={stroke} strokeWidth="1" />
        <line x1="30" y1="24" x2="30" y2="50" stroke={stroke} strokeWidth="1" />
        <line x1="40" y1="24" x2="40" y2="50" stroke={stroke} strokeWidth="1" />
        <line x1="50" y1="24" x2="50" y2="50" stroke={stroke} strokeWidth="1" />
      </svg>
    );
  }
  if (icon === "halo") {
    return (
      <svg viewBox="0 0 60 60" className="w-8 h-8" fill="none">
        <ellipse cx="30" cy="22" rx="20" ry="6" stroke={stroke} strokeWidth="1.5" />
        <path d="M12 24 Q15 45 30 52 Q45 45 48 24" stroke={stroke} strokeWidth="1" fill="none" />
      </svg>
    );
  }
  if (icon === "ponytail") {
    return (
      <svg viewBox="0 0 60 60" className="w-8 h-8" fill="none">
        <circle cx="30" cy="14" r="6" stroke={stroke} strokeWidth="1.5" />
        <path d="M22 22 Q18 35 30 50 Q42 35 38 22" stroke={stroke} strokeWidth="1" fill="none" />
        <path d="M26 22 Q24 38 30 52" stroke={stroke} strokeWidth="0.8" fill="none" />
        <path d="M34 22 Q36 38 30 52" stroke={stroke} strokeWidth="0.8" fill="none" />
      </svg>
    );
  }
  // wefts
  return (
    <svg viewBox="0 0 60 60" className="w-8 h-8" fill="none">
      <line x1="8" y1="14" x2="52" y2="14" stroke={stroke} strokeWidth="1.5" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={10 + i * 4} y1="14" x2={10 + i * 4} y2="48" stroke={stroke} strokeWidth="0.9" />
      ))}
    </svg>
  );
}

export default function QuickShopSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTexture, setActiveTexture] = useState<string | null>(null);
  const [activeLength, setActiveLength] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("visible");
              }, i * 60);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTexture = (name: string) => {
    setActiveTexture(name);
    toast(`Browsing ${name} texture`);
    document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLength = (n: number) => {
    setActiveLength(n);
    toast(`Browsing ${n}" length`);
    document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleExtension = (name: string) => {
    toast(`Browsing ${name}`);
    document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="quick-shop"
      ref={sectionRef}
      className="relative py-16 lg:py-20"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.07 0.004 285), oklch(0.08 0.004 285))",
        borderTop: "1px solid oklch(0.68 0.09 22 / 15%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 reveal">
          <span className="section-label mb-3">Quick Shop</span>
          <h2
            className="font-['Playfair_Display'] font-bold leading-tight"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "oklch(0.93 0.02 60)" }}
          >
            Find Your{" "}
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
              Perfect Fit
            </span>
          </h2>
          <div className="deco-divider w-40 my-3">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="1" y="1" width="8" height="8" transform="rotate(45 5 5)" stroke="oklch(0.68 0.09 22)" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Shop by Texture */}
        <div className="mb-14 reveal">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h3
              className="font-['Josefin_Sans'] text-sm tracking-[0.3em] uppercase"
              style={{ color: "oklch(0.80 0.07 22)" }}
            >
              Shop By Texture
            </h3>
            <span
              className="font-['Cormorant_Garamond'] text-sm italic"
              style={{ color: "oklch(0.55 0.02 60)" }}
            >
              {textures.length} textures available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 lg:gap-4">
            {textures.map((t) => {
              const isActive = activeTexture === t.name;
              return (
                <button
                  key={t.name}
                  onClick={() => handleTexture(t.name)}
                  className="group flex flex-col items-stretch text-left transition-all duration-300"
                  style={{
                    border: `1px solid ${isActive ? "oklch(0.80 0.07 22)" : "oklch(0.68 0.09 22 / 25%)"}`,
                    background: "oklch(0.11 0.005 285)",
                    boxShadow: isActive ? "0 0 24px oklch(0.68 0.09 22 / 30%)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.68 0.09 22 / 60%)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px oklch(0.68 0.09 22 / 18%)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.68 0.09 22 / 25%)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: "4 / 5",
                      background:
                        "linear-gradient(135deg, oklch(0.10 0.005 285), oklch(0.14 0.006 285))",
                    }}
                  >
                    <div className="absolute inset-0 p-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      <TexturePattern pattern={t.pattern} />
                    </div>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 50%, oklch(0.08 0.004 285 / 0.7))",
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "oklch(0.68 0.09 22)" }}
                      />
                    </div>
                  </div>
                  <div
                    className="px-3 py-2.5 flex items-center justify-between"
                    style={{ borderTop: "1px solid oklch(0.68 0.09 22 / 15%)" }}
                  >
                    <span
                      className="font-['Playfair_Display'] text-sm font-semibold"
                      style={{ color: "oklch(0.93 0.02 60)" }}
                    >
                      {t.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Shop by Length */}
        <div className="mb-14 reveal">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h3
              className="font-['Josefin_Sans'] text-sm tracking-[0.3em] uppercase"
              style={{ color: "oklch(0.80 0.07 22)" }}
            >
              Shop By Length
            </h3>
            <span
              className="font-['Cormorant_Garamond'] text-sm italic"
              style={{ color: "oklch(0.55 0.02 60)" }}
            >
              8" — 30" available
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 lg:gap-3">
            {lengths.map((n) => {
              const isActive = activeLength === n;
              const fillPct = ((n - 6) / 26) * 100;
              return (
                <button
                  key={n}
                  onClick={() => handleLength(n)}
                  className="group flex flex-col items-stretch transition-all duration-300"
                  style={{
                    border: `1px solid ${isActive ? "oklch(0.80 0.07 22)" : "oklch(0.68 0.09 22 / 25%)"}`,
                    background: "oklch(0.11 0.005 285)",
                    boxShadow: isActive ? "0 0 20px oklch(0.68 0.09 22 / 30%)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.68 0.09 22 / 60%)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.68 0.09 22 / 25%)";
                    }
                  }}
                >
                  <div
                    className="relative flex items-end justify-center px-2"
                    style={{ height: "76px" }}
                  >
                    <div
                      className="w-1.5 transition-all duration-300 group-hover:w-2"
                      style={{
                        height: `${Math.max(20, fillPct)}%`,
                        background: isActive
                          ? "linear-gradient(180deg, oklch(0.85 0.07 22), oklch(0.68 0.09 22))"
                          : "linear-gradient(180deg, oklch(0.68 0.09 22 / 70%), oklch(0.52 0.10 22 / 70%))",
                      }}
                    />
                  </div>
                  <div
                    className="px-2 py-2 text-center"
                    style={{ borderTop: "1px solid oklch(0.68 0.09 22 / 15%)" }}
                  >
                    <span
                      className="font-['Playfair_Display'] font-bold"
                      style={{
                        fontSize: "0.95rem",
                        color: isActive ? "oklch(0.85 0.07 22)" : "oklch(0.93 0.02 60)",
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

        {/* Shop by Extension Type */}
        <div className="reveal">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h3
              className="font-['Josefin_Sans'] text-sm tracking-[0.3em] uppercase"
              style={{ color: "oklch(0.80 0.07 22)" }}
            >
              Shop By Type
            </h3>
            <span
              className="font-['Cormorant_Garamond'] text-sm italic"
              style={{ color: "oklch(0.55 0.02 60)" }}
            >
              Premium installation methods
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
            {extensions.map((ext) => (
              <button
                key={ext.name}
                onClick={() => handleExtension(ext.name)}
                className="group flex items-center gap-4 px-5 py-4 transition-all duration-300"
                style={{
                  border: "1px solid oklch(0.68 0.09 22 / 25%)",
                  background: "oklch(0.11 0.005 285)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.68 0.09 22 / 60%)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px oklch(0.68 0.09 22 / 18%)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.68 0.09 22 / 25%)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "oklch(0.08 0.004 285)",
                    border: "1px solid oklch(0.68 0.09 22 / 30%)",
                  }}
                >
                  <ExtensionIcon icon={ext.icon} />
                </div>
                <div className="flex flex-col items-start">
                  <span
                    className="font-['Playfair_Display'] text-base font-semibold"
                    style={{ color: "oklch(0.93 0.02 60)" }}
                  >
                    {ext.name}
                  </span>
                  <span
                    className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.2em] uppercase mt-0.5"
                    style={{ color: "oklch(0.68 0.09 22)" }}
                  >
                    Browse →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
