# Arch Recon — makemycv-site

## 0. Identity & deployment reality
- Type (marketing site / web app / API): **Marketing site** (static, brochure-style funnel). All "build CV" CTAs hard-link out to `https://app.makemycv.ae` (separate codebase, not this repo).
- Language(s) & framework(s) + versions: TypeScript ^5, React 19.2.3, Next.js 16.1.6 (App Router). Velite 0.3.1 for MDX content compilation.
- Build tool & package manager: Next.js + Velite (`velite build && next build`). Package manager: **npm** (`package-lock.json` present, no pnpm/yarn lockfile).
- Is it deployed? Where (host)? Public URL if findable in config:
  - Strongly implied host: **Vercel** — `@vercel/analytics` and `@vercel/speed-insights` deps in [package.json:13-14](package.json), `vercel.svg` asset, `.vercel` in [.gitignore:38](.gitignore).
  - Public URL: `https://www.makemycv.ae` (constant in [lib/seo.ts:4](lib/seo.ts)). Apex `makemycv.ae` 301-redirects to `www` via [next.config.ts:25-29](next.config.ts).
  - Linked external app: `https://app.makemycv.ae` (separate repo, hard-coded in 21 files).
  - Git remote: `https://github.com/SpartanAbdullah/makemycv-site.git`.
- Does it call any paid/metered external API (LLM, email, SMS, payments, storage)? List each + the file:line where it's called:
  - **Formspree** (contact form, hosted form-handler) — [app/contact/ContactForm.tsx:26](app/contact/ContactForm.tsx). Free tier on form ID `mqeykryy`. Not strictly metered per call but has monthly submission caps.
  - **Google Tag Manager / GA4** (analytics, free tier) — [app/layout.tsx:101](app/layout.tsx) (GTM container `GTM-5H2LMVJT`). GA4 ID `G-8MWPD87FJH` is wired through GTM (mentioned in AUDIT.md, not in code).
  - **Vercel Analytics + Speed Insights** — [app/layout.tsx:4-5,138-139](app/layout.tsx). Metered by Vercel plan.
  - **Ko-fi** (tip jar, external link only — no server call) — [components/TipJar.tsx:16](components/TipJar.tsx).
  - **PayPal.me** (tip jar, external link only — no server call) — [components/TipJar.tsx:17](components/TipJar.tsx).
  - **No LLM / no SMS / no payments processor / no storage API** is called from this repo. Any AI / PDF / payment work lives in `app.makemycv.ae` (separate repo).

## 1. The stack
- Frontend: framework, routing, state management, styling:
  - Framework: **Next.js 16 App Router**, React 19, TypeScript.
  - Routing: file-based App Router. No middleware (no `middleware.ts` at root — confirmed via Glob).
  - State management: **none** beyond `useState` inside the contact form ([app/contact/ContactForm.tsx](app/contact/ContactForm.tsx)) and navbar mobile menu ([components/Navbar.tsx](components/Navbar.tsx)). Site is essentially static.
  - Styling: **Tailwind CSS v4** with `@tailwindcss/postcss`, `@tailwindcss/typography`. Fonts: Inter + JetBrains Mono via `next/font/google`. Icons: `lucide-react`. Carousel: `embla-carousel-react`.
- Backend / API: any server-side code? serverless functions? runtime? Where does business logic live — client or server:
  - **No `/app/api` directory** (confirmed via Glob), **no API routes, no server actions visible**, **no middleware**.
  - Server-side code is limited to Next.js framework primitives: static page generation, `app/sitemap.ts` (reads filesystem at build to enumerate MDX), `app/robots.ts`. Velite compiles MDX at build into `.velite/`.
  - There is **no business logic** in this site — it's a marketing funnel. The actual builder is `app.makemycv.ae`.
- Database / storage: localStorage / Supabase / Postgres / other? What tables or stores exist? Where are DB credentials referenced:
  - **No database in this repo.** No Supabase / Postgres / Prisma / ORM imports.
  - **localStorage**: one write — `mmcv_tipped_at` ISO timestamp in [components/TipJar.tsx:21](components/TipJar.tsx). Used to suppress repeat tip-jar prompts (read site never references the read in this audit — only the write is in the repo).
  - **Content "store"**: MDX files on disk in `content/blog/` (10 posts) and `content/templates/` (5 templates), compiled by Velite into `.velite/`. Schemas defined in [velite.config.ts:6-54](velite.config.ts).
  - No DB credentials anywhere.
- Auth & permissions: is there auth? what type? Any Row-Level-Security policies in code/migrations, or is access client-trusted:
  - **No auth in this repo.** No login/signup/session pages. No NextAuth, no Clerk, no Supabase Auth. No cookies set by app code. No RLS (no DB).
  - Implicit posture: everything public, no user accounts on the marketing site.
- Cache / CDN: any caching or CDN config in the repo:
  - No explicit cache headers configured beyond Next.js defaults.
  - CDN is whatever Vercel provides by default (UNKNOWN — needs dashboard check for edge-region / cache-rule customization).
  - Security headers set in [next.config.ts:3-15](next.config.ts): X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS, Permissions-Policy.
  - Redirects in [next.config.ts:22-40](next.config.ts): apex → www, `/sitemap_index.xml` → `/sitemap.xml`, `/pricing` → `/support`.

## 2. Build & ship
- Git: branches present? is a real .env file committed (yes/no)? does .gitignore cover secrets:
  - Branches (local + remote): `main` (current), `preview`, `claude/eager-zhukovsky`, `claude/heuristic-ishizaka`. Remote `origin` → `github.com/SpartanAbdullah/makemycv-site`.
  - **No real `.env*` file committed.** `git ls-files .env*` returns only `.env.example`.
  - `.gitignore` covers secrets correctly: `.env*` ignored with `!.env.example` allowlist ([.gitignore:34-35](.gitignore)). Also ignores `.vercel`, `node_modules`, `.next`, `.velite`, `*.tsbuildinfo`, `*.pem`.
- Secrets handling: how are API keys stored? any hardcoded/committed keys (report file:line, NOT the value):
  - **No API keys/secrets are needed by this site** — it has no server-side calls to authenticated services. Formspree is unauthenticated (public form ID), Ko-fi/PayPal are plain hyperlinks, GTM/GA4/Vercel Analytics use public container/measurement IDs.
  - **Public identifiers present in code** (not secrets, but hardcoded):
    - GTM container ID `GTM-5H2LMVJT` — [app/layout.tsx:101](app/layout.tsx) and [app/layout.tsx:110](app/layout.tsx). Public by design.
    - Formspree form ID — [app/contact/ContactForm.tsx:26](app/contact/ContactForm.tsx). Public endpoint.
    - Google Search Console verification token — [app/layout.tsx:76](app/layout.tsx). Public by design.
    - Default Ko-fi username `makemycv_ae` fallback — [components/TipJar.tsx:12](components/TipJar.tsx). Public.
    - Default PayPal handle `Abdullah2431` fallback — [components/TipJar.tsx:14](components/TipJar.tsx). Public.
  - **No private credentials found.**
- Env config: is .env.example present? list the env var NAMES expected:
  - [.env.example](.env.example) present. Variables expected:
    - `NEXT_PUBLIC_KOFI_USERNAME`
    - `NEXT_PUBLIC_PAYPAL_ME_HANDLE`
  - Both are public-prefixed and have hardcoded fallbacks in [components/TipJar.tsx:11-14](components/TipJar.tsx), so the site will build without them.
- CI/CD: any pipeline/config files (.github/workflows, vercel.json, netlify.toml, etc.) — list them:
  - **None present in repo** (confirmed via Glob: no `.github/`, no `vercel.json`, no `netlify.toml`, no `Dockerfile`, no `wrangler.toml`).
  - Deployment appears to be Vercel's default Git integration (push to main → deploy). UNKNOWN — needs Vercel dashboard check for project settings, env vars, preview branch wiring.

## 3. Run & survive
- Error tracking / logging: anything (Sentry, etc.) or none:
  - **None.** No Sentry / Datadog / Bugsnag / Logflare / Axiom imports anywhere.
  - Only `@vercel/analytics` and `@vercel/speed-insights`, which capture pageviews and Core Web Vitals — not exceptions.
- Rate limiting / abuse protection: any, especially on endpoints that call paid APIs:
  - **None in this repo** — there are no first-party endpoints to rate-limit. Formspree handles its own abuse protection externally.
- Input validation: present on user/API inputs:
  - One form (contact). Client-side validation only: `required` + `type="email"` HTML attributes in [app/contact/ContactForm.tsx:71-87](app/contact/ContactForm.tsx). No length caps, no Zod/Yup schema, no sanitization. Formspree does whatever server-side validation it does.
  - Velite uses `zod`-style schemas to validate MDX frontmatter at build ([velite.config.ts:9-29](velite.config.ts)) — content-time, not runtime user input.
- Tests: framework + rough coverage signal (count of test files):
  - **Zero tests.** No `tests/`, `__tests__/`, `e2e/`, `*.test.ts(x)`, or `*.spec.ts(x)` outside `node_modules`. No Jest/Vitest/Playwright/Cypress in dependencies.
- Backups / recovery: anything in the repo about this:
  - **Nothing.** Site is fully static + git history; "backup" is effectively the git remote on GitHub. Content (MDX) is in-repo. UNKNOWN whether Vercel deployment history / preview deploys are relied on for rollback.

## 4. Cannot be determined from repo
The following all require dashboard/host/external checks:

- **Vercel project**: plan/tier, region(s), build settings, env vars actually set in dashboard, custom domains, edge-config, ISR/cache settings, log retention, who has owner/team access.
- **DNS / CDN**: who runs DNS for `makemycv.ae` (Cloudflare? Vercel? registrar?), what CNAME/A records exist, whether Cloudflare proxy is in front, WAF rules, bot protection.
- **Spending / billing limits**: Vercel plan and overage caps, Formspree plan + monthly submission quota, Google Tag Manager / GA4 quota (free but has data-limits).
- **Formspree configuration**: whether form `mqeykryy` has reCAPTCHA, file-upload limits, autoresponder, spam filters, where submissions are emailed to.
- **Google Tag Manager**: what tags fire inside container `GTM-5H2LMVJT` (GA4 confirmed, Ads/Floodlight/Hotjar/Meta pixel UNKNOWN), whether consent mode is configured server-side, conversion goals.
- **Ko-fi & PayPal accounts**: link target ownership, payout config, refund policy enforcement, KYC status. The repo only contains the public usernames; account control is external.
- **Search Console / Bing Webmaster**: ownership, indexed page count, manual actions, sitemaps submitted, crawl errors.
- **app.makemycv.ae (the actual product)**: entirely separate repo. Every architectural question about auth, DB, AI, payments, PDF, data residency, PDPL compliance lives over there — this marketing repo is a pure shell.
- **GitHub repo settings**: branch protection on `main`, required reviews, who has write/admin, secret scanning enabled, Dependabot, action workflows that might be defined at the org level rather than in-repo.
- **Production access**: who currently holds Vercel deploy keys, GitHub admin, Formspree login, Ko-fi/PayPal logins, GTM/GA4 access, domain registrar credentials.
- **Backup / DR**: any external backup of MDX content / Vercel deployment snapshots beyond default platform retention.
- **Privacy/compliance state**: cookie consent gate — GTM currently fires `lazyOnload` with no consent banner in code (flagged in AUDIT.md). Whether a DPA exists with Formspree/Vercel/Google. Whether `hello@makemycv.ae` is actually a working inbox.
