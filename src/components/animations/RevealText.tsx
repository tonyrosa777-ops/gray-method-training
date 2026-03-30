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
}

export default function RevealText({
  text,
  className,
  delay = 0,
  charDelay = 0.02,
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

  // Split into words, then characters within each word
  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial={reduced ? false : "hidden"}
      animate={inView || reduced ? "visible" : "hidden"}
      className={className}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={reduced ? undefined : charVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <motion.span
              variants={reduced ? undefined : charVariants}
              className="inline-block"
            >
              &nbsp;
            </motion.span>
          )}
        </span>
      ))}
    </motion.div>
  );
}
