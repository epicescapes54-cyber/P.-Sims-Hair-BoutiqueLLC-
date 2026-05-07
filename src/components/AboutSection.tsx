/* =============================================================================
   ABOUT SECTION — Art Deco Noir Luxe
   Split layout: texture background left, editorial text right.
   ============================================================================= */

import { useEffect, useRef } from "react";
import { Award, Heart, Gem } from "lucide-react";

const TEXTURE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663427685673/fHpYESz6PQmULupxkcDoCU/texture-bg-AZxTdajKNKLPLqHt8kaJEj.webp";

const values = [
  {
    icon: Gem,
    title: "Virgin Remy Quality",
    text: "Only 100% virgin Remy human hair, cuticles intact and ethically sourced — built to be washed, styled, and reused for years.",
  },
  {
    icon: Heart,
    title: "Empowered, Together",
    text: "We foster a supportive space that reminds every woman she is never alone in wanting to feel her most beautiful.",
  },
  {
    icon: Award,
    title: "Decade of Mastery",
    text: "Over ten years of hands-on artistry — from custom wig construction to seamless extension installs and color.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("visible");
              }, i * 120);
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
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 overflow-hidden"
      style={{ background: "oklch(0.10 0.005 285)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with Art Deco frame */}
          <div className="reveal relative">
            {/* Outer decorative border */}
            <div
              className="absolute -top-4 -left-4 right-8 bottom-8"
              style={{ border: "1px solid oklch(0.68 0.09 22 / 20%)" }}
            />

            <div className="relative overflow-hidden" style={{ height: "520px" }}>
              <img
                src={TEXTURE_IMG}
                alt="Luxury texture"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.06 0.004 285 / 0.5), transparent)",
                }}
              />
            </div>

            {/* Floating quote card */}
            <div
              className="absolute -bottom-6 -right-6 p-6 max-w-xs"
              style={{
                background: "oklch(0.08 0.004 285 / 0.97)",
                border: "1px solid oklch(0.68 0.09 22 / 35%)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Deco quote mark */}
              <div
                className="font-['Playfair_Display'] text-5xl leading-none mb-2 -mt-2"
                style={{ color: "oklch(0.68 0.09 22 / 40%)" }}
              >
                "
              </div>
              <p
                className="font-['Cormorant_Garamond'] text-base italic leading-relaxed"
                style={{ color: "oklch(0.80 0.05 60)" }}
              >
                Your hair is your crown — and you are never alone in wanting it to reign.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div
                  className="h-px flex-1"
                  style={{ background: "oklch(0.68 0.09 22 / 40%)" }}
                />
                <span
                  className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.2em] uppercase"
                  style={{ color: "oklch(0.68 0.09 22)" }}
                >
                  P. Sims
                </span>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="flex flex-col gap-8">
            <div className="reveal">
              <span className="section-label mb-4 block">Our Story</span>
              <h2
                className="font-['Playfair_Display'] font-bold leading-tight"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "oklch(0.93 0.02 60)" }}
              >
                More Than a{" "}
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
                  Hair Boutique
                </span>
              </h2>
            </div>

            <div className="reveal">
              <p
                className="font-['Cormorant_Garamond'] text-lg leading-relaxed mb-4"
                style={{ color: "oklch(0.70 0.02 60)" }}
              >
                P. Sims Hair Boutique LLC was founded on a singular belief: every woman deserves to feel like royalty. A decade of passion has grown into a trusted destination for luxury hair — and a community where confidence is the standard, not the exception.
              </p>
              <p
                className="font-['Cormorant_Garamond'] text-lg leading-relaxed"
                style={{ color: "oklch(0.70 0.02 60)" }}
              >
                From tape-ins and bundles to custom lace wigs and color services, every piece is curated with the same care, warmth, and attention to detail that defines the P. Sims experience — because new looks should always feel like the best investment.
              </p>
            </div>

            {/* Values */}
            <div className="flex flex-col gap-5">
              {values.map((value, i) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="reveal flex items-start gap-4"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div
                      className="flex-shrink-0 p-2.5 mt-0.5"
                      style={{
                        background: "oklch(0.68 0.09 22 / 12%)",
                        border: "1px solid oklch(0.68 0.09 22 / 25%)",
                      }}
                    >
                      <Icon size={18} style={{ color: "oklch(0.80 0.07 22)" }} />
                    </div>
                    <div>
                      <h4
                        className="font-['Playfair_Display'] text-base font-semibold mb-1"
                        style={{ color: "oklch(0.93 0.02 60)" }}
                      >
                        {value.title}
                      </h4>
                      <p
                        className="font-['Cormorant_Garamond'] text-base leading-relaxed"
                        style={{ color: "oklch(0.62 0.02 60)" }}
                      >
                        {value.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deco divider */}
            <div
              className="reveal h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.68 0.09 22 / 40%), transparent)",
              }}
            />

            {/* Signature */}
            <div className="reveal">
              <p
                className="font-['Playfair_Display'] text-3xl italic"
                style={{ color: "oklch(0.68 0.09 22)" }}
              >
                P. Sims
              </p>
              <p
                className="font-['Josefin_Sans'] text-[0.65rem] tracking-[0.25em] uppercase mt-1"
                style={{ color: "oklch(0.55 0.02 60)" }}
              >
                Founder & Master Stylist
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
