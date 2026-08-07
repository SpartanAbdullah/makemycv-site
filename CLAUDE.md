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

## Gotchas

- `withSentryConfig` wraps next.config — headers() and redirects() must survive any refactor there; verify with `curl -sI https://makemycv.ae/pricing`.
- Next 16 dynamic imports have a known gotcha (see memory / DECISION_LOG) — prefer static imports unless needed.
- `.velite/` and `tsconfig.tsbuildinfo` are generated; never hand-edit.
