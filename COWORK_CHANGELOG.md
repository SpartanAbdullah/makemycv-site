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
