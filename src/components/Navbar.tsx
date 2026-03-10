import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LightBacgroundLogo from "./svgComponents/LightBacgroundLogo";
import Hamburgermenu from "./svgComponents/Hamburgermenu";

const navLinks = [
  { label: "Properties", to: "/properties" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `font-lato text-[13px] font-light tracking-widest transition-colors duration-200 uppercase ${
    isActive ? "text-gold border-b border-gold pb-0.5" : "text-dark hover:text-gold"
  }`;

// p-px (1px) is reliable across all browsers — 0.5px gets rounded to 0 on some.
// Inner radius is 1px smaller than outer (16px → 15px) so corners don't clip the border.
const GradientBorderCard = ({
  children,
  className = "",
  shadow = false,
}: {
  children: React.ReactNode;
  className?: string;
  shadow?: boolean;
}) => (
  <div
    className={`p-px rounded-2xl ${shadow ? "shadow-2xl" : ""} ${className}`}
    style={{ background: "var(--background-image-border-gold)" }}
  >
    <div className="bg-cream rounded-[15px]">{children}</div>
  </div>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-cream/90 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        {/* ── Desktop layout ── */}
        <div className="hidden md:flex items-center justify-center gap-20">
          <div className="flex items-center gap-10">
            <NavLink to="/properties" className={desktopLinkClass} style={{ fontFamily: "'Lato', sans-serif" }}>
              Properties
            </NavLink>
            <NavLink to="/about" className={desktopLinkClass} style={{ fontFamily: "'Lato', sans-serif" }}>
              About
            </NavLink>
          </div>

          <Link to="/" className="shrink-0">
            <LightBacgroundLogo maxWidth="130px" />
          </Link>

          <div className="flex items-center gap-10">
            <NavLink to="/services" className={desktopLinkClass} style={{ fontFamily: "'Lato', sans-serif" }}>
              Services
            </NavLink>
            <NavLink to="/contact" className={desktopLinkClass} style={{ fontFamily: "'Lato', sans-serif" }}>
              Contact
            </NavLink>
          </div>
        </div>

        {/* ── Mobile layout ── */}
        <div className="relative md:hidden">
          {/* Full-page blur overlay rendered in <body> so it sits below z-50 nav */}

          {/* Gradient bordered card — expands downward when menu opens */}
          <GradientBorderCard className="absolute w-full">
            {/* Top bar: logo + hamburger */}
            <div className="flex items-center justify-between px-5 py-3">
              <Link
                to="/"
                className="shrink-0 w-24"
                onClick={() => setMenuOpen(false)}
              >
                <LightBacgroundLogo maxWidth="50px" />
              </Link>

              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                className="flex flex-col justify-center items-center gap-1.25 p-1 shrink-0"
              >
                <Hamburgermenu />
              </button>
            </div>

            {/* Dropdown links — revealed on open */}
            {menuOpen && (
              <div className="py-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-7 py-4 text-[15px] font-light tracking-wide transition-colors duration-200 ${
                        isActive ? "text-gold" : "text-dark hover:text-gold"
                      }`
                    }
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}
          </GradientBorderCard>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
