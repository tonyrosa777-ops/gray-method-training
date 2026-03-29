"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { prefersReducedMotion } from "@/lib/utils";

interface RevealTextProps {
  /** The text to animate — revealed character by character */
  text: string;
  className?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Seconds between each character */
  charDelay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

export default function RevealText({
  text,
  className,
  delay = 0,
  charDelay = 0.02,
  as: Tag = "span",
}: RevealTextProps) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "-80px" });
  const reduced = prefersReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : charDelay,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
  };

  // Split into characters, preserving spaces
  const chars = text.split("");

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial={reduced ? false : "hidden"}
      animate={inView || reduced ? "visible" : "hidden"}
      className={className}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={reduced ? undefined : charVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
