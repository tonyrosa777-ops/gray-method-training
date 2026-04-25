import type { Metadata } from "next";
import Link from "next/link";
import { programs, testimonials } from "@/data/site";
import { Navbar } from "@/components/layout";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Divider from "@/components/ui/Divider";
import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { StaggerItem, staggerItemVariants } from "@/components/animations/StaggerContainer";

export const metadata: Metadata = {
  title: "Programs — Gray Method Training",
  description:
    "1:1 online coaching, the Energize & Empower Her group program, and group coaching for busy women. Every program is built around your real life — not a template.",
  openGraph: {
    title: "Programs — Gray Method Training",
    description: "Find the right coaching program for where you are right now.",
    type: "website",
  },
};

const programDetails = [
  {
    id: "one-on-one",
    href: "/programs/one-on-one",
    name: "1:1 Online Coaching",
    badge: null,
    isFeatured: false,
    tagline: "Your schedule. Your equipment. Your plan.",
    description:
      "A fully personalized plan built around your equipment, your schedule, your injuries, your goals. Not a template. Not a system.",
    includes: [
      "Custom workout program (updated as you progress)",
      "Personalized nutrition coaching — no meal plans, no rules",
      "Weekly check-ins via messaging",
      "Video form reviews on request",
      "Direct access to Coach Adam, any time",
    ],
    cta: "Get Started",
    ctaHref: "/contact",
    secondaryCta: "Learn More",
    secondaryHref: "/programs/one-on-one",
  },
  {
    id: "eeh",
    href: "/programs/energize-empower",
    name: "Energize & Empower Her",
    badge: "FLAGSHIP PROGRAM",
    isFeatured: true,
    tagline: "Your hormones and your habits — finally addressed together.",
    description:
      "Co-created with Laura Brown, NP — Board-Certified Women's Health Nurse Practitioner. The only program that addresses your hormones and your habits at the same time.",
    includes: [
      "Hormone education from Laura Brown, NP (Board-Certified Nurse Practitioner)",
      "Custom training plan from Coach Adam",
      "Nutrition coaching designed around hormonal changes",
      "Group support from women who understand",
      "Weekly live sessions + on-demand content",
    ],
    cta: "Join the Waitlist",
    ctaHref: "/programs/energize-empower",
    secondaryCta: "Learn More",
    secondaryHref: "/programs/energize-empower",
  },
  {
    id: "group",
    href: "/programs/group",
    name: "Group Coaching",
    badge: "LIMITED SPOTS",
    isFeatured: false,
    tagline: "Personalized support. Community that gets it.",
    description:
      "Personalized support inside a community of women who understand exactly what you're dealing with. More affordable than 1:1, more personal than most group programs.",
    includes: [
      "Customized training plan (not a one-size-fits-all template)",
      "Nutrition guidance and habit coaching",
      "Group check-ins with Coach Adam",
      "Private community access",
      "Limited to keep quality high",
    ],
    cta: "Get Started",
    ctaHref: "/contact",
    secondaryCta: "Learn More",
    secondaryHref: "/programs/group",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-bg min-h-screen">

        {/* ---- Hero ---- */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] translate-x-1/3 -translate-y-1/3 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">
                Coaching Programs
              </p>
            </FadeIn>
            <FadeUp delay={0.05}>
              <h1 className="font-display font-semibold text-display text-gray-text leading-[1.05] max-w-2xl mb-5">
                {programs.headline}
              </h1>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="font-body text-lead text-gray-text-2 max-w-xl">
                Every program starts with a conversation. Adam doesn&apos;t put you in a box — he builds around where you actually are.
              </p>
            </FadeUp>
          </div>
        </section>

        <Divider />

        {/* ---- Program cards ---- */}
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            {programDetails.map((program, i) => (
              <FadeUp key={program.id} delay={i * 0.1}>
                <div className={`rounded-2xl border p-8 lg:p-12 ${program.isFeatured ? "bg-gray-elevated border-gold/20 shadow-card-hover" : "bg-gray-elevated border-white/5 shadow-card"}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">
                    {/* Left */}
                    <div>
                      {program.badge && (
                        <div className="mb-4">
                          <Badge variant={program.badge === "FLAGSHIP PROGRAM" ? "gold" : "limited"}>
                            {program.badge}
                          </Badge>
                        </div>
                      )}
                      <h2 className="font-display font-semibold text-title-xl text-gray-text mb-2">
                        {program.name}
                      </h2>
                      <p className={`font-mono text-sm mb-4 ${program.isFeatured ? "text-gold" : "text-gray-muted"}`}>
                        {program.tagline}
                      </p>
                      <p className="font-body text-base text-gray-text-2 leading-relaxed mb-6">
                        {program.description}
                      </p>
                      <ul className="space-y-2.5">
                        {program.includes.map((item) => (
                          <li key={item} className="flex items-start gap-3 font-body text-sm text-gray-text-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold mt-0.5 flex-shrink-0" stroke="currentColor" strokeWidth="1.5">
                              <polyline points="3 8 6.5 11.5 13 5" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right — CTA card */}
                    <div className="rounded-xl bg-gray-bg border border-white/5 p-6 space-y-4">
                      <p className="font-mono text-xs text-gray-muted tracking-wide uppercase">
                        Ready to start?
                      </p>
                      <p className="font-body text-sm text-gray-text-2 leading-relaxed">
                        Send a quick note first. Adam&apos;s team will follow up, ask the right questions, and help decide what belongs next.
                      </p>
                      <Button href={program.ctaHref} variant={program.isFeatured ? "gold" : "ghost"} size="md" className="w-full justify-center">
                        {program.cta}
                      </Button>
                      <Link
                        href={program.secondaryHref}
                        className="block text-center font-body text-xs text-gray-muted hover:text-gold transition-colors duration-200"
                      >
                        {program.secondaryCta} →
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        <Divider />

        {/* ---- Comparison note ---- */}
        <section className="py-20 bg-gray-bg-2">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn>
              <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">Not sure which to pick?</p>
              <h2 className="font-display font-semibold text-title-lg text-gray-text mb-4">
                Start with a quick note. Adam will tell you honestly.
              </h2>
              <p className="font-body text-lead text-gray-text-2 mb-8">
                If 1:1 isn&apos;t the right fit right now, Adam will say so. He&apos;d rather point you in the right direction than sell you something that doesn&apos;t serve you.
              </p>
              <Button href="/contact" variant="gold" size="lg">
                Tell Adam What&apos;s Going On
              </Button>
              <p className="font-mono text-xs text-gray-muted mt-4">No commitment. No pressure. Honest advice.</p>
            </FadeIn>
          </div>
        </section>

        <Divider />

        {/* ---- Social proof ---- */}
        <section className="py-24 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="mb-12">
              <p className="font-mono text-xs text-gray-muted tracking-[0.2em] uppercase mb-2">What clients say</p>
              <h2 className="font-display font-semibold text-title-xl text-gray-text">
                {testimonials.headline}
              </h2>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
              {testimonials.featured.map((t) => (
                <StaggerItem key={t.id} variants={staggerItemVariants}>
                  <div className="rounded-xl bg-gray-elevated border border-white/5 p-7 h-full flex flex-col gap-4">
                    <p className="font-mono text-xs text-gold tracking-wider">{t.context}</p>
                    <blockquote className="font-body text-sm text-gray-text-2 leading-relaxed italic flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <p className="font-body font-medium text-gray-text text-sm">— {t.name}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <FadeIn delay={0.3} className="mt-8 text-center">
              <Link href="/reviews" className="font-body text-sm text-gold hover:text-gold-light transition-colors duration-200">
                Read all client stories →
              </Link>
            </FadeIn>
          </div>
        </section>

      </main>
    </>
  );
}
