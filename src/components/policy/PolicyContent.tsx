const PolicyContent = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <article className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              1. Introduction
            </h2>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed mb-4">
              Harvard & Taylor ("we", "us", "our") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, share and safeguard your personal data when you visit our website https://www.harvardandtaylor.com or engage with our services.
            </p>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed">
              By using our website, you agree to the practices described in this Privacy Policy.
            </p>
          </div>

          {/* Data We May Collect */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              2. Data We May Collect
            </h2>

            {/* Section a */}
            <div className="mb-6">
              <h3 className="text-xl font-sans font-semibold mb-4 text-black">
                a) Information you provide directly
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-black font-sans text-base md:text-lg leading-relaxed">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Postal address</li>
                <li>Details you submit via forms, emails, or correspondence</li>
              </ul>
            </div>

            {/* Section b */}
            <div className="mb-6">
              <h3 className="text-xl font-sans font-semibold mb-4 text-black">
                b) Information collected automatically
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-black font-sans text-base md:text-lg leading-relaxed">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device and operating system</li>
                <li>Pages you visit and time spent on the site</li>
                <li>Cookies and tracking data</li>
              </ul>
            </div>

            {/* Section c */}
            <div className="mb-6">
              <h3 className="text-xl font-sans font-semibold mb-4 text-black">
                c) Information from third parties
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-black font-sans text-base md:text-lg leading-relaxed">
                <li>Public sources, directories, or service partners</li>
              </ul>
            </div>
          </div>

          {/* How We Use Your Data */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              3. How We Use Your Data
            </h2>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black font-sans text-base md:text-lg leading-relaxed">
              <li>Respond to your inquiries and provide our services</li>
              <li>Improve and personalize our website and customer experience</li>
              <li>Conduct research and analysis</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Send you marketing or promotional communications (with your consent)</li>
              <li>Detect and prevent fraud, abuse, or security issues</li>
            </ul>
          </div>

          {/* Cookies & Tracking */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              4. Cookies & Tracking
            </h2>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience on our site. Cookies are small text files placed on your device when you visit our website.
            </p>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed mb-4">
              We use cookies for analytics, session management, and personalization. We may also use third-party services (like Google Analytics) to track website usage.
            </p>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed">
              You can manage your cookie preferences through your browser settings.
            </p>
          </div>

          {/* Sharing Your Data */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              5. Sharing Your Data
            </h2>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed mb-4">
              We do not sell your personal data. We may share it in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black font-sans text-base md:text-lg leading-relaxed">
              <li>With trusted third-party service providers who help operate our business (e.g., hosting, analytics)</li>
              <li>To comply with legal obligations or respond to lawful requests</li>
              <li>In connection with a business transaction (e.g., merger, acquisition)</li>
              <li>With your explicit consent or as otherwise disclosed to you</li>
            </ul>
          </div>

          {/* International Transfers */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              6. International Transfers
            </h2>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed">
              If we transfer your data outside the UK or EEA, we ensure it is protected using legal safeguards such as standard contractual clauses.
            </p>
          </div>

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              7. Data Retention
            </h2>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed">
              We keep your data only as long as necessary for the purposes it was collected, or as required by law. After that, we delete or anonymise it securely.
            </p>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              8. Your Rights
            </h2>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed mb-4">
              You may have the following rights under data protection law:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black font-sans text-base md:text-lg leading-relaxed">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data ("right to be forgotten")</li>
              <li>Restriction or objection to processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent at any time</li>
              <li>Complaint to the Information Commissioner's Office (ICO)</li>
            </ul>
          </div>

          {/* Security */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              9. Security
            </h2>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed">
              We use appropriate technical and organisational measures to protect your data. However, no online system is completely secure, and we cannot guarantee absolute security.
            </p>
          </div>

          {/* External Links */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              10. External Links
            </h2>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed">
              Our website may link to external sites. We are not responsible for their privacy practices and encourage you to review their policies.
            </p>
          </div>

          {/* Children's Data */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              11. Children's Data
            </h2>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed">
              Our services are not directed at children under 16, and we do not knowingly collect their personal information.
            </p>
          </div>

          {/* Changes to This Policy */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              12. Changes to This Policy
            </h2>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.
            </p>
          </div>

          {/* Contact Us */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black">
              13. Contact Us
            </h2>
            <p className="text-black font-sans text-base md:text-lg leading-relaxed mb-4">
              If you have questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="text-black font-sans text-base md:text-lg leading-relaxed space-y-2">
              <p className="font-semibold">Harvard & Taylor</p>
              <p>153a Rye Lane, Peckham, London SE15 4TL</p>
              <p>Email: info@harvard-taylor.com</p>
              <p>Telephone: +44 7539 521124</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default PolicyContent;