# Task 2 — Trailing Slash Canonicalization

**Date:** 2026-05-01
**Branch target:** `preview` (overrides plan's "main" — matches user's actual workflow)
**Status:** File change applied to working tree, awaiting user commit + push

## Investigation findings

| File | Hardcoded trailing slashes? |
|---|---|
| `next.config.ts` | No `trailingSlash` setting present |
| `app/sitemap.ts` | Clean — paths stored without trailing slashes (e.g., `/templates`, `/blog`) |
| `lib/seo.ts` | Clean — `canonicalUrl()` produces no-trailing-slash URLs |
| `app/robots.ts` | Clean — only references `/sitemap.xml` (file, not directory) |
| `<Link href="/...">` across `app/`, `components/`, `lib/` (tsx/ts/mdx) | Zero matches via grep |

Conclusion: only the one-line config flag was needed. No internal link cleanup required.

## Change applied

`next.config.ts`: added `trailingSlash: false,` at line 18.

```diff
 const nextConfig: NextConfig = {
+  trailingSlash: false,
   async headers() {
```

## Verification you need to run on Windows

After committing and deploying:

```bash
# Local verification (after npm run dev or npm run start)
curl -I http://localhost:3000/contact/        # expect 308 -> /contact
curl -I http://localhost:3000/pricing/        # expect 308 -> /pricing
curl -I http://localhost:3000/blog/           # expect 308 -> /blog
curl -I http://localhost:3000/contact         # expect 200
curl -I http://localhost:3000/blog/7-seconds-thats-it  # expect 200, no change

# Production verification (after Vercel deploy is live)
curl -I https://www.makemycv.ae/contact/      # expect 308 -> /contact
curl -I https://www.makemycv.ae/pricing/      # expect 308 -> /pricing
```

## Suggested commit (Windows terminal)

```bash
cd C:\Users\MuhammadAbdullah\Desktop\makemycv-site
git status                         # confirm only next.config.ts is meaningfully modified
git diff next.config.ts            # confirm the single +trailingSlash:false line
git add next.config.ts
git commit -m "seo: enforce no-trailing-slash canonicalization"
git push origin preview
```

## Production risk note

`trailingSlash: false` causes Next.js to issue **308 redirects** (permanent) from `/path/` to `/path` site-wide. Existing inbound links with trailing slashes will redirect cleanly — but Google will see this as a canonical change and may take 2–4 weeks to fully reindex. This is expected and is what we want (consolidating authority on the no-slash variants).

The two existing `redirects()` rules (host normalization, sitemap_index) compose cleanly with `trailingSlash: false` — they run independently. No conflict.

## Caveats from the Cowork run

- Working tree shows 36 files as "modified" — this is CRLF/LF noise from a Windows checkout against an LF-stored repo, NOT real edits. Recommend adding a `.gitattributes` with `* text=auto eol=lf` and running `git add --renormalize .` as a separate one-time housekeeping commit.
- `npm run build` could not be run from the Cowork sandbox (the mount has filesystem permission restrictions that block git checkout, file unlinking, etc.). Please run `npm run build` locally to confirm zero TypeScript errors before pushing.
