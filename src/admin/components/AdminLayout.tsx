import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

const PropertiesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V9.5z" />
  </svg>
);

const InquiriesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const navItems = [
  { to: "/admin", label: "Dashboard", icon: <DashboardIcon />, end: true },
  { to: "/admin/properties", label: "Properties", icon: <PropertiesIcon />, end: false },
  { to: "/admin/inquiries", label: "Inquiries", icon: <InquiriesIcon />, end: false },
];

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate("/admin/login", { replace: true });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 text-[13px] tracking-wide transition-colors duration-200 rounded-md ${
      isActive
        ? "bg-gold/10 text-gold border-l-2 border-gold"
        : "text-coffeeBrown/80 hover:bg-cream hover:text-gold border-l-2 border-transparent"
    }`;

  return (
    <div className="min-h-screen bg-offWhite flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Sidebar ── */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-tan/20 z-40 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="px-6 py-6 border-b border-tan/20">
            <Link to="/admin" className="block" onClick={() => setMobileOpen(false)}>
              <p
                className="text-gold text-[18px] leading-tight"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                Harvard &amp; Taylor
              </p>
              <p
                className="text-tan text-[10px] tracking-[0.2em] uppercase mt-1"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Admin Panel
              </p>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-6 flex flex-col gap-1" style={{ fontFamily: "'Lato', sans-serif" }}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={linkClass}
              >
                {item.icon}
                <span className="uppercase tracking-widest text-[11px]">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User / sign out */}
          <div className="px-4 py-5 border-t border-tan/20">
            <p
              className="text-[10px] tracking-[0.2em] uppercase text-tan mb-1"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Signed in as
            </p>
            <p
              className="text-[12px] text-coffeeBrown truncate mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {user?.email ?? "—"}
            </p>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[11px] tracking-widest uppercase text-gold border border-gold/40 rounded-full hover:bg-gold hover:text-cream transition-colors duration-200"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <LogoutIcon />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-dark/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Main column ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar (mobile only — sidebar handles desktop) */}
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-tan/20 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="text-coffeeBrown p-1"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <p
            className="text-gold text-[15px]"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Harvard &amp; Taylor
          </p>
          <div className="w-7" />
        </header>

        {/* Page content */}
        <main className="flex-1 px-5 md:px-10 py-8 md:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
