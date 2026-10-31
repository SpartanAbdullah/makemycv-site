#!/usr/bin/env node
/**
 * Production checks for makemycv.ae (2026-10-31, session 6 ops) — run daily by
 * .github/workflows/prod-monitor.yml and by hand after a release:
 *
 *   node scripts/prod-check.mjs              # both parts
 *   node scripts/prod-check.mjs --checks     # the 8 content/route checks only
 *   node scripts/prod-check.mjs --sitemap    # sitemap.xml 200 + every <loc> 200
 *
 * Read-only GET requests, a fixed user agent, at most 4 requests in flight.
 * Prints PASS/FAIL per check; exits 1 if any fail. The 8 checks are the
 * post-release list from docs/ai-mission/tools/prod-check.mjs (workspace),
 * copied here so a scheduler can run them; keep the two in step.
 *
 * Sitemap rule: every listed URL must answer 200 itself — a redirect or a 404
 * inside the sitemap is an SEO defect, so redirects are not followed. A URL is
 * retried once before it counts as failed.
 */

const SITE = process.env.SITE_BASE || "https://www.makemycv.ae";
const APP = process.env.APP_BASE || "https://app.makemycv.ae";
const UA = "makemycv-prod-check/1.1 (+https://www.makemycv.ae)";
const TIMEOUT_MS = 20_000;
const CONCURRENCY = 4;

const args = new Set(process.argv.slice(2));
const runChecks = args.size === 0 || args.has("--checks");
const runSitemap = args.size === 0 || args.has("--sitemap");

const CHECKS = [
  ["site sitemap lists /free-cv-maker-dubai", `${SITE}/sitemap.xml`, (t) => t.includes("/free-cv-maker-dubai")],
  ["site sitemap lists the Pakistan guide", `${SITE}/sitemap.xml`, (t) => t.includes("/blog/adapt-pakistani-cv-for-uae-jobs")],
  ["llms.txt disambiguates makemycv.com", `${SITE}/llms.txt`, (t) => /not related to makemycv\.com/i.test(t)],
  ["/blog has the shared metadata title", `${SITE}/blog`, (t) => /<title>[^<]*UAE CV &amp; Career Advice/i.test(t) || /UAE CV & Career Advice/.test(t)],
  ["Pakistan guide renders with Article JSON-LD", `${SITE}/blog/adapt-pakistani-cv-for-uae-jobs`, (t) => t.includes('"Article"')],
  ["checker page no longer names employer ATS tests", `${SITE}/resume-checker`, (t) => !/tested against|same parsing logic|Chalhoub/i.test(t)],
  ["app /builder serves", `${APP}/builder`, (t) => /Continue|Build Your CV/i.test(t)],
  ["app /resume-checker serves", `${APP}/resume-checker`, (t) => /upload|drop/i.test(t)],
];

let fails = 0;
const pass = (msg) => console.log(`PASS  ${msg}`);
const fail = (msg) => {
  fails++;
  console.log(`FAIL  ${msg}`);
};

async function get(url, { follow = true } = {}) {
  const res = await fetch(url, {
    redirect: follow ? "follow" : "manual",
    headers: { "user-agent": UA },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return res;
}

if (runChecks) {
  console.log(`# ${CHECKS.length} production checks`);
  for (const [name, url, test] of CHECKS) {
    try {
      const r = await get(url);
      const t = await r.text();
      if (r.ok && test(t)) pass(`${name}  (${r.status})`);
      else fail(`${name}  (${r.status})`);
    } catch (e) {
      fail(`${name}  (${e.message})`);
    }
  }
}

if (runSitemap) {
  console.log(`# sitemap: ${SITE}/sitemap.xml`);
  let locs = [];
  try {
    const r = await get(`${SITE}/sitemap.xml`);
    const xml = await r.text();
    locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, "&"));
    if (r.status === 200 && locs.length > 0) pass(`sitemap.xml 200 with ${locs.length} URLs`);
    else fail(`sitemap.xml (${r.status}, ${locs.length} URLs)`);
  } catch (e) {
    fail(`sitemap.xml (${e.message})`);
  }

  const bad = [];
  async function probe(url) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const r = await get(url, { follow: false });
        await r.arrayBuffer().catch(() => {});
        if (r.status === 200) return null;
        if (attempt === 2) return `${r.status}${r.headers.get("location") ? ` -> ${r.headers.get("location")}` : ""}`;
      } catch (e) {
        if (attempt === 2) return e.message;
      }
      await new Promise((ok) => setTimeout(ok, 2000));
    }
    return "unreachable";
  }
  const queue = [...locs];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const url = queue.shift();
        const problem = await probe(url);
        if (problem) bad.push(`${url}  ${problem}`);
      }
    }),
  );
  if (locs.length && bad.length === 0) pass(`all ${locs.length} sitemap URLs answer 200`);
  for (const b of bad) fail(`sitemap URL ${b}`);
}

console.log(fails ? `\n${fails} check(s) failed` : "\nall checks passed");
process.exit(fails ? 1 : 0);
