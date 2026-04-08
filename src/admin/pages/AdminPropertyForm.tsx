import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mockProperties, type PropertyStatus } from "../data/mockData";

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const UploadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const STATUSES: PropertyStatus[] = ["FOR LET", "FOR SALE", "LET AGREED", "UNDER OFFER", "AVAILABLE"];

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

interface FormState {
  address: string;
  slug: string;
  status: PropertyStatus;
  available: boolean;
  published: boolean;
  beds: string;
  bathrooms: string;
  dimensions: string;
  price: string;
  description: string;
  features: string[];
  images: string[];
}

const emptyForm: FormState = {
  address: "",
  slug: "",
  status: "FOR LET",
  available: true,
  published: false,
  beds: "",
  bathrooms: "",
  dimensions: "",
  price: "",
  description: "",
  features: [],
  images: [],
};

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
  <label
    htmlFor={htmlFor}
    className="block text-[10px] tracking-[0.2em] uppercase text-tan mb-2"
    style={{ fontFamily: "'Lato', sans-serif" }}
  >
    {children}
  </label>
);

const inputClass =
  "w-full px-4 py-2.5 bg-cream/40 border border-tan/30 rounded-md text-[13px] text-coffeeBrown placeholder:text-tan/50 focus:outline-none focus:border-gold focus:bg-white transition-colors";

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white border border-tan/20 rounded-lg p-6">
    <h2
      className="text-coffeeBrown text-[16px] mb-5 pb-3 border-b border-tan/15"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      {title}
    </h2>
    {children}
  </div>
);

const AdminPropertyForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    if (!id) return;
    const existing = mockProperties.find((p) => p.id === id);
    if (existing) {
      setForm({
        address: existing.address,
        slug: existing.slug,
        status: existing.status,
        available: existing.available,
        published: existing.published,
        beds: String(existing.beds),
        bathrooms: String(existing.bathrooms),
        dimensions: existing.dimensions,
        price: existing.price,
        description: existing.description.join("\n\n"),
        features: existing.features,
        images: existing.images,
      });
    }
  }, [id]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddressBlur = () => {
    if (!form.slug && form.address) {
      update("slug", slugify(form.address));
    }
  };

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed) return;
    if (form.features.includes(trimmed)) {
      setFeatureInput("");
      return;
    }
    update("features", [...form.features, trimmed]);
    setFeatureInput("");
  };

  const removeFeature = (feature: string) => {
    update("features", form.features.filter((f) => f !== feature));
  };

  const removeImage = (idx: number) => {
    update("images", form.images.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Mock — just log and navigate back
    console.log("Submit (mock):", form);
    alert(`(Mock) Property ${isEdit ? "updated" : "created"}.\nWill persist to Supabase once wired.`);
    navigate("/admin/properties");
  };

  return (
    <div>
      {/* Back link */}
      <Link
        to="/admin/properties"
        className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-tan hover:text-gold transition-colors mb-5"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        <ChevronLeft />
        Back to properties
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <h1
          className="text-coffeeBrown text-[26px] md:text-[32px]"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          {isEdit ? "Edit property" : "New property"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Left column ─── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Basic info */}
          <SectionCard title="Basic information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <input
                  id="address"
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  onBlur={handleAddressBlur}
                  placeholder="Belmont Close, London, SW4"
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="slug">URL slug</Label>
                <input
                  id="slug"
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => update("slug", slugify(e.target.value))}
                  placeholder="belmont-close-london-sw4"
                  className={inputClass}
                />
                <p
                  className="text-[10px] text-tan/70 mt-1.5"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Public URL: /properties/{form.slug || "your-slug"}
                </p>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(e) => update("status", e.target.value as PropertyStatus)}
                  className={inputClass}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="price">Price (PCM)</Label>
                <input
                  id="price"
                  type="text"
                  required
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="6,500"
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="beds">Bedrooms</Label>
                <input
                  id="beds"
                  type="number"
                  min="0"
                  required
                  value={form.beds}
                  onChange={(e) => update("beds", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <input
                  id="bathrooms"
                  type="number"
                  min="0"
                  required
                  value={form.bathrooms}
                  onChange={(e) => update("bathrooms", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="dimensions">Dimensions</Label>
                <input
                  id="dimensions"
                  type="text"
                  value={form.dimensions}
                  onChange={(e) => update("dimensions", e.target.value)}
                  placeholder="10 X 10"
                  className={inputClass}
                />
              </div>
            </div>
          </SectionCard>

          {/* Description */}
          <SectionCard title="Description">
            <Label htmlFor="description">About this property</Label>
            <textarea
              id="description"
              rows={8}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Write a detailed description. Separate paragraphs with a blank line."
              className={`${inputClass} resize-y`}
            />
            <p
              className="text-[10px] text-tan/70 mt-1.5"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Tip: Separate paragraphs with a blank line.
            </p>
          </SectionCard>

          {/* Features */}
          <SectionCard title="Features">
            <Label>Add features</Label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                placeholder="e.g. Reception Room"
                className={inputClass}
              />
              <button
                type="button"
                onClick={addFeature}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-[11px] tracking-widest uppercase text-gold border border-gold/40 rounded-md hover:bg-gold hover:text-cream transition-colors"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <PlusIcon />
                Add
              </button>
            </div>
            {form.features.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {form.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-2 border border-tan/40 px-3 py-1.5 text-[10px] tracking-widest uppercase text-tan rounded-sm"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="text-tan hover:text-red-600 transition-colors"
                      aria-label={`Remove ${feature}`}
                    >
                      <XIcon />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p
                className="text-[11px] text-tan/60"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                No features added yet.
              </p>
            )}
          </SectionCard>

          {/* Images */}
          <SectionCard title="Images">
            <div className="border-2 border-dashed border-tan/30 rounded-lg p-8 text-center bg-cream/30 hover:border-gold/50 transition-colors cursor-not-allowed opacity-80">
              <div className="flex flex-col items-center gap-2 text-tan">
                <UploadIcon />
                <p className="text-[12px]" style={{ fontFamily: "'Lato', sans-serif" }}>
                  Drag &amp; drop images here, or click to browse
                </p>
                <p
                  className="text-[10px] text-tan/60"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  (Upload wired up after Supabase setup)
                </p>
              </div>
            </div>

            {form.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                {form.images.map((img, idx) => (
                  <div
                    key={`${img}-${idx}`}
                    className="relative aspect-[4/3] rounded-md overflow-hidden bg-cream group"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {idx === 0 && (
                      <span
                        className="absolute top-2 left-2 px-2 py-0.5 text-[9px] tracking-widest uppercase bg-white/90 text-gold rounded-full"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white/90 text-tan hover:text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        {/* ─── Right column ─── */}
        <div className="flex flex-col gap-6">
          {/* Visibility */}
          <SectionCard title="Visibility">
            <div className="flex flex-col gap-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => update("published", e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-gold cursor-pointer"
                />
                <div>
                  <p
                    className="text-[12px] text-coffeeBrown"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Published
                  </p>
                  <p
                    className="text-[10px] text-tan mt-0.5"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    Show this listing on the public site
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) => update("available", e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-gold cursor-pointer"
                />
                <div>
                  <p
                    className="text-[12px] text-coffeeBrown"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Available now
                  </p>
                  <p
                    className="text-[10px] text-tan mt-0.5"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    Untick if under offer
                  </p>
                </div>
              </label>
            </div>
          </SectionCard>

          {/* Actions */}
          <div className="bg-white border border-tan/20 rounded-lg p-6 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-light bg-camel text-cream-light hover:bg-gold transition-colors duration-200"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {isEdit ? "Save Changes" : "Create Property"}
            </button>
            <Link
              to="/admin/properties"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-light text-tan border border-tan/40 hover:border-gold hover:text-gold transition-colors duration-200"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminPropertyForm;
