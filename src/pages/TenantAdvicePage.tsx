import FadeIn from "../components/FadeIn";

const TenantAdvicePage = () => {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/tenantAdvice.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-cream via-cream/85 to-cream/20" />

        <FadeIn className="relative flex flex-col items-center justify-center text-center px-6 py-24 max-w-3xl mx-auto">
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
            Tenant Advice &amp;
            <br />
            Letting Guide
          </h1>
          <p
            className="text-dark/55 text-[15px] font-light leading-relaxed max-w-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            From landlords to tenants, we provide transparent processes, practical
            advice and structured support throughout.
          </p>
        </FadeIn>
      </section>

      {/* ── Clear Guidance intro ── */}
      <section className="bg-cream py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">

          {/* Intro heading + subtitle */}
          <FadeIn className="text-center mb-14">
            <h2
              className="text-gold mb-5"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 400,
              }}
            >
              Clear Guidance for Tenants
            </h2>
            <p
              className="text-dark/55 text-[14px] font-light leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Whether you're renting for the first time or moving to a new home,
              Harvard &amp; Taylor is here to make the process simple, transparent, and
              stress-free.
            </p>
          </FadeIn>

          {/* Process heading */}
          <FadeIn delay={100}>
            <h2
              className="text-gold text-center mb-10"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 400,
              }}
            >
              Renting a Property with Harvard &amp; Taylor
            </h2>
          </FadeIn>

          {/* Steps grid */}
          <FadeIn delay={200}>
            <div className="border border-dark/10" style={{ fontFamily: "'Inter', sans-serif" }}>

              {/* Row 1: 01 + 02 */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dark/10 border-b border-dark/10">
                {[
                  {
                    num: "01",
                    title: "Search & Register Interest",
                    body: "Browse our available properties online. Found one you like? Contact us or register your interest — we'll arrange a viewing that suits your schedule.",
                  },
                  {
                    num: "02",
                    title: "Book a Viewing",
                    body: "We'll show you around the property, answer any questions, and give you honest, clear details on rent, utilities, and tenancy terms.",
                  },
                ].map(({ num, title, body }) => (
                  <div key={num} className="p-8 flex flex-col gap-3">
                    <span className="text-gold/60 text-[12px]" style={{ fontFamily: "'Lato', sans-serif" }}>{num}</span>
                    <h3
                      className="text-dark/80"
                      style={{
                        fontFamily: "'Times New Roman', Times, serif",
                        fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                        fontWeight: 400,
                      }}
                    >
                      {title}
                    </h3>
                    <p className="text-dark/60 text-[13px] font-light leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

              {/* Row 2: 03 full width */}
              <div className="p-8 flex flex-col gap-3 border-b border-dark/10">
                <span className="text-gold/60 text-[12px]" style={{ fontFamily: "'Lato', sans-serif" }}>03</span>
                <h3
                  className="text-dark/80"
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                    fontWeight: 400,
                  }}
                >
                  Apply &amp; Be Referenced
                </h3>
                <p className="text-dark/60 text-[13px] font-light leading-relaxed mb-2">
                  Ready to move in? We'll ask you to complete an application form and begin
                  referencing via our trusted partner, Homelet referencing. This includes:
                </p>
                <div className="text-dark/60 text-[13px] font-light leading-relaxed flex flex-col gap-1">
                  <p>- Credit checks</p>
                  <p>- Employment &amp; income verification</p>
                  <p>- Previous landlord references</p>
                  <p>- Right to Rent checks (photo ID &amp; visa/residency documents if applicable)</p>
                </div>
              </div>

              {/* Row 3: 04 + 05 */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dark/10">
                {[
                  {
                    num: "04",
                    title: "Deposit & Holding Fee",
                    body: (
                      <>
                        <p>We'll request a holding deposit (1 week's rent) to secure the property while final checks are completed.</p>
                        <p className="mt-2">This is deducted from your first month's rent if you proceed.</p>
                      </>
                    ),
                  },
                  {
                    num: "05",
                    title: "Sign & Move In",
                    body: (
                      <>
                        <p>You'll receive your tenancy agreement to sign digitally. Once the deposit and first month's rent are received, you'll get your keys and move-in info.</p>
                        <p className="mt-2">Welcome to your new home!</p>
                      </>
                    ),
                  },
                ].map(({ num, title, body }) => (
                  <div key={num} className="p-8 flex flex-col gap-3">
                    <span className="text-gold/60 text-[12px]" style={{ fontFamily: "'Lato', sans-serif" }}>{num}</span>
                    <h3
                      className="text-dark/80"
                      style={{
                        fontFamily: "'Times New Roman', Times, serif",
                        fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                        fontWeight: 400,
                      }}
                    >
                      {title}
                    </h3>
                    <div className="text-dark/60 text-[13px] font-light leading-relaxed">{body}</div>
                  </div>
                ))}
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── How to Rent Guide ── */}
      <section className="bg-offWhite py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <FadeIn from="left" className="flex flex-col gap-5 text-[13px] font-light text-dark/65 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            <h2
              className="text-gold"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                fontWeight: 400,
                lineHeight: 1.25,
              }}
            >
              The 'How to Rent' Guide –
              <br />
              Know Your Rights
            </h2>

            <p>
              Before you sign your tenancy agreement, Harvard &amp; Taylor will provide
              you with the official 'How to Rent' guide issued by the government. This
              guide explains your rights and responsibilities as a tenant and includes
              information on:
            </p>

            <div className="flex flex-col gap-1.5">
              {[
                "What to check before renting",
                "Fees landlords/agents can and can't charge",
                "How your deposit is protected",
                "What to do if repairs are needed",
                "How to end a tenancy properly",
              ].map((item) => (
                <p key={item} className="font-semibold text-dark/75">– {item}</p>
              ))}
            </div>

            <p>
              You will receive the latest version of the guide by email (PDF) or printed
              copy when you agree to rent with us — this is a legal requirement.
            </p>

            <p>You can also view the most recent version online:</p>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start px-6 py-3 border border-dark/25 text-dark/65 text-[12px] tracking-wide hover:border-gold hover:text-gold transition-colors duration-200"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              View PDF Guide
            </a>
          </FadeIn>

          {/* Right — image */}
          <FadeIn from="right" delay={150} className="overflow-hidden rounded-sm h-[460px]">
            <img
              src="/listings/listings1.webp"
              alt="Interior"
              className="w-full h-full object-cover"
            />
          </FadeIn>

        </div>
      </section>
    </main>
  );
};

export default TenantAdvicePage;
