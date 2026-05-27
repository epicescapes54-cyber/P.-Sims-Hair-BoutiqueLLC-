/* =============================================================================
   GALLERY SECTION — Art Deco Noir Luxe
   Photo showcase grid. To add / swap photos: drop files in
   public/images/gallery/ and list their paths in `photos` below.
   ============================================================================= */

import { useEffect, useRef } from "react";

// Gallery photos — edit this list to change what shows. (Placeholder set for now.)
const photos = [
  "/images/gallery/photo-27.jpg",
  "/images/gallery/photo-01.jpg",
  "/images/gallery/photo-04.jpg",
  "/images/gallery/photo-09.jpg",
  "/images/gallery/photo-10.jpg",
  "/images/gallery/photo-11.jpg",
  "/images/gallery/photo-12.jpg",
  "/images/gallery/photo-03.jpg",
  "/images/gallery/photo-17.jpg",
  "/images/gallery/photo-19.jpg",
  "/images/gallery/photo-25.jpg",
  "/images/gallery/photo-29.jpg",
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("visible");
              }, i * 50);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.07 0.004 285)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 reveal">
          <span className="section-label mb-4">Our Work</span>
          <h2
            className="font-['Playfair_Display'] font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "oklch(0.93 0.02 60)" }}
          >
            The{" "}
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
              Gallery
            </span>
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
          <p
            className="font-['Cormorant_Garamond'] text-lg max-w-xl leading-relaxed"
            style={{ color: "oklch(0.65 0.02 60)" }}
          >
            A look at our installs, textures, and transformations.
          </p>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {photos.map((src, i) => (
            <div
              key={src + i}
              className="reveal relative overflow-hidden group"
              style={{ aspectRatio: "4 / 5", transitionDelay: `${i * 50}ms` }}
            >
              <img
                src={src}
                alt={`P. Sims Hair Boutique work ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: "1px solid oklch(0.68 0.09 22 / 40%)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
