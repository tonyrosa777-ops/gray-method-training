"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { prefersReducedMotion } from "@/lib/utils";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** y offset to start from (px) */
  distance?: number;
}

export default function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.7,
  distance = 40,
}: FadeUpProps) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "-80px" });
  const reduced = prefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: distance }}
      animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{
        duration: reduced ? 0 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
}
