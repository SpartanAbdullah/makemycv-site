# MakeMyCV — Marketing Site Roadmap

Scope: `makemycv.ae` (this repo). App scope lives in the app repo.

## Shipped

- [x] 2026-04-19 — `/resume-checker` SEO landing page (editorial hero with SVG score visual, problem hook, 2x2 category grid, staggered how-it-works, pricing clarity, native-details FAQ, final CTA band — 5 CTAs with distinct framing, data-cta-location + data-event wired to GA4 dispatcher, SoftwareApplication + FAQPage + BreadcrumbList JSON-LD, sitemap entry)

## Next up

- [ ] Generate `/og/resume-checker.png` OpenGraph image (1200x630, branded)
- [ ] Collect real social proof for `/resume-checker` (testimonials, ratings, hiring data) before enabling `aggregateRating` in the SoftwareApplication schema
- [ ] Wire Plausible or PostHog to attribute `data-cta-location` splits on `/resume-checker` (currently only GA4 generic click event)
- [ ] Homepage rebuild — separate brief, not in this milestone
