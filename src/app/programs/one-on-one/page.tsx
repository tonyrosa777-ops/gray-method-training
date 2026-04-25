import type { Metadata } from "next";
import { Navbar } from "@/components/layout";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";
import StaggerContainer, { StaggerItem, staggerItemVariants } from "@/components/animations/StaggerContainer";

export const metadata: Metadata = {
  title: "1:1 Online Coaching",
  description:
    "Fully personalized online fitness and nutrition coaching from Coach Adam Gray. Built around your schedule, equipment, and goals — not a template.",
};

const included = [
  { title: "Custom workout program", body: "Written specifically for your equipment, schedule, and current fitness level. Updated as you progress — not a static PDF." },
  { title: "Nutrition coaching", body: "No meal plans. No good-food/bad-food lists. We build an approach you can actually maintain — around your life, not in spite of it." },
  { title: "Weekly check-ins", body: "Every week, Adam reviews your progress, asks what's working, adjusts what isn't. Real accountability, not automated messages." },
  { title: "Video form reviews", body: "Send a video of any lift, any time. Adam watches it and gives specific feedback. Injury prevention and better results." },
  { title: "Direct messaging access", body: "Text Adam directly whenever something comes up. A question, a win, a rough day. He's actually there." },
  { title: "No contracts", body: "Month-to-month. If it's not working, you should be able to leave. Adam's retention rate speaks for itself." },
];

const whoItsFor = [
  "You want a plan built specifically for you — not a template with your name on it",
  "Your schedule is unpredictable and you need flexibility built into the plan",
  "You've been injured before and need someone who actually pays attention",
  "You've tried programs that worked for a while and then stopped",
  "You want someone to hold you accountable who actually knows your situation",
];

export default function OneOnOnePage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-bg min-h-screen">
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] -translate-x-1/3 translate-y-1/3 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(232,98,26,0.12) 0%, transparent 70%)", filter: "blur(80px)" }} aria-hidden="true" />
          <div className="max-w-4xl mx-auto px-6">
            <FadeIn><p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">1:1 Online Coaching</p></FadeIn>
            <FadeUp delay={0.05}>
              <h1 className="font-display font-semibold text-display text-gray-text leading-[1.05] mb-5">
                Your schedule.<br />Your equipment.<br />Your plan.
              </h1>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="font-body text-lead text-gray-text-2 max-w-xl mb-8 leading-relaxed">
                Adam doesn&apos;t use templates. Every 1:1 client gets a plan built from scratch around their actual life — not a generic program with their name at the top.
              </p>
            </FadeUp>
            <FadeIn delay={0.25}>
              <Button href="/contact" variant="gold" size="lg">Tell Adam What&apos;s Going On</Button>
              <p className="font-mono text-xs text-gray-muted mt-3">No commitment. No pitch. Just the right next step.</p>
            </FadeIn>
          </div>
        </section>

        <Divider />

        <section className="py-24 lg:py-32 bg-gray-bg-2">
          <div className="max-w-4xl mx-auto px-6">
            <FadeIn className="mb-12">
              <h2 className="font-display font-semibold text-title-xl text-gray-text">What&apos;s included</h2>
            </FadeIn>
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
            <FadeIn className="mb-10">
              <h2 className="font-display font-semibold text-title-xl text-gray-text">Who this is for</h2>
            </FadeIn>
            <StaggerContainer className="space-y-3" staggerDelay={0.06}>
              {whoItsFor.map((item) => (
                <StaggerItem key={item} variants={staggerItemVariants}>
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-elevated border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" aria-hidden="true" />
                    <p className="font-body text-sm text-gray-text-2 leading-relaxed">{item}</p>
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
              <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">Ready to start?</p>
              <h2 className="font-display font-semibold text-title-xl text-gray-text mb-4">Let&apos;s find out if it&apos;s a good fit.</h2>
              <p className="font-body text-lead text-gray-text-2 mb-8">Send a quick note about where you are. Adam&apos;s team will follow up, ask the right questions, and help figure out whether 1:1 coaching is right for you.</p>
              <Button href="/contact" variant="gold" size="lg">Get Started</Button>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
