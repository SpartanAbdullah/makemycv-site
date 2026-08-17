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
