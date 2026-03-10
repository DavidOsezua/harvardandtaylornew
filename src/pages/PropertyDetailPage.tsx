import { useParams } from "react-router-dom";
import PropertyDetailHero, { type PropertyDetail } from "../components/properties/PropertyDetailHero";

const mockProperties: Record<string, PropertyDetail> = {
  "belmont-close-london-sw4-1": {
    images: [
      "/listings/listings1.jpg",
      "/listings/listings2.jpg",
      "/listings/listings3.jpg",
    ],
    status: "LET AGREED",
    available: true,
    address: "Belmont Close, London, SW4",
    beds: 1,
    bathrooms: 2,
    dimensions: "10 X 10",
    price: "6,500",
    slug: "belmont-close-london-sw4-1",
  },
  "old-brompton-road-london-sw5": {
    images: [
      "/listings/listings2.jpg",
      "/listings/listings1.jpg",
      "/listings/listings3.jpg",
    ],
    status: "FOR SALE",
    available: true,
    address: "Old Brompton Road, London, SW5",
    beds: 3,
    bathrooms: 2,
    dimensions: "12 X 14",
    price: "6,500",
    slug: "old-brompton-road-london-sw5",
  },
  "belmont-close-london-sw4-2": {
    images: [
      "/listings/listings3.jpg",
      "/listings/listings1.jpg",
      "/listings/listings2.jpg",
    ],
    status: "AVAILABLE",
    available: true,
    address: "Belmont Close, London, SW4",
    beds: 3,
    bathrooms: 2,
    dimensions: "10 X 10",
    price: "6,500",
    slug: "belmont-close-london-sw4-2",
  },
  "clapham-manor-street-sw4": {
    images: [
      "/listings/listings3.jpg",
      "/listings/listings2.jpg",
      "/listings/listings1.jpg",
    ],
    status: "AVAILABLE",
    available: true,
    address: "Clapham Manor Street, London, SW4",
    beds: 2,
    bathrooms: 1,
    dimensions: "9 X 9",
    price: "3,200",
    slug: "clapham-manor-street-sw4",
  },
  "landor-road-london-sw9": {
    images: [
      "/listings/listings1.jpg",
      "/listings/listings3.jpg",
      "/listings/listings2.jpg",
    ],
    status: "FOR SALE",
    available: false,
    address: "Landor Road, London, SW9",
    beds: 4,
    bathrooms: 3,
    dimensions: "15 X 14",
    price: "8,000",
    slug: "landor-road-london-sw9",
  },
  "acre-lane-brixton-sw2": {
    images: [
      "/listings/listings2.jpg",
      "/listings/listings3.jpg",
      "/listings/listings1.jpg",
    ],
    status: "AVAILABLE",
    available: true,
    address: "Acre Lane, Brixton, SW2",
    beds: 1,
    bathrooms: 1,
    dimensions: "7 X 8",
    price: "2,100",
    slug: "acre-lane-brixton-sw2",
  },
};

const PropertyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const property = slug ? mockProperties[slug] : undefined;

  if (!property) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-offWhite">
        <p
          className="text-dark/50 text-[15px]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Property not found.
        </p>
      </main>
    );
  }

  return (
    <main>
      <PropertyDetailHero property={property} />
    </main>
  );
};

export default PropertyDetailPage;
