"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { nav } from "@/data/site";
import { useCart } from "@/lib/cart";

interface MobileNavProps {
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { x: "100%", transition: { duration: 0.25, ease: EASE } },
};

const linkContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

export default function MobileNav({ onClose }: MobileNavProps) {
  const { count, openCart } = useCart();

  const handleOpenCart = () => {
    onClose();
    openCart();
  };

  return (
    <>
      {/* Dark overlay */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <motion.nav
        className="fixed top-0 right-0 z-50 h-full w-80 max-w-full bg-gray-bg-2 border-l border-white/5 flex flex-col"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <span className="font-display font-semibold text-gold text-lg tracking-tight">
            Gray Method
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenCart}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-gray-elevated/70 px-3 py-2 text-gray-text-2 transition-colors hover:border-gold/30 hover:text-gold"
              aria-label={`Open cart with ${count} item${count === 1 ? "" : "s"}`}
            >
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-gray-bg">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M6 6h15l-1.5 8.5a2 2 0 0 1-2 1.5H9a2 2 0 0 1-2-1.5L5 3H2" />
                  <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold leading-none text-gray-bg">
                  {count}
                </span>
              </span>
              <span className="font-body text-sm">Cart</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-text-2 hover:text-gray-text transition-colors p-1"
              aria-label="Close navigation menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Links */}
        <motion.ul
          className="flex-1 flex flex-col justify-center px-8 gap-2"
          variants={linkContainerVariants}
          initial="hidden"
          animate="visible"
          role="list"
        >
          {nav.links.map((link) => (
            <motion.li key={link.href} variants={linkVariants}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block py-3 font-display text-2xl font-semibold text-gray-text hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA at bottom */}
        <motion.div
          className="px-8 pb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.4 } }}
        >
          <Link
            href={nav.cta.href}
            onClick={onClose}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-base font-body font-medium tracking-wide text-gray-bg transition-all duration-200 hover:bg-gold-light"
          >
            {nav.cta.label}
          </Link>
        </motion.div>
      </motion.nav>
    </>
  );
}
