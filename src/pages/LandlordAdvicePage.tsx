const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const externalLinks = [
  { label: "UK Government – Renters Reform Bill Overview", href: "#" },
  { label: "NRLA – Renters Reform Bill Hub", href: "#" },
  { label: "NRLA – Landlord Advice", href: "#" },
];

const LandlordAdvicePage = () => {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/serviceHero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-cream via-cream/85 to-cream/20" />

        <div className="relative flex flex-col items-center justify-center text-center px-6 py-24 max-w-3xl mx-auto">
          <p
            className="text-camel text-[11px] tracking-[0.25em] uppercase mb-5"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Clear Guidance, Every Step
          </p>
          <h1
            className="text-gold leading-tight mb-5"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(2.6rem, 6vw, 4rem)",
              fontWeight: 400,
            }}
          >
            Landlord Advice
          </h1>
          <p
            className="text-dark/55 text-[15px] font-light leading-relaxed max-w-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Practical advice and services for all your property needs in one place.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-cream py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">

          {/* Section heading */}
          <div className="text-center mb-14">
            <h2
              className="text-gold mb-4"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 400,
              }}
            >
              Strategic Guidance for Landlords
            </h2>
            <p
              className="text-dark/55 text-[14px] font-light leading-relaxed max-w-lg mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We're here to help you navigate through all compliance and legal
              requirements for your current or future property.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Left — article */}
            <div>
              <h3
                className="text-gold mb-4"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
                  fontWeight: 400,
                }}
              >
                Understanding the Renters Reform Bill
              </h3>
              <p
                className="text-dark/65 text-[14px] font-light leading-relaxed mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                The UK rental sector is changing.
                <br />
                The Renters Reform Bill will bring in key changes for landlords,
                including:
              </p>
              <ul
                className="flex flex-col gap-2 text-dark/65 text-[14px] font-light"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {[
                  `Abolishing Section 21 "no fault" evictions`,
                  "Strengthening Section 8 possession grounds",
                  "Applying the Decent Homes Standard to rented properties",
                  "New rules for periodic tenancies",
                  "Establishing a Private Rented Sector Ombudsman",
                ].map((item) => (
                  <li key={item}>– {item}</li>
                ))}
              </ul>
            </div>

            {/* Right — resource links */}
            <div className="flex flex-col divide-y divide-dark/10">
              {externalLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 py-5 text-camel text-[13px] font-light hover:text-gold transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {label}
                  <ExternalLinkIcon />
                </a>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── The Lettings Process ── */}
      <section className="bg-offWhite py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-gold text-center mb-10"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 400,
            }}
          >
            The Lettings Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-x-0 md:divide-x md:divide-y-0 divide-dark/10 border border-dark/10">
            {[
              {
                num: "01",
                title: "Free Valuation & Advice",
                content: (
                  <p className="text-dark/60 text-[13px] font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    We provide an accurate rental valuation, tailored advice, and discuss
                    the service level that suits you best — Tenant Find (6%), Rent
                    Collection (8%), or Full Management (12%).
                  </p>
                ),
              },
              {
                num: "02",
                title: "Marketing Your Property",
                content: (
                  <div className="text-dark/60 text-[13px] font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <p className="font-semibold text-dark/75 mb-2">Professional listings on major portals</p>
                    <p>– Photography and descriptions to attract quality tenants</p>
                    <p>– Local advertising and direct tenant database matching</p>
                  </div>
                ),
              },
              {
                num: "03",
                title: "Viewings & Tenant Selection",
                content: (
                  <p className="text-dark/60 text-[13px] font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    We handle enquiries, viewings, and initial screening to ensure only
                    suitable tenants are shortlisted.
                  </p>
                ),
              },
              {
                num: "04",
                title: "Referencing & Tenancy Package",
                content: (
                  <div className="text-dark/60 text-[13px] font-light leading-relaxed flex flex-col gap-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <p className="font-semibold text-dark/75 mb-1">Full referencing via Homelet</p>
                    <p>– Right to Rent checks</p>
                    <p>– Tenancy agreement drafting</p>
                    <p>– Holding deposit collection (in line with legislation)</p>
                    <p className="mt-3 font-semibold text-dark/75">(Tenancy package available at £200)</p>
                  </div>
                ),
              },
            ].map(({ num, title, content }) => (
              <div key={num} className="p-8 flex flex-col gap-3">
                <span
                  className="text-gold/60 text-[12px] font-light"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {num}
                </span>
                <h3
                  className="text-dark/80"
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                    fontWeight: 400,
                  }}
                >
                  {title}
                </h3>
                {content}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inventory & Compliance ── */}
      <section className="bg-cream py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div className="flex flex-col gap-5 text-[13px] font-light text-dark/65 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            <h2
              className="text-gold"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                fontWeight: 400,
              }}
            >
              Inventory &amp; Compliance
            </h2>

            <div>
              <p className="font-semibold text-dark/80 mb-1">Independent inventory service available:</p>
              <p>– £180 (1–3 bedrooms)</p>
              <p>– £220 (4–6 bedrooms)</p>
            </div>

            <div>
              <p>Compliance checks arranged (Gas Safety, EICR, EPC, Smoke &amp; CO alarms)</p>
              <p className="mt-1">+ £30 admin fee per instruction applies</p>
            </div>

            <div>
              <p className="font-semibold text-dark/80 mb-1">Move-In Day–</p>
              <p>
                We collect the deposit and first month's rent, register deposits in line
                with legislation, and provide tenants with all legal documentation
                (e.g. How to Rent Guide).
              </p>
            </div>

            <div>
              <p className="font-semibold text-dark/80 mb-1">With our Managed Service, we take care of:</p>
              <p>– Rent collection &amp; statements</p>
              <p>– Maintenance &amp; repairs via trusted contractors</p>
              <p>– Regular inspections</p>
              <p>– Tenant queries &amp; 24/7 contact</p>
              <p>– Arrears management and legal guidance</p>
            </div>
          </div>

          {/* Right — image */}
          <div className="overflow-hidden rounded-sm h-[420px]">
            <img
              src="/listings/listings2.jpg"
              alt="Interior"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>
    </main>
  );
};

export default LandlordAdvicePage;
