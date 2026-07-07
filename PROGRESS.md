# PROGRESS — Beat JobXDubai (makemycv-site)

Running log. Newest first. See `PLAN.md` for the session breakdown.
Branch: `beat-jobxdubai` (off `main`). Never merged to `main` — merges are Abdullah's STOP gate.

---

## 2026-07-03 · Session B0 — Reusable AiAnswer block ✅

**Goal:** Build the reusable "Quick Answer for AI Search" block (brief B0 — highest leverage) and
deploy it site-wide with clean schema.

**Changed**
- **New** `components/seo/AiAnswer.tsx` — server component. Pill label ("Quick Answer") +
  question-shaped H2 + boxed answer that leads with a **bolded** "MakeMyCV…" clause. Optional
  `emitSchema` (default true) emits a single-question `FAQPage` via existing `faqPageSchema()`.
  Bolding is done by slicing `answer` on the `lead` prefix, so the schema text == visible text exactly.
- `app/page.tsx` — AiAnswer after hero ("What is MakeMyCV?"); folded its Q/A as the first entity of
  the existing homepage FAQPage (`emitSchema={false}`) → one FAQPage.
- `app/resume-checker/page.tsx` — AiAnswer after hero ("What is the best free ATS CV checker for UAE
  jobs?" → answers Q5), folded into the page FAQPage. Kept the existing "What is an ATS?" definitional
  section below it.
- `app/jd-match/page.tsx` — **replaced** the plain BLUF paragraph with the boxed AiAnswer ("How do I
  check if my CV matches a UAE job description?" → answers Q6), preserving the build/import/paste
  instruction; folded into the page FAQPage.
- `app/templates/page.tsx` — AiAnswer after hero ("Which CV template should I use for UAE jobs?"),
  emits its own FAQPage (page had none). Also softened hero copy "Every template is ATS-tested" →
  "ATS-friendly layouts" (honesty; pre-empts BT4).

**Design decisions**
- **One FAQPage per page.** On the 3 pages that already had a FAQPage, AiAnswer runs `emitSchema={false}`
  and the page folds the branded Q/A into its existing FAQPage as the first `mainEntity`. Avoids the
  duplicate-FAQPage smell while still putting the branded answer in schema. Templates (no prior FAQPage)
  emits its own.
- Copy is factual, 40–65 words, entity/geo-dense, **honest about server-side processing** (JD-match/checker
  send text server-side; only the builder draft is browser-local).

**Gates & tests**
- `npx tsc --noEmit` → **exit 0** ✅
- `npm run build` → **success** ✅ (velite + next; 25/25 static pages).
- Extractability (grep of `.next/server/app/*.html`): branded lead text present on all four pages
  (`index`, `resume-checker`, `jd-match`, `templates`) ✅.
- Schema: **exactly 1 FAQPage per page** on all four (0 duplicates); branded questions confirmed inside
  the schema ✅.
- Dev-server render check (`localhost:3000/resume-checker`): status 200, lead present, `Quick Answer`
  label present, FAQPage count 1 ✅.
- Computed-style check on the box: border-radius 24px, border `#e2e8f0` (--color-line), bg `#f8fafc`
  (--color-paper-2), padding 40px, pill uppercase brand-blue `#2563eb`, answer opens with bold
  "MakeMyCV provides a free ATS CV checker…" ✅.
- **Unverified here:** live Rich Results Test (needs the deployed URL — do at A-verify / after merge).
  Preview **screenshot** tool timed out (renderer hang, env-side); verified via DOM/computed-style
  inspection + server-HTML greps instead.

**Result:** B0 acceptance met. No SSR issues; no console errors.

---

## 2026-07-07 · Sessions C2 + C3 — Notice Period & Annual Leave Calculators ✅

**Goal:** Complete the calculator suite (brief Phase C) — notice period (C2) and annual leave /
leave encashment (C3), same standard as C1: law verified first, SSR content, schema, adversarial review.

**Law verified before coding (web, authoritative sources):**
- **C2 (Articles 9 & 43, FDL 33/2021):** post-probation notice = contract figure clamped 30–90 days,
  equal for resignation/termination; probation: 14 days (employer terminates), 30 days (resign → another
  UAE employer), 14 days (resign → leaving UAE); pay in lieu = **full wage** (basic + allowances) ÷ 30 ×
  unserved days — explicitly contrasted with gratuity's basic-only basis.
- **C3 (Article 29 + Cabinet Resolution 1/2022 Art. 19):** 30 days/yr after 1 year; 2 days/month for
  6–12 months; <6 months none yet; final-year fractions pro-rata (2.5/mo); on-leave pay = full wage but
  end-of-service **encashment = basic ÷ 30 × unused days**; carry-forward up to half, encashable by
  written agreement.

**Changed (new files):** `components/tools/notice.ts` + `NoticePeriodCalculator.tsx` +
`app/notice-period-calculator/page.tsx`; `components/tools/leave.ts` + `LeaveCalculator.tsx` (dual
island: encashment + entitlement) + `app/annual-leave-calculator/page.tsx`. Wiring: both routes in
`app/sitemap.ts` (0.85) + `components/Footer.tsx`; gratuity page now cross-links the notice calculator
(3-card grid). Calculator-mesh completion deferred to E3.

**Gates & tests**
- `npx tsc --noEmit` → exit 0 ✅ · `npm run build` → success (28 static pages) ✅ (run after each of C2/C3).
- **C2 live-verified (4 cases):** 30d/12,000/serve0 → **AED 12,000**; 60d/9,000/serve45 → 15 unserved,
  **AED 4,500**; probation-employer/6,000 → **14 days, AED 2,800**; contract 120 days → **clamped to 90**
  with amber note ✅. SSR + schema: WebApplication 1, HowTo 1 (4 steps), FAQPage 1 (8 Q), Breadcrumb 1 ✅.
- **C3 live-verified (5 cases):** 9,000/15d → **AED 4,500**; 12,000/30d → **AED 12,000**; 8 months →
  **16 days**; 2y6m → **75 days** (60 + 15 pro-rata); 4 months → **0 days** with six-month explainer ✅.
  SSR + schema: WebApplication 1, HowTo 1 (3 steps), FAQPage 1 (8 Q), Breadcrumb 1 ✅.
- **C2 adversarial review** (legal w/ independent web re-check + calc + honesty/schema, skeptic-verified):
  **0 findings** — journal inspected to confirm all three agents deliberately returned empty findings ✅.
- **C3 adversarial review** (same 3-lens design; legal lens scrutinised the 2-days-per-month
  interpretation and full-wage-vs-basic distinction): legal + honesty lenses **clean**; **1 confirmed
  minor** — typing a negative "unused days" (bypassing the input's `min=0` via keyboard) showed a
  self-contradictory "AED 0 … × -5 days". **Fixed** by requiring `unusedDays > 0` in the display gate;
  re-verified live (negative input → prompt; 9,000/15 still → AED 4,500); gates re-run green.

---

## 2026-07-07 · Session B6 — UAE CV Examples page (before/after by sector) ✅

**Goal:** Ship the Labeeb-pattern sector examples (brief §1b item 5 / B6) as a dedicated
**`/cv-examples-uae`** page — keeps `/resume-checker` lean and targets the "CV examples UAE" query
cluster currently owned by KudosWall/Pika/CV-Gulf.

**Changed:** new `app/cv-examples-uae/page.tsx` — 6 sectors (banking & finance/DIFC, executive, tech,
healthcare, oil & gas, sales & retail), each with a weak duty-bullet vs a strong quantified UAE-anchored
rewrite (AED figures, scale, DIFC/DOH/ADNOC context) + a "why it works" line; prominent amber
"illustrative, not client data" banner + matching FAQ answer; AiAnswer ("What does a strong CV bullet
look like for UAE jobs?"); HowTo (4 steps: action verb → scale → quantify → honest UAE context);
FAQPage (5 Q incl. AiAnswer) + Breadcrumb; cross-links to builder + `/resume-checker`. Wired into
`app/sitemap.ts` (0.8) + footer ("UAE CV Examples").

**Gates & tests:** `tsc` exit 0 ✅; build success ✅; all 6 sectors + 6 weak/strong pairs + disclaimer in
server HTML; exactly 1 FAQPage ✅. **Adversarial review** (honesty / UAE-market plausibility — incl.
checking DOH is the right Abu Dhabi regulator / schema): **0 confirmed**; 1 plausible — the builder
cross-link said the AI rewriter "never invents facts" (absolute claim about generative AI). Softened to
"designed not to invent facts — you review every suggestion"; re-verified in built HTML + dev server.

**Note:** the calculator-mesh + linking `/resume-checker` → `/cv-examples-uae` lands with E3 (internal
linking hub) to keep this commit scoped.

---

## 2026-07-06 · Session C1 — UAE Gratuity Calculator ✅

**Goal:** Ship the first free-tool authority magnet (brief Phase C) — a UAE end-of-service gratuity
calculator that's accurate, SSR/indexable, schema-rich, and cross-linked.

**Decisions from Abdullah (this session):**
- Sitemap: **submit as-is** — it's valid, all-`www`; the 2 blog posts not listed (`best-cv-writers-uae`,
  `can-chatgpt-write-cv`) are `published: false` drafts, correctly excluded.
- Point #3: the marketing tool pages already route CTAs to `app.makemycv.ae` — no change needed. The
  "import vs build" popup idea is an **app-repo** (`makemycv-app`) enhancement — parked as a separate task.
- Point #4: **Phase B-T (templates) parked** for a dedicated slot (marked in PLAN.md).

**Changed (new files)**
- `components/tools/gratuity.ts` — pure, SSR-safe, testable calc (`computeGratuity`, `formatAed`,
  `formatAedPrecise`). Rules: <1yr → 0; daily wage = basic/30; 21 days/yr first 5, 30 days/yr after;
  basic-only; 2-year cap; pro-rated. Verified against u.ae/MOHRE-aligned sources.
- `components/tools/GratuityCalculator.tsx` — `"use client"` interactive island (salary/years/months →
  live estimate + breakdown + cap notice + MOHRE/DEWS/Article-44 disclaimer).
- `app/gratuity-calculator/page.tsx` — server page: metadata, AiAnswer (folded into FAQPage),
  calculator island, SSR "how it's calculated" + 3 worked examples + 7-item FAQ, internal links to the
  builder + `/resume-checker`. Schema: WebApplication + HowTo (5 steps) + FAQPage (8 Q) + Breadcrumb.
- `app/sitemap.ts` — added `/gratuity-calculator` (priority 0.85). `components/Footer.tsx` — added
  "ATS Checker" + "Gratuity Calculator" links (site-wide internal linking).

**Gates & tests**
- `npx tsc --noEmit` → exit 0 ✅ · `npm run build` → success (26 static pages) ✅.
- **Accuracy:** live calculator correct on all 3 worked examples — 8mo/AED7,000 → **AED 0**; 3yr/AED6,000
  → **AED 12,600**; 8yr/AED8,000 → **AED 52,000** (daily wage 266.67, 195 days) ✅.
- Extractability: method text, both example results, DEWS caveat, branded lead all in server HTML ✅.
- Schema (built HTML): WebApplication 1, HowTo 1 (5 steps), FAQPage 1 (8 Questions), Breadcrumb 1 ✅.
- Sitemap includes the route (0.85); footer link renders site-wide; no console errors ✅.
- **Adversarial review workflow** (legal-accuracy w/ web re-check + calc-correctness + honesty/schema, each
  finding skeptic-verified): law implementation confirmed correct; **1 minor finding** — worked-example
  daily wage "266.67" vs calculator's rounded "267". **Fixed** by adding `formatAedPrecise` (2 dp) for the
  daily-wage row; re-verified live shows AED 266.67 with result still AED 52,000.

**Unverified here:** live Rich Results Test (needs deployed URL — after merge). Legal accuracy is
confirmed against public sources but the page correctly frames all figures as estimates + points to MOHRE.

---

## 2026-07-03 · Sessions B4 + B5 — HowTo schema + UAE prose + honesty fix ✅

**Goal:** Add HowTo/enriched SoftwareApplication schema to the tool pages (B4) and tighten the UAE
angle in prose (B5) — while catching any honesty regressions.

**Changed**
- `components/resume-checker/HowItWorks.tsx` — `export const steps` (+ section `id="how-it-works"`) so the
  page can build HowTo from the same source as the visible steps.
- `components/jd-match/JdMatchSteps.tsx` — `export const steps` (+ `id="how-jd-match-works"`); **B5:**
  replaced the unverifiable "No other UAE builder reads the job ad back to you like this" closer with an
  honest, UAE-entity-dense line naming DIFC banking / ADNOC / Emaar.
- `components/jd-match/HonestMatching.tsx` — **B5 honesty fix (guardrail):** the "Private by design"
  pillar said *"Your CV never leaves your browser. Only the job text you paste is sent"* — false for
  JD-match/AI-improve, which send CV text server-side. Rewrote to: draft saved in browser; to run a match
  or AI rewrite the relevant CV + job text is sent to our servers, never sold/shown/used to train. Now
  consistent with the page's own FAQ + AiAnswer.
- `app/resume-checker/page.tsx` — **B4:** enriched SoftwareApplication (`description`, `audience`=UAE/GCC
  job seekers, `featureList`) + new `howToSchema` (name "How to check if your CV passes UAE ATS filters",
  3 steps from `howItWorksSteps`, `totalTime PT1M`); render `<JsonLd data={howToSchema} />`.
- `app/jd-match/page.tsx` — **B4:** same treatment; `howToSchema` "How to match your CV to a UAE job
  description" (3 steps from `jdMatchSteps`, `totalTime PT5M`).

**Gates & tests**
- `npx tsc --noEmit` → exit 0 ✅ · `npm run build` → success ✅.
- Schema (built HTML): resume-checker & jd-match each now carry **1 SoftwareApplication + 1 HowTo
  (3 HowToSteps) + 1 FAQPage** ✅. HowTo step text sourced from the visible step arrays (mirrors content).
- Honesty (built HTML): the false "CV never leaves your browser" string and the "No other UAE builder"
  absolute are **gone (0 occurrences)**; corrected privacy copy + the DIFC/ADNOC/Emaar line present ✅.
- **Adversarial review workflow** (4 independent lenses — honesty, schema-mirrors-content, extractability,
  SSR/regression — each finding skeptic-verified): **0 findings, all lenses clean** ✅.

---

## 2026-07-03 · Sessions B1 + B3 — Methodology depth + FAQ expansion ✅

**Goal:** Out-depth JobXDubai's `/ats` page with crawlable, quotable substance on `/resume-checker`.

**Changed**
- **New** `components/resume-checker/AtsSystems.tsx` (B1) — dense, always-visible section:
  - Question-shaped H2 "Which ATS systems UAE employers use — and how they read your CV."
  - Self-referential intro naming MakeMyCV + "60+ UAE-tuned checks" by category + "deterministic … no
    fixed ATS score" (honesty framing, mirrors Labeeb's "no risky guarantees").
  - Server-rendered table of **Workday, Taleo, Greenhouse, iCIMS, Lever** — common UAE users + how each
    tends to parse a CV (hedged tendencies, not fabricated guarantees).
  - DO / DON'T two-column list.
- `components/resume-checker/ResumeCheckerFAQ.tsx` (B3) — expanded `faqItems` 6 → **10**: added
  "PDF or DOCX for UAE jobs", "is passing the ATS enough", "keywords without keyword-stuffing", "why do
  different ATS systems score the same CV differently". Answers are self-contained (citation-ready) and
  honest (no fixed-score promise).
- `app/resume-checker/page.tsx` — render `<AtsSystems/>` between `WhatWeCheck` and `HowItWorks`. FAQPage
  auto-includes the 4 new items (built from `faqItems`).

**Gates & tests**
- `npx tsc --noEmit` → exit 0 ✅ · `npm run build` → success ✅.
- Server HTML (`.next/server/app/resume-checker.html`): methodology sentence, all 5 ATS names, "How it
  tends to parse", DO/DON'T headings, and all 4 new FAQ answers present ✅.
- Schema: still **1 FAQPage** on the page; **11 Question** entities (branded AiAnswer + 10 FAQ) ✅.
- Dev-server DOM check confirmed the table + DO/DON'T render (status 200) ✅.

---

## 2026-07-03 · Session 0 — Verify codebases ✅

Verified the brief's table against git + file reads. Key drift (details in `PLAN.md §0`):
- **No `preview` branch** anywhere; `main` is production; `claude/*` branches stale.
- **Phase-1 GEO work already on `main`** (answer-first blocks, FAQPage/SoftwareApplication/Breadcrumb
  JSON-LD, SSR-present FAQ answers, `public/llms.txt`).
- `geo/` reference docs live in the sibling `MakeMyCV – UAE CV Builder/geo/` folder, not this repo.
- `makemycv-app` **is** on disk (sibling folder) — usable for BT1.
- `/templates` still shows skeleton placeholders (Phase B-T target).
- Solid reusable SEO infra already present (`lib/seo.ts`, `lib/seo-schema.ts`, `components/seo/JsonLd.tsx`).

**Decision:** create working branch `beat-jobxdubai` off `main` (since `preview` no longer exists and
`main` is now production per the newer brief). Reprioritized work to **B → B-T → C → D → E**; Phase A
is mostly already live (only live-URL verification / sitemap resubmission remains, which needs Abdullah).

---

## Open items / needs-Abdullah
- **A-verify:** confirm `main` == live; run Rich Results Test on live `/resume-checker` + `/jd-match`;
  resubmit sitemap. Needs deployed-site access.
- **STOP GATE 1:** no merge to `main` performed (by design).
- **Preview screenshots** time out in this environment — using DOM/computed-style + server-HTML
  verification instead.
