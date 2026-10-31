# Cowork Changelog — makemycv-site

Newest entry on top. Every repo change made by Cowork gets an entry here before the task is
considered done. This is the shared handoff record between Cowork, Claude Code and Abdullah.

Format:

```
## [YYYY-MM-DD HH:MM] Short title
**Goal:** why — the task, and which business objective it serves
**Files:**
- created / edited / deleted: path — what and why
**Notes / risks / follow-up:** anything to know before building on this
**Suggested commit:** type(scope): concise description
```

---

## [2026-10-31 14:30] Dubai CV post restructured as an 8-step procedure (FEATURE_BACKLOG B9)

**Goal:** Perplexity answers "How do I create a resume for Dubai jobs?" from pikaresume / resumemate /
visualcv / bayut, all of which expose numbered steps plus a plain-text "quick template" block; our
`/blog/how-to-make-cv-for-job-in-dubai` was prose and ranked nowhere for that query
(PERPLEXITY_VISIBILITY.md Q2, backlog B9). Same slug, title, excerpt, tags and `date`; the body is now
answer-first intro, Step 1–8 H2s, a fenced `text` template with square-bracket placeholders, a
"Dubai-Specific Rules" list, the pre-existing "Where to Actually Make the CV" section and the FAQ.
**Files:**
- edited: `content/blog/how-to-make-cv-for-job-in-dubai.mdx` — restructure; `dateModified: 2026-10-31`;
  two new FAQs (notice period + visa status on the CV; file format + filename) mirrored in body and
  `faqs:`; new internal links to `/notice-period-calculator` and `/jd-match`; anchor text "ATS Resume
  Checker" → "ATS checker". All existing facts kept (four Dubai hiring markets, WhatsApp test, salary off
  the CV, driving licence, Dubai vocabulary, typing-centre AED 20–100 range). No new statistics; the one
  figure-like flourish the reviewer caught ("hundreds of CVs a week") was removed before commit.
**Notes / risks / follow-up:** seo-reviewer: PASS, no BLOCKER / SHOULD FIX. NICE left open: the title
still says "(What's Different in 2026)" while the body is a full build procedure; if GSC shows this post
and `how-to-make-cv-for-job-in-uae` trading impressions, shorten Steps 5–6 here and push weight into
"Dubai-Specific Rules" (the section the UAE guide lacks). Re-run the Perplexity Q2 query at the next
monthly AI-citation check. Gates: `npx velite` clean, tsc clean, lint 2 warnings (pre-existing).
**Suggested commit:** content(blog): restructure the Dubai CV guide as an 8-step procedure with a plain-text template

---

## [2026-10-31 12:45] Inbound links for the two 2026-10-31 posts (Mission 6 check)

**Goal:** `/blog/uae-cv-mistakes` had 2 inbound links (cv-format-uae-2026 and the hospitality post) and
`/blog/hospitality-cv-uae` had none; both needed at least two from relevant pages. Sitemap and blog index
already carry both (`getAllPosts()` on `published: true`, confirmed in the build), and each post already
links to the checker, JD Match and /cv-examples-uae.
**Files:**
- edited: `app/resume-checker/page.tsx` — ReadNext: `cv-format-uae-2026` → `uae-cv-mistakes` (the format
  guide stays on home, /templates and the notice-period calculator).
- edited: `app/templates/page.tsx` — ReadNext: `ats-cv-checklist-uae` → `uae-cv-mistakes` (the checklist
  stays on /jd-match and /resume-checker).
- edited: `app/cv-examples-uae/page.tsx` — new "Sector guides" ReadNext block before the internal-links
  section: `hospitality-cv-uae`, `nursing-cv-uae` (also had zero inbound links), `professional-summary-examples-uae-cv`.
- edited: `content/blog/cv-for-freshers-uae.mdx` — one parenthetical under "Handle Visa Status Honestly"
  linking the hospitality guide (qualitative wording, no figure); `dateModified` → 2026-10-31. seo-reviewer:
  PASS, no blockers; three pre-existing NICE items (FAQ 3 and FAQ 5 body wording drifts slightly from
  `faqs:`; FAQ 3 carries an unsourced "recruiters spend only seconds" clause) left for the next refresh.
- edited: `public/llms.txt` — both posts added (mistakes under "UAE CV format and ATS", hospitality under
  "by situation").
**Notes / risks / follow-up:** inbound links in the prerendered HTML after: mistakes 2 → 4 pages
(cv-format-uae-2026, hospitality-cv-uae, /resume-checker, /templates); hospitality 0 → 2 pages
(/cv-examples-uae, cv-for-freshers-uae) plus llms.txt for both. Gates: tsc clean, lint 2 warnings
(cap 2), `npm run build` green.
**Suggested commit:** seo(links): inbound links for the UAE CV mistakes and hospitality CV posts

---

## [2026-10-31 12:40] Checker-count drift check against the app (Mission 8)

**Goal:** this site stated "44 checks" and the four family counts in `WhatWeCheck.tsx`, and "40+ UAE-tuned
checks" in ~14 places, with nothing tying them to the app's score engine. The app now serves its list at
`GET https://app.makemycv.ae/api/resume-checker/checklist` (`{ version: 1, count, categories: [{ id, label,
count, items }] }`); this adds the site half of the contract. The rendered list stays static for SEO — no
build-time fetch — so the check is a CI script, not a runtime dependency.
**Files:**
- created: `lib/checkerChecklist.ts` — the one place with `CHECK_COUNT` (44), `checkFamilies` (ids =
  the app's category ids, counts 14/7/14/9, item wording), `CHECK_COUNT_COPY_FLOOR` (40, the "40+" copy),
  `CHECKLIST_ENDPOINT`, `CHECKLIST_CONTRACT_VERSION`. React-free so the script can import it under tsx.
- edited: `components/resume-checker/WhatWeCheck.tsx` — imports from that module; icons keyed by family id.
  Rendered output unchanged.
- created: `scripts/check-checklist-contract.mjs` — fetches the endpoint (`CHECKLIST_URL` overrides), checks
  version, total, per-category counts by id, the 40+ floor and the payload's own consistency. 200 + match →
  exit 0; mismatch → exit 1 with each difference; non-200 → "skipped: endpoint <status>", exit 0; network
  error → exit 1. Verified pass (against a local app dev server on :3700), 404-skip, and a simulated 45/15
  mismatch (exit 1). Uses `process.exitCode`, not `process.exit()` — the latter tripped a libuv assertion
  on Windows with an undrained response body.
- edited: `package.json` — `npm run check:checklist`.
- edited: `.github/workflows/ci.yml` — `checklist-contract` job, `continue-on-error: true`.
**Notes / risks / follow-up:** until the app's `stagingmmc` reaches `main`, production answers 404 and the
job reports "skipped". The "40+" strings themselves are not imported from the module (MDX files cannot);
the floor constant and the grep hint in the module's comment are the maintenance handle. If the engine
drops below 40 the script fails and names that copy. Gates: tsc clean, lint 2 warnings (cap 2), build green.
**Suggested commit:** ci(checker): checker-count contract check against the app endpoint

---

## [2026-10-25 22:45] Templates: Chronicle and Harvard pages + preview images; template count 14

**Goal:** The app's 13th and 14th templates (Chronicle: single-column timeline with a date gutter and
accent rail; Harvard: zero-colour serif, education-first one-page graduate format; app PR from
`stagingmmc`) need their gallery cards and preview images here, deployed together with the app PR.
**Files:**
- created: `content/templates/chronicle.mdx` (order 35, accent blue, tags New / ATS-safe / Single
  column) and `content/templates/harvard.mdx` (order 42, accent slate, same tags). No "Photo" tag:
  Chronicle's default is no photo and Harvard has no photo slot, so neither card gets the with/without
  toggle.
- added: `public/templates/{chronicle,harvard}-preview.png` + `-preview-thumb.webp` via
  `node scripts/import-template-previews.mjs chronicle harvard` (captures from the app repo).
- edited: `app/templates/page.tsx` — title, meta description, lead and FAQ answer said 10 templates;
  now 14, and the FAQ names Harvard for graduates and Chronicle for a career timeline.
  `app/free-cv-maker-dubai/page.tsx` ("Choose from 14 templates") and the comment in
  `components/home/TemplateShowcase.tsx` likewise.
**Notes / risks / follow-up:** `getFeaturedTemplates` is unused, so the orders only set the gallery
sequence. Verified: `npm run build` (Velite frontmatter), `npx tsc --noEmit`, `npm run lint` (2
pre-existing warnings).
**Suggested commit:** feat(templates): Chronicle and Harvard cards, previews and the 14-template count

## [2026-10-24 23:10] /support redesign: the ask comes first, karak tip picker

**Goal:** Design handoff `design_handoff_support_karak` (README + "Support Page v2" reference): reorder
the page so the ask is first and make the CTA playful. New order: hero with eyebrow pill, H1,
subline and the karak tip-picker card → Why support → About me → What you get → FAQ → footer CTA.
The standalone TipJar section and the hero's second line are gone (the line moved into the pill).
**Files:**
- edited: `app/support/page.tsx` — sections reordered and restyled to the handoff's spacing/type;
  copy unchanged; "What you get" now on paper-2 and FAQ on paper; About me is an avatar column +
  letter card with a mono signature; Why support has the side-by-side header and 01/02/03 indices.
- created: `components/KarakPicker.tsx` — client tip-picker: 1 / 3 / 5 karaks as a `radiogroup`
  (arrow, Home, End keys, roving tabIndex), reaction line and Ko-fi label follow the selection,
  pure-CSS cups (bob + steam, three sizes: big for one cup, md, and sm below the `sm` breakpoint
  where five md cups overflowed the 85px option on a 375px phone). Ko-fi/PayPal keep the same URLs,
  `data-event`s, `track("tip_click", { rail, context, cups })` and `markTipped()`; `data-cups` added.
- edited: `components/TipJar.tsx` — exports `KOFI_URL`, `PAYPAL_URL`, `markTipped` for the picker.
- edited: `app/globals.css` — `karak-bob` / `karak-steam` keyframes + reduced-motion rule.
- created: `public/paypal/paypal-mark.svg` — the bundle's placeholder; replace with PayPal's official
  brand mark at the same path.
**Notes / risks / follow-up:** `cups` is sent as an event parameter but GTM has no `cups` Data Layer
Variable yet; add it in GTM and to `PARAM_KEYS` in both repos' `lib/analytics.ts`. TipJar.tsx is no
longer rendered on the site (kept for its exports and the app mirror). Verified: tsc, lint (2
pre-existing warnings), `npm run build`, browser at 1440px and 375px (picker click + keyboard).
**Suggested commit:** feat(support): ask-first redesign with the karak tip picker

## [2026-10-24 22:40] Templates: Gulf Standard and Banner pages + preview images

**Goal:** The app gained two templates today (audit + founder pick: Gulf Standard, the labelled UAE
format with a passport photo; Banner, an accent header band with a photo over a single column).
The marketing site's template gallery and home showcase need their cards and images.
**Files:**
- created: `content/templates/gulf-standard.mdx` (order 15, accent indigo) and
  `content/templates/banner.mdx` (order 45, accent emerald) — tags New, Photo, ATS-Friendly,
  Single column (same vocabulary as professional-photo: "ATS-Friendly" wears the badge while
  "Photo" files the card under the photo filter; "ATS-safe" is reserved for the photo-less ones).
- created: `public/templates/{gulf-standard,banner}[-nophoto]-preview.png` (1588x2246 captures from
  the app's `/preview/<id>` route) and the matching `-thumb.webp` files (544x769) the showcase uses.
- created: `scripts/import-template-previews.mjs` — copies `../makemycv-app/artifacts/template-previews/
  <id>[-nophoto]-preview.png` into `public/templates/` and generates the 544x769 WebP thumbs with
  sharp. Usage: `node scripts/import-template-previews.mjs <id> ... | --all`. Thumb size must stay in
  step with `components/home/TemplateShowcase.tsx`.
**Notes / risks / follow-up:** Deploy together with the app's template PR — the cards link into the
app, which must know the ids. No copy beyond the frontmatter was written for the new cards.
**Suggested commit:** feat(templates): Gulf Standard and Banner cards, previews and an import script

## [2026-10-24 18:10] Analytics: reset GTM data-layer parameters on every push

**Goal:** GTM container version 4 (published 2026-10-24) forwards `tip_click` and `email_subscribe`
from www to GA4 through Data Layer Variables (`rail`, `context`, `source`, …). GTM keeps each key's
last value across pushes, so a second event could carry a parameter from the first. Mirror of the
same fix in makemycv-app/lib/analytics.ts.
**Files:**
- edited: `lib/analytics.ts` — `track()` pushes `{ event, ...PARAM_RESET, ...params }`; `PARAM_KEYS`
  lists the DLV keys read by the container.
**Notes / risks / follow-up:** The `[data-event]` dispatcher in `app/layout.tsx` pushes its own
payloads and is unchanged. Add a key in both repos when a new DLV is created in GTM.
**Suggested commit:** fix(analytics): reset data-layer parameter keys on every push

---

## [2026-10-24 10:40] Consent banner, CSP report-only, email opt-in, ratings proof, privacy policy rewrite

**Goal:** Site half of the feedback-and-consent work (see makemycv-app COWORK_CHANGELOG, same timestamp).
The live check found GA4 firing with no consent layer, Google Signals pinging doubleclick, and no CSP on
www at all.
**Files:**
- created: `lib/consent.ts`, `components/consent/{ConsentBanner,CookieSettingsLink,useClientValue}.tsx` —
  byte-identical copies of the app's (edit both). `app/layout.tsx` runs the Consent Mode v2 default before
  GTM and mounts the banner (both gated on GTM_ID); `proxy.ts` stamps `mmcv_geo` from the Vercel country
  header; `components/Footer.tsx` gets "Cookie settings".
- created: `components/EmailSignup.tsx` — posts cross-origin to app.makemycv.ae/api/subscribe (the app owns
  the list); renders only with `NEXT_PUBLIC_EMAIL_SIGNUP=1`; hides after a send. Mounted on every blog post
  above the closing band and on `/thanks`.
- created: `app/thanks/ThanksMessage.tsx` — `/thanks` is also the landing page for `?subscribed=1|expired`
  and `?unsubscribed=1` (client-side, page stays static).
- created: `components/home/RatingsProof.tsx` — the first homepage social proof, and the only kind allowed:
  real one-tap ratings + human-approved quotes from the app's summary endpoint; renders nothing below 25
  ratings; emits `aggregateRating` on the page where the number is visible (the exact condition
  `lib/seo-schema.ts` set). Hourly ISR.
- edited: `next.config.ts` — `Content-Security-Policy-Report-Only` mirroring the app's policy;
  `instrumentation-client.ts` reports violations to Sentry (first 3 per page). Flip to enforcing after a
  few quiet weeks.
- edited: `components/TipJar.tsx` — `tip_click` with rail + context.
- edited: `app/privacy/page.tsx` — "Analytics & cookies" rewritten (cookie names, region behaviour,
  `mmcv_consent`/`mmcv_geo`, Cookie settings link, advertising features off); new "Ratings and quotes" and
  "Email updates" sections; Supabase (EU) and Resend added to processors; short version updated; dated
  24 October 2026.
- edited: `.env.example` — `NEXT_PUBLIC_EMAIL_SIGNUP`.
**Notes / risks / follow-up:** The privacy policy now states Google's advertising features are OFF —
switch Google Signals off in the GA4 property before this deploys, or soften the sentence. Verified on a
local production build: CSP report-only header present with zero violations on the home page; EU banner +
Accept → cookie; blog form posts `{email, source:"blog"}` to the app; thanks messages; privacy sections.
**Suggested commit:** feat(site): consent banner + Consent Mode defaults, CSP report-only, email opt-in,
ratings proof, privacy policy for ratings/email/cookies

---

## [2026-10-24 07:40] WP-7 / WP-9 (site half): no nested <main> on error pages; privacy policy names the cover letter

**Goal:** Audit F19 (two `<main>` landmarks on the error and not-found pages) and the disclosure the
app's new cover letter needs: it is the first feature that sends CV text (an excerpt) to a server, so
the privacy policy must say so before it ships.
**Files:**
- edited: `app/error.tsx`, `app/not-found.tsx` — outer `<main>` → `<div>`; the root layout already
  provides the page landmark. Styling unchanged.
- edited: `app/privacy/page.tsx` — "AI features" now lists the cover letter writer and spells out the
  excerpt it sends (headline, summary, latest role, up to twelve skills, visa and availability lines,
  plus the job details typed — never contact details or the photo). The "we do not log or store"
  sentence covers it too. This wording mirrors `makemycv-app/lib/coverLetter/payload.ts`; change both
  together.
**Notes / risks / follow-up:** The site's `Logo` wordmark still uses weight 600 + `--brand-gold`
(2.6:1); the app moved to 700 + a `--brand-gold-text` (#B38A3C) for the ".ae" to pass axe. Copy that
here when the site gets an axe pass (the app's `scripts/builder-smoke.mjs` shows the pattern).
**Suggested commit:** fix(site): single main landmark on error pages; privacy policy covers the cover letter

---

## [2026-10-24 04:10] WP-6 (site half): proxy.ts, Sentry options, excerpt, stray file

**Goal:** Build-time warnings and leftovers from the Oct-2026 audit (F14, housekeeping).
**Files:**
- renamed: `middleware.ts` → `proxy.ts` (`export default function proxy`), the Next 16 convention;
  identical matcher and behaviour. The build no longer prints the middleware deprecation.
- edited: `next.config.ts` — Sentry's deprecated top-level `reactComponentAnnotation` / `disableLogger`
  moved under `webpack: { reactComponentAnnotation, treeshake.removeDebugLogging }`.
- edited: `content/blog/skills-vs-degrees-uae-cv.mdx` — excerpt trimmed 314 → ≤300 chars (Velite
  schema limit; it was reported as a build issue on every run). Wording kept, `date` untouched.
- deleted: `google4f67127b6f30fe74 (1).html` — a duplicated Search Console file at the repo root
  (not under `public/`), so it served nothing; verification stays via the `<meta>` tag in `app/layout.tsx`.
**Notes / risks / follow-up:** `npm run build` (53 routes, "ƒ Proxy"), lint and the 124 calculator /
letter tests pass. CI already existed for this repo (the audit's "no CI on the site" line was wrong —
corrected in `_cowork/audit-2026-10/04-findings.md`).
**Suggested commit:** chore(site): proxy.ts, Sentry webpack options, excerpt limit, stray file

---

## [2026-10-24 03:20] WP-2 (site half): the ATS checker now takes DOCX — copy updated

**Goal:** The app's checker accepts Word files from today (`makemycv-app` WP-2). Three places on
this site still said PDF only.
**Files:**
- edited: `components/resume-checker/HowItWorks.tsx` — step 00 title/body ("Upload your PDF or
  DOCX"); this array also feeds the HowTo JSON-LD, so schema and visible copy move together.
- edited: `components/resume-checker/ResumeCheckerFAQ.tsx` — "This checker only accepts PDF" →
  accepts text-based PDF and Word (.docx).
- edited: `app/resume-checker/page.tsx` — hero chip "PDF or DOCX · Results in about a minute".
**Notes / risks / follow-up:** Deploy the app change first or at the same time; the site copy
promises DOCX. `npm run build` / lint / tsc pass.
**Suggested commit:** content(checker): say the ATS checker accepts DOCX

---

## [2026-10-24 01:50] WP-5 (site half): honest claims, checker timing copy, same-tab product CTAs

**Goal:** Audit findings F12, F18, F20, F10 (`../_cowork/audit-2026-10/06-REPORT.md`). Marketing
absolutes over-promised relative to the (accurate) privacy page, the checker promised "30 seconds"
against a measured ~38 s, and every product CTA opened app.makemycv.ae in a new tab.
**Files:**
- edited: `app/about/page.tsx` — "Your CV data never leaves your browser" → what actually happens
  (browser-local CV; AI + checker send only submitted text; report auto-deletes in 24 h).
- edited: `components/home/ProblemSolution.tsx`, `components/resume-checker/FilterProblem.tsx`,
  `app/resume-checker/page.tsx` — the unsourced "75% rejected" figure softened to a claim the
  site can stand behind (software screens first; a large share rejected for parser-unreadable
  formatting). The site's own blog guardrails already ban unsourced recruiter statistics.
- edited: `app/resume-checker/page.tsx`, `components/resume-checker/{FinalCTA,WhatWeCheck,FilterProblem}.tsx`,
  `components/seo/CareerToolLinks.tsx`, three calculator pages — "30 seconds" → "about a minute"
  everywhere (16 occurrences incl. meta descriptions and the AiAnswer).
- edited: 23 `<a>`/`<Button>` tags across Navbar, Footer, home sections, templates grid, blog
  index/post chrome, JD-match/checker landings, support/thanks/error/404, calculator pages —
  `target="_blank"` + `rel` removed on links to app.makemycv.ae, the "(opens in new tab)" sr-only
  hints and the "opens the free builder" aria-label removed. Links inside MDX article bodies and
  all external links (MOHRE, Ko-fi, social) are unchanged.
- edited: `app/free-cv-maker-dubai/page.tsx` — unused `Link` import removed (lint was 3 warnings
  against a cap of 2 on `staging`; the gate is green again).
**Notes / risks / follow-up:** Decision taken per the audit's recommendation: primary CTAs open in
the same tab (Back works, one GA4 session across the www→app hop, better in LinkedIn/Instagram
in-app browsers). If a new-tab preference exists for a specific surface, re-add `target` on that
tag only. `npm run build`, `npm run lint` and `npx tsc --noEmit` pass.
**Suggested commit:** fix(site): honest privacy/ATS claims, checker timing copy, same-tab product CTAs

---

## [2026-08-25 17:30] AIO extractability optimisation — 4 blog posts

**Goal:** Flip uncited queries on Google AI Overview by applying the proven extractability formula:
Dubai-anchored FAQ in frontmatter + matching H3 in body + dateModified bump. Based on the 23 Aug
GEO audit which showed AIO jumping from 4→10 citations but 10 queries still uncited.

**Files:**
- edited: `content/blog/should-cv-have-photo-uae.mdx` — added FAQ "Should I put a photo on my CV for a Dubai job?" (frontmatter + body), dateModified → 2026-08-25. Targets Q10.
- edited: `content/blog/cv-for-freshers-uae.mdx` — added FAQ "How do I write a CV for a Dubai job with no work experience?" (frontmatter + body), dateModified → 2026-08-25. Targets Q17.
- edited: `content/blog/expat-cv-uae-guide.mdx` — added FAQ "What are the best CV tips for expats moving to Dubai?" (frontmatter + body), dateModified → 2026-08-25. Targets Q18 recovery (was cited 10 Aug, lost to GulfTalent+labeeb).
- edited: `content/blog/cv-format-uae-2026.mdx` — added FAQ "What should a UAE CV include?" (frontmatter + body), dateModified → 2026-08-25. Targets Q7 — highest-priority gap, never cited on any engine across 7 runs.

**Notes / risks / follow-up:**
- All 4 posts already had FAQPage schema — the GEO report assumed they didn't. The real gap was query-phrasing mismatch and lack of "Dubai" anchoring (Bing data shows 11.5× share gap between "dubai cv format" vs "UAE cv format").
- CRLF → LF line ending conversion occurred on all 4 files (known Cowork commit issue). Git autocrlf handles normalisation but `git diff --stat` shows near-whole-file changes. Content diff is clean — only FAQ additions and dateModified.
- `uae-cv-requirements` slug referenced in GEO report does NOT exist — cv-format-uae-2026 is the sole owner per cannibalisation rules. Corrected in this edit.
- Emirates ID homepage conflict (from content guardrails) checked: already resolved in current codebase. FAQ.tsx correctly says "Leave your Emirates ID number off." No change needed.
- These are on `staging` branch, uncommitted. Abdullah needs to review and push.

**Suggested commit:** content(blog): add Dubai-anchored FAQs for AIO extractability on Q7/Q10/Q17/Q18

---

## [2026-08-24 21:00] Blog batch — 1 refresh + 2 new posts (week of 17–24 Aug)

**Goal:** Ship three blog posts from the weekly brief (17–24 Aug 2026). Protect ranking equity
on the existing `why-cv-ignored-dubai` slug by refreshing it rather than creating a competing
second post. Two genuinely new slugs for AI skills and Nafis regulatory changes.

**Verdicts:**
- Idea 1 "Why You're Not Hearing Back" → **REFRESH** of `why-cv-ignored-dubai` (same search intent)
- Idea 2 "AI Skills on Your CV" → **NEW** slug `ai-skills-on-cv-uae` (distinct from `can-chatgpt-write-cv` and `skills-vs-degrees-uae-cv`)
- Idea 3 "Nafis Salary Support September 2026" → **NEW** slug `nafis-salary-support-september-2026`

**Files:**
- edited: `content/blog/why-cv-ignored-dubai.mdx` — added PeopleScout/TrueBlue candidate-experience
  data (25% very confident, 9/10 ghosted, 64% no response, 65% no AI disclosure), new section
  "The Five UAE-Specific Fields Recruiters Check Before Reading Anything Else" (visa status, notice
  period, location, nationality, driving licence), expanded honest-summary section with redirect
  advice, new 7th FAQ, added `dateModified: "2026-08-24"`, new tag "does anyone read my cv uae",
  cross-links to `cv-format-uae-2026`, `expat-cv-uae-guide`, `ai-skills-on-cv-uae`
- created: `content/blog/ai-skills-on-cv-uae.mdx` — GulfTalent 3.4% Gulf AI demand, three-level
  AI skill framework, 5-function credible-vs-weak bullet table, Robert Walters 42% irrelevant
  applications, AI-written vs AI-skilled trap, 6 FAQs, 8 internal links
- created: `content/blog/nafis-salary-support-september-2026.mdx` — Dh6K minimum / Dh20K cap,
  education-tiered support table (5 rows), pension contribution shift, GPSSA part-time pension
  (8–32 hrs, Ma'ashi platform), Emiratisation CV positioning, Dh500 phase-down, 6 FAQs, 8 internal links
- created: `public/blog/covers/ai-skills-on-cv-uae.svg` — green accent, "CV TIPS" eyebrow
- created: `public/blog/covers/nafis-salary-support-september-2026.svg` — blue accent, "UAE JOB MARKET" eyebrow

**Source corrections applied (brief → post):**
- PeopleScout "confident" → "very confident" (exact source wording)
- Robert Walters "40% reject" → "42% receiving more irrelevant applications" (different verb, different number)
- Nafis below-secondary tiers: brief lumped into one row → split into married/dependents (Dh4K)
  and single (Dh3K) per the Gulf Business source

**Guardrails:** No banned claims. "Resume" only in product names and tags. All figures labeled
with correct market (Gulf-wide vs UAE-specific).

**Notes / risks / follow-up:**
- `why-cv-ignored-dubai` body now ~2,326 words (target 1,200–1,800) — acceptable for a data-rich
  REFRESH with two new substantive sections. Monitor readability metrics.
- Blog count after merge: 31 posts (29 existing + `cv-for-dubai-jobs-from-nepal` from last batch + 2 new).
- No `validate_post.py` script exists yet — validation run manually (frontmatter limits, FAQ↔body
  mirror, banned claims, H1-in-body, internal links, word count). All pass.
- No `seo-reviewer` agent at `.claude/agents/seo-reviewer.md` — skipped.

**Suggested commit:**
```
content(blog): add AI skills + Nafis posts, refresh why-cv-ignored

- New: ai-skills-on-cv-uae (GulfTalent AI demand, credible bullet framework)
- New: nafis-salary-support-september-2026 (Sep 2026 restructuring, pension shift)
- Refresh: why-cv-ignored-dubai (PeopleScout data, five UAE-specific fields)
- 2 new cover SVGs
```

---

## [2026-08-17 22:20] Emirates ID removal, edge 404 bot guard, llms.txt rebuild, OG 404 fix

**Goal:** Abdullah's batch of 17 Aug. The honesty pass is **parked by his decision** — everything
here is separate from it, with one carve-out he asked for explicitly (Emirates ID).

**Files:**
- edited: `app/page.tsx`, `components/home/FAQ.tsx`, `components/home/FeatureGrid.tsx`,
  `components/home/ProblemSolution.tsx`, `lib/seo-schema.ts` (×2),
  `content/blog/how-to-make-cv-for-job-in-uae.mdx` — removed **Emirates ID** everywhere it was
  presented as a UAE Essentials field or as CV advice.
- created: `middleware.ts` — edge 404 guard for scanner path sweeps.
- edited: `public/llms.txt` — full rebuild.
- edited: `app/resume-checker/page.tsx` — OG image repointed off a path that never existed.

**Emirates ID — this was worse than bad advice, it was a phantom feature.**
Verified in `makemycv-app/components/builder/steps/UAEEssentialsStep.tsx`: the step's fields are
**visa status, availability/notice period, UAE driving licence, nationality**. There is no Emirates
ID field and there never has been. The site claimed one in six places, including `WebApplication`
schema `featureList` — so we were advertising a feature that doesn't exist *and* telling UAE job
seekers to put an identity-document number on a document that gets forwarded around. The FAQ answer
now says the opposite, and says why. **Left untouched deliberately:**
`content/blog/how-to-get-a-job-in-dubai-2026.mdx:184` — "Emirates ID biometrics" there refers to the
residence-visa process, which is factually correct.

**The middleware is the highest-risk change here; it is regex-tested.**
Blocks only paths observed in the GA4 bot sweep (~229 views / ~226 fake "users" in 28 days, ~23% user
inflation, making "Page not found" the second-biggest page on the site). Returns a bare 404 before
React — and therefore before GTM — loads, so probes stop minting sessions. Also cuts function
invocations.
- ⚠️ **`/static` is NOT blocked wholesale.** `public/static/cv-photo-amira.jpg` is a real referenced
  asset; the audit's suggested path list would have silently broken it. Only `/static/js` and
  `/static/media` are blocked.
- `/personas` is prefix-matched, not boundary-matched, because scanners also request malformed
  variants like `/personashttp:/iphoneservicelimburg.nl`.
- Verified with a standalone regex harness: **29 real routes/assets pass, 18 observed bot paths
  blocked, 0 false positives.**
- ⚠️ `/en` and `/login` are blocked because nothing serves them today. If an English locale prefix is
  ever added, or the marketing domain proxies auth, remove that entry FIRST — otherwise the new route
  404s with nothing to explain it.

**llms.txt was badly stale** — 19 of 30 posts (the blog has grown to 30; `skills-vs-degrees-uae-cv`
and `uae-sectors-hiring-2026` were both missing), no `/jd-match`, `/privacy`, `/support` or
`/resignation-letter-generator`, and it repeated the Emirates ID claim. Rebuilt with all 30 posts
grouped by intent (format/ATS · by situation · by country of origin · market), all four missing pages
added, and the entity name corrected to MakeMyCV.ae. `7-seconds-thats-it` is still listed — the
decision to retire or rewrite it is parked with the honesty pass — but it no longer *leads* the file,
which is what an LLM reads first.

**OG:** `app/resume-checker/page.tsx` pointed `image` at `/og/resume-checker.png`. `public/og/` is not
a directory in this repo, so every OG and Twitter card for that page resolved to a 404 and previews
rendered blank. Repointed to the real `/og-image.png`. A bespoke card would convert better and can be
generated from `scripts/generate-og-image.mjs` — not done here.

**Notes / risks / follow-up:**
- **Not committed** — Cowork cannot write the git index through this mount. Needs `git add` / `commit`
  / `push`. Still-uncommitted from 12 Aug: the `ORG_SAME_AS` Medium line in `lib/seo.ts`.
- **Preview-test the middleware before promoting.** It runs on every request. Walk `/`, `/blog`,
  `/templates`, `/static/cv-photo-amira.jpg` and one blog cover on the preview deployment.
- No build run — `npm run build` on this mount is impractically slow. Changes are copy strings, one new
  edge file, and a static text file.

**Suggested commit:** fix(content,seo): drop phantom Emirates ID field, add 404 bot guard, rebuild llms.txt

---

## [2026-08-17 14:00] Three blog posts: 2 new + 1 refresh (weekly brief 11–17 Aug)

**Goal:** Ship the three blog ideas from the 11–17 Aug weekly brief. Two new posts cover underserved search intents (UAE sector hiring + skills-vs-degrees for Gulf job seekers). One refresh adds Fortune/Greenhouse global data to the existing why-cv-ignored-dubai post. All sources verified against originals; all stats checked per content guardrails.

**Files:**
- created: `content/blog/uae-sectors-hiring-2026.mdx` — new post: which UAE sectors are hiring above the national average (LinkedIn × Ministry of Foreign Trade report), operations crowding problem at 21.4%, sector vocabulary swaps for CV rewriting. Category: UAE Job Market. 6 FAQs.
- created: `public/blog/covers/uae-sectors-hiring-2026.svg` — cover image (1200×630, dark gradient, green accent)
- created: `content/blog/skills-vs-degrees-uae-cv.mdx` — new post: why Gulf job seekers should not follow global "drop your degree" advice. MoHRE skill levels 1–9, degree attestation for employment visa, how to structure a CV that leads with skills without hiding qualifications. Category: Career Advice. 6 FAQs.
- created: `public/blog/covers/skills-vs-degrees-uae-cv.svg` — cover image (1200×630, dark gradient, gold accent)
- edited: `content/blog/why-cv-ignored-dubai.mdx` — refresh: added `dateModified: 2026-08-17`, new section "This Is Not a Dubai Problem — It Is a Global One" with Greenhouse data (254 applicants/role, 412% increase, AI doom loop), added internal link to new sectors post, updated Sources line.

**Notes / risks / follow-up:**
- Idea 2 from the brief was identified as a duplicate of `why-cv-ignored-dubai` (same Khaleej Times sources, same recruiter quotes). Abdullah confirmed: refresh rather than new post.
- The skills-vs-degrees post links to labeeb.ae's degree attestation guide was deliberately avoided (GEO competitor per audit). The attestation process is stated as established fact instead.
- New posts add internal links to: `why-cv-ignored-dubai`, `uae-hiring-season-september`, `how-to-get-a-job-in-dubai-2026`, `professional-summary-examples-uae-cv`, `cv-format-uae-2026`, `expat-cv-uae-guide`, `cv-for-freshers-uae`, `ats-cv-checklist-uae`, `does-dubai-use-ats`, `/jd-match`, `/resume-checker`.
- The refreshed `why-cv-ignored-dubai` now links to `uae-sectors-hiring-2026`, creating a two-way connection.
- Blog count after this: 29 posts (27 existing + 2 new).
- All three need staging → main merge to go live. Medium syndication queued below.

**Suggested commit:** content(blog): add sector-hiring and skills-vs-degrees posts, refresh why-cv-ignored with Greenhouse data

## [2026-08-12 23:22] Bind the Medium profile into the Organization entity graph

**Goal:** Item 2 of the post-queue list in the Medium syndication runbook, and the one part of
the Medium job that needs no browser. Syndicated Medium stories canonical back to this domain,
but nothing on this domain pointed *back* at the Medium profile — so the two surfaces were not
declared as one entity. With 10+ same-name `makemycv.*` properties competing for the bare brand
string, every owned profile bound into `sameAs` is another UAE-scoped signal that resolves this
entity rather than a European one.

**Files:**
- edited: `lib/seo.ts` — added `https://medium.com/@abdullahportfolio5` to `ORG_SAME_AS`, the
  array `organizationSchema()` spreads into the Organization node's `sameAs`. LinkedIn and
  Instagram were already there; this is a third entry, no other change.

**Judgement call worth flagging — this is a personal handle, not an org profile.**
`ORG_SAME_AS` carries a HARD RULE comment: only profiles we own and control. Abdullah owns this
one, it carries the display name "Abdullah — MakeMyCV.ae", and it publishes nothing but this
site's content — so it passes the ownership test. But it is a *personal* Medium handle rather
than a Medium publication (publications are a paid feature, decided against on 2026-08-01), and
binding a person-entity into an Organization node is not perfectly clean: if that profile ever
publishes unrelated personal writing, it muddies the org entity. Documented in an inline comment
directly above the URL, phrased so a future session knows it is the single line to remove if the
entity graph is ever tightened to org-owned profiles only. **Reversible in one line — say the
word and it comes out.**

**Also checked, no change needed:** the `og:site_name` mismatch recorded in
`makemycv-offsite-profiles-plan` is stale — every emission site (`app/layout.tsx`,
`app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `lib/seo.ts`) already uses `SITE_NAME`
= "MakeMyCV.ae". That memory note has been corrected.

**Notes / risks / follow-up:**
- **Not committed and not pushed** — Cowork cannot write the git index through this mount
  (documented failure, see project memory). The edit is in the working tree; it needs your
  `git add lib/seo.ts && git commit && git push`.
- Build risk is as close to zero as a change gets: one string literal appended to a
  `readonly string[]`. `npx tsc --noEmit` was started against the working tree but had not
  finished when this entry was written — typechecking across the Windows mount from the Linux
  VM runs at a crawl. It emitted no errors while running. Worth one `npm run build` before you
  push, purely as habit.
- The Organization node only renders where `organizationSchema()` is emitted — the marketing
  site. `app.makemycv.ae` still has no entity block of its own; that is a separate open item.

**Suggested commit:** feat(seo): bind Medium profile into Organization sameAs

---

## [2026-08-12 22:15] Share row on all blog posts

**Goal:** Blog posts had zero share affordance. Adds one to all 28, so posts can actually
circulate — the corridor guides in particular travel through diaspora jobseeker groups.

**Files:**
- created: `components/blog/SharePost.tsx` — WhatsApp · LinkedIn · X · Copy link, plus a native
  Share button that appears only where `navigator.share` exists (mobile), opening the OS sheet.
- edited: `components/SocialIcons.tsx` — added `IconWhatsAppGlyph` and `IconXGlyph` (lucide
  dropped brand icons; follows the existing currentColor glyph pattern in that file).
- edited: `app/blog/[slug]/page.tsx` — static import (Next 16 dynamic-import gotcha), placed
  after the tags block and before `AuthorBlock`. URL comes from `canonicalUrl()`, so shares point
  at production even from a local preview.

**Decisions worth keeping:**
- **No third-party widget.** AddThis/ShareThis-style embeds are tracking scripts that cost CWV
  budget and would contradict what `ResumeCheckerFAQ.tsx:20` promises about third parties. These
  are plain anchors — the three network links work with JS disabled (verified: all 28 prerendered
  HTML files contain the row).
- **WhatsApp leads the row, not LinkedIn.** The corridor audience shares in WhatsApp groups;
  LinkedIn is the right channel for the white-collar posts, not these.
- **Capability detection via `useSyncExternalStore`,** not `useEffect` + `setState` — the latter
  trips `react-hooks/set-state-in-effect` (caught by lint) and risks a hydration mismatch, since
  server and client must legitimately disagree here. Server snapshot false, client reads navigator.

**Notes / risks / follow-up:** `copyText()` is reused from `components/tools/copyText.ts`, already
in production via `CopyBreakdownButton`. **The copy button's success path is unverified in this
environment** — the Browser pane doesn't composite, so no real user-activated click is possible,
and both `clipboard.writeText` and the `execCommand` fallback reject without user activation
(`navigator.userActivation.isActive === false`). What that *did* confirm is the failure path: the
label correctly stays "Copy link" rather than falsely claiming "Copied". Worth one manual click on
a real device. Build ✅, tsc ✅, lint ✅ (2 warnings, pre-existing, at cap).

**Suggested commit:** feat(blog): share row on all posts — WhatsApp, LinkedIn, X, copy link

---

## [2026-08-12 20:36] Nepal corridor guide — new post + cluster de-orphaning

**Goal:** "Start the Nepal guide." Adds the fourth corridor post (after India, Philippines,
Kenya/Nigeria) and closes the largest uncovered source market in the blog. Ran the full CLAUDE.md
blog pipeline: dedup against `origin/main` first, every statistic verified against its source URL
before drafting, then build + `seo-reviewer`.

**Files:**
- created: `content/blog/cv-for-dubai-jobs-from-nepal.mdx` — 2,332 words (Velite-computed, 9 min
  read), 6 FAQs mirrored verbatim
  to the visible body. Differentiated from the sibling corridor posts by Nepal-only mechanics:
  Bikram Sambat → Gregorian date conversion, passport-transliteration consistency, Shram Swikriti
  timing, the 4-step attestation chain, and the NPR 10,000 agency fee cap.
- created: `public/blog/covers/cv-for-dubai-jobs-from-nepal.svg` + `.png` (rendered via
  `scripts/render-og-covers.mjs` — the PNG is the og:image, make sure `git add` catches both).
- edited: `content/blog/expat-cv-uae-guide.mdx` — new 🇳🇵 Nepali Expats section under
  "Expat-Specific Tips by Nationality"; `dateModified` bumped to 2026-08-12 (real content added).
- edited: `content/blog/first-time-ofw-cv-uae.mdx`, `content/blog/cv-for-dubai-jobs-from-kenya-nigeria.mdx`
  — one sibling cross-link sentence each. `dateModified` deliberately NOT bumped: a single added
  link is not a refresh, and over-signalling freshness on trivial edits is bad practice.

**Source corrections made — do not reintroduce:**
- The UAE MoFA Kathmandu attestation page (`mofa.gov.ae/en/missions/kathmandu/services/attestation-information`)
  **404s.** A search-result snippet quoted it as though live; it was not cited. The attestation chain
  in the post rests on the HCCH status table instead.
- Apostille non-membership was confirmed by reading the **HCCH status table for the 1961 Convention
  directly** (neither Nepal nor the UAE is a contracting party) rather than trusting the
  attestation-agency blogs that dominate this SERP.
- The first draft said the UAE "is now the leading destination" for Nepali labour migration on the
  strength of one Nepali month of permits that **combined new and renewed**. Renewals track the
  resident workforce, not fresh departures, so that overstated the claim. Now bound to its window
  (Mangsir 2081) with the new+renewed caveat stated inline.
- `myrepublica.nagariknetwork.com` returns 403 to bots — the DoFE figures are linked via the CESLAM
  mirror, which was actually fetched and read.

**Notes / risks / follow-up:** `seo-reviewer` returned 0 BLOCKER, 4 SHOULD FIX, 5 NICE — all applied.
Its one structural finding is worth carrying forward: the corridor cluster shares ~18% verbatim
body copy (the "What to change", "ATS reality check" and fraud blocks are near-identical across
posts). Reduced in this post, but it compounds with every corridor guide added and degrades AI
extraction — worth a cluster-wide differentiation pass before a fifth corridor post is written.
Build ✅, lint ✅ (2 warnings, pre-existing, at the `--max-warnings=2` cap). Left uncommitted for
Abdullah's review.

**Suggested commit:** content(blog): Nepal corridor CV guide + de-orphan the corridor cluster

---

## [2026-08-11 12:10] Ship the orphaned-post internal links + clear banned claims in the cluster

**Goal:** Push the three blog edits that had been sitting uncommitted since 10 Aug — 5 internal
links added to fix two orphaned posts (`cv-maker-dubai`, 0 inbound; `mohre-cv-format-uae`, 0
inbound, and the **#2 page site-wide by Google clicks**). Per CLAUDE.md, blog MDX changes must
pass the `seo-reviewer` subagent before committing. It ran twice: once on the original diff, once
to verify the fixes. Round 1 returned 0 BLOCKER / 5 SHOULD FIX; round 2 confirmed all 5 resolved
and caught a real BLOCKER unrelated to content (see below).

**Files:**
- edited: `content/blog/how-to-make-cv-for-job-in-uae.mdx` — MOHRE anchor reworded: the old setup
  ("Seen the phrase in a job ad?") contradicted the target post, which says the phrase comes from
  job seekers and CV services, not employer ads. Also de-banned a `[7 Seconds. That's It.]` anchor.
- edited: `content/blog/cv-format-uae-2026.mdx` — Dubai link pulled out of the conversion block
  (it read as a link to the tool but lands on an article, and claimed a Dubai-specific build
  config that does not exist) and re-placed as an editorial line after the Quick Reference list.
- edited: `content/blog/how-to-get-a-job-in-dubai-2026.mdx` — **removed a banned claim**:
  "UAE recruiters spend roughly 7 seconds on an initial CV scan… In those 7 seconds". Guardrail 3
  forbids this in advice content (US eye-tracking data, not UAE). Also "British or South Asian
  resumes" → CVs, per the CV-not-resume rule.
- edited: `content/blog/cv-maker-dubai.mdx` — **added to scope deliberately.** This change points
  3 new internal links at it, and it carried both banned patterns at once: an H2 reading
  "The 7-Second Reality in Dubai" plus "The widely-cited TheLadders study… around seven seconds"
  — the exact US→Gulf market conflation CLAUDE.md calls out by name. Promoting a page before
  cleaning it is the wrong order. H2 renamed, the TheLadders sentence deleted, `[7-second guide]`
  anchor reworded.
- edited: all four — `dateModified` → `2026-08-11`. One had none at all (so sitemap `lastmod` and
  Article `dateModified` were reporting 30 Mar for a page edited today); the other three were
  bumped from `2026-08-04` so the linked cluster is consistent. **No `date:` was rewritten.**

**Result:** Velite validates all four. `npm run build` passes. Banned-claim sweep across
`content/blog/` is clean apart from the dedicated `7-seconds-thats-it` post and one other file
(both flagged below). Link topology: `cv-maker-dubai` 0 → 3 inbound, `mohre-cv-format-uae` 0 → 2.

**Notes / risks / follow-up:**
- **NEAR-MISS, caught by the reviewer — `public/static/cv-photo-amira.jpg` was deleted from the
  working tree.** `velite.config.ts:76` sets `output.assets: 'public/static'` with `clean: true`,
  so `npx velite build --clean` wipes that directory — and this hand-placed homepage hero
  headshot lives inside it. `components/home/CvPhotoCard.tsx:38` still references it, rendered on
  `/` via HeroSection. Restored with `git checkout`. **Nothing shipped broken** — production still
  served it 200 throughout, because every commit this session staged explicit paths rather than
  `git add -A`. Plain `npm run build` does NOT delete it; only the `--clean` variant does.
  A task chip is open to move the asset out of Velite's output dir permanently — until then,
  check `git status` for a `D public/static/…` line after any `velite build --clean`.
- **Still carrying banned claims, NOT fixed here (out of scope, needs a decision):**
  `content/blog/7-seconds-thats-it.mdx` — the cluster hub. Title, excerpt and body all assert the
  7-second figure plus an unsourced "300–800 applications" UAE claim. These four edits raise its
  inbound prominence, so it matters more now. Retiring vs refreshing it is the open decision
  already noted in the 10 Aug entry (six posts link to it — a 301 is not a one-file change).
  `content/blog/professional-summary-examples-uae-cv.mdx:19` — "When a recruiter spends just 7
  seconds scanning your CV". Straightforward one-line fix, unrelated to this change.
- **NICE items not actioned:** `how-to-get-a-job-in-dubai-2026` has no `faqs:` and no FAQ section
  at all (pipeline step 4 wants 5–7) on a 3,114-word featured pillar, and still carries a
  `"how to get a job in dubai 2025"` tag. `cv-maker-dubai` has 4 FAQs vs the 5–7 guideline.
  `cv-maker-dubai` links out but never back to `cv-format-uae-2026` — one reciprocal link would
  pass equity to the money page.

**Suggested commit:** content(blog): link orphaned posts, strip banned 7-second claims from the cluster

---

## [2026-08-11 11:20] Self-host all fonts — take Google off the build path

**Goal:** The staging preview build failed (`dpl_BzJVro4NZeJJofGcyzh5wMdmdshK`). Root cause was
NOT the committed code — that commit changed one markdown file. `next/font/google` fetches from
fonts.gstatic.com **at build time** and bakes the resolved URLs into Vercel's build cache; Google
rotates those hashed URLs, so the restored cache asked for three Plus Jakarta Sans woff2 files
that returned **404**, cascading into module-not-found and `npm run build` exit 1. The identical
commit deployed fine to production seconds later because it restored a different, not-yet-stale
cache. A clean local build also passed — proving stale cache, not code.

Left alone, this recurs: Vercel restores the preview cache from the last successful staging
deployment, which is the same poisoned one. It can equally hit a **production** deploy — nothing
about the mechanism is preview-specific. For a site whose revenue depends on shipping, a
third-party network dependency on the deploy path is the actual defect. Self-hosting removes it.

**Files:**
- created: `app/fonts/*.woff2` — 7 files, 200 KiB total, latin subset, pulled from the Google
  Fonts CSS API. Inter / Bricolage Grotesque / JetBrains Mono / Plus Jakarta Sans are VARIABLE
  fonts — Google returns one byte-identical file per family regardless of weights requested
  (verified by md5), so one file each covers the full range. IBM Plex Mono is static: 3 files.
- created: `app/fonts/site.ts` — Inter, Bricolage, JetBrains Mono via `next/font/local`
- created: `app/fonts/blog.ts` — Plus Jakarta Sans, IBM Plex Mono (blog index only)
- edited: `app/layout.tsx` — imports from `@/app/fonts/site`; the three inline `next/font/google`
  loaders removed. Same CSS variables, same weights.
- edited: `app/blog/fonts.ts` — thin re-export of `@/app/fonts/blog`, so the path referenced by
  `docs/blog-redesign-notes.md` still resolves

**Result:** `npm run build` clean from a wiped `.next`, `tsc` clean, lint at 2 pre-existing
warnings. **Zero `fonts.gstatic.com` / `fonts.googleapis.com` references anywhere in the build
output** — the build is now hermetic for fonts. Emitted font files dropped 35 → 7.
Verified in a real browser (`document.fonts`, computed `font-family`): homepage body resolves to
`inter`, H1 to `bricolage`, mono to `jetbrainsMono`; blog index H1 to `plusJakarta`; all faces
`status: loaded`, zero errors.

**Notes / risks / follow-up:**
- **Caught and fixed mid-change:** declaring all five faces in one module made *every route*
  preload the two blog-only faces — 4 extra files, ~72 KiB, on pages that never render them.
  next/font preloads per-module, so the split into `site.ts` / `blog.ts` is load-bearing, not
  organisational. Verified after the split: homepage preloads 3 files, blog index 7, blog posts 3.
  Both font modules carry a comment saying so; do not merge them.
- **Design decision deliberately NOT touched.** Dropping the two blog faces would have fixed the
  build too, and was considered — but `docs/blog-redesign-notes.md` records the dark blog "island"
  and this type pairing as user-confirmed. Reverting an approved design as a side effect of a
  build fix would have been the wrong trade.
- `adjustFontFallback: "Arial"` on the sans faces reproduces the metric-adjusted fallback that
  next/font/google generated automatically — confirmed present in the browser as
  `"inter Fallback"` / `"plusJakarta Fallback"`, so CLS behaviour is unchanged. The mono faces opt
  out (Arial metrics are wrong for monospace) and use an explicit monospace stack.
- **Still worth doing regardless:** the poisoned cache on the staging lineage. This change makes
  it harmless, but a cache-cleared redeploy is still the clean way to retire it.
- Fonts now live in git. They are static assets that do not change; refresh instructions are in
  `app/fonts/site.ts` if a family is ever intentionally swapped.

**Suggested commit:** fix(build): self-host fonts so builds stop depending on Google at build time

---

## [2026-08-11 10:05] Sitelinks fix — brand the homepage title, unblock /contact, trim titles

**Goal:** makemycv.ae renders as a bare title+description in Google while the unrelated
makemycv.com gets expanded sitelinks. Sitelinks are algorithmic and cannot be requested, so the
job was to remove every technical reason Google would withhold them and make titles good enough
to serve as sitelink labels. Audit found the nav/sitemap/canonical theories were all dead ends —
those are clean. The real defect was that **the homepage title carried no brand token at all**.

**Files:**
- edited: `lib/seo.ts` — `buildPageMetadata()` gains `keywords` and `titleAbsolute`. `keywords` exists so no page needs the spread-and-override pattern that let `<title>` and `og:title` drift; `titleAbsolute` emits `title: {absolute}` for the homepage
- edited: `app/page.tsx` — title → `MakeMyCV.ae — Free ATS CV Builder for UAE Jobs` via `titleAbsolute`. Replaced the block comment, which asserted the layout template appends " | MakeMyCV.ae" to this page — it does not, and that false claim is what hid the bug
- edited: `app/contact/page.tsx` — dropped `index: false`; title → `Contact Us`; added BreadcrumbList
- edited: `app/sitemap.ts` — added `/contact` (41 → 42 URLs)
- edited: `app/jd-match/page.tsx`, `app/resume-checker/page.tsx` — call `buildPageMetadata` directly instead of spreading it; fixes the jd-match `<title>`/`og:title` mismatch at the pattern level
- edited: titles trimmed — `app/resignation-letter-generator`, `app/cv-examples-uae`, `app/gratuity-calculator`, `app/notice-period-calculator`, `app/annual-leave-calculator`, `app/templates`, `app/blog`, `app/about`, `app/author/makemycv-team` — all now render ≤60 chars
- edited: descriptions rewritten to ≤155 — `jd-match` (213→142), `cv-examples-uae` (228→152), `resignation-letter-generator` (209→151), `gratuity-calculator` (157→146)
- edited: BreadcrumbList added to `app/about`, `app/contact`, `app/support`, `app/privacy`, `app/author/makemycv-team` (was 10 of 15 routes, now 15 of 15)
- edited: `app/support/page.tsx` — title → `Support This Project`; H1 → "Buy me a karak" + plain subline; BreadcrumbList. **URL unchanged at /support** — no slug change, no redirect
- edited: `components/TipJar.tsx` — h3 and primary CTA → "Buy me a karak". Only rendered on /support, so blast radius is one page
- edited: `components/Navbar.tsx` — `/support` removed from primary nav
- edited: `components/Footer.tsx` — `/support` anchor text → "Support This Project", moved to end of Pages column

**Result:** `npm run build` passes, `tsc --noEmit` clean, lint at 2 pre-existing warnings (cap 2).
Verified against built HTML: homepage title now `MakeMyCV.ae — Free ATS CV Builder for UAE Jobs`
(no suffix — `absolute` working); `/contact` is `index, follow`; zero titles >60; zero
descriptions >155; jd-match `<title>` and `og:title` identical; 5/5 new BreadcrumbLists present;
`/support` appears 0× in nav, 2× in footer.

**Notes / risks / follow-up:**
- **OPEN QUESTION — "Builder" vs "Maker" in the homepage title.** The approved string uses
  "Builder". The comment block previously on `app/page.tsx` records a 2026-08-10 Search Console
  finding that argues the opposite: `cv maker for dubai jobs` converts at 20%, `uae cv maker free`
  at 10.7%, and nothing ranking on this page says "builder". Shipped as approved, but
  `MakeMyCV.ae — Free ATS CV Maker for UAE Jobs` would satisfy both the brand-token fix and that
  finding. One-word change if Abdullah wants it.
- **Sitelinks remain algorithmic.** Nothing here requests them. This removes obstacles and
  improves label quality; it does not guarantee sitelinks appear, and there is no markup that can.
- **Deliberately NOT done:** `WebSite.potentialAction` / sitelinks searchbox — Google deprecated
  that rich result in late 2024, so it would be dead markup. Homepage internal links to
  /blog, /about, /support were skipped per instruction (weak causal link, body-copy churn).
- **Post-download tip prompt — insertion point identified, not built.** See the report; the CV
  download itself lives in `makemycv-app`, not this repo.
- `TipJar`'s `markTipped()` writes `mmcv_tipped_at` to localStorage but **nothing reads it**. Any
  post-download prompt must add that read, or it will re-prompt people who already tipped.
- **Follow-up commit `9803fcb`** — the first pass also changed TipJar's `<h3>` to "Buy me a karak",
  which put three identical CTAs (H1, h3, button) in one viewport. Heading reverted to
  "Support a free tool"; H1 and button keep the karak copy as specified. Caught on visual review
  of the live page, not by the build.

**Suggested commit:** fix(seo): brand the homepage title, unblock /contact, trim titles for sitelinks
(shipped as `4ff03ef`, plus copy follow-up `9803fcb`)

---

## [2026-08-11 09:40] Release — fast-forward main to staging (analytics + money-page titles)

**Goal:** Production was serving older code than staging: the live homepage title
(`Free CV Builder for UAE Jobs`) did not match staging's build output. Reconcile the two so the
SEO work in the next entry lands on a known baseline rather than on top of an unknown drift.

**Files:** none edited — release only. `origin/main` fast-forwarded `3478f64` → `7fa1749`.
Shipped two commits:
- `da61875` chore(analytics): scope GTM to production env + rewrite money-page titles
- `7fa1749` fix(analytics): dispatcher pushes to dataLayer instead of undefined gtag

Areas touched: config (`app/layout.tsx`, `.env.example`), components (`app/page.tsx` + 5 money
pages), lib (`lib/analytics.ts`, new), docs (`COWORK_CHANGELOG.md`). **No dependency changes** —
no `package.json`, no lockfile, no CI, no auth.

**Result:** Pushed via `git push origin staging:main` (no checkout, so the uncommitted working
tree was never touched). Deploy live in ~45s; homepage title confirmed as
`Free CV Maker for UAE Jobs — Dubai CV Format`, matching the staging build exactly.

**Notes / risks / follow-up:**
- **`.env.example` was the only exception-list file touched.** Docs-only: adds an empty
  `NEXT_PUBLIC_GTM_ID=` key plus comments. The comments name `GTM-5H2LMVJT` and `G-8MWPD87FJH`,
  neither of which is a secret — GTM container and GA4 measurement IDs are public by design, and
  `GTM-5H2LMVJT` was already being served in production HTML. Confirmed with Abdullah before merge.
- **Three blog MDX edits were deliberately left uncommitted** and did NOT ship:
  `cv-format-uae-2026`, `how-to-get-a-job-in-dubai-2026`, `how-to-make-cv-for-job-in-uae` (the
  orphaned-post internal-linking work from the 10 Aug entry). Still sitting in the working tree.
  They need the `seo-reviewer` subagent run on them before they can be committed, per CLAUDE.md.
- Fast-forward only — `main` had no commits staging lacked, so no merge commit and no divergence.

**Suggested commit:** n/a — release merge, no new commit created

---

## [2026-08-10 20:12] Fix three orphaned posts — link cv-maker-dubai and mohre-cv-format-uae

**Goal:** The Bing Webmaster Tools AI Search Queries export (10 Aug) prices the `we build cv`
**Creation** intent at ~388 total citations with MakeMyCV holding only **12.37%** — the highest
commercial-value intent in the dataset and one of our weakest shares. A repo-wide internal-link
audit found that the asset for that intent, `cv-maker-dubai`, has **zero inbound internal links**
— as does `mohre-cv-format-uae`, which is the **#2 page site-wide by Google clicks** (3 of 208 in
July). Serves the 90-day objective **AI citation share**. Note this supersedes the standing GEO
recommendation to "build a dedicated CV maker page": the page already existed, it was just orphaned.

**Files:**
- edited: `content/blog/cv-format-uae-2026.mdx` — 2 links added: `/blog/cv-maker-dubai` in "The Fastest Way to Get Your UAE CV Right"; `/blog/mohre-cv-format-uae` in "Why UAE CV Format Is Different", framed on that post's own thesis that no official ministry template exists
- edited: `content/blog/how-to-make-cv-for-job-in-uae.mdx` — 2 links added: `/blog/cv-maker-dubai` in "Build It in Five Minutes"; `/blog/mohre-cv-format-uae` in "Step 2 — Write the Header"
- edited: `content/blog/how-to-get-a-job-in-dubai-2026.mdx` — 1 link added: `/blog/cv-maker-dubai` in "Step 1: Get Your CV Right", alongside the existing cv-format-uae-2026 link

**Result:** `cv-maker-dubai` 0 → 3 inbound · `mohre-cv-format-uae` 0 → 2 inbound. `npm run build`
passes (Velite 1.96s, compiled 14.4s, all 27 blog routes prerendered). Diff is 5 insertions /
5 deletions — single-line appends only, no frontmatter touched, no line-ending churn.

**Notes / risks / follow-up:**
- **Zero organic-traffic risk.** Neither format page earned a single Google click in July; only `mohre-cv-format-uae` (3) and `best-cv-writers-uae` (2) earned anything at all. This can only add link equity.
- **Third orphan left alone deliberately.** `how-to-make-cv-for-job-in-dubai` still has 0 inbound links. Its UAE twin has 9, so link topology has already picked a winner. Differentiate or 301 — needs Abdullah's decision, not a unilateral edit.
- **Do NOT act on the `UAE CV format` 4.87% citation share yet.** `uae-cv-format-guide` was retired 5 Aug (commit `2c3bf7f`), five days before that measurement, so the number is likely a page mid-transition rather than a content fault. Control case: `UAE resume format`, which has no retired twin, sits at a healthy 27.64%. Re-measure in the next Bing export before restructuring the cluster.
- **Correction to project notes:** `7-seconds-thats-it` was recorded as having no inbound links. It has **six** (`cv-maker-dubai`, `cv-vs-resume-uae`, `dubai-cv-vs-abu-dhabi-cv`, `how-to-get-a-job-in-dubai-2026`, `how-to-make-cv-for-job-in-uae`, `professional-summary-examples-uae-cv`). Retiring it — the open guardrail-violation decision — means editing six files first, not a simple 301.
- **Housekeeping:** a stale git worktree at `.claude/worktrees/great-zhukovsky-4d9c54/` holds a pre-guardrail-fix copy of `content/blog/` and pollutes repo-wide greps. Worth pruning.
- Not committed. On `staging`; push is Abdullah's.

**Suggested commit:** `fix(blog): link orphaned cv-maker-dubai and mohre-cv-format-uae from three hub posts`

---

## [2026-08-10 19:25] Fix the [data-event] dispatcher — it has never fired a single event

**Goal:** The revised 10 Aug analytics brief states that `window.gtag` is undefined on this site
(verified against the live DOM). That is not a curiosity — it means the delegated `[data-event]`
click dispatcher in `app/layout.tsx` has been dead code since the day it shipped. It guarded on
`typeof window.gtag !== 'function'` and returned early on **every** click. All **21** CTA call
sites across **17** distinct event names recorded nothing. Serves **trustworthy metrics before
monetisation**: this is the reason §4 of the brief found "zero custom events" in GA4.

**Root cause.** GA4 here is delivered by GTM, not by a direct gtag install. The global `gtag()`
function comes from the *manual* gtag.js install snippet —
`function gtag(){dataLayer.push(arguments)}` — which this site has never run. GTM injects
gtag.js but never defines that wrapper. So `window.gtag` is permanently undefined and every
call through it is a no-op. The old code comment claiming gtag was "exposed by GTM's GA4 tag"
was simply wrong, and that wrong assumption is what hid this.

**Files:**
- created: `lib/analytics.ts` — SSR-safe `track(event, params)` helper that pushes to the GTM
  dataLayer. No-ops during SSR and when the container is absent (localhost/preview per §1, or
  an ad blocker). Carries the full explanation so this cannot be reintroduced.
- edited: `app/layout.tsx` — dispatcher now pushes `{ event, ...params }` to `window.dataLayer`
  instead of calling `window.gtag`. Same `data-*` → snake_case parameter mapping as before; the
  17 existing event names are unchanged.

**Verified by executing the real code, not by inspection.** The dispatcher source was lifted
from `app/layout.tsx` and run against a DOM stub with **no `window.gtag` defined** — production
conditions. Direct A/B of the committed version against this one:

```
BEFORE (da61875)  events recorded: 0
AFTER  (this)     events recorded: 1
```

Also asserted: the event name is forwarded as the `event` key (what a GTM Custom Event trigger
matches on), `data-cta-location` → `cta_location` mapping works, non-`data-` attributes are
excluded so no `href` leaks into a parameter, a bare CTA with no extra params still emits, and
a click on a non-CTA element pushes nothing.

**Notes / risks / follow-up:**
- 🔴 **THIS IS ONLY HALF THE PIPELINE.** A `dataLayer.push` with no matching **Custom Event
  trigger + GA4 Event tag inside container `GTM-5H2LMVJT`** goes nowhere. The code will look
  correct, the build passes, and GA4 stays empty. The container work is §4a/§4 and needs GTM
  edit rights. **Until those tags exist and the container is PUBLISHED, this change moves the
  events from "silently dropped in the browser" to "sitting in the dataLayer, unread".** That
  is progress, not a fix.
- The 17 event names needing GTM triggers: `resume_checker_cta_click`, `navbar_ats_checker_click`,
  `jd_match_cta_click`, `home_hero_cta_click`, `home_how_it_works_cta_click`,
  `home_template_card_click`, `templates_page_use_template_click`, `templates_page_endcap_click`,
  `blog_cta_click`, `cv_examples_cross_link_click`, `gratuity_cross_link_click`,
  `notice_cross_link_click`, `leave_cross_link_click`, `resignation_cross_link_click`,
  `resignation_download_click`, `tipjar_kofi_click`, `tipjar_paypal_click`.
- **This changes the §4 naming decision.** The earlier call was "add canonical `cta_click`
  names, keep the bespoke ones during a transition, so existing reports don't break". There are
  no existing reports — these names have never produced a row. There is nothing to protect, so
  §4 should migrate straight to the canonical scheme rather than run both.
- `track()` is currently unused by design; it is the transport §4 will build on. The inline
  dispatcher cannot import it (it is a raw `<Script>` string), so the dataLayer push is
  duplicated there deliberately.
- `npm run build` and `npm run lint` pass (2 warnings, both pre-existing in blog files).

**Suggested commit:** `fix(analytics): dispatcher pushes to dataLayer instead of undefined gtag`

---

## [2026-08-10 18:40] Scope the Google tag to production + rewrite titles/meta on 6 money pages

**Goal:** Two items from the 10 Aug GA4 analytics brief (§1 and §5). §1 stops localhost and
Vercel preview deployments polluting the production GA4 property — the audit found ~32 views
from `localhost` plus five rogue `makemycv-site-*.vercel.app` hostnames over 28 days, and
Google's Tag Diagnostics rated the tag "Needs Attention" partly for it. Serves **trustworthy
metrics before monetisation**. §5 attacks the highest-ROI SEO gap available: the site ranks
1.0–1.7 for `dubai resume maker`, `cv maker uae format` and `dubai format cv maker free` and
earns **zero clicks** on all of them. That is a snippet problem, not a ranking problem.

**Files:**
- edited: `app/layout.tsx` — GTM container id now read from `NEXT_PUBLIC_GTM_ID` instead of
  being hard-coded. Both the head `<Script>` and the `<body>` `<noscript>` iframe are gated on
  it, as is the `data-event` delegated dispatcher (without a container there is no `gtag` for
  it to call). Value is format-guarded with `/^GTM-[A-Z0-9]+$/` because it is interpolated into
  an inline `<script>`.
- edited: `.env.example` — documents `NEXT_PUBLIC_GTM_ID` with an **empty** value and an
  explicit warning to keep it empty locally.
- edited: `app/page.tsx`, `app/templates/page.tsx`, `app/resume-checker/page.tsx`,
  `app/gratuity-calculator/page.tsx`, `app/notice-period-calculator/page.tsx`,
  `app/annual-leave-calculator/page.tsx` — title + meta description rewrites.

**IMPORTANT — the brief's §1 was factually wrong, and following it literally would have taken
analytics down.** It said to replace a hard-coded `G-8MWPD87FJH` with `NEXT_PUBLIC_GA_ID`.
There is no GA4 measurement id anywhere in this codebase. The site loads **GTM container
`GTM-5H2LMVJT`**, and GA4 is configured *inside* that container. Feeding a `G-` id into the
GTM snippet requests a container that does not exist, and every Google analytic on the site
dies silently. The variable is therefore `NEXT_PUBLIC_GTM_ID`, not `NEXT_PUBLIC_GA_ID`.

**Title changes** (rendered length includes the layout's ` | MakeMyCV.ae` suffix, 14 chars;
all six now clear 60, three did not before):

| Page | Was | Now | Rendered |
|---|---|---|---|
| `/` | Free CV Builder for UAE Jobs | Free CV Maker for UAE Jobs — Dubai CV Format | 58 |
| `/templates` | ATS-Friendly CV Templates for UAE Jobs | Free CV Templates UAE — 10 ATS-Ready Formats | 58 |
| `/resume-checker` | Free ATS Resume Checker for UAE Jobs | Free ATS CV Checker — Dubai & UAE Jobs | 52 |
| `/gratuity-calculator` | UAE Gratuity Calculator — Free End-of-Service Estimate | Free UAE Gratuity Calculator — End of Service | 59 (was 68) |
| `/notice-period-calculator` | UAE Notice Period Calculator — Free, Under Labour Law | Free UAE Notice Period Calculator | 47 (was 67) |
| `/annual-leave-calculator` | UAE Annual Leave & Leave Salary Calculator — Free | Free UAE Annual Leave & Salary Calculator | 55 (was 62) |

Two deliberate wording calls: **"Maker" not "Builder"** on the homepage, because every
converting query uses "maker" (`cv maker for dubai jobs` 20% CVR, `uae cv maker free` 10.7%,
`dubai cv maker free` 5.45%) and nothing that ranks says "builder"; and **"CV Checker" not
"Resume Checker"**, which brings the title in line with house style — the page's own quick
answer already said "free ATS CV checker", so the title was the odd one out. The
`/resume-checker` **route is unchanged**; renaming it would need a 301 and was out of scope.
Brand-name positioning was left alone per `makemycv-brand-disambiguation`.

The three calculator descriptions lost their inline `(Federal Decree-Law No. 33 of 2021)`
citation **only because at ~200–230 chars they were truncated before it ever displayed**. The
citation still ships in the visible body, the quick answer and the FAQPage schema, which is
what actually carries it for AI citation.

**Notes / risks / follow-up:**
- **Abdullah must set `NEXT_PUBLIC_GTM_ID = GTM-5H2LMVJT` in Vercel → Settings → Environment
  Variables, scoped to Production ONLY** (leave Preview and Development unchecked). Until he
  does, the next production deploy ships with **no analytics at all**. Verify GA4 → Realtime
  within ~60s of that deploy; if the var is missing there is no error, just silence.
- Verified both directions locally rather than assuming: with the var **unset**, 0 of the
  prerendered HTML files reference `googletagmanager` and there are 0 `dataLayer` references;
  with it set to `GTM-5H2LMVJT`, all 16 carry the tag with the correct container, the noscript
  iframe intact, and no `G-` measurement id leaked into the bundle.
- `npm run build` passes. Title lengths checked programmatically, not by eye.
- The Vercel preview-domain suggestions in GA4 will stop regenerating once this is deployed and
  the previews stop carrying the tag. Do not accept them in the meantime.
- Not done this session, deferred by agreement: §3 (404/bot middleware) and §4 (product event
  instrumentation). See the open items in the session summary.

**Suggested commit:** `chore(analytics): scope GTM to production env + rewrite money-page titles`

---

## [2026-08-10 08:57] Weekly blog batch: 2 new UAE Job Market posts + can-chatgpt-write-cv refresh

**Goal:** Ship the 3 ideas from the 3–10 Aug weekly brief. Dedup check caught that Idea 2
duplicated an existing post, so it became a refresh instead of a new slug — protecting the
existing post's rankings rather than cannibalising them. Serves **organic acquisition** and
**AI/LLM citability** (every stat sourced and dated, FAQ + FAQPage schema on all three).

**Files:**
- created: `content/blog/why-cv-ignored-dubai.mdx` — new post on the 2026 UAE hiring
  contraction and application-volume problem. Naukrigulf Hiring Index salary-band data +
  on-record recruiter quotes (Khaleej Times, 7 Aug 2026). Deliberately scoped AWAY from ATS
  mechanics and links out to does-dubai-use-ats / ats-cv-checklist-uae instead, to avoid
  cannibalising them.
- created: `content/blog/uae-hiring-season-september.mdx` — new evergreen-seasonal post on the
  July 2026 PMI hiring restart and the August-prep / September-apply window. Refreshable each
  August with new PMI figures.
- edited:  `content/blog/can-chatgpt-write-cv.mdx` — refreshed with Aug 2026 HireRight/YouGov
  Gulf employer research. Added "What Gulf Employers Actually Think" + "The Red Line: What the
  Gulf Verifies" sections and 4 new FAQs. `dateModified: 2026-08-10` set; `date` left at
  2026-07-04 per CLAUDE.md refresh convention.
- created: `public/blog/covers/why-cv-ignored-dubai.svg`
- created: `public/blog/covers/uae-hiring-season-september.svg`
- edited:  `CLAUDE.md` — added a "Blog content pipeline" section so Claude Code follows the same
  dedup / stat-verification / guardrail / FAQ steps as Cowork's `makemycv-blog-ship` skill. Docs
  only, no build impact.

**Notes / risks / follow-up:**
- 🔴 **GUARDRAIL FIX (approved by Abdullah this run):** can-chatgpt-write-cv previously carried
  an FAQ "What is the 7-second rule for CVs?" answering "recruiters spend roughly 6–8 seconds",
  and a body link reading "the seven seconds you actually get". That is the US eye-tracking claim
  the content guardrails say to keep OUT of advice content — and it was in FAQPage schema, so it
  was the version LLMs and Google quoted. Both instances removed and replaced with a
  UAE-defensible FAQ ("Can employers tell if your CV was written by AI?").
- Side effect: this removed the only internal link into `7-seconds-thats-it`. That post remains
  flagged in the guardrails as a live violation worth retiring or rewriting — **still open.**
- **3 corrections made to the source brief during verification** (do not re-introduce):
  1. The "many screening systems still prioritise keywords over actual capability" line is a
     paraphrase, not a quote. Actual quote used instead.
  2. The "64% of Saudi employers view AI positively" figure is NOT published as 64% — the source
     says "nearly two-thirds". Written as "nearly two-thirds".
  3. Most HireRight/YouGov figures are **Saudi**, not UAE. Only 42% (promotion) / 31%
     (termination) are UAE. Each figure is now labelled with its market in a table.
- HireRight/YouGov sample size and fieldwork dates are unpublished; the post says so explicitly.
- Validated against `.claude/agents/seo-reviewer.md` checklist programmatically: frontmatter
  limits, FAQ↔body mirroring, internal-link targets, category enum, banned claims, thin sections.
  **0 blockers, 0 warnings.**
- ⚠️ **NOT COMMITTED.** git index writes fail from the Cowork mount (`.git/index.lock`:
  Operation not permitted). Run `npm run build` then commit/push from Windows.

**Suggested commit:** content(blog): add UAE hiring-market posts, refresh chatgpt-cv with Gulf employer data, drop 6-second claim

---

## [2026-08-03 12:01] Project orientation + changelog setup

**Goal:** First Cowork run with write access to this repo. Establish the accountability trail
before any code or content is touched, and reconcile the project log against what the repo
actually contains. Serves **maintainability** — every future Cowork change lands with a
reviewable record, and the project log stops under-reporting shipped work.

**Files:**
- created: `COWORK_CHANGELOG.md` — this file. The per-repo change record required by the Cowork
  project instructions.

**No other file in this repo was created, edited or deleted on this run.** Recon was read-only
(`device_list_dir` / `device_stage_files` → `Read`, plus read-only `git log` / `git status` /
`git branch`). Related non-repo writes this run: `_cowork/makemycv-project-log.md` was merged
(additive only) and `makemycv-app/COWORK_CHANGELOG.md` was created.

**Notes / risks / follow-up:**

*Branch state — the thing to know before anything else:*
- Current branch is **`staging`**. It is **6 commits ahead of `origin/main`, 0 behind**:
  `5aabea3`, `0bcf3da`, `fe7f50a`, `b2df49e`, `e363612`, `189fe08`.
- `5aabea3` (the CI workflow) is **not pushed to `origin/staging`** either — it exists only locally.
- So Sentry, the CI gate, the lint/test wiring, the privacy hardening, the `aggregateRating`
  schema policy and the velite `rehype-autolink-headings` fix are all **absent from production**.
- 🔴 **`e363612` blocks the Medium syndication programme.** Until that velite change reaches
  `main`, Medium's importer strips every heading from imported posts (it sanitises heading-level
  anchors produced by `behavior: 'wrap'`, then drops the emptied heading). Each of the 21
  remaining imports would need ~9 manual heading edits. Merging `staging` → `main` is the single
  highest-leverage action available in this repo right now.

*Working tree:*
- `git status --short` lists ~178 modified files, but `git diff --stat` is exactly symmetric
  (29,908 insertions / 29,908 deletions) and `git diff --ignore-cr-at-eol --stat` returns empty.
  This is **CRLF/LF churn from the device mount, not real drift** — `core.autocrlf` is unset.
  Do not "fix" it by committing; write LF when editing so diffs stay readable.
- Known mount limitation: `git` index writes can fail with
  `unable to unlink .git/index.lock: Operation not permitted`. Read-only git commands are reliable.

*Live-facing defects found during recon (reported, not fixed — no changes on this run):*
- `app/resume-checker/page.tsx:41` sets `image: "/og/resume-checker.png"` but `public/og/` does
  not exist. **Every OG/Twitter card for `/resume-checker` currently points at a 404.** Tracked as
  pending in `ROADMAP.md`.
- `public/llms.txt` is stale — it lists 19 of 24 blog guides (missing `adapt-indian-cv-for-uae-jobs`,
  `cv-format-uae-2026`, `mohre-cv-format-uae`, `uae-cv-format-guide`, `cv-maker-dubai`) and omits
  `/jd-match`, `/resignation-letter-generator`, `/privacy` and `/support` entirely. It also still
  features `7-seconds-thats-it` first, which is a content-guardrail violation.
- `/contact` is missing from the 14 static entries in `app/sitemap.ts`. (`/thanks` is omitted too,
  which looks deliberate.)
- `rehype-autolink-headings` remains in `package.json` after being removed from `velite.config.ts`.
  `sharp` is imported by `scripts/generate-og-image.mjs` but is not a declared dependency —
  unverified whether it resolves transitively. **Both are `package.json` changes = high-risk per
  the scoping rules; flagged for approval, not touched.**

*Documentation drift (these will mislead whoever reads them next):*
- `PROGRESS.md` — richest status record in the repo, but its newest entry is **2026-07-08**. None
  of the August work (brand mark, privacy policy, resignation generator, Sentry, CI) is logged.
- `AUDIT.md` (2026-04-24) — claims 9 blog posts, 5 templates, a live `/pricing` with a $5 Pro tier,
  no privacy policy, zero tests and no CI. **All five are now false** (24 posts, 10 templates,
  `/pricing` 301s to `/support`, privacy policy shipped, two test suites, CI live).
- `ARCH-RECON-makemycv-site.md` — claims no `.github/workflows`, no error tracking, zero tests,
  10 posts / 5 templates. All now wrong.
- `README.md` is still untouched `create-next-app` boilerplate.
- A stale duplicate checkout exists at `.claude/worktrees/great-zhukovsky-4d9c54` (older ref), and
  the `.gitignore` entry meant to cover `.claude/` is corrupted (UTF-16 fragment, matches nothing).

*Ground truth captured for future runs:*
- Next.js **16.1.6**, React 19.2.3, Tailwind v4, velite ^0.3.1. Build = `velite build && next build`.
- **24 blog posts, all `published: true`, zero drafts.** Frontmatter summary key is **`excerpt`**,
  not `description`. Categories in use: CV Tips (13) · UAE Job Market (6) · Career Advice (5).
  `ATS Guide`, `Interview Tips` and `Industry Guide` are in the enum with zero posts.
- 10 template MDX entries in `content/templates/`, all `pro: false`, with real preview PNGs.
- 17 page routes + `sitemap.xml` + `robots.txt`. **No API routes, no middleware, no database, no auth.**
- Tests: `npm test` = `test:calculators` (stress battery) + `test:resignation`. Neither is wired
  into `build`; CI runs them.
- Observability: Sentry (traces off, PII off, replay off, aggressive `beforeSend` scrubbing),
  `@vercel/analytics`, `@vercel/speed-insights`, GTM `GTM-5H2LMVJT`. **No PostHog, no Plausible.**

**Suggested commit:** `docs(cowork): add COWORK_CHANGELOG.md and record the orientation run`

## [2026-08-25 18:15] Blog→app funnel: early CTAs + expat link fix

**Goal:** Connect AIO citation wins to product conversions. The 4 posts optimised for AIO extractability had their only CTA in the bottom 13–25% of the page. AIO visitors read the cited section and leave before seeing a product link.

**Files:**
- edited: `content/blog/expat-cv-uae-guide.mdx` — fixed CTA link from `makemycv.ae` (marketing site, 7s avg engagement) → `app.makemycv.ae` (product). Was the only blog post with this wrong link. Also added inline CTA after "What to Include" section (line 101, 45% depth).
- edited: `content/blog/cv-for-freshers-uae.mdx` — added inline CTA after structure list (line 45, 38% depth). Previous first CTA was at 98% (last line).
- edited: `content/blog/cv-format-uae-2026.mdx` — added inline CTA after 9-section structure (line 92, 40% depth). Previous first CTA was at 77%.

**Notes / risks / follow-up:**
- `should-cv-have-photo-uae.mdx` already had 2 CTAs with first at 64% — no change needed.
- CRLF line endings: same note as prior entry — sed inserts LF; git autocrlf normalises on commit.
- App subdomain (`app.makemycv.ae`) is still untracked in GA4 — these CTAs generate traffic we currently cannot measure. GA4 Phase 0 + Phase 1.3 from the GA4 audit must ship.

**Suggested commit:** `content(blog): add early inline CTAs on AIO-cited posts + fix expat link`

## [2026-08-25 18:45] Tier 1 Dubai anchoring — 5 blog post titles + opening paragraphs

**Goal:** Bing AI Search Queries Report shows 11.5× citation share for "Dubai" vs "UAE" framing on identical intent (56.25% vs 4.87%). Tier 1 adds "Dubai &" alongside existing "UAE" in titles — no keyword coverage lost, stronger AI retrieval signal gained.

**Files:**
- edited: `content/blog/cv-for-freshers-uae.mdx` — title: "CV for Freshers in Dubai & the UAE…", opening paragraph leads with "Dubai CV", added "cv for freshers dubai" and "first job cv dubai" to tags
- edited: `content/blog/adapt-indian-cv-for-uae-jobs.mdx` — title: "How to Adapt Your Indian CV for Dubai & UAE Jobs" (opening already led with Dubai)
- edited: `content/blog/professional-summary-examples-uae-cv.mdx` — title: "Professional Summary Examples for Dubai & UAE CVs…", excerpt updated, opening sentence anchored to "Dubai recruiter"
- edited: `content/blog/first-time-ofw-cv-uae.mdx` — title: "First-Time OFW CV for Dubai & UAE Jobs…" (opening already led with Dubai)
- edited: `content/blog/best-cv-writers-uae.mdx` — title: "Best CV Writers in Dubai & UAE…", opening sentence changed from "Best CV writers in UAE" to "Best CV writers in Dubai"

**Notes / risks / follow-up:**
- URLs/slugs unchanged — title is a ranking signal, slug is a URL. Different jobs.
- CRLF note: same as prior entries.
- Tier 2 (swap UAE → Dubai entirely on 4 more posts) is parked until September Bing AI Performance Report shows Tier 1 impact.
- No `dateModified` changes on these posts — the content substance hasn't changed, only the title/meta framing. Update `dateModified` only when body content is materially revised.

**Suggested commit:** `content(blog): Tier 1 Dubai anchoring on 5 post titles for AIO citation share`
