/**
 * Link-preview crawlers (Facebook, LinkedIn, WhatsApp, X) don't render SVG
 * og:images, so shares of SVG-covered posts show a blank card. Covers stay
 * SVG on-page; og:image and Article schema use a pre-rendered 1200x630 PNG
 * sibling when one exists — scripts/render-og-covers.js keeps them in sync.
 *
 * Server-only (uses fs at build/render time) — never import from a
 * "use client" file.
 */
import fs from "node:fs";
import path from "node:path";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

export function rasterCover(image: string | null | undefined): string {
  if (!image) return DEFAULT_OG_IMAGE;
  if (!image.endsWith(".svg")) return image;
  const png = image.replace(/\.svg$/, ".png");
  return fs.existsSync(path.join(process.cwd(), "public", png)) ? png : image;
}
