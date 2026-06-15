# MakeMyCV Marketing Site — Living Doc / memory.md

This file tracks the current state of the marketing site and recent changes. Update it on every working session.

## Architecture (current)

- Next.js 16 (App Router), TailwindCSS, hosted on Vercel.
- Blog content: MDX files in `content/blog/`, compiled at build time by **Velite** into `.velite/`. The `build` script is `velite build && next build`.
- Blog data access lives in `lib/blog.ts` (`getAllPosts`, `getFeaturedPosts`, etc.).
- Blog listing page: `app/blog/page.tsx`. Single post page: `app/blog/[slug]/page.tsx`.

## Change Log

### 2026-06-15 — JD Match launch + honesty/privacy + free (Ko-fi) pricing reframe

Marketing-site refresh to showcase the builder's new features and align with the honest brand. **All changes are local on `preview` (uncommitted) — see `CHANGES-2026-06-15-jd-match.md` for the full rationale, risks, and the exact commit command (stage only the files below to avoid the CRLF churn).**

**New flagship page `/jd-match`** (`app/jd-match/page.tsx` + `components/jd-match/`): hero with a green/amber **HeatmapPreview**, `JdMatchSteps` (heatmap → guided coach → tailor & download), `HonestMatching` (the wedge: AI declines rather than invents + smart alias matching + privacy), `JdMatchFAQ` (+exported items for FAQ schema), `JdMatchFinalCTA`. SoftwareApplication/FAQ/Breadcrumb JSON-LD. Added to `Navbar`, `Footer`, `sitemap.ts` (priority 0.95). CTAs land on the **builder** (`app.makemycv.ae`) by design — you build/import a CV first, then match.

**Home** (`app/page.tsx`): hero reframed to lead with JD Match + honesty; added `JdMatchSection` (home teaser) and reused `HonestMatching`; `FeatureGrid` now covers import (PDF/DOCX, read in-browser), per-job tailoring, UAE-optimised, and **honest AI rewriting** (replaced the old invented-metrics "AI rewriter (Pro)" card); `HowItWorks` is now build/import → match → tailor & download.

**Guardrail fixes (honest brand):** removed the debunked "75%" fear-myth (`ProblemSolution`, `resume-checker/FilterProblem`); reframed resume-checker pass/fail → "get found and ranked" (`resume-checker/page.tsx` hero + metadata); removed AI copy that fabricated metrics (`FeatureGrid`, pricing `faqItems`).

**Pricing → free + Ko-fi tip** (the live model; `$5/download` is gone). Ko-fi `ko-fi.com/makemycv_ae` primary, PayPal `paypal.me/Abdullah2431` secondary, wording **"Tip"** (never donation). New `components/SupportTip.tsx` + new **`/support` page** (closes the app's existing broken link to `www.makemycv.ae/support`). Reframed `PricingStrip`, `FinalCTA`, `HowItWorks`, `/pricing` (hero, cards→free+tip, FAQ, JSON-LD single free offer, dropped Free-vs-Pro `ComparisonTable` from the page — file left unused), `resume-checker/PricingClarity` + `ResumeCheckerFAQ`, `about`, `contact` option, templates page "Unlock with Pro"→"Use This Template", `TemplateShowcase` badge→Free. **Kept the dormant `pro` data field** (velite schema + template MDX) for the future paid tier.

**⚠️ Not verified in-session (mount-truncation gotcha):** `velite build`/`next build`/`tsc` could not run reliably — the sandbox's `node_modules` is Windows (esbuild binary mismatch) AND bash serves Edit-modified files truncated/null-padded, so an in-sandbox typecheck produces false syntax errors. New files read fine; edited files do not. On-disk files were verified correct via the editor. **Run `npm run build` locally before deploying.** Heatmap + Guided Coach copy is faithful to the product brief; eyeball the live `/jd-match` against the app UI.

### 2026-06-15 — Conversion & presentation pass (home redesign)

Follow-on to the JD Match launch, same day. Research-backed (see `STRATEGY-conversion-redesign.md`): studied CVToolsPro (strength = Before/After instant proof + airy premium look; weakness = subscription with auto-billing complaints) and the resume-builder category's #1 pain = "free to build, pay to download" bait-and-switch. Our wedge: genuinely free to download + UAE-native + honest AI.

Changes (LOCAL on `preview`, uncommitted): hero proof visual swapped to the JD Match `HeatmapPreview` (was `CvPreviewCard`, now orphaned — kept); new `components/home/NoBaitBanner.tsx` (answers the paywall fear: free to build AND download) placed under the hero; new `components/home/BuiltForUAE.tsx`; **giant `MakeMyCV` footer wordmark** in `Footer.tsx` (aleads.co-style signature); navbar trimmed to JD Match/Templates/Pricing/Blog (About/Contact/Support live in footer); home sections reordered (hero → no-bait → JD Match → honest → problem → UAE → features → how → templates → proof → pricing → CTA). Decisions: polish within current navy/blue system; heatmap as hero proof; build full then review on preview. New components typecheck clean (scoped tsc exit 0); edited files verified via Read. Same build/commit caveat — run `npm run build` locally; commit command updated in `CHANGES-2026-06-15-jd-match.md`.

### 2026-06-15 — Polish pass: \u fix, real templates, testimonial flow

Third same-day pass (LOCAL on `preview`, uncommitted).

- **Rendering bug fixed:** `“`/`’` unicode escapes used inside **JSX attributes** (`subcopy=`, `label=`) render literally as text. Fixed the 3 affected spots — `HowItWorks` subcopy, `ProblemSolution` subcopy, `TrustSection` label (used straight quotes). NOTE for future: `\u` escapes are only safe inside JS string literals (object arrays), never raw in JSX attributes/text. The remaining `\u` in object-literal strings (FeatureGrid bodies, blog emoji maps, etc.) render fine — left as-is.
- **Templates now match the app + look real:** the `/templates` page had two crude bar-placeholder hardcoded cards — removed. New `lib/marketingTemplates.ts` is the single source of truth mirroring the app's 6 real templates (Classic, ATS Clean, Modern, Executive, Executive Split, Corporate) with honest ATS-safe/Design-led badges. `TemplateThumbnail.tsx` extended with 3 new realistic mini-CV previews (`ats-clean`, `exec-split`, `corp-sidebar`). `/templates` rebuilt as a 6-card gallery using `TemplateThumbnail`; home `TemplateShowcase` now reads `marketingTemplates` (was velite `lib/templates.ts`, now unused). Keep this list synced with `makemycv-app/lib/templates/index.tsx`.
- **Testimonial flow:** new `/share-your-story` page + `StoryForm.tsx` (consent-based; required publish-consent checkbox, optional initials-only, email private/for verification). Posts to the same Formspree endpoint as contact (`mqeykryy`) tagged `type:"Testimonial"` — swap to a dedicated form later. `TrustSection` "Send your story" now links here (was `/contact`). Page is `index:false`.
- Verified: new code scoped-tsc clean (exit 0); `TemplateThumbnail` edits verified via Read. Commit list updated in `CHANGES-2026-06-15-jd-match.md`. Still run `npm run build` locally before pushing.

### 2026-06-13 — Consolidated duplicate format guide + 9 new draft posts

**Consolidation:** `uae-cv-format-guide` (2025, 406w) fully superseded by `cv-format-uae-2026` (1410w). Set `published: false` + `featured: false` on the old post and added a permanent 301 in `next.config.ts` (`/blog/uae-cv-format-guide` → `/blog/cv-format-uae-2026`). Resolves the cannibalization flagged earlier.

**New content:** Created 9 posts as drafts (`published: false`) from UAE CV keyword research, deduped (took best version of repeated intents) and noise-filtered (dropped unrelated "autism" PAA bleed; skipped intents already covered by existing posts). 3 pillars/BOFU + 6 supporting. Full list, publish dates (Tue/Thu, 2026-06-16 → 2026-07-14), and the publish-flip instructions are in `BLOG-CONTENT-SCHEDULE.md`. All cross-linked + `app.makemycv.ae` CTAs. Drafts validated against the Velite schema (categories, title≤100, excerpt≤300, links resolve). Blog now has 19 mdx files (10 live + 9 drafts).

**Open follow-up:** drafts came in under the proposed Mix word ranges (pillars ~700–1090 vs 1400–1800); offer stands to expand the pillars.

### 2026-06-13 — Refresh stale post dates (3 of 4)

All 10 blog posts are `published: true` (0 drafts). Four carried 2025 dates and sorted to the bottom. Bumped three to recent 2026 dates: `ats-cv-checklist-uae` → 2026-06-06, `cv-for-freshers-uae` → 2026-06-03, `expat-cv-uae-guide` → 2026-06-10 (also updated its "(2025 Guide)" title, body "in 2025", and "Last updated: March 2025" footer to 2026).

**Held back:** `uae-cv-format-guide` ("UAE CV Format 2025") was NOT bumped — it's a near-duplicate of `cv-format-uae-2026` ("CV Format UAE 2026"). Refreshing it to 2026 would create two competing same-year "complete CV format guide" posts (keyword cannibalization). OPEN DECISION: consolidate the two (301 redirect `uae-cv-format-guide` → `cv-format-uae-2026`) or re-angle `uae-cv-format-guide` to a distinct intent before refreshing.


### 2026-06-13 — Fix: blog page only showed 8 of 10 posts

**Symptom:** After pushing new blog posts, the `/blog` page kept showing only 8 posts.

**Root cause (logic, not caching):** `app/blog/page.tsx` rendered two sections:
- *Featured Guides* = `getFeaturedPosts()` → `.filter(featured).slice(0, 3)` (capped at 3).
- *All Articles* = `allPosts.filter((p) => !p.featured)` → excluded **all** featured posts.

With 5 posts marked `featured: true`, only the newest 3 showed in Featured, and the All Articles grid excluded all 5 featured. Result: 3 + 5 non-featured = 8 visible; the 2 overflow featured posts (`cv-format-uae-2026`, `uae-cv-format-guide`) appeared nowhere. Velite was loading all 10 correctly — the math (10 → 8) confirmed the bug was purely in the listing logic.

**Fix:** `regularPosts` now excludes only the posts actually displayed in Featured (the top 3), so every post appears exactly once:
```ts
const featuredSlugs = new Set(featuredPosts.map((p) => p.slugPath))
const regularPosts = allPosts.filter((p) => !featuredSlugs.has(p.slugPath))
```
Now: 3 featured + 7 in All Articles = all 10 posts, no duplicates. Type-safe, no new deps, no build risk.

**Note for future:** This page has no pagination. As the post count grows, consider paginating "All Articles" rather than reintroducing any hard cap.

### 2026-06-13 — Fix: blog title background went white (missing .bg-gradient-hero)

**Symptom:** The blog page title section background changed (white-on-white / no dark backdrop).

**Root cause:** The "design system foundation" refactor (commit `cb64912`) removed the `.bg-gradient-hero` class from `app/globals.css`, but it is still referenced by the hero and CTA sections of `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, and `app/author/makemycv-team/page.tsx`. Those sections use `text-white`, so without the dark gradient they rendered on transparent/white. Unrelated to the post-listing fix — it just shipped in the same push.

**Fix:** Restored the original definition in the legacy section of `globals.css`:
```css
.bg-gradient-hero {
  background: linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%);
}
```
Fixes blog index, single post, and author pages in one place.

**Note for future:** The legacy pages (blog, author, about, contact) still depend on the pre-refactor utility classes. Worth migrating them onto the new design-system primitives so undefined-class regressions like this can't recur.

## ⚠️ Open issue — repo line endings (CRLF vs LF)

The working tree currently shows ~89 files as "changed" with near-equal +/- counts. This is a **line-ending flip**: committed files are LF, working-tree files are now CRLF. It is noise, not real edits, but if committed it will bury real diffs and cause churn for collaborators.

Recommended: add a `.gitattributes` with `* text=auto eol=lf` and re-normalize, OR set `git config core.autocrlf` consistently, before committing. When committing the two fixes above, stage **only** `app/blog/page.tsx`, `app/globals.css`, and `memory.md` to avoid pushing the CRLF churn.
