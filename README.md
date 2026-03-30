# Gray Method Training

Marketing site, blog, quiz, and light commerce app for Coach Adam Gray, built with Next.js 16 and React 19.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Sanity Studio + `next-sanity`
- Stripe + Printful
- React Hook Form + Zod

## Project Structure

```text
gray-method-training/
â”œâ”€â”€ src/app/                  App Router pages, layouts, API routes
â”œâ”€â”€ src/components/           Layout, section, UI, blog, and animation components
â”œâ”€â”€ src/data/                 Centralized site and shop copy/data
â”œâ”€â”€ src/lib/                  Shared helpers and integrations
â”œâ”€â”€ src/sanity/               Sanity env, client, queries, and schema types
â”œâ”€â”€ public/                   Static assets
â”œâ”€â”€ progress.md               Project memory and phase tracking
â””â”€â”€ SETUP.md                  Environment and deployment setup guide
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run build
```

## Environment Setup

Create `.env.local` in the project root and configure the services described in [SETUP.md](./SETUP.md):

- Instagram Graph API
- Sanity CMS
- ConvertKit
- Stripe + Printful
- Resend
- Optional analytics providers

## Content and Brand Rules

- Project-specific instructions live in [CLAUDE.md](./CLAUDE.md) and [AGENTS.md](./AGENTS.md).
- Centralized marketing copy lives in `src/data/site.ts`.
- Shop product data lives in `src/data/shop.ts`, with Printful helpers in `src/lib/printful.ts`.
- Session history and build status live in [progress.md](./progress.md).

## Deployment

Deploy to Vercel from this repo root with:

- Framework Preset: `Next.js`
- Root Directory: leave blank

This repo also includes [vercel.json](./vercel.json) to make the framework explicit for first-time imports. Full deployment notes and required environment variables are documented in [SETUP.md](./SETUP.md).
