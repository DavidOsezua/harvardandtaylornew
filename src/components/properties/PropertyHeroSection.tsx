import { useState } from "react";

export interface Filters {
  minRent: string;
  maxRent: string;
  minBeds: string;
  type: string;
}

interface PropertyHeroSectionProps {
  onSearch: (filters: Filters) => void;
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FilterSelect = ({
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { label: string; value: string }[];
}) => (
  <div className="flex flex-col gap-1.5 flex-1 min-w-[130px] px-4 py-3">
    <label
      className="text-[10px] tracking-widest uppercase text-dark/50 whitespace-nowrap"
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      {label}
    </label>
    <div className="relative flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-dark/60 text-[12px] font-light appearance-none outline-none cursor-pointer pr-5 leading-none"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="absolute right-0 pointer-events-none text-dark/40">
        <ChevronIcon />
      </span>
    </div>
  </div>
);

const rentOptions = [
  { label: "£500 pcm", value: "500" },
  { label: "£750 pcm", value: "750" },
  { label: "£1,000 pcm", value: "1000" },
  { label: "£1,500 pcm", value: "1500" },
  { label: "£2,000 pcm", value: "2000" },
  { label: "£2,500 pcm", value: "2500" },
  { label: "£3,000 pcm", value: "3000" },
  { label: "£3,500 pcm", value: "3500" },
  { label: "£4,000+ pcm", value: "4000" },
];

const bedOptions = [
  { label: "1 Bed", value: "1" },
  { label: "2 Beds", value: "2" },
  { label: "3 Beds", value: "3" },
  { label: "4 Beds", value: "4" },
  { label: "5+ Beds", value: "5" },
];

const typeOptions = [
  { label: "For Let", value: "FOR LET" },
  { label: "For Sale", value: "FOR SALE" },
];

const PropertyHeroSection = ({ onSearch }: PropertyHeroSectionProps) => {
  const [filters, setFilters] = useState<Filters>({
    minRent: "",
    maxRent: "",
    minBeds: "",
    type: "",
  });

  const set = (key: keyof Filters) => (value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
      {/* Background building image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/premium-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Cream overlay — fades from solid at top to transparent at bottom */}
      <div className="absolute inset-0 bg-linear-to-b from-cream/95 via-cream/80 to-cream/30" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 pt-14 pb-20 text-center">
        {/* Eyebrow */}
        <p
          className="text-camel text-[11px] tracking-[0.25em] uppercase mb-4"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          Carefully Curated Homes
        </p>

        {/* Heading */}
        <h1
          className="text-gold leading-tight mb-4"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 400,
          }}
        >
          🏠 Our Properties
        </h1>

        {/* Subtitle */}
        <p
          className="text-dark/60 text-[14px] font-light leading-relaxed mb-10 max-w-lg mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Explore thoughtfully presented properties, designed for comfort, style and
          lasting value.
        </p>

        {/* ── Filter bar ── */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-dark/8 flex items-stretch overflow-hidden">
          {/* Filter fields */}
          <div className="flex flex-1 flex-wrap divide-x divide-dark/10">
            <FilterSelect
              label="Minimum Rent"
              value={filters.minRent}
              onChange={set("minRent")}
              placeholder="Set Min Rent"
              options={rentOptions}
            />
            <FilterSelect
              label="Maximum Rent"
              value={filters.maxRent}
              onChange={set("maxRent")}
              placeholder="Set Max Rent"
              options={rentOptions}
            />
            <FilterSelect
              label="Minimum Beds"
              value={filters.minBeds}
              onChange={set("minBeds")}
              placeholder="Set Min Beds"
              options={bedOptions}
            />
            <FilterSelect
              label="Type"
              value={filters.type}
              onChange={set("type")}
              placeholder="Select Property Type"
              options={typeOptions}
            />
          </div>

          {/* Search button — full height */}
          <button
            onClick={() => onSearch(filters)}
            className="flex items-center justify-center gap-2 bg-camel text-cream-light text-[13px] tracking-wide px-7 hover:bg-gold transition-colors duration-200 shrink-0"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Search <SearchIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertyHeroSection;
