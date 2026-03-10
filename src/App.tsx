import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
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
        <Route path="/cookie-policy" element={<PolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
