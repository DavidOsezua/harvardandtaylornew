import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingCard, { type Listing } from "../ListingCard";
import FadeIn from "../FadeIn";
import { listPublicProperties } from "../../lib/publicProperties";

const LatestListingsSection = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listPublicProperties()
      .then((data) => {
        if (cancelled) return;
        setListings(data.slice(0, 3));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load listings.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-cream py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Heading */}
        <h2
          className="text-gold mb-8 text-3xl font-normal"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          Latest listings
        </h2>

        {loading ? (
          <div className="py-16 text-center">
            <p
              className="text-tan text-[12px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Loading listings…
            </p>
          </div>
        ) : error ? (
          <div
            className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {error}
          </div>
        ) : listings.length === 0 ? (
          <div className="py-16 text-center">
            <p
              className="text-tan text-[14px]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              No listings available right now. Please check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing, i) => (
              <FadeIn key={listing.id} delay={i * 120} className="h-full">
                <ListingCard listing={listing} />
              </FadeIn>
            ))}
          </div>
        )}

        {/* View all button — bottom right */}
        <FadeIn delay={400} className="flex justify-end mt-8">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-gold text-cream-light rounded-full px-6 py-3 text-sm font-light tracking-wide hover:bg-dark transition-colors duration-200"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            View Our Properties
            <span>→</span>
          </Link>
        </FadeIn>

      </div>
    </section>
  );
};

export default LatestListingsSection;
