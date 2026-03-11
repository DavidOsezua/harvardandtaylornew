const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-96px)]">
      {/* Desktop background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: "url('/hero-bg.webp')" }}
      />

      {/* Mobile background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: "url('/mobileHeroImg.webp')" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-hero-fade" />

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-40 md:pt-20">
        {/* Eyebrow text */}
        <p
          className="text-center text-xs tracking-[0.35em] font-light  text-caramel"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          BESPOKE. DEVOTED LOCAL.
        </p>

        {/* Main heading */}
        <h1
          className="text-center leading-tight max-w-4xl mx-auto"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          <span className="text-tan">Redefining </span>
          <span className="text-coffeeBrown ">property</span>
          <br />
          <span className="text-coffeeBrown">management and </span>
          <span className="text-tan">living</span>
          <br />
          <span className="text-tan">standards</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-center  text-[15px] text-dark font-[400]  mx-auto leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif"}}
        >
          Unlock better opportunities, without stress or delays, in thriving
          prime locations.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
