"use client";

import Link from "next/link";
import Image from "next/image";
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
          {/* Logo — image-only, the badge IS the wordmark */}
          <Link
            href="/"
            className="group flex items-center"
            aria-label={`${nav.logo} Training — home`}
          >
            <Image
              src="/images/gray-method-logo.png"
              alt={`${nav.logo} Training`}
              width={56}
              height={56}
              priority
              className={[
                "transition-all duration-300",
                scrolled ? "h-11 w-11" : "h-14 w-14",
                "drop-shadow-[0_0_12px_rgba(200,169,110,0.25)] group-hover:drop-shadow-[0_0_18px_rgba(200,169,110,0.5)] group-hover:scale-[1.03]",
              ].join(" ")}
            />
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
          <div className="hidden lg:flex items-center gap-3">
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
