/**
 * Generates public/og/<page>.png: one 1200x630 share card per tool page, so a
 * calculator link pasted into WhatsApp or LinkedIn shows what the tool is
 * instead of the generic site card (public/og-image.png, which every non-blog
 * page shared until 2026-11-21).
 *
 *   node scripts/generate-tool-og.mjs
 *
 * Same palette and lockup rule as scripts/generate-og-image.mjs: the logo is
 * composited from public/logos/logo-white.svg, never typeset. Edit the CARDS
 * list and re-run; never hand-edit the PNGs. A page uses its card through the
 * `image` option of buildPageMetadata (lib/seo.ts).
 */

import sharp from "sharp";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "og");

const W = 1200;
const H = 630;
const NAVY = "#0f172a";
const GRID = "#1e293b";
const GOLD = "#c49a48";
const WHITE = "#ffffff";
const MUTED = "#94a3b8";
const SANS = "Segoe UI, Inter, Arial, sans-serif";

/* `title` is one or two lines; `sub` is one or two lines. Keep each line under
   about 30 (title) and 52 (sub) characters or it runs off the card. */
const CARDS = [
  {
    file: "gratuity-calculator",
    eyebrow: "UAE LABOUR LAW · FREE CALCULATOR",
    title: ["UAE Gratuity", "Calculator"],
    sub: ["End-of-service pay: 21 days of basic pay per year", "for years 1 to 5, 30 days per year after."],
  },
  {
    file: "notice-period-calculator",
    eyebrow: "UAE LABOUR LAW · FREE CALCULATOR",
    title: ["UAE Notice Period", "Calculator"],
    sub: ["Your notice period, your last working day", "and pay in lieu of notice."],
  },
  {
    file: "annual-leave-calculator",
    eyebrow: "UAE LABOUR LAW · FREE CALCULATOR",
    title: ["UAE Annual Leave", "Calculator"],
    sub: ["The leave you have earned and what unused days", "are worth at the end of service."],
  },
  {
    file: "resignation-letter-generator",
    eyebrow: "UAE LABOUR LAW · FREE TOOL",
    title: ["UAE Resignation", "Letter Generator"],
    sub: ["A ready-to-send letter with your notice period", "and last working day filled in."],
  },
  {
    file: "resume-checker",
    eyebrow: "FREE TOOL · NO SIGN-UP",
    title: ["Free ATS CV Checker", "for UAE Jobs"],
    sub: ["See what an applicant tracking system reads", "in your CV before you apply."],
  },
  {
    file: "jd-match",
    eyebrow: "FREE TOOL · NO SIGN-UP",
    title: ["Match Your CV", "to Any UAE Job"],
    sub: ["Paste a job description and see what", "your CV covers and what it misses."],
  },
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function background(card) {
  const grid = [];
  for (let x = 0; x <= W; x += 48) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${GRID}" stroke-width="1"/>`);
  for (let y = 0; y <= H; y += 48) grid.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`);
  const title = card.title
    .map((line, i) => `<text x="80" y="${290 + i * 88}" font-family="${SANS}" font-size="78" font-weight="700" fill="${WHITE}" letter-spacing="-1.5">${esc(line)}</text>`)
    .join("");
  const subTop = 290 + card.title.length * 88 - 18;
  const sub = card.sub
    .map((line, i) => `<text x="82" y="${subTop + i * 40}" font-family="${SANS}" font-size="29" font-weight="400" fill="${MUTED}">${esc(line)}</text>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  ${grid.join("")}
  <rect x="0" y="0" width="12" height="${H}" fill="${GOLD}"/>
  <text x="82" y="196" font-family="${SANS}" font-size="22" font-weight="600" fill="${GOLD}" letter-spacing="3">${esc(card.eyebrow)}</text>
  ${title}
  ${sub}
  <text x="${W - 80}" y="${H - 56}" text-anchor="end" font-family="${SANS}" font-size="24" font-weight="600" fill="${WHITE}">www.makemycv.ae</text>
</svg>`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const logo = await sharp(path.join(ROOT, "public", "logos", "logo-white.svg"), { density: 300 })
  .resize({ height: 64 })
  .png()
  .toBuffer();

for (const card of CARDS) {
  const out = path.join(OUT_DIR, `${card.file}.png`);
  await sharp(Buffer.from(background(card)))
    .composite([{ input: logo, left: 80, top: 62 }])
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`wrote public/og/${card.file}.png`);
}
