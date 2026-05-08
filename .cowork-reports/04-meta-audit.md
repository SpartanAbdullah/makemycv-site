# Task 4 — Title/Meta Audit + SERP Differentiation

**Date:** 2026-05-01
**Branch target (per plan):** feature branch `seo/title-meta-audit` (preview deploy only — no merge to main)
**Status:** Audit complete. Edits NOT applied (delivered as proposal for your review).

## Why edits aren't auto-applied

Two reasons — both worth understanding before you adopt the proposals:

1. **Cowork mount fragility.** My Edit tool corrupted `next.config.ts` on first try (truncated mid-content); recovery required Write + bash truncate. Repeating that across 9+ files would compound risk. A doc-first audit lets you apply edits with controlled diffs in your IDE.
2. **Brand voice is yours.** Title/meta is brand surface. Every proposal below has a stated reason — you should disagree with any that don't fit your voice and mark them up before applying.

## Differentiation principles applied

Per the plan:

- **"MakeMyCV" bound as one word** — never split, never hyphenated across a line.
- **UAE anchor in every title** — "UAE", "Dubai", "Abu Dhabi", or "Gulf".
- **Builder verb in every description** — "build", "create" — never "search".
- **No "CV search" / "search CV" / "searchable CV"** — body copy scan found ZERO occurrences (nothing to flag).
- **Avoid double-branding** — Layout sets `template: '%s | MakeMyCV'`, so child page titles get `| MakeMyCV` appended automatically. Including "MakeMyCV" in the page-level title produces redundant `| MakeMyCV | MakeMyCV` rendering.

## Bugs found in current setup

These render double-branded titles in production right now:

| Page | Page-level title (current) | Rendered SERP title (current) | Issue |
|---|---|---|---|
| `/blog` | `CV Tips & UAE Career Advice \| MakeMyCV Blog` | `CV Tips & UAE Career Advice \| MakeMyCV Blog \| MakeMyCV` | Brand appears twice |
| `/resume-checker` | `Free ATS Resume Checker for UAE Jobs \| MakeMyCV` | `Free ATS Resume Checker for UAE Jobs \| MakeMyCV \| MakeMyCV` | Brand appears twice |

The fix in both cases is to remove `| MakeMyCV` from the page-level title since the layout template adds it.

## Before / After table

### 1. Root layout (`app/layout.tsx`) — default title fallback

| Field | Current | Proposed | Reason |
|---|---|---|---|
| `title.default` | `Free CV Builder for UAE Jobs` | `Free CV Builder for Dubai & UAE Jobs — MakeMyCV` | Default title bypasses template, so MakeMyCV must appear inline. Adding "Dubai" sharpens UAE anchor and differentiates from mycv.ae's broader UAE framing. |
| `description` | `Build a professional, ATS-friendly CV in minutes. Free CV builder designed for Dubai, Abu Dhabi & UAE job market. No sign-up required.` | `Build a UAE-ready CV in minutes — ATS-friendly, Dubai & Abu Dhabi tested, no sign-up. MakeMyCV is the free CV builder for Gulf job seekers.` | Leads with action verb ("Build"), keeps city anchors, names brand to bind it to the builder identity. |
| `keywords[0..]` | `CV builder UAE, resume builder Dubai, free CV maker UAE, ATS CV template, ...` | `CV builder UAE, CV maker Dubai, free resume builder UAE, ATS CV template Dubai, MakeMyCV, professional resume Dubai, CV maker Abu Dhabi, Gulf CV format` | Add `MakeMyCV` as an explicit brand keyword. Keywords have minimal SEO weight today but help intent matching in some channels. |
| `openGraph.title` | `Free CV Builder for UAE Jobs` | `Free CV Builder for Dubai & UAE Jobs — MakeMyCV` | Match the default title. |
| `twitter.title` | `Free CV Builder for UAE Jobs` | `MakeMyCV — Free CV Builder for Dubai & UAE Jobs` | Twitter cards favor brand-first; UAE anchor stays. |
| `twitter.description` | `ATS-friendly CVs for UAE jobs. Free, fast, no sign-up.` | `Build an ATS-friendly CV for Dubai & UAE jobs. Free, fast, no sign-up.` | Add builder verb. |

### 2. Homepage (`app/page.tsx`)

The home page's `metadata.title` is rendered with the layout template appended. Current renders as `Free CV Builder for UAE Jobs | MakeMyCV`.

| Field | Current | Proposed | Reason |
|---|---|---|---|
| `title` | `Free CV Builder for UAE Jobs` | `Free CV Builder for Dubai & UAE Jobs` | Plus template = `Free CV Builder for Dubai & UAE Jobs \| MakeMyCV`. Adds "Dubai" to differentiate from mycv.ae's likely positioning. |
| `description` | `Build a CV UAE recruiters actually open — ATS-clean, visa-ready, designed for Dubai, Abu Dhabi & GCC hiring. Free to build, no sign-up. $5 one-time download to remove watermark.` | *(keep as-is)* | Already strong: builder verb, multiple UAE anchors, value prop, pricing transparency. Don't change. |

### 3. About (`app/about/page.tsx`)

Current rendered SERP: `About MakeMyCV | MakeMyCV` — redundant brand.

| Field | Current | Proposed | Reason |
|---|---|---|---|
| `title` | `About MakeMyCV` | `About — UAE CV Builder for Dubai Job Seekers` | Removes redundancy with template. Adds UAE+Dubai anchor. Plus template = `About — UAE CV Builder for Dubai Job Seekers \| MakeMyCV`. |
| `description` | `Learn why MakeMyCV was built for UAE job seekers and how it helps candidates create professional, ATS-friendly CVs for Dubai and GCC jobs.` | `Why MakeMyCV exists — built specifically for UAE job seekers to create professional, ATS-friendly CVs for Dubai, Abu Dhabi and Gulf hiring.` | Slight tightening; keeps "create" verb; explicit "Abu Dhabi" added. |

### 4. Contact (`app/contact/page.tsx`) — `index: false`

Page is noindex, so SERP impact is zero. But UX in the tab still matters.

| Field | Current | Proposed | Reason |
|---|---|---|---|
| `title` | `Contact MakeMyCV` | `Contact — UAE CV Builder Support` | Plus template = `Contact — UAE CV Builder Support \| MakeMyCV`. Adds UAE anchor, removes brand redundancy. |
| `description` | `Get in touch with the MakeMyCV team for questions, feedback, or partnership inquiries.` | *(keep as-is)* | noindex page; description doesn't render in SERPs. Keeping current copy avoids change-for-change's-sake. |

### 5. Pricing (`app/pricing/page.tsx`)

Current rendered SERP: `Pricing — Free to build, $5 per download | MakeMyCV`.

| Field | Current | Proposed | Reason |
|---|---|---|---|
| `title` | `Pricing — Free to build, $5 per download` | `Pricing — Free to Build a UAE CV, $5 per Download` | Adds UAE anchor where it was missing. Title becomes `Pricing — Free to Build a UAE CV, $5 per Download \| MakeMyCV`. |
| `description` | `Build and preview your CV free. Pay $5 only when you download the final, watermark-free version. No subscription, no auto-renewal.` | `Build and preview your CV free. Pay $5 only when you download the final, watermark-free version — built for Dubai & UAE job applications. No subscription, no auto-renewal.` | Adds Dubai/UAE anchor without breaking the proposition. |

### 6. Templates (`app/templates/page.tsx`)

| Field | Current | Proposed | Reason |
|---|---|---|---|
| `title` | `ATS-Friendly CV Templates for UAE Jobs` | *(keep as-is)* | Already strong: UAE anchor present; brand added by template. No change. |
| `description` | `Browse ATS-friendly CV templates built for Dubai and UAE hiring standards. Pick a clean format and create your CV in minutes.` | *(keep as-is)* | Strong: "create" verb, Dubai+UAE anchors, clear action. No change. |

### 7. Blog index (`app/blog/page.tsx`)

Current rendered SERP: `CV Tips & UAE Career Advice | MakeMyCV Blog | MakeMyCV` — DOUBLE BRAND BUG.

| Field | Current | Proposed | Reason |
|---|---|---|---|
| `title` | `CV Tips & UAE Career Advice \| MakeMyCV Blog` | `CV Tips for Dubai & UAE Job Seekers` | Plus template = `CV Tips for Dubai & UAE Job Seekers \| MakeMyCV`. Removes double-branding. Sharpens audience identifier ("Job Seekers" is a more direct target than "Career Advice"). |
| `description` | `Expert CV writing tips, ATS guides, and UAE job market advice from the team at MakeMyCV. Free resources for Dubai and Gulf job seekers.` | `Build a stronger CV with our guides on ATS rules, Dubai & UAE recruiter expectations, and Gulf job market trends. Free, written by the MakeMyCV team.` | Adds builder verb ("Build"). Keeps city/region anchors. |
| `openGraph.title` | `CV Tips & UAE Career Advice \| MakeMyCV Blog` | `CV Tips for Dubai & UAE Job Seekers — MakeMyCV` | Match new page title; brand inline (since OG titles render standalone, not via template). |
| `openGraph.description` | `Expert CV writing tips, ATS guides, and UAE job market advice.` | `Guides for building a stronger CV — ATS rules, Dubai & UAE recruiter expectations, Gulf job market trends.` | Builder-verb-led, UAE-anchored. |

### 8. Resume Checker (`app/resume-checker/page.tsx`)

Current rendered SERP: `Free ATS Resume Checker for UAE Jobs | MakeMyCV | MakeMyCV` — DOUBLE BRAND BUG.

| Field | Current | Proposed | Reason |
|---|---|---|---|
| `title` (override) | `Free ATS Resume Checker for UAE Jobs \| MakeMyCV` | `Free ATS Resume Checker for Dubai & UAE Jobs` | Removes double-brand bug. Adds "Dubai". Plus template = `Free ATS Resume Checker for Dubai & UAE Jobs \| MakeMyCV`. |
| `description` (via buildPageMetadata) | `Instantly check if your CV passes Dubai, Abu Dhabi and GCC ATS filters. Free, no sign-up, results in 30 seconds. Built for the UAE job market.` | *(keep as-is)* | "Built for the UAE" carries builder-flavor; description is action-led. No change. |
| `keywords[]` | `ATS checker UAE, resume checker Dubai, CV checker, free resume checker, ATS scanner, UAE jobs, DIFC resume, Abu Dhabi CV review` | *(keep as-is)* | Strong city + tower (DIFC) anchors. No change. |

### 9. Author / MakeMyCV Team (`app/author/makemycv-team/page.tsx`)

| Field | Current | Proposed | Reason |
|---|---|---|---|
| `title` | `MakeMyCV Team - UAE CV and Career Specialists` | `MakeMyCV Team — Dubai & UAE CV Specialists` | Em-dash for typography parity with other pages; "Dubai & UAE" sharpens anchor; drops "Career". Plus template = `MakeMyCV Team — Dubai & UAE CV Specialists \| MakeMyCV` (acceptable double "MakeMyCV" here since the page IS *about* the team — brand reinforcement is purposeful, not redundant). |
| `description` | `The MakeMyCV editorial team writes practical, ATS-focused CV guides for UAE and Gulf job seekers.` | `The MakeMyCV editorial team builds practical, ATS-focused CV guides for Dubai, UAE and Gulf job seekers.` | Replaces "writes" with "builds" (subtle nod to the builder-verb principle); adds "Dubai" anchor. |

## Body-copy "CV search" scan

Per plan step 5: searched `app/`, `components/`, `lib/`, `content/` for `cv search`, `search cv`, `searchable cv` (case-insensitive). **Zero matches.** Nothing to flag for future review.

## Suggested commit flow (preview branch)

```bash
cd C:\Users\MuhammadAbdullah\Desktop\makemycv-site
git checkout -b seo/title-meta-audit          # off whichever base you choose (preview recommended)
# Apply the edits manually in VS Code per the table above
npm run build                                  # confirm zero TS errors
git add app/                                   # only metadata files — do NOT include CRLF noise
git diff --cached                              # final review
git commit -m "seo: differentiate metadata from mycv.ae confusion (preview)"
git push -u origin seo/title-meta-audit
# Vercel auto-creates a preview URL — capture from the dashboard
```

## What to check on the preview deploy

For each changed page, view source on the Vercel preview URL and confirm:

- `<title>` matches the proposed value (with template appended where applicable)
- `<meta name="description">` matches the proposed value
- `<meta property="og:title">` matches
- No double-brand `| MakeMyCV | MakeMyCV` anywhere

## SEO impact expectation

These metadata changes will not move rankings overnight. Realistic timeline:

- **Week 1–2:** Google recrawls and reindexes. New SERP titles begin appearing.
- **Week 3–6:** CTR data accumulates on the new titles. If the differentiation works, mycv.ae-confusion impressions should slowly decline as Google learns we're a different intent.
- **Week 8–12:** Ranking adjustments stabilize.

This is a slow, compounding fix — pair it with the Task 5 blog post to push rankings on a high-intent keyword while waiting.

## Awaiting your action

Apply the edits in VS Code, push to `seo/title-meta-audit`, capture the Vercel preview URL. Per the plan: **do not merge to main**. Review the preview, mark up anything you want to change in this conversation, and we'll iterate.
