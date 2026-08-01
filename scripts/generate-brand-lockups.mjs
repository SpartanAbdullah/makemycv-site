/**
 * Generates the raster horizontal lockups in brand/ from the vector logos in
 * public/logos/.
 *
 *   node scripts/generate-brand-lockups.mjs
 *
 * These exist for surfaces that will not accept SVG — LinkedIn, slide decks,
 * email signatures, third-party directories. Everything on the website itself
 * should use the SVGs directly.
 *
 * Why this script exists: the 2026-08-02 brand drop shipped these three files
 * clipped at the right edge, cutting the wordmark mid-glyph so it read
 * "MakeMyCV." with the ".ae" missing — the exact string the entity work in
 * lib/seo.ts exists to establish. Generating them from the SVGs instead means
 * the wordmark is the outlined Poppins artwork, stays lowercase, and the canvas
 * is padded by construction so it cannot clip again.
 *
 * Verified after writing: no ink may touch any edge of the canvas.
 */

import sharp from "sharp";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOGOS = path.join(ROOT, "public", "logos");
const OUT = path.join(ROOT, "brand");

const NAVY = "#1B2A4A";
const GOLD = "#C49A48";
const CREAM = "#F4EEE0";

const W = 1400;
const H = 360;
const INNER_W = 1240; // leaves a 80px quiet zone left and right

function readLogo(name) {
  return fs.readFileSync(path.join(LOGOS, name), "utf8");
}

/** Recolours the mark group only; the wordmark's own fills are left alone. */
function recolourMark(svg, shortPeak, tallPeak) {
  const mark = svg.match(/<g transform[\s\S]*?<\/g>/);
  if (!mark) throw new Error("mark group not found");
  const next = mark[0]
    .replace(/fill="#FFFFFF" opacity="0\.75"/, `fill="${shortPeak}"`)
    .replace(/fill="#FFFFFF"(?!\s*opacity)/, `fill="${tallPeak}"`);
  if (next === mark[0]) throw new Error("mark recolour matched nothing");
  return svg.replace(mark[0], next);
}

async function render(svg, { background }) {
  const logo = await sharp(Buffer.from(svg), { density: 900 })
    .resize({ width: INNER_W })
    .png()
    .toBuffer();
  const { height } = await sharp(logo).metadata();
  return sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: logo, left: Math.round((W - INNER_W) / 2), top: Math.round((H - height) / 2) },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Fails loudly if any pixel of ink reaches the canvas edge. */
async function assertUnclipped(buf, label) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels: ch } = info;
  const bg = [0, 1, 2, 3].map((i) => data[i]);
  const differs = (x, y) => {
    const o = (y * width + x) * ch;
    if (bg[3] === 0 && data[o + 3] === 0) return false;
    return [0, 1, 2, 3].some((i) => Math.abs(data[o + i] - bg[i]) > 12);
  };
  let hits = 0;
  for (let x = 0; x < width; x++) if (differs(x, 0) || differs(x, height - 1)) hits++;
  for (let y = 0; y < height; y++) if (differs(0, y) || differs(width - 1, y)) hits++;
  if (hits > 0) throw new Error(`${label}: ${hits} edge pixels — artwork is clipped`);
}

const VARIANTS = [
  {
    file: "lockup-horizontal-light.png",
    note: "full colour, transparent — for light backgrounds",
    svg: () => readLogo("logo-horizontal.svg"),
    background: null,
  },
  {
    file: "lockup-horizontal-navy.png",
    note: "cream/gold mark + white wordmark on solid navy",
    svg: () => recolourMark(readLogo("logo-white.svg"), CREAM, GOLD),
    background: NAVY,
  },
  {
    file: "lockup-horizontal-white.png",
    note: "all white + gold .ae, transparent — for dark backgrounds",
    svg: () => readLogo("logo-white.svg"),
    background: null,
  },
];

for (const v of VARIANTS) {
  const buf = await render(v.svg(), { background: v.background });
  await assertUnclipped(buf, v.file);
  fs.writeFileSync(path.join(OUT, v.file), buf);
  console.log(`wrote brand/${v.file}  ${W}x${H}  — ${v.note}`);
}
