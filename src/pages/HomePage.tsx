import HeroSection from "../components/home/HeroSection";
import HowWeWorkSection from "../components/home/HowWeWorkSection";
import LatestListingsSection from "../components/home/LatestListingsSection";
import PremiumBannerSection from "../components/home/PremiumBannerSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-cream">
      <HeroSection />
      <HowWeWorkSection />
      <LatestListingsSection />
      <PremiumBannerSection />
    </div>
  );
};

export default HomePage;
