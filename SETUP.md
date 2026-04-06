# GRAY METHOD TRAINING ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â SETUP GUIDE
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

# Stripe + Printful (Phase 8 ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Shop)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PRINTFUL_API_KEY=your_printful_api_key
PRINTFUL_STORE_ID=your_printful_store_id
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
3. Create an App ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ Consumer ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ add "Instagram Graph API" product
4. Under Instagram ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ Generate Access Token for the account
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
2. Choose: Create new project ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ name: "Gray Method Training" ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ dataset: production
3. Copy the Project ID from the Sanity dashboard into `NEXT_PUBLIC_SANITY_PROJECT_ID`
4. Create an API token: sanity.io/manage ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ project ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ API ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ Tokens ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ Add token (Editor role)
5. Studio is available at `/studio` in development
6. Adam's login: invite his email from sanity.io/manage ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ Members

**Content types:**
- `post` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â blog posts (title, slug, mainImage, body PortableText, category, publishedAt, seoTitle, seoDescription)
- `author` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Adam Gray (name, bio, image)
- `category` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â blog categories

---

## CONVERTKIT

**Steps:**
1. Log in at app.convertkit.com
2. Go to: Forms ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ Create a new form or use existing
3. Copy the Form ID from the URL
4. Go to: Account ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ Settings ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ Advanced ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ API Key
5. Paste both into `.env.local`

**Forms needed:**
- Newsletter signup (footer)
- Inline blog embed (after ~800 words in posts)
- Quiz result capture (linked to quiz outcome sequences)

---

## CALENDLY

**Steps:**
1. Log in at calendly.com
2. Create event type: "Free Discovery Call with Coach Adam" ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â 20 minutes
3. Copy the booking URL
4. Update `src/data/site.ts` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ `discoveryCallUrl` with the Calendly embed URL
5. For embedded widget: use Calendly inline embed in `/contact` page

**Format:** `https://calendly.com/adamgray/discovery-call`

**Env var required for the contact page calendar embed:**
```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/YOUR_USERNAME/discovery-call
```
Add to Vercel → Project Settings → Environment Variables.

---

## PRINTFUL (Phase 8 — Merch)

**Steps:**
1. Create store at printful.com
2. Copy the Printful API key into PRINTFUL_API_KEY
3. Copy the store ID into PRINTFUL_STORE_ID
4. Seed merch products in src/lib/printful-seeded-products.json
5. Keep fulfillment notifications enabled for live production stores

---

## VERCEL DEPLOYMENT

**Important from project memory:** This repository is already a standalone Next.js app. In Vercel, the Root Directory should be LEFT BLANK because the app lives at the repo root.

`vercel.json` now explicitly sets `framework: "nextjs"` so first-time imports do not rely only on Vercel auto-detection.

**Steps:**
1. Push to GitHub: `github.com/[org]/gray-method-training`
2. Import to vercel.com ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ New Project ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ import repo
3. Framework Preset: **Next.js**
4. Root Directory: **leave blank**
5. Add all environment variables from `.env.local`
6. Deploy

**If you see `404: NOT_FOUND` on the first deploy:**
1. Open the Vercel project settings
2. Confirm Framework Preset is `Next.js`
3. Confirm Root Directory is blank
4. Redeploy the latest production build

That error usually means the project was created with the wrong framework/root settings, so the deployment URL exists but is not pointing at this Next.js app correctly.

**Custom domain:** graymethodtraining.com
- DNS: Add CNAME record pointing to Vercel
- SSL: Auto-provisioned by Vercel

---

## GOOGLE BUSINESS PROFILE

1. Verify ownership at: business.google.com
2. Ensure listing shows: "Gray Method Training" ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· "Online Fitness Coach" ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· Henniker, NH
3. Add website: graymethodtraining.com
4. Request reviews from existing clients ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â link to Google review page
5. Add all services listed in the site

---

## POSTHOG ANALYTICS

**Steps:**
1. Sign up at posthog.com (free tier is sufficient to start)
2. Create project: "Gray Method Training"
3. Copy Project API Key ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ `NEXT_PUBLIC_POSTHOG_KEY`
4. Configure capture:
   - Page views: auto
   - Button clicks: tag CTA buttons with `data-ph-capture-attribute`
   - Key events: discovery call clicks, quiz starts, newsletter signups

---

## PHOTOS ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â HOW TO ADD THEM

1. Drop Adam's photos into `/public/images/` using these exact filenames:

| Filename | Used In |
|---|---|
| `hero-adam.jpg` | Hero section ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â right panel |
| `adam-story-main.jpg` | Adam's story section |
| `adam-story-secondary.jpg` | Adam's story ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â small inset |
| `adam-about-full.jpg` | /about page hero |
| `adam-coaching.jpg` | Programs section |
| `testimonial-kayla.jpg` | Testimonials ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Kayla |
| `testimonial-maureen.jpg` | Testimonials ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Maureen |
| `testimonial-deb.jpg` | Testimonials ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Deb |
| `testimonial-rachel.jpg` | Testimonials ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Rachel |
| `laura-brown.jpg` | EEH program card |
| `eeh-hero.jpg` | /programs/energize-empower |
| `adam-bjj.jpg` | /about ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â BJJ section |
| `adam-life.jpg` | /about ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â life section |
| `blog-default.jpg` | Blog fallback image |
| `og-image.jpg` | Social share / Open Graph (1200ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â630) |

2. No code changes required ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â placeholders automatically replaced.
3. Recommended formats: JPG for photos, WebP for optimized output (Next.js handles conversion automatically)
4. Minimum dimensions: 1200px wide for hero images, 600px for square/portrait

---

*Last updated: 2026-03-29*
*Questions: Contact Optimus Business Solutions*
