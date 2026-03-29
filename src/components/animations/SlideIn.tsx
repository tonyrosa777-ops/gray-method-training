"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { prefersReducedMotion } from "@/lib/utils";

interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
}

export default function SlideIn({
  children,
  className,
  direction = "left",
  delay = 0,
  duration = 0.8,
  distance = 60,
}: SlideInProps) {
  const { ref, inView } = useInView({ once: true, rootMargin: "-80px" });
  const reduced = prefersReducedMotion();
  const x = direction === "left" ? -distance : distance;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, x }}
      animate={inView || reduced ? { opacity: 1, x: 0 } : { opacity: 0, x }}
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
