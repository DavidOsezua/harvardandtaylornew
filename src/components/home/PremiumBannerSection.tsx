import { Link } from "react-router-dom";

const PremiumBannerSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image — add /premium-banner.jpg to public/ */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/premium-banner.png')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 md:py-28">
        {/* Circular badge */}
        <div className="w-50">
          <img src="/images/logo.png" alt="" className="w-full h-full" />
        </div>

        {/* Heading */}
        <h2
          className="text-cream-light uppercase leading-tight max-w-3xl mb-5"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
            fontWeight: 400,
            letterSpacing: "0.06em",
          }}
        >
          Premium rental homes across London
        </h2>

        {/* Subtitle */}
        <p
          className="text-cream-light/70 text-sm md:text-base font-light max-w-xl mb-10 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Thoughtfully presented homes for long-term let, matched with tenants
          who value design and comfort across London.
        </p>

        {/* CTA button */}
        <Link
          to="/about"
          className="inline-flex items-center gap-2 border border-cream-light/60 text-cream-light rounded-full px-8 py-3 text-sm font-light tracking-widest uppercase hover:bg-cream-light hover:text-dark transition-colors duration-300"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          About Us
        </Link>
      </div>
    </section>
  );
};

export default PremiumBannerSection;
