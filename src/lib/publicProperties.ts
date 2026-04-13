import { supabase } from "./supabaseClient";
import type { Listing } from "../components/ListingCard";
import type { PropertyListing } from "../components/properties/PropertyListingCard";
import type { PropertyDetail } from "../components/properties/PropertyDetailHero";

interface PropertyRow {
  id: string;
  slug: string;
  address: string;
  status: string;
  available: boolean;
  beds: number;
  bathrooms: number;
  dimensions: string | null;
  price: string;
  description: string[] | null;
  features: string[] | null;
  youtube_url: string | null;
  document_url: string | null;
}

interface PropertyImageRow {
  url: string;
  sort_order: number;
}

interface PropertyRowWithImages extends PropertyRow {
  property_images?: PropertyImageRow[] | null;
}

const sortByOrder = (a: PropertyImageRow, b: PropertyImageRow) =>
  a.sort_order - b.sort_order;

const sortedImageUrls = (row: PropertyRowWithImages): string[] =>
  ((row.property_images ?? []) as PropertyImageRow[])
    .slice()
    .sort(sortByOrder)
    .map((img) => img.url);

const parseSqMeters = (dim: string | null | undefined): number => {
  if (!dim) return 0;
  const parts = dim.split(/\s*[x×X]\s*/);
  if (parts.length !== 2) return 0;
  const w = parseInt(parts[0].trim(), 10);
  const h = parseInt(parts[1].trim(), 10);
  if (Number.isNaN(w) || Number.isNaN(h)) return 0;
  return w * h;
};

// The public PropertyDetail component only knows three statuses;
// fold the wider admin set down into them.
const toDetailStatus = (status: string): PropertyDetail["status"] => {
  if (status === "FOR SALE") return "FOR SALE";
  if (status === "LET AGREED" || status === "UNDER OFFER") return "LET AGREED";
  return "AVAILABLE";
};

const toListing = (row: PropertyRowWithImages): Listing => {
  const images = sortedImageUrls(row);
  return {
    id: row.id,
    image: images[0] ?? "/listings/listings1.webp",
    badge: row.status === "FOR SALE" ? "FOR SALE" : "FOR LET",
    address: row.address,
    beds: row.beds,
    bathrooms: row.bathrooms,
    sqMeters: parseSqMeters(row.dimensions),
    price: row.price,
    available: row.available,
    slug: row.slug,
  };
};

const toPropertyListing = (row: PropertyRowWithImages): PropertyListing => {
  const images = sortedImageUrls(row);
  return {
    id: row.id,
    image: images[0] ?? "/listings/listings1.webp",
    status: toDetailStatus(row.status),
    available: row.available,
    address: row.address,
    beds: row.beds,
    bathrooms: row.bathrooms,
    dimensions: row.dimensions ?? "",
    price: row.price,
    slug: row.slug,
  };
};

const toPropertyDetail = (row: PropertyRowWithImages): PropertyDetail => {
  const images = sortedImageUrls(row);
  return {
    images: images.length > 0 ? images : ["/listings/listings1.webp"],
    status: toDetailStatus(row.status),
    available: row.available,
    address: row.address,
    beds: row.beds,
    bathrooms: row.bathrooms,
    dimensions: row.dimensions ?? "",
    price: row.price,
    slug: row.slug,
    description: row.description ?? [],
    features: row.features ?? [],
    youtubeUrl: row.youtube_url,
    documentUrl: row.document_url,
  };
};

async function fetchPublicPropertyRows(): Promise<PropertyRowWithImages[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(url, sort_order)")
    .eq("published", true)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as PropertyRowWithImages[];
}

export async function listPublicProperties(): Promise<Listing[]> {
  const rows = await fetchPublicPropertyRows();
  return rows.map(toListing);
}

export async function listPublicPropertyListings(): Promise<PropertyListing[]> {
  const rows = await fetchPublicPropertyRows();
  return rows.map(toPropertyListing);
}

export async function getPublicPropertyBySlug(
  slug: string
): Promise<PropertyDetail | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(url, sort_order)")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return toPropertyDetail(data as PropertyRowWithImages);
}
