import { useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import { createInquiry } from "../admin/api/inquiries";

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2a1 1 0 011.05-.24 11.5 11.5 0 003.6.6 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.5 11.5 0 00.6 3.6 1 1 0 01-.25 1.05L6.6 10.8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
);

const contactDetails = [
  { icon: <PhoneIcon />, label: "Phone Number", value: "03330 506413", href: "tel:03330506413" },
  { icon: <EmailIcon />, label: "Email", value: "info@harvardandtaylor.com", href: "mailto:info@harvardandtaylor.com" },
  { icon: <WhatsAppIcon />, label: "Whatsapp", value: "07822 013391", href: "https://wa.me/447822013391" },
  { icon: <LocationIcon />, label: "Our Office", value: "Office 110, 49-65\nSouthampton Way\nLondon\nSE5 7SW", href: null },
];

const ContactUsPage = () => {
  const location = useLocation();
  const prefillAddress = (location.state as { propertyAddress?: string } | null)
    ?.propertyAddress;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: prefillAddress ? "lettings" : "",
    message: prefillAddress
      ? `I would like to enquire about the property at ${prefillAddress}.\n\n`
      : "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const enquiryLabel = form.enquiryType
        ? form.enquiryType.charAt(0).toUpperCase() + form.enquiryType.slice(1)
        : "General";
      await createInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `[${enquiryLabel}] ${form.message}`,
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/contactUsHeroDesktop.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-cream/95 via-cream/80 to-cream/30" />

        <FadeIn className="relative flex flex-col items-center justify-center text-center px-6 py-28 max-w-3xl mx-auto">
          <p
            className="text-camel text-[11px] tracking-[0.25em] uppercase mb-5"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Contact Us
          </p>
          <h1
            className="text-gold leading-tight mb-5"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
              fontWeight: 400,
            }}
          >
            Get In Touch
          </h1>
          <p
            className="text-dark/55 text-[15px] font-light leading-relaxed max-w-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Speak with our team today, and take the next step towards refined
            London living.
          </p>
        </FadeIn>
      </section>

      {/* ── Contact Form + Details ── */}
      <section className="bg-cream py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

          {/* Left — form */}
          <FadeIn from="left">
            <p
              className="text-camel text-[11px] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Contact Us
            </p>
            <h2
              className="text-gold mb-8"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 400,
              }}
            >
              Send an Enquiry
            </h2>

            {submitted ? (
              <div
                className="border border-gold/40 bg-cream/60 px-6 py-10 text-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <p
                  className="text-gold text-[13px] tracking-[0.2em] uppercase mb-3"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Message Received
                </p>
                <p className="text-dark/70 text-[15px] leading-relaxed">
                  Thank you, {form.name || "we've got your enquiry"}. A member of our
                  team will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-dark/60 text-[12px]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full border border-dark/15 bg-transparent px-3 py-2.5 text-[13px] text-dark/70 placeholder:text-dark/30 outline-none focus:border-gold transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-dark/60 text-[12px]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Your email address"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full border border-dark/15 bg-transparent px-3 py-2.5 text-[13px] text-dark/70 placeholder:text-dark/30 outline-none focus:border-gold transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="phone"
                    className="text-dark/60 text-[12px]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full border border-dark/15 bg-transparent px-3 py-2.5 text-[13px] text-dark/70 placeholder:text-dark/30 outline-none focus:border-gold transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>

                {/* Enquiry Type */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="enquiry-type"
                    className="text-dark/60 text-[12px]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Enquiry Type
                  </label>
                  <select
                    id="enquiry-type"
                    value={form.enquiryType}
                    onChange={(e) => updateField("enquiryType", e.target.value)}
                    className="w-full border border-dark/15 bg-cream px-3 py-2.5 text-[13px] text-dark/60 outline-none focus:border-gold transition-colors duration-200 appearance-none cursor-pointer"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="">General Enquiry</option>
                    <option value="lettings">Lettings</option>
                    <option value="landlord">Landlord Services</option>
                    <option value="tenant">Tenant Enquiry</option>
                    <option value="valuation">Free Valuation</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-dark/60 text-[12px]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Your Enquiry"
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="w-full border border-dark/15 bg-transparent px-3 py-2.5 text-[13px] text-dark/70 placeholder:text-dark/30 outline-none focus:border-gold transition-colors duration-200 resize-none"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>

                {error && (
                  <p
                    className="text-red-600 text-[12px]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-camel text-cream-light text-[13px] tracking-wide py-3.5 hover:bg-gold transition-colors duration-200 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {submitting ? "Sending…" : "Send Enquiry"}
                </button>
              </form>
            )}
          </FadeIn>

          {/* Right — contact details */}
          <FadeIn from="right" delay={150} className="flex flex-col gap-8 md:pt-24">
            {contactDetails.map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="text-camel mt-0.5 shrink-0">{icon}</span>
                <div>
                  <p
                    className="text-camel text-[11px] tracking-[0.15em] uppercase mb-1"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-dark/75 text-[15px] font-light hover:text-gold transition-colors duration-200 whitespace-pre-line"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p
                      className="text-dark/75 text-[15px] font-light whitespace-pre-line"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </FadeIn>

        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-cream px-6 md:px-10 pb-16">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ minHeight: "280px" }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/howWeWorkLeft.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-dark/65" />

              {/* Content */}
              <div className="relative flex flex-col items-center justify-center text-center px-8 py-20 gap-8">
                <h2
                  className="text-white uppercase tracking-widest leading-tight"
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                  }}
                >
                  Let's Talk About Your Property
                </h2>

                <a
                  href="tel:03330506413"
                  className="inline-flex items-center gap-2.5 bg-white/95 text-dark/75 text-[13px] tracking-wide px-7 py-3 rounded-full hover:bg-white transition-colors duration-200"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Get In Touch
                  <span className="text-camel">
                    <PhoneIcon />
                  </span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPage;
