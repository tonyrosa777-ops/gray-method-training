import type { Metadata } from "next";
import { Navbar } from "@/components/layout";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Divider from "@/components/ui/Divider";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";
import SlideIn from "@/components/animations/SlideIn";
import StaggerContainer, { StaggerItem, staggerItemVariants } from "@/components/animations/StaggerContainer";

export const metadata: Metadata = {
  title: "Energize & Empower Her",
  description:
    "The only online coaching program that addresses perimenopause and menopause by combining hormonal health from a Nurse Practitioner with fitness coaching from Coach Adam Gray.",
};

const pillars = [
  { lead: "Laura Brown, NP", body: "Board-Certified Women's Health Nurse Practitioner. Laura provides hormone education, answers the questions your doctor didn't, and explains what's actually happening in your body." },
  { lead: "Coach Adam Gray", body: "11+ years coaching women. Custom workout programming and nutrition coaching designed specifically around hormonal changes — not a generic plan retrofitted." },
  { lead: "Community of women who get it", body: "A private group of women navigating the same season. The support from peers who actually understand is something no 1:1 program can replicate." },
];

const included = [
  "Hormone education sessions with Laura Brown, NP",
  "Custom training program from Coach Adam",
  "Nutrition guidance designed for perimenopause / menopause",
  "Weekly live group sessions",
  "Private community access",
  "On-demand content library",
  "Direct messaging access to Adam and Laura",
];

export default function EnergizeEmpowerPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-bg min-h-screen">
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] translate-x-1/3 -translate-y-1/4 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,169,110,0.1) 0%, transparent 70%)", filter: "blur(100px)" }} aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-16 items-center">
              <div>
                <FadeIn className="mb-5">
                  <Badge variant="gold">FLAGSHIP PROGRAM</Badge>
                </FadeIn>
                <FadeUp delay={0.05}>
                  <h1 className="font-display font-semibold text-display text-gray-text leading-[1.05] mb-5">
                    Energize &amp;<br />Empower Her
                  </h1>
                </FadeUp>
                <FadeUp delay={0.15}>
                  <p className="font-body text-lead text-gray-text-2 leading-relaxed mb-4">
                    The only program that addresses your hormones and your habits together — because you can&apos;t separate them.
                  </p>
                  <p className="font-body text-base text-gray-text-2 leading-relaxed mb-8">
                    Co-created by Coach Adam Gray and Laura Brown, NP (Board-Certified Women&apos;s Health Nurse Practitioner), Energize &amp; Empower Her was built specifically for women navigating perimenopause and menopause who are done being told their labs are &ldquo;normal.&rdquo;
                  </p>
                </FadeUp>
                <FadeIn delay={0.25}>
                  <Button href="/contact" variant="gold" size="lg">Join the Waitlist</Button>
                  <p className="font-mono text-xs text-gray-muted mt-3">New cohorts open periodically · Spots are limited</p>
                </FadeIn>
              </div>
              <SlideIn direction="right" delay={0.15} className="hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]" style={{ boxShadow: "0 0 0 1px rgba(200,169,110,0.12), 0 32px 80px rgba(0,0,0,0.5)" }}>
                  <PhotoPlaceholder photoKey="eehHero" sizes="(max-width: 1280px) 45vw, 500px" />
                </div>
              </SlideIn>
            </div>
          </div>
        </section>

        <Divider />

        <section className="py-24 lg:py-32 bg-gray-bg-2">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="mb-12">
              <p className="font-mono text-xs text-gray-muted tracking-[0.2em] uppercase mb-2">Built on two pillars</p>
              <h2 className="font-display font-semibold text-title-xl text-gray-text max-w-xl">Hormonal health meets fitness coaching</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillars.map((p, i) => (
                <FadeUp key={p.lead} delay={i * 0.1}>
                  <div className={`p-8 rounded-xl h-full border ${i === 0 ? "bg-gold/5 border-gold/20" : "bg-gray-elevated border-white/5"}`}>
                    <p className={`font-display font-semibold text-title-md mb-3 ${i === 0 ? "text-gold" : "text-gray-text"}`}>{p.lead}</p>
                    <p className="font-body text-sm text-gray-text-2 leading-relaxed">{p.body}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        <section className="py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <FadeIn className="mb-10"><h2 className="font-display font-semibold text-title-xl text-gray-text">What&apos;s included</h2></FadeIn>
            <StaggerContainer className="space-y-3" staggerDelay={0.06}>
              {included.map((item) => (
                <StaggerItem key={item} variants={staggerItemVariants}>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-elevated border border-white/5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold flex-shrink-0" stroke="currentColor" strokeWidth="1.5"><polyline points="3 8 6.5 11.5 13 5" /></svg>
                    <p className="font-body text-sm text-gray-text-2">{item}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <Divider />

        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <FadeIn>
              <h2 className="font-display font-semibold text-title-xl text-gray-text mb-4">Join the next cohort</h2>
              <p className="font-body text-lead text-gray-text-2 mb-8">New cohorts open periodically. Join the waitlist and Adam will reach out personally when the next one opens — and tell you honestly if it&apos;s the right fit for where you are.</p>
              <Button href="/contact" variant="gold" size="lg">Join the Waitlist</Button>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
