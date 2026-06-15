# Marketing-site refresh — JD Match launch, honesty/privacy, free (Ko-fi) pricing

**Date:** 2026-06-15 · **Branch:** `preview` (changes are LOCAL / uncommitted) · **Author:** Abdullah (with Claude)

## Goal

Update the marketing site (`www.makemycv.ae`) to showcase the builder's new features in the existing brand voice and design, for a UAE job-seeker audience — without breaking the honest brand or existing SEO.

## What shipped (this change set)

### 1. New flagship page `/jd-match`
- `app/jd-match/page.tsx` — hero (navy, leads with "See how your CV matches any UAE job") + `HeatmapPreview` visual + SoftwareApplication / FAQPage / Breadcrumb JSON-LD.
- `components/jd-match/HeatmapPreview.tsx` — signature green/amber heatmap mock (emerald = on CV, amber = gap), clearly labelled "Illustration".
- `components/jd-match/JdMatchSteps.tsx` — heatmap → Guided Coach → Tailor & download.
- `components/jd-match/HonestMatching.tsx` — the wedge: AI declines rather than invents (worked SAP-ERP example), smart alias matching (M365 = Microsoft 365), privacy promise. **Reused on the home page too.**
- `components/jd-match/JdMatchFAQ.tsx` — 6 FAQs (+ exported items for schema).
- `components/jd-match/JdMatchFinalCTA.tsx` — CTA into the builder.
- Wired into `Navbar`, `Footer`, `sitemap.ts` (priority 0.95).

### 2. Home page (`app/page.tsx`)
- Hero (`HeroSection.tsx`) reframed to lead with JD Match + honesty; secondary CTA → `/jd-match`.
- Added `components/home/JdMatchSection.tsx` (teaser) high on the page; inserted `HonestMatching` after the feature grid.
- `FeatureGrid.tsx` — replaced the old "AI rewriter (Pro)" card that **invented metrics** with honest AI rewriting; added Import (PDF/DOCX, read in-browser) and per-job Tailoring; "UAE-optimised".
- `HowItWorks.tsx` — now build/import → match → tailor & download.
- Home metadata reframed (drops `$5`).

### 3. Honesty guardrail fixes (existing copy that violated the new brief)
- **Removed the debunked "75%" fear-myth:** `components/home/ProblemSolution.tsx` and `components/resume-checker/FilterProblem.tsx`.
- **Pass/fail → "get found and ranked":** `app/resume-checker/page.tsx` hero + metadata description.
- **Removed fabricated-metric AI examples:** `FeatureGrid.tsx`, `components/pricing/faqItems.ts`.

### 4. Pricing → free + optional Ko-fi tip (the live model)
The `$5/download` model is gone everywhere on the marketing site. Source of truth (from the app repo): Ko-fi primary `ko-fi.com/makemycv_ae`, PayPal secondary `paypal.me/Abdullah2431`, wording **"Tip"** (never "donation"/"membership"), "Built by Abdullah, a solo developer in Dubai", pay-it-forward frame.
- New `components/SupportTip.tsx` (reusable tip surface) and new **`/support` page** — this also **closes a live broken link**: the app links to `https://www.makemycv.ae/support`, which did not exist.
- Reframed: `PricingStrip`, `FinalCTA`, `HowItWorks`, `/pricing` (`PricingHero`, `PricingCards` → free + tip, `faqItems`, page JSON-LD → single free offer; dropped `ComparisonTable` from the page — file left in place but unused), `resume-checker/PricingClarity` + `ResumeCheckerFAQ`, `app/about`, `app/contact` subject option, `app/templates` ("Unlock with Pro" → "Use This Template"), `TemplateShowcase` badge → "Free".
- **Kept the dormant `pro` data field** (velite schema + template MDX) so the planned post-license paid tier can return without a rebuild.

## Claim provenance (truthfulness)
- **Code-verified** against the app repo (`docs/jd-match-spec.md`, `app/api/jd-match/rewrite-bullet/route.ts`): match score + matched/missing by category; score *bands* (not pass/fail); "CV never leaves the browser, only `jobText` is sent and isn't persisted"; the rewrite endpoint's default answer is `[]` (declines rather than invents); alias matching (Excel = Microsoft Excel). Tip handles verified in `.env.example` / `DECISION_LOG.md`.
- **Brief-sourced framing** (faithful to the product owner's description; eyeball against live UI): the literal green/amber **heatmap on the pasted JD** and the **Guided Coach** "one fix at a time, shows score lift". These are the visual/UX expression of the verified matched/missing + apply-fix engine.

## Guardrails honored
No "beat the ATS" / "75% auto-rejected" / "pass the bots". Score framed as get-found-and-ranked. Only live features marketed. Reused existing design tokens/components; mobile-first. SEO preserved + extended (new page metadata, JSON-LD, sitemap).

## ⚠️ Risks / not verified
- **Build NOT run in-session.** The sandbox `node_modules` is Windows (esbuild binary won't run on the Linux sandbox), and the bash mount serves Edit-modified files truncated/null-padded, so `tsc`/`velite`/`next build` produce false errors there. On-disk files were verified correct via the editor. **➜ Run `npm run build` locally before deploying.** Imports and JSX balance were checked manually; no real errors expected.
- `components/pricing/ComparisonTable.tsx` is now unused (kept for the future paid tier). Delete later if the paid tier doesn't reuse it.
- Confirm the Ko-fi dashboard still matches the documented contract ($3 default / $1 min / contributor list OFF / wording "Tip").

## Follow-ups (not done here)
- Blog posts (`content/blog/*`) still contain mild "filtered out" phrasing and one post mentions the old `$5` model (`cv-maker-dubai.mdx`) — out of scope this pass; refresh separately.
- Consider a `.gitattributes` (`* text=auto eol=lf`) to stop the CRLF churn that marks ~70 untouched files as modified.

## How to ship (run locally — do NOT rely on the sandbox build)

```bash
# from the repo root
npm run build          # verify velite + next build pass

# stage ONLY the real changes (avoids the CRLF churn on untouched files)
git add \
  app/jd-match app/support app/share-your-story \
  components/jd-match components/SupportTip.tsx components/home/JdMatchSection.tsx \
  lib/marketingTemplates.ts \
  app/page.tsx app/pricing/page.tsx app/resume-checker/page.tsx app/templates/page.tsx \
  app/about/page.tsx app/contact/ContactForm.tsx app/sitemap.ts \
  components/Navbar.tsx components/Footer.tsx \
  components/home/HeroSection.tsx components/home/FeatureGrid.tsx components/home/HowItWorks.tsx \
  components/home/ProblemSolution.tsx components/home/PricingStrip.tsx components/home/FinalCTA.tsx \
  components/home/TemplateShowcase.tsx components/home/NoBaitBanner.tsx components/home/BuiltForUAE.tsx \
  components/home/TemplateThumbnail.tsx \
  components/pricing/PricingHero.tsx components/pricing/PricingCards.tsx components/pricing/faqItems.ts \
  components/resume-checker/FilterProblem.tsx components/resume-checker/PricingClarity.tsx \
  components/resume-checker/ResumeCheckerFAQ.tsx \
  memory.md CHANGES-2026-06-15-jd-match.md STRATEGY-conversion-redesign.md

git commit -m "feat(jd-match): launch JD Match page + honesty/privacy sections; free Ko-fi pricing"
git push origin preview     # → Vercel preview URL to review before merging to main
```
