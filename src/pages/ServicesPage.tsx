import { Link } from "react-router-dom";

const ServicesPage = () => {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "480px" }}>
        {/* Background building image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/serviceHero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Cream overlay — heavy fade so image is subtle */}
        <div className="absolute inset-0 bg-linear-to-b from-cream via-cream/85 to-cream/20" />

        {/* Left + right fade to fully hide image edges */}
        {/* <div className="absolute inset-0 bg-linear-to-r from-cream/95 via-transparent to-cream/95" /> */}

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center text-center px-6 py-24 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <p
            className="text-camel text-[11px] tracking-[0.25em] uppercase mb-5"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Clear Guidance, Every Step
          </p>

          {/* Heading */}
          <h1
            className="text-gold leading-tight mb-5"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 400,
            }}
          >
            How We Work,
            <br />
            Who We Help
          </h1>

          {/* Subtitle */}
          <p
            className="text-dark/55 text-[15px] font-light leading-relaxed max-w-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Clear guidance and support for tenants and landlords
          </p>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="bg-cream py-12 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-5">

          {/* Large top card */}
          <div
            className="relative overflow-hidden rounded-lg"
            style={{ minHeight: "280px" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/images/premium-banner.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-dark/60" />
            <div className="relative flex flex-col items-center justify-center text-center px-8 py-16 h-full">
              <h2
                className="text-white uppercase leading-tight mb-4"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                }}
              >
                Property Management
                <br />
                Services for Landlords
              </h2>
              <p
                className="text-white/75 text-[13px] font-light leading-relaxed max-w-xl"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Comprehensive management solutions, from marketing and tenant sourcing to
                rent collection, compliance and ongoing property care, ensuring your
                investment is protected and performing at its best.
              </p>
            </div>
          </div>

          {/* Two smaller cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Landlord Advice */}
            <Link
              to="/services/landlord-advice"
              className="relative overflow-hidden rounded-lg block"
              style={{ minHeight: "260px" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/howWeWorkLeft.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-dark/60" />
              <div className="relative flex flex-col justify-end px-8 py-8 h-full">
                <h3
                  className="text-white uppercase leading-tight mb-3"
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                  }}
                >
                  Landlord Advice
                </h3>
                <p
                  className="text-white/75 text-[13px] font-light leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Practical guidance on regulations, market positioning and long-term
                  strategy, helping you make informed decisions with clarity and
                  confidence in London's evolving rental market.
                </p>
              </div>
            </Link>

            {/* Tenant Advice */}
            <Link
              to="/services/tenant-advice"
              className="relative overflow-hidden rounded-lg block"
              style={{ minHeight: "260px" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/howWeWorkRight.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-dark/60" />
              <div className="relative flex flex-col justify-end px-8 py-8 h-full">
                <h3
                  className="text-white uppercase leading-tight mb-3"
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                  }}
                >
                  Tenant Advice &amp;
                  <br />
                  Letting Guide
                </h3>
                <p
                  className="text-white/75 text-[13px] font-light leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Clear step-by-step support, from property search to move-in, outlining
                  requirements, processes and expectations to make renting
                  straightforward and stress-free.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
