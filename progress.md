# GRAY METHOD TRAINING Ã¢â‚¬â€ PROGRESS
# Source of truth for build status. Update after every commit.
# New session? Read this file FIRST. Then CLAUDE.md. Then resume.

---

## CURRENT STATUS
**Phase:** Phase 8 reboot + pricing page launch (Stripe + custom cart + Printful APIs)
**Last commit:** feat: add gray method pricing page
**Last updated:** 2026-03-29
**Blocked by:** None

---

## PHASE 0 Ã¢â‚¬â€ READING
- [x] `/mnt/skills/public/frontend-design/SKILL.md`
- [x] `adam-gray-brand-voice.md`
- [x] `adam-gray-competitive-intelligence.md`
- [x] `initial-website-data.md`
- [x] Intelligence synthesis written (in DESIGN_CONTRACT.md)

## PHASE 0.5 Ã¢â‚¬â€ DESIGN CONTRACT
- [x] `DESIGN_CONTRACT.md` produced
  - [x] Color palette with hex values + token names
  - [x] Typography pairing + type scale
  - [x] Homepage section order (all 11 sections listed)
  - [x] Animation inventory per section
  - [x] Component list
  - [x] Photography direction + placeholder strategy (15 named slots)
- [x] Ã¢Å“â€¦ CLIENT APPROVAL RECEIVED Ã¢â‚¬â€ approved 2026-03-29

## PHASE 1 Ã¢â‚¬â€ PROJECT SETUP
- [x] `create-next-app` Ã¢â‚¬â€ Next.js 16, TypeScript, Tailwind v4, App Router, src-dir
- [x] All dependencies installed (framer-motion, sanity, radix-ui, react-hook-form, zod, etc.)
- [x] `globals.css` Ã¢â‚¬â€ Tailwind v4 @theme tokens, @utility classes, grain texture, base styles
- [x] `layout.tsx` Ã¢â‚¬â€ Cormorant Garamond + DM Sans + Space Mono, full metadata, JSON-LD, Vercel Analytics
- [x] Folder structure scaffolded: components/animations, components/ui, components/sections, components/layout, data, lib
- [x] `src/lib/photos.ts` Ã¢â‚¬â€ 15-slot photo manifest with placeholder strategy
- [x] `src/lib/utils.ts` Ã¢â‚¬â€ cn(), prefersReducedMotion(), helpers
- [x] `src/data/site.ts` Ã¢â‚¬â€ ALL copy centralized (no hardcoded strings in JSX)
- [x] `CLAUDE.md` in project root
- [x] `progress.md` in project root
- [x] `SETUP.md` Ã¢â‚¬â€ Instagram token, Sanity, ConvertKit, Calendly, Snipcart, Vercel, photos guide
- [x] `/public/images/` folder created (drop photos here)
- [x] Initial commit: `chore: project setup`

## PHASE 2 Ã¢â‚¬â€ ANIMATION PRIMITIVES Ã¢Å“â€¦
- [x] `FadeUp.tsx` Ã¢â‚¬â€ y: 40Ã¢â€ â€™0, opacity, triggerOnce, prefersReducedMotion
- [x] `FadeIn.tsx` Ã¢â‚¬â€ opacity only variant
- [x] `SlideIn.tsx` Ã¢â‚¬â€ direction prop (left/right), x offset
- [x] `ScaleIn.tsx` Ã¢â‚¬â€ scale 0.94Ã¢â€ â€™1
- [x] `StaggerContainer.tsx` + `StaggerItem` (motion.div) + `staggerItemVariants` + `staggerItemScaleVariants`
- [x] `ParallaxWrapper.tsx` Ã¢â‚¬â€ useScroll + useTransform, yRange prop
- [x] `RevealText.tsx` Ã¢â‚¬â€ character-by-character stagger, aria-label for a11y
- [x] `CountUp.tsx` Ã¢â‚¬â€ rAF loop, easeOut cubic, decimals prop
- [x] `index.ts` barrel export
- [x] All primitives: `useInView({ triggerOnce: true })` + `prefersReducedMotion` check
- [x] **FIX**: `once: true` Ã¢â€ â€™ `triggerOnce: true` (react-intersection-observer API)
- [x] **FIX**: ease arrays typed as `[number, number, number, number]`

## PHASE 3 Ã¢â‚¬â€ UI PRIMITIVES Ã¢Å“â€¦
- [x] `Button.tsx` Ã¢â‚¬â€ gold/orange/ghost variants, sm/md/lg, motion whileHover/whileTap, href or onClick
- [x] `Card.tsx` Ã¢â‚¬â€ default/gold-featured variants, shadow-card
- [x] `Badge.tsx` Ã¢â‚¬â€ default/gold/limited/category
- [x] `Divider.tsx` Ã¢â‚¬â€ gold gradient rule with Ã¢â€”â€  diamond
- [x] `Input.tsx` + `Textarea` (forwardRef) Ã¢â‚¬â€ dark field, gold focus ring, error/hint
- [x] `PhotoPlaceholder.tsx` Ã¢â‚¬â€ "use client", useState+onError fallback (no fs/path Ã¢â‚¬â€ client-safe)
- [x] `index.ts` barrel export
- [x] **FIX**: removed fs.existsSync / path imports (caused Turbopack client bundle error)

## PHASE 4 Ã¢â‚¬â€ LAYOUT Ã¢Å“â€¦
- [x] `Navbar.tsx` Ã¢â‚¬â€ transparent Ã¢â€ â€™ bg-gray-bg/95 backdrop-blur at scrollY>40, animated entry, hamburger
- [x] `MobileNav.tsx` Ã¢â‚¬â€ slide panel from right, staggered links, body scroll lock, EASE typed correctly
- [x] `Footer.tsx` Ã¢â‚¬â€ 4-column, newsletter embed slot (#newsletter-embed), social SVGs, gold top border
- [x] `index.ts` barrel export

## PHASE 5 Ã¢â‚¬â€ HOMEPAGE SECTIONS Ã¢Å“â€¦
- [x] `Hero.tsx` Ã¢â‚¬â€ word-by-word TaglineReveal, dual CTAs, heroAdam photo, 4.9Ã¢Ëœâ€¦ floating badge, scroll indicator
  - [x] **ENHANCED**: HeroParticles canvas (85 stars + 32 embers + glimmer bursts, mix-blend-mode screen)
  - [x] **ENHANCED**: "Gray Method" text-shimmer (gold gradient sweep, 5s loop)
  - [x] **ENHANCED**: Breathing orb animations (CSS @keyframes orb-breathe, 6s + 9s offset)
- [x] `HeroParticles.tsx` Ã¢â‚¬â€ rAF canvas, three particle types, prefersReducedMotion gated
- [x] `PainPoints.tsx` Ã¢â‚¬â€ "Does this sound like you?", 4-card 2Ãƒâ€”2 grid
- [x] `AdamStory.tsx` Ã¢â‚¬â€ SlideIn split layout, pull quote, two photo slots
- [x] `GrayMethodPhilosophy.tsx` Ã¢â‚¬â€ RevealText headline, 3 pillars, "Gray" watermark bg text
- [x] `Programs.tsx` Ã¢â‚¬â€ 3 cards, EEH gold-featured, badges
- [x] `Stats.tsx` Ã¢â‚¬â€ CountUp: 11+/100+/4.9Ã¢Ëœâ€¦/100%, Space Mono orange numbers
- [x] `Testimonials.tsx` Ã¢â‚¬â€ Kayla/Maureen/Deb story cards, PhotoPlaceholder Avatar with initials fallback
- [x] `InstagramFeed.tsx` Ã¢â‚¬â€ 9-tile placeholder grid (live feed in Phase 6)
- [x] `QuizCTA.tsx` Ã¢â‚¬â€ orange Button, ember orb
- [x] `BlogPreview.tsx` Ã¢â‚¬â€ 3 placeholder posts (live in Phase 7)
- [x] `FinalCTA.tsx` Ã¢â‚¬â€ RevealText headline, ScaleIn CTA
- [x] `page.tsx` Ã¢â‚¬â€ all 11 sections assembled with Dividers
- [ ] Lighthouse run: Performance ___ / Accessibility ___ / SEO ___
- [x] Build: Ã¢Å“â€¦ TypeScript clean, 4/4 static pages, 0 errors

## PHASE 6 Ã¢â‚¬â€ INSTAGRAM FEED INTEGRATION Ã¢Å“â€¦
- [x] `src/lib/instagram.ts` Ã¢â‚¬â€ fetchInstagramPosts(), truncateCaption(), InstagramPost type
- [x] `app/api/instagram/route.ts` Ã¢â‚¬â€ Graph API fetch, revalidate 3600s (build shows 1h Ã¢Å“â€¦)
- [x] `next.config.ts` Ã¢â‚¬â€ remotePatterns for cdninstagram.com + fbcdn.net
- [x] `InstagramFeed.tsx` Ã¢â‚¬â€ Server Component, live ImageTile/VideoTile/CarouselTile + PlaceholderTile fallback
- [x] Video tiles: thumbnail_url poster + play icon overlay
- [x] Carousel tiles: stacked layers icon indicator
- [x] Hover overlay: caption preview, Instagram icon
- [x] Fallback: PlaceholderGrid renders if token missing or API fails (never broken)
- [x] Dev note visible only when no token: "Add INSTAGRAM_ACCESS_TOKEN to .env.local"
- [x] Build: Ã¢Å“â€¦ TypeScript clean, /api/instagram revalidate 1h confirmed

## PHASE 7 Ã¢â‚¬â€ BLOG (Sanity CMS) Ã¢Å“â€¦
- [x] `src/sanity/env.ts` Ã¢â‚¬â€ env var exports (projectId, dataset, apiVersion, studioUrl)
- [x] `src/sanity/lib/client.ts` Ã¢â‚¬â€ getSanityClient() returns null when no projectId (build-safe)
- [x] `src/sanity/lib/image.ts` Ã¢â‚¬â€ urlFor() lazy builder with placeholder fallback
- [x] `src/sanity/lib/queries.ts` Ã¢â‚¬â€ getAllPosts, getPostBySlug, getAllPostSlugs, getRecentPosts
- [x] `src/sanity/schemaTypes/` Ã¢â‚¬â€ blockContent, post, author, category, index.ts
- [x] `sanity.config.ts` Ã¢â‚¬â€ project root, structureTool with custom structure
- [x] `src/app/studio/[[...tool]]/page.tsx` Ã¢â‚¬â€ NextStudio component
- [x] `src/app/api/revalidate/route.ts` Ã¢â‚¬â€ Sanity webhook Ã¢â€ â€™ revalidatePath /blog + /
- [x] `src/app/api/newsletter/route.ts` Ã¢â‚¬â€ ConvertKit subscribe endpoint
- [x] `src/components/blog/PostCard.tsx` Ã¢â‚¬â€ standard + featured variants
- [x] `src/components/blog/PostBody.tsx` Ã¢â‚¬â€ PortableText with custom renderers (h2/h3, blockquote, links, images)
- [x] `src/components/blog/TableOfContents.tsx` Ã¢â‚¬â€ IntersectionObserver active highlight, h2+h3
- [x] `src/components/blog/NewsletterSignup.tsx` Ã¢â‚¬â€ form Ã¢â€ â€™ /api/newsletter, success/error states
- [x] `src/app/blog/page.tsx` Ã¢â‚¬â€ editorial magazine grid, featured + grid layout, 6 placeholder posts
- [x] `src/app/blog/[slug]/page.tsx` Ã¢â‚¬â€ generateMetadata, generateStaticParams, ToC sidebar, NewsletterSignup
- [x] `BlogPreview.tsx` updated Ã¢â‚¬â€ pulls live Sanity posts, falls back to 3 placeholder posts
- [x] Build: Ã¢Å“â€¦ TypeScript clean, /blog static, /blog/[slug] SSG, /studio dynamic
- [ ] ADAM TO DO: sanity init --project-id + import posts (see SETUP.md)

## PHASE 8 Ã¢â‚¬â€ COMMERCE MIGRATION (Stripe + Custom Cart + Printful APIs)
- [x] Reference repo analyzed: `tonyrosa777-ops/andrea-abella-marie-website`
- [x] Migration direction approved: fully switch to Stripe + custom cart + Printful APIs
- [x] Phase 8 reset in `progress.md`
- [x] Design + implementation plan docs written in `docs/superpowers/`
- [x] Add `CartProvider` + `useCart`
- [x] Add global `CartDrawer` and mount from root layout
- [x] Add `Shop` to navbar and mobile nav
- [x] Add cart trigger/count in navigation
- [x] Add homepage `ShopPreview` section
- [x] Replace `src/data/shop.ts` with seeded catalog structure for Printful-backed shop
- [x] Add `src/lib/printful.ts`
- [x] Add seeded Printful fallback data
- [x] Add `/api/printful/products`
- [x] Add `/api/printful/variants/[id]`
- [x] Rebuild `/shop` around custom cart + live/fallback product data
- [x] Add `/api/stripe/checkout`
- [x] Remove Snipcart layout/init/script/CSS integration
- [x] Update `SETUP.md` from Snipcart setup to Stripe + Printful setup
- [ ] Build: TypeScript clean, shop flow verified
- [x] Add /pricing page with one-time coaching packages
- [x] Add pricing hero + three-tier packaging
- [x] Add ROI calculator based on competitive intelligence
- [x] Add package comparison chart
- [x] Add Pricing to nav and mobile nav

## PHASE 9 Ã¢â‚¬â€ REMAINING PAGES Ã¢Å“â€¦
- [x] `/about` Ã¢â‚¬â€ full story, credentials, philosophy, stats, CTA; Navbar included
- [x] `/contact` Ã¢â‚¬â€ react-hook-form + zod, /api/contact (Resend), direct contact info, 3 trust bullets
- [x] `src/app/api/contact/route.ts` Ã¢â‚¬â€ Resend email, RESEND_API_KEY + CONTACT_EMAIL_TO env vars
- [x] `loading.tsx` added for /about and /contact
- [x] `/programs` index Ã¢â‚¬â€ 3 program cards with includes list + social proof + comparison CTA
- [x] `/programs/one-on-one` Ã¢â‚¬â€ long-form sales page (6 includes, who-it's-for list, CTA)
- [x] `/programs/energize-empower` Ã¢â‚¬â€ EEH flagship, Laura Brown NP featured, gold treatment
- [x] `/programs/group` Ã¢â‚¬â€ group coaching page, limited spots badge
- [x] `/reviews` Ã¢â‚¬â€ featured story cards (Kayla, Maureen, Rachel), client quote grid (8), Google reviews (8), CTA
- [x] `/quiz` Ã¢â‚¬â€ 5-question multi-step quiz (QuizClient.tsx), animated transitions, result Ã¢â€ â€™ program recommendation
- [x] Build: Ã¢Å“â€¦ TypeScript clean, 18 routes, 0 errors

## PHASE 10 Ã¢â‚¬â€ SEO
- [x] Page-level metadata on every route
- [ ] JSON-LD: Article (blog posts) + FAQPage (programs)
- [ ] `next-sitemap` configured
- [ ] All images: descriptive alt text
- [ ] Commit: `feat: seo`

## PHASE 11 Ã¢â‚¬â€ PRE-LAUNCH QA
- [ ] Full Lighthouse audit Ã¢â‚¬â€ Performance ___ / Accessibility ___ / SEO ___
- [ ] Mobile: 375px Ã‚Â· 390px Ã‚Â· 428px Ã‚Â· 768px Ã‚Â· 1024px
- [ ] All animations: once-only, prefers-reduced-motion handled
- [ ] All forms: validation, success states, error states
- [ ] All API routes: error handling + fallback UI confirmed
- [ ] Instagram feed: live data confirmed
- [ ] `SETUP.md` complete
- [ ] Final commit: `release: gray method training v1.0`

---

## NOTES / BLOCKERS
- Next.js 16 (not 14) Ã¢â‚¬â€ Tailwind v4 CSS-first config, @theme + @utility directives, NO tailwind.config.ts
- `react-intersection-observer` uses `triggerOnce` not `once` Ã¢â‚¬â€ already fixed across all animation files
- `fs` / `path` are NOT usable in any file imported by a `"use client"` component Ã¢â‚¬â€ use useState+onError instead
- Ease arrays in Framer Motion variants must be typed `as [number, number, number, number]`
- Photo manifest: src/lib/photos.ts Ã¢â‚¬â€ 15 slots, drop files into /public/images/ Ã¢â‚¬â€ zero code changes needed
- All copy in src/data/site.ts Ã¢â‚¬â€ no hardcoded strings in JSX ever
- Hero now has full particle system (HeroParticles.tsx) + shimmer headline + breathing orbs
- globals.css has @keyframes shimmer-sweep, orb-breathe, orb-breathe-slow + @utility text-shimmer
- Quality polish pass complete: lint/build restored, missing metadata coverage filled, README refreshed, and project memory docs aligned
- Vercel first-deploy hardening added: `vercel.json` explicitly sets the framework to `nextjs`; deploy this repo from the repo root with Root Directory left blank
- Reference commerce architecture lives in `reference-andrea-shop/` locally for comparison while rebuilding Phase 8
- Phase 8 is reopened by design: old Snipcart implementation is now considered transitional and scheduled for replacement

---

## SESSION LOG
- 2026-03-29 Ã‚Â· Phase 0 read order complete, DESIGN_CONTRACT.md produced and approved.
  Phase 1 complete: scaffolded Next.js 16, installed deps, Tailwind v4 tokens,
  layout.tsx (Cormorant+DM Sans+Space Mono, metadata, JSON-LD), folder structure,
  photos.ts, site.ts, utils.ts, SETUP.md.
- 2026-03-29 Ã‚Â· Phases 2Ã¢â‚¬â€œ5 complete. All animation/UI primitives, layout, 11 homepage sections.
  Hero enhanced: HeroParticles canvas + shimmer headline + breathing orbs.
- 2026-03-29 Ã‚Â· Phase 6 complete: Instagram API route (ISR 1h), live feed + fallback, next.config remotePatterns.
- 2026-03-29 Ã‚Â· Phase 7 complete: Full Sanity CMS blog system Ã¢â‚¬â€ schemas, studio, queries, /blog index,
  /blog/[slug] post template with ToC + NewsletterSignup, /api/revalidate webhook, /api/newsletter.
- 2026-03-29 Ã‚Â· Phase 8 complete: Snipcart shop (DOM conflict fix applied), SnipcartInit, 4 products,
  /shop page with tab filter + variant picker.
- 2026-03-29 Ã‚Â· Phase 9 partial: /about (full story + credentials + philosophy + stats) and /contact
  (react-hook-form + zod + Resend) built and passing TypeScript. 12 routes total, all clean.
- 2026-03-29 Ã‚Â· Phase 9 complete: /reviews (featured story cards + client quotes + Google reviews) and
  /quiz (5-question multi-step quiz with animated transitions + program result logic, QuizClient.tsx).
  18 routes total, all TypeScript clean, all static. Next: Phase 10 SEO.
- 2026-03-29 Ã‚Â· Quality/SEO/docs polish: fixed lint issues in animation + quiz files, added missing
  route metadata for `/` and `/contact`, replaced the placeholder README, and aligned `progress.md`
  with the current repo state. Verification complete: `npm run lint` Ã¢Å“â€¦, `npm run build` Ã¢Å“â€¦.
- 2026-03-29 Ã‚Â· Vercel deploy hardening: added `vercel.json` with explicit `nextjs` framework config and
  clarified `SETUP.md` / `README.md` so first-time Vercel imports use the repo root with the correct framework preset.
- 2026-03-29 Ã‚Â· Phase 8 commerce migration kicked off. Reference repo `tonyrosa777-ops/andrea-abella-marie-website`
  analyzed locally for shop infrastructure: cart provider, cart drawer, homepage shop preview, Printful product +
  variant APIs, and Stripe checkout. Decision made to fully replace Snipcart with the same type of architecture.
  `progress.md` rewritten to reopen Phase 8 and track the migration in execution order.
- 2026-03-29 Ã‚Â· Phase 8 Task 2 complete: added `CartProvider` / `useCart`, a new global `CartDrawer`, and
  mounted both from `src/app/layout.tsx`. Snipcart script/init wiring has been removed from layout. `npm run lint` Ã¢Å“â€¦.
- 2026-03-29 Ã‚Â· Phase 8 Tasks 3-7 complete: navbar/mobile shop discovery, homepage shop preview, seeded catalog +
  Printful helper layer, Printful API routes, custom `/shop` cart flow, and Stripe checkout route added.
  `npm run lint` Ã¢Å“â€¦ and `npm run build` Ã¢Å“â€¦.

- 2026-03-29 Ã‚Â· Pricing page kickoff: user approved a real /pricing page with one-time package pricing ($1,500 / $3,000 / $5,500), to be added to the nav and built from the Xpertise pricing-page structure with Gray Method branding.
- 2026-03-29 Ã‚Â· Pricing page shipped: added `/pricing` to the shared nav, built the Gray Method pricing hero,
  three one-time tiers ($1,500 / $3,000 / $5,500), ROI calculator, and comparison chart. The page uses the local
  competitive intelligence as the pricing/ROI reference point.
- 2026-03-29 · Pricing refinement pass: removed the calculator from the Premium package copy, refocused Premium on
  commerce / checkout architecture, and turned the ROI section into a clearer sales-proof panel with stronger hierarchy,
  readability, and persuasion cues.
- 2026-03-29 · Pricing ROI readability pass: enlarged the slider controls, expanded the left calculator column, and
  added a bottom support block so the panel fills the page space more naturally.
- 2026-03-29 · Shop refinement pass: reduced the homepage ShopPreview to a smaller digital-product teaser, removed
  public-facing Printful language, and simplified the shop page labels/copy so the collection feels cleaner and more
  understated.

---

*This file is the project memory. Keep it current after every commit.*
