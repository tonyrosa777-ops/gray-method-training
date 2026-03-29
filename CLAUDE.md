# CLAUDE.md — Gray Method Training
# Project rules. Always open. Never violate.

---

## RULE 1 — BEFORE ANY UI OR UX WORK

Read `/mnt/skills/public/frontend-design/SKILL.md` in full.
Every single time. No exceptions.
No component, no layout, no color, no spacing decision gets made without it.

---

## RULE 2 — BEFORE WRITING ANY COPY

Read `adam-gray-brand-voice.md` in full.
Adam has a specific vocabulary. The "Do/Don't" list is a hard constraint.
If you are about to write "clean eating," "cheat meal," "transform your life," or "toning" — stop immediately.

---

## RULE 3 — BEFORE MAKING ANY DESIGN DECISIONS

Read `adam-gray-competitive-intelligence.md`.
The palette, homepage structure, and design gaps are all documented.
Do not default to generic. Do not guess. The research exists — use it.

---

## RULE 4 — BEFORE TOUCHING THE SHOP

Read `/mnt/skills/user/snipcart-nextjs-dom-conflict/SKILL.md`.
This is a known DOM conflict that will break the app if not handled correctly.
Reference `github.com/tonyrosa777-ops/andrea-abella-marie-website` for structure.

---

## RULE 5 — BEFORE RESUMING ANY SESSION

Read `progress.md` first. Know where the last session ended. Do not re-ask questions answered there.

---

## CODE STANDARDS

- TypeScript everywhere — no `any` types
- No hardcoded copy in JSX — all strings in `src/data/` or Sanity
- No inline styles — Tailwind classes only
- All images via `next/image` — no exceptions
- Every external API call has error handling and a graceful fallback UI
- No new dependencies without a clear reason noted in `progress.md`
- Dark background is correct for this brand — do not default to light/white

---

## ANIMATION STANDARDS

- Framer Motion only — no other animation library
- All scroll animations use `useInView({ once: true })` — fires once, not on every scroll
- All animations wrapped in `prefers-reduced-motion` check — skip if true, render final state
- No layout-shifting animations on mobile
- Stagger siblings at 0.1s intervals
- Standard duration: 0.6s with ease `[0.25, 0.1, 0.25, 1]`

---

## INSTAGRAM FEED RULES

- Never hardcode Instagram posts — always fetch from Graph API
- ISR revalidation: 3600 seconds (hourly)
- Always implement a fallback if the API call fails — never a broken section
- Videos play inline (muted autoplay on hover, unmute on click)
- Document `INSTAGRAM_ACCESS_TOKEN` setup in `SETUP.md` for Adam

---

## PROGRESS PROTOCOL

- Atomic git commit after every completed component
- Update `progress.md` checkboxes after every commit
- Before any context window compaction: write exactly where you are in `progress.md`
- New sessions: read `progress.md` before doing anything else

---

## QUALITY GATE — EVERY COMPONENT BEFORE MARKING DONE

- [ ] Frontend-design skill consulted
- [ ] Framer animations: scroll-triggered, once-only, prefers-reduced-motion handled
- [ ] Mobile tested: 375px, 390px, 428px
- [ ] All images: `next/image` with descriptive `alt`
- [ ] No layout shift on scroll
- [ ] Hover + focus states on all interactive elements
- [ ] No copy from the "Never" list in brand voice doc
- [ ] At least one real Adam-specific detail per page (NH, Dunkin, BJJ, Em, Kristin)
- [ ] Lighthouse scores noted in `progress.md`
- [ ] Committed to git

---

*This file lives in the project root. It is always open. It is never ignored.*
