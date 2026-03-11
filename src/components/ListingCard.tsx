import { Link } from "react-router-dom";
import ProgressiveImage from "./ProgressiveImage";

export interface Listing {
  id: string;
  image: string;
  badge: "FOR LET" | "FOR SALE";
  address: string;
  beds: number;
  bathrooms: number;
  sqMeters: number;
  price: string;
  available: boolean;
  slug: string;
}

const BedIcon = () => (
  <svg
    width="18"
    height="11"
    viewBox="0 0 18 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.8125 5.25C3.58203 5.25 2.625 4.29297 2.625 3.0625C2.625 1.85938 3.58203 0.875 4.8125 0.875C6.01562 0.875 7 1.85938 7 3.0625C7 4.29297 6.01562 5.25 4.8125 5.25ZM14.4375 1.75C16.1055 1.75 17.5 3.14453 17.5 4.8125V10.0625C17.5 10.3086 17.2812 10.5 17.0625 10.5H16.1875C15.9414 10.5 15.75 10.3086 15.75 10.0625V8.75H1.75V10.0625C1.75 10.3086 1.53125 10.5 1.3125 10.5H0.4375C0.191406 10.5 0 10.3086 0 10.0625V0.4375C0 0.21875 0.191406 0 0.4375 0H1.3125C1.53125 0 1.75 0.21875 1.75 0.4375V6.125H7.875V2.1875C7.875 1.96875 8.06641 1.75 8.3125 1.75H14.4375Z"
      fill="#C79C71"
      fill-opacity="0.65"
    />
  </svg>
);

const BathIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.875 10.5V9.1875H13.125V10.5C13.0977 11.293 12.7695 11.9766 12.25 12.4688V13.5625C12.25 13.8086 12.0312 14 11.8125 14H10.9375C10.6914 14 10.5 13.8086 10.5 13.5625V13.125H3.5V13.5625C3.5 13.8086 3.28125 14 3.0625 14H2.1875C1.94141 14 1.75 13.8086 1.75 13.5625V12.4688C1.20312 11.9766 0.875 11.293 0.875 10.5ZM13.5625 7C13.7812 7 14 7.21875 14 7.4375V7.875C14 8.12109 13.7812 8.3125 13.5625 8.3125H0.4375C0.191406 8.3125 0 8.12109 0 7.875V7.4375C0 7.21875 0.191406 7 0.4375 7H0.875V1.91406C0.875 0.875 1.72266 0 2.76172 0C3.28125 0 3.74609 0.21875 4.10156 0.574219L4.62109 1.09375C5.44141 0.738281 6.23438 0.875 6.80859 1.33984V1.3125C6.89062 1.25781 7 1.20312 7.10938 1.20312C7.24609 1.20312 7.35547 1.25781 7.4375 1.3125L7.73828 1.64062C7.82031 1.72266 7.875 1.83203 7.875 1.94141C7.875 2.07812 7.82031 2.1875 7.73828 2.24219L4.83984 5.14062C4.78516 5.22266 4.67578 5.25 4.53906 5.25C4.42969 5.25 4.32031 5.22266 4.23828 5.14062L3.9375 4.8125C3.85547 4.75781 3.80078 4.64844 3.80078 4.51172C3.80078 4.40234 3.85547 4.29297 3.9375 4.21094C3.47266 3.63672 3.33594 2.84375 3.69141 2.02344L3.17188 1.50391C3.0625 1.39453 2.92578 1.33984 2.76172 1.33984C2.43359 1.33984 2.1875 1.58594 2.1875 1.91406V7H13.5625Z"
      fill="#C79C71"
      fill-opacity="0.65"
    />
  </svg>
);

const AreaIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 0H0V3.15H1.4028V4.55H0V6.3H1.4028V7.7H0V9.45H1.4028V10.85H0V14H3.15V12.6231H4.55V14H6.3V12.6231H7.7V14H9.45V12.6231H10.85V14H14V7H7V0Z"
      fill="#C79C71"
      fill-opacity="0.65"
    />
  </svg>
);



const ListingCard = ({ listing }: { listing: Listing }) => {
  return (
    <Link
      to={`/properties/${listing.slug}`}
      className="group flex flex-col bg-white   overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-70 overflow-hidden">
        <ProgressiveImage
          src={listing.image}
          alt={listing.address}
          className="w-full h-full"
          imgClassName="group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-light tracking-widest uppercase text-tan bg-white/92`}
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {listing.badge}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 px-4 py-4">
        {/* Address */}
        <h3
          className="text-coffeeBrown text-[27px] md:text-[30px] leading-snug"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontWeight: 400,
          }}
        >
          {listing.address}
        </h3>

        {/* Details row */}
        <div
          className="flex items-center gap-3 text-tan text-[10px] md:text-[12px]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="flex items-center gap-1">
            <BedIcon />
            {listing.beds} BED
          </span>
          <span className="text-tan">|</span>
          <span className="flex items-center gap-1">
            <BathIcon />
            {listing.bathrooms} BATHROOMS
          </span>
          <span className="text-tan">|</span>
          <span className="flex items-center gap-1">
            <AreaIcon />
            {listing.sqMeters} SQ METRES
          </span>
        </div>

        {/* Price */}
        <p
          className="text-coffeeBrown text-[23px] md:text-[28px] font-light mt-1"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          £{listing.price} pcm
        </p>

        {/* Availability */}
        <p
          className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-light text-gold"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
          {listing.available ? "Available Now" : "Under Offer"}
        </p>
      </div>
    </Link>
  );
};

export default ListingCard;
