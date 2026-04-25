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
  phone: z.string().min(7, "Phone number is required"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type ProblemOption = { value: string; label: string };
type GoalOption = { value: string; label: string };

const problemOptions: ProblemOption[] = [
  { value: "consistency", label: "I cannot stay consistent" },
  { value: "energy", label: "I feel drained all the time" },
  { value: "strength", label: "I want to feel stronger" },
  { value: "confidence", label: "I want my confidence back" },
  { value: "fat-loss", label: "I am stuck on body fat" },
  { value: "stress", label: "Stress keeps knocking me off track" },
];

const goalOptions: GoalOption[] = [
  { value: "lose-weight", label: "Lose weight without burnout" },
  { value: "build-muscle", label: "Build strength and shape" },
  { value: "better-habits", label: "Build habits that actually stick" },
  { value: "feel-better", label: "Feel better in my body day to day" },
  { value: "not-sure", label: "Not sure yet" },
];

function ContactForm() {
  const [apiStatus, setApiStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

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

  function toggleProblem(value: string) {
    setSelectedProblems((cur) =>
      cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]
    );
  }

  async function onSubmit(data: FormData) {
    setApiStatus("loading");

    const summaryParts = [
      "Lead source: Simple contact form",
      selectedProblemLabels.length > 0
        ? `Biggest problems: ${selectedProblemLabels.join(", ")}`
        : null,
      selectedGoalLabel ? `Main goal: ${selectedGoalLabel}` : null,
    ].filter(Boolean);

    const message = [
      summaryParts.join("\n"),
      data.message?.trim() ? data.message.trim() : "No message provided.",
    ].join("\n\n");

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
          source: "Simple Contact Lead",
        }),
      });

      if (!res.ok) {
        setApiStatus("error");
        return;
      }

      setApiStatus("success");
      reset();
      setSelectedProblems([]);
      setSelectedGoal(null);
    } catch {
      setApiStatus("error");
    }
  }

  if (apiStatus === "success") {
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
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">
          You&apos;re in
        </p>
        <h3 className="mb-2 font-display text-title-md font-semibold text-gray-text">
          The Gray Method team has your info.
        </h3>
        <p className="font-body text-sm leading-relaxed text-gray-text-2">
          A Gray Method team member will reach out soon and help you take the next right step.
        </p>
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setApiStatus("idle")} variant="ghost" size="sm">
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-white/5 bg-gray-elevated p-6 shadow-card lg:p-8">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gold">
        Your next step
      </p>
      <h2 className="mb-3 font-display text-title-md font-semibold leading-tight text-gray-text">
        Let&apos;s find what actually fits.
      </h2>
      <p className="mb-7 font-body text-sm leading-relaxed text-gray-text-2">
        Share a little about your goals and what has been getting in the way. Adam or a Gray Method team member will take it from there.
      </p>

      <div className="space-y-6">
        <div>
          <p className="mb-3 font-body text-xs uppercase tracking-wide text-gray-text-2">
            What feels most true right now?
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {problemOptions.map((option) => {
              const isSelected = selectedProblems.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleProblem(option.value)}
                  className={[
                    "rounded-xl border px-4 py-3 text-left font-body text-sm leading-relaxed transition-all duration-200",
                    isSelected
                      ? "border-gold bg-gold/10 text-gray-text"
                      : "border-white/8 bg-gray-bg/35 text-gray-text-2 hover:border-white/20 hover:bg-gray-bg/60",
                  ].join(" ")}
                  aria-pressed={isSelected}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-3 font-body text-xs uppercase tracking-wide text-gray-text-2">
            Main goal
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {goalOptions.map((option) => {
              const isSelected = selectedGoal === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedGoal(option.value)}
                  className={[
                    "rounded-xl border px-4 py-3 text-left font-body text-sm leading-relaxed transition-all duration-200",
                    isSelected
                      ? "border-gold bg-gold/10 text-gray-text"
                      : "border-white/8 bg-gray-bg/35 text-gray-text-2 hover:border-white/20 hover:bg-gray-bg/60",
                  ].join(" ")}
                  aria-pressed={isSelected}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
              Name <span className="text-gold">*</span>
            </span>
            <input
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
              type="email"
              autoComplete="email"
              {...register("email")}
              className="w-full rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1.5 font-mono text-xs text-orange-accent">{errors.email.message}</p>}
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
            Phone <span className="text-gold">*</span>
          </span>
          <input
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className="w-full rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
            placeholder="Best number for a quick follow-up"
          />
          {errors.phone && <p className="mt-1.5 font-mono text-xs text-orange-accent">{errors.phone.message}</p>}
        </label>

        <label className="block">
          <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
            Anything Adam should know?
          </span>
          <textarea
            rows={5}
            {...register("message")}
            className="w-full resize-none rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
            placeholder="Where are you right now, what have you tried, what feels stuck?"
          />
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="gold" size="lg" disabled={apiStatus === "loading"}>
          {apiStatus === "loading" ? "Sending..." : "Start My Next Step"}
        </Button>
        <p className="font-mono text-xs leading-relaxed text-gray-muted">
          Private. Personal. No pressure.
        </p>
      </div>

      {apiStatus === "error" && (
        <p className="mt-5 font-body text-sm text-orange-accent">
          Something went wrong. Email Adam directly at{" "}
          <a href="mailto:coach_adam@graymethodtraining.com" className="underline">
            coach_adam@graymethodtraining.com
          </a>
          .
        </p>
      )}
    </form>
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
                  Get your plan started
                </p>
              </FadeIn>
              <FadeUp delay={0.05}>
                <h1 className="mb-6 font-display text-display font-semibold leading-[1.05] text-gray-text">
                  Start with what you&apos;re dealing with.
                </h1>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="mb-8 font-body text-lead leading-relaxed text-gray-text-2">
                  Tell Adam where you are right now: what feels stuck, what you&apos;ve tried, and what you want to feel different. A Gray Method team member will reach out and help you take the next right step.
                </p>
              </FadeUp>

              <FadeIn delay={0.2} className="space-y-4">
                {[
                  {
                    title: "Built around you.",
                    body: "Your history, schedule, equipment, and goals all matter. That is the whole point of the Gray Method.",
                  },
                  {
                    title: "Real support, no pressure.",
                    body: "You can say where you are honestly. Nobody is here to shame you or force a plan that does not fit.",
                  },
                  {
                    title: "Not sure what to say?",
                    body: "A sentence or two is enough. Start with what feels hardest right now.",
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
                <a
                  href="mailto:coach_adam@graymethodtraining.com"
                  className="group flex items-center gap-3 font-body text-sm text-gray-text-2 transition-colors duration-200 hover:text-gold"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold/50 transition-colors group-hover:text-gold">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  coach_adam@graymethodtraining.com
                </a>
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
