import { supabase } from "../../lib/supabaseClient";
import type {
  AdminProperty,
  PropertyImage,
  PropertyInput,
  PropertyStatus,
} from "../types";

const BUCKET = "property-images";

interface PropertyRow {
  id: string;
  slug: string;
  address: string;
  status: PropertyStatus;
  available: boolean;
  published: boolean;
  beds: number;
  bathrooms: number;
  dimensions: string | null;
  price: string;
  description: string[];
  features: string[];
  created_at: string;
  updated_at: string;
}

interface PropertyImageRow {
  id: string;
  property_id?: string;
  url: string;
  sort_order: number;
  alt?: string | null;
}

const mapRow = (row: PropertyRow, images: string[] = []): AdminProperty => ({
  id: row.id,
  slug: row.slug,
  address: row.address,
  status: row.status,
  available: row.available,
  published: row.published,
  beds: row.beds,
  bathrooms: row.bathrooms,
  dimensions: row.dimensions ?? "",
  price: row.price,
  description: row.description ?? [],
  features: row.features ?? [],
  images,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapImageRow = (row: PropertyImageRow): PropertyImage => ({
  id: row.id,
  url: row.url,
  sortOrder: row.sort_order,
});

const sortByOrder = (a: PropertyImageRow, b: PropertyImageRow) =>
  a.sort_order - b.sort_order;

const toRowInput = (input: PropertyInput) => ({
  slug: input.slug,
  address: input.address,
  status: input.status,
  available: input.available,
  published: input.published,
  beds: input.beds,
  bathrooms: input.bathrooms,
  dimensions: input.dimensions || null,
  price: input.price,
  description: input.description,
  features: input.features,
});

// ─── Properties CRUD ───

export async function listProperties(): Promise<AdminProperty[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(url, sort_order)")
    .order("updated_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => {
    const images = ((row.property_images as PropertyImageRow[]) ?? [])
      .slice()
      .sort(sortByOrder)
      .map((img) => img.url);
    return mapRow(row as PropertyRow, images);
  });
}

export async function getProperty(id: string): Promise<AdminProperty | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(id, url, sort_order, alt)")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  const images = ((data.property_images as PropertyImageRow[]) ?? [])
    .slice()
    .sort(sortByOrder)
    .map((img) => img.url);

  return mapRow(data as PropertyRow, images);
}

export async function createProperty(input: PropertyInput): Promise<AdminProperty> {
  const { data, error } = await supabase
    .from("properties")
    .insert(toRowInput(input))
    .select()
    .single();

  if (error) throw error;
  return mapRow(data as PropertyRow);
}

export async function updateProperty(
  id: string,
  input: PropertyInput
): Promise<AdminProperty> {
  const { data, error } = await supabase
    .from("properties")
    .update(toRowInput(input))
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapRow(data as PropertyRow);
}

export async function deleteProperty(id: string): Promise<void> {
  // Clean up storage files first (cascade only deletes table rows)
  const { data: imageRows } = await supabase
    .from("property_images")
    .select("url")
    .eq("property_id", id);

  if (imageRows && imageRows.length > 0) {
    const paths = imageRows
      .map((row) => extractStoragePath(row.url))
      .filter((p): p is string => Boolean(p));
    if (paths.length > 0) {
      await supabase.storage.from(BUCKET).remove(paths);
    }
  }

  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw error;
}

// ─── Image helpers ───

export async function listPropertyImages(propertyId: string): Promise<PropertyImage[]> {
  const { data, error } = await supabase
    .from("property_images")
    .select("id, url, sort_order")
    .eq("property_id", propertyId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row) => mapImageRow(row as PropertyImageRow));
}

export async function uploadPropertyImage(
  propertyId: string,
  file: File
): Promise<PropertyImage> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `${crypto.randomUUID()}.${ext}`;
  const path = `${propertyId}/${filename}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);

  // Determine the next sort_order
  const { data: existing } = await supabase
    .from("property_images")
    .select("sort_order")
    .eq("property_id", propertyId)
    .order("sort_order", { ascending: false })
    .limit(1);

  const nextOrder =
    existing && existing.length > 0 ? (existing[0].sort_order as number) + 1 : 0;

  const { data, error: insertError } = await supabase
    .from("property_images")
    .insert({
      property_id: propertyId,
      url: publicUrl,
      sort_order: nextOrder,
    })
    .select("id, url, sort_order")
    .single();

  if (insertError) throw insertError;
  return mapImageRow(data as PropertyImageRow);
}

export async function deletePropertyImage(
  imageId: string,
  url: string
): Promise<void> {
  const path = extractStoragePath(url);
  if (path) {
    await supabase.storage.from(BUCKET).remove([path]);
  }
  const { error } = await supabase
    .from("property_images")
    .delete()
    .eq("id", imageId);
  if (error) throw error;
}

/**
 * Extracts the storage object path from a Supabase public URL.
 * e.g. https://xxx.supabase.co/storage/v1/object/public/property-images/abc/123.jpg
 *      -> "abc/123.jpg"
 */
function extractStoragePath(publicUrl: string): string | null {
  const match = publicUrl.match(/\/property-images\/(.+)$/);
  return match ? match[1] : null;
}
