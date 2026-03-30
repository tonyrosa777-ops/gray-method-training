# Phase 8 Commerce Migration Design

## Goal

Replace Gray Method Training's current Snipcart-based shop with the same overall commerce architecture used in the reference repo `tonyrosa777-ops/andrea-abella-marie-website`: custom cart state, cart drawer, homepage shop preview, `/shop` discovery flow, Printful-backed product and variant APIs, and Stripe checkout.

## Current State

Gray Method currently uses:

- `SnipcartInit.tsx` DOM injection in the root layout
- Static local product data in `src/data/shop.ts`
- A standalone `/shop` page powered by `ShopClient.tsx`
- No global cart state, cart drawer, or homepage shop preview
- No `Shop` link in the primary nav

The reference repo uses:

- `CartProvider` and `useCart` in `src/lib/cart.tsx`
- Global `CartDrawer` mounted from `src/app/layout.tsx`
- Homepage `ShopPreview`
- `Shop` in the main navigation plus a cart trigger
- Printful product and variant APIs with seeded fallback data
- Stripe checkout via `/api/stripe/checkout`

## Target Architecture

### Commerce state

Add a custom cart context that:

- stores items in local state
- persists to `localStorage`
- exposes add/remove/update/clear operations
- controls a global cart drawer

This cart replaces all Snipcart add-to-cart behavior.

### Layout-level commerce shell

The app layout should mount:

- `CartProvider`
- `CartDrawer`

This mirrors the reference repo pattern and gives every page access to cart state.

### Product data layer

The new shop should use two complementary sources:

1. Seeded local product data for stable fallback rendering and pricing
2. Printful API routes for live products and variants when credentials are configured

The Gray Method implementation should stay simpler than the reference repo where possible, but preserve the same structural boundaries:

- `src/lib/printful.ts`
- seeded product JSON or TS data
- `/api/printful/products`
- `/api/printful/variants/[id]`

### Checkout

Checkout should move to Stripe via:

- `/api/stripe/checkout`

The route should validate cart payloads, create a checkout session, and return a redirect URL.

### Frontend UX

Frontend changes required:

- add `Shop` to the main nav
- add a cart trigger in nav
- add homepage shop preview
- rebuild `/shop` around the custom cart and live product flow

The homepage preview should be integrated into the existing Gray Method visual system, not copied literally from the reference repo.

## Migration Strategy

This should be treated as a replacement, not an additive layer.

### Remove

- `SnipcartInit.tsx`
- Snipcart CSS/script in root layout
- Snipcart env/setup/docs references
- static `snipcart-add-item` integration

### Add

- cart provider and drawer
- Printful service layer and API routes
- Stripe checkout route
- homepage shop preview
- nav `Shop` link and cart trigger

### Rebuild

- `src/app/shop/page.tsx`
- `src/app/shop/ShopClient.tsx` or replacement components
- `src/data/shop.ts` into a seeded catalog shape that supports the new architecture

## Execution Order

1. Rewrite `progress.md` to reopen and replace Phase 8
2. Add planning docs for the migration
3. Build cart infrastructure and mount it in layout
4. Add nav `Shop` link and cart trigger
5. Add homepage shop preview section
6. Add Printful service layer and seeded fallback catalog
7. Add Printful product and variant API routes
8. Rebuild `/shop`
9. Add Stripe checkout route
10. Remove Snipcart remnants and update setup docs
11. Verify lint/build and update progress after each milestone

## Non-Goals

- No attempt to preserve Snipcart compatibility
- No major redesign of unrelated homepage sections
- No broad CMS changes
- No extra ecommerce features beyond what is needed to match the reference architecture
