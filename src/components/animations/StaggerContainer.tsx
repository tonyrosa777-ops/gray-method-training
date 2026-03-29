"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { prefersReducedMotion } from "@/lib/utils";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  /** Delay before the first child animates */
  initialDelay?: number;
}

export default function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggerContainerProps) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "-80px" });
  const reduced = prefersReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : staggerDelay,
        delayChildren: reduced ? 0 : initialDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView || reduced ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/** Use this as a direct child of StaggerContainer to get stagger behavior */
export const StaggerItem = motion.div;

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] as [number, number, number, number] },
  },
};

export const staggerItemScaleVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] as [number, number, number, number] },
  },
};
