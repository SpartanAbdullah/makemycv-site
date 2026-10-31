#!/usr/bin/env node
/**
 * Weekly competitor watch (2026-10-31, session 6 ops) — run by
 * .github/workflows/competitor-watch.yml, or by hand:
 *
 *   node scripts/competitor-check.mjs [--state competitor-state.json] [--report report.md] [--urls list.json]
 *
 * For each public page in scripts/competitor-urls.json (home + pricing pages
 * recorded in the workspace competitor research), fetches the page ONCE,
 * sequentially, 1.5 s apart, with an honest user agent, and records:
 *   - the price strings on the page (AED / USD / EUR / GBP / INR amounts);
 *   - which feature terms appear (cover letter, LinkedIn, Arabic, ATS check,
 *     job-description match, UAE/Dubai, AI).
 * It compares them with the previous run's state file and writes a Markdown
 * report. A change is reported only when the new values held on two
 * consecutive runs that both answered 200 (rotating testimonials and A/B copy
 * never confirm), and amounts of 10,000+ are ignored as salaries, not prices.
 * A 403 from a bot wall or a timeout is listed as "unreachable", never as a
 * change, so Cloudflare noise does not open issues.
 *
 * Exit code: 0 always (a competitor change is news, not an outage). The
 * workflow reads `changed=<n>` from stdout to decide whether to open an issue.
 * Derived from docs/ai-mission/tools/competitor-check.mjs (workspace), which
 * fingerprinted whole pages; a full-text hash changes on every deploy of a
 * competitor's site, so this version compares prices and feature terms only.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : dflt;
};
const statePath = resolve(opt("--state", "competitor-state.json"));
const reportPath = resolve(opt("--report", "competitor-report.md"));
const { pages } = JSON.parse(readFileSync(resolve(opt("--urls", resolve(here, "competitor-urls.json"))), "utf8"));
const prev = existsSync(statePath) ? JSON.parse(readFileSync(statePath, "utf8")) : null;
const today = new Date().toISOString().slice(0, 10);

const FEATURES = {
  cover_letter: /cover letter/i,
  linkedin: /linkedin/i,
  arabic: /arabic|العربية/i,
  ats_check: /ats[\s-]*(check|score|scan|test|friendly|optimi)/i,
  jd_match: /job description|job[\s-]*match|tailor(ed)? (your|to)/i,
  uae: /\buae\b|dubai|abu dhabi/i,
  ai: /\bAI\b|artificial intelligence/,
};

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));
const current = {};
for (const [i, { name, url }] of pages.entries()) {
  if (i > 0) await sleep(1500);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (compatible; MakeMyCV-competitor-watch/1.0; +https://www.makemycv.ae)" },
      signal: AbortSignal.timeout(20000),
    });
    const text = strip(await res.text());
    // Amounts of 10,000 and over are salaries in testimonials and job ads
    // (Enhancv's home page rotates "$50,000" / "$100,000"), not plan prices.
    const prices = [
      ...new Set(
        (text.match(/(?:AED|USD|US\$|\$|€|£|₹)\s?\d[\d,]*(?:\.\d+)?/g) || []).filter(
          (p) => Number(p.replace(/[^\d.]/g, "")) < 10000,
        ),
      ),
    ].sort();
    const features = Object.entries(FEATURES)
      .filter(([, re]) => re.test(text))
      .map(([k]) => k);
    current[url] = { name, status: res.status, prices, features, checked: today };
  } catch (e) {
    current[url] = { name, status: 0, error: String(e).slice(0, 100), prices: [], features: [], checked: today };
  }
}

// A change is CONFIRMED only when the new values were seen on two consecutive
// runs: pages that rotate content (testimonials, A/B copy) flip back and forth
// and never confirm. Per page the state keeps `confirmed` (what was last
// reported or first recorded) and the latest observation.
const diff = (a = [], b = []) => ({ added: b.filter((x) => !a.includes(x)), removed: a.filter((x) => !b.includes(x)) });
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const view = (e) => ({ prices: e.prices, features: e.features });
const changed = [];
const pending = [];
const unreachable = [];
for (const [url, now] of Object.entries(current)) {
  const before = prev?.pages?.[url];
  if (now.status !== 200) {
    unreachable.push(`${now.name} ${url} (${now.status || now.error})`);
    if (before?.confirmed) now.confirmed = before.confirmed; // keep the reference through an outage
    continue;
  }
  if (!before?.confirmed) {
    now.confirmed = { ...view(now), since: today };
    continue;
  }
  now.confirmed = before.confirmed;
  if (same(view(now), view(before.confirmed))) continue;
  if (before.status === 200 && same(view(now), view(before))) {
    const p = diff(before.confirmed.prices, now.prices);
    const f = diff(before.confirmed.features, now.features);
    changed.push({ url, name: now.name, p, f, since: before.confirmed.since });
    now.confirmed = { ...view(now), since: today };
  } else {
    pending.push(`${now.name} ${url}`);
  }
}

const ok200 = Object.values(current).filter((c) => c.status === 200).length;
const lines = [
  `## Competitor watch ${today}`,
  "",
  prev
    ? `Compared ${Object.keys(current).length} pages with the run of ${prev.date}: ${changed.length} confirmed change(s), ${pending.length} awaiting confirmation, ${ok200} answered 200, ${unreachable.length} unreachable.`
    : `First run: recorded ${Object.keys(current).length} pages (${ok200} answered 200) as the baseline. Changes are reported from the next run.`,
  "",
];
for (const c of changed) {
  lines.push(`### ${c.name}: ${c.url}`);
  if (c.p.added.length || c.p.removed.length) lines.push(`- prices: +${JSON.stringify(c.p.added)} -${JSON.stringify(c.p.removed)}`);
  if (c.f.added.length || c.f.removed.length) lines.push(`- feature terms: +${JSON.stringify(c.f.added)} -${JSON.stringify(c.f.removed)}`);
  lines.push(`- reference values recorded: ${c.since}; the new values held on two consecutive runs`, "");
}
if (pending.length) {
  lines.push("Differs from the reference this run but not yet on two runs in a row (reported only if it holds next run):", "");
  for (const p of pending) lines.push(`- ${p}`);
  lines.push("");
}
if (unreachable.length) {
  lines.push("<details><summary>Unreachable this run (bot walls, timeouts; never counted as changes)</summary>", "");
  for (const u of unreachable) lines.push(`- ${u}`);
  lines.push("", "</details>");
}
writeFileSync(reportPath, lines.join("\n") + "\n");
writeFileSync(statePath, JSON.stringify({ date: today, pages: current }, null, 2) + "\n");
console.log(lines.join("\n"));
console.log(`changed=${changed.length}`);
