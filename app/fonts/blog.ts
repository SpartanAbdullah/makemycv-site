import localFont from "next/font/local";

/**
 * Blog-index-only faces: Plus Jakarta Sans (display/body) + IBM Plex Mono
 * (labels/meta). The rest of the site keeps Inter + JetBrains Mono — that
 * scoping is a confirmed design decision, see docs/blog-redesign-notes.md.
 *
 * ── This file MUST stay separate from ./site.ts ────────────────────────────
 * next/font emits a <link rel="preload"> for every face declared in a module a
 * route imports. Merging these into site.ts made every page on the site
 * preload both blog faces — 4 files, ~72 KiB, on routes that never render
 * them. Keeping them here confines the cost to /blog, which is the only route
 * that applies the variables.
 *
 * Self-hosted for the same reason as site.ts: these two are precisely the faces
 * whose gstatic URLs 404'd and failed the 2026-08-11 staging build.
 *
 * Plus Jakarta Sans is a VARIABLE font (one file covers 400–800). IBM Plex Mono
 * is static, so it needs one file per weight.
 */

export const plusJakarta = localFont({
  src: "./plus-jakarta-variable.woff2",
  weight: "400 800",
  style: "normal",
  variable: "--font-plus-jakarta",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const ibmPlexMono = localFont({
  src: [
    { path: "./ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
    { path: "./ibm-plex-mono-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
