/**
 * Import template preview captures from the app repo and build the 544w
 * WebP thumbnails the home showcase uses.
 *
 * Usage:
 *   node scripts/import-template-previews.mjs <templateId> [<templateId> ...]
 *   node scripts/import-template-previews.mjs --all
 *
 * Source: ../makemycv-app/artifacts/template-previews/<id>-preview.png
 *         (and <id>-nophoto-preview.png for photo-forward templates), the
 *         output of `npm run capture:previews` in the app repo.
 * Output: public/templates/<id>-preview.png + <id>-preview-thumb.webp
 *         (+ the -nophoto pair when the source exists).
 *
 * The thumb size (544x769) matches the <img width/height> in
 * components/home/TemplateShowcase.tsx; keep them in step.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("..", "makemycv-app", "artifacts", "template-previews");
const DST = path.resolve("public", "templates");
const THUMB_W = 544;
const THUMB_H = 769;

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("usage: node scripts/import-template-previews.mjs <templateId> ... | --all");
  process.exit(1);
}
const ids = args.includes("--all")
  ? [...new Set(fs.readdirSync(SRC).filter((f) => f.endsWith("-preview.png")).map((f) => f.replace(/(-nophoto)?-preview\.png$/, "")))]
  : args;

let imported = 0;
for (const id of ids) {
  for (const variant of ["", "-nophoto"]) {
    const src = path.join(SRC, `${id}${variant}-preview.png`);
    if (!fs.existsSync(src)) {
      if (variant === "") console.warn(`missing ${src}`);
      continue;
    }
    const png = path.join(DST, `${id}${variant}-preview.png`);
    const webp = path.join(DST, `${id}${variant}-preview-thumb.webp`);
    fs.copyFileSync(src, png);
    await sharp(src).resize(THUMB_W, THUMB_H, { fit: "cover", position: "top" }).webp({ quality: 82 }).toFile(webp);
    const kb = (f) => Math.round(fs.statSync(f).size / 1024);
    console.log(`${id}${variant}: ${path.basename(png)} ${kb(png)}KB, ${path.basename(webp)} ${kb(webp)}KB`);
    imported++;
  }
}
console.log(`${imported} image pair(s) written to ${DST}`);
