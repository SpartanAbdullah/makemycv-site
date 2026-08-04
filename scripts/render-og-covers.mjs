/**
 * Renders every public/blog/covers/*.svg to a 1200x630 PNG sibling.
 * lib/og-image.ts swaps og:image / Article schema to the PNG when it
 * exists, because link-preview crawlers don't rasterize SVG.
 *
 * Re-run after adding or editing a cover SVG:
 *   node scripts/render-og-covers.mjs [--force]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const req = createRequire(import.meta.url);

function loadChromium() {
  const candidates = [
    "playwright",
    "playwright-core",
    // Sibling app repo carries Playwright; the site repo doesn't.
    path.resolve(__dirname, "../../makemycv-app/node_modules/playwright"),
  ];
  for (const c of candidates) {
    try {
      return req(c).chromium;
    } catch {
      // try next candidate
    }
  }
  throw new Error("Playwright not found — install it or check ../makemycv-app/node_modules");
}

const force = process.argv.includes("--force");
const coversDir = path.resolve(__dirname, "../public/blog/covers");
const svgs = fs
  .readdirSync(coversDir)
  .filter((f) => f.endsWith(".svg"))
  .filter((f) => {
    const png = path.join(coversDir, f.replace(/\.svg$/, ".png"));
    if (force || !fs.existsSync(png)) return true;
    return fs.statSync(png).mtimeMs < fs.statSync(path.join(coversDir, f)).mtimeMs;
  });

if (!svgs.length) {
  console.log("All cover PNGs up to date.");
  process.exit(0);
}

const chromium = loadChromium();
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});

for (const f of svgs) {
  const svgPath = path.join(coversDir, f);
  const pngPath = svgPath.replace(/\.svg$/, ".png");
  await page.goto("file:///" + svgPath.replace(/\\/g, "/"));
  await page.screenshot({
    path: pngPath,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  console.log("rendered " + path.basename(pngPath));
}

await browser.close();
console.log("Done: " + svgs.length + " cover(s) rendered.");
