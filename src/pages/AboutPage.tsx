const AboutPage = () => {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "480px" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/aboutUsHero.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-cream/95 via-cream/80 to-cream/30" />

        <div className="relative flex flex-col items-center justify-center text-center px-6 py-28 max-w-4xl mx-auto">
          <p
            className="text-camel text-[11px] tracking-[0.25em] uppercase mb-5"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Prompt, Professional and Proactive
          </p>
          <h1
            className="text-gold leading-tight mb-5"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              fontWeight: 400,
            }}
          >
            Our friendly and committed
            <br />
            team are at your service
          </h1>
          <p
            className="text-dark/55 text-[15px] font-light leading-relaxed max-w-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            We combine market expertise with personal service, delivering considered
            lettings experience.
          </p>
        </div>
      </section>

      {/* ── The Principal ── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-6">

          {/* Portrait */}
          <div className="w-full max-w-[500px] overflow-hidden rounded-sm">
            <img
              src="/images/team.webp"
              alt="The Principal – Managing Director"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Name / Title */}
          <div className="flex flex-col gap-1.5 mt-2">
            <h2
              className="text-gold"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 400,
                letterSpacing: "0.04em",
              }}
            >
              The Principal
            </h2>
            <p
              className="text-camel text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Managing Director
            </p>
          </div>

          {/* Body copy */}
          <div
            className="flex flex-col gap-4 text-dark/60 text-[14px] font-light leading-relaxed max-w-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p>
              We combine current market expertise with your personalised needs to
              deliver a bespoke experience for every step.
            </p>
            <p>
              Harvard &amp; Taylor's operations are rooted in principles and delivering
              the highest quality of service.
            </p>
            <p>
              Our specialist team are ready to assist you with each of your property
              needs.
            </p>
          </div>

          {/* Badge seal */}
          <div className="mt-4 w-38 h-38">
            <img
              src="/images/logo2.png"
              alt="Harvard & Taylor Certified Listings"
              className="w-full h-full object-contain"
            />
          </div>

        </div>
      </section>
    </main>
  );
};

export default AboutPage;
