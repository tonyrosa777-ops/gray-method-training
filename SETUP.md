# GRAY METHOD TRAINING — SETUP GUIDE
# For Adam and the Optimus team
# Complete all items before go-live

---

## ENVIRONMENT VARIABLES

Create a `.env.local` file in the project root (never commit this file):

```bash
# Instagram Graph API
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_account_id_here

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# ConvertKit
CONVERTKIT_API_KEY=your_api_key
CONVERTKIT_FORM_ID=your_form_id

# Snipcart (Phase 8 — Shop)
NEXT_PUBLIC_SNIPCART_API_KEY=your_snipcart_public_key

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## INSTAGRAM ACCESS TOKEN

Adam needs to grant access to his Instagram Business Account.

**Steps:**
1. Adam must have a **Business Instagram account** connected to a **Facebook Page**
2. Go to: https://developers.facebook.com/
3. Create an App → Consumer → add "Instagram Graph API" product
4. Under Instagram → Generate Access Token for the account
5. Convert to a **long-lived token** (lasts 60 days):
   ```
   GET https://graph.facebook.com/v18.0/oauth/access_token
     ?grant_type=fb_exchange_token
     &client_id={app-id}
     &client_secret={app-secret}
     &fb_exchange_token={short-lived-token}
   ```
6. Set up a cron job or reminder to refresh this token every 50 days
7. Paste the long-lived token into `INSTAGRAM_ACCESS_TOKEN`

**Instagram handle:** @adamgray_coach

---

## SANITY CMS

**Steps:**
1. `cd gray-method-training && npx sanity@latest init`
2. Choose: Create new project → name: "Gray Method Training" → dataset: production
3. Copy the Project ID from the Sanity dashboard into `NEXT_PUBLIC_SANITY_PROJECT_ID`
4. Create an API token: sanity.io/manage → project → API → Tokens → Add token (Editor role)
5. Studio is available at `/studio` in development
6. Adam's login: invite his email from sanity.io/manage → Members

**Content types:**
- `post` — blog posts (title, slug, mainImage, body PortableText, category, publishedAt, seoTitle, seoDescription)
- `author` — Adam Gray (name, bio, image)
- `category` — blog categories

---

## CONVERTKIT

**Steps:**
1. Log in at app.convertkit.com
2. Go to: Forms → Create a new form or use existing
3. Copy the Form ID from the URL
4. Go to: Account → Settings → Advanced → API Key
5. Paste both into `.env.local`

**Forms needed:**
- Newsletter signup (footer)
- Inline blog embed (after ~800 words in posts)
- Quiz result capture (linked to quiz outcome sequences)

---

## CALENDLY

**Steps:**
1. Log in at calendly.com
2. Create event type: "Free Discovery Call with Coach Adam" — 20 minutes
3. Copy the booking URL
4. Update `src/data/site.ts` → `discoveryCallUrl` with the Calendly embed URL
5. For embedded widget: use Calendly inline embed in `/contact` page

**Format:** `https://calendly.com/adamgray/discovery-call`

---

## SNIPCART (Phase 8 — Shop)

⚠️ IMPORTANT: Read `/mnt/skills/user/snipcart-nextjs-dom-conflict/SKILL.md` before building the shop. Known DOM conflict issue.

**Steps:**
1. Create account at snipcart.com
2. Go to: Account → API Keys → copy Public API Key
3. Configure currency: USD
4. Add domain whitelist: graymethodtraining.com
5. Connect Printful for merch fulfillment

**Reference implementation:** github.com/tonyrosa777-ops/andrea-abella-marie-website

---

## PRINTFUL (Phase 8 — Merch)

**Steps:**
1. Create store at printful.com
2. Connect to Snipcart via API
3. Products: t-shirts, hoodies with Gray Method branding
4. Webhook: configure fulfillment notifications

---

## VERCEL DEPLOYMENT

**Important from project memory:** Root Directory setting must be LEFT BLANK in Vercel Project Settings → General if Next.js is deployed from the repo root.

If deploying from the `gray-method-training/` subdirectory, set Root Directory to: `gray-method-training`

**Steps:**
1. Push to GitHub: `github.com/[org]/gray-method-training`
2. Import to vercel.com → New Project → import repo
3. Framework: Next.js (auto-detected)
4. Root Directory: `gray-method-training` (if in subdirectory)
5. Add all environment variables from `.env.local`
6. Deploy

**Custom domain:** graymethodtraining.com
- DNS: Add CNAME record pointing to Vercel
- SSL: Auto-provisioned by Vercel

---

## GOOGLE BUSINESS PROFILE

1. Verify ownership at: business.google.com
2. Ensure listing shows: "Gray Method Training" · "Online Fitness Coach" · Henniker, NH
3. Add website: graymethodtraining.com
4. Request reviews from existing clients — link to Google review page
5. Add all services listed in the site

---

## POSTHOG ANALYTICS

**Steps:**
1. Sign up at posthog.com (free tier is sufficient to start)
2. Create project: "Gray Method Training"
3. Copy Project API Key → `NEXT_PUBLIC_POSTHOG_KEY`
4. Configure capture:
   - Page views: auto
   - Button clicks: tag CTA buttons with `data-ph-capture-attribute`
   - Key events: discovery call clicks, quiz starts, newsletter signups

---

## PHOTOS — HOW TO ADD THEM

1. Drop Adam's photos into `/public/images/` using these exact filenames:

| Filename | Used In |
|---|---|
| `hero-adam.jpg` | Hero section — right panel |
| `adam-story-main.jpg` | Adam's story section |
| `adam-story-secondary.jpg` | Adam's story — small inset |
| `adam-about-full.jpg` | /about page hero |
| `adam-coaching.jpg` | Programs section |
| `testimonial-kayla.jpg` | Testimonials — Kayla |
| `testimonial-maureen.jpg` | Testimonials — Maureen |
| `testimonial-deb.jpg` | Testimonials — Deb |
| `testimonial-rachel.jpg` | Testimonials — Rachel |
| `laura-brown.jpg` | EEH program card |
| `eeh-hero.jpg` | /programs/energize-empower |
| `adam-bjj.jpg` | /about — BJJ section |
| `adam-life.jpg` | /about — life section |
| `blog-default.jpg` | Blog fallback image |
| `og-image.jpg` | Social share / Open Graph (1200×630) |

2. No code changes required — placeholders automatically replaced.
3. Recommended formats: JPG for photos, WebP for optimized output (Next.js handles conversion automatically)
4. Minimum dimensions: 1200px wide for hero images, 600px for square/portrait

---

*Last updated: 2026-03-29*
*Questions: Contact Optimus Business Solutions*
