/**
 * Mock data for admin UI development.
 * Will be replaced with Supabase queries.
 */

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

export const mockProperties: AdminProperty[] = [
  {
    id: "p1",
    slug: "belmont-close-london-sw4-1",
    address: "Belmont Close, London, SW4",
    status: "LET AGREED",
    available: true,
    published: true,
    beds: 1,
    bathrooms: 2,
    dimensions: "10 X 10",
    price: "6,500",
    description: [
      "A charming 4-bedroom detached house in Beckenham, blending modern comfort and classic style.",
      "Conveniently located near schools and within the Langley catchment area.",
    ],
    features: ["Reception Room", "Kitchen", "Master Bedroom", "Downstairs WC"],
    images: ["/listings/listings1.webp", "/listings/listings2.webp"],
    createdAt: "2026-03-12T09:14:00Z",
    updatedAt: "2026-04-01T11:22:00Z",
  },
  {
    id: "p2",
    slug: "old-brompton-road-london-sw5",
    address: "Old Brompton Road, London, SW5",
    status: "FOR SALE",
    available: true,
    published: true,
    beds: 3,
    bathrooms: 2,
    dimensions: "12 X 14",
    price: "6,500",
    description: ["A beautifully presented 3-bedroom apartment on Old Brompton Road."],
    features: ["Reception Room", "Kitchen", "En-Suite", "Walk-in Wardrobe"],
    images: ["/listings/listings2.webp"],
    createdAt: "2026-02-28T15:00:00Z",
    updatedAt: "2026-03-30T08:45:00Z",
  },
  {
    id: "p3",
    slug: "belmont-close-london-sw4-2",
    address: "Belmont Close, London, SW4",
    status: "AVAILABLE",
    available: true,
    published: true,
    beds: 3,
    bathrooms: 2,
    dimensions: "10 X 10",
    price: "6,500",
    description: ["A superb 3-bedroom family home in Clapham."],
    features: ["Reception Room", "Open-Plan Kitchen", "Garden", "Private Parking"],
    images: ["/listings/listings3.webp"],
    createdAt: "2026-03-05T10:00:00Z",
    updatedAt: "2026-03-28T16:10:00Z",
  },
  {
    id: "p4",
    slug: "clapham-manor-street-sw4",
    address: "Clapham Manor Street, London, SW4",
    status: "FOR LET",
    available: true,
    published: true,
    beds: 2,
    bathrooms: 1,
    dimensions: "9 X 9",
    price: "3,200",
    description: ["A stylish 2-bedroom flat on Clapham Manor Street."],
    features: ["Reception Room", "Kitchen", "Period Features"],
    images: ["/listings/listings3.webp"],
    createdAt: "2026-03-18T13:30:00Z",
    updatedAt: "2026-04-02T09:00:00Z",
  },
  {
    id: "p5",
    slug: "landor-road-london-sw9",
    address: "Landor Road, London, SW9",
    status: "FOR SALE",
    available: false,
    published: true,
    beds: 4,
    bathrooms: 3,
    dimensions: "15 X 14",
    price: "8,000",
    description: ["An exceptional 4-bedroom Victorian terraced house in Clapham North."],
    features: ["Kitchen / Diner", "South-Facing Garden", "Bi-Fold Doors"],
    images: ["/listings/listings1.webp"],
    createdAt: "2026-01-22T12:00:00Z",
    updatedAt: "2026-03-15T14:20:00Z",
  },
  {
    id: "p6",
    slug: "acre-lane-brixton-sw2",
    address: "Acre Lane, Brixton, SW2",
    status: "AVAILABLE",
    available: true,
    published: false,
    beds: 1,
    bathrooms: 1,
    dimensions: "7 X 8",
    price: "2,100",
    description: ["A well-presented 1-bedroom apartment on Acre Lane."],
    features: ["Open-Plan Living", "Double Bedroom", "Secure Entry"],
    images: ["/listings/listings2.webp"],
    createdAt: "2026-04-03T08:00:00Z",
    updatedAt: "2026-04-03T08:00:00Z",
  },
];

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

export const mockInquiries: AdminInquiry[] = [
  {
    id: "i1",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@example.com",
    phone: "+44 7700 900111",
    message:
      "Hi, I'd love to arrange a viewing for the Belmont Close property this Saturday if possible.",
    propertyAddress: "Belmont Close, London, SW4",
    status: "new",
    createdAt: "2026-04-07T14:30:00Z",
  },
  {
    id: "i2",
    name: "James O'Connor",
    email: "j.oconnor@example.com",
    phone: "+44 7700 900222",
    message: "Is the Old Brompton Road flat still available? Looking to move in May.",
    propertyAddress: "Old Brompton Road, London, SW5",
    status: "new",
    createdAt: "2026-04-07T11:05:00Z",
  },
  {
    id: "i3",
    name: "Priya Shah",
    email: "priya.shah@example.com",
    phone: "+44 7700 900333",
    message:
      "Could you send me more information about the landlord services you offer? I have a property in SW2.",
    propertyAddress: null,
    status: "read",
    createdAt: "2026-04-06T09:42:00Z",
  },
  {
    id: "i4",
    name: "Tomás Rivera",
    email: "tomas.rivera@example.com",
    phone: "+44 7700 900444",
    message: "Interested in the Landor Road house. What's the earliest move-in date?",
    propertyAddress: "Landor Road, London, SW9",
    status: "read",
    createdAt: "2026-04-05T16:18:00Z",
  },
  {
    id: "i5",
    name: "Eleanor Bishop",
    email: "eleanor.b@example.com",
    phone: "+44 7700 900555",
    message: "Thank you for the viewing yesterday. Closing this enquiry.",
    propertyAddress: "Acre Lane, Brixton, SW2",
    status: "closed",
    createdAt: "2026-04-04T10:00:00Z",
  },
];
