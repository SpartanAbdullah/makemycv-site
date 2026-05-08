# Task 5 — "CV Maker Dubai" Landing Blog Post

**Date:** 2026-05-01 (post `date` frontmatter retained as-is)
**Branch target (per plan):** feature branch `blog/cv-maker-dubai-post` (preview deploy only — no merge to main)
**Status:** Files written to working tree, awaiting branch creation + commit + push

## Files created

| Path | Size | Type |
|---|---|---|
| `content/blog/cv-maker-dubai.mdx` | 10,579 bytes / 1,684 words | New blog post |
| `public/blog/covers/cv-maker-dubai.svg` | 2,065 bytes | Cover image (matches CV Tips category covers ~2,000–2,100 bytes) |

## Investigation summary (Step 0)

- Read `7-seconds-thats-it.mdx` and `ats-cv-checklist-uae.mdx` for voice + frontmatter conformance.
- Read `velite.config.ts` for schema enforcement: title max 100, excerpt max 300, category enum (CV Tips matches the plan's blue accent), required fields are title/slug/excerpt/date/category/coverImage/published.
- Read `cv-tips.svg` (category template) and `uae-recruiter-7-seconds.svg` (an exemplar) for SVG cover structure.
- Confirmed `published: true` is required and `featured` defaults to false (we set `featured: false` explicitly).
- Existing posts use `[text](url)` markdown link style — used the same in the new post for `7-seconds-thats-it` and `ats-cv-checklist-uae` cross-references.

## Frontmatter populated

```yaml
title: "Free CV Maker in Dubai: Build a UAE-Ready CV in 5 Minutes"   # 56 chars (<= 100)
excerpt: "A free CV maker built specifically for Dubai job seekers. Visa-aware, ATS-clean, and ready in five minutes — no sign-up, no subscription, no learning curve."   # 159 chars (<= 300)
date: "2026-05-01"
author: "MakeMyCV Team"
category: "CV Tips"
tags: ["cv maker dubai", "free cv builder uae", "dubai cv", "uae cv format", "ats cv dubai"]
coverImage: "/blog/covers/cv-maker-dubai.svg"
featured: false
published: true
```

## Body structure (matches plan outline)

1. **Hook** — the "search for cv maker dubai" experience and the email-gate frustration (concrete, lived).
2. **The 7-Second Reality in Dubai** — UAE recruiter scan dynamics, internal link to `/blog/7-seconds-thats-it`.
3. **What Makes a Dubai CV Different** — 5 sub-headings: visa status, photo norm, transferable skills, attestation, local market awareness (matches plan's enumerated list).
4. **Why MakeMyCV** — five product principles (no sign-up, UAE-first templates, ATS-clean, instant PDF, transparent pricing). Internal link to `/blog/ats-cv-checklist-uae` inside the ATS principle.
5. **How to Build Your CV in Five Minutes** — 6 numbered steps with time budgets totaling 5:45 plus a realism caveat (~20 min cold).
6. **Common Mistakes to Avoid** — 5 specific mistakes, internal link back to `/blog/ats-cv-checklist-uae` inside the customisation point.
7. **Build Yours** — closing CTA with link to `https://app.makemycv.ae`.

## Voice conformance

- **No emojis.** The plan requires no emojis. Honored, even though the existing `ats-cv-checklist-uae.mdx` uses ✅/❌ (which I opted not to copy).
- **No exclamation marks except in dialogue.** None in the post.
- **Direct, UAE-aware.** Specific UAE references: DIFC, Marina, Jebel Ali, ADGM, JAFZA, Tasheel, TAMM, MOHRE, Ministry of Foreign Affairs, UAE Embassy attestation. Specific Indian/Pakistani/Filipino/African-origin recipients named without judgment (the audience often comes from these markets). Visa types specified in the language UAE recruiters actually use ("Transferable", "On Visit Visa").
- **Word count:** 1,684 — within the 1,400–1,800 target.

## Internal links inserted

| Anchor text | Target |
|---|---|
| "How UAE Recruiters Actually Judge Your CV" | `/blog/7-seconds-thats-it` |
| "ATS CV Checklist for UAE Recruiters" | `/blog/ats-cv-checklist-uae` |
| "the ATS process" | `/blog/ats-cv-checklist-uae` (second reference) |
| "7-second guide" | `/blog/7-seconds-thats-it` (second reference) |
| "ATS checklist" | `/blog/ats-cv-checklist-uae` (third reference) |
| "app.makemycv.ae" (×2) | `https://app.makemycv.ae` |

## Cover SVG conformance

Followed the `cv-tips.svg` category template exactly:

- 1200×630 viewBox
- Dark navy gradient background (`#0a0f1e` → `#0f172a` → `#1a1040`)
- Blue accent gradient (`#2563eb` → `#818cf8`) — matches plan's CV Tips spec
- Dot pattern overlay
- Two decorative circles (top-right large, bottom-left smaller) using blue tints at 0.06–0.08 alpha
- Vertical accent bar (left, 6×100px)
- "MAKEMYCV.AE" letter-spaced uppercase label
- Two-line headline: "CV Maker" (white) / "Built for Dubai" (accent gradient)
- Subtitle: "A free, ATS-clean CV builder for the UAE — in five minutes" at 60% white
- Horizontal rule (180×4px) under subtitle
- "makemycv.ae/blog" label at 35% white
- Faded "CV" watermark bottom-right at 4% white

Visually parallel to `7-seconds-thats-it.svg` (cyan accent) but using the blue assigned to the CV Tips category — distinct enough on the blog index grid that it won't be mistaken for an existing post.

## Verification you need to run on Windows

Cowork sandbox can't run `npm run build` against this repo (filesystem permission limits on the mount). You need to:

```bash
cd C:\Users\MuhammadAbdullah\Desktop\makemycv-site
git status                                    # confirm new files appear (untracked)
git stash -u                                  # if you want to keep the new files clean while branching
git checkout -b blog/cv-maker-dubai-post      # off preview
git stash pop                                 # restore the new files onto the new branch

npm run build                                 # Velite must compile MDX without schema errors
npm run start
# Then in browser, visit:
#   http://localhost:3000/blog/cv-maker-dubai
# Confirm: page renders, cover image loads, internal links resolve, JSON-LD Article schema present in <head>

git add content/blog/cv-maker-dubai.mdx public/blog/covers/cv-maker-dubai.svg
git commit -m "blog: cv maker dubai (preview)"
git push -u origin blog/cv-maker-dubai-post
# Vercel auto-creates a preview URL
```

## What to check on the Vercel preview

- `/blog/cv-maker-dubai` renders with cover, headings, links
- Internal links to `/blog/7-seconds-thats-it` and `/blog/ats-cv-checklist-uae` work
- `view-source:` confirms `<meta name="description">`, JSON-LD Article schema, OpenGraph image (`/blog/covers/cv-maker-dubai.svg`)
- Post appears on `/blog` index
- Reading time auto-calculated by Velite (no manual frontmatter needed)

## SEO outlook for "cv maker dubai"

- Pre-publish state: 25 GSC impressions over 3 months at 0% CTR (per plan baseline). Indicates we rank on this query but too deep to get clicks.
- Realistic post-publish trajectory:
  - **Week 1:** Google indexes the new post. May appear at rank 30–50 initially.
  - **Week 2–4:** With strong on-page signals (keyword in title, H1, slug, first sentence; internal links from authoritative existing posts; UAE-specific terminology depth), expect rank to climb to 15–25.
  - **Week 5–8:** If CTR is meaningful at the new rank, Google compounds it. Reaching page 1 (top 10) is plausible but not guaranteed.
  - **Compounds with Task 4 metadata** changes — both work the same SERP.

## Awaiting your action

Per the plan: **do not merge to main**. Review the preview deploy, mark up anything in this conversation, and we'll iterate before merge.
