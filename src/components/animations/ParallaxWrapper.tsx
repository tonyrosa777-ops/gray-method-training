"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";

interface ParallaxWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** px range to shift vertically — [start, end] e.g. [-20, 20] */
  yRange?: [number, number];
}

export default function ParallaxWrapper({
  children,
  className,
  yRange = [-20, 20],
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : yRange);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
