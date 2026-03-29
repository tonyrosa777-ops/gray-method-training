# GRAY METHOD TRAINING — PROGRESS
# Source of truth for build status. Update after every commit.
# New session? Read this file FIRST. Then CLAUDE.md. Then resume.

---

## CURRENT STATUS
**Phase:** Phase 2 — Animation Primitives (starting)
**Last commit:** chore: project setup
**Last updated:** 2026-03-29
**Blocked by:** Nothing — ready to build

---

## PHASE 0 — READING
- [x] `/mnt/skills/public/frontend-design/SKILL.md`
- [x] `adam-gray-brand-voice.md`
- [x] `adam-gray-competitive-intelligence.md`
- [x] `initial-website-data.md`
- [x] Intelligence synthesis written (in DESIGN_CONTRACT.md)

## PHASE 0.5 — DESIGN CONTRACT
- [x] `DESIGN_CONTRACT.md` produced
  - [x] Color palette with hex values + token names
  - [x] Typography pairing + type scale
  - [x] Homepage section order (all 11 sections listed)
  - [x] Animation inventory per section
  - [x] Component list
  - [x] Photography direction + placeholder strategy (15 named slots)
- [x] ✅ CLIENT APPROVAL RECEIVED — approved 2026-03-29

## PHASE 1 — PROJECT SETUP
- [x] `create-next-app` — Next.js 16, TypeScript, Tailwind v4, App Router, src-dir
- [x] All dependencies installed (framer-motion, sanity, radix-ui, react-hook-form, zod, etc.)
- [x] `globals.css` — Tailwind v4 @theme tokens, @utility classes, grain texture, base styles
- [x] `layout.tsx` — Cormorant Garamond + DM Sans + Space Mono, full metadata, JSON-LD, Vercel Analytics
- [x] Folder structure scaffolded: components/animations, components/ui, components/sections, components/layout, data, lib
- [x] `src/lib/photos.ts` — 15-slot photo manifest with placeholder strategy
- [x] `src/lib/utils.ts` — cn(), prefersReducedMotion(), helpers
- [x] `src/data/site.ts` — ALL copy centralized (no hardcoded strings in JSX)
- [x] `CLAUDE.md` in project root
- [x] `progress.md` in project root
- [x] `SETUP.md` — Instagram token, Sanity, ConvertKit, Calendly, Snipcart, Vercel, photos guide
- [x] `/public/images/` folder created (drop photos here)
- [x] Initial commit: `chore: project setup`

## PHASE 2 — ANIMATION PRIMITIVES
- [ ] `FadeUp.tsx`
- [ ] `FadeIn.tsx`
- [ ] `SlideInLeft.tsx` + `SlideInRight.tsx`
- [ ] `CountUp.tsx`
- [ ] `ParallaxWrapper.tsx`
- [ ] `StaggerContainer.tsx`
- [ ] `RevealText.tsx`
- [ ] `ScaleIn.tsx`
- [ ] `index.ts` barrel export
- [ ] All primitives: `useInView({ once: true })` + `prefers-reduced-motion` check
- [ ] Commit: `feat: animation primitives`

## PHASE 3 — UI PRIMITIVES
- [ ] `Button.tsx` — gold (primary) / orange (urgency) / ghost (secondary) variants
- [ ] `Card.tsx` — default / gold-featured variants
- [ ] `Badge.tsx` — default / gold / limited / category variants
- [ ] `Accordion.tsx`
- [ ] `Input.tsx` / `Textarea.tsx`
- [ ] `Divider.tsx` — gold rule with ◆ separator
- [ ] `PhotoPlaceholder.tsx` — demo-visible slot component (uses photos.ts manifest)
- [ ] `index.ts` barrel export
- [ ] Commit: `feat: ui primitives`

## PHASE 4 — LAYOUT
- [ ] `Navbar.tsx` — transparent → solid on scroll, sticky
- [ ] `MobileNav.tsx` — full-screen overlay, AnimatePresence
- [ ] `Footer.tsx` — 4 columns desktop, newsletter embed, social links
- [ ] `index.ts` barrel export
- [ ] Commit: `feat: layout`

## PHASE 5 — HOMEPAGE SECTIONS
- [ ] `Hero.tsx` — staggered reveal, ember orb, dual CTAs, scroll indicator
- [ ] `PainPoints.tsx` — 4-card 2x2 grid, staggered ScaleIn
- [ ] `AdamStory.tsx` — photo left, copy right, pull quote
- [ ] `GrayMethodPhilosophy.tsx` — 3 numbered pillars, RevealText headline
- [ ] `Programs.tsx` — 3 cards, EEH gold highlight, staggered ScaleIn
- [ ] `Stats.tsx` — CountUp bar, Space Mono numbers
- [ ] `Testimonials.tsx` — named story cards, NOT a carousel
- [ ] `InstagramFeed.tsx` — fallback-first (live feed in Phase 6)
- [ ] `QuizCTA.tsx` — ember orb, orange CTA button
- [ ] `BlogPreview.tsx` — 3 placeholder cards (live in Phase 7)
- [ ] `FinalCTA.tsx` — full-bleed dark, gold CTA
- [ ] `page.tsx` — assemble all sections
- [ ] Lighthouse run: Performance ___ / Accessibility ___ / SEO ___
- [ ] Commit: `feat: homepage`

## PHASE 6 — INSTAGRAM FEED INTEGRATION
- [ ] `app/api/instagram/route.ts` — Graph API fetch, ISR revalidate 3600s
- [ ] Masonry grid layout (9–12 posts)
- [ ] Video tiles + photo tiles + error fallback
- [ ] Commit: `feat: instagram live feed`

## PHASE 7 — BLOG (Sanity CMS)
- [ ] Sanity project initialized
- [ ] Schema: post · author · category · mainImage · body · SEO fields
- [ ] Sanity Studio at `/studio`
- [ ] On-demand ISR via Sanity webhook
- [ ] `/blog` index — editorial magazine grid
- [ ] `/blog/[slug]` — post template with ToC, pull quotes, ConvertKit embed
- [ ] Migrate all posts from `initial-website-data.md` into Sanity
- [ ] 5 P1 SEO posts published
- [ ] Commit: `feat: blog system`

## PHASE 8 — SHOP (Snipcart + Printful)
- [ ] READ snipcart-nextjs-dom-conflict SKILL.md first
- [ ] `/shop` page
- [ ] Snipcart integration
- [ ] Digital products + merch
- [ ] Commit: `feat: shop`

## PHASE 9 — REMAINING PAGES
- [ ] `/about`
- [ ] `/programs` + 3 sub-pages
- [ ] `/reviews`
- [ ] `/contact`
- [ ] `/quiz`
- [ ] Commits per page

## PHASE 10 — SEO
- [ ] Page-level metadata on every route
- [ ] JSON-LD: Article (blog posts) + FAQPage (programs)
- [ ] `next-sitemap` configured
- [ ] All images: descriptive alt text
- [ ] Commit: `feat: seo`

## PHASE 11 — PRE-LAUNCH QA
- [ ] Full Lighthouse audit — Performance ___ / Accessibility ___ / SEO ___
- [ ] Mobile: 375px · 390px · 428px · 768px · 1024px
- [ ] All animations: once-only, prefers-reduced-motion handled
- [ ] All forms: validation, success states, error states
- [ ] All API routes: error handling + fallback UI confirmed
- [ ] Instagram feed: live data confirmed
- [ ] `SETUP.md` complete
- [ ] Final commit: `release: gray method training v1.0`

---

## NOTES / BLOCKERS
- Next.js version is 16 (not 14 as originally specified) — uses Tailwind v4 CSS-first config
- Tailwind v4 uses @theme and @utility directives — NO tailwind.config.ts needed
- Photo manifest at src/lib/photos.ts — all 15 slots defined, /public/images/ ready
- All copy centralized in src/data/site.ts — never hardcode strings in JSX

---

## SESSION LOG
- 2026-03-29 · Phase 0 read order complete, DESIGN_CONTRACT.md produced and approved.
  Phase 1 complete: scaffolded Next.js 16, installed deps, Tailwind v4 tokens,
  layout.tsx (Cormorant+DM Sans+Space Mono, metadata, JSON-LD), folder structure,
  photos.ts, site.ts, utils.ts, SETUP.md. Next: Phase 2 animation primitives.

---

*This file is the project memory. Keep it current after every commit.*
