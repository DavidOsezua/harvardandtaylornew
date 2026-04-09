import { useEffect, useMemo, useState } from "react";
import type { AdminInquiry, InquiryStatus } from "../types";
import { listInquiries, updateInquiryStatus } from "../api/inquiries";

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronDown = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUp = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const StatusPill = ({ status }: { status: InquiryStatus }) => {
  const styles: Record<InquiryStatus, string> = {
    new: "bg-gold/15 text-gold border-gold/30",
    read: "bg-tan/15 text-tan border-tan/40",
    closed: "bg-dark/5 text-dark/50 border-dark/15",
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
  new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listInquiries()
      .then((data) => {
        if (cancelled) return;
        setInquiries(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : "Failed to load Inquiries",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      if (statusFilter && inq.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          inq.name.toLowerCase().includes(q) ||
          inq.email.toLowerCase().includes(q) ||
          inq.message.toLowerCase().includes(q) ||
          (inq.propertyAddress?.toLowerCase().includes(q) ?? false)
        );
      }
      return true;
    });
  }, [inquiries, search, statusFilter]);

  const toggleExpand = async (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
    const target = inquiries.find((i) => i.id === id);
    if (target && target.status === "new") {
      try {
        await updateInquiryStatus(id, "read");
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: "read" } : i)),
        );
      } catch (err) {
        console.error("Failed to mark as read", err);
      }
    }
  };

  const setStatus = async (id: string, status: InquiryStatus) => {
    try {
      await updateInquiryStatus(id, status);
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status } : i)),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status.");
    }
  };

  const newCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-coffeeBrown text-[26px] md:text-[32px]"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          Inquiries
        </h1>
        <p
          className="text-tan text-[12px] tracking-wide mt-1"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {inquiries.length} total · {newCount} unread
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-tan/20 rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-tan">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search by name, email, or message…"
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
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Error banner */}
      {error && (
        <div
          className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-[12px] rounded-md"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {error}
        </div>
      )}

      {/* Inquiry list */}
      <div className="bg-white border border-tan/20 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <p
              className="text-tan text-[12px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Loading inquiries…
            </p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-12 text-center">
            <p
              className="text-tan text-[13px]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              No inquiries match your filters.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-tan/15">
            {filteredInquiries.map((inq) => {
              const isExpanded = expandedId === inq.id;
              const isUnread = inq.status === "new";

              return (
                <li key={inq.id}>
                  {/* Row */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(inq.id)}
                    className={`w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-cream/30 transition-colors ${
                      isUnread ? "bg-gold/[0.03]" : ""
                    }`}
                  >
                    {/* Unread dot */}
                    <div className="pt-1.5 shrink-0">
                      <span
                        className={`block w-2 h-2 rounded-full ${
                          isUnread ? "bg-gold" : "bg-transparent"
                        }`}
                      />
                    </div>

                    {/* Main */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <p
                          className={`text-[14px] truncate ${
                            isUnread
                              ? "text-coffeeBrown"
                              : "text-coffeeBrown/80"
                          }`}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {inq.name}
                        </p>
                        <span
                          className="text-[10px] text-tan tracking-wide shrink-0"
                          style={{ fontFamily: "'Lato', sans-serif" }}
                        >
                          {formatDate(inq.createdAt)}
                        </span>
                      </div>
                      <p
                        className="text-[11px] text-tan mt-0.5 truncate"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        {inq.propertyAddress ?? "General enquiry"}
                      </p>
                      <p
                        className={`text-[12px] mt-1.5 ${
                          isExpanded
                            ? "text-dark/70"
                            : "text-dark/60 line-clamp-1"
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {inq.message}
                      </p>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusPill status={inq.status} />
                      <span className="text-tan">
                        {isExpanded ? <ChevronUp /> : <ChevronDown />}
                      </span>
                    </div>
                  </button>

                  {/* Expanded panel */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 bg-cream/20 border-t border-tan/10">
                      <div className="ml-6 grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                        <div>
                          <p
                            className="text-[10px] tracking-[0.2em] uppercase text-tan mb-1"
                            style={{ fontFamily: "'Lato', sans-serif" }}
                          >
                            Email
                          </p>
                          <a
                            href={`mailto:${inq.email}`}
                            className="text-[12px] text-gold hover:text-coffeeBrown break-all"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {inq.email}
                          </a>
                        </div>
                        <div>
                          <p
                            className="text-[10px] tracking-[0.2em] uppercase text-tan mb-1"
                            style={{ fontFamily: "'Lato', sans-serif" }}
                          >
                            Phone
                          </p>
                          <a
                            href={`tel:${inq.phone.replace(/\s/g, "")}`}
                            className="text-[12px] text-gold hover:text-coffeeBrown"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {inq.phone}
                          </a>
                        </div>
                        <div>
                          <p
                            className="text-[10px] tracking-[0.2em] uppercase text-tan mb-1"
                            style={{ fontFamily: "'Lato', sans-serif" }}
                          >
                            Property
                          </p>
                          <p
                            className="text-[12px] text-coffeeBrown"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {inq.propertyAddress ?? "—"}
                          </p>
                        </div>
                      </div>

                      <div className="ml-6 mb-5">
                        <p
                          className="text-[10px] tracking-[0.2em] uppercase text-tan mb-2"
                          style={{ fontFamily: "'Lato', sans-serif" }}
                        >
                          Message
                        </p>
                        <p
                          className="text-[13px] text-dark/75 leading-relaxed bg-white border border-tan/20 rounded-md p-4"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {inq.message}
                        </p>
                      </div>

                      <div className="ml-6 flex flex-wrap items-center gap-2">
                        <a
                          href={`mailto:${inq.email}`}
                          className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-light bg-camel text-cream-light hover:bg-gold transition-colors duration-200"
                          style={{ fontFamily: "'Lato', sans-serif" }}
                        >
                          Reply
                        </a>
                        {inq.status !== "closed" ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setStatus(inq.id, "closed");
                            }}
                            className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-light text-tan border border-tan/40 hover:border-gold hover:text-gold transition-colors duration-200"
                            style={{ fontFamily: "'Lato', sans-serif" }}
                          >
                            Mark Closed
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setStatus(inq.id, "read");
                            }}
                            className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-light text-tan border border-tan/40 hover:border-gold hover:text-gold transition-colors duration-200"
                            style={{ fontFamily: "'Lato', sans-serif" }}
                          >
                            Reopen
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
