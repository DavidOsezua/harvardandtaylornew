import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mockProperties, type AdminProperty, type PropertyStatus } from "../data/mockData";
import PropertyDetailsModal from "../components/PropertyDetailsModal";

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
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

const PublishedDot = ({ published }: { published: boolean }) => (
  <span className="inline-flex items-center gap-1.5">
    <span
      className={`w-1.5 h-1.5 rounded-full ${published ? "bg-green-500" : "bg-tan/40"}`}
    />
    <span
      className="text-[10px] tracking-widest uppercase text-dark/60"
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      {published ? "Live" : "Draft"}
    </span>
  </span>
);

const AdminProperties = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [publishedFilter, setPublishedFilter] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<AdminProperty | null>(null);

  const filtered: AdminProperty[] = useMemo(() => {
    return mockProperties.filter((p) => {
      if (search && !p.address.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter && p.status !== statusFilter) return false;
      if (publishedFilter === "published" && !p.published) return false;
      if (publishedFilter === "draft" && p.published) return false;
      return true;
    });
  }, [search, statusFilter, publishedFilter]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-coffeeBrown text-[26px] md:text-[32px]"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Properties
          </h1>
          <p
            className="text-tan text-[12px] tracking-wide mt-1"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {filtered.length} of {mockProperties.length} listings
          </p>
        </div>
        <Link
          to="/admin/properties/new"
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-light bg-camel text-cream-light hover:bg-gold transition-colors duration-200"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          <PlusIcon />
          New Property
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-tan/20 rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-tan">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search by address…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-cream/50 border border-tan/30 rounded-md text-[13px] text-coffeeBrown placeholder:text-tan/50 focus:outline-none focus:border-gold focus:bg-white transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-cream/50 border border-tan/30 rounded-md text-[12px] text-coffeeBrown focus:outline-none focus:border-gold focus:bg-white transition-colors"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          <option value="">All statuses</option>
          <option value="FOR LET">For Let</option>
          <option value="FOR SALE">For Sale</option>
          <option value="LET AGREED">Let Agreed</option>
          <option value="UNDER OFFER">Under Offer</option>
          <option value="AVAILABLE">Available</option>
        </select>
        <select
          value={publishedFilter}
          onChange={(e) => setPublishedFilter(e.target.value)}
          className="px-4 py-2.5 bg-cream/50 border border-tan/30 rounded-md text-[12px] text-coffeeBrown focus:outline-none focus:border-gold focus:bg-white transition-colors"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          <option value="">All visibility</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table (desktop) */}
      <div className="hidden lg:block bg-white border border-tan/20 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-tan/20 bg-cream/40">
              {["Property", "Status", "Beds", "Bath", "Price", "Visibility", ""].map((h) => (
                <th
                  key={h}
                  className="px-5 py-4 text-left text-[10px] tracking-[0.2em] uppercase text-tan font-normal"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center">
                  <p
                    className="text-tan text-[13px]"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    No properties match your filters.
                  </p>
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-tan/15 last:border-b-0 hover:bg-cream/30 transition-colors"
                >
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedProperty(p)}
                      className="flex items-center gap-3 text-left group w-full"
                    >
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-cream shrink-0">
                        {p.images[0] && (
                          <img
                            src={p.images[0]}
                            alt={p.address}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-[13px] text-coffeeBrown truncate group-hover:text-gold transition-colors"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {p.address}
                        </p>
                        <p
                          className="text-[10px] text-tan truncate mt-0.5"
                          style={{ fontFamily: "'Lato', sans-serif" }}
                        >
                          /{p.slug}
                        </p>
                      </div>
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-5 py-4 text-[13px] text-coffeeBrown" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {p.beds}
                  </td>
                  <td className="px-5 py-4 text-[13px] text-coffeeBrown" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {p.bathrooms}
                  </td>
                  <td className="px-5 py-4 text-[13px] text-coffeeBrown" style={{ fontFamily: "'Inter', sans-serif" }}>
                    £{p.price}
                  </td>
                  <td className="px-5 py-4">
                    <PublishedDot published={p.published} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProperty(p)}
                        className="p-2 text-tan hover:text-gold hover:bg-gold/5 rounded-md transition-colors"
                        aria-label="View details"
                      >
                        <EyeIcon />
                      </button>
                      <Link
                        to={`/admin/properties/${p.id}/edit`}
                        className="p-2 text-tan hover:text-gold hover:bg-gold/5 rounded-md transition-colors"
                        aria-label="Edit"
                      >
                        <EditIcon />
                      </Link>
                      <button
                        type="button"
                        className="p-2 text-tan hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        aria-label="Delete"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <div className="lg:hidden flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="bg-white border border-tan/20 rounded-lg p-8 text-center">
            <p
              className="text-tan text-[13px]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              No properties match your filters.
            </p>
          </div>
        ) : (
          filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-tan/20 rounded-lg p-4 flex gap-4"
            >
              <button
                type="button"
                onClick={() => setSelectedProperty(p)}
                className="w-20 h-20 rounded-md overflow-hidden bg-cream shrink-0"
                aria-label={`View ${p.address}`}
              >
                {p.images[0] && (
                  <img
                    src={p.images[0]}
                    alt={p.address}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => setSelectedProperty(p)}
                  className="text-left w-full"
                >
                  <p
                    className="text-[14px] text-coffeeBrown truncate"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {p.address}
                  </p>
                  <p
                    className="text-[11px] text-dark/50 mt-1"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {p.beds} bed · {p.bathrooms} bath · £{p.price}
                  </p>
                </button>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <StatusBadge status={p.status} />
                  <PublishedDot published={p.published} />
                </div>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setSelectedProperty(p)}
                    className="text-[10px] tracking-widest uppercase text-tan border border-tan/40 rounded-full px-3 py-1 hover:border-gold hover:text-gold transition-colors"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    View
                  </button>
                  <Link
                    to={`/admin/properties/${p.id}/edit`}
                    className="text-[10px] tracking-widest uppercase text-gold border border-gold/40 rounded-full px-3 py-1 hover:bg-gold hover:text-cream transition-colors"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="text-[10px] tracking-widest uppercase text-red-600 border border-red-200 rounded-full px-3 py-1 hover:bg-red-50 transition-colors"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
};

export default AdminProperties;
