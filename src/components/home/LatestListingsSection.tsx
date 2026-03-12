import { Link } from "react-router-dom";
import ListingCard, { type Listing } from "../ListingCard";
import FadeIn from "../FadeIn";

const mockListings: Listing[] = [
  {
    id: "1",
    image: "/listings/listings1.webp",
    badge: "FOR LET",
    address: "Belmont Close, London, SW4",
    beds: 3,
    bathrooms: 2,
    sqMeters: 120,
    price: "6,500",
    available: true,
    slug: "belmont-close-london-sw4-1",
  },
  {
    id: "2",
    image: "/listings/listings2.webp",
    badge: "FOR SALE",
    address: "Old Brompton Road, London, SW5",
    beds: 3,
    bathrooms: 2,
    sqMeters: 120,
    price: "6,500",
    available: true,
    slug: "old-brompton-road-london-sw5",
  },
  {
    id: "3",
    image: "/listings/listings3.webp",
    badge: "FOR LET",
    address: "Belmont Close, London, SW4",
    beds: 3,
    bathrooms: 2,
    sqMeters: 120,
    price: "6,500",
    available: true,
    slug: "belmont-close-london-sw4-2",
  },
];

const LatestListingsSection = () => {
  return (
    <section className="bg-cream py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Heading */}
        <h2
          className="text-gold mb-8 text-3xl font-normal"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          Latest listings
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockListings.map((listing, i) => (
            <FadeIn key={listing.id} delay={i * 120}>
              <ListingCard listing={listing} />
            </FadeIn>
          ))}
        </div>

        {/* View all button — bottom right */}
        <FadeIn delay={400} className="flex justify-end mt-8">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-gold text-cream-light rounded-full px-6 py-3 text-sm font-light tracking-wide hover:bg-dark transition-colors duration-200"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            View Our Properties
            <span>→</span>
          </Link>
        </FadeIn>

      </div>
    </section>
  );
};

export default LatestListingsSection;
