import { useState } from "react";

interface PropertyDetail {
  images: string[];
  status: "LET AGREED" | "FOR SALE" | "AVAILABLE";
  available: boolean;
  address: string;
  beds: number;
  bathrooms: number;
  dimensions: string;
  price: string;
  slug: string;
  description?: string[];
  features?: string[];
  youtubeUrl?: string | null;
  documentUrl?: string | null;
}

const BedIcon = () => (
  <svg width="14" height="10" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.8125 5.25C3.58203 5.25 2.625 4.29297 2.625 3.0625C2.625 1.85938 3.58203 0.875 4.8125 0.875C6.01562 0.875 7 1.85938 7 3.0625C7 4.29297 6.01562 5.25 4.8125 5.25ZM14.4375 1.75C16.1055 1.75 17.5 3.14453 17.5 4.8125V10.0625C17.5 10.3086 17.2812 10.5 17.0625 10.5H16.1875C15.9414 10.5 15.75 10.3086 15.75 10.0625V8.75H1.75V10.0625C1.75 10.3086 1.53125 10.5 1.3125 10.5H0.4375C0.191406 10.5 0 10.3086 0 10.0625V0.4375C0 0.21875 0.191406 0 0.4375 0H1.3125C1.53125 0 1.75 0.21875 1.75 0.4375V6.125H7.875V2.1875C7.875 1.96875 8.06641 1.75 8.3125 1.75H14.4375Z" fill="currentColor"/>
  </svg>
);

const BathIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.875 10.5V9.1875H13.125V10.5C13.0977 11.293 12.7695 11.9766 12.25 12.4688V13.5625C12.25 13.8086 12.0312 14 11.8125 14H10.9375C10.6914 14 10.5 13.8086 10.5 13.5625V13.125H3.5V13.5625C3.5 13.8086 3.28125 14 3.0625 14H2.1875C1.94141 14 1.75 13.8086 1.75 13.5625V12.4688C1.20312 11.9766 0.875 11.293 0.875 10.5ZM13.5625 7C13.7812 7 14 7.21875 14 7.4375V7.875C14 8.12109 13.7812 8.3125 13.5625 8.3125H0.4375C0.191406 8.3125 0 8.12109 0 7.875V7.4375C0 7.21875 0.191406 7 0.4375 7H0.875V1.91406C0.875 0.875 1.72266 0 2.76172 0C3.28125 0 3.74609 0.21875 4.10156 0.574219L4.62109 1.09375C5.44141 0.738281 6.23438 0.875 6.80859 1.33984V1.3125C6.89062 1.25781 7 1.20312 7.10938 1.20312C7.24609 1.20312 7.35547 1.25781 7.4375 1.3125L7.73828 1.64062C7.82031 1.72266 7.875 1.83203 7.875 1.94141C7.875 2.07812 7.82031 2.1875 7.73828 2.24219L4.83984 5.14062C4.78516 5.22266 4.67578 5.25 4.53906 5.25C4.42969 5.25 4.32031 5.22266 4.23828 5.14062L3.9375 4.8125C3.85547 4.75781 3.80078 4.64844 3.80078 4.51172C3.80078 4.40234 3.85547 4.29297 3.9375 4.21094C3.47266 3.63672 3.33594 2.84375 3.69141 2.02344L3.17188 1.50391C3.0625 1.39453 2.92578 1.33984 2.76172 1.33984C2.43359 1.33984 2.1875 1.58594 2.1875 1.91406V7H13.5625Z" fill="currentColor"/>
  </svg>
);

const AreaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 0H0V3.15H1.4028V4.55H0V6.3H1.4028V7.7H0V9.45H1.4028V10.85H0V14H3.15V12.6231H4.55V14H6.3V12.6231H7.7V14H9.45V12.6231H10.85V14H14V7H7V0Z" fill="currentColor"/>
  </svg>
);

const TourIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M9 9l6 3-6 3V9z" fill="currentColor"/>
  </svg>
);

const FloorplanIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M3 10h8M11 10v11M11 3v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const View3DIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L2 8l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M2 16l10 5 10-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FeaturesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M19.78 4.22l-2.12 2.12M6.34 17.66l-2.12 2.12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const EnquiryIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const statusStyles: Record<PropertyDetail["status"], string> = {
  "LET AGREED":  "bg-white/90 text-black/70",
  "FOR SALE":    "bg-black/70 text-white",
  "AVAILABLE":   "bg-camel/90 text-white",
};

interface PropertyDetailHeroProps {
  property: PropertyDetail;
}

const PropertyDetailHero = ({ property }: PropertyDetailHeroProps) => {
  const [currentImg, setCurrentImg] = useState(0);
  const total = property.images.length;

  const prev = () => setCurrentImg((i) => (i > 0 ? i - 1 : total - 1));
  const next = () => setCurrentImg((i) => (i < total - 1 ? i + 1 : 0));

  return (
    <section className="bg-cream px-4 md:px-10 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-0 overflow-hidden rounded-sm shadow-sm">

          {/* ── Left: Image gallery ── */}
          <div className="relative md:w-[52%] shrink-0 h-72 md:h-auto min-h-[360px] overflow-hidden">
            {/* Images */}
            {property.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${property.address} – image ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  i === currentImg ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Status badge – top left */}
            <span
              className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-[9px] tracking-widest uppercase font-medium rounded-sm ${statusStyles[property.status]}`}
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {property.status}
            </span>

            {/* Counter – top right */}
            <span
              className="absolute top-3 right-3 z-10 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-sm"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {currentImg + 1}/{total}
            </span>

            {/* Prev / Next click zones */}
            <button onClick={prev} className="absolute inset-y-0 left-0 w-2/5 z-10 cursor-pointer" aria-label="Previous image" />
            <button onClick={next} className="absolute inset-y-0 right-0 w-2/5 z-10 cursor-pointer" aria-label="Next image" />

            {/* Dot indicators */}
            <div className="absolute bottom-3 inset-x-0 z-10 flex justify-center gap-1.5">
              {property.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImg(i)}
                  aria-label={`Image ${i + 1}`}
                  className={`transition-all duration-200 rounded-full ${
                    i === currentImg ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Property info ── */}
          <div
            className="flex flex-col justify-between flex-1 px-7 py-7 bg-cream"
            style={{ backgroundColor: "#F8F6F0" }}
          >
            {/* Top section */}
            <div className="flex flex-col gap-4">

              {/* Available badge */}
              <span
                className="inline-flex items-center gap-1.5 self-start border border-black/20 px-2.5 py-1 text-[9px] tracking-widest uppercase text-black/55 rounded-sm"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <HomeIcon />
                {property.available ? "Available Now" : "Under Offer"}
              </span>

              {/* Address */}
              <h1
                className="text-coffeeBrown leading-snug"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                  fontWeight: 400,
                }}
              >
                {property.address}
              </h1>

              {/* Detail pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: <BedIcon />, label: `${property.beds} Bed` },
                  { icon: <BathIcon />, label: `${property.bathrooms} Bathrooms` },
                  { icon: <AreaIcon />, label: `${property.dimensions} Meters` },
                ].map(({ icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 border border-black/15 px-3 py-1.5 text-[10px] tracking-wider uppercase text-black/55 rounded-sm"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    <span className="opacity-60">{icon}</span>
                    {label}
                  </span>
                ))}
              </div>

              {/* Price */}
              <p
                className="text-coffeeBrown"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 400,
                }}
              >
                £{property.price} pcm
              </p>
            </div>

            {/* Bottom section */}
            <div className="flex flex-col gap-3 mt-6">

              {/* Icon action buttons */}
              <div className="flex gap-2">
                {property.youtubeUrl ? (
                  <a
                    href={property.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Virtual Tour"
                    aria-label="Virtual Tour"
                    className="flex items-center justify-center w-11 h-11 border border-black/15 text-black/55 hover:border-camel hover:text-camel transition-colors duration-200 rounded-sm"
                  >
                    <TourIcon />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    title="Virtual Tour unavailable"
                    aria-label="Virtual Tour unavailable"
                    className="flex items-center justify-center w-11 h-11 border border-black/10 text-black/25 rounded-sm cursor-not-allowed"
                  >
                    <TourIcon />
                  </button>
                )}

                {property.documentUrl ? (
                  <a
                    href={property.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    title="Floor Plan"
                    aria-label="Download floor plan"
                    className="flex items-center justify-center w-11 h-11 border border-black/15 text-black/55 hover:border-camel hover:text-camel transition-colors duration-200 rounded-sm"
                  >
                    <FloorplanIcon />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    title="Floor plan unavailable"
                    aria-label="Floor plan unavailable"
                    className="flex items-center justify-center w-11 h-11 border border-black/10 text-black/25 rounded-sm cursor-not-allowed"
                  >
                    <FloorplanIcon />
                  </button>
                )}

                {[
                  { icon: <View3DIcon />, label: "3D View" },
                  { icon: <FeaturesIcon />, label: "Features" },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    title={label}
                    className="flex items-center justify-center w-11 h-11 border border-black/15 text-black/40 hover:border-camel hover:text-camel transition-colors duration-200 rounded-sm"
                  >
                    {icon}
                  </button>
                ))}
              </div>

              {/* Enquiry CTA */}
              <a
                href={`mailto:info@harvardandtaylor.com?subject=Enquiry: ${property.address}`}
                className="flex items-center justify-center gap-2 bg-camel text-cream-light text-[12px] tracking-widest uppercase py-3.5 hover:bg-gold transition-colors duration-200 w-full rounded-sm"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Make an Enquiry <EnquiryIcon />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export { type PropertyDetail };
export default PropertyDetailHero;
