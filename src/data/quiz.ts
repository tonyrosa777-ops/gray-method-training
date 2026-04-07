/**
 * GRAY METHOD TRAINING — QUIZ DATA
 *
 * 8 questions, each answer scores toward one of 4 client archetypes.
 * Highest score at the end determines the result type.
 */

export type QuizType = "mom" | "diet-cycler" | "dismissed" | "busy-pro";

export interface QuizAnswer {
  label: string;
  type: QuizType;
}

export interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
}

export interface QuizResult {
  type: QuizType;
  name: string;
  tagline: string;
  body: string[];
  recommendedProgram: {
    name: string;
    href: string;
    reason: string;
  };
}

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your biggest day-to-day challenge right now?",
    answers: [
      { label: "I put everyone else's needs first — my own health keeps getting pushed back", type: "mom" },
      { label: "I start strong and then fall off, over and over", type: "diet-cycler" },
      { label: "Something feels off physically but I can't get a straight answer from anyone", type: "dismissed" },
      { label: "My schedule barely allows time to think, let alone take care of myself", type: "busy-pro" },
    ],
  },
  {
    id: 2,
    question: "How would you describe your relationship with food?",
    answers: [
      { label: "I grab whatever's fast — usually what's easy for the family", type: "mom" },
      { label: "I've done keto, calorie counting, paleo... I've tried all of them", type: "diet-cycler" },
      { label: "I eat reasonably well but my body doesn't seem to respond the way it should", type: "dismissed" },
      { label: "I eat on the run, usually whatever requires the least thought", type: "busy-pro" },
    ],
  },
  {
    id: 3,
    question: "When it comes to exercise, which sounds most like you?",
    answers: [
      { label: "I used to be active. Life got in the way and I haven't found my way back", type: "mom" },
      { label: "I go hard for a few weeks, burn out, then stop", type: "diet-cycler" },
      { label: "I exercise but I'm exhausted in ways that don't match what I'm putting in", type: "dismissed" },
      { label: "I can commit to 20–30 minutes, I just need it to actually count", type: "busy-pro" },
    ],
  },
  {
    id: 4,
    question: "Have you ever been told your bloodwork looks 'normal' but you know something isn't right?",
    answers: [
      { label: "Yes — and it's one of the most frustrating things I've experienced", type: "dismissed" },
      { label: "I haven't prioritized getting it checked — too much going on", type: "mom" },
      { label: "My labs are fine, I just can't seem to stay consistent with anything", type: "diet-cycler" },
      { label: "Everything checks out — I just need a plan that fits my actual life", type: "busy-pro" },
    ],
  },
  {
    id: 5,
    question: "What usually gets in the way when you try to make progress?",
    answers: [
      { label: "Everyone else's needs end up coming before mine", type: "mom" },
      { label: "One bad week and the whole thing falls apart", type: "diet-cycler" },
      { label: "My energy and symptoms that I can't fully explain", type: "dismissed" },
      { label: "There simply aren't enough hours", type: "busy-pro" },
    ],
  },
  {
    id: 6,
    question: "How long have you been dealing with your main health or fitness challenge?",
    answers: [
      { label: "It crept up on me — I noticed things slipping after a major life change", type: "mom" },
      { label: "Years. The cycle just keeps repeating no matter what I try", type: "diet-cycler" },
      { label: "A while — and the older I get, the harder it is to understand what's happening", type: "dismissed" },
      { label: "It's always been a challenge — life has always been this full", type: "busy-pro" },
    ],
  },
  {
    id: 7,
    question: "Which of these hits closest to home?",
    answers: [
      { label: "\"I know I need to do this for myself. I just need to figure out how to make space for it.\"", type: "mom" },
      { label: "\"I'm not the problem. The plans I've tried are the problem.\"", type: "diet-cycler" },
      { label: "\"I've been told I'm fine. I don't feel fine.\"", type: "dismissed" },
      { label: "\"I need something that works with my life, not a plan that requires a completely different one.\"", type: "busy-pro" },
    ],
  },
  {
    id: 8,
    question: "What would mean the most to you six months from now?",
    answers: [
      { label: "Having real energy and feeling present — not just for my family, but for me", type: "mom" },
      { label: "Having a routine I actually trust and don't dread or abandon", type: "diet-cycler" },
      { label: "Understanding what's happening in my body and feeling like myself again", type: "dismissed" },
      { label: "Being noticeably stronger and more capable in less time than I thought possible", type: "busy-pro" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------

export const QUIZ_RESULTS: Record<QuizType, QuizResult> = {
  mom: {
    type: "mom",
    name: "The Mom",
    tagline: "You've been last on your own list for too long.",
    body: [
      "You take care of everyone. The kids, the partner, the job, the household. You're good at it. But somewhere in the middle of all that, you stopped showing up for yourself — and now it feels like it would take a complete restructuring of your life just to change that.",
      "It won't.",
      "What you need isn't a dramatic overhaul. You need a plan built around the time and energy you actually have — not the ideal version of your week. Adam has worked with a lot of women exactly like you. The work isn't about adding more to your plate. It's about making you a non-negotiable part of what's already on it.",
      "You've spent years taking care of everyone else. It's time to be one of the people you take care of.",
    ],
    recommendedProgram: {
      name: "1:1 Online Coaching",
      href: "/programs/one-on-one",
      reason: "Built entirely around your equipment, your schedule, and the real life you're living — not a template.",
    },
  },
  "diet-cycler": {
    type: "diet-cycler",
    name: "The Diet Cycler",
    tagline: "You are not the problem. The approach is.",
    body: [
      "You've tried things. Multiple things. And most of them worked — until they didn't. Keto worked for two weeks. So did calorie counting, the plan your friend swore by, the program that came with the app. You start strong, you see early progress, and then something breaks the streak and the whole thing collapses.",
      "You've started to wonder if the problem is you. It isn't.",
      "The plans you've tried were built for someone else — or for no one in particular. They required a level of consistency that no realistic life can sustain indefinitely. One bad day becomes a bad week, and a bad week becomes starting over.",
      "What you need is an approach that can survive your actual week — including the hard ones. Not a plan that requires you to be perfect. One that's built to keep going when you're not.",
    ],
    recommendedProgram: {
      name: "1:1 Online Coaching",
      href: "/programs/one-on-one",
      reason: "A fully personalized plan with no systems, no boxes to fit into, and no all-or-nothing rules that break the moment life gets hard.",
    },
  },
  dismissed: {
    type: "dismissed",
    name: "The Dismissed Patient",
    tagline: "Your instincts are right. Something is off.",
    body: [
      "You've sat across from a doctor who looked at your bloodwork and said everything was normal. And you walked out knowing that wasn't the whole story. Your energy, your sleep, your weight, the way your body responds — something is happening that the standard labs aren't capturing.",
      "You're not imagining it.",
      "Hormonal changes — particularly in the years around perimenopause and menopause — affect metabolism, body composition, energy, and mood in ways that a standard panel will miss entirely. The symptoms are real. The difficulty losing weight is real. The exhaustion that doesn't match your activity level is real.",
      "The Energize & Empower Her program was built specifically for this. Co-created with Laura Brown, NP — a board-certified Women's Health Nurse Practitioner — it addresses your hormones and your habits together. Because for women in this stage of life, they can't be separated.",
    ],
    recommendedProgram: {
      name: "Energize & Empower Her",
      href: "/programs/energize-empower",
      reason: "The only program that addresses your hormones and your habits together — co-created with a board-certified Women's Health Nurse Practitioner.",
    },
  },
  "busy-pro": {
    type: "busy-pro",
    name: "The Busy Professional",
    tagline: "You don't need more time. You need a better plan.",
    body: [
      "You've got 20, maybe 30 minutes. A set of dumbbells. A schedule that doesn't have much give. You've been waiting for a window that's never going to open the way you think it needs to.",
      "Here's the thing: the problem isn't the 20 minutes. It's what you're doing with them — or not doing, because every program you've looked at assumes a full hour, a gym membership, and a meal-prep Sunday.",
      "Adam builds plans around the life you actually have. Equipment you own. Time you have. Schedule that works — not someday, but now. Eighty percent consistent for two years beats one hundred percent for three weeks. That's not a consolation prize. That's the actual strategy.",
      "You don't need a perfect setup to make real progress. You need a plan built for the setup you have.",
    ],
    recommendedProgram: {
      name: "1:1 Online Coaching",
      href: "/programs/one-on-one",
      reason: "Designed around your equipment, your schedule, and your 20-minute windows — not someone else's ideal week.",
    },
  },
};

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

export function scoreQuiz(answers: QuizType[]): QuizType {
  const scores: Record<QuizType, number> = {
    mom: 0,
    "diet-cycler": 0,
    dismissed: 0,
    "busy-pro": 0,
  };
  for (const type of answers) {
    scores[type]++;
  }
  return (Object.entries(scores) as [QuizType, number][]).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];
}
