import localFont from "next/font/local";

/**
 * Site-wide faces: Outfit (display AND body — one geometric sans for the whole
 * site since the 2026-08 premium reskin; Bricolage Grotesque + Inter retired),
 * JetBrains Mono (labels).
 *
 * ── Why self-hosted instead of next/font/google ────────────────────────────
 * `next/font/google` downloads from fonts.gstatic.com AT BUILD TIME and bakes
 * the resolved URLs into the build cache. Google rotates those hashed URLs, so
 * a cached build can request a file that no longer exists. That is exactly what
 * broke the staging preview on 2026-08-11 (deployment
 * dpl_BzJVro4NZeJJofGcyzh5wMdmdshK): three Plus Jakarta Sans woff2 URLs
 * returned 404, cascading into module-not-found and failing `npm run build`.
 * The identical commit built fine for production seconds later because it
 * restored a different, not-yet-stale cache — the code was never at fault.
 *
 * Self-hosting makes the build hermetic: no network fetch, so that whole class
 * of failure is off the deploy path. Fonts are static assets that do not change.
 *
 * ── KEEP ROUTE-SCOPED FACES OUT OF THIS FILE ───────────────────────────────
 * next/font registers a <link rel="preload"> for every face declared in a
 * module that a route pulls in. When five faces lived in one module, every
 * page preloaded the two blog-only faces as well — 4 extra files, ~72 KiB, on
 * pages that never rendered them. (The blog faces were retired with the
 * 2026-08 blog-index reskin.) Adding a face here means every route pays for it.
 *
 * ── Variable vs static ─────────────────────────────────────────────────────
 * Both ship as VARIABLE fonts — Google returns one byte-identical file for
 * every weight requested (verified by md5), so one file covers the whole range.
 * Outfit's range runs 200–800: 200 for airy subtitles/labels, 400 body,
 * 500–700 for nav/buttons/headings.
 *
 * `adjustFontFallback: "Arial"` reproduces the metric-adjusted fallback face
 * that next/font/google generated automatically, which is what holds CLS down
 * while the real face loads. The mono face opts out — Arial's metrics are wrong
 * for a monospace fallback — and uses an explicit monospace stack instead.
 *
 * To refresh a file: pull the latin-subset woff2 from the Google Fonts CSS API
 * with a browser User-Agent (a non-browser UA returns ttf, not woff2).
 */

export const outfit = localFont({
  src: "./outfit-variable.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-outfit",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const jetbrainsMono = localFont({
  src: "./jetbrains-mono-variable.woff2",
  weight: "500 600",
  style: "normal",
  variable: "--font-jetbrains-mono",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
