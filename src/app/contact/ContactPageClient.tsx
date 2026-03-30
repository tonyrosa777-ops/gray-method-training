"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "@/components/layout";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell Adam a bit more - at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

type ProblemOption = {
  value: string;
  emoji: string;
  label: string;
};

type GoalOption = {
  value: string;
  emoji: string;
  label: string;
};

const problemOptions: ProblemOption[] = [
  { value: "consistency", emoji: "âš¡", label: "I cannot stay consistent" },
  { value: "energy", emoji: "ðŸª«", label: "I feel drained all the time" },
  { value: "strength", emoji: "ðŸ‹ï¸", label: "I want to feel stronger" },
  { value: "confidence", emoji: "âœ¨", label: "I want my confidence back" },
  { value: "fat-loss", emoji: "ðŸ“‰", label: "I am stuck on body fat" },
  { value: "stress", emoji: "ðŸ§ ", label: "Stress keeps knocking me off track" },
];

const goalOptions: GoalOption[] = [
  { value: "lose-weight", emoji: "ðŸ”¥", label: "Lose weight without burnout" },
  { value: "build-muscle", emoji: "ðŸ’ª", label: "Build strength and shape" },
  { value: "better-habits", emoji: "ðŸ§­", label: "Build habits that actually stick" },
  { value: "feel-better", emoji: "ðŸŒ¿", label: "Feel better in my body day to day" },
  { value: "not-sure", emoji: "ðŸ’¬", label: "Not sure yet - want to talk it through" },
];

const introBullets = [
  "Fast, personal, and easy to finish",
  "Built to understand where you are right now",
  "Ends with a simple message step",
];

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100);

  return (
    <div
      className="h-0.5 w-full overflow-hidden rounded-full bg-white/5"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Step ${current + 1} of ${total}`}
    >
      <div
        className="h-full rounded-full bg-gold transition-[width] duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [step, setStep] = useState(0);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const selectedProblemLabels = useMemo(
    () =>
      problemOptions
        .filter((option) => selectedProblems.includes(option.value))
        .map((option) => option.label),
    [selectedProblems]
  );

  const selectedGoalLabel = useMemo(
    () => goalOptions.find((option) => option.value === selectedGoal)?.label ?? "",
    [selectedGoal]
  );

  const canContinueStep1 = selectedProblems.length > 0;
  const canContinueStep2 = selectedGoal !== null;

  const onSubmit = async (data: FormData) => {
    setStatus("loading");

    const summaryParts = [
      selectedProblemLabels.length > 0 ? `Biggest problems: ${selectedProblemLabels.join(", ")}` : null,
      selectedGoalLabel ? `Main goal: ${selectedGoalLabel}` : null,
    ].filter(Boolean);

    const message = summaryParts.length > 0
      ? `${summaryParts.join("\n")}\n\n${data.message}`
      : data.message;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          goal: selectedGoalLabel || undefined,
          message,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  function handleRestart() {
    setStep(0);
    setSelectedProblems([]);
    setSelectedGoal(null);
    reset();
    setStatus("idle");
  }

  function toggleProblem(value: string) {
    setSelectedProblems((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/5 bg-gray-elevated p-8 text-center shadow-card lg:p-10">
        <div
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 bg-gold/10"
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(200,169,110,0.9)" strokeWidth="1.5">
            <polyline points="4 10 8 14 16 6" />
          </svg>
        </div>
        <h3 className="mb-2 font-display text-title-md font-semibold text-gray-text">
          Message sent.
        </h3>
        <p className="font-body text-sm text-gray-text-2">
          Adam personally reads every message. You&apos;ll hear back within 24 hours - usually much sooner.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={handleRestart} variant="ghost" size="sm">
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/5 bg-gray-elevated p-6 shadow-card lg:p-8">
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-xs tracking-wider text-gray-muted">
              Step {Math.max(step, 1)} of 3
            </p>
            <p className="font-mono text-xs text-gold">
              {step === 0 && "01"}
              {step === 1 && "01"}
              {step === 2 && "02"}
              {step === 3 && "03"}
            </p>
          </div>
          <ProgressBar current={Math.max(step - 1, 0)} total={3} />
        </div>

        {step === 0 && (
          <div>
            <FadeIn>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                Free consultation
              </p>
            </FadeIn>
            <FadeUp delay={0.05}>
              <h2 className="mb-4 font-display text-title-md font-semibold leading-tight text-gray-text">
                Start with a quick 3-step form.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mb-6 max-w-lg font-body text-sm leading-relaxed text-gray-text-2">
                Pick your biggest problems, choose your main goal, and send a message. It keeps the page fast and personal without changing the Gray Method look.
              </p>
            </FadeUp>
            <ul className="mb-8 space-y-2">
              {introBullets.map((bullet) => (
                <li key={bullet} className="font-body text-sm leading-relaxed text-gray-muted">
                  {bullet}
                </li>
              ))}
            </ul>
            <Button onClick={() => setStep(1)} variant="gold" size="lg">
              Start the form
            </Button>
            <p className="mt-4 font-mono text-xs text-gray-muted">
              Takes about 60 seconds - no pressure
            </p>
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Step one
            </p>
            <h2 className="mb-3 font-display text-title-md font-semibold leading-snug text-gray-text">
              What are your biggest problems?
            </h2>
            <p className="mb-6 font-body text-sm leading-relaxed text-gray-muted">
              Pick all that apply.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {problemOptions.map((option) => {
                const isSelected = selectedProblems.includes(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleProblem(option.value)}
                    className={[
                      "rounded-xl border px-5 py-4 text-left transition-all duration-200",
                      "bg-gray-bg/35 font-body text-sm leading-relaxed",
                      isSelected
                        ? "border-gold bg-gray-elevated text-gray-text"
                        : "border-white/8 text-gray-text-2 hover:border-white/20 hover:bg-gray-elevated",
                    ].join(" ")}
                    aria-pressed={isSelected}
                  >
                    <span className="mb-2 block text-lg" aria-hidden="true">
                      {option.emoji}
                    </span>
                    <span className="block">{option.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={handleRestart}
                className="font-body text-sm text-gray-muted transition-colors duration-200 hover:text-gray-text"
              >
                Back
              </button>
              <Button
                onClick={() => setStep(2)}
                variant="gold"
                size="md"
                disabled={!canContinueStep1}
              >
                Continue â†’
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Step two
            </p>
            <h2 className="mb-3 font-display text-title-md font-semibold leading-snug text-gray-text">
              What is your main goal?
            </h2>
            <p className="mb-6 font-body text-sm leading-relaxed text-gray-muted">
              Choose the outcome that matters most right now.
            </p>
            <div className="space-y-3">
              {goalOptions.map((option) => {
                const isSelected = selectedGoal === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedGoal(option.value)}
                    className={[
                      "w-full rounded-xl border px-5 py-4 text-left transition-all duration-200",
                      "bg-gray-bg/35 font-body text-sm leading-relaxed",
                      isSelected
                        ? "border-gold bg-gray-elevated text-gray-text"
                        : "border-white/8 text-gray-text-2 hover:border-white/20 hover:bg-gray-elevated",
                    ].join(" ")}
                    aria-pressed={isSelected}
                  >
                    <span className="mb-2 block text-lg" aria-hidden="true">
                      {option.emoji}
                    </span>
                    <span className="block">{option.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="font-body text-sm text-gray-muted transition-colors duration-200 hover:text-gray-text"
              >
                Back
              </button>
              <Button
                onClick={() => setStep(3)}
                variant="gold"
                size="md"
                disabled={!canContinueStep2}
              >
                Continue â†’
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Step three
            </p>
            <h2 className="mb-3 font-display text-title-md font-semibold leading-snug text-gray-text">
              Send Adam a message
            </h2>
            <p className="mb-6 font-body text-sm leading-relaxed text-gray-muted">
              Share your details and a short note. We&apos;ll take it from there.
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
              {selectedProblemLabels.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-text-2"
                >
                  {label}
                </span>
              ))}
              {selectedGoalLabel && (
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                  Goal: {selectedGoalLabel}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
                    Name <span className="text-gold">*</span>
                  </span>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    {...register("name")}
                    className="w-full rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1.5 font-mono text-xs text-orange-accent">{errors.name.message}</p>}
                </label>
                <label className="block">
                  <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
                    Email <span className="text-gold">*</span>
                  </span>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className="w-full rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1.5 font-mono text-xs text-orange-accent">{errors.email.message}</p>}
                </label>
              </div>

              <div>
                <label className="block">
                  <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
                    Phone <span className="text-gray-muted">(optional)</span>
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    {...register("phone")}
                    className="w-full rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
                    placeholder="(603) 555-0100"
                  />
                </label>
              </div>

              <div>
                <label className="block">
                  <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
                    Tell Adam a bit about yourself <span className="text-gold">*</span>
                  </span>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className="w-full resize-none rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
                    placeholder="Where are you right now, what have you tried, what feels stuck?"
                  />
                  {errors.message && <p className="mt-1.5 font-mono text-xs text-orange-accent">{errors.message.message}</p>}
                </label>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="font-body text-sm text-gray-muted transition-colors duration-200 hover:text-gray-text"
              >
                Back
              </button>
              <Button type="submit" variant="gold" size="md" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send message â†’"}
              </Button>
            </div>

            {status === "error" && (
              <p className="mt-5 text-center font-body text-xs text-orange-accent">
                Something went wrong. Email Adam directly at{" "}
                <a href="mailto:Graymethodtraining@gmail.com" className="underline">
                  Graymethodtraining@gmail.com
                </a>
              </p>
            )}

            <p className="mt-5 text-center font-mono text-xs text-gray-muted">
              No commitment Â· No sales pitch Â· Adam reads every message personally
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactPageClient() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-bg pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[45fr_55fr]">
            <div className="lg:pt-4">
              <FadeIn>
                <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                  Get in touch
                </p>
              </FadeIn>
              <FadeUp delay={0.05}>
                <h1 className="mb-6 font-display text-display font-semibold leading-[1.05] text-gray-text">
                  Let&apos;s talk.
                </h1>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="mb-8 font-body text-lead leading-relaxed text-gray-text-2">
                  A free 20-minute call with Adam. Not a sales pitch - just an honest conversation about where you are and what might actually help.
                </p>
              </FadeUp>

              <FadeIn delay={0.2} className="space-y-4">
                {[
                  { title: "He listens first.", body: "Adam will ask about your history, your schedule, and what you&apos;ve already tried. He won&apos;t assume." },
                  { title: "No pressure, ever.", body: "If coaching isn&apos;t the right fit, he&apos;ll tell you. He&apos;d rather give you honest advice than make a sale." },
                  { title: "Fast response.", body: "Adam personally reads every message. You&apos;ll hear back within 24 hours - usually same day." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-xl border border-white/5 bg-gray-elevated p-5">
                    <div className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    <div>
                      <p className="font-body text-sm font-medium text-gray-text">{item.title}</p>
                      <p className="mt-0.5 font-body text-xs leading-relaxed text-gray-muted">{item.body}</p>
                    </div>
                  </div>
                ))}
              </FadeIn>

              <FadeIn delay={0.3} className="mt-8 border-t border-white/5 pt-8">
                <p className="mb-3 font-mono text-xs uppercase tracking-wide text-gray-muted">
                  Or reach Adam directly
                </p>
                <div className="space-y-2">
                  <a href="mailto:Graymethodtraining@gmail.com" className="group flex items-center gap-3 font-body text-sm text-gray-text-2 transition-colors duration-200 hover:text-gold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold/50 transition-colors group-hover:text-gold">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Graymethodtraining@gmail.com
                  </a>
                  <a href="tel:6033407281" className="group flex items-center gap-3 font-body text-sm text-gray-text-2 transition-colors duration-200 hover:text-gold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold/50 transition-colors group-hover:text-gold">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    (603) 340-7281
                  </a>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-white/5 bg-gray-elevated p-8 shadow-card lg:p-10">
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    </>
  );
}
