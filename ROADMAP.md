# MakeMyCV — Marketing Site Roadmap

Scope: `makemycv.ae` (this repo). App scope lives in the app repo.

_Last updated: 2026-08-02_

## Shipped

- [x] 2026-08-02 — `/resignation-letter-generator` (law-computed notice via shared `notice.ts` logic — Art. 43 clamp + Art. 9 probation cases, computed last working day, optional paragraphs, copy/.txt download, fully in-browser; AiAnswer + FAQPage/HowTo/WebApplication schema; wired into footer, CareerToolLinks, sitemap, notice-calculator CTA)
- [x] 2026-04-19 — Navbar ATS Checker CTA (outline style, before primary CTA, visible on all pages, active state on `/resume-checker`)
- [x] 2026-04-19 — HowItWorks section redesign (dense 3-card layout with inline SVG step illustrations, tighter copy)
- [x] 2026-04-19 — `/resume-checker` SEO landing page (editorial hero with SVG score visual, problem hook, 2x2 category grid, staggered how-it-works, pricing clarity, native-details FAQ, final CTA band — 5 CTAs with distinct framing, data-cta-location + data-event wired to GA4 dispatcher, SoftwareApplication + FAQPage + BreadcrumbList JSON-LD, sitemap entry)

## Next up

- [ ] **Arabic version of the resignation letter** — toggle inside `/resignation-letter-generator` producing the same letter in formal Arabic (RTL preview, same law-computed notice facts, Art. 43/9 citations). Many UAE HR departments file both languages; no competitor tool offers it (validated 2026-08-02: Dr.Job requires sign-up + has no law logic; all other results are static English templates). Needs a native-quality Arabic legal-letter template review before ship — do not machine-translate blind.
- [ ] Generate `/og/resume-checker.png` OpenGraph image (1200x630, branded)
- [ ] Collect real social proof for `/resume-checker` (testimonials, ratings, hiring data) before enabling `aggregateRating` in the SoftwareApplication schema
- [ ] Wire Plausible or PostHog to attribute `data-cta-location` splits on `/resume-checker` (currently only GA4 generic click event)
- [ ] Homepage rebuild — separate brief, not in this milestone
