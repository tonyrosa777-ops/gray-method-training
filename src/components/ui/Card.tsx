interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "gold-featured";
  className?: string;
  as?: "div" | "article" | "section";
}

export default function Card({
  children,
  variant = "default",
  className = "",
  as: Tag = "div",
}: CardProps) {
  const base =
    "rounded-lg p-6 transition-all duration-300 shadow-card hover:shadow-card-hover";

  const variants: Record<string, string> = {
    default:
      "bg-gray-elevated border border-gold-dim",
    "gold-featured":
      "bg-gold-dim border border-gold/40 ring-1 ring-gold/20",
  };

  return (
    <Tag className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
