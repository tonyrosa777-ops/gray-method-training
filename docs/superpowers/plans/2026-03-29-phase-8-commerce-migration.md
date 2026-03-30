# Phase 8 Commerce Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing Snipcart shop with a Stripe + custom cart + Printful API architecture modeled on the reference repo.

**Architecture:** Gray Method will move from a page-local Snipcart integration to a layout-level commerce shell: cart provider, cart drawer, homepage shop preview, a rebuilt `/shop` flow, Printful-backed product data routes, and Stripe checkout. The migration should be incremental but replacement-oriented, so docs and progress tracking move over before old Snipcart assumptions are removed from the codebase.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Framer Motion, Stripe, Printful API

---

### Task 1: Reopen and replace Phase 8 in project memory

**Files:**
- Modify: `progress.md`
- Create: `docs/superpowers/specs/2026-03-29-phase-8-commerce-migration-design.md`
- Create: `docs/superpowers/plans/2026-03-29-phase-8-commerce-migration.md`

- [ ] Replace the completed Snipcart Phase 8 checklist in `progress.md` with a new migration checklist for Stripe + custom cart + Printful APIs.
- [ ] Update `CURRENT STATUS`, notes, and session log so the project memory shows commerce migration as active work.
- [ ] Save the approved design and implementation plan docs alongside project memory.

### Task 2: Add core cart infrastructure

**Files:**
- Create: `src/lib/cart.tsx`
- Create: `src/components/shop/CartDrawer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] Add `CartProvider` and `useCart` modeled on the reference repo, with localStorage persistence and drawer state.
- [ ] Add a global `CartDrawer` component and mount it from the root layout.
- [ ] Keep the implementation focused on cart operations only; checkout remains separate.

### Task 3: Add commerce discovery to navigation and homepage

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/MobileNav.tsx`
- Create: `src/components/sections/ShopPreview.tsx`
- Modify: `src/components/sections/index.ts`
- Modify: `src/app/page.tsx`

- [ ] Add `Shop` to primary navigation.
- [ ] Add a cart trigger/count surface in navigation.
- [ ] Add a homepage shop preview section that fits Gray Method’s existing visual system and links to `/shop`.

### Task 4: Replace static shop data with seeded catalog + Printful service layer

**Files:**
- Modify or replace: `src/data/shop.ts`
- Create: `src/lib/printful.ts`
- Create: `src/lib/printful-seeded-products.json`

- [ ] Reshape product data so it supports seeded fallback plus live Printful mapping.
- [ ] Add Printful service helpers for sync products and variant detail retrieval.
- [ ] Keep env access and error handling explicit so the shop still renders without live Printful credentials.

### Task 5: Add Printful-backed API routes

**Files:**
- Create: `src/app/api/printful/products/route.ts`
- Create: `src/app/api/printful/variants/[id]/route.ts`

- [ ] Add a live products route with seeded fallback.
- [ ] Add a variant-detail route for size/color selection and pricing.

### Task 6: Rebuild the shop page around the new architecture

**Files:**
- Modify: `src/app/shop/page.tsx`
- Replace or split: `src/app/shop/ShopClient.tsx`
- Create as needed: `src/components/shop/*`

- [ ] Replace the Snipcart button flow with custom add-to-cart behavior.
- [ ] Support category filtering and variant selection informed by Printful data.
- [ ] Preserve the Gray Method brand voice and visual language while using the reference repo’s structural pattern.

### Task 7: Add Stripe checkout

**Files:**
- Create: `src/app/api/stripe/checkout/route.ts`
- Modify: `src/components/shop/CartDrawer.tsx`

- [ ] Add a checkout session route that validates cart payloads and returns a Stripe checkout URL.
- [ ] Wire the cart drawer checkout action to the new route.

### Task 8: Remove Snipcart and update setup/docs

**Files:**
- Remove or stop using: `src/components/SnipcartInit.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `SETUP.md`
- Modify: `README.md`
- Modify: `progress.md`

- [ ] Remove Snipcart script/CSS/init wiring from layout.
- [ ] Replace setup docs and env docs with Stripe + Printful requirements.
- [ ] Update progress notes as each milestone lands.

### Task 9: Verify and close the migration slice

**Files:**
- Modify: `progress.md`

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Record verification results in `progress.md`.
