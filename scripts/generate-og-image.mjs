/**
 * Generates public/og-image.png — the 1200x630 card shown when makemycv.ae
 * links are shared on WhatsApp, LinkedIn and X.
 *
 * This script exists because the original PNG had no source file and had to be
 * reverse-engineered from the pixels. Edit here and re-run; never hand-edit the
 * PNG.
 *
 *   node scripts/generate-og-image.mjs
 *
 * Entity rule (see lib/seo.ts): the wordmark must carry the ".ae". A bare
 * "MakeMyCV" here splits the entity from SITE_NAME, og:site_name and the
 * Organization schema name. The lockup is set lowercase — "makemycv.ae" — which
 * is how the brand sets its wordmark; the title-case "MakeMyCV.ae" is the
 * entity NAME used in metadata and schema, not the drawn logotype.
 *
 * Fonts: the lockup is NOT typeset here. It is composited from
 * public/logos/logo-white.svg, whose wordmark is already outlined from Poppins
 * SemiBold, so it needs no font installed and cannot drift from the brand.
 * Only the surrounding marketing copy uses a system face.
 */

import sharp from "sharp";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "og-image.png");

const W = 1200;
const H = 630;

// Brand palette — public/logos/logo-horizontal.svg + app slate-900 background.
const NAVY = "#0f172a"; // page background (slate-900)
const GRID = "#1e293b"; // 48px graph-paper lines (slate-800)
const GOLD = "#c49a48"; // brand gold — the ".ae" accent
const CREAM = "#f4eee0"; // brand cream — small peak
const WHITE = "#ffffff";
const MUTED = "#94a3b8";

const INK = "#1b2a4a"; // brand navy, used as CV body ink
const INK_SOFT = "#475569";
const INK_FAINT = "#64748b";
const RULE = "#e2e8f0";
const GOLD_TEXT = "#a8802f"; // darkened gold, legible on white
const GOLD_TINT = "#f7f1e4";

const SANS = "Segoe UI, Inter, Arial, sans-serif";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// SVG collapses runs of ordinary whitespace, which closes up the "  ·  "
// separators and swallows the space before a colour-switching tspan. Every
// space that has to survive is a non-breaking space.
const NB = " ";
const SEP = `${NB}${NB}·${NB}${NB}`;

/**
 * Measures rendered text width by rasterising it alone and trimming the
 * transparent margin. Guessing at advance widths is what produces pills whose
 * label overflows the capsule, so the pill geometry below is derived from real
 * measurements instead.
 */
async function measure(text, { size, weight = 400, spacing = 0 }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="${Math.ceil(
    size * 3
  )}"><text x="10" y="${Math.ceil(size * 2)}" font-family="${SANS}" font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" fill="#000">${esc(
    text
  )}</text></svg>`;
  const { info } = await sharp(Buffer.from(svg))
    .trim({ threshold: 1 })
    .toBuffer({ resolveWithObject: true });
  return info.width;
}

function text(t, { x, y, size, weight = 400, fill = WHITE, spacing = 0, anchor = "start" }) {
  return `<text x="${x}" y="${y}" font-family="${SANS}" font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" fill="${fill}" text-anchor="${anchor}">${t}</text>`;
}

/**
 * The real brand lockup, composited from public/logos/logo-white.svg rather
 * than redrawn. That file is the source of truth for both the twin-peaks mark
 * and the outlined lowercase "makemycv.ae" wordmark, so this card cannot drift
 * from the logo the site actually ships.
 *
 * The only change is colour: logo-white draws both chevrons white for dark
 * backgrounds; on this card the mark carries its brand cream/gold. The wordmark
 * stays white with the gold ".ae" exactly as the source defines it.
 */
function brandLockup({ x, y, width }) {
  const src = fs.readFileSync(
    path.join(ROOT, "public", "logos", "logo-white.svg"),
    "utf8",
  );
  let inner = src
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<desc>[\s\S]*?<\/desc>/, "");

  // Recolour inside the mark group only, so the wordmark's white is untouched.
  const mark = inner.match(/<g transform[\s\S]*?<\/g>/);
  if (!mark) throw new Error("logo-white.svg: mark group not found");
  const recoloured = mark[0]
    .replace('fill="#FFFFFF" opacity="0.75"', `fill="${CREAM}"`) // short peak
    .replace('fill="#FFFFFF"', `fill="${GOLD}"`); // tall peak
  if (recoloured === mark[0])
    throw new Error("logo-white.svg: mark fills did not match; recolour failed");
  inner = inner.replace(mark[0], recoloured);

  // Nested <svg> with the source viewBox scales the whole lockup as one unit.
  return `<svg x="${x}" y="${y}" width="${width}" height="${
    width / 3.99
  }" viewBox="0 0 399 100">${inner}</svg>`;
}

/** Replaces the emoji that rendered as tofu boxes in the previous image. */
function pillIcon(kind, x, y) {
  const g = (inner) => `<g transform="translate(${x},${y})" fill="none" stroke="${GOLD}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
  if (kind === "download")
    return g(`<path d="M8 1.5 V11"/><path d="M3.8 7 L8 11.3 L12.2 7"/><path d="M1.8 13.6 H14.2"/>`);
  if (kind === "check")
    return g(`<path d="M8 1.4 L14.4 4.1 V8.2 C14.4 11.6 11.6 13.9 8 14.9 C4.4 13.9 1.6 11.6 1.6 8.2 V4.1 Z"/><path d="M5.2 8 L7.2 10 L10.9 5.9"/>`);
  return g(`<path d="M8 15 C8 15 13.4 10.2 13.4 6.4 A5.4 5.4 0 0 0 2.6 6.4 C2.6 10.2 8 15 8 15 Z"/><circle cx="8" cy="6.3" r="1.9"/>`);
}

async function build() {
  // ---------------------------------------------------------------- backdrop
  const grid = [];
  for (let x = 48; x < W; x += 48)
    grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${GRID}" stroke-width="1"/>`);
  for (let y = 0; y < H; y += 48)
    grid.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`);

  // ------------------------------------------------------------------ lockup
  // Placement offsets: inside the 399x100 source, the drawn content sits at
  // x 27..386, y 35.6..76. The x/y below are chosen so that content lands at
  // roughly (80, 74), matching the composition's left margin and cap line.
  const lockup = brandLockup({ x: 55, y: 41, width: 372 });

  // ---------------------------------------------------------------- headline
  const HEAD = 78;
  const headline = `
    ${text("Build Your CV.", { x: 80, y: 228, size: HEAD, weight: 700, spacing: -1.5 })}
    ${text(`Get Hired in${NB}<tspan fill="${GOLD}">UAE.</tspan>`, {
      x: 80,
      y: 316,
      size: HEAD,
      weight: 700,
      spacing: -1.5,
    })}
    ${text(`Free${SEP}ATS-Optimized${SEP}No Sign-up`, { x: 82, y: 386, size: 27, weight: 400, fill: MUTED })}
  `;

  // ------------------------------------------------------------------- pills
  const PILL_TEXT = 21;
  const PILL_H = 42;
  const PILL_Y = 428;
  const pillDefs = [
    { label: "PDF Export", icon: "download" },
    { label: "ATS-Friendly", icon: "check" },
    { label: "UAE Focused", icon: "pin" },
  ];
  let px = 80;
  const pills = [];
  for (const p of pillDefs) {
    const tw = await measure(p.label, { size: PILL_TEXT, weight: 600 });
    const wPill = 18 + 16 + 10 + tw + 20;
    pills.push(`
      <rect x="${px}" y="${PILL_Y}" width="${wPill}" height="${PILL_H}" rx="${PILL_H / 2}" fill="#16233c" stroke="${GOLD}" stroke-width="1.5"/>
      ${pillIcon(p.icon, px + 18, PILL_Y + 13)}
      ${text(p.label, { x: px + 18 + 16 + 10, y: PILL_Y + 28, size: PILL_TEXT, weight: 600, fill: CREAM })}
    `);
    px += wPill + 14;
  }

  // ---------------------------------------------------------------- CV card
  // Same frame as the previous image so the composition is unchanged.
  const CX = 708;
  const CY = 68;
  const CW = 422;
  const CH = 502;
  const pad = 22;
  const tx = CX + pad;
  const innerW = CW - pad * 2;
  const rule = (y) =>
    `<line x1="${tx}" y1="${y}" x2="${tx + innerW}" y2="${y}" stroke="${RULE}" stroke-width="1"/>`;
  const sectionLabel = (t, y) =>
    text(t, { x: tx, y, size: 11, weight: 700, fill: MUTED, spacing: 1.1 });

  const bullets = [
    "Managed procurement and warehouse coordination",
    "Reduced delivery delays by 30% through better tracking",
    "Led cross-department reporting initiatives",
  ];
  const bulletSvg = bullets
    .map((b, i) => text(`•${NB}${NB}${esc(b)}`, { x: tx, y: 264 + i * 18, size: 11, fill: INK_SOFT }))
    .join("\n");

  const skills = ["Project Management", "SAP", "Odoo ERP", "MS Office", "AutoCAD"];
  let sx = tx;
  const skillSvg = [];
  for (const s of skills) {
    const tw = await measure(s, { size: 9.5, weight: 500 });
    const wChip = tw + 18;
    skillSvg.push(`
      <rect x="${sx}" y="442" width="${wChip}" height="20" rx="10" fill="${GOLD_TINT}"/>
      ${text(esc(s), { x: sx + wChip / 2, y: 455.5, size: 9.5, weight: 500, fill: GOLD_TEXT, anchor: "middle" })}
    `);
    sx += wChip + 6;
  }

  const card = `
    <rect x="${CX}" y="${CY}" width="${CW}" height="${CH}" rx="16" fill="${WHITE}"/>
    ${text("SARAH AHMED", { x: tx, y: 118, size: 23, weight: 700, fill: INK, spacing: 0.3 })}
    ${text("Operations Manager", { x: tx, y: 142, size: 14, weight: 600, fill: GOLD_TEXT })}
    ${text(`Dubai, UAE${SEP}+971 50 000 0000${SEP}email@example.com`, { x: tx, y: 163, size: 10, fill: INK_FAINT })}
    ${rule(179)}
    ${sectionLabel("EXPERIENCE", 203)}
    ${text("Operations Supervisor", { x: tx, y: 224, size: 13.5, weight: 700, fill: INK })}
    ${text(`Gulf Logistics LLC${SEP}2024 – Present`, { x: tx, y: 241, size: 11, fill: INK_FAINT })}
    ${bulletSvg}
    ${rule(322)}
    ${sectionLabel("EDUCATION", 346)}
    ${text("Bachelor of Business Administration", { x: tx, y: 367, size: 13, weight: 700, fill: INK })}
    ${text(`American University of Sharjah${SEP}2018 – 2022`, { x: tx, y: 384, size: 11, fill: INK_FAINT })}
    ${rule(406)}
    ${sectionLabel("SKILLS", 430)}
    ${skillSvg.join("\n")}
    ${text("makemycv.ae", { x: tx, y: 552, size: 10, weight: 600, fill: "#cbd5e1" })}
  `;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${NAVY}"/>
    ${grid.join("\n")}
    <rect x="0" y="0" width="7" height="${H}" fill="${GOLD}"/>
    ${lockup}
    ${headline}
    ${pills.join("\n")}
    ${text("makemycv.ae", { x: 82, y: 578, size: 22, weight: 500, fill: "#334155" })}
    ${card}
  </svg>`;

  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);
  const meta = await sharp(OUT).metadata();
  console.log(`wrote ${path.relative(ROOT, OUT)} — ${meta.width}x${meta.height}`);
  if (meta.width !== W || meta.height !== H)
    throw new Error(`expected ${W}x${H}, got ${meta.width}x${meta.height}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
