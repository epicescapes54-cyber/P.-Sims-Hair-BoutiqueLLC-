/* =============================================================================
   HERO SECTION — Art Deco Noir Luxe
   Full-bleed split layout: left editorial text, right portrait image.
   Staggered entrance animations, rose gold geometric accents.
   ============================================================================= */

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663427685673/fHpYESz6PQmULupxkcDoCU/hero-main-SeVPLgEyx6kJcp9ex9f6Yw.webp";
const PORTRAIT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663427685673/fHpYESz6PQmULupxkcDoCU/hero-portrait-nZLYZGwMs8LbcawxjCieue.webp";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll(".hero-anim");
    items?.forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "translateY(0)";
      }, 200 + i * 150);
    });
  }, []);

  const scrollToNext = () => {
    const el = document.querySelector("#quick-shop") || document.querySelector("#collections");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: "oklch(0.06 0.004 285)" }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="P. Sims Hair Boutique"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.35 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.06 0.004 285 / 0.95) 0%, oklch(0.06 0.004 285 / 0.7) 50%, oklch(0.06 0.004 285 / 0.85) 100%)",
          }}
        />
      </div>

      {/* Art Deco corner ornaments */}
      <svg
        className="absolute top-24 left-6 lg:left-12 opacity-40"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <path d="M2 2 L2 30 M2 2 L30 2" stroke="oklch(0.68 0.09 22)" strokeWidth="1.5" />
        <path d="M8 8 L8 24 M8 8 L24 8" stroke="oklch(0.68 0.09 22)" strokeWidth="0.75" />
      </svg>
      <svg
        className="absolute top-24 right-6 lg:right-12 opacity-40"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <path d="M78 2 L78 30 M78 2 L50 2" stroke="oklch(0.68 0.09 22)" strokeWidth="1.5" />
        <path d="M72 8 L72 24 M72 8 L56 8" stroke="oklch(0.68 0.09 22)" strokeWidth="0.75" />
      </svg>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full pt-24 pb-16">

          {/* Left: Text Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Label */}
            <div
              className="hero-anim section-label flex items-center gap-3"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}
            >
              <span
                className="h-px w-8"
                style={{ background: "oklch(0.68 0.09 22)" }}
              />
              New Looks · Best Investment
              <span
                className="h-px w-8"
                style={{ background: "oklch(0.68 0.09 22)" }}
              />
            </div>

            {/* Main Headline */}
            <div
              className="hero-anim"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}
            >
              <h1
                className="font-['Playfair_Display'] leading-[1.1] font-bold"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", color: "oklch(0.93 0.02 60)" }}
              >
                Hair That{" "}
                <span
                  className="italic"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.09 22), oklch(0.85 0.07 22), oklch(0.68 0.09 22))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Empowers
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <div
              className="hero-anim"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}
            >
              <p
                className="font-['Cormorant_Garamond'] text-xl lg:text-2xl font-light leading-relaxed max-w-md"
                style={{ color: "oklch(0.75 0.03 60)" }}
              >
                100% virgin Remy human hair extensions, ready-to-wear wigs, and bespoke salon services — crafted to remind every woman she is never alone in feeling her most beautiful.
              </p>
            </div>

            {/* Deco divider */}
            <div
              className="hero-anim flex items-center gap-4"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}
            >
              <div
                className="h-px w-12"
                style={{ background: "linear-gradient(90deg, transparent, oklch(0.68 0.09 22))" }}
              />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="10"
                  height="10"
                  transform="rotate(45 6 6)"
                  stroke="oklch(0.68 0.09 22)"
                  strokeWidth="1"
                />
              </svg>
              <div
                className="h-px flex-1 max-w-xs"
                style={{ background: "linear-gradient(90deg, oklch(0.68 0.09 22), transparent)" }}
              />
            </div>

            {/* CTAs */}
            <div
              className="hero-anim flex flex-wrap gap-4"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}
            >
              <button
                className="btn-rose-gold"
                onClick={() => {
                  const el = document.querySelector("#collections");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Shop Collections
              </button>
              <button
                className="btn-outline-gold"
                onClick={() => {
                  const el = document.querySelector("#services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Our Services
              </button>
            </div>

            {/* Stats */}
            <div
              className="hero-anim grid grid-cols-3 gap-4 pt-4 border-t"
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transition: "all 0.7s ease",
                borderColor: "oklch(0.68 0.09 22 / 20%)",
              }}
            >
              {[
                { num: "500+", label: "Happy Clients" },
                { num: "10+", label: "Years of Craft" },
                { num: "100%", label: "Virgin Remy Hair" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="font-['Playfair_Display'] text-2xl font-bold"
                    style={{ color: "oklch(0.80 0.07 22)" }}
                  >
                    {stat.num}
                  </span>
                  <span
                    className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.2em] uppercase mt-0.5"
                    style={{ color: "oklch(0.60 0.02 60)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Portrait Image */}
          <div
            className="hero-anim relative hidden lg:block"
            style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}
          >
            {/* Decorative frame */}
            <div
              className="absolute -inset-4 rounded-none"
              style={{ border: "1px solid oklch(0.68 0.09 22 / 20%)" }}
            />
            <div
              className="absolute -inset-8 rounded-none"
              style={{ border: "1px solid oklch(0.68 0.09 22 / 10%)" }}
            />

            {/* Corner ornaments on image */}
            {[
              "top-0 left-0",
              "top-0 right-0 rotate-90",
              "bottom-0 right-0 rotate-180",
              "bottom-0 left-0 -rotate-90",
            ].map((pos, i) => (
              <svg
                key={i}
                className={`absolute ${pos} opacity-70`}
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M2 2 L2 18 M2 2 L18 2"
                  stroke="oklch(0.68 0.09 22)"
                  strokeWidth="1.5"
                />
              </svg>
            ))}

            <img
              src={PORTRAIT_IMG}
              alt="Luxury Hair Model"
              className="w-full h-auto object-cover"
              style={{ maxHeight: "75vh", objectPosition: "top center" }}
            />

            {/* Floating badge */}
            <div
              className="absolute bottom-8 -left-6 px-5 py-3"
              style={{
                background: "oklch(0.08 0.004 285 / 0.95)",
                border: "1px solid oklch(0.68 0.09 22 / 40%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <p
                className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.25em] uppercase"
                style={{ color: "oklch(0.68 0.09 22)" }}
              >
                New Collection
              </p>
              <p
                className="font-['Playfair_Display'] text-lg font-semibold mt-0.5"
                style={{ color: "oklch(0.93 0.02 60)" }}
              >
                Spring 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group z-10"
      >
        <span
          className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.3em] uppercase"
          style={{ color: "oklch(0.68 0.09 22 / 70%)" }}
        >
          Discover
        </span>
        <ChevronDown
          size={16}
          className="animate-bounce"
          style={{ color: "oklch(0.68 0.09 22)" }}
        />
      </button>
    </section>
  );
}
