import { useState } from "react";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  /** Class applied to the wrapping div */
  className?: string;
  /** Extra classes forwarded to the full-resolution img (e.g. hover effects) */
  imgClassName?: string;
  style?: React.CSSProperties;
  objectPosition?: string;
}

const ProgressiveImage = ({
  src,
  alt,
  className = "",
  imgClassName = "",
  style,
  objectPosition = "center",
}: ProgressiveImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Tiny blurred placeholder — same src rendered at minimal size, blurred via CSS */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "blur(20px)",
          transform: "scale(1.12)",
          objectPosition,
        }}
      />

      {/* Full-resolution image — fades in once the browser has loaded it */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${imgClassName}`}
        style={{
          opacity: loaded ? 1 : 0,
          objectPosition,
        }}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

export default ProgressiveImage;
