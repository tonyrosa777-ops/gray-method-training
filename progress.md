# GRAY METHOD TRAINING — PROGRESS
# Source of truth for build status. Update after every commit.
# New session? Read this file FIRST. Then CLAUDE.md. Then resume.

---

## CURRENT STATUS
**Phase:** Phase 10 — SEO (all pages built, Phase 9 complete)
**Last commit:** feat: all pages, Sanity CMS, shop, blog, quiz, and API routes
**Last updated:** 2026-03-29
**Blocked by:** Nothing — ready to continue

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

## PHASE 2 — ANIMATION PRIMITIVES ✅
- [x] `FadeUp.tsx` — y: 40→0, opacity, triggerOnce, prefersReducedMotion
- [x] `FadeIn.tsx` — opacity only variant
- [x] `SlideIn.tsx` — direction prop (left/right), x offset
- [x] `ScaleIn.tsx` — scale 0.94→1
- [x] `StaggerContainer.tsx` + `StaggerItem` (motion.div) + `staggerItemVariants` + `staggerItemScaleVariants`
- [x] `ParallaxWrapper.tsx` — useScroll + useTransform, yRange prop
- [x] `RevealText.tsx` — character-by-character stagger, aria-label for a11y
- [x] `CountUp.tsx` — rAF loop, easeOut cubic, decimals prop
- [x] `index.ts` barrel export
- [x] All primitives: `useInView({ triggerOnce: true })` + `prefersReducedMotion` check
- [x] **FIX**: `once: true` → `triggerOnce: true` (react-intersection-observer API)
- [x] **FIX**: ease arrays typed as `[number, number, number, number]`

## PHASE 3 — UI PRIMITIVES ✅
- [x] `Button.tsx` — gold/orange/ghost variants, sm/md/lg, motion whileHover/whileTap, href or onClick
- [x] `Card.tsx` — default/gold-featured variants, shadow-card
- [x] `Badge.tsx` — default/gold/limited/category
- [x] `Divider.tsx` — gold gradient rule with ◆ diamond
- [x] `Input.tsx` + `Textarea` (forwardRef) — dark field, gold focus ring, error/hint
- [x] `PhotoPlaceholder.tsx` — "use client", useState+onError fallback (no fs/path — client-safe)
- [x] `index.ts` barrel export
- [x] **FIX**: removed fs.existsSync / path imports (caused Turbopack client bundle error)

## PHASE 4 — LAYOUT ✅
- [x] `Navbar.tsx` — transparent → bg-gray-bg/95 backdrop-blur at scrollY>40, animated entry, hamburger
- [x] `MobileNav.tsx` — slide panel from right, staggered links, body scroll lock, EASE typed correctly
- [x] `Footer.tsx` — 4-column, newsletter embed slot (#newsletter-embed), social SVGs, gold top border
- [x] `index.ts` barrel export

## PHASE 5 — HOMEPAGE SECTIONS ✅
- [x] `Hero.tsx` — word-by-word TaglineReveal, dual CTAs, heroAdam photo, 4.9★ floating badge, scroll indicator
  - [x] **ENHANCED**: HeroParticles canvas (85 stars + 32 embers + glimmer bursts, mix-blend-mode screen)
  - [x] **ENHANCED**: "Gray Method" text-shimmer (gold gradient sweep, 5s loop)
  - [x] **ENHANCED**: Breathing orb animations (CSS @keyframes orb-breathe, 6s + 9s offset)
- [x] `HeroParticles.tsx` — rAF canvas, three particle types, prefersReducedMotion gated
- [x] `PainPoints.tsx` — "Does this sound like you?", 4-card 2×2 grid
- [x] `AdamStory.tsx` — SlideIn split layout, pull quote, two photo slots
- [x] `GrayMethodPhilosophy.tsx` — RevealText headline, 3 pillars, "Gray" watermark bg text
- [x] `Programs.tsx` — 3 cards, EEH gold-featured, badges
- [x] `Stats.tsx` — CountUp: 11+/100+/4.9★/100%, Space Mono orange numbers
- [x] `Testimonials.tsx` — Kayla/Maureen/Deb story cards, PhotoPlaceholder Avatar with initials fallback
- [x] `InstagramFeed.tsx` — 9-tile placeholder grid (live feed in Phase 6)
- [x] `QuizCTA.tsx` — orange Button, ember orb
- [x] `BlogPreview.tsx` — 3 placeholder posts (live in Phase 7)
- [x] `FinalCTA.tsx` — RevealText headline, ScaleIn CTA
- [x] `page.tsx` — all 11 sections assembled with Dividers
- [ ] Lighthouse run: Performance ___ / Accessibility ___ / SEO ___
- [x] Build: ✅ TypeScript clean, 4/4 static pages, 0 errors

## PHASE 6 — INSTAGRAM FEED INTEGRATION ✅
- [x] `src/lib/instagram.ts` — fetchInstagramPosts(), truncateCaption(), InstagramPost type
- [x] `app/api/instagram/route.ts` — Graph API fetch, revalidate 3600s (build shows 1h ✅)
- [x] `next.config.ts` — remotePatterns for cdninstagram.com + fbcdn.net
- [x] `InstagramFeed.tsx` — Server Component, live ImageTile/VideoTile/CarouselTile + PlaceholderTile fallback
- [x] Video tiles: thumbnail_url poster + play icon overlay
- [x] Carousel tiles: stacked layers icon indicator
- [x] Hover overlay: caption preview, Instagram icon
- [x] Fallback: PlaceholderGrid renders if token missing or API fails (never broken)
- [x] Dev note visible only when no token: "Add INSTAGRAM_ACCESS_TOKEN to .env.local"
- [x] Build: ✅ TypeScript clean, /api/instagram revalidate 1h confirmed

## PHASE 7 — BLOG (Sanity CMS) ✅
- [x] `src/sanity/env.ts` — env var exports (projectId, dataset, apiVersion, studioUrl)
- [x] `src/sanity/lib/client.ts` — getSanityClient() returns null when no projectId (build-safe)
- [x] `src/sanity/lib/image.ts` — urlFor() lazy builder with placeholder fallback
- [x] `src/sanity/lib/queries.ts` — getAllPosts, getPostBySlug, getAllPostSlugs, getRecentPosts
- [x] `src/sanity/schemaTypes/` — blockContent, post, author, category, index.ts
- [x] `sanity.config.ts` — project root, structureTool with custom structure
- [x] `src/app/studio/[[...tool]]/page.tsx` — NextStudio component
- [x] `src/app/api/revalidate/route.ts` — Sanity webhook → revalidatePath /blog + /
- [x] `src/app/api/newsletter/route.ts` — ConvertKit subscribe endpoint
- [x] `src/components/blog/PostCard.tsx` — standard + featured variants
- [x] `src/components/blog/PostBody.tsx` — PortableText with custom renderers (h2/h3, blockquote, links, images)
- [x] `src/components/blog/TableOfContents.tsx` — IntersectionObserver active highlight, h2+h3
- [x] `src/components/blog/NewsletterSignup.tsx` — form → /api/newsletter, success/error states
- [x] `src/app/blog/page.tsx` — editorial magazine grid, featured + grid layout, 6 placeholder posts
- [x] `src/app/blog/[slug]/page.tsx` — generateMetadata, generateStaticParams, ToC sidebar, NewsletterSignup
- [x] `BlogPreview.tsx` updated — pulls live Sanity posts, falls back to 3 placeholder posts
- [x] Build: ✅ TypeScript clean, /blog static, /blog/[slug] SSG, /studio dynamic
- [ ] ADAM TO DO: sanity init --project-id + import posts (see SETUP.md)

## PHASE 8 — SHOP (Snipcart + Printful) ✅
- [x] READ snipcart-nextjs-dom-conflict SKILL.md ✅
- [x] `SnipcartInit.tsx` — useEffect DOM injection, never in React's tree
- [x] `layout.tsx` updated — SnipcartInit, Script lazyOnload, suppressHydrationWarning, CSS in head
- [x] `src/data/shop.ts` — 4 products: 2 digital + 2 merch (Printful), typed Product interface
- [x] `src/app/shop/page.tsx` — server component with Metadata
- [x] `src/app/shop/ShopClient.tsx` — client: tab filter (all/digital/merch), variant picker, snipcart-add-item buttons
- [x] `loading.tsx` — added for /, /shop, /blog (Suspense boundaries per skill)
- [x] Build: ✅ TypeScript clean, /shop static
- [ ] ADAM TO DO: Add NEXT_PUBLIC_SNIPCART_API_KEY to .env.local

## PHASE 9 — REMAINING PAGES ✅
- [x] `/about` — full story, credentials, philosophy, stats, CTA; Navbar included
- [x] `/contact` — react-hook-form + zod, /api/contact (Resend), direct contact info, 3 trust bullets
- [x] `src/app/api/contact/route.ts` — Resend email, RESEND_API_KEY + CONTACT_EMAIL_TO env vars
- [x] `loading.tsx` added for /about and /contact
- [x] `/programs` index — 3 program cards with includes list + social proof + comparison CTA
- [x] `/programs/one-on-one` — long-form sales page (6 includes, who-it's-for list, CTA)
- [x] `/programs/energize-empower` — EEH flagship, Laura Brown NP featured, gold treatment
- [x] `/programs/group` — group coaching page, limited spots badge
- [x] `/reviews` — featured story cards (Kayla, Maureen, Rachel), client quote grid (8), Google reviews (8), CTA
- [x] `/quiz` — 5-question multi-step quiz (QuizClient.tsx), animated transitions, result → program recommendation
- [x] Build: ✅ TypeScript clean, 18 routes, 0 errors

## PHASE 10 — SEO
- [x] Page-level metadata on every route
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
- Next.js 16 (not 14) — Tailwind v4 CSS-first config, @theme + @utility directives, NO tailwind.config.ts
- `react-intersection-observer` uses `triggerOnce` not `once` — already fixed across all animation files
- `fs` / `path` are NOT usable in any file imported by a `"use client"` component — use useState+onError instead
- Ease arrays in Framer Motion variants must be typed `as [number, number, number, number]`
- Photo manifest: src/lib/photos.ts — 15 slots, drop files into /public/images/ — zero code changes needed
- All copy in src/data/site.ts — no hardcoded strings in JSX ever
- Hero now has full particle system (HeroParticles.tsx) + shimmer headline + breathing orbs
- globals.css has @keyframes shimmer-sweep, orb-breathe, orb-breathe-slow + @utility text-shimmer
- Quality polish pass complete: lint/build restored, missing metadata coverage filled, README refreshed, and project memory docs aligned

---

## SESSION LOG
- 2026-03-29 · Phase 0 read order complete, DESIGN_CONTRACT.md produced and approved.
  Phase 1 complete: scaffolded Next.js 16, installed deps, Tailwind v4 tokens,
  layout.tsx (Cormorant+DM Sans+Space Mono, metadata, JSON-LD), folder structure,
  photos.ts, site.ts, utils.ts, SETUP.md.
- 2026-03-29 · Phases 2–5 complete. All animation/UI primitives, layout, 11 homepage sections.
  Hero enhanced: HeroParticles canvas + shimmer headline + breathing orbs.
- 2026-03-29 · Phase 6 complete: Instagram API route (ISR 1h), live feed + fallback, next.config remotePatterns.
- 2026-03-29 · Phase 7 complete: Full Sanity CMS blog system — schemas, studio, queries, /blog index,
  /blog/[slug] post template with ToC + NewsletterSignup, /api/revalidate webhook, /api/newsletter.
- 2026-03-29 · Phase 8 complete: Snipcart shop (DOM conflict fix applied), SnipcartInit, 4 products,
  /shop page with tab filter + variant picker.
- 2026-03-29 · Phase 9 partial: /about (full story + credentials + philosophy + stats) and /contact
  (react-hook-form + zod + Resend) built and passing TypeScript. 12 routes total, all clean.
- 2026-03-29 · Phase 9 complete: /reviews (featured story cards + client quotes + Google reviews) and
  /quiz (5-question multi-step quiz with animated transitions + program result logic, QuizClient.tsx).
  18 routes total, all TypeScript clean, all static. Next: Phase 10 SEO.
- 2026-03-29 · Quality/SEO/docs polish: fixed lint issues in animation + quiz files, added missing
  route metadata for `/` and `/contact`, replaced the placeholder README, and aligned `progress.md`
  with the current repo state. Verification complete: `npm run lint` ✅, `npm run build` ✅.

---

*This file is the project memory. Keep it current after every commit.*
