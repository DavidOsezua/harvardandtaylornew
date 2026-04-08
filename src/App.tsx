import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PropertyPage from "./pages/PropertyPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import LandlordAdvicePage from "./pages/LandlordAdvicePage";
import TenantAdvicePage from "./pages/TenantAdvicePage";
import ContactUsPage from "./pages/ContactUsPage";
import PolicyPage from "./pages/PolicyPage";
import TermsPage from "./pages/TermsPage";

// Admin
import { AuthProvider } from "./admin/context/AuthContext";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminProperties from "./admin/pages/AdminProperties";
import AdminPropertyForm from "./admin/pages/AdminPropertyForm";
import AdminInquiries from "./admin/pages/AdminInquiries";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const PublicChrome = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <PublicChrome>
          <Routes>
            {/* ── Public ── */}
            <Route path="/" element={<HomePage />} />
            <Route path="properties" element={<PropertyPage />} />
            <Route path="/properties/:slug" element={<PropertyDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/landlord-advice" element={<LandlordAdvicePage />} />
            <Route path="/services/tenant-advice" element={<TenantAdvicePage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/privacy-policy" element={<PolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* ── Admin ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="properties" element={<AdminProperties />} />
              <Route path="properties/new" element={<AdminPropertyForm />} />
              <Route path="properties/:id/edit" element={<AdminPropertyForm />} />
              <Route path="inquiries" element={<AdminInquiries />} />
            </Route>
          </Routes>
        </PublicChrome>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
