# Quality, SEO, and Docs Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore clean verification status, complete missing metadata coverage, and align project docs with the current codebase.

**Architecture:** Keep the current App Router structure intact and make only targeted edits in existing files. Treat lint/build as the acceptance gate for this pass, and update project-memory docs alongside the code so repository state and documentation stay synchronized.

**Tech Stack:** Next.js 16, React 19, TypeScript, ESLint, App Router

---

### Task 1: Fix code-health issues surfaced by lint

**Files:**
- Modify: `src/components/animations/CountUp.tsx`
- Modify: `src/components/animations/RevealText.tsx`
- Modify: `src/app/quiz/QuizClient.tsx`

- [ ] Remove the synchronous `setState` call inside `CountUp`'s effect and preserve reduced-motion behavior.
- [ ] Remove or resolve the ineffective/unused `RevealText` prop so the component API matches implementation.
- [ ] Remove the unused `FadeUp` import from `QuizClient`.

### Task 2: Complete route metadata coverage for the missing pages

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/contact/page.tsx`

- [ ] Add homepage metadata that matches the site's current positioning and layout metadata.
- [ ] Add contact-page metadata focused on discovery calls and direct outreach.

### Task 3: Refresh project documentation

**Files:**
- Modify: `README.md`
- Modify: `progress.md`

- [ ] Replace the default scaffold README with a project-specific overview, setup, and workflow guide.
- [ ] Update `progress.md` to reflect the current branch reality and this polish pass.

### Task 4: Verify the pass

**Files:**
- No code changes required unless verification finds issues.

- [ ] Run `npm run lint` from the project root and confirm a clean exit.
- [ ] Run `npm run build` from the project root and confirm a clean exit.
- [ ] Record the completed polish pass and verification results in `progress.md`.
