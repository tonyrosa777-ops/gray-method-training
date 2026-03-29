import { philosophy } from "@/data/site";
import RevealText from "@/components/animations/RevealText";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { StaggerItem, staggerItemVariants } from "@/components/animations/StaggerContainer";

export default function GrayMethodPhilosophy() {
  return (
    <section
      className="bg-gray-bg-2 py-24 lg:py-32 overflow-hidden"
      aria-label="The Gray Method philosophy"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Headline */}
        <div className="mb-6">
          <RevealText
            text={philosophy.headline}
            className="font-display font-semibold text-display text-gray-text block italic"
            charDelay={0.022}
          />
        </div>

        {/* Sub-headline */}
        <FadeUp delay={0.4} className="mb-20 max-w-2xl">
          <p className="font-body text-lead text-gray-text-2 leading-relaxed">
            {philosophy.sub}
          </p>
        </FadeUp>

        {/* Pillars */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          initialDelay={0.3}
        >
          {philosophy.pillars.map((pillar) => (
            <StaggerItem
              key={pillar.number}
              variants={staggerItemVariants}
              className="group"
            >
              {/* Number */}
              <p className="font-mono text-gold text-sm tracking-[0.2em] mb-5 flex items-center gap-3">
                <span>{pillar.number}</span>
                <span
                  className="inline-block h-px flex-1 bg-gold/30 transition-all duration-500 group-hover:bg-gold/60"
                  aria-hidden="true"
                />
              </p>

              {/* Title */}
              <h3 className="font-display font-semibold text-title-md text-gray-text mb-4">
                {pillar.title}
              </h3>

              {/* Body */}
              <p className="font-body text-gray-text-2 leading-relaxed text-base">
                {pillar.body}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Decorative background word — large, watermark style */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-display font-semibold text-[20rem] leading-none text-white/[0.015] tracking-tight"
          >
            Gray
          </span>
        </div>
      </div>
    </section>
  );
}
