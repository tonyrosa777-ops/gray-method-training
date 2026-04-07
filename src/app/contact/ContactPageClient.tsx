"use client";

import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "@/components/layout";
import Button from "@/components/ui/Button";
import CalendlyEmbed from "@/components/ui/CalendlyEmbed";
import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Phone number is required"),
  message: z.string().min(10, "Tell Adam a bit more - at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

type ProblemOption = { value: string; emoji: string; label: string };
type GoalOption = { value: string; emoji: string; label: string };

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
  { value: "not-sure", emoji: "💬", label: "Not sure yet — want to talk it through" },
];

const introBullets = [
  "Takes about 60 seconds to fill out",
  "Ends with the option to pick a time that works for you",
  "No commitment. No sales pitch.",
];

// ---------------------------------------------------------------------------
// ProgressBar
// ---------------------------------------------------------------------------
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
        className="h-full rounded-full bg-gold transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// SelectedTagsBar — reused across steps 3 & 4
// ---------------------------------------------------------------------------
function SelectedTagsBar({
  problemLabels,
  goalLabel,
}: {
  problemLabels: string[];
  goalLabel: string;
}) {
  if (problemLabels.length === 0 && !goalLabel) return null;
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {problemLabels.map((label) => (
        <span
          key={label}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-text-2"
        >
          {label}
        </span>
      ))}
      {goalLabel && (
        <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
          Goal: {goalLabel}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ContactForm — main multi-step form
// ---------------------------------------------------------------------------
function ContactForm() {
  const [apiStatus, setApiStatus] = useState<"idle" | "loading" | "error">("idle");
  const [successKind, setSuccessKind] = useState<"message" | "booked" | null>(null);
  const [step, setStep] = useState(0);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [savedFormData, setSavedFormData] = useState<FormData | null>(null);

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const selectedProblemLabels = useMemo(
    () =>
      problemOptions
        .filter((o) => selectedProblems.includes(o.value))
        .map((o) => o.label),
    [selectedProblems]
  );

  const selectedGoalLabel = useMemo(
    () => goalOptions.find((o) => o.value === selectedGoal)?.label ?? "",
    [selectedGoal]
  );

  const canContinueStep1 = selectedProblems.length > 0;
  const canContinueStep2 = selectedGoal !== null;

  // ---- shared API call ----
  async function submitToApi(data: FormData, booked: boolean) {
    setApiStatus("loading");
    const summaryParts = [
      selectedProblemLabels.length > 0
        ? `Biggest problems: ${selectedProblemLabels.join(", ")}`
        : null,
      selectedGoalLabel ? `Main goal: ${selectedGoalLabel}` : null,
      booked ? "Action taken: Booked a consultation call via Calendly" : null,
    ].filter(Boolean);

    const message =
      summaryParts.length > 0
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
      if (res.ok) {
        setSuccessKind(booked ? "booked" : "message");
      } else {
        setApiStatus("error");
      }
    } catch {
      setApiStatus("error");
    }
  }

  // ---- step 3: validate then advance to step 4 ----
  async function handleAdvanceToBooking() {
    const valid = await trigger(["name", "email", "phone", "message"]);
    if (valid) {
      setSavedFormData(getValues());
      setStep(4);
    }
  }

  // ---- step 4: skip booking, just send message ----
  async function handleSkip() {
    const data = savedFormData ?? getValues();
    await submitToApi(data, false);
  }

  // ---- step 4: Calendly booking complete ----
  const handleBooked = useCallback(async () => {
    const data = savedFormData ?? getValues();
    await submitToApi(data, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedFormData]);

  function handleRestart() {
    setStep(0);
    setSelectedProblems([]);
    setSelectedGoal(null);
    setSavedFormData(null);
    reset();
    setApiStatus("idle");
    setSuccessKind(null);
  }

  function toggleProblem(value: string) {
    setSelectedProblems((cur) =>
      cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]
    );
  }

  // ---- success states ----
  if (successKind === "booked") {
    return (
      <div className="rounded-2xl border border-white/5 bg-gray-elevated p-8 text-center shadow-card lg:p-10">
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10"
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200,169,110,0.9)" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
            <polyline points="9 16 11 18 15 14" />
          </svg>
        </div>
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-gold">
          Call booked
        </p>
        <h3 className="mb-3 font-display text-title-md font-semibold text-gray-text">
          You&apos;re on the calendar.
        </h3>
        <p className="font-body text-sm leading-relaxed text-gray-text-2">
          Check your email for the confirmation. Adam will show up ready — he&apos;ll already know your situation.
        </p>
        <div className="mt-6 flex justify-center">
          <Button onClick={handleRestart} variant="ghost" size="sm">
            Done
          </Button>
        </div>
      </div>
    );
  }

  if (successKind === "message") {
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
          Adam personally reads every message. You&apos;ll hear back within 24 hours — usually much sooner.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={handleRestart} variant="ghost" size="sm">
            Send another
          </Button>
        </div>
      </div>
    );
  }

  // ---- step display helpers ----
  const displayStep = step === 0 ? 1 : step;
  const stepLabels: Record<number, string> = { 1: "01", 2: "02", 3: "03", 4: "04" };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/5 bg-gray-elevated shadow-card">
        {/* Progress header — hidden on intro and calendar step */}
        {step > 0 && step < 4 && (
          <div className="px-6 pt-6 pb-0 lg:px-8 lg:pt-8">
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-mono text-xs tracking-wider text-gray-muted">
                  Step {displayStep} of 3
                </p>
                <p className="font-mono text-xs text-gold">{stepLabels[displayStep]}</p>
              </div>
              <ProgressBar current={displayStep - 1} total={3} />
            </div>
          </div>
        )}

        {/* Calendar step gets its own slim header */}
        {step === 4 && (
          <div className="px-6 pt-6 pb-0 lg:px-8 lg:pt-8">
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-mono text-xs tracking-wider text-gray-muted">
                  Final step
                </p>
                <p className="font-mono text-xs text-gold">04</p>
              </div>
              <ProgressBar current={3} total={4} />
            </div>
          </div>
        )}

        <div className={step === 4 ? "px-6 pb-0 pt-8 lg:px-8 lg:pt-10" : "px-6 pb-6 pt-8 lg:px-8 lg:pb-8 lg:pt-10"}>

          {/* ── Step 0: Intro ── */}
          {step === 0 && (
            <div>
              <FadeIn>
                <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                  Free consultation
                </p>
              </FadeIn>
              <FadeUp delay={0.05}>
                <h2 className="mb-4 font-display text-title-md font-semibold leading-tight text-gray-text">
                  A quick form. Then pick a time.
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="mb-6 max-w-lg font-body text-sm leading-relaxed text-gray-text-2">
                  Tell Adam what you&apos;re dealing with, then book a free 20-minute call — or just send a message. Either works.
                </p>
              </FadeUp>
              <ul className="mb-8 space-y-2">
                {introBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 font-body text-sm leading-relaxed text-gray-muted">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold/60" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <Button onClick={() => setStep(1)} variant="gold" size="lg">
                Start
              </Button>
              <p className="mt-4 font-mono text-xs text-gray-muted">
                Takes about 60 seconds
              </p>
            </div>
          )}

          {/* ── Step 1: Problems ── */}
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
                      <span className="mb-2 block text-lg" aria-hidden="true">{option.emoji}</span>
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
                <Button onClick={() => setStep(2)} variant="gold" size="md" disabled={!canContinueStep1}>
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 2: Goals ── */}
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
                      <span className="mb-2 block text-lg" aria-hidden="true">{option.emoji}</span>
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
                <Button onClick={() => setStep(3)} variant="gold" size="md" disabled={!canContinueStep2}>
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 3: Details ── */}
          {step === 3 && (
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                Step three
              </p>
              <h2 className="mb-3 font-display text-title-md font-semibold leading-snug text-gray-text">
                Tell Adam about yourself
              </h2>
              <p className="mb-6 font-body text-sm leading-relaxed text-gray-muted">
                Share your details and a short note. Then you&apos;ll pick a time.
              </p>

              <SelectedTagsBar problemLabels={selectedProblemLabels} goalLabel={selectedGoalLabel} />

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
                    {errors.name && (
                      <p className="mt-1.5 font-mono text-xs text-orange-accent">{errors.name.message}</p>
                    )}
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
                    {errors.email && (
                      <p className="mt-1.5 font-mono text-xs text-orange-accent">{errors.email.message}</p>
                    )}
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
                    Phone <span className="text-gold">*</span>
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    {...register("phone")}
                    className="w-full rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
                    placeholder="(603) 555-0100"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 font-mono text-xs text-orange-accent">{errors.phone.message}</p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
                    Tell Adam a bit about yourself <span className="text-gold">*</span>
                  </span>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    className="w-full resize-none rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
                    placeholder="Where are you right now, what have you tried, what feels stuck?"
                  />
                  {errors.message && (
                    <p className="mt-1.5 font-mono text-xs text-orange-accent">{errors.message.message}</p>
                  )}
                </label>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="font-body text-sm text-gray-muted transition-colors duration-200 hover:text-gray-text"
                >
                  Back
                </button>
                <Button
                  type="button"
                  variant="gold"
                  size="md"
                  onClick={handleAdvanceToBooking}
                >
                  Pick a time →
                </Button>
              </div>

              <p className="mt-5 text-center font-mono text-xs text-gray-muted">
                No commitment · No sales pitch · Adam reads every message personally
              </p>
            </div>
          )}

          {/* ── Step 4: Calendar ── */}
          {step === 4 && (
            <div>
              <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                Book your consultation
              </p>
              <h2 className="mb-1 font-display text-title-md font-semibold leading-snug text-gray-text">
                Pick a time that works.
              </h2>
              <p className="mb-4 font-body text-sm leading-relaxed text-gray-muted">
                Free · 20 minutes · No sales pitch.
              </p>

              <SelectedTagsBar problemLabels={selectedProblemLabels} goalLabel={selectedGoalLabel} />

              {/* Calendly inline embed */}
              <div className="overflow-hidden rounded-xl border border-white/8">
                <CalendlyEmbed
                  name={savedFormData?.name ?? ""}
                  email={savedFormData?.email ?? ""}
                  onBooked={handleBooked}
                />
              </div>

              {/* Skip + error */}
              <div className="flex flex-col items-center gap-3 px-2 py-5">
                <button
                  type="button"
                  onClick={handleSkip}
                  disabled={apiStatus === "loading"}
                  className="font-body text-sm text-gray-muted underline-offset-2 transition-colors duration-200 hover:text-gray-text hover:underline disabled:opacity-50"
                >
                  {apiStatus === "loading" ? "Sending..." : "Skip — just send my message"}
                </button>
                {apiStatus === "error" && (
                  <p className="text-center font-body text-xs text-orange-accent">
                    Something went wrong. Email Adam directly at{" "}
                    <a href="mailto:Graymethodtraining@gmail.com" className="underline">
                      Graymethodtraining@gmail.com
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
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
                  A free 20-minute call with Adam. Not a sales pitch — just an honest conversation about where you are and what might actually help.
                </p>
              </FadeUp>

              <FadeIn delay={0.2} className="space-y-4">
                {[
                  {
                    title: "He listens first.",
                    body: "Adam will ask about your history, your schedule, and what you've already tried. He won't assume.",
                  },
                  {
                    title: "No pressure, ever.",
                    body: "If coaching isn't the right fit, he'll tell you. He'd rather give you honest advice than make a sale.",
                  },
                  {
                    title: "Fast response.",
                    body: "Adam personally reads every message. You'll hear back within 24 hours — usually same day.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-xl border border-white/5 bg-gray-elevated p-5"
                  >
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
                  <a
                    href="mailto:Graymethodtraining@gmail.com"
                    className="group flex items-center gap-3 font-body text-sm text-gray-text-2 transition-colors duration-200 hover:text-gold"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold/50 transition-colors group-hover:text-gold">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Graymethodtraining@gmail.com
                  </a>
                  <a
                    href="tel:6033407281"
                    className="group flex items-center gap-3 font-body text-sm text-gray-text-2 transition-colors duration-200 hover:text-gold"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold/50 transition-colors group-hover:text-gold">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    (603) 340-7281
                  </a>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.15}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </main>
    </>
  );
}
