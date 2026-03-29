"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { prefersReducedMotion } from "@/lib/utils";

interface CountUpProps {
  /** Target value */
  end: number;
  /** Starting value */
  start?: number;
  /** Duration in seconds */
  duration?: number;
  /** Suffix to append e.g. "+" or "%" or "★" */
  suffix?: string;
  /** Decimal places */
  decimals?: number;
  className?: string;
}

export default function CountUp({
  end,
  start = 0,
  duration = 1.2,
  suffix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const { ref, inView } = useInView({ once: true, rootMargin: "-80px" });
  const [value, setValue] = useState(start);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(end);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [inView, end, start, duration, reduced]);

  const displayValue = value.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  );
}
