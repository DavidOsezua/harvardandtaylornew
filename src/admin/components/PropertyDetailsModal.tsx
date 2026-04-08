import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { AdminProperty, PropertyStatus } from "../data/mockData";

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const StatusBadge = ({ status }: { status: PropertyStatus }) => {
  const styles: Record<PropertyStatus, string> = {
    "FOR LET": "bg-gold/10 text-gold border-gold/30",
    "FOR SALE": "bg-coffeeBrown/10 text-coffeeBrown border-coffeeBrown/30",
    "LET AGREED": "bg-tan/15 text-tan border-tan/40",
    "UNDER OFFER": "bg-tan/15 text-tan border-tan/40",
    AVAILABLE: "bg-camel/15 text-camel border-camel/40",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[9px] tracking-widest uppercase rounded-full border ${styles[status]}`}
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      {status}
    </span>
  );
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

interface PropertyDetailsModalProps {
  property: AdminProperty | null;
  onClose: () => void;
}

const PropertyDetailsModal = ({ property, onClose }: PropertyDetailsModalProps) => {
  const [imgIndex, setImgIndex] = useState(0);

  // Reset image index when a different property is opened
  useEffect(() => {
    setImgIndex(0);
  }, [property?.id]);

  // Lock body scroll + ESC to close
  useEffect(() => {
    if (!property) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (property.images.length > 1) {
        if (e.key === "ArrowLeft") {
          setImgIndex((i) => (i > 0 ? i - 1 : property.images.length - 1));
        }
        if (e.key === "ArrowRight") {
          setImgIndex((i) => (i < property.images.length - 1 ? i + 1 : 0));
        }
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [property, onClose]);

  if (!property) return null;

  const hasMultipleImages = property.images.length > 1;
  const currentImage = property.images[imgIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-white/95 hover:bg-white text-coffeeBrown rounded-full shadow-md transition-colors"
        >
          <CloseIcon />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto">
          {/* Image gallery */}
          <div className="relative bg-cream aspect-[16/9] md:aspect-[2/1]">
            {currentImage ? (
              <img
                src={currentImage}
                alt={property.address}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p
                  className="text-tan text-[12px] tracking-widest uppercase"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  No images
                </p>
              </div>
            )}

            {/* Dark gradient overlay — improves badge legibility */}
            {currentImage && (
              <div
                className="absolute inset-0 pointer-events-none bg-linear-to-b from-dark/55 via-dark/10 to-dark/40"
                aria-hidden="true"
              />
            )}

            {/* Status badge over image */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <StatusBadge status={property.status} />
              {!property.published && (
                <span
                  className="px-2.5 py-1 text-[9px] tracking-widest uppercase rounded-full border bg-white/90 text-dark/60 border-tan/40"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Draft
                </span>
              )}
            </div>

            {/* Gallery controls */}
            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setImgIndex((i) => (i > 0 ? i - 1 : property.images.length - 1))
                  }
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white text-coffeeBrown rounded-full shadow-md transition-colors"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setImgIndex((i) => (i < property.images.length - 1 ? i + 1 : 0))
                  }
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white text-coffeeBrown rounded-full shadow-md transition-colors"
                >
                  <ChevronRight />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {property.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImgIndex(i)}
                      aria-label={`Go to image ${i + 1}`}
                      className={`transition-all duration-200 rounded-full ${
                        i === imgIndex ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Details */}
          <div className="px-6 md:px-8 py-6 md:py-8">
            {/* Heading */}
            <div className="mb-6">
              <h2
                id="property-modal-title"
                className="text-coffeeBrown text-[24px] md:text-[28px] leading-tight"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                {property.address}
              </h2>
              <p
                className="text-tan text-[11px] tracking-wide mt-1"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                /{property.slug}
              </p>
            </div>

            {/* Price + key facts */}
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 mb-6 pb-6 border-b border-tan/20">
              <p
                className="text-gold text-[28px]"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                £{property.price}
                <span className="text-[14px] text-tan ml-1">pcm</span>
              </p>
              <div
                className="flex items-center gap-4 text-[12px] text-coffeeBrown"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span>
                  <strong className="font-normal">{property.beds}</strong>{" "}
                  <span className="text-tan">bed</span>
                </span>
                <span className="text-tan/40">·</span>
                <span>
                  <strong className="font-normal">{property.bathrooms}</strong>{" "}
                  <span className="text-tan">bath</span>
                </span>
                {property.dimensions && (
                  <>
                    <span className="text-tan/40">·</span>
                    <span>
                      <strong className="font-normal">{property.dimensions}</strong>
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {property.description.length > 0 && (
              <div className="mb-6">
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-tan mb-3"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  About this property
                </p>
                <div className="flex flex-col gap-3">
                  {property.description.map((para, i) => (
                    <p
                      key={i}
                      className="text-[13px] text-dark/70 leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {property.features.length > 0 && (
              <div className="mb-6">
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-tan mb-3"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Features
                </p>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature) => (
                    <span
                      key={feature}
                      className="border border-tan/40 px-3 py-1.5 text-[10px] tracking-widest uppercase text-tan rounded-sm"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-tan/20">
              <div>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-tan mb-1"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Visibility
                </p>
                <p
                  className="text-[12px] text-coffeeBrown"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {property.published ? "Published" : "Draft"}
                </p>
              </div>
              <div>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-tan mb-1"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Availability
                </p>
                <p
                  className="text-[12px] text-coffeeBrown"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {property.available ? "Available now" : "Under offer"}
                </p>
              </div>
              <div>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-tan mb-1"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Created
                </p>
                <p
                  className="text-[12px] text-coffeeBrown"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {formatDate(property.createdAt)}
                </p>
              </div>
              <div>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-tan mb-1"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Updated
                </p>
                <p
                  className="text-[12px] text-coffeeBrown"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {formatDate(property.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-tan/20 bg-cream/30 px-6 md:px-8 py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between">
          {property.published ? (
            <a
              href={`/properties/${property.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.2em] uppercase text-tan hover:text-gold transition-colors"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <ExternalIcon />
              View on site
            </a>
          ) : (
            <span
              className="text-[11px] tracking-[0.2em] uppercase text-tan/50"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Not published
            </span>
          )}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-light text-tan border border-tan/40 hover:border-gold hover:text-gold transition-colors duration-200"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Close
            </button>
            <Link
              to={`/admin/properties/${property.id}/edit`}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-light bg-camel text-cream-light hover:bg-gold transition-colors duration-200"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <EditIcon />
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
