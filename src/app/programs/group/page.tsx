import type { Metadata } from "next";
import { Navbar } from "@/components/layout";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Divider from "@/components/ui/Divider";
import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { StaggerItem, staggerItemVariants } from "@/components/animations/StaggerContainer";

export const metadata: Metadata = {
  title: "Group Coaching",
  description:
    "Personalized group coaching for busy women. Custom training and nutrition coaching from Coach Adam Gray inside a supportive community of women who get it.",
};

const included = [
  { title: "Customized training plan", body: "Not a one-size-fits-all group workout. Adam writes your plan around your equipment, schedule, and goals — then adjusts it as you progress." },
  { title: "Nutrition guidance", body: "Practical, habit-based coaching. No meal plans, no restriction — just a sustainable approach to eating that works alongside your life." },
  { title: "Group check-ins", body: "Regular group calls with Coach Adam where you can ask questions, share progress, and get real feedback — not just from Adam, but from women in the same boat." },
  { title: "Private community", body: "A private group of women who are doing this alongside you. The accountability and support of peers who actually understand your situation." },
  { title: "Direct messaging access", body: "Reach Adam directly when something comes up. Not a ticket queue — actual access to your coach." },
];

const differentiators = [
  { q: "vs. 1:1 coaching", a: "More affordable. Community-supported. Still personalized — not a template." },
  { q: "vs. group fitness programs", a: "Your plan is custom. Adam knows your name, your history, your goals." },
  { q: "vs. doing it alone", a: "Accountability. Expertise. Women who understand what you&apos;re going through." },
];

export default function GroupCoachingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-bg min-h-screen">
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] -translate-x-1/3 translate-y-1/3 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} aria-hidden="true" />
          <div className="max-w-4xl mx-auto px-6">
            <FadeIn className="mb-4"><Badge variant="limited">LIMITED SPOTS</Badge></FadeIn>
            <FadeUp delay={0.05}>
              <h1 className="font-display font-semibold text-display text-gray-text leading-[1.05] mb-5">
                Group Coaching
              </h1>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="font-body text-lead text-gray-text-2 max-w-xl leading-relaxed mb-8">
                Personalized support inside a community of women who understand exactly what you&apos;re dealing with. More affordable than 1:1. More personal than anything else in this space.
              </p>
            </FadeUp>
            <FadeIn delay={0.25}>
              <Button href="/contact" variant="gold" size="lg">Get Started</Button>
              <p className="font-mono text-xs text-gray-muted mt-3">Spots are limited to keep quality high</p>
            </FadeIn>
          </div>
        </section>

        <Divider />

        <section className="py-24 lg:py-32 bg-gray-bg-2">
          <div className="max-w-4xl mx-auto px-6">
            <FadeIn className="mb-12"><h2 className="font-display font-semibold text-title-xl text-gray-text">What&apos;s included</h2></FadeIn>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5" staggerDelay={0.07}>
              {included.map((item) => (
                <StaggerItem key={item.title} variants={staggerItemVariants}>
                  <div className="p-6 rounded-xl bg-gray-elevated border border-white/5 h-full">
                    <h3 className="font-body font-medium text-gray-text text-sm mb-2">{item.title}</h3>
                    <p className="font-body text-xs text-gray-muted leading-relaxed">{item.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <Divider />

        <section className="py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <FadeIn className="mb-10"><h2 className="font-display font-semibold text-title-xl text-gray-text">How it compares</h2></FadeIn>
            <div className="space-y-4">
              {differentiators.map((item, i) => (
                <FadeUp key={item.q} delay={i * 0.08}>
                  <div className="flex items-start gap-6 p-6 rounded-xl bg-gray-elevated border border-white/5">
                    <p className="font-mono text-xs text-gold tracking-wide flex-shrink-0 pt-0.5 w-40">{item.q}</p>
                    <p className="font-body text-sm text-gray-text-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.a }} />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <FadeIn>
              <h2 className="font-display font-semibold text-title-xl text-gray-text mb-4">Reach out first.</h2>
              <p className="font-body text-lead text-gray-text-2 mb-8">Tell Adam what you&apos;re dealing with. A Gray Method team member will help figure out whether group coaching is right for where you are, or whether you&apos;d be better served by something else.</p>
              <Button href="/contact" variant="gold" size="lg">Tell Adam What&apos;s Going On</Button>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
