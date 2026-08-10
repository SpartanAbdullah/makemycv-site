# CLAUDE.md — makemycv-site

Marketing/content site for MakeMyCV (makemycv.ae) — UAE CV builder. Next.js 16 App Router + React 19 + Tailwind 4, Velite-powered MDX blog, deployed on Vercel, Sentry instrumented.

## Workflow rules

- **All work happens on `staging`.** `main` is production; do not commit to it directly. Every other branch has been deliberately deleted.
- Do not edit `.env.local` (real secrets). `.env.example` documents the shape.
- No `gh` CLI on this machine; remotes embed credentials — plain `git push origin staging` works.

## Commands

```
npm run dev        # velite dev & next dev (or use .claude/launch.json preview)
npm run build      # velite build && next build — the real gate; TS errors surface here
npm run lint       # eslint, --max-warnings=2 (strict — 3 warnings fail)
npm run test       # calculators + resignation-letter stress tests (tsx scripts)
npx tsc --noEmit   # fast type check without a full build
```

## Structure

- `content/blog/*.mdx` — blog posts (Velite collection `posts`, schema in [velite.config.ts](velite.config.ts))
- `content/templates/*.mdx` — CV template cards
- `app/` — App Router pages; calculators (gratuity, notice-period, annual-leave), resume-checker, jd-match, resignation-letter-generator
- `lib/seo.ts`, `lib/seo-schema.ts`, `lib/og-image.ts`, `lib/blog.ts` — SEO/metadata helpers
- `scripts/` — og-cover rendering (`render-og-covers.mjs`), calculator stress tests
- `PLAN.md` / `PROGRESS.md` / `DECISION_LOG.md` — active GEO build tracking; update PROGRESS.md when finishing content sessions

## Blog post conventions

- Frontmatter must match the Velite schema: `title` (≤100), `excerpt` (≤300), `date` (ISO), `category` (one of the six enum values), `tags`, `coverImage`. Set `dateModified` when refreshing an existing post — don't rewrite `date`.
- `faqs` array → FAQPage JSON-LD, but ONLY if the same Q/As are visible in the post body (schema must mirror visible content).
- Cover images live in `public/blog/covers/`; raster og:images are generated with `node scripts/render-og-covers.mjs`.
- Retiring/consolidating a post: delete the MDX AND add a 301 in `next.config.ts` `redirects()` (see existing old-blog-slug entries). Never leave a published slug 404ing.
- Do not re-add `rehypeAutolinkHeadings` — it broke heading extraction in syndication (see comment in velite.config.ts).
- After content changes, `npm run build` must pass — Velite validates frontmatter at build time.
- **After creating or editing any `content/blog/*.mdx`, ALWAYS run the `seo-reviewer` subagent on the changed file(s) before committing.** Apply all BLOCKER and SHOULD FIX findings; mention NICE items to the user.

## Blog content pipeline (Claude Code and Cowork follow the same steps)

Applies to any new post or refresh, however the work arrives. Cowork has this as the
`makemycv-blog-ship` skill; this section is the same pipeline for Claude Code.

**1. Dedup before writing anything.**
```
git ls-tree --name-only origin/main content/blog/
```
Never judge coverage from the rendered `/blog` index — it shows only ~6 cards and has already
caused one duplicate-topic mistake. Compare by *search intent*, not title wording. If an existing
post owns the same primary query, **refresh it** (`dateModified`, leave `date` alone) rather than
adding a cannibalising slug. Known collision clusters:
- ATS mechanics → `does-dubai-use-ats`, `ats-cv-checklist-uae`, `cv-format-uae-2026`
- AI / ChatGPT CV → `can-chatgpt-write-cv` owns this intent outright
- Dubai job search → `how-to-get-a-job-in-dubai-2026`, `why-cv-ignored-dubai`, `uae-hiring-season-september`
- Making a CV → `how-to-make-cv-for-job-in-uae` vs `...-in-dubai` (already close; don't add a third)

**2. Verify every statistic against its source URL before it enters a draft.** Recurring failure
modes, all observed in real briefs:
- Paraphrase presented as a direct quote — confirm exact wording or don't quote.
- Invented precision — "64%" where the source says "nearly two-thirds".
- **Market conflation** — Gulf research often reports *Saudi* headline figures with a UAE
  sub-finding. This is a UAE site; label every figure with its market.
- Missing methodology — if sample size/fieldwork dates aren't published, say so in the post.

Drop what can't be verified; don't soften it.

**3. Content guardrails — never publish:**
- "Recruiters spend 6 seconds per CV" / "6–8 seconds" / "the 7-second rule" / "seven seconds".
  Real study, but US eye-tracking, not UAE. Acceptable as hero brand copy; **never in advice
  content, and never in `faqs:`** (that becomes FAQPage schema — the version Google and LLMs quote).
- "92% of UAE recruiters reject American-style resumes" and related callback figures — unsourced.
- **"CV", not "resume"** in human-facing copy. "Resume" only as ATS vocabulary.

**4. Every post gets an FAQ section** (5–7 entries) with matching `faqs:` frontmatter. Questions
phrased as real search queries; each answer must stand alone as a quotable extract.

**5. Write for AI citation as well as search:** self-contained claim sentences, source named and
dated inline with the figure, question-shaped headings, a stated position, honest caveats.

**6. Validate** — the Cowork skill ships `validate_post.py` (frontmatter limits, category enum,
FAQ↔body mirroring, dead internal links, banned claims, H1-in-body, thin sections). Then
`npm run build`, then the `seo-reviewer` subagent.

**7. Log** in `COWORK_CHANGELOG.md`, including any source corrections made, so they aren't
reintroduced next week.

## Gotchas

- `withSentryConfig` wraps next.config — headers() and redirects() must survive any refactor there; verify with `curl -sI https://makemycv.ae/pricing`.
- Next 16 dynamic imports have a known gotcha (see memory / DECISION_LOG) — prefer static imports unless needed.
- `.velite/` and `tsconfig.tsbuildinfo` are generated; never hand-edit.
