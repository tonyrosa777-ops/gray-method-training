"use client";

import { motion } from "framer-motion";
import { hero } from "@/data/site";
import Button from "@/components/ui/Button";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";

/* ---- Word-by-word tagline ---- */
function TaglineReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.p
      className="font-body text-lead text-gray-text-2 max-w-[520px]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.9 } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.28em]"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

/* ---- Scroll chevron ---- */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-muted"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.6 }}
      aria-hidden="true"
    >
      <span className="font-body text-xs tracking-widest uppercase">{hero.scrollLabel}</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 6l5 5 5-5" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-gray-bg overflow-hidden flex items-center"
      aria-label="Hero — Gray Method Training"
    >
      {/* Ember orb — atmospheric bottom-left glow */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] -translate-x-1/3 translate-y-1/3 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,98,26,0.18) 0%, rgba(200,169,110,0.08) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />
      {/* Secondary orb — top right */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] translate-x-1/3 -translate-y-1/3 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-16 items-center">

          {/* Copy block */}
          <div className="flex flex-col gap-7">
            {/* Eyebrow */}
            <motion.p
              className="font-mono text-xs text-gold tracking-[0.2em] uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Online Health & Fitness Coaching
            </motion.p>

            {/* Headline */}
            <motion.h1
              className="font-display font-semibold text-display text-gray-text leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="text-gold">Gray Method</span>{" "}
              <span className="block mt-1">Online Health</span>
              <span className="block">&amp; Fitness</span>
            </motion.h1>

            {/* Tagline — word-by-word */}
            <TaglineReveal text={hero.tagline} />

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.4, ease: "easeOut" }}
            >
              <Button href={hero.ctaPrimary.href} variant="gold" size="lg">
                {hero.ctaPrimary.label}
              </Button>
              <Button href={hero.ctaSecondary.href} variant="ghost" size="lg">
                {hero.ctaSecondary.label}
              </Button>
            </motion.div>

            {/* Trust micro-copy */}
            <motion.p
              className="font-body text-xs text-gray-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.5 }}
            >
              4.9★ Google rating · 11+ years coaching · 100% would recommend
            </motion.p>
          </div>

          {/* Photo block */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
              {/* Gold frame glow */}
              <div
                className="absolute inset-0 z-10 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(200,169,110,0.15)",
                }}
                aria-hidden="true"
              />
              <PhotoPlaceholder
                photoKey="heroAdam"
                sizes="(max-width: 1280px) 45vw, 560px"
                priority
              />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -left-6 bg-gray-elevated border border-gold-dim rounded-xl px-5 py-3 shadow-card"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="font-mono text-xs text-gold tracking-wider">4.9★</p>
              <p className="font-body text-sm text-gray-text mt-0.5">Average Google Rating</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
