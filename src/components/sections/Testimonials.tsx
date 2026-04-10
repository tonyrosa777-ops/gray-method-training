import Link from "next/link";
import { testimonials } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { StaggerItem, staggerItemVariants } from "@/components/animations/StaggerContainer";

export default function Testimonials() {
  return (
    <section
      className="bg-gray-bg py-24 lg:py-32"
      aria-label="Client testimonials"
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <h2 className="font-display font-semibold text-title-xl text-gray-text">
            {testimonials.headline}
          </h2>
          <Link
            href={testimonials.cta.href}
            className="group inline-flex items-center gap-2 font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200 whitespace-nowrap"
          >
            {testimonials.cta.label}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.featured.map((t) => (
            <StaggerItem
              key={t.id}
              variants={staggerItemVariants}
            >
              <article className="flex flex-col h-full bg-gray-elevated border border-gold-dim rounded-xl p-8 shadow-card hover:shadow-card-hover hover:border-gold-glow transition-all duration-300">
                {/* Quote mark */}
                <div
                  className="font-display text-5xl text-gold/30 leading-none mb-4 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* The actual quote */}
                <blockquote className="font-body text-gray-text leading-relaxed text-base flex-1 mb-6">
                  {t.quote}
                </blockquote>

                {/* Adam's note */}
                <p className="font-body text-sm text-gray-muted italic mb-6 border-t border-white/5 pt-5">
                  {t.adamNote}
                </p>

                {/* Client identity */}
                <div>
                  <p className="font-body text-sm font-medium text-gray-text">
                    {t.name}
                  </p>
                  <p className="font-mono text-xs text-gray-muted tracking-wide mt-0.5">
                    {t.context}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
