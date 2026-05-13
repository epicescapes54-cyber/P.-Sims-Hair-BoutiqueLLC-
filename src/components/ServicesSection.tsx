/* =============================================================================
   SERVICES SECTION — Art Deco Noir Luxe
   Salon interior image background with service cards overlay.
   ============================================================================= */

import { useEffect, useRef } from "react";
import { Scissors, Sparkles, Crown, Star, Clock, Phone } from "lucide-react";
import { toast } from "sonner";

const SALON_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663427685673/fHpYESz6PQmULupxkcDoCU/salon-interior-kg4GwMm6Q2i4ZmhYQWpEUa.webp";

const services = [
  {
    icon: Crown,
    title: "Custom Wig Installation",
    duration: "2–3 hrs",
    price: "From $150",
    description:
      "HD lace front and full lace installs with custom bleaching, plucking, and a hairline finished to look like it grew from your scalp.",
  },
  {
    icon: Scissors,
    title: "Tape-In & Sew-In Extensions",
    duration: "1.5–2 hrs",
    price: "From $120",
    description:
      "Seamless tape-in and sew-in installs using 100% virgin Remy human hair — discreet wefts, all-day comfort, weeks of wear.",
  },
  {
    icon: Sparkles,
    title: "Hydration & Repair Treatment",
    duration: "1 hr",
    price: "From $80",
    description:
      "Deep conditioning, keratin smoothing, and scalp therapy for hair that feels nourished, soft, and visibly radiant.",
  },
  {
    icon: Star,
    title: "Color & Highlights",
    duration: "2–4 hrs",
    price: "From $200",
    description:
      "Balayage, ombre, highlights, and full color transformations — placed by hand for dimension that flatters your tone.",
  },
];

export default function ServicesSection() {
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
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={SALON_IMG}
          alt="P. Sims Hair Boutique Salon"
          className="w-full h-full object-cover"
          style={{ opacity: 0.2 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.08 0.004 285 / 0.97) 0%, oklch(0.08 0.004 285 / 0.88) 50%, oklch(0.08 0.004 285 / 0.97) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div className="reveal">
            <span className="section-label mb-4 block">Our Services</span>
            <h2
              className="font-['Playfair_Display'] font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "oklch(0.93 0.02 60)" }}
            >
              The Art of{" "}
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
                Beautiful
              </span>{" "}
              Hair
            </h2>
          </div>
          <div className="reveal">
            <p
              className="font-['Cormorant_Garamond'] text-lg leading-relaxed"
              style={{ color: "oklch(0.65 0.02 60)" }}
            >
              Every appointment at P. Sims is bespoke. Our master stylists pair a decade of technical craft with an editorial eye — so you leave looking like the most polished version of yourself, not a trend.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="reveal card-deco group relative p-8"
                style={{
                  background: "oklch(0.11 0.005 285 / 0.9)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-3"
                    style={{
                      background: "oklch(0.68 0.09 22 / 15%)",
                      border: "1px solid oklch(0.68 0.09 22 / 30%)",
                    }}
                  >
                    <Icon size={22} style={{ color: "oklch(0.80 0.07 22)" }} />
                  </div>
                  <div className="text-right">
                    <p
                      className="font-['Playfair_Display'] text-xl font-bold"
                      style={{ color: "oklch(0.80 0.07 22)" }}
                    >
                      {service.price}
                    </p>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <Clock size={11} style={{ color: "oklch(0.60 0.02 60)" }} />
                      <span
                        className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.15em] uppercase"
                        style={{ color: "oklch(0.60 0.02 60)" }}
                      >
                        {service.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <h3
                  className="font-['Playfair_Display'] text-xl font-semibold mb-3"
                  style={{ color: "oklch(0.93 0.02 60)" }}
                >
                  {service.title}
                </h3>
                <p
                  className="font-['Cormorant_Garamond'] text-base leading-relaxed mb-5"
                  style={{ color: "oklch(0.62 0.02 60)" }}
                >
                  {service.description}
                </p>

                <button
                  onClick={() =>
                    toast(`To book ${service.title}, call (770) 383-5824`, {
                      description: "Online booking coming soon.",
                    })
                  }
                  className="book-service-link font-['Josefin_Sans'] text-[0.65rem] tracking-[0.2em] uppercase flex items-center gap-2"
                >
                  Book This Service
                  <span
                    className="h-px w-6 inline-block"
                    style={{ background: "currentColor" }}
                  />
                </button>

                {/* Corner deco */}
                <svg
                  className="absolute bottom-3 right-3 opacity-20"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22 22 L22 10 M22 22 L10 22"
                    stroke="oklch(0.68 0.09 22)"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            );
          })}
        </div>

        {/* Booking CTA Banner */}
        <div
          className="reveal relative p-10 lg:p-14 text-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.09 22 / 15%), oklch(0.52 0.10 22 / 10%))",
            border: "1px solid oklch(0.68 0.09 22 / 30%)",
          }}
        >
          {/* Deco corners */}
          {["top-0 left-0", "top-0 right-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"].map(
            (pos, i) => (
              <svg
                key={i}
                className={`absolute ${pos} opacity-50`}
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path d="M2 2 L2 14 M2 2 L14 2" stroke="oklch(0.68 0.09 22)" strokeWidth="1.5" />
              </svg>
            )
          )}

          <span className="section-label mb-4 block">Ready to Transform?</span>
          <h3
            className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: "oklch(0.93 0.02 60)" }}
          >
            Book Your Appointment Today
          </h3>
          <p
            className="font-['Cormorant_Garamond'] text-lg mb-8 max-w-md mx-auto"
            style={{ color: "oklch(0.65 0.02 60)" }}
          >
            Experience the P. Sims difference. Limited appointments available.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+17703835824" className="btn-rose-gold flex items-center gap-2">
              <Phone size={14} />
              Call to Book
            </a>
            <button
              className="btn-outline-gold"
              onClick={() => toast("Online booking coming soon!")}
            >
              Book Online
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
