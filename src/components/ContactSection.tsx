/* =============================================================================
   CONTACT SECTION — Art Deco Noir Luxe
   Contact form + info with rose gold accents and Art Deco ornaments.
   ============================================================================= */

import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sending, setSending] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          service: form.service || null,
          message: form.message || null,
        },
      ]);
      if (error) throw error;
      toast.success("Message sent! We'll be in touch within 24 hours.");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    background: "oklch(0.14 0.005 285)",
    border: "1px solid oklch(0.68 0.09 22 / 25%)",
    color: "oklch(0.93 0.02 60)",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem",
    padding: "0.875rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const contactInfo = [
    { icon: MapPin, label: "Location", value: "Atlanta, GA" },
    { icon: Phone, label: "Phone", value: "(404) 555-0190", href: "tel:+14045550190" },
    { icon: Mail, label: "Email", value: "hello@psimshair.com", href: "mailto:hello@psimshair.com" },
    { icon: Clock, label: "Hours", value: "Tue–Sat: 9AM–7PM" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.10 0.005 285)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 reveal">
          <span className="section-label mb-4">Get In Touch</span>
          <h2
            className="font-['Playfair_Display'] font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "oklch(0.93 0.02 60)" }}
          >
            Let's Create{" "}
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
              Magic
            </span>{" "}
            Together
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

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="reveal">
              <p
                className="font-['Cormorant_Garamond'] text-lg leading-relaxed"
                style={{ color: "oklch(0.65 0.02 60)" }}
              >
                Ready to elevate your look? Reach out to schedule a consultation or book your appointment. We'd love to hear from you.
              </p>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="reveal flex items-start gap-4"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div
                      className="p-2.5 flex-shrink-0"
                      style={{
                        background: "oklch(0.68 0.09 22 / 12%)",
                        border: "1px solid oklch(0.68 0.09 22 / 25%)",
                      }}
                    >
                      <Icon size={16} style={{ color: "oklch(0.80 0.07 22)" }} />
                    </div>
                    <div>
                      <p
                        className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.2em] uppercase mb-0.5"
                        style={{ color: "oklch(0.68 0.09 22)" }}
                      >
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-['Cormorant_Garamond'] text-base transition-colors"
                          style={{ color: "oklch(0.85 0.02 60)" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color =
                              "oklch(0.80 0.07 22)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color =
                              "oklch(0.85 0.02 60)";
                          }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p
                          className="font-['Cormorant_Garamond'] text-base"
                          style={{ color: "oklch(0.85 0.02 60)" }}
                        >
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="reveal">
              <p
                className="font-['Josefin_Sans'] text-[0.65rem] tracking-[0.25em] uppercase mb-4"
                style={{ color: "oklch(0.55 0.02 60)" }}
              >
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: "Instagram", href: "#" },
                  { icon: Facebook, label: "Facebook", href: "#" },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      onClick={(e) => {
                        e.preventDefault();
                        toast(`Follow us on ${social.label}!`);
                      }}
                      className="p-3 transition-all duration-200"
                      style={{
                        border: "1px solid oklch(0.68 0.09 22 / 30%)",
                        color: "oklch(0.68 0.09 22)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "oklch(0.68 0.09 22 / 15%)";
                        (e.currentTarget as HTMLElement).style.color =
                          "oklch(0.80 0.07 22)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color =
                          "oklch(0.68 0.09 22)";
                      }}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3 reveal">
            <form
              onSubmit={handleSubmit}
              className="p-8 lg:p-10 flex flex-col gap-5"
              style={{
                background: "oklch(0.12 0.005 285)",
                border: "1px solid oklch(0.68 0.09 22 / 20%)",
              }}
            >
              {/* Deco top border */}
              <div
                className="h-px w-full mb-2"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.68 0.09 22), oklch(0.85 0.07 22), oklch(0.68 0.09 22))",
                }}
              />

              <h3
                className="font-['Playfair_Display'] text-xl font-semibold"
                style={{ color: "oklch(0.93 0.02 60)" }}
              >
                Send a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.2em] uppercase block mb-2"
                    style={{ color: "oklch(0.68 0.09 22)" }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.68 0.09 22 / 60%)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.68 0.09 22 / 25%)";
                    }}
                  />
                </div>
                <div>
                  <label
                    className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.2em] uppercase block mb-2"
                    style={{ color: "oklch(0.68 0.09 22)" }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.68 0.09 22 / 60%)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.68 0.09 22 / 25%)";
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.2em] uppercase block mb-2"
                    style={{ color: "oklch(0.68 0.09 22)" }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(000) 000-0000"
                    style={inputStyle}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.68 0.09 22 / 60%)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.68 0.09 22 / 25%)";
                    }}
                  />
                </div>
                <div>
                  <label
                    className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.2em] uppercase block mb-2"
                    style={{ color: "oklch(0.68 0.09 22)" }}
                  >
                    Service Interest
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    style={{ ...inputStyle, appearance: "none" }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.68 0.09 22 / 60%)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.68 0.09 22 / 25%)";
                    }}
                  >
                    <option value="" style={{ background: "oklch(0.14 0.005 285)" }}>
                      Select a service
                    </option>
                    <option value="extensions" style={{ background: "oklch(0.14 0.005 285)" }}>
                      Hair Extensions
                    </option>
                    <option value="wig" style={{ background: "oklch(0.14 0.005 285)" }}>
                      Wig Installation
                    </option>
                    <option value="treatment" style={{ background: "oklch(0.14 0.005 285)" }}>
                      Hair Treatment
                    </option>
                    <option value="color" style={{ background: "oklch(0.14 0.005 285)" }}>
                      Color & Highlights
                    </option>
                    <option value="products" style={{ background: "oklch(0.14 0.005 285)" }}>
                      Products Only
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.2em] uppercase block mb-2"
                  style={{ color: "oklch(0.68 0.09 22)" }}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your hair goals..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.68 0.09 22 / 60%)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.68 0.09 22 / 25%)";
                  }}
                />
              </div>

              <button type="submit" className="btn-rose-gold w-full mt-2" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
