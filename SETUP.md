# GRAY METHOD TRAINING — SETUP GUIDE
# Pro Plan: Blog · Instagram · Calendly · AI Image Generation
# Complete all items before go-live

---

## GO-LIVE CHECKLIST

Work through this in order. Every item is required unless marked optional.

- [ ] GoDaddy delegate access granted to Anthony (Adam does this — 5 min)
- [ ] Resend account created + graymethodtraining.com domain verified
- [ ] Resend API key added to Vercel env vars
- [ ] DNS configured in GoDaddy: A record + CNAME + 3 Resend verification records
- [ ] Custom domain added in Vercel → Settings → Domains
- [ ] SSL confirmed green in Vercel
- [ ] All env vars added to Vercel (see section below)
- [ ] `NEXT_PUBLIC_SITE_URL` set to `https://graymethodtraining.com` in Vercel
- [ ] Calendly event type created + URL added to Vercel env vars
- [ ] Instagram Business Account connected to Facebook Page
- [ ] Instagram long-lived token generated + added to Vercel env vars
- [ ] All photos dropped into `/public/images/` (see Photos section)
- [ ] Contact form tested end-to-end (email received by Adam)
- [ ] fal.ai API key added to Vercel env vars
- [ ] ConvertKit API key + form ID added *(optional at launch)*

---

## ENVIRONMENT VARIABLES

### `.env.local` — local development (never commit this file)

```bash
# Resend — contact form emails (REQUIRED)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL_TO=Graymethodtraining@gmail.com

# Calendly — contact page booking embed (REQUIRED)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/YOUR_USERNAME/discovery-call

# fal.ai — AI image generation for blog posts (REQUIRED)
FAL_KEY=your_fal_api_key_here

# Instagram Graph API (REQUIRED for live feed)
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_account_id_here

# Site URL — change to production URL in Vercel
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ConvertKit — newsletter (optional at launch)
CONVERTKIT_API_KEY=your_api_key
CONVERTKIT_FORM_ID=your_form_id
```

### Add ALL of the above to Vercel

Vercel → Project Settings → Environment Variables. Change `NEXT_PUBLIC_SITE_URL` to `https://graymethodtraining.com` in Vercel (not localhost).

---

## RESEND — CONTACT FORM EMAIL (CRITICAL)

Every contact form submission sends Adam an email. Without Resend configured, he receives nothing.

**Step 1 — Create account:**
Sign up at resend.com. Free tier is 100 emails/day — more than enough.

**Step 2 — Verify graymethodtraining.com:**
1. Resend dashboard → Domains → Add Domain → enter `graymethodtraining.com`
2. Resend gives you 3 DNS records. Add them in GoDaddy (see DNS section below):
   - SPF TXT record
   - DKIM TXT record
   - DMARC TXT record
3. Click Verify in Resend. Turns green within 5–15 minutes.

**Step 3 — Get the API key:**
1. Resend dashboard → API Keys → Create API Key
2. Name: "Gray Method Production" · Permission: Sending access
3. Copy the key (starts with `re_`)
4. Add to Vercel: `RESEND_API_KEY=re_xxxx`

**What gets emailed to Adam on every submission:**
- Visitor's name, email, phone, goal
- Which problems they selected
- Their message
- Reply-to is set to the visitor's email so Adam can hit Reply directly

---

## DNS — GODADDY TO VERCEL

### Step 1 — Add custom domain in Vercel first
Vercel → Project → Settings → Domains → Add Domain
- Add `graymethodtraining.com`
- Add `www.graymethodtraining.com`
Vercel shows you the exact record values — use those.

### Step 2 — Add records in GoDaddy
GoDaddy → My Products → graymethodtraining.com → DNS → Manage DNS

**Apex domain — graymethodtraining.com:**
> GoDaddy does not allow CNAME at the root. Use an A record.

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `76.76.21.21` | 600 |

**WWW subdomain:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `cname.vercel-dns.com` | 600 |

**Resend email verification — add after Resend shows you the values:**

| Type | Name | Value |
|------|------|-------|
| TXT | `@` | `v=spf1 include:amazonses.com ~all` |
| TXT | `resend._domainkey` | (DKIM value from Resend dashboard — copy exactly) |
| TXT | `_dmarc` | `v=DMARC1; p=none;` |

### Step 3 — Confirm in Vercel
Wait 5–30 minutes for DNS propagation. Both domains should show a green checkmark in Vercel. SSL is auto-provisioned — no action needed.

---

## GODADDY DELEGATE ACCESS (Anthony)

Adam grants Anthony access so Anthony can manage DNS without sharing credentials.

**Adam does this (5 minutes):**
1. godaddy.com → click name top right → Account Settings
2. Left sidebar → **Delegate Access**
3. Click "Grant Access"
4. Enter Anthony's email
5. Access level: **Products & Domains**
6. Click Invite

Anthony receives an email to accept. After accepting he can manage DNS under Adam's account.

---

## CALENDLY

1. Log in at calendly.com
2. Create event type: "Free Discovery Call with Coach Adam" — 20 minutes
3. Copy the booking URL
4. Add to Vercel: `NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/YOUR_USERNAME/discovery-call`

The contact form booking step is pre-filled with the visitor's name and email, and styled with the site's dark gold palette automatically.

---

## INSTAGRAM — LIVE FEED

Adam's Instagram must be a **Business account** connected to a **Facebook Page** (not personal, not Creator).

**Steps:**
1. Go to developers.facebook.com → Create App → Consumer → add "Instagram Graph API" product
2. Under Instagram → Generate Access Token for Adam's account
3. Convert to a **long-lived token** (60-day expiry):
   ```
   GET https://graph.facebook.com/v18.0/oauth/access_token
     ?grant_type=fb_exchange_token
     &client_id={app-id}
     &client_secret={app-secret}
     &fb_exchange_token={short-lived-token}
   ```
4. Set a recurring reminder to refresh the token every 50 days
5. Add to Vercel: `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_BUSINESS_ACCOUNT_ID`

**Handle:** @adamgray_coach

---

## CONVERTKIT — NEWSLETTER (optional at launch)

1. Log in at app.convertkit.com
2. Forms → use existing or create new
3. Copy the Form ID from the URL
4. Account → Settings → Advanced → API Key
5. Add to Vercel: `CONVERTKIT_API_KEY` and `CONVERTKIT_FORM_ID`

The newsletter form in the footer and inline blog embed both call `/api/newsletter`. If ConvertKit is not configured, signups are silently accepted without being recorded — configure this before running any email campaigns.

---

## FAL.AI — BLOG POST IMAGE GENERATION

Each blog post gets a quality AI-generated hero image matched to the post topic. fal.ai runs the generation on the server via an API route — Adam never needs to source or upload images manually.

**Step 1 — Get the API key:**
1. Sign up at fal.ai
2. Dashboard → API Keys → Create new key
3. Copy the key
4. Add to Vercel: `FAL_KEY=your_key_here`
5. Add to your local `.env.local` as well

**How it works in the site:**
- When Adam publishes a post in Sanity without a `mainImage`, the blog post page calls `/api/generate-image` with the post title and category
- fal.ai generates a 1280×720 image (16:9) using a fitness/health-appropriate prompt built from the post metadata
- The image is returned and displayed as the post hero
- If fal.ai is not configured, the `blog-default.jpg` placeholder is used instead — no broken images

**Recommended model:** `fal-ai/flux/schnell` (fast, high quality, good for editorial images)

---

## PHOTOS — DROP IN AND DONE

Drop Adam's photos into `/public/images/` with these exact filenames. No code changes needed — placeholders are replaced automatically.

| Filename | Used in |
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

Minimum dimensions: 1200px wide for hero images, 600px for square/portrait.

---

## VERCEL DEPLOYMENT

Root Directory must be **blank** — the Next.js app is at the repo root.

1. Push to GitHub: `github.com/tonyrosa777-ops/gray-method-training`
2. Vercel → New Project → import repo
3. Framework Preset: **Next.js**
4. Root Directory: **leave blank**
5. Add all environment variables
6. Deploy

**If you see `404: NOT_FOUND` after deploy:**
Check that Framework Preset is Next.js and Root Directory is blank. Redeploy.

---

*Last updated: 2026-04-06*
*Gray Method Training — Pro Plan*
*Questions: Anthony Rosa / Optimus Business Solutions*
