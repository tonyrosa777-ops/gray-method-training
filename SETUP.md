# Gray Method Training — Launch Checklist

---

## Adam's To-Do List (Before the Call)

- [ ] **GoDaddy** — Log in at godaddy.com → Account → Delegate Access → grant Anthony **Manager** access using his email
- [ ] **Resend** — Create a free account at resend.com with a password comfortable sharing, then send Anthony the credentials
- [ ] **Calendly** — Create account, set up a discovery call event, send Anthony the booking link URL
- [ ] **Instagram** — Switch to a Business or Creator account if not already
  - Instagram app → Settings → Account → Switch to Professional Account
  - Keeps all posts and followers — nothing changes publicly
- [ ] **Behold.so** — Create a free account at behold.so → Create Feed → connect Instagram → copy the **Feed ID** (looks like `aBcDeFgHiJkLmNoP`) → send it to Anthony
  - That's it. No Facebook page. No Developer Console. No tokens. No expiry headaches.

---

## Anthony's To-Do List (After the Call, On Your Own Time)

### DNS — GoDaddy
- [ ] Add Vercel **A record**: Type `A` · Name `@` · Value `76.76.21.21` · TTL `600`
- [ ] Add Vercel **CNAME**: Type `CNAME` · Name `www` · Value `cname.vercel-dns.com` · TTL `600`

### Resend
- [ ] Resend dashboard → Domains → **Add Domain** → enter `graymethodtraining.com` → copy the DNS records Resend gives you and add them in GoDaddy while you're already in there
- [ ] API Keys → Create Key → copy it

### Vercel — Environment Variables
- [ ] Project → Settings → Environment Variables → add all of the following:

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | From Resend dashboard |
| `NEXT_PUBLIC_SITE_URL` | `https://graymethodtraining.com` |
| `NEXT_PUBLIC_CALENDLY_URL` | From Adam |
| `NEXT_PUBLIC_BEHOLD_FEED_ID` | Feed ID from Adam's Behold account |

- [ ] Vercel → Deployments → **Redeploy** (env vars don't apply until a fresh deploy)

### Final Confirmation
- [ ] Site is live at graymethodtraining.com
- [ ] Vercel shows green checkmark on the domain
- [ ] Quiz works end to end
- [ ] Contact form sends email via Resend
- [ ] Calendly embed loads on contact page and quiz results screen
- [ ] Instagram feed is pulling live posts from Behold
- [ ] Instagram "Follow on Instagram" link points to `instagram.com/adamgray_coach`

---

## Why Behold Instead of the Meta Developer API

The Meta Developer approach requires creating a Facebook Developer app, generating short-lived tokens, exchanging for long-lived tokens, storing in Redis, setting up Vercel cron jobs, and managing 60-day expiry windows. That's 15 steps and multiple failure points.

Behold replaces all of that with one Feed ID. Adam connects his Instagram once through an OAuth screen — Behold handles everything else including token refresh automatically. Free tier refreshes every 24 hours. $8/month refreshes every hour.

For a fitness coach's Instagram feed, 24-hour refresh on the free tier is completely fine.

---

## Common Failure Points

**Adam has a Personal Instagram account**
Behold requires Business or Creator. Confirm he switched before the call — Instagram → Settings → Account → Switch to Professional Account. Takes 30 seconds, nothing changes publicly.

**Feed ID not set**
The component returns null gracefully if `NEXT_PUBLIC_BEHOLD_FEED_ID` is missing — no broken section, just nothing displayed. Set the env var and redeploy.

**Env vars not applied**
Vercel requires a fresh deploy after adding env vars. Always redeploy after updating them or nothing will work.

**Calendly URL wrong**
Open Adam's Calendly link in a browser before adding it. The event type must exist and be published or the embed will fail silently.

---

## Photos — Drop In and Done

Drop Adam's photos into `/public/images/` with these exact filenames. No code changes needed.

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
| `og-image.jpg` | Social share / Open Graph (1200×630) |

Minimum dimensions: 1200px wide for hero images, 600px for square/portrait.

---

*Last updated: 2026-04-06*
*Gray Method Training*
*Questions: Anthony Rosa / Optimus Business Solutions*
