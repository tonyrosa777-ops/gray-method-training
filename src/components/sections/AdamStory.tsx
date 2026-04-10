import Image from "next/image";
import Link from "next/link";
import { adamStory } from "@/data/site";
import SlideIn from "@/components/animations/SlideIn";
import FadeUp from "@/components/animations/FadeUp";

export default function AdamStory() {
  return (
    <section
      className="bg-gray-bg py-24 lg:py-32"
      aria-label="Coach Adam Gray's story"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-16 items-start">

          {/* Photo — slides in from left */}
          <SlideIn direction="left" className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              <div
                className="absolute inset-0 z-10 rounded-2xl pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(200,169,110,0.12)" }}
                aria-hidden="true"
              />
              <Image
                src="/images/hero-adam.jpg"
                alt="Coach Adam Gray — Gray Method Training"
                width={2000}
                height={1429}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full h-auto object-cover object-top"
              />
            </div>
          </SlideIn>

          {/* Copy — slides in from right */}
          <SlideIn direction="right">
            <FadeUp delay={0.1}>
              <h2 className="font-display font-semibold text-title-xl text-gray-text mb-8">
                {adamStory.headline}
              </h2>
            </FadeUp>

            <div className="flex flex-col gap-5 mb-10">
              {adamStory.body.map((paragraph, i) => (
                <FadeUp key={i} delay={0.15 + i * 0.08}>
                  <p className="font-body text-gray-text-2 leading-relaxed text-base">
                    {paragraph}
                  </p>
                </FadeUp>
              ))}
            </div>

            {/* Pull quote */}
            <FadeUp delay={0.5}>
              <blockquote className="pull-quote mb-10" cite="/about">
                {adamStory.pullQuote}
              </blockquote>
            </FadeUp>

            {/* CTA */}
            <FadeUp delay={0.65}>
              <Link
                href={adamStory.cta.href}
                className="group inline-flex items-center gap-2 font-body text-gold hover:text-gold-light transition-colors duration-200"
              >
                {adamStory.cta.label}
                <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
              </Link>
            </FadeUp>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
