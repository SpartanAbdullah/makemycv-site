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
