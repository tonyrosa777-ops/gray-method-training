import type { Metadata } from "next";
import Image from "next/image";
import { adamStory, philosophy, stats } from "@/data/site";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";
import SlideIn from "@/components/animations/SlideIn";
import ScaleIn from "@/components/animations/ScaleIn";
import StaggerContainer, { StaggerItem, staggerItemVariants } from "@/components/animations/StaggerContainer";
import { Navbar } from "@/components/layout";

export const metadata: Metadata = {
  title: "About Coach Adam Gray",
  description:
    "Adam Gray lost over 100 lbs and spent 6 years healing his relationship with food. Now he coaches busy women to build sustainable health habits without restriction or shame.",
  openGraph: {
    title: "About Coach Adam Gray — Gray Method Training",
    description:
      "The story behind the Gray Method: personal transformation, 11+ years coaching, and why there's no black and white in fitness.",
    type: "profile",
  },
};

const credentials = [
  { label: "NASM Certified Personal Trainer", note: "National Academy of Sports Medicine" },
  { label: "Certified Nutrition Coach", note: "Precision Nutrition PN1" },
  { label: "11+ Years Coaching Experience", note: "Close to 1,000 clients worked with" },
  { label: "100+ Lbs Lost Personally", note: "And every lesson that came with it" },
  { label: "Brazilian Jiu-Jitsu Practitioner", note: "Still a white belt — proudly learning" },
  { label: "Based in Henniker, NH", note: "Coaching clients online across the US" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-bg">

        {/* ---- Hero ---- */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background orb */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] translate-x-1/3 -translate-y-1/3 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-16 items-center">
              {/* Copy */}
              <div>
                <FadeIn>
                  <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-5">
                    About Coach Adam
                  </p>
                </FadeIn>
                <FadeUp delay={0.1}>
                  <h1 className="font-display font-semibold text-display text-gray-text leading-[1.05] mb-6">
                    {adamStory.headline}
                  </h1>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <div className="space-y-4">
                    {adamStory.body.map((para, i) => (
                      <p key={i} className="font-body text-lead text-gray-text-2 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </FadeUp>
                <FadeUp delay={0.35}>
                  <blockquote className="pull-quote my-8">
                    {adamStory.pullQuote}
                  </blockquote>
                </FadeUp>
                <FadeIn delay={0.45}>
                  <Button href="/contact" variant="gold" size="lg">
                    Schedule a Free Call with Adam
                  </Button>
                </FadeIn>
              </div>

              {/* Photo */}
              <SlideIn direction="right" delay={0.15} className="hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
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
                    sizes="(max-width: 1280px) 45vw, 560px"
                    priority
                    className="w-full h-auto object-cover object-top"
                  />
                </div>
              </SlideIn>
            </div>
          </div>
        </section>

        <Divider />

        {/* ---- Full Story ---- */}
        <section className="py-24 lg:py-32 bg-gray-bg-2">
          <div className="max-w-3xl mx-auto px-6">
            <FadeIn className="mb-12">
              <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">The full story</p>
              <h2 className="font-display font-semibold text-title-xl text-gray-text">What the scale never showed</h2>
            </FadeIn>

            <div className="space-y-6 font-body text-base text-gray-text-2 leading-[1.85]">
              <FadeUp>
                <p>
                  I grew up obese. Not &ldquo;could stand to lose a few pounds&rdquo; obese — the kind where
                  you avoid mirrors, buy the biggest size they carry, and pretend not to care so nobody
                  can see how much you do. I stepped on the scale backwards for years. The last number
                  I actually saw was 329 pounds.
                </p>
              </FadeUp>
              <FadeUp delay={0.05}>
                <p>
                  Eventually I lost over 100 pounds. I thought that was the finish line. I sprinted toward
                  it expecting everything on the other side to feel different — and in some ways it did.
                  But I&apos;d been so focused on the destination that I&apos;d never built anything
                  sustainable. I crashed hard.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <blockquote className="pull-quote my-8">
                  I sprinted to the starting line expecting everything after that to be easy — and it destroyed me.
                </blockquote>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p>
                  What followed was six years of rebuilding — not just my body, but my relationship with
                  food, with exercise, and with the person I still saw when I looked in the mirror. That
                  process — every setback, every lesson, every false start — is the foundation of every
                  piece of coaching I deliver today.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p>
                  I got certified as a personal trainer and nutrition coach not because the career seemed
                  lucrative, but because I&apos;d lived what most of my future clients were living. I&apos;d been
                  the person who tried every diet. I&apos;d been the person told their labs were &ldquo;normal.&rdquo;
                  I&apos;d been the person for whom willpower felt like the only tool — and it kept breaking.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p>
                  Eleven years and close to a thousand clients later, the one thing I know for certain is
                  this: there is no black and white. There is no right diet. No wrong food. No perfect
                  program. Everything — especially your health — is a gray area. My job isn&apos;t to give you
                  a system. My job is to find what actually works for <em>you</em>.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <p>
                  These days I train BJJ (Brazilian jiu-jitsu — I&apos;m still a white belt and I love it),
                  spend time with my family in Henniker, NH, and coach women online who remind me every
                  day why this work matters. If that sounds like the kind of coach you&apos;ve been looking
                  for, let&apos;s talk.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        <Divider />

        {/* ---- Credentials ---- */}
        <section className="py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6">
            <FadeIn className="mb-10 text-center">
              <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">Credentials & background</p>
              <h2 className="font-display font-semibold text-title-xl text-gray-text">
                11 years. 1,000 clients.<br />Still learning.
              </h2>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.07}>
              {credentials.map((cred) => (
                <StaggerItem key={cred.label} variants={staggerItemVariants}>
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-elevated border border-white/5 h-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-body font-medium text-gray-text text-sm">{cred.label}</p>
                      <p className="font-body text-xs text-gray-muted mt-0.5">{cred.note}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <Divider />

        {/* ---- Philosophy ---- */}
        <section className="py-24 lg:py-32 bg-gray-bg-2">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
              <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">The philosophy</p>
              <h2 className="font-display font-semibold text-title-xl text-gray-text mb-4">
                {philosophy.headline}
              </h2>
              <p className="font-body text-lead text-gray-text-2">{philosophy.sub}</p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
              {philosophy.pillars.map((pillar) => (
                <StaggerItem key={pillar.number} variants={staggerItemVariants}>
                  <div className="p-8 rounded-xl bg-gray-elevated border border-white/5 h-full">
                    <p className="font-mono text-3xl text-gold/30 mb-4">{pillar.number}</p>
                    <h3 className="font-display font-semibold text-title-md text-gray-text mb-3">{pillar.title}</h3>
                    <p className="font-body text-sm text-gray-text-2 leading-relaxed">{pillar.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <Divider />

        {/* ---- Stats ---- */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <ScaleIn key={stat.label}>
                  <div className="text-center p-8 rounded-xl bg-gray-elevated border border-white/5">
                    <p className="font-mono text-4xl text-orange-accent mb-2">
                      {stat.value}{stat.suffix}
                    </p>
                    <p className="font-body text-sm text-gray-text-2">{stat.label}</p>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ---- CTA ---- */}
        <section className="py-24 lg:py-32">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <FadeIn>
              <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">Ready to talk?</p>
              <h2 className="font-display font-semibold text-title-xl text-gray-text mb-4">
                No pitch. No pressure. Just a conversation.
              </h2>
              <p className="font-body text-lead text-gray-text-2 mb-8">
                A free 20-minute call with Adam. He&apos;ll listen to where you are, answer your questions honestly, and tell you exactly what he thinks would help.
              </p>
              <Button href="/contact" variant="gold" size="lg">
                Schedule Your Free Call
              </Button>
            </FadeIn>
          </div>
        </section>

      </main>
    </>
  );
}
