import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyDetailHero, {
  type PropertyDetail,
} from "../components/properties/PropertyDetailHero";
import ListingCard, { type Listing } from "../components/ListingCard";
import FadeIn from "../components/FadeIn";
import {
  getPublicPropertyBySlug,
  listPublicProperties,
} from "../lib/publicProperties";

const PropertyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [related, setRelated] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setProperty(null);

    Promise.all([getPublicPropertyBySlug(slug), listPublicProperties()])
      .then(([detail, all]) => {
        if (cancelled) return;
        if (!detail) {
          setNotFound(true);
        } else {
          setProperty(detail);
          setRelated(all.filter((l) => l.slug !== slug).slice(0, 3));
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        console.error("Failed to load property", err);
        setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-offWhite">
        <p
          className="text-tan text-[12px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          Loading property…
        </p>
      </main>
    );
  }

  if (notFound || !property) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-offWhite">
        <p
          className="text-dark/50 text-[15px]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Property not found.
        </p>
      </main>
    );
  }

  return (
    <main>
      <PropertyDetailHero property={property} />

      {/* ── About this property ── */}
      {property.description && (
        <section className="px-4 md:px-10 py-10 md:py-14 bg-white">
          <FadeIn className="max-w-6xl mx-auto">
            <h2
              className="mb-5 text-gold"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                fontWeight: 400,
            
              }}
            >
              About this property
            </h2>
            <div className="flex flex-col gap-4">
              {property.description.map((para, i) => (
                <p
                  key={i}
                  className="text-black/70 leading-relaxed"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {/* ── Property Features + Map ── */}
      {property.features && (
        <section className="px-4 md:px-10 py-10 md:py-14 bg-cream">
          <FadeIn className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16">
              {/* Features */}
              <div className="flex-1">
                <h2
                  className="mb-6 text-gold"
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                    fontWeight: 400,
                  }}
                >
                  Property Features
                </h2>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature) => (
                    <span
                      key={feature}
                      className="border border-tan/40 px-3 py-1.5 text-[10px] tracking-widest uppercase text-tan"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div
                className="w-full md:w-[48%] shrink-0 rounded-sm overflow-hidden"
                style={{ minHeight: "260px" }}
              >
                <iframe
                  title={`Map – ${property.address}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed&z=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "260px", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* ── View More Listings ── */}
      {related.length > 0 && (
        <section className="px-4 md:px-10 py-10 md:py-14 bg-cream">
          <FadeIn className="max-w-6xl mx-auto">
            <h2
              className="mb-8 text-gold"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 400,
              }}
            >
              View More Listings.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((listing, i) => (
                <FadeIn key={listing.id} delay={i * 120} className="h-full">
                  <ListingCard listing={listing} />
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

    </main>
  );
};

export default PropertyDetailPage;
