# Pre-Launch Checklist

## Environment & secrets
- [ ] Replace all `PLACEHOLDER` values in `.env.local`
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` set to real WhatsApp Business number (international format, no `+`)
- [ ] `NEXT_PUBLIC_GA_ID` set to real GA4 measurement ID
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` set to real Meta Pixel ID
- [ ] `NEXT_PUBLIC_GOOGLE_VERIFICATION` token added in `app/layout.tsx`
- [ ] `NEXT_PUBLIC_META_VERIFICATION` token added in `app/layout.tsx`

## Legal / business identity (Razorpay merchant compliance)
- [ ] Replace `[Legal Entity Name Pvt. Ltd.]` everywhere with actual registered name (`lib/constants.ts`)
- [ ] Replace `[Registered Business Address...]` with real address
- [ ] Replace `+91 XXXXX XXXXX` with real support phone
- [ ] Replace `hello@pillr.in` if a different support email is finalised
- [ ] Add real Grievance Officer name in `app/privacy/page.tsx`

## Content
- [ ] Replace placeholder testimonials in `components/sections/Testimonials.tsx`
- [ ] Add real founder photo + bio in `app/about/page.tsx`
- [ ] Confirm coverage areas in `lib/constants.ts → COVERAGE_AREAS`
- [ ] Update partner-pharmacy count if "50+" claim changes

## Assets
- [ ] Replace `public/og-image.png` with a real 1200×630 social card
- [ ] Optionally replace `public/icon.png` with a 512×512 PWA icon (currently the logo)

## Compliance pages (Razorpay/Meta/Google)
- [ ] `/privacy` reviewed by counsel
- [ ] `/terms` reviewed by counsel
- [ ] `/refund` reviewed by counsel
- [ ] CDSCO disclaimer visible in footer on all pages — verified
- [ ] Legal entity name + address + phone + email visible in footer — verified
- [ ] All legal pages linked from footer — verified

## Analytics & tracking
- [ ] Set up Google Search Console, add verification token, submit `sitemap.xml`
- [ ] Set up Google Analytics 4 property + add measurement ID env var
- [ ] Set up Meta Business Manager, verify domain `pillr.in`, add Pixel ID env var
- [ ] Confirm `whatsapp_click`, `partner_form_submit`, `contact_form_submit` events fire

## Deployment
- [ ] Connect custom domain `pillr.in` in Vercel
- [ ] Add `www.pillr.in` for canonical redirect (handled by `vercel.json`)
- [ ] All env vars added to Vercel project settings
- [ ] HTTPS enforced (default on Vercel)

## QA before public launch
- [ ] Test on a real Android device on 4G
- [ ] Test on a real iPhone (Safari)
- [ ] Lighthouse audit: target 90+ on Performance, A11y, Best Practices, SEO
- [ ] Tap every WhatsApp CTA — verify number + prefilled message
- [ ] Submit Partner form — verify WhatsApp message contains all fields
- [ ] Submit Contact form — verify WhatsApp message contains all fields
- [ ] Visit `/random-path` — verify 404 page renders
- [ ] Print `/privacy` — verify print stylesheet renders cleanly

## Phase 1 follow-ups (post launch)
- [ ] Replace WhatsApp form handoff with API → Airtable / webhook for the partner & contact forms
- [ ] Replace Coverage waitlist `mailto:` with real list capture
- [ ] Replace placeholder testimonials with real pilot quotes
