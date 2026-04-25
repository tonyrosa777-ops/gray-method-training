"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QUIZ_QUESTIONS, QUIZ_RESULTS, scoreQuiz, type QuizType } from "@/data/quiz";
import Button from "@/components/ui/Button";

type Phase = "intro" | "question" | "results";

const TOTAL = QUIZ_QUESTIONS.length;

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div
      className="h-0.5 w-full overflow-hidden rounded-full bg-white/5"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full bg-gold"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}

function QuizLeadForm({
  resultType,
  answers,
}: {
  resultType: QuizType;
  answers: QuizType[];
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          resultType,
          answers,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mb-8 rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center">
        <div
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10"
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(201,168,76,0.9)" strokeWidth="1.5">
            <polyline points="4 10 8 14 16 6" />
          </svg>
        </div>
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-gold">
          You&apos;re in
        </p>
        <h3 className="mb-2 font-display text-title-md font-semibold text-gray-text">
          The Gray Method team has your quiz result.
        </h3>
        <p className="font-body text-sm leading-relaxed text-gray-text-2">
          A Gray Method team member will reach out with your answers in mind, so you do not have to start from zero.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-gold/20 bg-gold/5 p-6">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">
        Want help turning this into a plan?
      </p>
      <h3 className="mb-2 font-display text-title-md font-semibold text-gray-text">
        Send your result to Adam.
      </h3>
      <p className="mb-6 font-body text-sm leading-relaxed text-gray-text-2">
        Your answers give Adam a real starting point. Add your info here and a Gray Method team member can help you figure out what belongs next.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
            Name <span className="text-gold">*</span>
          </span>
          <input
            required
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((cur) => ({ ...cur, name: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
            Email <span className="text-gold">*</span>
          </span>
          <input
            required
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((cur) => ({ ...cur, email: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
          Phone <span className="text-gold">*</span>
        </span>
        <input
          required
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => setForm((cur) => ({ ...cur, phone: e.target.value }))}
          className="w-full rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
          placeholder="Best number for a quick follow-up"
        />
      </label>

      <label className="mt-4 block">
        <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
          Anything you want Adam to know?
        </span>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm((cur) => ({ ...cur, message: e.target.value }))}
          className="w-full resize-none rounded-xl border border-white/10 bg-gray-bg/35 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
          placeholder="What made this result feel accurate? What have you tried already?"
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="gold" size="md" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send My Result"}
        </Button>
        <p className="font-mono text-xs leading-relaxed text-gray-muted">
          Your result gives Adam a better starting point.
        </p>
      </div>

      {status === "error" && (
        <p className="mt-4 font-body text-sm text-orange-accent">
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

export default function QuizClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizType[]>([]);
  const [pendingAnswer, setPendingAnswer] = useState<QuizType | null>(null);
  const [direction, setDirection] = useState(1);
  const [resultType, setResultType] = useState<QuizType | null>(null);

  const existingAnswer: QuizType | null =
    phase === "question" && questionIndex < answers.length
      ? answers[questionIndex]
      : null;

  function handleSelectAnswer(type: QuizType) {
    if (pendingAnswer !== null) return;
    setPendingAnswer(type);

    setTimeout(() => {
      const newAnswers = [...answers.slice(0, questionIndex), type];
      setAnswers(newAnswers);
      setPendingAnswer(null);

      if (questionIndex < TOTAL - 1) {
        setDirection(1);
        setQuestionIndex((i) => i + 1);
      } else {
        setResultType(scoreQuiz(newAnswers));
        setPhase("results");
      }
    }, 400);
  }

  function handleBack() {
    if (phase === "question") {
      if (questionIndex > 0) {
        setDirection(-1);
        setQuestionIndex((i) => i - 1);
      } else {
        setPhase("intro");
      }
    }
  }

  function handleRetake() {
    setPhase("intro");
    setQuestionIndex(0);
    setAnswers([]);
    setPendingAnswer(null);
    setResultType(null);
    setDirection(1);
  }

  const result = resultType ? QUIZ_RESULTS[resultType] : null;
  const currentQuestion = phase === "question" ? QUIZ_QUESTIONS[questionIndex] : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-bg px-6 py-24">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait" initial={false}>
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                Find your fit
              </p>
              <h1 className="mb-5 font-display text-display font-semibold leading-[1.05] text-gray-text">
                What kind of client<br />are you?
              </h1>
              <p className="mb-8 max-w-lg font-body text-lead leading-relaxed text-gray-text-2">
                8 quick questions. Honest answers. You will get a result that maps to your actual situation and a recommendation for the kind of help that fits you right now.
              </p>
              <ul className="mb-10 space-y-2.5">
                {[
                  "Takes about 2 minutes",
                  "No wrong answers, just pick what is closest to true",
                  "See your result instantly, no email required",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5 font-body text-sm text-gray-muted">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold/60" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <Button onClick={() => setPhase("question")} variant="gold" size="lg">
                Start the quiz
              </Button>
              <p className="mt-4 font-mono text-xs text-gray-muted">
                8 questions. Results on screen immediately.
              </p>
            </motion.div>
          )}

          {phase === "question" && currentQuestion && (
            <motion.div
              key={`q-${questionIndex}`}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-10">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-mono text-xs tracking-wider text-gray-muted">
                    Question {questionIndex + 1} of {TOTAL}
                  </p>
                  <p className="font-mono text-xs text-gold">
                    {String(questionIndex + 1).padStart(2, "0")}
                  </p>
                </div>
                <ProgressBar current={questionIndex} total={TOTAL} />
              </div>

              <h2 className="mb-8 font-display text-title-xl font-semibold leading-snug text-gray-text">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.answers.map((answer) => {
                  const isPending = pendingAnswer === answer.type;
                  const isExisting = existingAnswer === answer.type && pendingAnswer === null;
                  const isDimmed = pendingAnswer !== null && !isPending;

                  return (
                    <button
                      key={answer.type}
                      type="button"
                      onClick={() => handleSelectAnswer(answer.type)}
                      disabled={pendingAnswer !== null}
                      className={[
                        "w-full rounded-xl border px-5 py-4 text-left font-body text-sm leading-relaxed",
                        "transition-all duration-200",
                        isPending
                          ? "scale-[0.985] border-gold bg-gold/10 text-gray-text"
                          : isExisting
                          ? "border-gold bg-gray-elevated text-gray-text"
                          : "border-white/8 bg-gray-elevated/30 text-gray-text-2 hover:border-white/20 hover:bg-gray-elevated hover:text-gray-text",
                        isDimmed ? "opacity-30" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {answer.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="font-body text-sm text-gray-muted transition-colors duration-200 hover:text-gray-text"
                >
                  Back
                </button>
              </div>
            </motion.div>
          )}

          {phase === "results" && result && resultType && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                Your result
              </p>
              <h2 className="mb-2 font-display text-display font-semibold leading-[1.05] text-gray-text">
                {result.name}
              </h2>
              <p className="mb-10 font-body text-lead leading-relaxed text-gray-text-2">
                {result.tagline}
              </p>

              <div className="mb-10 space-y-5 border-t border-white/5 pt-8">
                {result.body.map((paragraph, i) => (
                  <p key={i} className="font-body text-sm leading-[1.8] text-gray-text-2">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mb-10 rounded-2xl border border-gold/20 bg-gold/5 p-6">
                <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                  Recommended for you
                </p>
                <p className="mb-2 font-display text-title-md font-semibold text-gray-text">
                  {result.recommendedProgram.name}
                </p>
                <p className="mb-5 font-body text-sm leading-relaxed text-gray-text-2">
                  {result.recommendedProgram.reason}
                </p>
                <Button href={result.recommendedProgram.href} variant="gold" size="md">
                  Learn more
                </Button>
              </div>

              <QuizLeadForm resultType={resultType} answers={answers} />

              <div className="flex justify-center pt-2">
                <Button onClick={handleRetake} variant="ghost" size="sm">
                  Retake the quiz
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
