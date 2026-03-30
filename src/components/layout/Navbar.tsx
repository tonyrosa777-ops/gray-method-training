"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav } from "@/data/site";
import Button from "@/components/ui/Button";
import MobileNav from "./MobileNav";
import { useCart } from "@/lib/cart";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-gray-bg/95 backdrop-blur-md border-b border-white/5 py-3"
            : "bg-transparent py-5",
        ].join(" ")}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-semibold text-gold text-xl tracking-tight hover:text-gold-light transition-colors duration-200"
            aria-label="Gray Method Training — home"
          >
            Gray Method
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={[
                    "font-body text-sm tracking-wide",
                    "text-gray-text-2 hover:text-gray-text",
                    "transition-colors duration-200",
                    "relative group",
                  ].join(" ")}
                >
                  {link.label}
                  {/* Underline hover indicator */}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button href={nav.cta.href} variant="gold" size="sm">
              {nav.cta.label}
            </Button>
          </div>

          <button
            type="button"
            onClick={openCart}
            className={[
              "inline-flex items-center gap-2 rounded-full border border-white/10 bg-gray-elevated/70 px-3 py-2",
              "font-body text-sm text-gray-text-2 transition-colors duration-200 hover:border-gold/30 hover:text-gold",
            ].join(" ")}
            aria-label={`Open cart with ${count} item${count === 1 ? "" : "s"}`}
          >
            <span
              className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-gray-bg text-current"
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6h15l-1.5 8.5a2 2 0 0 1-2 1.5H9a2 2 0 0 1-2-1.5L5 3H2" />
                <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-semibold leading-none text-gray-bg">
                {count}
              </span>
            </span>
            <span className="hidden sm:inline">Cart</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col gap-1.5 p-2 text-gray-text-2 hover:text-gold transition-colors"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <span className="block w-6 h-px bg-current transition-all" />
            <span className="block w-4 h-px bg-current transition-all" />
            <span className="block w-6 h-px bg-current transition-all" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileNav onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
