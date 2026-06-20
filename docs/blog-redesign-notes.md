# Blog redesign — decisions & notes

Ported from the approved standalone mockup ("Career Resource OS") into real
Next.js components fed by Velite. Visual reference only; no mockup markup,
sample posts, or placeholder numbers were shipped.

Scope: **blog INDEX page only** (`/blog`). The article page (`/blog/[slug]`),
the CV parser, PDF rendering, and builder state were not touched.

## Decisions

1. **Dark theme (revisitable).** The blog index uses a dark theme (`#0a0f1e`)
   per the chosen mockup, while the rest of the site (nav, footer, other pages)
   is light. This makes `/blog` a deliberate dark "island" between the light
   global Navbar and Footer. **The user confirmed this is intended for now and
   we may revert to a light theme later.** If reverting: the layout, type, cover
   system, and filter logic are theme-agnostic — only the colour classes on
   `app/blog/page.tsx` + `components/blog/BlogIndexClient.tsx` + `BlogCover.tsx`
   need to change.

2. **Fonts.** Plus Jakarta Sans (display/body) + IBM Plex Mono (labels/meta) via
   `next/font`, scoped to the blog index only (`app/blog/fonts.ts`, applied on the
   page wrapper). The rest of the site keeps Inter + JetBrains Mono.

3. **Reading time** is computed from the post body via Velite `s.metadata()`
   (real word-count based), surfaced as `post.metadata.readingTime`. Falls back
   to an explicit `readingTime` frontmatter value if ever set.

4. **Covers** use each post's existing `coverImage` SVG, rendered at its natural
   1200×630 ratio (no crop) so the artwork and text are fully visible and never
   touch the edges. A `<BlogCover>` fallback generates a padded category+title
   cover when a post has no real cover.

## Removed from the mockup (un-backed by real data — not faked)

The mockup's centrepiece was a "router": filter guides by **situation**
(Fresher/Mid-career/Executive…), **nationality** (Indian/Filipino/UK…), and
**city**, plus a per-post **"MATCH %"** relevance score and ring. None of this is
backed by real data — our posts have no situation/nationality/city tags and no
match score. Per the "verifiable content only" rule, the following were **removed,
not faked**:

- Situation / nationality / city facet "router" + active-profile chips + localStorage profile.
- Per-post `MATCH %` scores, the cover progress ring, "Top match for you" labels, and count-up animation.
- Footer "Routes" shortcuts (Freshers, Indian → UAE, …) — same missing tags.
- Mockup nav "Pricing" link (site is on the free model; no pricing page).
- Sample posts and the hardcoded "12 guides" count.

**What replaced them (all real-data-backed):** free-text **search** (title +
excerpt + category), **category** tab filtering (derived from categories that
actually have posts), **load-more** pagination (6/page), the **featured** flag for
hierarchy, and real `title`/`excerpt`/`category`/`date`/`author`/`readingTime`.

> Future option: if we add `audience`/`situation`/`nationality`/`city` tags to
> the post frontmatter and tag every post, the mockup's "router" could be built
> for real as a follow-up. That's a content effort, not a visual port.

## Preserved
- BlogPosting/Article + FAQ JSON-LD on `/blog/[slug]` (untouched).
- Answer-first intros + visible FAQ in post bodies (untouched).
- Sitemap published-filter (untouched).
- Breadcrumb JSON-LD on the index.
