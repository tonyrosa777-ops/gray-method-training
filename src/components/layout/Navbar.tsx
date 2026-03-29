"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav } from "@/data/site";
import Button from "@/components/ui/Button";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
