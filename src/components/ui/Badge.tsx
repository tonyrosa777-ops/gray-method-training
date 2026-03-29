type BadgeVariant = "default" | "gold" | "limited" | "category";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-gray-subtle text-gray-text-2 border border-white/10",
  gold:
    "bg-gold/10 text-gold border border-gold/30 font-mono tracking-wider",
  limited:
    "bg-orange-accent/10 text-orange-accent border border-orange-accent/30 font-mono tracking-wider",
  category:
    "bg-gray-subtle text-gray-text-2 uppercase tracking-widest text-xs",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-block px-3 py-1 rounded-full text-xs font-body
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
