import { useEffect, useRef, useState } from "react";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
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
  const imgRef = useRef<HTMLImageElement>(null);

  // If the image is already cached the browser won't fire onLoad,
  // so we also check img.complete immediately after mount.
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Blurred placeholder — always visible while full-res loads */}
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

      {/* Full-resolution image — fades in once loaded */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${imgClassName}`}
        style={{ opacity: loaded ? 1 : 0, objectPosition }}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

export default ProgressiveImage;
