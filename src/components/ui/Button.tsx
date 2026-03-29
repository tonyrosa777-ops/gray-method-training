"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ButtonVariant = "gold" | "orange" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  /** Arrow suffix — append → after label */
  arrow?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  gold: [
    "bg-gold text-gray-bg font-body font-medium",
    "hover:bg-gold-light",
    "focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-gray-bg",
  ].join(" "),
  orange: [
    "bg-orange-accent text-white font-body font-medium",
    "hover:brightness-110",
    "focus-visible:ring-2 focus-visible:ring-orange-accent focus-visible:ring-offset-2 focus-visible:ring-offset-gray-bg",
  ].join(" "),
  ghost: [
    "bg-transparent text-gold font-body font-medium",
    "border border-gold",
    "hover:bg-gold hover:text-gray-bg",
    "focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-gray-bg",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-lg",
  lg: "px-8 py-4 text-lg rounded-lg",
};

export default function Button({
  children,
  variant = "gold",
  size = "md",
  href,
  external = false,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  arrow = false,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center gap-2 transition-all duration-200 cursor-pointer",
    "tracking-wide",
    variantClasses[variant],
    sizeClasses[size],
    disabled ? "opacity-40 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {arrow && <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${classes}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={`group ${classes}`}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${classes}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
