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
