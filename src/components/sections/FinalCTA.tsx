import { finalCta } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import ScaleIn from "@/components/animations/ScaleIn";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden bg-gray-bg py-28 lg:py-40"
      aria-label="Send a message to Coach Adam"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="h-[700px] w-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200,169,110,0.05) 0%, rgba(232,98,26,0.03) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <FadeUp className="mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
            Quick note - real follow-up - on your terms
          </p>
        </FadeUp>

        <FadeUp delay={0.2} className="mb-8">
          <h2 className="mx-auto max-w-4xl font-display text-display font-semibold leading-[0.95] text-gray-text text-balance">
            {finalCta.headline}
          </h2>
        </FadeUp>

        <FadeUp delay={0.35} className="mb-12">
          <p className="font-body text-lead leading-relaxed text-gray-text-2">
            {finalCta.sub}
          </p>
        </FadeUp>

        <ScaleIn delay={0.5}>
          <Button href={finalCta.cta.href} variant="gold" size="lg">
            {finalCta.cta.label}
          </Button>
        </ScaleIn>

        <FadeUp delay={0.65}>
          <p className="mt-6 font-body text-sm text-gray-muted">
            {finalCta.note}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
