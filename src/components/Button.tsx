import { Link } from "react-router-dom";

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="8.01" />
    <polyline points="11 12 12 12 12 16" />
  </svg>
);

type ButtonVariant = "filled" | "outline" | "outline-light";

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  filled:
    "bg-camel text-cream-light hover:bg-gold",
  outline:
    "border border-gold text-gold hover:bg-gold hover:text-cream",
  "outline-light":
    "border border-cream-light/60 text-cream-light hover:bg-cream-light hover:text-dark",
};

const baseClass =
  "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-light tracking-wide transition-colors duration-200";

const Button = ({
  children,
  to,
  href,
  onClick,
  variant = "filled",
  icon = <InfoIcon />,
  className = "",
}: ButtonProps) => {
  const classes = `${baseClass} ${variantStyles[variant]} ${className}`;
  const style = { fontFamily: "'Lato', sans-serif" };
  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (to) {
    return <Link to={to} className={classes} style={style}>{content}</Link>;
  }

  if (href) {
    return <a href={href} className={classes} style={style} target="_blank" rel="noopener noreferrer">{content}</a>;
  }

  return <button onClick={onClick} className={classes} style={style}>{content}</button>;
};

export default Button;
