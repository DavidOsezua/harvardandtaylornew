import { useParams } from "react-router-dom";
import PropertyDetailHero, {
  type PropertyDetail,
} from "../components/properties/PropertyDetailHero";
import ListingCard, { type Listing } from "../components/ListingCard";

const mockProperties: Record<string, PropertyDetail> = {
  "belmont-close-london-sw4-1": {
    images: [
      "/listings/listings1.webp",
      "/listings/listings2.webp",
      "/listings/listings3.webp",
    ],
    status: "LET AGREED",
    available: true,
    address: "Belmont Close, London, SW4",
    beds: 1,
    bathrooms: 2,
    dimensions: "10 X 10",
    price: "6,500",
    slug: "belmont-close-london-sw4-1",
    description: [
      "Introducing a charming 4-bedroom detached house to let in Beckenham, its a perfect blend of modern comfort and classic style. Step inside the spacious living room that is flooded with natural light, creating a warm and inviting atmosphere. The kitchen is a chef's dream, with sleek countertops, stainless steel appliances, and ample storage space for all your culinary essentials. Downstairs you have access to a utility room, separate WC and large double bedroom. Upstairs, you'll find 3 additional double bedrooms with ample storage, and a stunning family bathroom with free standing bath.",
      "This property boasts a convenient location near schools and is within the Langley Catchment area, its close to shops, and transportation. Great links into Waterloo, London Bridge, Charring Cross and Blackfriars. The neighbourhood is friendly and welcoming, making you feel right at home from day one. Available now, offered unfurnished.",
    ],
    features: [
      "Reception Room",
      "Kitchen",
      "Kitchen / Diner",
      "Upstairs WC",
      "Downstairs WC",
      "Master Bedroom",
      "3 Extra Bedrooms",
    ],
  },
  "old-brompton-road-london-sw5": {
    images: [
      "/listings/listings2.webp",
      "/listings/listings1.webp",
      "/listings/listings3.webp",
    ],
    status: "FOR SALE",
    available: true,
    address: "Old Brompton Road, London, SW5",
    beds: 3,
    bathrooms: 2,
    dimensions: "12 X 14",
    price: "6,500",
    slug: "old-brompton-road-london-sw5",
    description: [
      "A beautifully presented 3-bedroom apartment located on the prestigious Old Brompton Road in the heart of South Kensington. This stunning property offers bright, spacious reception rooms, a fully fitted kitchen, and two elegant bathrooms. The principal bedroom benefits from a walk-in wardrobe and en-suite.",
      "Situated moments from Earl's Court and South Kensington stations, the property is ideally placed for access to central London. An abundance of restaurants, boutiques and green spaces are all within easy reach.",
    ],
    features: [
      "Reception Room",
      "Kitchen",
      "Master Bedroom",
      "En-Suite",
      "Walk-in Wardrobe",
      "2 Further Bedrooms",
      "2 Bathrooms",
    ],
  },
  "belmont-close-london-sw4-2": {
    images: [
      "/listings/listings3.webp",
      "/listings/listings1.webp",
      "/listings/listings2.webp",
    ],
    status: "AVAILABLE",
    available: true,
    address: "Belmont Close, London, SW4",
    beds: 3,
    bathrooms: 2,
    dimensions: "10 X 10",
    price: "6,500",
    slug: "belmont-close-london-sw4-2",
    description: [
      "A superb 3-bedroom family home situated on the quiet and sought-after Belmont Close in Clapham. The property features a generous open-plan kitchen and dining area, a bright reception room, and two well-proportioned bathrooms.",
      "Located a short walk from Clapham South Underground station and the vibrant restaurants and shops of Abbeville Village, this home is perfect for professionals and families alike. Available immediately.",
    ],
    features: [
      "Reception Room",
      "Open-Plan Kitchen / Diner",
      "3 Bedrooms",
      "2 Bathrooms",
      "Garden",
      "Private Parking",
    ],
  },
  "clapham-manor-street-sw4": {
    images: [
      "/listings/listings3.webp",
      "/listings/listings2.webp",
      "/listings/listings1.webp",
    ],
    status: "AVAILABLE",
    available: true,
    address: "Clapham Manor Street, London, SW4",
    beds: 2,
    bathrooms: 1,
    dimensions: "9 X 9",
    price: "3,200",
    slug: "clapham-manor-street-sw4",
    description: [
      "A stylish 2-bedroom flat on the popular Clapham Manor Street, set within a well-maintained period conversion. The property offers a modern kitchen, a spacious reception room with original features, and a contemporary bathroom.",
      "Just moments from Clapham Common tube station and the green open space of the Common itself, this is an excellent opportunity to live in one of South London's most desirable neighbourhoods.",
    ],
    features: [
      "Reception Room",
      "Kitchen",
      "2 Bedrooms",
      "Bathroom",
      "Period Features",
      "Communal Garden",
    ],
  },
  "landor-road-london-sw9": {
    images: [
      "/listings/listings1.webp",
      "/listings/listings3.webp",
      "/listings/listings2.webp",
    ],
    status: "FOR SALE",
    available: false,
    address: "Landor Road, London, SW9",
    beds: 4,
    bathrooms: 3,
    dimensions: "15 X 14",
    price: "8,000",
    slug: "landor-road-london-sw9",
    description: [
      "An exceptional 4-bedroom Victorian terraced house on the highly regarded Landor Road in Clapham North. Thoughtfully extended and refurbished throughout, the property boasts a stunning kitchen-diner with bi-fold doors opening to a private south-facing garden, three bathrooms, and generous bedroom proportions.",
      "Perfectly positioned for Clapham North and Stockwell Underground stations, with easy access to the shops and amenities of Clapham High Street and Brixton Village.",
    ],
    features: [
      "Reception Room",
      "Kitchen / Diner",
      "4 Bedrooms",
      "3 Bathrooms",
      "South-Facing Garden",
      "Bi-Fold Doors",
      "Victorian Features",
    ],
  },
  "acre-lane-brixton-sw2": {
    images: [
      "/listings/listings2.webp",
      "/listings/listings3.webp",
      "/listings/listings1.webp",
    ],
    status: "AVAILABLE",
    available: true,
    address: "Acre Lane, Brixton, SW2",
    beds: 1,
    bathrooms: 1,
    dimensions: "7 X 8",
    price: "2,100",
    slug: "acre-lane-brixton-sw2",
    description: [
      "A well-presented 1-bedroom apartment on the vibrant Acre Lane in Brixton. The flat features a bright open-plan living and kitchen space, a comfortable double bedroom with fitted storage, and a modern shower room.",
      "Set in the heart of Brixton, with its eclectic mix of markets, restaurants and culture right on the doorstep. Brixton Underground station is just a short walk away, offering excellent connections across the city.",
    ],
    features: [
      "Open-Plan Living / Kitchen",
      "Double Bedroom",
      "Shower Room",
      "Fitted Storage",
      "Secure Entry",
    ],
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

      {/* ── About this property ── */}
      {property.description && (
        <section className="px-4 md:px-10 py-10 md:py-14 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2
              className="mb-5 text-gold"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                fontWeight: 400,
            
              }}
            >
              About this property
            </h2>
            <div className="flex flex-col gap-4">
              {property.description.map((para, i) => (
                <p
                  key={i}
                  className="text-black/70 leading-relaxed"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

   
      {/* ── Property Features + Map ── */}
      {property.features && (
        <section className="px-4 md:px-10 py-10 md:py-14 bg-cream">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16">
              {/* Features */}
              <div className="flex-1">
                <h2
                  className="mb-6 text-gold"
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                    fontWeight: 400,
                  }}
                >
                  Property Features
                </h2>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature) => (
                    <span
                      key={feature}
                      className="border border-tan/40 px-3 py-1.5 text-[10px] tracking-widest uppercase text-tan"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div
                className="w-full md:w-[48%] shrink-0 rounded-sm overflow-hidden"
                style={{ minHeight: "260px" }}
              >
                <iframe
                  title={`Map – ${property.address}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed&z=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "260px", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      )}

         {/* ── View More Listings ── */}
      {(() => {
        const others = Object.values(mockProperties)
          .filter((p) => p.slug !== property.slug)
          .slice(0, 3)
          .map((p): Listing => ({
            id: p.slug,
            image: p.images[0],
            badge: p.status === "FOR SALE" ? "FOR SALE" : "FOR LET",
            address: p.address,
            beds: p.beds,
            bathrooms: p.bathrooms,
            sqMeters: parseInt(p.dimensions.split("X")[0].trim()) * parseInt(p.dimensions.split("X")[1].trim()),
            price: p.price,
            available: p.available,
            slug: p.slug,
          }));
        return (
          <section className="px-4 md:px-10 py-10 md:py-14 bg-cream">
            <div className="max-w-6xl mx-auto">
              <h2
                className="mb-8 text-gold"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 400,
           
                }}
              >
                View More Listings.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {others.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          </section>
        );
      })()}

    </main>
  );
};

export default PropertyDetailPage;
