import localFont from "next/font/local";

/**
 * Site-wide faces: Inter (body), Bricolage Grotesque (display — the same family
 * the builder app uses, so marketing and product share one typographic voice),
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
 * ── KEEP BLOG FACES OUT OF THIS FILE ───────────────────────────────────────
 * next/font registers a <link rel="preload"> for every face declared in a
 * module that a route pulls in. When all five lived in one module, every page
 * preloaded the two blog-only faces as well — 4 extra files, ~72 KiB, on pages
 * that never render them. Blog faces live in ./blog.ts for that reason. Adding
 * a face here means every route on the site pays for it.
 *
 * ── Variable vs static ─────────────────────────────────────────────────────
 * All three ship as VARIABLE fonts — Google returns one byte-identical file for
 * every weight requested (verified by md5), so one file covers the whole range.
 * Ranges below match the weights previously requested from Google, so rendering
 * is unchanged.
 *
 * `adjustFontFallback: "Arial"` reproduces the metric-adjusted fallback face
 * that next/font/google generated automatically, which is what holds CLS down
 * while the real face loads. The mono face opts out — Arial's metrics are wrong
 * for a monospace fallback — and uses an explicit monospace stack instead.
 *
 * To refresh a file: pull the latin-subset woff2 from the Google Fonts CSS API
 * with a browser User-Agent (a non-browser UA returns ttf, not woff2).
 */

export const inter = localFont({
  src: "./inter-variable.woff2",
  weight: "400 800",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const bricolage = localFont({
  src: "./bricolage-variable.woff2",
  weight: "500 800",
  style: "normal",
  variable: "--font-bricolage",
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
