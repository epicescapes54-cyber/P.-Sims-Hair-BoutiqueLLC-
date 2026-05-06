/* =============================================================================
   HOME PAGE — P. Sims Hair Boutique LLC
   Art Deco Noir Luxe — Assembles all sections in order.
   ============================================================================= */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CollectionsSection from "@/components/CollectionsSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.004 285)", color: "oklch(0.93 0.02 60)" }}
    >
      <Navbar />
      <HeroSection />
      <CollectionsSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
