import { type ClassValue, clsx } from "clsx";

/**
 * Merge Tailwind class names — thin wrapper around clsx.
 * Install clsx: npm install clsx
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}

/** Format a number with + suffix if desired */
export function formatStat(value: number, suffix = ""): string {
  return `${value}${suffix}`;
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Check if we're in a browser environment */
export const isBrowser = typeof window !== "undefined";

/** Returns true if user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  if (!isBrowser) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
