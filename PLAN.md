# PLAN — Beat JobXDubai (makemycv-site)

**Source brief:** `MakeMyCV – UAE CV Builder/geo/10_Beat_JobXDubai_ClaudeCode_Handover.md`
**Working branch:** `beat-jobxdubai` (off `main`)
**Companion log:** `PROGRESS.md` (running, updated every session)
**Last updated:** 2026-07-03

> This plan breaks the handover brief into **executable sessions**. Each session is one
> coherent, testable unit with its own acceptance criteria. Work session by session; run the
> gates (`npx tsc --noEmit` + `npm run build`) and the extractability/schema checks each time;
> commit on `beat-jobxdubai`; **never merge to `main`** (that is a STOP gate for Abdullah).

---

## 0. Reality reconciliation (Session 0 findings — the brief's table was stale)

The brief said to verify the table, not trust it. Verified 2026-07-03:

| Brief assumed | Actual state (verified by git + file reads) |
|---|---|
| Production branch: `main`; working branch: `preview` (has GEO Phase-1, diverged) | **No `preview` branch exists** (local or remote). `main` is production. `origin` has only `main` + `feat/honest-matching-visual`. `claude/*` branches are stale (79–82 behind, 0 ahead). |
| GEO Phase-1 (FAQ + schema + answer-first + llms.txt) is on `preview`, NOT live | **Already merged to `main`.** Recent commits: "feat(jd-match)… ported from preview", "feat(blog)… redesigned blog index". |
| `geo/` folder in the repo | **Not in this repo.** The `geo/*.md` reference files live in the sibling `MakeMyCV – UAE CV Builder/geo/` folder. |
| Our FAQ answers "not present in the readable DOM at all" | **Fixed.** `ResumeCheckerFAQ` uses `<details>` (answer `<p>` is in server HTML); `JdMatchFAQ`/`HomepageFAQ` render answers in the DOM. All SSR-present. |
| `/templates` shows skeleton placeholders | **True.** Still hardcodes Classic + Modern grey skeleton boxes → Phase B-T. |

**Consequence:** Phase A (get extractability work live) is **largely already done on `main`**. The
brief's core levers now are **B (out-depth) → B-T (templates) → C (calculators) → D (domain) → E (content)**.
`main`-vs-live parity still needs confirmation on the deployed site (see A-verify below).

**Existing infrastructure we reuse (do NOT rebuild):**
- `lib/seo.ts` — `buildPageMetadata`, `canonicalUrl`, `absoluteUrl`, `SITE_URL` (=`https://www.makemycv.ae`), `APP_URL`, entity `@id`s.
- `lib/seo-schema.ts` — `organizationSchema`, `websiteSchema`, `softwareApplicationSchema`, `faqPageSchema`, `breadcrumbSchema`, `postSchema` (Article+Person+Breadcrumb+conditional FAQPage).
- `components/seo/JsonLd.tsx` — server-only JSON-LD emitter (escapes `<`).
- `components/seo/AiAnswer.tsx` — **NEW (B0)**, the reusable Quick-Answer block.
- Velite collections: `posts` (16 blog MDX) + `templates` (5 MDX: classic, executive, graduate, minimal, modern).
- Design tokens (`app/globals.css`): `--color-brand-blue #2563eb`, `--color-brand-navy #0a0f1e`, `paper`, `paper-2`, `line`; `font-display` = Inter.

---

## 1. Guardrails (carried from brief §4 — these override speed)

- **Branch safety:** work only on `beat-jobxdubai`. Never commit to `main`; never auto-merge. Merge to live = Abdullah's manual STOP gate.
- **Never break:** SSR (no bare `window`/`document` at module scope; `useSearchParams` in `<Suspense>`). (No print/PDF in this repo — that's `makemycv-app`.)
- **Honesty (hard rule):** no fabricated stats/reviews/ratings. Scope privacy correctly — the **checker + JD-match + AI-improve send text server-side**; only the builder draft is browser-local. Never say "everything stays in your browser" on the tool pages.
- **Extractability:** anything meant to be cited must be in **server HTML** (verify with a build + `grep` of `.next/server/app/*.html`). FAQ answers visible-by-default or SSR-present.
- **Schema mirrors visible content.** One FAQPage entity per page (fold, don't duplicate).
- **No secrets in code / no `.env` / no auth changes.**

## 2. STOP gates (pause for Abdullah)

1. Any merge to `main` (live site) — Phase A + anything in B/C/E bound for production.
2. Live cutover of domain routing/DNS — Phase D.
3. After 5 failed self-fix attempts on one issue — report, don't thrash.

---

## 3. Sessions

Status key: ✅ done · 🔜 next · ⏳ planned · 🔒 blocked/STOP-gate · ➖ N/A (already live)

### Phase A — Get extractability work live
- **A-verify** ⏳ — Confirm `main` == live. On the deployed URLs: `/sitemap.xml` intact (all `www`); run Rich Results Test on live `/resume-checker` + `/jd-match` (FAQPage/SoftwareApplication valid); resubmit sitemap in Search Console. *Requires live access — flagged for Abdullah; cannot be done from this repo alone.* Most of Phase A's code is already on `main` (Session 0).
- 🔒 **STOP GATE 1** — any actual merge to `main`.

### Phase B — Out-depth JobXDubai + Labeeb AEO patterns
- **B0** ✅ — Reusable server-rendered `<AiAnswer>` block (pill + question H2 + boxed answer leading with "MakeMyCV…") + matching FAQPage JSON-LD; deployed on home, `/resume-checker`, `/jd-match`, `/templates`. One FAQPage per page (folded on the three pages that already had one). *Acceptance met: answer text in server HTML on all 4 pages; exactly 1 FAQPage each; branded Q in schema; gates green.*
- **B3** ✅ — Expanded `/resume-checker` FAQ from 6 → **10** real Q&As (added PDF-vs-DOCX in the UAE, "is passing the ATS enough", keyword optimization without stuffing, "why do different ATS systems score differently"). SSR-present in `<details>`; FAQPage mirrors verbatim (11 Question entities incl. the branded AiAnswer). *Acceptance met; gates green.*
- **B1** ✅ — Added dense, always-visible, server-rendered `AtsSystems` section on `/resume-checker`: names **Workday, Taleo, Greenhouse, iCIMS, Lever** with how each tends to parse a CV; restates the "60+ UAE-tuned checks" by category + "deterministic, no fixed score"; DO/DON'T two-column list. *Acceptance met: methodology sentence + all 5 systems + DO/DON'T in server HTML; gates green.*
- **B5** ⏳ — Tighten UAE angle in prose (ENOC/Emaar/ADCB/DIFC; "deterministic — no AI hallucination"). Small copy pass; can ride B1/B3.
- **B4** ⏳ — Add HowTo + confirm SoftwareApplication JSON-LD for the tool (name, UAE audience, free, no-signup, featureList). (SoftwareApplication already present; add HowTo for "how to check your CV".)
- **B2** ⏳ — Consolidate ATS + JD onto one hub: make `/resume-checker` canonical "ATS + JD match", keep `/jd-match` cross-linking/canonical-aware. **Confirm which URL engines currently cite before changing canonicals** (don't surrender an already-cited URL).
- **B6** ⏳ — Before/After sector examples (finance/DIFC, executive, tech, healthcare, oil & gas, sales): weak→strong CV-bullet rewrites with realistic UAE metrics (illustrative, not client data). Server-rendered. On `/resume-checker` or new `/cv-examples-uae`.
- **DoD (B):** AiAnswer + methodology + every FAQ answer + sector examples in `view-source`; Rich Results valid (FAQPage + HowTo + SoftwareApplication); Lighthouse SEO ≥ 95; gates green; no SSR regressions.

### Phase B-T — Fix `/templates` (real previews, not skeletons)
- **BT1** ⏳ — Enumerate templates that ACTUALLY exist in `makemycv-app` (single source of truth). Reconcile with the site's Velite `templates` collection (currently 5: classic/executive/graduate/minimal/modern). Show only real ones.
- **BT2** ⏳ — Replace grey skeleton placeholders with real previews (ideally auto-generated from the app so they never drift).
- **BT3** ⏳ — CTA deep-links into the builder with the template preselected (`?template=<slug>` the app reads).
- **BT4** ⏳ — Honesty pass: "checked against our 60+ ATS rules" only if genuinely true, else "ATS-friendly structure"; no "guaranteed"/invented counts. *(Partially started in B0: softened hero "Every template is ATS-tested" → "ATS-friendly layouts".)*
- **BT5** ✅-partial — AiAnswer block "Which CV template should I use for UAE jobs?" added in B0 (names Classic + Modern to match current visible content). **Update copy once BT1 fixes the real set.**
- **DoD:** every shown template exists in the app; previews real; CTAs preselect + reach builder; no fake claims; AiAnswer + schema in `view-source`; gates green.

### Phase C — Free-tool authority magnets (calculators)
- **C1** ⏳ Gratuity Calculator → **C2** ⏳ Notice Period → **C3** ⏳ Annual Leave / Leave Encashment.
- Each: working calc (client logic fine) + **server-rendered** shell & explanatory content (UAE Labour Law basis, worked examples) + FAQ + FAQ/HowTo schema + internal links to builder + ATS hub.
- **DoD:** correct on 3 worked examples each; explanatory text in `view-source`; schema valid; cross-links; gates green.

### Phase D — Domain consolidation (subdomain → path) 🔒
- **D1** ⏳ Prototype Vercel rewrite so `makemycv.ae/app/*` serves the app (staging only).
- **D2** ⏳ Canonicals + 301 `app.` → root path (or noindex subdomain); update internal links + sitemaps.
- **D3** ⏳ Keep reversible/staged.
- **DoD (staging):** tool fully functional at root path; one canonical set; no duplicate content; both builds green; rollback note in `PROGRESS.md`.
- 🔒 **STOP GATE 2** — live DNS/routing cutover.

### Phase E — Content + internal linking + off-site
- **E1** ⏳ Publish `adapt-indian-cv-for-uae-jobs.mdx` (check whether it already exists on `main`; brief says it was stuck on `preview`).
- **E2** ⏳ "MOHRE CV format" page (BLUF + visible FAQ + schema).
- **E3** ⏳ Internal-link tools ⇄ calculators ⇄ posts into a UAE-careers hub.
- **E4** ⏳ Off-site tracker (`geo/03`, `geo/09`) — real participation only.
- **DoD:** new pages live-ready w/ schema; internal links; off-site tracker updated.

---

## 4. Definition of "unbeatable" (brief §9)
- Next monthly audit: Q5 **and** Q6 cited on ≥ 3 engines; Q1/Q2 still on all four; ≥ 1 calculator cited.
- Every tool/calculator page: valid schema, methodology + FAQ answers in server HTML, Lighthouse SEO ≥ 95.
- One domain: tool under `makemycv.ae`, subdomain 301'd, clean canonicals.
- Living docs current; audit sheet re-run shows movement.
