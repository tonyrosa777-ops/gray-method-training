# GRAY METHOD TRAINING — SETUP GUIDE
# For Adam and the Optimus team
# Complete all items before go-live

---

## GO-LIVE CHECKLIST

Work through this in order. Every item is a blocker unless marked optional.

- [ ] Resend account created + graymethodtraining.com domain verified
- [ ] Resend API key added to Vercel env vars
- [ ] DNS configured in GoDaddy (A record + CNAME + Resend verification records)
- [ ] Custom domain added in Vercel project settings
- [ ] SSL confirmed green in Vercel
- [ ] Instagram Business Account connected to Facebook Page
- [ ] Instagram long-lived token generated + added to Vercel env vars
- [ ] Sanity project initialized + project ID added to Vercel env vars
- [ ] Adam invited to Sanity as editor
- [ ] ConvertKit forms created + API key + form ID added to Vercel env vars
- [ ] Calendly event type created + URL added to Vercel env vars
- [ ] `NEXT_PUBLIC_SITE_URL` updated to `https://graymethodtraining.com` in Vercel
- [ ] All photos dropped into `/public/images/` (see Photos section below)
- [ ] Blog posts migrated into Sanity
- [ ] Contact form tested end-to-end (email received by Adam)
- [ ] PostHog project created + key added (optional at launch)
- [ ] Google Business Profile updated with new URL
- [ ] Shop/Stripe/Printful configured (can launch without this)

---

## ENVIRONMENT VARIABLES

### For `.env.local` (local development — never commit this file)

```bash
# Resend (contact form emails)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL_TO=Graymethodtraining@gmail.com

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

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/YOUR_USERNAME/discovery-call

# Site URL (use production URL in Vercel, localhost here)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe + Printful (Phase 8 — Shop, not required at launch)
STRIPE_SECRET_KEY=your_stripe_secret_key
PRINTFUL_API_KEY=your_printful_api_key
PRINTFUL_STORE_ID=your_printful_store_id

# PostHog Analytics (optional at launch)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Add ALL of the above to Vercel (except NEXT_PUBLIC_SITE_URL — change that one):

In Vercel → Project Settings → Environment Variables:
- `NEXT_PUBLIC_SITE_URL` = `https://graymethodtraining.com` (not localhost)
- All others: exact same values as .env.local

---

## RESEND (Contact Form Email) — CRITICAL

The contact form (`/contact`) sends Adam an email every time someone submits. It uses Resend. Without this, Adam never receives contact leads.

**Step 1 — Create account:**
1. Sign up at resend.com (free tier: 100 emails/day, 3,000/month — more than enough)
2. Verify your email

**Step 2 — Add and verify graymethodtraining.com:**
1. Resend dashboard → Domains → Add Domain
2. Enter: `graymethodtraining.com`
3. Resend gives you 3 DNS records to add in GoDaddy (see DNS section below for exact steps):
   - SPF TXT record
   - DKIM TXT record
   - DMARC TXT record
4. After adding them, click "Verify" in Resend
5. Verification turns green within 5–15 minutes

**Step 3 — Get the API key:**
1. Resend dashboard → API Keys → Create API Key
2. Name it: "Gray Method Production"
3. Permission: Sending access
4. Copy the key — it starts with `re_`
5. Add to Vercel env vars: `RESEND_API_KEY=re_xxxx`

**What the contact form sends:**
- `from`: `noreply@graymethodtraining.com`
- `to`: value of `CONTACT_EMAIL_TO` (defaults to `Graymethodtraining@gmail.com`)
- `reply_to`: the visitor's email address (so Adam can just hit Reply)
- Subject: `New contact from [Name] — Gray Method`
- Body: name, email, phone, goal, message + which problems they selected

---

## DNS — GODADDY TO VERCEL

Adam's domain (`graymethodtraining.com`) is registered at GoDaddy. Anthony needs delegate access to make these changes (see GoDaddy Delegate Access section below).

### Step 1 — Add custom domain in Vercel first

1. Vercel → Project → Settings → Domains
2. Click "Add Domain"
3. Enter: `graymethodtraining.com`
4. Also add: `www.graymethodtraining.com`
5. Vercel shows you the exact records to add — use those values

### Step 2 — Add records in GoDaddy

Log in to GoDaddy → My Products → graymethodtraining.com → DNS → Manage DNS

**Apex domain (graymethodtraining.com):**
> GoDaddy does not support CNAME at the root. Use an A record.

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `76.76.21.21` | 600 |

**WWW subdomain:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `cname.vercel-dns.com` | 600 |

**Resend email verification (add after Resend gives you the values):**

| Type | Name | Value |
|------|------|-------|
| TXT | `@` | `v=spf1 include:amazonses.com ~all` |
| TXT | `resend._domainkey` | (DKIM value from Resend dashboard) |
| TXT | `_dmarc` | `v=DMARC1; p=none;` |

> Resend will show you the exact values — copy them character-for-character.

### Step 3 — Confirm in Vercel

1. After adding records, go back to Vercel → Domains
2. Wait 5–30 minutes for DNS to propagate
3. Both `graymethodtraining.com` and `www.graymethodtraining.com` should show a green checkmark
4. SSL is auto-provisioned by Vercel — no action needed

---

## GODADDY DELEGATE ACCESS (Anthony)

Adam needs to grant Anthony delegate access so Anthony can manage DNS without sharing login credentials.

**Adam does this (5 minutes):**
1. Log in to GoDaddy at godaddy.com
2. Click your name (top right) → Account Settings
3. Left sidebar → **Delegate Access**
4. Click "Grant Access"
5. Enter Anthony's email address
6. Access level: **"Products & Domains"** (this allows DNS management)
7. Click Invite

**Anthony will receive an email with a link to accept.** After accepting, Anthony can log in to GoDaddy and manage DNS under Adam's account without seeing the password.

---

## INSTAGRAM ACCESS TOKEN

Adam needs to grant access to his Instagram Business Account.

**Requirements:**
- Adam's Instagram must be a **Business account** (not personal, not Creator)
- The Business account must be **connected to a Facebook Page**

**Steps:**
1. Go to: developers.facebook.com
2. Create an App → Consumer → add "Instagram Graph API" product
3. Under Instagram → Generate Access Token for the account
4. Convert to a **long-lived token** (lasts 60 days):
   ```
   GET https://graph.facebook.com/v18.0/oauth/access_token
     ?grant_type=fb_exchange_token
     &client_id={app-id}
     &client_secret={app-secret}
     &fb_exchange_token={short-lived-token}
   ```
5. Set a recurring reminder to refresh this token every 50 days
6. Add to Vercel env vars: `INSTAGRAM_ACCESS_TOKEN=...`

**Instagram handle:** @adamgray_coach

---

## SANITY CMS

**Steps:**
1. `cd gray-method-training && npx sanity@latest init`
2. Choose: Create new project → name: "Gray Method Training" → dataset: production
3. Copy the Project ID from the Sanity dashboard → add to Vercel: `NEXT_PUBLIC_SANITY_PROJECT_ID`
4. Create an API token: sanity.io/manage → project → API → Tokens → Add token (Editor role)
5. Add to Vercel: `SANITY_API_TOKEN`
6. Studio is available at `/studio` once deployed
7. Invite Adam's email from sanity.io/manage → Members so he can publish posts

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
5. Add both to Vercel: `CONVERTKIT_API_KEY` and `CONVERTKIT_FORM_ID`

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
4. Add to Vercel: `NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/YOUR_USERNAME/discovery-call`

The contact form calendar embed is pre-filled with the visitor's name and email, and is styled with the site's dark palette. The only thing needed is the correct Calendly URL above.

---

## PRINTFUL (Phase 8 — Shop, not required at launch)

**Steps:**
1. Create store at printful.com
2. Copy the Printful API key → `PRINTFUL_API_KEY`
3. Copy the store ID → `PRINTFUL_STORE_ID`
4. Seed merch products in `src/lib/printful-seeded-products.json`
5. Keep fulfillment notifications enabled for live production stores

---

## VERCEL DEPLOYMENT

**Important:** The Next.js app is at the repo root. In Vercel, leave Root Directory **blank**.

**Steps:**
1. Push to GitHub: `github.com/tonyrosa777-ops/gray-method-training`
2. Import to vercel.com → New Project → import repo
3. Framework Preset: **Next.js**
4. Root Directory: **leave blank**
5. Add all environment variables (see Environment Variables section above)
6. Deploy

**If you see `404: NOT_FOUND` on the first deploy:**
1. Open Vercel project settings
2. Confirm Framework Preset is `Next.js`
3. Confirm Root Directory is blank
4. Redeploy the latest production build

---

## GOOGLE BUSINESS PROFILE

1. Verify ownership at: business.google.com
2. Ensure listing shows: "Gray Method Training" · "Online Fitness Coach" · Henniker, NH
3. Update website to: graymethodtraining.com
4. Request reviews from existing clients — link to the Google review page
5. Add all services listed in the site

---

## POSTHOG ANALYTICS (optional at launch)

1. Sign up at posthog.com (free tier is sufficient to start)
2. Create project: "Gray Method Training"
3. Copy Project API Key → `NEXT_PUBLIC_POSTHOG_KEY`
4. Configure capture:
   - Page views: auto
   - Key events: discovery call clicks, quiz starts, newsletter signups

---

## PHOTOS — HOW TO ADD THEM

Drop Adam's photos into `/public/images/` using these exact filenames. No code changes required — placeholders are automatically replaced.

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

Recommended formats: JPG for photos. Minimum dimensions: 1200px wide for hero images, 600px for square/portrait. Next.js handles WebP conversion automatically.

---

*Last updated: 2026-04-06*
*Questions: Contact Optimus Business Solutions*
