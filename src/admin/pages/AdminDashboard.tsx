import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listProperties } from "../api/properties";
import { listInquiries } from "../api/inquiries";
import type { AdminInquiry, AdminProperty } from "../types";

const PageHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8">
    <h1
      className="text-coffeeBrown text-[26px] md:text-[32px]"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      {title}
    </h1>
    {subtitle && (
      <p
        className="text-tan text-[12px] tracking-wide mt-1"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

interface KpiCardProps {
  label: string;
  value: string | number;
  hint?: string;
  accent?: "gold" | "tan" | "coffee";
}

const KpiCard = ({ label, value, hint, accent = "gold" }: KpiCardProps) => {
  const accentColor =
    accent === "gold" ? "text-gold" : accent === "tan" ? "text-tan" : "text-coffeeBrown";

  return (
    <div className="bg-white border border-tan/20 rounded-lg p-6 hover:shadow-md transition-shadow">
      <p
        className="text-[10px] tracking-[0.2em] uppercase text-tan mb-3"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        {label}
      </p>
      <p
        className={`${accentColor} text-[36px] leading-none`}
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      >
        {value}
      </p>
      {hint && (
        <p
          className="text-[11px] text-dark/40 mt-3"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

const formatRelative = (iso: string) => {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = now - then;
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
};

const AdminDashboard = () => {
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([listProperties(), listInquiries()])
      .then(([props, inqs]) => {
        if (cancelled) return;
        setProperties(props);
        setInquiries(inqs);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load dashboard data.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const totalProperties = properties.length;
  const publishedProperties = properties.filter((p) => p.published).length;
  const availableProperties = properties.filter((p) => p.available && p.published).length;
  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  const recentInquiries = [...inquiries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const recentProperties = [...properties]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  return (
    <div>
      <PageHeading title="Dashboard" subtitle="Welcome back. Here's what's happening." />

      {error && (
        <div
          className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-[12px] rounded-md"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {error}
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <KpiCard label="Total Listings" value={loading ? "—" : totalProperties} hint="All properties" accent="gold" />
        <KpiCard label="Published" value={loading ? "—" : publishedProperties} hint="Visible on site" accent="coffee" />
        <KpiCard label="Available Now" value={loading ? "—" : availableProperties} hint="Ready to view" accent="tan" />
        <KpiCard
          label="New Inquiries"
          value={loading ? "—" : newInquiries}
          hint="Awaiting response"
          accent="gold"
        />
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white border border-tan/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-coffeeBrown text-[18px]"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              Recent Inquiries
            </h2>
            <Link
              to="/admin/inquiries"
              className="text-[10px] tracking-[0.2em] uppercase text-gold hover:text-coffeeBrown transition-colors"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              View all →
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-tan/15">
            {loading ? (
              <p
                className="text-tan text-[11px] py-2"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Loading…
              </p>
            ) : recentInquiries.length === 0 ? (
              <p
                className="text-tan text-[11px] py-2"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                No inquiries yet.
              </p>
            ) : null}
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[13px] text-coffeeBrown truncate"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {inq.name}
                    </p>
                    <p
                      className="text-[11px] text-dark/50 truncate mt-0.5"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {inq.propertyAddress ?? "General enquiry"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    {inq.status === "new" && (
                      <span
                        className="px-2 py-0.5 text-[9px] tracking-widest uppercase bg-gold/10 text-gold rounded-full"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        New
                      </span>
                    )}
                    <span
                      className="text-[10px] text-tan mt-1"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {formatRelative(inq.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Updated Properties */}
        <div className="bg-white border border-tan/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-coffeeBrown text-[18px]"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              Recently Updated
            </h2>
            <Link
              to="/admin/properties"
              className="text-[10px] tracking-[0.2em] uppercase text-gold hover:text-coffeeBrown transition-colors"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              View all →
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-tan/15">
            {loading ? (
              <p
                className="text-tan text-[11px] py-2"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Loading…
              </p>
            ) : recentProperties.length === 0 ? (
              <p
                className="text-tan text-[11px] py-2"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                No properties yet.
              </p>
            ) : null}
            {recentProperties.map((p) => (
              <Link
                key={p.id}
                to={`/admin/properties/${p.id}/edit`}
                className="py-3 first:pt-0 last:pb-0 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[13px] text-coffeeBrown truncate group-hover:text-gold transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {p.address}
                    </p>
                    <p
                      className="text-[11px] text-dark/50 mt-0.5"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {p.beds} bed · {p.bathrooms} bath · £{p.price} pcm
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span
                      className="px-2 py-0.5 text-[9px] tracking-widest uppercase border border-tan/40 text-tan rounded-full"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {p.status}
                    </span>
                    <span
                      className="text-[10px] text-tan mt-1"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {formatRelative(p.updatedAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
