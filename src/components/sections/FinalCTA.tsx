import { finalCta } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import ScaleIn from "@/components/animations/ScaleIn";
import RevealText from "@/components/animations/RevealText";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section
      className="relative bg-gray-bg py-28 lg:py-40 overflow-hidden"
      aria-label="Schedule a free discovery call with Coach Adam"
    >
      {/* Large centered ember — atmospheric only */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200,169,110,0.05) 0%, rgba(232,98,26,0.03) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Divider rule at top */}
      <div
        className="absolute top-0 inset-x-0 section-divider"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <FadeUp className="mb-6">
          <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase">
            Free Discovery Call · 20 minutes · No commitment
          </p>
        </FadeUp>

        {/* Headline — char reveal */}
        <div className="mb-8">
          <RevealText
            text={finalCta.headline}
            className="font-display font-semibold text-display text-gray-text block"
            charDelay={0.025}
          />
        </div>

        {/* Sub */}
        <FadeUp delay={0.5} className="mb-12">
          <p className="font-body text-lead text-gray-text-2 leading-relaxed">
            {finalCta.sub}
          </p>
        </FadeUp>

        {/* CTA */}
        <ScaleIn delay={0.7}>
          <Button href={finalCta.cta.href} variant="gold" size="lg">
            {finalCta.cta.label}
          </Button>
        </ScaleIn>

        {/* Reassurance */}
        <FadeUp delay={0.9}>
          <p className="font-body text-sm text-gray-muted mt-6">
            {finalCta.note}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
