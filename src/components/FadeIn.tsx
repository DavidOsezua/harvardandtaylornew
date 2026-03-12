import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Delay before the transition starts, in ms */
  delay?: number;
  /** Direction the element travels from as it enters */
  from?: "up" | "left" | "right" | "none";
  /** How far it travels, in px */
  distance?: number;
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
}

const FadeIn = ({
  children,
  className = "",
  style,
  delay = 0,
  from = "up",
  distance = 28,
  threshold = 0.12,
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const hidden: Record<FadeInProps["from"] & string, string> = {
    up: `translateY(${distance}px)`,
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    none: "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hidden[from],
        transition: `opacity 750ms cubic-bezier(0.4,0,0.2,1), transform 750ms cubic-bezier(0.4,0,0.2,1)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
