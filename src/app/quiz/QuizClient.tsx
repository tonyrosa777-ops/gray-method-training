"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/animations/FadeUp";
import FadeIn from "@/components/animations/FadeIn";

/* ---- Quiz data ------------------------------------------------ */

type Option = {
  id: string;
  label: string;
  value: string;
};

type Question = {
  id: string;
  number: string;
  question: string;
  subtext?: string;
  options: Option[];
};

const questions: Question[] = [
  {
    id: "situation",
    number: "01",
    question: "Which of these sounds most like where you are right now?",
    subtext: "Pick the one that lands closest.",
    options: [
      { id: "a", label: "I've tried a lot of things. Nothing has stuck.", value: "diet-cycler" },
      { id: "b", label: "I'm always putting everyone else first. I've lost myself in the process.", value: "caregiver" },
      { id: "c", label: "My doctor says everything is normal. But I know something is off.", value: "dismissed" },
      { id: "d", label: "I know what to do — I just can't seem to do it consistently.", value: "consistency" },
      { id: "e", label: "I'm starting over after an injury, a relationship, or a hard chapter.", value: "restart" },
    ],
  },
  {
    id: "goal",
    number: "02",
    question: "What does success actually look like to you?",
    subtext: "Not the \"right\" answer — the honest one.",
    options: [
      { id: "a", label: "More energy. I'm exhausted all the time and I'm done with it.", value: "energy" },
      { id: "b", label: "Feeling stronger — physically and mentally.", value: "strength" },
      { id: "c", label: "Breaking the cycle. I'm tired of starting over.", value: "cycle" },
      { id: "d", label: "Understanding my body again. Especially around hormones and midlife.", value: "hormones" },
      { id: "e", label: "Confidence. I want to feel like myself again.", value: "confidence" },
    ],
  },
  {
    id: "time",
    number: "03",
    question: "How much time do you realistically have to work on your health each week?",
    subtext: "Be honest — not aspirational.",
    options: [
      { id: "a", label: "Under 2 hours. Life is full.", value: "minimal" },
      { id: "b", label: "2–4 hours. I can carve it out if the plan actually fits.", value: "moderate" },
      { id: "c", label: "4+ hours. I'm ready to commit.", value: "substantial" },
      { id: "d", label: "It varies a lot week to week — I need flexibility.", value: "variable" },
    ],
  },
  {
    id: "history",
    number: "04",
    question: "What's the biggest reason previous attempts didn't work?",
    options: [
      { id: "a", label: "The program was too rigid. Real life got in the way.", value: "rigid" },
      { id: "b", label: "I had no accountability. I'd fall off and there was no one to notice.", value: "accountability" },
      { id: "c", label: "I was doing too much too fast and burned out.", value: "burnout" },
      { id: "d", label: "I felt like the advice wasn't built for me — it was generic.", value: "generic" },
      { id: "e", label: "Honestly? I'm not sure. That's part of why I'm here.", value: "unsure" },
    ],
  },
  {
    id: "support",
    number: "05",
    question: "What kind of support sounds most helpful to you?",
    options: [
      { id: "a", label: "One-on-one. I want Adam focused on me specifically.", value: "one-on-one" },
      { id: "b", label: "A community of women in similar situations, plus personal coaching.", value: "group" },
      { id: "c", label: "Both physical coaching AND hormonal support — especially around menopause or perimenopause.", value: "eeh" },
      { id: "d", label: "I'm not sure. I just want to talk to someone who will actually listen.", value: "call" },
    ],
  },
];

/* ---- Result logic --------------------------------------------- */

type ResultKey = "one-on-one" | "eeh" | "group" | "call";

type Result = {
  key: ResultKey;
  headline: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  note: string;
};

const results: Record<ResultKey, Result> = {
  "one-on-one": {
    key: "one-on-one",
    headline: "1:1 Online Coaching sounds like your fit.",
    body: "You want something built around your actual life — not a template with your name on it. Adam builds every 1:1 client a plan from scratch: your equipment, your schedule, your history, your goals. No two programs look the same.",
    primaryCta: { label: "Schedule a Free 20-Minute Call", href: "/contact" },
    secondaryCta: { label: "Learn more about 1:1 Coaching", href: "/programs/one-on-one" },
    note: "The call is free. No pitch. Just an honest conversation.",
  },
  eeh: {
    key: "eeh",
    headline: "Energize & Empower Her was built for where you are.",
    body: "You're not imagining it. And you're not broken. Energize & Empower Her pairs Adam's coaching with Laura Brown, NP — a Board-Certified Women's Health Nurse Practitioner. The hormonal side and the fitness side, addressed together. The only program like it.",
    primaryCta: { label: "Join the Waitlist", href: "/programs/energize-empower" },
    secondaryCta: { label: "Schedule a free call first", href: "/contact" },
    note: "Cohort spots are limited. Waitlist is open now.",
  },
  group: {
    key: "group",
    headline: "Group Coaching might be exactly what you need.",
    body: "Personalized support inside a small group of women who get it. Adam keeps group sizes small so the coaching stays real — not a one-size-fits-all template with a group chat attached.",
    primaryCta: { label: "Schedule a Free Call", href: "/contact" },
    secondaryCta: { label: "Learn more about Group Coaching", href: "/programs/group" },
    note: "Limited spots. The community matters as much as the program.",
  },
  call: {
    key: "call",
    headline: "Start with a conversation.",
    body: "You don't need to have it figured out. A free 20-minute call with Adam — no sales pressure, no pitch, just an honest conversation about where you are and whether he can actually help. He'll tell you straight.",
    primaryCta: { label: "Schedule Your Free 20-Minute Call", href: "/contact" },
    note: "No commitment. No pressure. Honest advice.",
  },
};

function getResult(answers: Record<string, string>): ResultKey {
  const { situation, goal, support } = answers;

  // EEH signal: dismissed by doctors OR hormones goal OR eeh support
  if (
    situation === "dismissed" ||
    goal === "hormones" ||
    support === "eeh"
  ) {
    return "eeh";
  }

  // Direct call signal
  if (support === "call" && !situation && !goal) {
    return "call";
  }

  // Group signal
  if (support === "group") {
    return "group";
  }

  // Default to 1:1 for most profiles
  return "one-on-one";
}

/* ---- Progress bar --------------------------------------------- */

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        className="h-full bg-gold rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}

/* ---- Main component ------------------------------------------- */

export default function QuizClient() {
  const [step, setStep] = useState<number>(0); // 0 = intro, 1..n = questions, n+1 = result
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const totalSteps = questions.length;
  const isIntro = step === 0;
  const isResult = step === totalSteps + 1;
  const questionIndex = step - 1;
  const currentQuestion = !isIntro && !isResult ? questions[questionIndex] : null;

  const resultKey = isResult ? getResult(answers) : null;
  const result = resultKey ? results[resultKey] : null;

  function handleStart() {
    setStep(1);
    setSelected(null);
  }

  function handleSelect(value: string) {
    setSelected(value);
  }

  function handleNext() {
    if (!currentQuestion || !selected) return;
    const newAnswers = { ...answers, [currentQuestion.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    setStep((s) => s + 1);
  }

  function handleBack() {
    if (step <= 1) return;
    const prevQuestion = questions[step - 2];
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[prevQuestion?.id];
      return next;
    });
    setSelected(answers[questions[step - 2]?.id] ?? null);
    setStep((s) => s - 1);
  }

  function handleRestart() {
    setStep(0);
    setAnswers({});
    setSelected(null);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-2xl">

        <AnimatePresence mode="wait">

          {/* ---- Intro ---- */}
          {isIntro && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            >
              <FadeIn>
                <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-5">
                  2-minute quiz
                </p>
              </FadeIn>
              <h1 className="font-display font-semibold text-display text-gray-text leading-[1.05] mb-5">
                Find out what&apos;s actually<br />keeping you stuck.
              </h1>
              <p className="font-body text-lead text-gray-text-2 mb-3 leading-relaxed max-w-lg">
                5 honest questions. No generic advice. Just a real picture of where you are — and which program actually fits your life.
              </p>
              <p className="font-body text-sm text-gray-muted mb-10 leading-relaxed max-w-lg">
                There are no wrong answers. Coach Adam built this to understand you, not judge you.
              </p>
              <Button onClick={handleStart} variant="gold" size="lg">
                Start the Quiz
              </Button>
              <p className="font-mono text-xs text-gray-muted mt-4">
                Takes about 2 minutes · No email required
              </p>
            </motion.div>
          )}

          {/* ---- Questions ---- */}
          {currentQuestion && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-xs text-gray-muted tracking-wider">
                    Question {questionIndex + 1} of {totalSteps}
                  </p>
                  <p className="font-mono text-xs text-gold">{currentQuestion.number}</p>
                </div>
                <ProgressBar current={questionIndex} total={totalSteps} />
              </div>

              {/* Question */}
              <h2 className="font-display font-semibold text-title-xl text-gray-text leading-snug mb-3">
                {currentQuestion.question}
              </h2>
              {currentQuestion.subtext && (
                <p className="font-body text-sm text-gray-muted mb-8 leading-relaxed">
                  {currentQuestion.subtext}
                </p>
              )}

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selected === opt.value;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.value)}
                      className={[
                        "w-full text-left px-6 py-4 rounded-xl border transition-all duration-200",
                        "font-body text-sm leading-relaxed",
                        isSelected
                          ? "border-gold bg-gray-elevated text-gray-text"
                          : "border-white/8 bg-gray-elevated/50 text-gray-text-2 hover:border-white/20 hover:bg-gray-elevated",
                      ].join(" ")}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={[
                            "w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all duration-200",
                            isSelected
                              ? "border-gold bg-gold"
                              : "border-white/20 bg-transparent",
                          ].join(" ")}
                          aria-hidden="true"
                        />
                        {opt.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={step <= 1}
                  className="font-body text-sm text-gray-muted hover:text-gray-text transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Back
                </button>
                <Button
                  onClick={handleNext}
                  variant="gold"
                  size="md"
                  disabled={!selected}
                >
                  {questionIndex === totalSteps - 1 ? "See my result" : "Next →"}
                </Button>
              </div>
            </motion.div>
          )}

          {/* ---- Result ---- */}
          {isResult && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            >
              <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-5">
                Your result
              </p>
              <h2 className="font-display font-semibold text-title-xl text-gray-text leading-snug mb-5">
                {result.headline}
              </h2>
              <p className="font-body text-base text-gray-text-2 leading-relaxed mb-10 max-w-lg">
                {result.body}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button href={result.primaryCta.href} variant="gold" size="lg">
                  {result.primaryCta.label}
                </Button>
                {result.secondaryCta && (
                  <Button href={result.secondaryCta.href} variant="ghost" size="lg">
                    {result.secondaryCta.label}
                  </Button>
                )}
              </div>

              <p className="font-mono text-xs text-gray-muted mb-10">
                {result.note}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-white/5 mb-8" aria-hidden="true" />

              {/* Not what you expected? */}
              <div className="space-y-3">
                <p className="font-body text-sm text-gray-muted">Not what you expected?</p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleRestart}
                    className="font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200"
                  >
                    Retake the quiz →
                  </button>
                  <span className="font-body text-sm text-gray-muted/40" aria-hidden="true">·</span>
                  <Link
                    href="/programs"
                    className="font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200"
                  >
                    See all programs →
                  </Link>
                  <span className="font-body text-sm text-gray-muted/40" aria-hidden="true">·</span>
                  <Link
                    href="/contact"
                    className="font-body text-sm text-gray-text-2 hover:text-gold transition-colors duration-200"
                  >
                    Just talk to Adam →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
