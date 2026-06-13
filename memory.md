# MakeMyCV Marketing Site — Living Doc / memory.md

This file tracks the current state of the marketing site and recent changes. Update it on every working session.

## Architecture (current)

- Next.js 16 (App Router), TailwindCSS, hosted on Vercel.
- Blog content: MDX files in `content/blog/`, compiled at build time by **Velite** into `.velite/`. The `build` script is `velite build && next build`.
- Blog data access lives in `lib/blog.ts` (`getAllPosts`, `getFeaturedPosts`, etc.).
- Blog listing page: `app/blog/page.tsx`. Single post page: `app/blog/[slug]/page.tsx`.

## Change Log

### 2026-06-13 — Fix: blog page only showed 8 of 10 posts

**Symptom:** After pushing new blog posts, the `/blog` page kept showing only 8 posts.

**Root cause (logic, not caching):** `app/blog/page.tsx` rendered two sections:
- *Featured Guides* = `getFeaturedPosts()` → `.filter(featured).slice(0, 3)` (capped at 3).
- *All Articles* = `allPosts.filter((p) => !p.featured)` → excluded **all** featured posts.

With 5 posts marked `featured: true`, only the newest 3 showed in Featured, and the All Articles grid excluded all 5 featured. Result: 3 + 5 non-featured = 8 visible; the 2 overflow featured posts (`cv-format-uae-2026`, `uae-cv-format-guide`) appeared nowhere. Velite was loading all 10 correctly — the math (10 → 8) confirmed the bug was purely in the listing logic.

**Fix:** `regularPosts` now excludes only the posts actually displayed in Featured (the top 3), so every post appears exactly once:
```ts
const featuredSlugs = new Set(featuredPosts.map((p) => p.slugPath))
const regularPosts = allPosts.filter((p) => !featuredSlugs.has(p.slugPath))
```
Now: 3 featured + 7 in All Articles = all 10 posts, no duplicates. Type-safe, no new deps, no build risk.

**Note for future:** This page has no pagination. As the post count grows, consider paginating "All Articles" rather than reintroducing any hard cap.

### 2026-06-13 — Fix: blog title background went white (missing .bg-gradient-hero)

**Symptom:** The blog page title section background changed (white-on-white / no dark backdrop).

**Root cause:** The "design system foundation" refactor (commit `cb64912`) removed the `.bg-gradient-hero` class from `app/globals.css`, but it is still referenced by the hero and CTA sections of `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, and `app/author/makemycv-team/page.tsx`. Those sections use `text-white`, so without the dark gradient they rendered on transparent/white. Unrelated to the post-listing fix — it just shipped in the same push.

**Fix:** Restored the original definition in the legacy section of `globals.css`:
```css
.bg-gradient-hero {
  background: linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%);
}
```
Fixes blog index, single post, and author pages in one place.

**Note for future:** The legacy pages (blog, author, about, contact) still depend on the pre-refactor utility classes. Worth migrating them onto the new design-system primitives so undefined-class regressions like this can't recur.

## ⚠️ Open issue — repo line endings (CRLF vs LF)

The working tree currently shows ~89 files as "changed" with near-equal +/- counts. This is a **line-ending flip**: committed files are LF, working-tree files are now CRLF. It is noise, not real edits, but if committed it will bury real diffs and cause churn for collaborators.

Recommended: add a `.gitattributes` with `* text=auto eol=lf` and re-normalize, OR set `git config core.autocrlf` consistently, before committing. When committing the two fixes above, stage **only** `app/blog/page.tsx`, `app/globals.css`, and `memory.md` to avoid pushing the CRLF churn.
