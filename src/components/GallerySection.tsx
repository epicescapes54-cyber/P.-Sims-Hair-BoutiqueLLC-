/* =============================================================================
   GALLERY SECTION — Art Deco Noir Luxe
   2×2 mosaic teaser card on the page. Tap to open a full-screen lightbox
   with the complete gallery (arrow keys + thumbnail strip to navigate).
   To swap photos: drop files in public/images/gallery/ and update
   `TEASER_PHOTOS` (4) and `GALLERY_PHOTOS` (full set) below.
   ============================================================================= */

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// 4 photos shown in the 2×2 mosaic teaser on the page (before tap).
const TEASER_PHOTOS = [
  "/images/gallery/gallery-teaser-1.jpg",
  "/images/gallery/gallery-teaser-2.jpg",
  "/images/gallery/gallery-teaser-3.png",
  "/images/gallery/gallery-teaser-4.jpg",
];

// Full gallery shown inside the lightbox.
const GALLERY_PHOTOS = [
  "/images/gallery/gallery-01.jpg",
  "/images/gallery/gallery-02.jpg",
  "/images/gallery/gallery-03.jpg",
  "/images/gallery/gallery-04.jpg",
  "/images/gallery/gallery-05.jpg",
  "/images/gallery/gallery-06.jpg",
  "/images/gallery/gallery-07.png",
  "/images/gallery/gallery-08.png",
  "/images/gallery/gallery-09.jpg",
  "/images/gallery/gallery-10.jpg",
  "/images/gallery/gallery-11.jpg",
  "/images/gallery/gallery-12.webp",
  "/images/gallery/gallery-13.jpg",
  "/images/gallery/gallery-14.png",
  "/images/gallery/gallery-15.png",
  "/images/gallery/gallery-16.png",
  "/images/gallery/gallery-17.png",
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Section reveal animations.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("visible");
              }, i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Keyboard nav + scroll lock while lightbox is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % GALLERY_PHOTOS.length);
      else if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const openLightbox = () => {
    setIndex(0);
    setOpen(true);
  };
  const next = () => setIndex((i) => (i + 1) % GALLERY_PHOTOS.length);
  const prev = () =>
    setIndex((i) => (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);

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

        {/* 2×2 mosaic teaser card */}
        <div className="reveal flex justify-center">
          <button
            onClick={openLightbox}
            aria-label={`View gallery — ${GALLERY_PHOTOS.length} photos`}
            className="group relative w-full max-w-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
            style={{
              aspectRatio: "4 / 3",
              border: "1px solid oklch(0.68 0.09 22 / 30%)",
            }}
          >
            <div className="grid grid-cols-2 grid-rows-2 gap-1 absolute inset-0">
              {TEASER_PHOTOS.map((src, i) => (
                <div key={src + i} className="relative overflow-hidden">
                  <img
                    src={src}
                    alt=""
                    aria-hidden
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Center overlay with View All Photos CTA */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-colors duration-300"
              style={{ background: "oklch(0.06 0.004 285 / 0.55)" }}
            >
              <div
                className="flex flex-col items-center gap-3 px-10 py-7 transition-all duration-300 group-hover:scale-105"
                style={{
                  background: "oklch(0.08 0.004 285 / 0.9)",
                  border: "1px solid oklch(0.68 0.09 22 / 60%)",
                  boxShadow: "0 8px 32px oklch(0.04 0.004 285 / 0.7)",
                }}
              >
                <span
                  className="font-['Josefin_Sans'] text-[0.6rem] tracking-[0.4em] uppercase"
                  style={{ color: "oklch(0.80 0.07 22)" }}
                >
                  The Gallery
                </span>
                <span
                  className="font-['Playfair_Display'] text-2xl lg:text-3xl font-bold flex items-center gap-3"
                  style={{ color: "oklch(0.93 0.02 60)" }}
                >
                  View All Photos
                  <ChevronRight
                    size={26}
                    style={{ color: "oklch(0.80 0.07 22)" }}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
                <span
                  className="font-['Cormorant_Garamond'] text-sm italic"
                  style={{ color: "oklch(0.65 0.02 60)" }}
                >
                  {GALLERY_PHOTOS.length} photos
                </span>
              </div>
            </div>

            {/* Deco inset border */}
            <div
              className="absolute inset-3 pointer-events-none"
              style={{ border: "1px solid oklch(0.68 0.09 22 / 30%)" }}
            />
          </button>
        </div>
      </div>

      {/* Lightbox modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          style={{ background: "oklch(0.04 0.004 285 / 0.96)" }}
        >
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            aria-label="Close gallery"
            className="absolute top-4 right-4 p-2 transition-transform hover:scale-110 z-10"
            style={{
              background: "oklch(0.08 0.004 285 / 0.6)",
              color: "oklch(0.85 0.07 22)",
              border: "1px solid oklch(0.68 0.09 22 / 40%)",
            }}
          >
            <X size={22} />
          </button>

          {/* Counter */}
          <div
            className="absolute top-5 left-1/2 -translate-x-1/2 font-['Josefin_Sans'] text-[0.65rem] tracking-[0.3em] uppercase px-3 py-1.5 z-10"
            style={{
              background: "oklch(0.08 0.004 285 / 0.6)",
              color: "oklch(0.85 0.07 22)",
              border: "1px solid oklch(0.68 0.09 22 / 30%)",
            }}
          >
            {index + 1} / {GALLERY_PHOTOS.length}
          </div>

          {/* Main image */}
          <div
            className="relative max-w-[92vw] max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_PHOTOS[index]}
              alt={`Gallery photo ${index + 1} of ${GALLERY_PHOTOS.length}`}
              className="max-w-full max-h-[80vh] object-contain"
              style={{
                border: "1px solid oklch(0.68 0.09 22 / 25%)",
                boxShadow: "0 8px 60px oklch(0.04 0.004 285 / 0.8)",
              }}
            />
          </div>

          {/* Prev / Next */}
          {GALLERY_PHOTOS.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 transition-transform hover:scale-110 z-10"
                style={{
                  background: "oklch(0.08 0.004 285 / 0.7)",
                  color: "oklch(0.85 0.07 22)",
                  border: "1px solid oklch(0.68 0.09 22 / 40%)",
                }}
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 transition-transform hover:scale-110 z-10"
                style={{
                  background: "oklch(0.08 0.004 285 / 0.7)",
                  color: "oklch(0.85 0.07 22)",
                  border: "1px solid oklch(0.68 0.09 22 / 40%)",
                }}
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          {/* Thumbnail strip */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[92vw] overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 px-2 py-2">
              {GALLERY_PHOTOS.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setIndex(i)}
                  aria-label={`Photo ${i + 1}`}
                  className="shrink-0 transition-opacity"
                  style={{
                    border:
                      i === index
                        ? "2px solid oklch(0.85 0.07 22)"
                        : "2px solid transparent",
                    opacity: i === index ? 1 : 0.55,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-14 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
