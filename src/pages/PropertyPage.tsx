import { useState, useMemo, useEffect } from "react";
import PropertyHeroSection from "../components/properties/PropertyHeroSection";
import PropertyListingCard, { type PropertyListing } from "../components/properties/PropertyListingCard";
import ListingCard, { type Listing } from "../components/ListingCard";
import type { Filters } from "../components/properties/PropertyHeroSection";
import {
  listPublicProperties,
  listPublicPropertyListings,
} from "../lib/publicProperties";

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

  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [allSliderListings, setAllSliderListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([listPublicProperties(), listPublicPropertyListings()])
      .then(([listings, sliderItems]) => {
        if (cancelled) return;
        setAllListings(listings);
        setAllSliderListings(sliderItems);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load properties.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Split listings into top grid (first 3), slider source (next 3), bottom grid (rest).
  const topGridListings = useMemo(() => allListings.slice(0, 3), [allListings]);
  const bottomGridListings = useMemo(() => allListings.slice(6), [allListings]);
  const sliderSource = useMemo(
    () => allSliderListings.slice(3, 6),
    [allSliderListings],
  );

  const filteredSlider = useMemo(() => {
    return sliderSource.filter((l) => {
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
  }, [sliderSource, activeFilters]);

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

      {error && (
        <div className="bg-cream px-6 md:px-10 py-6">
          <div
            className="max-w-7xl mx-auto px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {error}
          </div>
        </div>
      )}

      {loading && (
        <div className="bg-cream py-14 text-center">
          <p
            className="text-tan text-[12px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Loading properties…
          </p>
        </div>
      )}

      {!loading && allListings.length === 0 && !error && (
        <div className="bg-cream py-20 text-center">
          <p
            className="text-tan text-[14px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            No properties available right now. Please check back soon.
          </p>
        </div>
      )}

      {/* ── Top grid section ── */}
      {!loading && topGridListings.length > 0 && (
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
      )}

      {/* ── Latest Listings slider ── */}
      {!loading && sliderSource.length > 0 && (
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
      )}

      {/* ── Bottom grid section ── */}
      {!loading && bottomGridListings.length > 0 && (
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
      )}
    </main>
  );
};

export default PropertyPage;
