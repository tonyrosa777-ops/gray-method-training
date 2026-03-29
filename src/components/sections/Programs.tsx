import Link from "next/link";
import { programs } from "@/data/site";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { StaggerItem, staggerItemScaleVariants } from "@/components/animations/StaggerContainer";
import Badge from "@/components/ui/Badge";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";

export default function Programs() {
  return (
    <section
      className="bg-gray-bg py-24 lg:py-32"
      aria-label="Programs — Gray Method Training"
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="mb-16">
          <h2 className="font-display font-semibold text-title-xl text-gray-text">
            {programs.headline}
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.items.map((program) => (
            <StaggerItem
              key={program.id}
              variants={staggerItemScaleVariants}
              className="group"
            >
              <div
                className={[
                  "relative flex flex-col h-full rounded-xl p-8 transition-all duration-300",
                  program.isFeatured
                    ? "bg-gold-dim border border-gold/40 shadow-[0_0_0_1px_rgba(200,169,110,0.2),0_8px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_0_1px_rgba(200,169,110,0.35),0_16px_60px_rgba(0,0,0,0.6)]"
                    : "bg-gray-elevated border border-gold-dim shadow-card hover:shadow-card-hover hover:border-gold-glow",
                ].join(" ")}
              >
                {/* Featured gold top bar */}
                {program.isFeatured && (
                  <div
                    className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-xl"
                    aria-hidden="true"
                  />
                )}

                {/* Badge */}
                {program.badge && (
                  <div className="mb-5">
                    <Badge variant={program.id === "eeh" ? "gold" : "limited"}>
                      {program.badge}
                    </Badge>
                  </div>
                )}

                {/* EEH: Laura Brown photo */}
                {program.id === "eeh" && (
                  <div className="mb-5 w-12 rounded-full overflow-hidden border border-gold/30">
                    <PhotoPlaceholder
                      photoKey="eehLaura"
                      sizes="48px"
                    />
                  </div>
                )}

                {/* Program name */}
                <h3 className={[
                  "font-display font-semibold text-title-md mb-4",
                  program.isFeatured ? "text-gold-light" : "text-gray-text",
                ].join(" ")}>
                  {program.name}
                </h3>

                {/* Description */}
                <p className="font-body text-gray-text-2 leading-relaxed text-sm flex-1 mb-8">
                  {program.description}
                </p>

                {/* CTA */}
                <Link
                  href={program.cta.href}
                  className={[
                    "group/link inline-flex items-center gap-2 font-body text-sm font-medium transition-colors duration-200",
                    program.isFeatured
                      ? "text-gold hover:text-gold-light"
                      : "text-gray-text-2 hover:text-gold",
                  ].join(" ")}
                >
                  {program.cta.label}
                  <span className="transition-transform duration-200 group-hover/link:translate-x-1.5">→</span>
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
