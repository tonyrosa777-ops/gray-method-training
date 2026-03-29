import Link from "next/link";
import { social } from "@/data/site";
import FadeIn from "@/components/animations/FadeIn";

/**
 * Instagram Feed — Phase 5 version
 *
 * Shows a branded placeholder grid for the demo.
 * Live Instagram Graph API integration is built in Phase 6.
 * The component structure (grid + tile design) is final.
 */

const PLACEHOLDER_TILES = Array.from({ length: 9 }, (_, i) => ({
  id: `ig-placeholder-${i}`,
  index: i + 1,
}));

function FallbackTile({ index }: { index: number }) {
  return (
    <div className="relative aspect-square bg-gray-elevated border border-white/5 rounded-sm overflow-hidden group cursor-pointer">
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gray-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
        <div className="text-center">
          <p className="font-mono text-gold text-xs tracking-widest">
            {social.instagramHandle}
          </p>
        </div>
      </div>
      {/* Placeholder content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div
          className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="font-mono text-gold/30 text-xs">{index}</span>
        </div>
        <span className="font-mono text-gray-muted text-xs">Instagram</span>
      </div>
    </div>
  );
}

export default function InstagramFeed() {
  return (
    <section
      className="bg-gray-bg-2 py-24 lg:py-32"
      aria-label={`Follow ${social.instagramHandle} on Instagram`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeIn className="flex items-center justify-between mb-10">
          <div>
            <p className="font-body text-sm text-gray-muted tracking-wide mb-1">
              Follow along
            </p>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-xl font-semibold text-gray-text hover:text-gold transition-colors duration-200"
            >
              {social.instagramHandle}
            </a>
          </div>
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden sm:inline-flex items-center gap-2 font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200"
            aria-label={`View ${social.instagramHandle} on Instagram`}
          >
            View on Instagram
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </FadeIn>

        {/* Grid */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-3 gap-1.5" aria-label="Instagram feed">
            {PLACEHOLDER_TILES.map((tile) => (
              <FallbackTile key={tile.id} index={tile.index} />
            ))}
          </div>
          {/* Phase 6 note — visible in dev, not in prod */}
          <p className="font-mono text-xs text-gray-muted mt-4 text-center opacity-50">
            Live Instagram feed · Phase 6 · INSTAGRAM_ACCESS_TOKEN required
          </p>
        </FadeIn>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200"
          >
            View on Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
