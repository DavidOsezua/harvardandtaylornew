import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { PropertyImage, PropertyInput, PropertyStatus } from "../types";
import {
  createProperty,
  deletePropertyDocument,
  deletePropertyImage,
  getProperty,
  listPropertyImages,
  updateProperty,
  uploadPropertyDocument,
  uploadPropertyImage,
} from "../api/properties";

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
  youtubeUrl: string;
  documentUrl: string | null;
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
  youtubeUrl: "",
  documentUrl: null,
};

const descriptionToArray = (text: string): string[] =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

const toPropertyInput = (form: FormState): PropertyInput => ({
  address: form.address.trim(),
  slug: form.slug.trim(),
  status: form.status,
  available: form.available,
  published: form.published,
  beds: Number.parseInt(form.beds, 10) || 0,
  bathrooms: Number.parseInt(form.bathrooms, 10) || 0,
  dimensions: form.dimensions.trim(),
  price: form.price.trim(),
  description: descriptionToArray(form.description),
  features: form.features,
  youtubeUrl: form.youtubeUrl.trim() || null,
  documentUrl: form.documentUrl,
});

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
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [pendingPreviews, setPendingPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingPreviewsRef = useRef<string[]>([]);

  const [pendingDocument, setPendingDocument] = useState<File | null>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const originalDocumentUrlRef = useRef<string | null>(null);

  // Track latest previews so the unmount cleanup can revoke them.
  useEffect(() => {
    pendingPreviewsRef.current = pendingPreviews;
  }, [pendingPreviews]);

  // Revoke any leftover object URLs when the form unmounts.
  useEffect(() => {
    return () => {
      pendingPreviewsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([getProperty(id), listPropertyImages(id)])
      .then(([property, imgs]) => {
        if (cancelled) return;
        if (!property) {
          setError("Property not found.");
          return;
        }
        setForm({
          address: property.address,
          slug: property.slug,
          status: property.status,
          available: property.available,
          published: property.published,
          beds: String(property.beds),
          bathrooms: String(property.bathrooms),
          dimensions: property.dimensions,
          price: property.price,
          description: property.description.join("\n\n"),
          features: property.features,
          youtubeUrl: property.youtubeUrl ?? "",
          documentUrl: property.documentUrl,
        });
        originalDocumentUrlRef.current = property.documentUrl;
        setImages(imgs);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load property.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
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

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;

    const previews = files.map((f) => URL.createObjectURL(f));
    setPendingFiles((prev) => [...prev, ...files]);
    setPendingPreviews((prev) => [...prev, ...previews]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removePendingFile = (index: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
    setPendingPreviews((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dragOver) setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDocumentInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    setPendingDocument(file);
    if (documentInputRef.current) documentInputRef.current.value = "";
  };

  const clearPendingDocument = () => {
    setPendingDocument(null);
    if (documentInputRef.current) documentInputRef.current.value = "";
  };

  const removeExistingDocument = () => {
    const confirmed = window.confirm(
      "Remove the current floor plan? It will be permanently deleted when you save.",
    );
    if (!confirmed) return;
    update("documentUrl", null);
  };

  const removeImage = async (image: PropertyImage) => {
    const confirmed = window.confirm("Remove this image?");
    if (!confirmed) return;
    try {
      await deletePropertyImage(image.id, image.url);
      setImages((prev) => prev.filter((img) => img.id !== image.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete image.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      // Step 1 — save the property row (without the new document URL yet; we don't have a propertyId for brand-new rows).
      let input = toPropertyInput(form);
      let propertyId: string;
      if (isEdit && id) {
        await updateProperty(id, input);
        propertyId = id;
      } else {
        const created = await createProperty(input);
        propertyId = created.id;
      }

      // Step 2 — document: upload new file, or clean up removed file.
      const originalDocUrl = originalDocumentUrlRef.current;
      if (pendingDocument) {
        setUploading(true);
        const newUrl = await uploadPropertyDocument(propertyId, pendingDocument);
        input = { ...input, documentUrl: newUrl };
        await updateProperty(propertyId, input);
        if (originalDocUrl && originalDocUrl !== newUrl) {
          try {
            await deletePropertyDocument(originalDocUrl);
          } catch (cleanupErr) {
            console.warn("Failed to delete previous document", cleanupErr);
          }
        }
        originalDocumentUrlRef.current = newUrl;
        setPendingDocument(null);
      } else if (originalDocUrl && form.documentUrl === null) {
        try {
          await deletePropertyDocument(originalDocUrl);
        } catch (cleanupErr) {
          console.warn("Failed to delete removed document", cleanupErr);
        }
        originalDocumentUrlRef.current = null;
      }

      // Step 3 — images.
      if (pendingFiles.length > 0) {
        setUploading(true);
        for (const file of pendingFiles) {
          await uploadPropertyImage(propertyId, file);
        }
        pendingPreviews.forEach((url) => URL.revokeObjectURL(url));
        setPendingFiles([]);
        setPendingPreviews([]);
      }

      setUploading(false);
      navigate("/admin/properties");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save property.");
      setSaving(false);
      setUploading(false);
    }
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

      {error && (
        <div
          className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-[12px] rounded-md"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-white border border-tan/20 rounded-lg p-12 text-center">
          <p
            className="text-tan text-[12px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Loading property…
          </p>
        </div>
      ) : (
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
              <div className="md:col-span-2">
                <Label htmlFor="youtubeUrl">Virtual Tour (YouTube URL)</Label>
                <input
                  id="youtubeUrl"
                  type="url"
                  value={form.youtubeUrl}
                  onChange={(e) => update("youtubeUrl", e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className={inputClass}
                />
                <p
                  className="text-[10px] text-tan/70 mt-1.5"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Opens when the Virtual Tour button is clicked on the property page.
                </p>
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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInput}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                dragOver
                  ? "border-gold bg-gold/5"
                  : "border-tan/30 bg-cream/30 hover:border-gold/50"
              } ${uploading ? "opacity-60 pointer-events-none" : ""}`}
            >
              <div className="flex flex-col items-center gap-2 text-tan">
                <UploadIcon />
                <p className="text-[12px]" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {uploading
                    ? "Uploading…"
                    : "Drag & drop images here, or click to browse"}
                </p>
                <p
                  className="text-[10px] text-tan/60"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  The first image is used as the cover.
                  {pendingFiles.length > 0 &&
                    ` ${pendingFiles.length} pending — uploads on save.`}
                </p>
              </div>
            </div>

            {(images.length > 0 || pendingPreviews.length > 0) && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    className="relative aspect-[4/3] rounded-md overflow-hidden bg-cream group"
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
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
                      onClick={() => removeImage(img)}
                      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white/90 text-tan hover:text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
                {pendingPreviews.map((url, idx) => (
                  <div
                    key={`pending-${idx}`}
                    className="relative aspect-[4/3] rounded-md overflow-hidden bg-cream group"
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    {!isEdit && idx === 0 && images.length === 0 && (
                      <span
                        className="absolute top-2 left-2 px-2 py-0.5 text-[9px] tracking-widest uppercase bg-white/90 text-gold rounded-full"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        Cover
                      </span>
                    )}
                    <span
                      className="absolute bottom-2 left-2 px-2 py-0.5 text-[9px] tracking-widest uppercase bg-coffeeBrown/85 text-cream rounded-full"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      Pending
                    </span>
                    <button
                      type="button"
                      onClick={() => removePendingFile(idx)}
                      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white/90 text-tan hover:text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove pending image"
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          {/* Floor plan document */}
          <SectionCard title="Floor plan document">
            <input
              ref={documentInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleDocumentInput}
              className="hidden"
            />

            {pendingDocument ? (
              <div className="flex items-center justify-between gap-4 border border-tan/30 bg-cream/30 rounded-md px-4 py-3">
                <div className="min-w-0">
                  <p
                    className="text-[12px] text-coffeeBrown truncate"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {pendingDocument.name}
                  </p>
                  <p
                    className="text-[10px] text-coffeeBrown/70 mt-0.5"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    Pending — uploads on save
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearPendingDocument}
                  className="shrink-0 text-tan hover:text-red-600 transition-colors"
                  aria-label="Remove pending document"
                >
                  <XIcon />
                </button>
              </div>
            ) : form.documentUrl ? (
              <div className="flex items-center justify-between gap-4 border border-tan/30 bg-cream/30 rounded-md px-4 py-3">
                <a
                  href={form.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-gold hover:underline truncate min-w-0"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  View current floor plan
                </a>
                <div className="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => documentInputRef.current?.click()}
                    className="text-[10px] tracking-widest uppercase text-gold border border-gold/40 px-3 py-1.5 rounded-md hover:bg-gold hover:text-cream transition-colors"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={removeExistingDocument}
                    className="text-tan hover:text-red-600 transition-colors"
                    aria-label="Remove current document"
                  >
                    <XIcon />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => documentInputRef.current?.click()}
                className="border-2 border-dashed border-tan/30 bg-cream/30 hover:border-gold/50 rounded-lg p-8 text-center cursor-pointer transition-colors"
              >
                <div className="flex flex-col items-center gap-2 text-tan">
                  <UploadIcon />
                  <p className="text-[12px]" style={{ fontFamily: "'Lato', sans-serif" }}>
                    Click to upload a PDF
                  </p>
                  <p
                    className="text-[10px] text-tan/60"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    Downloaded when users click the Floor Plan button.
                  </p>
                </div>
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
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-light bg-camel text-cream-light hover:bg-gold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Property"}
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
      )}
    </div>
  );
};

export default AdminPropertyForm;
