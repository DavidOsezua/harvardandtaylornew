import { supabase } from "../../lib/supabaseClient";
import type { AdminInquiry, InquiryStatus } from "../types";

interface InquiryRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  property_id: string | null;
  status: InquiryStatus;
  created_at: string;
  properties?: { address: string } | null;
}

const mapRow = (row: InquiryRow): AdminInquiry => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone ?? "",
  message: row.message,
  propertyAddress: row.properties?.address ?? null,
  status: row.status,
  createdAt: row.created_at,
});

export interface CreateInquiryInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: string | null;
}

export async function listInquiries(): Promise<AdminInquiry[]> {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*, properties(address)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => mapRow(row as InquiryRow));
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus
): Promise<void> {
  const { error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteInquiry(id: string): Promise<void> {
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throw error;
}

export async function createInquiry(input: CreateInquiryInput): Promise<void> {
  const { error } = await supabase.from("inquiries").insert({
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    message: input.message,
    property_id: input.propertyId || null,
  });
  if (error) throw error;
}
