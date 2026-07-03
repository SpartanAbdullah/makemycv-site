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
