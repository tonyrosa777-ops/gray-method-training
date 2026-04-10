"use client";

import { motion } from "framer-motion";
import { hero } from "@/data/site";
import Button from "@/components/ui/Button";
import HeroParticles from "@/components/sections/HeroParticles";
import LogoParticles from "@/components/sections/LogoParticles";

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
      {/* Particle layer — stars, embers, glimmers */}
      <HeroParticles />

      {/* Ember orb — atmospheric bottom-left glow, breathing */}
      <motion.div
        className="absolute bottom-0 left-0 w-[700px] h-[700px] -translate-x-1/3 translate-y-1/3 rounded-full pointer-events-none orb-breathe"
        style={{
          background:
            "radial-gradient(circle, rgba(232,98,26,0.22) 0%, rgba(200,169,110,0.1) 45%, transparent 70%)",
          filter: "blur(90px)",
        }}
        aria-hidden="true"
      />
      {/* Secondary orb — top right, offset breathing phase */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] translate-x-1/3 -translate-y-1/3 rounded-full pointer-events-none orb-breathe-slow"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.12) 0%, rgba(232,98,26,0.04) 50%, transparent 70%)",
          filter: "blur(90px)",
        }}
        aria-hidden="true"
      />
      {/* Centre-top accent orb */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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
              {hero.eyebrow}
            </motion.p>

            {/* Headline — outcome-led, Adam's mission statement */}
            <motion.h1
              className="font-display font-semibold text-display text-gray-text leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="block">{hero.headlineLines[0]}</span>
              <span className="block mt-1">{hero.headlineLines[1]}</span>
              <span className="block text-shimmer">{hero.headlineLines[2]}</span>
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

          {/* Logo particle field — canvas-sampled Gray Method badge */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <LogoParticles />
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
