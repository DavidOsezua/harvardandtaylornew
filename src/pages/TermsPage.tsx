const TermsPage = () => {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/PrivacyAndTermsHero.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        />
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
            Terms and Conditions
          </h1>
          <p
            className="text-camel text-[11px] tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            February 2026
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">

            {/* Intro */}
            <div className="mb-12">
              <p className="text-black font-sans text-base md:text-lg leading-relaxed">
                "We", "us" and "our" refer to Harvard & Taylor, and "you" refers to the landlord.
              </p>
            </div>

            {/* 1. Services & Fees */}
            <div className="mb-12">
              <h2
                className="text-base md:text-lg font-sans font-semibold tracking-widest uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                1. Services &amp; Fees
              </h2>
              {/* Mobile: stacked cards */}
              <div className="flex flex-col gap-4 md:hidden font-sans text-black text-sm">
                {[
                  {
                    level: "Tenant-Find Only",
                    fee: "6%",
                    items: [
                      "Advertise the property",
                      "Conduct viewings & reference checks",
                      "Draft tenancy agreement",
                      "Collect first month's rent & deposit",
                    ],
                  },
                  {
                    level: "Rent-Collect",
                    fee: "8%",
                    intro: "Tenant-Find service plus:",
                    items: ["Monthly rent invoicing & chasing", "Rent statements to you"],
                  },
                  {
                    level: "Full Management",
                    fee: "12%",
                    intro: "Rent-Collect service plus:",
                    items: [
                      "Routine inspections (quarterly)",
                      "Coordinate repairs & maintenance (up to the authority limit – see §4.4)",
                      "24/7 tenant contact",
                    ],
                  },
                ].map(({ level, fee, intro, items }) => (
                  <div key={level} className="border rounded-sm p-4 space-y-3" style={{ borderColor: "#e8e0d0" }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-base">{level}</span>
                      <span className="text-lg font-semibold" style={{ color: "#C9A96E" }}>{fee}</span>
                    </div>
                    <div style={{ borderTop: "1px solid #e8e0d0" }} className="pt-3">
                      {intro && <p className="mb-1 text-black/70">{intro}</p>}
                      <ul className="list-disc pl-5 space-y-1 text-black/80">
                        {items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <div style={{ borderTop: "1px solid #e8e0d0" }} className="pt-3 flex items-center justify-between text-xs text-black/50">
                      <span>Special Rate (if agreed)</span>
                      <span className="inline-block w-12 border-b border-black/30" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse text-base font-sans text-black">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #C9A96E" }}>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: "#C9A96E" }}>Service Level</th>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: "#C9A96E" }}>What's Included (summary)</th>
                      <th className="text-left py-3 pr-4 font-semibold whitespace-nowrap" style={{ color: "#C9A96E" }}>Standard Fee</th>
                      <th className="text-left py-3 font-semibold whitespace-nowrap" style={{ color: "#C9A96E" }}>Special Rate (if agreed)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #e8e0d0" }}>
                      <td className="py-5 pr-4 align-top whitespace-nowrap">Tenant-Find Only</td>
                      <td className="py-5 pr-4 align-top">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Advertise the property</li>
                          <li>Conduct viewings &amp; reference checks</li>
                          <li>Draft tenancy agreement</li>
                          <li>Collect first month's rent &amp; deposit</li>
                        </ul>
                      </td>
                      <td className="py-5 pr-4 align-top">6%</td>
                      <td className="py-5 align-top">
                        <span className="inline-block w-16 border-b border-black" />
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e8e0d0" }}>
                      <td className="py-5 pr-4 align-top whitespace-nowrap">Rent-Collect</td>
                      <td className="py-5 pr-4 align-top">
                        <p className="mb-2">Tenant-Find service plus:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Monthly rent invoicing &amp; chasing</li>
                          <li>Rent statements to you</li>
                        </ul>
                      </td>
                      <td className="py-5 pr-4 align-top">8%</td>
                      <td className="py-5 align-top">
                        <span className="inline-block w-16 border-b border-black" />
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e8e0d0" }}>
                      <td className="py-5 pr-4 align-top whitespace-nowrap">Full Management</td>
                      <td className="py-5 pr-4 align-top">
                        <p className="mb-2">Rent-Collect service plus:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Routine inspections (quarterly)</li>
                          <li>Coordinate repairs &amp; maintenance (up to the authority limit – see §4.4)</li>
                          <li>24/7 tenant contact</li>
                        </ul>
                      </td>
                      <td className="py-5 pr-4 align-top">12%</td>
                      <td className="py-5 align-top">
                        <span className="inline-block w-16 border-b border-black" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Contract Term */}
            <div className="mb-12">
              <h2
                className="text-base md:text-lg font-sans font-semibold tracking-widest uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                2. Contract Term
              </h2>
              <p className="text-black font-sans text-base md:text-lg leading-relaxed">
                These Terms begin when you sign our Agency Agreement and remain in force until the tenancy ends or is terminated. If a tenancy renews, fees apply to each new term accordingly.
              </p>
            </div>

            {/* 3. Your Obligations as Landlord */}
            <div className="mb-12">
              <h2
                className="text-base md:text-lg font-sans font-semibold tracking-widest uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                3. Your Obligations as Landlord
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-black font-sans text-base md:text-lg leading-relaxed">
                <li>Confirm your legal right to let the property.</li>
                <li>Comply with all landlord legislation (EPC, gas/electric checks, alarms, licensing, Right-to-Rent, etc.).</li>
                <li>Maintain insurance (buildings and contents if furnished).</li>
                <li>Provide accurate information and notify us of any changes.</li>
                <li>Authorise Harvard &amp; Taylor to protect the deposit or confirm that you will do so within 30 days.</li>
              </ul>
            </div>

            {/* 4. Our Obligations as Your Property Manager */}
            <div className="mb-12">
              <h2
                className="text-base md:text-lg font-sans font-semibold tracking-widest uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                4. Our Obligations as Your Property Manager
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-black font-sans text-base md:text-lg leading-relaxed">
                <li>Deliver the agreed services with reasonable care and skill.</li>
                <li>Hold client funds in a protected, insured client account.</li>
                <li>Transfer rent (less fees/deductions) to you within 5 working days of receipt.</li>
                <li>Authorise maintenance work up to £250 (incl. VAT) per issue if under Management.</li>
                <li>Act in emergencies to protect the property or tenant and notify you as soon as possible.</li>
                <li>Retain financial records for at least 6 years.</li>
              </ul>
            </div>

            {/* 5. Fees & Payment */}
            <div className="mb-12">
              <h2
                className="text-base md:text-lg font-sans font-semibold tracking-widest uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                5. Fees &amp; Payment
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-black font-sans text-base md:text-lg leading-relaxed">
                <li>All fees are inclusive of VAT (unless stated otherwise).</li>
                <li>Advance fees for Tenant-Find and Rent-Collect services are non-refundable after the agreement is signed.</li>
                <li>Management fees are charged monthly, only when rent is received.</li>
                <li>Late payments incur 3% interest above Bank of England base rate, calculated daily.</li>
              </ul>
            </div>

            {/* 6. Tenancy Deposit Handling */}
            <div className="mb-12">
              <h2
                className="text-base md:text-lg font-sans font-semibold tracking-widest uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                6. Tenancy Deposit Handling
              </h2>
              <p className="text-black font-sans text-base md:text-lg leading-relaxed">
                Where Harvard &amp; Taylor holds the deposit, it will be protected in a government-approved custodial scheme (e.g., TDS). If you hold the deposit, you are responsible for compliance and indemnify us against any breach.
              </p>
            </div>

            {/* 7. Liability & Indemnity */}
            <div className="mb-12">
              <h2
                className="text-base md:text-lg font-sans font-semibold tracking-widest uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                7. Liability &amp; Indemnity
              </h2>
              <p className="text-black font-sans text-base md:text-lg leading-relaxed">
                Harvard &amp; Taylor is not liable for indirect or consequential loss. Our total liability is limited to the fees received in the prior 12-month period (excluding injury/death due to negligence). You indemnify us against claims arising from your breach of law or provision of inaccurate information.
              </p>
            </div>

            {/* 8. Data Protection */}
            <div className="mb-12">
              <h2
                className="text-base md:text-lg font-sans font-semibold tracking-widest uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                8. Data Protection
              </h2>
              <p className="text-black font-sans text-base md:text-lg leading-relaxed">
                We process personal data in accordance with the UK GDPR and our Privacy Notice. Tenant and landlord data may be shared with referencing agencies, contractors, or deposit schemes for service delivery.
              </p>
            </div>

            {/* 9. Termination */}
            <div className="mb-12">
              <h2
                className="text-base md:text-lg font-sans font-semibold tracking-widest uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                9. Termination
              </h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm md:text-base font-sans text-black">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #C9A96E" }}>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: "#C9A96E" }}>Party</th>
                      <th className="text-left py-3 pr-4 font-semibold whitespace-nowrap" style={{ color: "#C9A96E" }}>Notice Period</th>
                      <th className="text-left py-3 font-semibold" style={{ color: "#C9A96E" }}>Terms</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #e8e0d0" }}>
                      <td className="py-5 pr-4 align-top">You</td>
                      <td className="py-5 pr-4 align-top whitespace-nowrap">14 days</td>
                      <td className="py-5 align-top">All outstanding fees are due immediately. Renewal fees still apply if our tenant remains.</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e8e0d0" }}>
                      <td className="py-5 pr-4 align-top whitespace-nowrap">Harvard &amp; Taylor</td>
                      <td className="py-5 pr-4 align-top whitespace-nowrap">14 days</td>
                      <td className="py-5 align-top">We may terminate immediately in the case of serious breach or failure to pay fees.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-black font-sans text-base md:text-lg leading-relaxed">
                Upon termination of our Management service, keys and documents will be handed over when all dues are cleared.
              </p>
            </div>

            {/* 10. Renewals */}
            <div className="mb-12">
              <h2
                className="text-base md:text-lg font-sans font-semibold tracking-widest uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                10. Renewals
              </h2>
              <p className="text-black font-sans text-base md:text-lg leading-relaxed">
                Where a tenancy arranged by Harvard &amp; Taylor is renewed or extended, a reduced renewal fee of £400.00 is payable. This applies whether or not a new tenancy agreement is signed.
              </p>
            </div>

            {/* 11. Complaints & Redress Scheme */}
            <div className="mb-12">
              <h2
                className="text-base md:text-lg font-sans font-semibold tracking-widest uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                11. Complaints &amp; Redress Scheme
              </h2>
              <p className="text-black font-sans text-base md:text-lg leading-relaxed">
                Harvard &amp; Taylor is a member of the Property Redress Scheme (PRS). Complaints must be submitted in writing. We aim to acknowledge within 3 working days and resolve within 15 working days.
              </p>
            </div>

            {/* 12. Governing Law */}
            <div className="mb-12">
              <h2
                className="text-base md:text-lg font-sans font-semibold tracking-widest uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                12. Governing Law
              </h2>
              <p className="text-black font-sans text-base md:text-lg leading-relaxed">
                These Terms are governed by the laws of England &amp; Wales and subject to the exclusive jurisdiction of its courts.
              </p>
            </div>

          </article>
        </div>
      </section>
    </main>
  );
};

export default TermsPage;
