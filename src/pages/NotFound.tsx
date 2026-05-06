export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "oklch(0.08 0.004 285)" }}
    >
      <div className="text-center">
        <h1
          className="font-['Playfair_Display'] text-8xl font-bold mb-4"
          style={{ color: "oklch(0.68 0.09 22)" }}
        >
          404
        </h1>
        <p
          className="font-['Cormorant_Garamond'] text-xl mb-8"
          style={{ color: "oklch(0.65 0.02 60)" }}
        >
          This page doesn't exist.
        </p>
        <a href="/" className="btn-rose-gold">
          Back to Home
        </a>
      </div>
    </div>
  );
}
