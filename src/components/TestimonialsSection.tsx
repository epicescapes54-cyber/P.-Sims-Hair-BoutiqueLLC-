/* =============================================================================
   TESTIMONIALS SECTION — Art Deco Noir Luxe
   Client reviews with star ratings, rose gold accents.
   ============================================================================= */

import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Jasmine Williams",
    role: "Loyal Client",
    rating: 5,
    text: "P. Sims Hair Boutique is absolutely phenomenal! The quality of the hair is unmatched — silky, full, and looks completely natural. I've been a client for 3 years and wouldn't go anywhere else.",
    avatar: "JW",
  },
  {
    name: "Monique Davis",
    role: "Bride",
    rating: 5,
    text: "I wore a custom wig from P. Sims for my wedding day and received so many compliments. The installation was flawless and lasted through tears, dancing, and everything in between!",
    avatar: "MD",
  },
  {
    name: "Tanya Robinson",
    role: "Regular Client",
    rating: 5,
    text: "The customer service alone sets this boutique apart. They take the time to understand exactly what you want and deliver beyond expectations. My hair has never looked better.",
    avatar: "TR",
  },
  {
    name: "Keisha Johnson",
    role: "First-Time Client",
    rating: 5,
    text: "I was nervous about getting extensions for the first time, but the team made me feel so comfortable and confident. The result was stunning — exactly what I envisioned.",
    avatar: "KJ",
  },
  {
    name: "Brianna Carter",
    role: "VIP Client",
    rating: 5,
    text: "The luxury experience starts the moment you walk in. Premium products, expert hands, and a boutique atmosphere that makes you feel like the queen you are.",
    avatar: "BC",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const prev = () => setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const visibleTestimonials = [
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % testimonials.length],
    testimonials[(activeIndex + 2) % testimonials.length],
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.08 0.004 285)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 reveal">
          <span className="section-label mb-4">Client Love</span>
          <h2
            className="font-['Playfair_Display'] font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "oklch(0.93 0.02 60)" }}
          >
            What Our{" "}
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
              Queens
            </span>{" "}
            Say
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
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {visibleTestimonials.map((t, i) => (
            <div
              key={`${t.name}-${activeIndex}-${i}`}
              className="reveal relative p-7 transition-all duration-500"
              style={{
                background: i === 1 ? "oklch(0.14 0.006 285)" : "oklch(0.11 0.005 285)",
                border: `1px solid ${i === 1 ? "oklch(0.68 0.09 22 / 40%)" : "oklch(0.68 0.09 22 / 18%)"}`,
                transform: i === 1 ? "scale(1.02)" : "scale(1)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star
                    key={si}
                    size={14}
                    fill="oklch(0.80 0.07 22)"
                    style={{ color: "oklch(0.80 0.07 22)" }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="font-['Cormorant_Garamond'] text-base lg:text-lg italic leading-relaxed mb-6"
                style={{ color: "oklch(0.78 0.02 60)" }}
              >
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 font-['Josefin_Sans'] text-xs font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.09 22), oklch(0.52 0.10 22))",
                    color: "oklch(0.08 0.004 285)",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p
                    className="font-['Playfair_Display'] text-sm font-semibold"
                    style={{ color: "oklch(0.93 0.02 60)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.15em] uppercase"
                    style={{ color: "oklch(0.68 0.09 22)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>

              {/* Deco corner */}
              <div
                className="absolute top-4 right-4 font-['Playfair_Display'] text-4xl leading-none"
                style={{ color: "oklch(0.68 0.09 22 / 20%)" }}
              >
                "
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 reveal">
          <button
            onClick={prev}
            className="p-3 transition-all duration-200 hover:scale-110"
            style={{
              border: "1px solid oklch(0.68 0.09 22 / 40%)",
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
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="transition-all duration-300"
                style={{
                  width: i === activeIndex ? "24px" : "8px",
                  height: "8px",
                  background:
                    i === activeIndex
                      ? "oklch(0.68 0.09 22)"
                      : "oklch(0.68 0.09 22 / 30%)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 transition-all duration-200 hover:scale-110"
            style={{
              border: "1px solid oklch(0.68 0.09 22 / 40%)",
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
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
