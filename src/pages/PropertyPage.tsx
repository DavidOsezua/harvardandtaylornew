import { useState, useMemo, useEffect } from "react";
import PropertyHeroSection from "../components/properties/PropertyHeroSection";
import PropertyListingCard, { type PropertyListing } from "../components/properties/PropertyListingCard";
import ListingCard, { type Listing } from "../components/ListingCard";
import type { Filters } from "../components/properties/PropertyHeroSection";

// Horizontal slider listings
const sliderListings: PropertyListing[] = [
  {
    id: "s1",
    image: "/listings/listings1.webp",
    status: "LET AGREED",
    available: true,
    address: "Belmont Close, London, SW4",
    beds: 1,
    bathrooms: 2,
    dimensions: "10 X 10",
    price: "6,500",
    slug: "belmont-close-london-sw4-1",
  },
  {
    id: "s2",
    image: "/listings/listings2.webp",
    status: "FOR SALE",
    available: true,
    address: "Old Brompton Road, London, SW5",
    beds: 3,
    bathrooms: 2,
    dimensions: "12 X 14",
    price: "6,500",
    slug: "old-brompton-road-london-sw5",
  },
  {
    id: "s3",
    image: "/listings/listings3.webp",
    status: "AVAILABLE",
    available: true,
    address: "Belmont Close, London, SW4",
    beds: 3,
    bathrooms: 2,
    dimensions: "10 X 10",
    price: "6,500",
    slug: "belmont-close-london-sw4-2",
  },
];

// Grid card listings (above slider)
const topGridListings: Listing[] = [
  {
    id: "t1",
    image: "/listings/listings1.webp",
    badge: "FOR LET",
    address: "Belmont Close, London, SW4",
    beds: 3,
    bathrooms: 2,
    sqMeters: 120,
    price: "6,500",
    available: true,
    slug: "belmont-close-london-sw4-1",
  },
  {
    id: "t2",
    image: "/listings/listings2.webp",
    badge: "FOR SALE",
    address: "Old Brompton Road, London, SW5",
    beds: 3,
    bathrooms: 2,
    sqMeters: 120,
    price: "6,500",
    available: true,
    slug: "old-brompton-road-london-sw5",
  },
  {
    id: "t3",
    image: "/listings/listings3.webp",
    badge: "FOR LET",
    address: "Belmont Close, London, SW4",
    beds: 3,
    bathrooms: 2,
    sqMeters: 120,
    price: "6,500",
    available: true,
    slug: "belmont-close-london-sw4-2",
  },
];

// Grid card listings (below slider)
const bottomGridListings: Listing[] = [
  {
    id: "b1",
    image: "/listings/listings3.webp",
    badge: "FOR LET",
    address: "Clapham Manor Street, London, SW4",
    beds: 2,
    bathrooms: 1,
    sqMeters: 85,
    price: "3,200",
    available: true,
    slug: "clapham-manor-street-sw4",
  },
  {
    id: "b2",
    image: "/listings/listings1.webp",
    badge: "FOR SALE",
    address: "Landor Road, London, SW9",
    beds: 4,
    bathrooms: 3,
    sqMeters: 200,
    price: "8,000",
    available: false,
    slug: "landor-road-london-sw9",
  },
  {
    id: "b3",
    image: "/listings/listings2.webp",
    badge: "FOR LET",
    address: "Acre Lane, Brixton, SW2",
    beds: 1,
    bathrooms: 1,
    sqMeters: 55,
    price: "2,100",
    available: true,
    slug: "acre-lane-brixton-sw2",
  },
];

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SectionHeading = ({ title }: { title: string }) => (
  <h2
    className="text-dark mb-8"
    style={{
      fontFamily: "'Times New Roman', Times, serif",
      fontSize: "clamp(1.6rem, 3vw, 2rem)",
      fontWeight: 400,
    }}
  >
    {title}
  </h2>
);

const PropertyPage = () => {
  const [activeFilters, setActiveFilters] = useState<Filters>({
    minRent: "",
    maxRent: "",
    minBeds: "",
    type: "",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const filteredSlider = useMemo(() => {
    return sliderListings.filter((l) => {
      const price = parseInt(l.price.replace(/,/g, ""), 10);
      if (activeFilters.minRent && price < parseInt(activeFilters.minRent)) return false;
      if (activeFilters.maxRent && price > parseInt(activeFilters.maxRent)) return false;
      if (activeFilters.minBeds && l.beds < parseInt(activeFilters.minBeds)) return false;
      if (activeFilters.type) {
        const typeMatch =
          (activeFilters.type === "FOR LET" && l.status !== "FOR SALE") ||
          (activeFilters.type === "FOR SALE" && l.status === "FOR SALE");
        if (!typeMatch) return false;
      }
      return true;
    });
  }, [activeFilters]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredSlider]);

  const goTo = (index: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setVisible(true);
    }, 200);
  };

  const prev = () => goTo(currentIndex > 0 ? currentIndex - 1 : filteredSlider.length - 1);
  const next = () => goTo(currentIndex < filteredSlider.length - 1 ? currentIndex + 1 : 0);

  return (
    <main>
      <PropertyHeroSection onSearch={setActiveFilters} />

      {/* ── Top grid section ── */}
      <section className="bg-cream py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading title="Available Properties" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topGridListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Listings slider ── */}
      <section className="bg-offWhite py-14">
        <div className="max-w-5xl mx-auto px-6 md:px-8">

          {/* Heading + counter */}
          <div className="text-center mb-10">
            <h2
              className="text-gold mb-3"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 400,
              }}
            >
              Latest Listings
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-20 border-t border-dashed border-tan/50" />
              <span
                className="text-tan text-[13px] tabular-nums"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {filteredSlider.length > 0 ? currentIndex + 1 : 0}
              </span>
              <div className="h-px w-20 border-t border-dashed border-tan/50" />
            </div>
          </div>

          {filteredSlider.length > 0 ? (
            <>
              <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s ease" }}>
                <PropertyListingCard listing={filteredSlider[currentIndex]} />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prev}
                  className="flex items-center justify-center w-10 h-10 border border-tan/40 text-tan hover:border-gold hover:text-gold transition-colors duration-200 rounded-sm"
                  aria-label="Previous listing"
                >
                  <ChevronLeft />
                </button>

                <div className="flex items-center gap-2">
                  {filteredSlider.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to listing ${i + 1}`}
                      className={`transition-all duration-200 rounded-full ${
                        i === currentIndex ? "w-5 h-1.5 bg-camel" : "w-1.5 h-1.5 bg-tan/40 hover:bg-tan"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="flex items-center justify-center w-10 h-10 border border-tan/40 text-tan hover:border-gold hover:text-gold transition-colors duration-200 rounded-sm"
                  aria-label="Next listing"
                >
                  <ChevronRight />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-dark/40 text-[15px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                No properties match your search. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom grid section ── */}
      <section className="bg-cream py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading title="More Listings" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bottomGridListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertyPage;
