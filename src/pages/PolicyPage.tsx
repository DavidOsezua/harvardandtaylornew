import PolicyContent from "../components/policy/PolicyContent";

const PolicyPage = () => {
  return (
    <main>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "420px" }}
      >
        {/* Building image at bottom */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        />
        {/* Cream fade from top */}
        <div className="absolute inset-0 bg-linear-to-b from-cream via-cream/90 to-cream/30" />

        <div className="relative flex flex-col items-center justify-center text-center px-6 py-28 max-w-3xl mx-auto">
          <h1
            className="text-gold leading-tight mb-5"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              fontWeight: 400,
            }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-camel text-[11px] tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            February 2026
          </p>
        </div>
      </section>

      {/* ── Policy Content ── */}
      <PolicyContent />
    </main>
  );
};

export default PolicyPage;
