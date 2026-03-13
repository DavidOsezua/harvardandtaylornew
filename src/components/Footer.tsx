import { Link } from "react-router-dom";
import DarkBackgroundLogo from "./svgComponents/DarkBackgroundLogo";

const PhoneIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
      fill="currentColor"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      fill="currentColor"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const Footer = () => {
  return (
    <footer>
      {/* ── Partner logos bar — building image, fades into footer below ── */}
      <div
        className="relative py-20 px-6 md:px-12 overflow-hidden pb-20"
        style={{
          backgroundImage: "url('/images/premium-banner.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Top fade: blends with page above */}
        <div className="absolute inset-x-0 top-0 h-full bg-linear-to-b from-cream to-transparent" />
        {/* Bottom fade: blends into footer image below */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-linear-to-b from-transparent to-[#F8F6F0]" />
        <div className="relative max-w-7xl mx-auto flex items-center justify-center gap-12 flex-wrap pb-10">
          {/* Property Redress */}

          <div className=" w-20 md:w-40">
            <img src="/images/propertyAddress.png" alt="" />
          </div>
          {/* Rightmove */}
          <div className="w-20 md:w-40">
            <img src="/images/rightMove.png" alt="" />
          </div>
        </div>
      </div>

      {/* ── Main footer — footerImage background, overlaps partner bar ── */}
      <div
        className="relative px-6 md:px-16 pt-8 pb-6 -mt-16"
        style={{
          backgroundImage: "url('/images/footerImage.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Logo centered at the top */}
        <div className="flex justify-center mb-8">
          <DarkBackgroundLogo />
        </div>
        <div className="max-w-6xl mx-auto">
          {/* Three columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
            {/* Contact Us */}
            <div>
              <h4
                className="text-cream-light text-[12px] tracking-widest uppercase mb-5"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 400 }}
              >
                Contact Us
              </h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="tel:03330506413"
                    className="flex items-center gap-2 text-cream-light/70 text-[11px] font-light hover:text-cream-light transition-colors duration-200 tracking-wide"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    <PhoneIcon /> 03330 506413
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@harvardandtaylor.com"
                    className="flex items-center gap-2 text-cream-light/70 text-[11px] font-light hover:text-cream-light transition-colors duration-200 tracking-wide uppercase"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    <EmailIcon /> info@harvardandtaylor.com
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <a
                    href="https://wa.me/447822013391"
                    className="flex items-center gap-2 text-cream-light/70 text-[11px] font-light hover:text-cream-light transition-colors duration-200 tracking-wide uppercase"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    <WhatsAppIcon /> WhatsApp
                  </a>
                  <span className="text-cream-light/30 text-[11px]">|</span>
                  <a
                    href="https://instagram.com"
                    className="flex items-center gap-2 text-cream-light/70 text-[11px] font-light hover:text-cream-light transition-colors duration-200 tracking-wide uppercase"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    <InstagramIcon /> Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Find Us */}
            <div className="sm:text-center">
              <h4
                className="text-cream-light text-[12px] tracking-widest uppercase mb-5"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 400 }}
              >
                Find Us
              </h4>
              <address
                className="not-italic text-cream-light/70 text-[11px] font-light leading-relaxed tracking-wide uppercase"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Office 110, 49-65
                <br />
                Southampton Way,
                <br />
                London,
                <br />
                SE5 7SW
              </address>
            </div>

            {/* Policies */}
            <div className="sm:text-right">
              <h4
                className="text-cream-light text-[12px] tracking-widest uppercase mb-5"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 400 }}
              >
                Policies
              </h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Privacy Policy", to: "/privacy-policy" },
                  { label: "Cookie Policy", to: "/privacy-policy" },
                  { label: "Terms & Conditions", to: "/terms" },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-cream-light/70 text-[11px] font-light hover:text-cream-light transition-colors duration-200 tracking-widest uppercase"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-cream-light/10 pt-5 text-center">
            <p
              className="text-cream-light/40 text-[10px] tracking-widest uppercase"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Copyright Harvard &amp; Taylor {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
