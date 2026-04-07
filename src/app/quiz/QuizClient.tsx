"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QUIZ_QUESTIONS, QUIZ_RESULTS, scoreQuiz, type QuizType } from "@/data/quiz";
import Button from "@/components/ui/Button";
import CalendlyEmbed from "@/components/ui/CalendlyEmbed";

type Phase = "intro" | "question" | "emailgate" | "results";

const TOTAL = QUIZ_QUESTIONS.length; // 8

// ---------------------------------------------------------------------------
// ProgressBar
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// QuizClient
// ---------------------------------------------------------------------------
export default function QuizClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizType[]>([]);
  // Which answer the user just clicked — held for 400ms before advancing
  const [pendingAnswer, setPendingAnswer] = useState<QuizType | null>(null);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  // Email gate fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [apiStatus, setApiStatus] = useState<"idle" | "loading">("idle");

  // Computed result type (set on submit)
  const [resultType, setResultType] = useState<QuizType | null>(null);
  // Whether the user completed a Calendly booking on the results screen
  const [booked, setBooked] = useState(false);

  // The answer at the current question index (may exist if user went back)
  const existingAnswer: QuizType | null =
    phase === "question" && questionIndex < answers.length
      ? answers[questionIndex]
      : null;

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  function handleSelectAnswer(type: QuizType) {
    if (pendingAnswer !== null) return; // debounce during animation
    setPendingAnswer(type);

    setTimeout(() => {
      // Replace answer at this index, truncate any future answers
      const newAnswers = [...answers.slice(0, questionIndex), type];
      setAnswers(newAnswers);
      setPendingAnswer(null);

      if (questionIndex < TOTAL - 1) {
        setDirection(1);
        setQuestionIndex((i) => i + 1);
      } else {
        setPhase("emailgate");
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
    } else if (phase === "emailgate") {
      setDirection(-1);
      setPhase("question");
      setQuestionIndex(TOTAL - 1);
    }
  }

  function handleSubmit() {
    let valid = true;
    if (!name.trim() || name.trim().length < 2) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError("Enter a valid email");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!valid) return;

    const computed = scoreQuiz(answers);
    setResultType(computed);
    setApiStatus("loading");

    fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        resultType: computed,
        answers,
      }),
    })
      .finally(() => {
        setApiStatus("idle");
        setPhase("results");
      });
  }

  const handleBooked = useCallback(() => {
    setBooked(true);
  }, []);

  function handleRetake() {
    setPhase("intro");
    setQuestionIndex(0);
    setAnswers([]);
    setPendingAnswer(null);
    setName("");
    setEmail("");
    setNameError("");
    setEmailError("");
    setResultType(null);
    setApiStatus("idle");
    setDirection(1);
    setBooked(false);
  }

  const result = resultType ? QUIZ_RESULTS[resultType] : null;
  const currentQuestion = phase === "question" ? QUIZ_QUESTIONS[questionIndex] : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-bg px-6 py-24">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait" initial={false}>

          {/* ── Intro ── */}
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
                8 quick questions. Honest answers. You&apos;ll get a result that maps to your actual situation — and a recommendation for the kind of help that fits you right now.
              </p>
              <ul className="mb-10 space-y-2.5">
                {[
                  "Takes about 2 minutes",
                  "No wrong answers — just pick what\u2019s closest to true",
                  "Your personalized results are sent to your inbox",
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
                8 questions · No email required until the end
              </p>
            </motion.div>
          )}

          {/* ── Question ── */}
          {phase === "question" && currentQuestion && (
            <motion.div
              key={`q-${questionIndex}`}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Progress header */}
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
                  ← Back
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Email gate ── */}
          {phase === "emailgate" && (
            <motion.div
              key="emailgate"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-10">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-mono text-xs tracking-wider text-gray-muted">
                    Almost there
                  </p>
                  <p className="font-mono text-xs text-gold">{TOTAL}/{TOTAL}</p>
                </div>
                <ProgressBar current={TOTAL} total={TOTAL} />
              </div>

              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                Your results are ready
              </p>
              <h2 className="mb-3 font-display text-title-xl font-semibold leading-snug text-gray-text">
                Where should we send them?
              </h2>
              <p className="mb-8 font-body text-sm leading-relaxed text-gray-muted">
                Enter your name and email to see your personalized result and program recommendation.
              </p>

              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
                    Name <span className="text-gold">*</span>
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    autoComplete="name"
                    placeholder="Your first name"
                    className="w-full rounded-xl border border-white/10 bg-gray-elevated/60 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
                  />
                  {nameError && (
                    <p className="mt-1.5 font-mono text-xs text-orange-accent">{nameError}</p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-2 block font-body text-xs uppercase tracking-wide text-gray-text-2">
                    Email <span className="text-gold">*</span>
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-gray-elevated/60 px-4 py-3 font-body text-sm text-gray-text outline-none transition-colors placeholder:text-gray-muted focus:border-gold"
                  />
                  {emailError && (
                    <p className="mt-1.5 font-mono text-xs text-orange-accent">{emailError}</p>
                  )}
                </label>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="font-body text-sm text-gray-muted transition-colors duration-200 hover:text-gray-text"
                >
                  ← Back
                </button>
                <Button
                  onClick={handleSubmit}
                  variant="gold"
                  size="md"
                  disabled={apiStatus === "loading"}
                >
                  {apiStatus === "loading" ? "Loading..." : "See my results →"}
                </Button>
              </div>

              <p className="mt-5 text-center font-mono text-xs text-gray-muted">
                No spam. One email with your results and recommendation.
              </p>
            </motion.div>
          )}

          {/* ── Results ── */}
          {phase === "results" && result && (
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

              {/* Recommended program card */}
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

              {/* Inline booking calendar */}
              {booked ? (
                <div className="mb-8 rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center">
                  <div
                    className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10"
                    aria-hidden="true"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.9)" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                      <polyline points="9 16 11 18 15 14" />
                    </svg>
                  </div>
                  <p className="mb-1 font-mono text-xs uppercase tracking-widest text-gold">
                    Call booked
                  </p>
                  <h3 className="mb-2 font-display text-title-md font-semibold text-gray-text">
                    You&apos;re on Adam&apos;s calendar.
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-gray-text-2">
                    Check your email for the confirmation. He&apos;ll already know your result and come prepared.
                  </p>
                </div>
              ) : (
                <div className="mb-8">
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                    Book your free call
                  </p>
                  <h3 className="mb-1 font-display text-title-md font-semibold text-gray-text">
                    Talk to Adam while it&apos;s top of mind.
                  </h3>
                  <p className="mb-5 font-body text-sm leading-relaxed text-gray-text-2">
                    Free · 20 minutes · He&apos;ll already know your result.
                  </p>
                  <div className="overflow-hidden rounded-xl border border-white/8">
                    <CalendlyEmbed
                      name={name}
                      email={email}
                      onBooked={handleBooked}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <Button onClick={handleRetake} variant="ghost" size="sm">
                  Retake the quiz
                </Button>
              </div>

              {email && (
                <p className="mt-6 text-center font-mono text-xs text-gray-muted">
                  Your results were sent to {email}
                </p>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
