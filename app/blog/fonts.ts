/**
 * Blog-index type pairing, scoped to `/blog` via the page wrapper so the rest
 * of the site keeps Inter + JetBrains Mono. That scoping is a confirmed design
 * decision — see docs/blog-redesign-notes.md, which references this file by name.
 *
 * The faces moved to app/fonts/blog.ts and are now self-hosted; these two are
 * the ones whose gstatic URLs 404'd and failed the 2026-08-11 staging build.
 * Re-exported here so the documented structure still holds.
 */
export { plusJakarta, ibmPlexMono } from "@/app/fonts/blog";
