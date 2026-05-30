# Strategic Gap Audit — makemycv.ae (marketing site)

_Audit date: 2026-04-24 · Auditor: Claude (Opus 4.7)_

---

## ⚠️ Scope clarification (read first)

This repo is **the marketing site only** (`makemycv.ae`), not the CV builder application.
- Confirmed in [ROADMAP.md:3](ROADMAP.md): _"Scope: `makemycv.ae` (this repo). App scope lives in the app repo."_
- All primary CTAs hard-link to `https://app.makemycv.ae` — a separate codebase.
- The marketing site has **no backend, no database, no auth, no payments, no AI integration, no PDF engine, no user state**. It is a pure static Next.js 16 + Velite funnel.
- The prompt assumes a full CV builder codebase ("AI provider, PDF engine, payments, data model"). Most of those questions are **unanswerable from this repo alone** and are flagged `[APP REPO]` below.

The audit below evaluates the marketing site against the portions of the target strategy it _can_ influence: **SEO, UAE positioning, funnel conversion, content moat, and compliance surface.** Strategy pieces that live in the app (MVP features, AI, payments, data model, PDPL backend, B2B auth) are noted as out-of-scope with a recommendation that a separate audit be run against the app repo.

Strategy document was not pasted into the prompt — audit uses the category framework you listed (MVP, V2, pricing, UAE fields, AI moat, SEO, PDPL, B2B).

---

## 1. Executive summary

- **Strong**: SEO foundation is genuinely solid — structured data, sitemap, GTM+GA4, Search Console verification, UAE-themed content across 9 blog posts and a dedicated resume-checker landing page. The site punches above its weight as a funnel.
- **Weak**: Zero hreflang/Arabic surface, pricing currency inconsistency (USD in copy, AED in schema), no OG image for `/resume-checker`, no aggregateRating or review schema, no programmatic SEO (no emirate × role combinatorial pages), no Arabic route.
- **Biggest risk**: Strategy requires auditing the **app repo** — MVP features, AI quality, PDPL compliance, payment integrations, and data model all live there and are invisible from here. You cannot ship a UAE-first CV product on marketing copy alone.
- **Biggest opportunity**: Programmatic SEO for UAE long-tail (e.g. `/cv-templates/dubai/marketing`, `/cv-for/adnoc-engineer`, `/arabic-cv-format`) — the content schema and Velite pipeline are already in place; adding one generator script could 10× the indexed surface.
- **Overall readiness (marketing site against its own brief)**: ~70%. Against full product strategy: **unanswerable without app-repo audit — estimate 25–40% based on marketing-side signals.**

---

## 2. What exists — inventory

### Tech stack
- **Framework**: Next.js 16.1.6, React 19.2.3, TypeScript 5, App Router
- **Content**: Velite 0.3.1 (MDX compiler) with rehype-slug, rehype-autolink-headings, remark-gfm
- **Styling**: Tailwind 4, `@tailwindcss/typography`, Inter + JetBrains Mono via `next/font/google`
- **UI libs**: `lucide-react`, `embla-carousel-react`
- **Analytics**: GTM (`GTM-5H2LMVJT`), GA4 (`G-8MWPD87FJH`), custom `data-event` dispatcher in [app/layout.tsx](app/layout.tsx)
- **Forms**: Formspree external (`formspree.io/f/mqeykryy`) — contact form only
- **Hosting clues**: Vercel (favicons, `vercel.svg`, Next.js conventions)
- **DB / Auth / Payments / AI / PDF engine**: `[APP REPO]` — none present here

### Routes
| Route | Type | Purpose |
|---|---|---|
| `/` | static | Home — hero, templates, problem/solution, pricing strip, CTA |
| `/about` | static | Brand/values |
| `/templates` | static | 5-template grid |
| `/pricing` | static | Free vs $5/download, comparison, FAQ schema |
| `/resume-checker` | static | Landing page (no tool) → funnel to app |
| `/blog` | static | 9-post listing |
| `/blog/[slug]` | dynamic | MDX reader |
| `/author/makemycv-team` | static | Single author page |
| `/contact` | static | Formspree form |
| `/sitemap.xml` | generated | [app/sitemap.ts](app/sitemap.ts) |
| `/robots.txt` | generated | [app/robots.ts](app/robots.ts) |

**No `/api/*`, no middleware, no auth state.** Fully static.

### Data model
`[APP REPO]` — nothing in this repo. Velite schemas in [velite.config.ts](velite.config.ts) cover **content only**:
- Blog post: `title, slug, excerpt, date, author, category, tags, coverImage, featured, readingTime, published, body`
- Template: `name, slug, positioning, tags, thumbnail, accent, order, pro, published`

### AI integration
`[APP REPO]`. No prompt files, no AI SDK imports, no versioning in this repo.

### UAE-specific surface (marketing only)
| Signal | Present? | Where |
|---|---|---|
| UAE / Dubai / Abu Dhabi copy | ✅ | Hero, blog, meta, schema |
| Visa / expat messaging | ✅ | Hero meta, `expat-cv-uae-guide.mdx` |
| Emirate-specific content | 🟡 | One post: `dubai-cv-vs-abu-dhabi-cv.mdx` |
| MOHRE references | 🔴 | None |
| Arabic support (UI, route, hreflang) | 🔴 | None |
| PDPL / consent / DSAR / privacy policy | 🔴 | None in repo |
| Tabby / Tamara | 🔴 | None (checkout is in app repo) |
| AED pricing | 🟡 | Schema has `priceCurrency: "AED"`; pricing cards show USD |
| DIFC / ADNOC / Emirates Group named examples | ✅ | `cv-format-uae-2026.mdx` |

### Payment integrations
`[APP REPO]`. Marketing site advertises **Free tier + $5/download Pro tier (one-time, no subscription)** but checkout is external.

### SEO surface
- ✅ Sitemap generator with blog posts appended
- ✅ Robots.ts with `/sitemap.xml` reference
- ✅ Open Graph + Twitter cards via [lib/seo.ts](lib/seo.ts)
- ✅ JSON-LD: Organization, Website, WebApplication (home), Product+Offer+FAQPage (pricing), SoftwareApplication+FAQPage+BreadcrumbList (resume-checker)
- ✅ GTM + GA4 wired with custom event dispatcher
- ✅ Google Search Console verification meta ([app/layout.tsx](app/layout.tsx))
- ✅ Preconnect to `app.makemycv.ae`
- 🟡 Locale set to `en_AE`, but **no hreflang, no Arabic route, no `ar-AE` alternate**
- 🟠 OG image missing for `/resume-checker` (flagged in [ROADMAP.md](ROADMAP.md))
- 🔴 No programmatic SEO generation (emirate × role, company × role, industry landing pages)
- 🔴 No `aggregateRating` (correctly deferred pending real testimonials)

---

## 3. Strategy-vs-code classification

Legend: ✅ solid · 🟡 partial · 🟠 stub · 🔴 missing · ❌ misaligned · `[APP]` out of scope

### MVP features (CV builder core)
| Item | Status | Notes |
|---|---|---|
| Resume builder UI | `[APP]` | Not in this repo |
| Template selection | 🟡 (marketing) | 5 templates advertised, actual renderers in app |
| Live preview | `[APP]` | |
| PDF export (ATS-clean) | `[APP]` | |
| Account/auth | `[APP]` | |
| UAE field set (visa, emirate, nationality) | `[APP]` | |

### V2 features
| Item | Status | Notes |
|---|---|---|
| ATS checker | 🟡 landing + `[APP]` tool | `/resume-checker` is a landing page; the tool lives at `app.makemycv.ae/resume-checker` — quality of the tool cannot be assessed here |
| AI rewriter | `[APP]` + 🟡 advertised | Pricing page mentions "AI rewriter" as Pro feature |
| Cover letter | 🔴 | No mention anywhere |
| Interview prep / question bank | 🔴 | No mention |
| Arabic CV / RTL templates | 🔴 | Not advertised, no route, no copy |
| LinkedIn import | 🔴 | Not mentioned |
| Job-matching / role-targeting | 🔴 | Not mentioned |

### Pricing tiers
| Item | Status | Notes |
|---|---|---|
| Free tier | ✅ | Clear messaging, watermarked PDF |
| Pro tier ($5/download, one-time) | ✅ | Clear, non-subscription positioning |
| Tier consistency | 🟠 | USD in pricing cards vs AED in homepage schema — pick one |
| Student/graduate pricing | 🔴 | "Graduate Pro" template mentioned but no student discount tier |
| B2B / employer tier | 🔴 | Not advertised |
| Currency localization | 🟠 | AED in schema only |

### UAE-specific fields (marketing surface)
| Item | Status |
|---|---|
| Visa status in copy | ✅ |
| Emirate segmentation | 🟡 (one blog post) |
| MOHRE/Tasheel conventions | 🔴 |
| Arabic/bilingual CV | 🔴 |
| GCC cross-country positioning | 🟡 (blog mentions GCC) |
| Nationality / NOC / Iqama adjacencies | 🔴 |

### AI moat
| Item | Status |
|---|---|
| AI prompt inventory | `[APP]` |
| Prompt versioning | `[APP]` |
| Output validation | `[APP]` |
| UAE-specific fine-tuning signals | `[APP]` |
| Public AI messaging | 🟡 ("AI rewriter" mentioned, no examples shown) |

### SEO
| Item | Status |
|---|---|
| Sitemap + robots | ✅ |
| Structured data | ✅ strong |
| Blog content strategy | ✅ 9 posts, UAE-indexed |
| OG images | 🟡 home has one, `/resume-checker` missing |
| Programmatic SEO (emirate × role, company × role, industry) | 🔴 **biggest missed opportunity** |
| hreflang / Arabic alternate | 🔴 |
| Core Web Vitals instrumentation | 🟠 (GA4 only, no dedicated tracker) |
| Internal linking between blog and templates | 🟠 unverified — likely thin |

### PDPL compliance (marketing-surface artifacts)
| Item | Status |
|---|---|
| Privacy policy page | 🔴 **missing — risk** |
| Cookie consent banner | 🔴 **missing — GTM fires before consent** |
| DSAR contact / process | 🔴 |
| Data residency statement | 🔴 |
| Terms of service | 🔴 |
| "Deleted after 24h" promise on checker | ✅ (copy only — app must honor) |

### B2B readiness
| Item | Status |
|---|---|
| Employer/recruiter landing page | 🔴 |
| Bulk/team pricing | 🔴 |
| Case studies / logos | 🔴 |
| SSO / SAML messaging | 🔴 |
| API for ATS vendors | `[APP]` |

---

## 4. Feature matrix (marketing site only)

| Area | Built | Maturity | Strategic alignment |
|---|---|---|---|
| Home page | ✅ | working | ✅ on-brief |
| Templates grid | ✅ | working | ✅ |
| Pricing page | ✅ | working | 🟡 currency inconsistency |
| Resume-checker landing | ✅ | working | ✅ |
| Blog (9 posts + reader) | ✅ | working | ✅ |
| About page | ✅ | working | ✅ |
| Contact form (Formspree) | ✅ | working | 🟡 no DSAR-appropriate flow |
| Sitemap / robots | ✅ | working | ✅ |
| Structured data | ✅ | working | ✅ |
| GTM / GA4 | ✅ | working | 🟠 no consent gate |
| Google Search Console | ✅ | working | ✅ |
| OG image `/` | ✅ | working | ✅ |
| OG image `/resume-checker` | 🟠 | stub (tracked in ROADMAP) | 🟡 |
| Arabic / hreflang | 🔴 | missing | 🔴 strategic gap |
| Privacy policy / ToS / cookie banner | 🔴 | missing | 🔴 **compliance risk** |
| Programmatic SEO pages | 🔴 | missing | 🔴 missed moat |
| Employer / B2B page | 🔴 | missing | 🔴 |
| Testimonials / social proof | 🟠 | scaffold only | 🟡 (deferred intentionally per ROADMAP) |
| Author/editorial bylines beyond team | 🟠 | single team page | 🟡 |
| Template preview images | 🟡 | thumbnails only, no full preview | 🟡 |
| Template detail pages (`/templates/[slug]`) | 🔴 | no dynamic route | 🔴 SEO miss |
| Newsletter / email capture | 🔴 | missing | 🟡 |

---

## 5. Top 10 gaps (ranked: business impact × ease-to-close)

| # | Gap | Impact | Effort | Why |
|---|---|---|---|---|
| 1 | **Privacy policy + cookie consent banner** | High | Low | PDPL exposure. GTM fires before any consent gate. Ship this week. |
| 2 | **Programmatic SEO: `/cv-templates/[emirate]/[role]` or `/cv-for/[industry]`** | High | Medium | Velite + sitemap already wired. One generator script unlocks hundreds of indexable pages. Biggest marketing moat left on the table. |
| 3 | **Template detail pages `/templates/[slug]`** | High | Low | Template MDX frontmatter already exists. Currently a 5-tile dead end; each slug could be a ranking page with preview, use-case, and CTA. |
| 4 | **Arabic route + hreflang (even just `/ar` stub for landing + pricing)** | High | Medium | Addressable market doubles. Even a partial `ar-AE` alternate improves regional search signals. |
| 5 | **Pricing currency consistency** (pick AED everywhere, or show AED + USD toggle) | Medium | Low | Schema says AED, cards show USD — Googlebot and users see conflicting signals. |
| 6 | **OG image for `/resume-checker`** (already in ROADMAP) | Medium | Low | Tracked; just ship it. |
| 7 | **Cover letter landing page** | Medium | Low | Adjacent intent, cheap SEO win, feeds same app funnel. |
| 8 | **Employer / B2B landing page** | Medium | Medium | No revenue path for teams today. Even a "Hiring teams — contact us" stub unlocks enterprise inquiries. |
| 9 | **Testimonials & real social proof** (ROADMAP-tracked) | Medium | Medium (ops work, not code) | Needed before `aggregateRating` schema is honest. Deferred correctly — but someone has to go collect them. |
| 10 | **Newsletter / lead capture on blog** | Medium | Low | 9 indexed posts and zero remarketing surface. One-field email capture on blog footer would compound. |

---

## 6. Top 5 things to remove or deprecate

1. **Duplicate `FinalCTA` components** — [components/home/FinalCTA.tsx](components/home/FinalCTA.tsx) and [components/resume-checker/FinalCTA.tsx](components/resume-checker/FinalCTA.tsx). Two near-identical CTA bands; consolidate into `components/ui/FinalCTA.tsx` with variant props. Low-value duplication, not misaligned — but will bite as more landing pages ship.
2. **Single-author page `/author/makemycv-team`** — useless as a route. Either kill it (404 or redirect to `/about`) or commit to a multi-author editorial strategy. A 1-entry author directory is SEO dead weight and signals a thin site.
3. **Testimonial scaffolds in `TrustSection.tsx`** without real content — if no testimonials by next sprint, remove the placeholder rather than shipping with dummy data. Fake social proof is worse than no social proof.
4. **`StatNumber` trust chips without sourced figures** — if the "X resumes built" or similar stats aren't real, they shouldn't ship. Either wire to a real counter (from app repo) or remove.
5. **`lucide-react` at `^1.8.0`** — this is a _very_ old major. Current is 0.x scoped differently; confirm the installed package is actually the intended one and upgrade. Not a strategic gap, but a supply-chain/maintenance smell worth closing while you're in there.

---

## 7. Recommended next move

**Polish existing — with one strategic expansion.**

**Do not pivot segment.** UAE-first positioning is the strongest thing about this repo. The content, schema, and copy are coherent and on-brand. A pivot would burn the SEO moat you're starting to build.

**Do not build a new vertical on the marketing site.** The highest-leverage "new" work (employer tier, B2B, Arabic UI, AI quality) all lives in the **app repo** — building it on the marketing side without app support is theater.

**What to actually do, in order:**

1. **Close compliance gaps** (privacy policy, cookie consent, DSAR contact). 1–2 days. Unblocks legitimate UAE operation.
2. **Ship the programmatic SEO expansion** — emirate × role or industry landing pages, plus `/templates/[slug]` detail pages. 1–2 sprints. This is the single biggest marketing-side lever you have and the infrastructure is already 80% there.
3. **Fix currency + OG image + duplicate CTA cleanup.** Half a sprint.
4. **Add Arabic `/ar` stub for home + pricing** with proper hreflang. 1 sprint. Even a partial presence signals "built for UAE, not exported from a US product."
5. **Commission a parallel audit of the app repo** against the same strategy framework — everything in the "Biggest risk" section of the exec summary depends on it. **Without that audit, any strategic claim about MVP readiness, AI moat, or PDPL compliance is unverifiable.**

The marketing site is doing its job. The question isn't whether to polish it further — it's whether the thing it's pointing at (`app.makemycv.ae`) can hold up to the positioning this site is selling.

---

## 8. What this audit could not determine (audit the app repo to answer)

- Does the app actually ATS-clean the PDF, or is it just a styling layer?
- Does the "AI rewriter" advertised on pricing actually exist? How is it prompted, versioned, evaluated?
- Are there real UAE-specific fields (visa status, emirate, nationality) in the builder UI and PDF output?
- Is there Arabic / RTL template support in the builder?
- Is PDPL compliance real (consent logs, deletion flows, data residency) or copy-only?
- Are payments live? Which processor? Tabby/Tamara/Stripe/Checkout.com?
- Is the "deleted after 24h" promise on the resume-checker enforced?
- Are there any B2B / employer features, even behind a flag?
- What is the user data model and where is it hosted (UAE data residency)?

**Recommendation**: run this same audit against the app repo before any strategy meeting where readiness percentage matters.
