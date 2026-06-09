# SEO/GEO Implementation — Audit & Plan (makemycv-site)

> **Branch:** `seo-geo-implementation` (off `main`). Do not merge to `preview` (production) without manual review.
> **Spec source:** `SEO-IMPLEMENTATION-CHECKLIST.md`, `BLOG-CONTENT-PROTOCOL.md`, `llms.txt` (provided by stakeholder, not in repo).

## What was already in place
- `lib/seo.ts`: shared metadata helpers (`buildPageMetadata`, `canonicalUrl`, `absoluteUrl`) and `@id` entity constants.
- Homepage `app/page.tsx`: Organization + WebSite + WebApplication graph.
- Blog post `app/blog/[slug]/page.tsx`: inline Article + BreadcrumbList.
- Resume checker `app/resume-checker/page.tsx`: SoftwareApplication + FAQPage + BreadcrumbList.
- Velite content pipeline parses 10 MDX blog posts; sitemap auto-built from them.
- Nav consistency: Navbar + Footer both show "Support"; `/pricing → /support` redirect already wired in `next.config.ts`.

## Audit gaps

| ID | Finding | Source | Phase |
|----|---------|--------|-------|
| B1a | `StatNumber` SSRs `display=0` so crawlers see `0+ / 0.0s / < 0 min` | `components/ui/StatNumber.tsx:36-38`, `TrustSection.tsx:81-99` | 1 |
| B1b | "Used by 12,400+ job seekers…" is unverifiable | `HeroSection.tsx:70-73` | 1 |
| B2  | "Placeholder — real quote pending" testimonial visible on prod | `TrustSection.tsx:38, 136` | 1 |
| B3  | (Nav already consistent in code — no change needed) | — | — |
| B4  | Four 2025-dated posts + two "2025 Guide" titles | `content/blog/*.mdx` | 1 |
| B5a | Blog Article `author` is `Organization`, spec requires `Person` linked to `/about` | `blog/[slug]/page.tsx:98-102` | 2 |
| B5b | No FAQPage schema on homepage or blog posts | — | 2/3 |
| B5c | Organization schema missing `description`, `founder`, `contactPoint`, `areaServed.@type`, `availableLanguage` | `app/page.tsx:50-61` | 2 |
| B5d | Posts have no `dateModified` separate from `date` (freshness signal) | `velite.config.ts:13` | 2 |
| §2.1 | `/resume-checker` lacks first-100-words ATS definition + named UAE employers | `app/resume-checker/page.tsx` | 3 |
| §2.3 | No homepage FAQ section | — | 3 |
| §4  | No `/public/llms.txt` | — | 4 |

## Integrity rule applied
Per stakeholder brief: **no fabricated proof.** Where the live site exposes unverifiable numbers (the SSR-`0` stat counters, the "12,400+" microproof line, the labelled placeholder testimonial), this implementation removes/de-numericises them and replaces with verifiable product facts (free, no sign-up, browser-only data, ATS-tested, UAE-specific fields) plus honest freshness framing ("Built for the 2026 UAE hiring season"). Real numbers can be wired back in later once they exist.

## Phase plan

### Phase 1 — Credibility
- `components/home/TrustSection.tsx`: drop numeric Stat counters → 4 verifiable-claim tiles. Replace placeholder testimonial card with 3 "share your story" collection cards.
- `components/home/HeroSection.tsx`: replace microproof line with freshness framing.
- `content/blog/*.mdx`: bump four 2025-dated posts to 2026; rename "2025 Guide" titles.

### Phase 2 — Schema
- New `components/seo/JsonLd.tsx` (server-only, no deps).
- New `lib/seo-schema.ts` with `organizationSchema()`, `websiteSchema()`, `softwareApplicationSchema()`, `postSchema(post)` (returns Article + Person + Breadcrumb + conditional FAQPage).
- Add optional `dateModified` and optional `faqs: [{q,a}]` to Velite Post schema (backwards compatible).
- Move Organization+WebSite into `app/layout.tsx` (site-wide).
- Switch homepage WebApplication → SoftwareApplication per §1.3.
- Wire `postSchema()` into `app/blog/[slug]/page.tsx` (author becomes `Person` linked to `/about`).
- Templates page: SoftwareApplication block.

### Phase 3 — Answer-first + homepage FAQ
- `/resume-checker`: insert definition paragraph naming Emaar / ADCB / ENOC / ADNOC + ~75% rejection in first 100 words after the hero CTA row.
- `components/home/FAQ.tsx`: 3 canonical Q/As (Is MakeMyCV free? / Will my CV pass UAE ATS filters? / Should a UAE CV include visa status and nationality?); FAQPage schema mirrors them verbatim.

### Phase 4 — llms.txt
- Drop the spec's `llms.txt` content into `/public/llms.txt`. No `app-llms.txt` — the app has no docs/help section, per the spec's own warning in §4.

### Verify (every phase)
- `npx tsc --noEmit` ✅
- `npm run build` ✅

### Hard constraints honored
- No new deps.
- SSR-safe (no `window`/`document` at module scope; JSON-LD emitted server-side via the new `<JsonLd>` server component).
- No print/PDF or `@react-pdf/renderer` touched (not in this repo).
- Schema text mirrors visible content.
- Branch discipline: only `seo-geo-implementation`; never `preview`.
