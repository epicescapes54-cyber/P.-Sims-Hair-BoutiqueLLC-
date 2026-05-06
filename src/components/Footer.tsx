/* =============================================================================
   FOOTER — Art Deco Noir Luxe
   Dark footer with rose gold accents, Art Deco geometric ornaments.
   ============================================================================= */

import { useState } from "react";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const footerLinks = {
  Shop: ["Hair Extensions", "Wigs & Frontals", "Closures", "Hair Care", "Accessories"],
  Services: ["Wig Installation", "Extension Application", "Hair Treatment", "Color Services", "Consultations"],
  Company: ["About Us", "Our Story", "Careers", "Press", "Gift Cards"],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) return;
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);
      if (error) throw error;
      toast.success("You've joined the Inner Circle!");
      setEmail("");
    } catch {
      toast.error("Could not subscribe. Please try again.");
    }
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "oklch(0.06 0.004 285)",
        borderTop: "1px solid oklch(0.68 0.09 22 / 20%)",
      }}
    >
      {/* Top deco line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.68 0.09 22), oklch(0.85 0.07 22), oklch(0.68 0.09 22), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <div>
              <p
                className="font-['Playfair_Display'] text-3xl font-bold"
                style={{ color: "oklch(0.80 0.07 22)" }}
              >
                P. Sims
              </p>
              <p
                className="font-['Josefin_Sans'] text-[0.65rem] tracking-[0.3em] uppercase mt-1"
                style={{ color: "oklch(0.68 0.09 22 / 70%)" }}
              >
                Hair Boutique LLC
              </p>
            </div>

            {/* Tagline */}
            <p
              className="font-['Cormorant_Garamond'] text-base italic leading-relaxed max-w-xs"
              style={{ color: "oklch(0.60 0.02 60)" }}
            >
              Elevating beauty through the art of premium hair. Your crown deserves the finest.
            </p>

            {/* Art Deco divider */}
            <div className="flex items-center gap-3">
              <div
                className="h-px w-8"
                style={{ background: "oklch(0.68 0.09 22 / 50%)" }}
              />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect
                  x="0.5"
                  y="0.5"
                  width="9"
                  height="9"
                  transform="rotate(45 5 5)"
                  stroke="oklch(0.68 0.09 22 / 60%)"
                  strokeWidth="1"
                />
              </svg>
              <div
                className="h-px w-8"
                style={{ background: "oklch(0.68 0.09 22 / 50%)" }}
              />
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Mail, label: "Email", href: "mailto:hello@psimshair.com" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href || "#"}
                    onClick={(e) => {
                      if (!s.href) {
                        e.preventDefault();
                        toast(`Follow us on ${s.label}!`);
                      }
                    }}
                    className="p-2.5 transition-all duration-200"
                    style={{
                      border: "1px solid oklch(0.68 0.09 22 / 25%)",
                      color: "oklch(0.68 0.09 22 / 70%)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.68 0.09 22 / 60%)";
                      (e.currentTarget as HTMLElement).style.color =
                        "oklch(0.80 0.07 22)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.68 0.09 22 / 25%)";
                      (e.currentTarget as HTMLElement).style.color =
                        "oklch(0.68 0.09 22 / 70%)";
                    }}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>

            {/* Contact quick links */}
            <div className="flex flex-col gap-2">
              <a
                href="tel:+14045550190"
                className="flex items-center gap-2 font-['Cormorant_Garamond'] text-sm transition-colors"
                style={{ color: "oklch(0.60 0.02 60)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.80 0.07 22)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.60 0.02 60)";
                }}
              >
                <Phone size={12} />
                (404) 555-0190
              </a>
              <a
                href="mailto:hello@psimshair.com"
                className="flex items-center gap-2 font-['Cormorant_Garamond'] text-sm transition-colors"
                style={{ color: "oklch(0.60 0.02 60)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.80 0.07 22)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.60 0.02 60)";
                }}
              >
                <Mail size={12} />
                hello@psimshair.com
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p
                className="font-['Josefin_Sans'] text-[0.65rem] tracking-[0.25em] uppercase mb-5"
                style={{ color: "oklch(0.68 0.09 22)" }}
              >
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => toast(`${link} — coming soon!`)}
                      className="font-['Cormorant_Garamond'] text-base transition-colors text-left"
                      style={{ color: "oklch(0.55 0.02 60)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "oklch(0.80 0.07 22)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "oklch(0.55 0.02 60)";
                      }}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="p-8 mb-12 relative overflow-hidden"
          style={{
            background: "oklch(0.10 0.005 285)",
            border: "1px solid oklch(0.68 0.09 22 / 20%)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div>
              <p
                className="font-['Playfair_Display'] text-xl font-semibold mb-1"
                style={{ color: "oklch(0.93 0.02 60)" }}
              >
                Join the Inner Circle
              </p>
              <p
                className="font-['Cormorant_Garamond'] text-base"
                style={{ color: "oklch(0.60 0.02 60)" }}
              >
                Exclusive offers, new arrivals, and hair care tips delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-0 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 md:w-64 px-4 py-3 font-['Cormorant_Garamond'] text-base outline-none"
                style={{
                  background: "oklch(0.14 0.005 285)",
                  border: "1px solid oklch(0.68 0.09 22 / 30%)",
                  borderRight: "none",
                  color: "oklch(0.93 0.02 60)",
                }}
              />
              <button
                className="btn-rose-gold whitespace-nowrap"
                onClick={handleSubscribe}
                style={{ padding: "0.75rem 1.5rem" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid oklch(0.68 0.09 22 / 15%)" }}
        >
          <p
            className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.15em] uppercase"
            style={{ color: "oklch(0.40 0.01 60)" }}
          >
            © 2026 P. Sims Hair Boutique LLC. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Shipping Policy"].map((item) => (
              <button
                key={item}
                onClick={() => toast(`${item} — coming soon!`)}
                className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.1em] uppercase transition-colors"
                style={{ color: "oklch(0.40 0.01 60)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.68 0.09 22)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.40 0.01 60)";
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
