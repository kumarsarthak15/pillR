# PillR.in — Marketing Site

Phase 0 conversion-focused marketing site for **PillR.in**, a 30-minute medicine delivery service in Pune, India. Built with Next.js 14 App Router. No backend; conversions flow to WhatsApp.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom — no UI library)
- Framer Motion (animations, respects `prefers-reduced-motion`)
- lucide-react (icons)
- Google Fonts via `next/font` (Bebas Neue, Nunito, Inter)
- Vercel hosting (free tier)
- Google Analytics 4 + Meta Pixel (env-gated)

## Setup

```bash
git clone <repo-url>
cd "pillR Website"
npm install
cp .env.example .env.local
# fill in real values for WhatsApp number, GA ID, Pixel ID, etc.
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm start` — run prod build
- `npm run lint` — Next/ESLint
- `npm run typecheck` — `tsc --noEmit`

## Deployment

1. Push to GitHub.
2. Import repo into Vercel.
3. Add the env vars from `.env.example` in Vercel project settings.
4. Add custom domain `pillr.in` (and `www.pillr.in` for the canonical redirect handled by `vercel.json`).
5. Deploy.

## Folder Structure

```
app/                  Next.js App Router pages (homepage + 6 pages + sitemap/robots/manifest)
components/
  layout/             Navbar, Footer, Logo
  sections/           Hero, HowItWorks, WhyPillr, StatsBar, Testimonials, ForShopsTeaser, Coverage, FinalCTA, FAQ, LandingOverlay, HeroCapsule
  ui/                 Reusable UI primitives (WhatsAppButton, LegalPageLayout)
  forms/              PartnerForm, ContactForm
  analytics/          MetaPixel
lib/                  constants.ts, utils.ts, animations.ts, useCountUp.ts, analytics.ts
public/               Static assets (logo.png, favicon.svg, icon.png, og-image.png)
```

## Placeholders to Replace Before Launch

See [`CHECKLIST.md`](./CHECKLIST.md). Highlights:
- WhatsApp number, support phone & email
- Legal entity name, registered address (Razorpay compliance)
- GA4 ID, Meta Pixel ID, Google + Meta verification tokens
- Real testimonials (currently illustrative placeholders)
- OG image (currently a copy of the logo — replace with proper 1200×630)
- Founder bio + photo on `/about`
