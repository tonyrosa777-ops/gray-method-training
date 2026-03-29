import { quizCta } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import ScaleIn from "@/components/animations/ScaleIn";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function QuizCTA() {
  return (
    <section
      className="relative bg-gray-bg py-24 lg:py-32 overflow-hidden"
      aria-label="Take the quiz — find out what's keeping you stuck"
    >
      {/* Ember orb — right side this time */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] translate-x-1/3 -translate-y-1/3 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,98,26,0.14) 0%, rgba(200,169,110,0.06) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <FadeUp className="mb-4">
          <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase">
            Free · 2 minutes · No email required to start
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mb-6">
          <h2 className="font-display font-semibold text-title-xl text-gray-text">
            {quizCta.headline}
          </h2>
        </FadeUp>

        <FadeUp delay={0.2} className="mb-10">
          <p className="font-body text-lead text-gray-text-2">
            {quizCta.sub}
          </p>
        </FadeUp>

        {/* Orange CTA — this is the one place per page orange gets a full button */}
        <ScaleIn delay={0.3} className="mb-6">
          <Button href={quizCta.ctaPrimary.href} variant="orange" size="lg">
            {quizCta.ctaPrimary.label}
          </Button>
        </ScaleIn>

        {/* Secondary text link */}
        <FadeUp delay={0.45}>
          <Link
            href={quizCta.ctaSecondary.href}
            className="group inline-flex items-center gap-2 font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200"
          >
            {quizCta.ctaSecondary.label}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
