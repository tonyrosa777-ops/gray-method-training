"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { prefersReducedMotion } from "@/lib/utils";

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
}: ScaleInProps) {
  const { ref, inView } = useInView({ once: true, rootMargin: "-80px" });
  const reduced = prefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
      animate={inView || reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
      transition={{
        duration: reduced ? 0 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
