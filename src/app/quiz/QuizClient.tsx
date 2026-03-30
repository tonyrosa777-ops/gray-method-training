"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";

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
  { value: "consistency", emoji: "⚡", label: "I cannot stay consistent" },
  { value: "energy", emoji: "🪫", label: "I feel drained all the time" },
  { value: "strength", emoji: "🏋️", label: "I want to feel stronger" },
  { value: "confidence", emoji: "✨", label: "I want my confidence back" },
  { value: "fat-loss", emoji: "📉", label: "I am stuck on body fat" },
  { value: "stress", emoji: "🧠", label: "Stress keeps knocking me off track" },
];

const goalOptions: GoalOption[] = [
  { value: "lose-weight", emoji: "🔥", label: "Lose weight without burnout" },
  { value: "build-muscle", emoji: "💪", label: "Build strength and shape" },
  { value: "better-habits", emoji: "🧭", label: "Build habits that actually stick" },
  { value: "feel-better", emoji: "🌿", label: "Feel better in my body day to day" },
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
      <motion.div
        className="h-full rounded-full bg-gold"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}

export default function QuizClient() {
  const [step, setStep] = useState(0);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 3;
  const isIntro = step === 0;
  const isComplete = step === totalSteps + 1;

  const canContinueStep1 = selectedProblems.length > 0;
  const canContinueStep2 = selectedGoal !== null;
  const canSubmit =
    form.name.trim().length > 0 &&
    form.email.trim().length > 0 &&
    form.message.trim().length > 0;

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

  function handleStart() {
    setStep(1);
  }

  function toggleProblem(value: string) {
    setSelectedProblems((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  function handleNext() {
    setStep((current) => Math.min(current + 1, totalSteps));
  }

  function handleBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitted(true);
    setStep(totalSteps + 1);
  }

  function handleRestart() {
    setStep(0);
    setSelectedProblems([]);
    setSelectedGoal(null);
    setForm({
      name: "",
      email: "",
      message: "",
    });
    setIsSubmitted(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {isIntro && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <FadeIn>
                <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                  3-step intake
                </p>
              </FadeIn>
              <h1 className="mb-5 font-display text-display font-semibold leading-[1.05] text-gray-text">
                Let&apos;s start with what
                <br />
                you actually need.
              </h1>
              <p className="mb-3 max-w-lg font-body text-lead leading-relaxed text-gray-text-2">
                A quick 3-step form to help us understand your biggest problems,
                your main goal, and the message you want to send.
              </p>
              <ul className="mb-10 max-w-lg space-y-2">
                {introBullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="font-body text-sm leading-relaxed text-gray-muted"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
              <Button onClick={handleStart} variant="gold" size="lg">
                Start the form
              </Button>
              <p className="mt-4 font-mono text-xs text-gray-muted">
                Takes about 60 seconds - no pressure
              </p>
            </motion.div>
          )}

          {!isIntro && !isComplete && (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-mono text-xs tracking-wider text-gray-muted">
                    Step {step} of {totalSteps}
                  </p>
                  <p className="font-mono text-xs text-gold">
                    {step === 1 && "01"}
                    {step === 2 && "02"}
                    {step === 3 && "03"}
                  </p>
                </div>
                <ProgressBar current={step - 1} total={totalSteps} />
              </div>

              {step === 1 && (
                <>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                    Step one
                  </p>
                  <h2 className="mb-3 font-display text-title-xl font-semibold leading-snug text-gray-text">
                    What are your biggest problems?
                  </h2>
                  <p className="mb-8 font-body text-sm leading-relaxed text-gray-muted">
                    Pick all that apply. We&apos;ll use this to understand what
                    is getting in the way.
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
                            "bg-gray-elevated/50 font-body text-sm leading-relaxed",
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
                      onClick={handleBack}
                      className="font-body text-sm text-gray-muted transition-colors duration-200 hover:text-gray-text disabled:cursor-not-allowed disabled:opacity-30"
                      disabled={step <= 0}
                    >
                      Back
                    </button>
                    <Button
                      onClick={handleNext}
                      variant="gold"
                      size="md"
                      disabled={!canContinueStep1}
                    >
                      Continue →
                    </Button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                    Step two
                  </p>
                  <h2 className="mb-3 font-display text-title-xl font-semibold leading-snug text-gray-text">
                    What is your main goal?
                  </h2>
                  <p className="mb-8 font-body text-sm leading-relaxed text-gray-muted">
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
                            "bg-gray-elevated/50 font-body text-sm leading-relaxed",
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
                      onClick={handleBack}
                      className="font-body text-sm text-gray-muted transition-colors duration-200 hover:text-gray-text"
                    >
                      Back
                    </button>
                    <Button
                      onClick={handleNext}
                      variant="gold"
                      size="md"
                      disabled={!canContinueStep2}
                    >
                      Continue →
                    </Button>
                  </div>
                </>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit}>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                    Step three
                  </p>
                  <h2 className="mb-3 font-display text-title-xl font-semibold leading-snug text-gray-text">
                    Send a message
                  </h2>
                  <p className="mb-6 font-body text-sm leading-relaxed text-gray-muted">
                    Share your details and a short note. We&apos;ll take it from
                    there.
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
                    <label className="block">
                      <span className="mb-2 block font-body text-sm text-gray-text-2">
                        Name
                      </span>
                      <input
                        value={form.name}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, name: event.target.value }))
                        }
                        className="w-full rounded-xl border border-white/10 bg-gray-elevated/60 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors duration-200 placeholder:text-gray-muted focus:border-gold"
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block font-body text-sm text-gray-text-2">
                        Email
                      </span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, email: event.target.value }))
                        }
                        className="w-full rounded-xl border border-white/10 bg-gray-elevated/60 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors duration-200 placeholder:text-gray-muted focus:border-gold"
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block font-body text-sm text-gray-text-2">
                        Message
                      </span>
                      <textarea
                        value={form.message}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, message: event.target.value }))
                        }
                        className="min-h-32 w-full rounded-xl border border-white/10 bg-gray-elevated/60 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors duration-200 placeholder:text-gray-muted focus:border-gold"
                        placeholder="Tell us what you want help with..."
                      />
                    </label>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="font-body text-sm text-gray-muted transition-colors duration-200 hover:text-gray-text"
                    >
                      Back
                    </button>
                    <Button type="submit" variant="gold" size="md" disabled={!canSubmit}>
                      Send message →
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {isComplete && isSubmitted && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                Message sent
              </p>
              <h2 className="mb-5 font-display text-title-xl font-semibold leading-snug text-gray-text">
                Thanks - we have what we need.
              </h2>
              <p className="mb-10 max-w-lg font-body text-base leading-relaxed text-gray-text-2">
                Your intake is in. We&apos;ll review your note and respond with
                the next best step.
              </p>

              <div className="mb-8 space-y-3">
                <p className="font-body text-sm text-gray-muted">What you shared</p>
                <div className="flex flex-wrap gap-2">
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
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button href="/contact" variant="gold" size="lg">
                  Go to contact page
                </Button>
                <Button onClick={handleRestart} variant="ghost" size="lg">
                  Start over
                </Button>
              </div>

              <p className="mt-10 font-mono text-xs text-gray-muted">
                If you want to keep going right now, the contact page is ready.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
