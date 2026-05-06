/* =============================================================================
   NAVBAR — Art Deco Noir Luxe
   Transparent on top, dark on scroll. Rose gold accents. Josefin Sans labels.
   ============================================================================= */

import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Phone } from "lucide-react";
import { toast } from "sonner";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[oklch(0.08_0.004_285/0.97)] backdrop-blur-md border-b border-[oklch(0.68_0.09_22/20%)] shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("#home")}
              className="flex flex-col items-start group"
            >
              <span
                className="font-['Playfair_Display'] text-xl font-bold tracking-wide leading-none"
                style={{ color: "oklch(0.80 0.07 22)" }}
              >
                P. Sims
              </span>
              <span
                className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.35em] uppercase leading-none mt-0.5"
                style={{ color: "oklch(0.68 0.09 22 / 80%)" }}
              >
                Hair Boutique LLC
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="font-['Josefin_Sans'] text-[0.7rem] tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[oklch(0.80_0.07_22)] text-[oklch(0.75_0.02_60)]"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 font-['Josefin_Sans'] text-[0.65rem] tracking-[0.15em] uppercase text-[oklch(0.68_0.09_22)] hover:text-[oklch(0.80_0.07_22)] transition-colors"
              >
                <Phone size={13} />
                Book Now
              </a>
              <button
                onClick={() => toast("Shopping cart coming soon!")}
                className="relative p-2 text-[oklch(0.68_0.09_22)] hover:text-[oklch(0.80_0.07_22)] transition-colors"
              >
                <ShoppingBag size={18} />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-[oklch(0.80_0.07_22)] p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Art Deco bottom border line */}
        {scrolled && (
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.68 0.09 22 / 60%), transparent)",
            }}
          />
        )}
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-400 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "oklch(0.08 0.004 285 / 0.98)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {/* Deco top ornament */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-16" style={{ background: "oklch(0.68 0.09 22 / 50%)" }} />
            <span
              className="font-['Playfair_Display'] text-2xl italic"
              style={{ color: "oklch(0.80 0.07 22)" }}
            >
              PSB
            </span>
            <div className="h-px w-16" style={{ background: "oklch(0.68 0.09 22 / 50%)" }} />
          </div>

          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-['Playfair_Display'] text-3xl font-light tracking-wide transition-all duration-200 hover:scale-105"
              style={{
                color: i === 0 ? "oklch(0.80 0.07 22)" : "oklch(0.93 0.02 60)",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {link.label}
            </button>
          ))}

          <a
            href="tel:+1234567890"
            className="mt-6 btn-rose-gold"
            onClick={() => setMenuOpen(false)}
          >
            Book Appointment
          </a>
        </div>
      </div>
    </>
  );
}
