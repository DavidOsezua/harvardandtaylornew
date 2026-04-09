export type PropertyStatus =
  | "FOR LET"
  | "FOR SALE"
  | "LET AGREED"
  | "UNDER OFFER"
  | "AVAILABLE";

export interface AdminProperty {
  id: string;
  slug: string;
  address: string;
  status: PropertyStatus;
  available: boolean;
  published: boolean;
  beds: number;
  bathrooms: number;
  dimensions: string;
  price: string;
  description: string[];
  features: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PropertyInput {
  slug: string;
  address: string;
  status: PropertyStatus;
  available: boolean;
  published: boolean;
  beds: number;
  bathrooms: number;
  dimensions: string;
  price: string;
  description: string[];
  features: string[];
}

export interface PropertyImage {
  id: string;
  url: string;
  sortOrder: number;
}

export type InquiryStatus = "new" | "read" | "closed";

export interface AdminInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyAddress: string | null;
  status: InquiryStatus;
  createdAt: string;
}
