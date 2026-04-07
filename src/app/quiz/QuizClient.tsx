"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QUIZ_QUESTIONS, QUIZ_RESULTS, scoreQuiz, type QuizType } from "@/data/quiz";
import Button from "@/components/ui/Button";
import CalendlyEmbed from "@/components/ui/CalendlyEmbed";

type Phase = "intro" | "question" | "results";

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
  // Which answer was just clicked — held for 400ms before advancing
  const [pendingAnswer, setPendingAnswer] = useState<QuizType | null>(null);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [resultType, setResultType] = useState<QuizType | null>(null);
  const [booked, setBooked] = useState(false);

  // The answer already recorded at the current index (visible when going back)
  const existingAnswer: QuizType | null =
    phase === "question" && questionIndex < answers.length
      ? answers[questionIndex]
      : null;

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  function handleSelectAnswer(type: QuizType) {
    if (pendingAnswer !== null) return; // debounce during flash animation
    setPendingAnswer(type);

    setTimeout(() => {
      const newAnswers = [...answers.slice(0, questionIndex), type];
      setAnswers(newAnswers);
      setPendingAnswer(null);

      if (questionIndex < TOTAL - 1) {
        setDirection(1);
        setQuestionIndex((i) => i + 1);
      } else {
        // Last question answered — score immediately, go straight to results
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

  const handleBooked = useCallback(() => {
    setBooked(true);
  }, []);

  function handleRetake() {
    setPhase("intro");
    setQuestionIndex(0);
    setAnswers([]);
    setPendingAnswer(null);
    setResultType(null);
    setBooked(false);
    setDirection(1);
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
                  "See your result instantly — no email required",
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
                8 questions · results on screen immediately
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
                    <CalendlyEmbed name="" email="" onBooked={handleBooked} />
                  </div>
                </div>
              )}

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
