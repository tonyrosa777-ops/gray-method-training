import { painPoints } from "@/data/site";
import StaggerContainer, { StaggerItem, staggerItemScaleVariants } from "@/components/animations/StaggerContainer";
import FadeUp from "@/components/animations/FadeUp";

export default function PainPoints() {
  return (
    <section
      className="bg-gray-bg-2 py-24 lg:py-32"
      aria-label="Pain points — does this sound like you?"
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="mb-16">
          <h2 className="font-display font-semibold text-title-xl text-gray-text">
            {painPoints.headline}
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {painPoints.cards.map((card) => (
            <StaggerItem
              key={card.id}
              variants={staggerItemScaleVariants}
              className="group relative bg-gray-elevated border border-gold-dim rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:border-gold-glow"
            >
              {/* Gold accent top-left line */}
              <div
                className="absolute top-0 left-8 h-px w-12 bg-gold/60 transition-all duration-300 group-hover:w-20 group-hover:bg-gold"
                aria-hidden="true"
              />

              <h3 className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-4 mt-2">
                {card.name}
              </h3>
              <p className="font-body text-gray-text leading-relaxed text-base">
                {card.body}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
