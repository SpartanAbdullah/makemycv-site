/**
 * Contract check for lib/cv-role-examples.ts (run: npx tsx scripts/check-role-examples.ts).
 *
 * Guards the things a reviewer would otherwise check by hand on every edit:
 * required counts, FAQ/meta length limits, the AiAnswer prefix rule, banned
 * claims and wording, guide slugs that exist, llms.txt coverage, and that no
 * sentence-sized string is repeated across two role pages.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROLE_EXAMPLES, rolePath, roleQuestion } from "../lib/cv-role-examples";

const root = join(__dirname, "..");
const errors: string[] = [];
const fail = (slug: string, msg: string) => errors.push(`${slug}: ${msg}`);

const BANNED = [
  /\b(6|7|six|seven)[\s-]*(to|–|-)?\s*(8|eight)?\s*seconds?\b/i,
  /\bresum[eé]s?\b/i,
  /92%/,
];

const llms = readFileSync(join(root, "public/llms.txt"), "utf8");
const seen = new Map<string, string>();
const slugs = new Set<string>();

for (const r of ROLE_EXAMPLES) {
  const s = r.slug;
  if (slugs.has(s)) fail(s, "duplicate slug");
  slugs.add(s);
  if (!/^[a-z]+(-[a-z]+)*$/.test(s)) fail(s, "slug is not kebab-case");

  if (r.metaTitle.length > 70) fail(s, `metaTitle ${r.metaTitle.length} > 70`);
  if (r.metaDescription.length > 160) fail(s, `metaDescription ${r.metaDescription.length} > 160`);
  if (!r.answer.text.startsWith(r.answer.lead)) fail(s, "answer.text must start with answer.lead");
  const words = r.answer.text.split(/\s+/).length;
  if (words < 40 || words > 70) fail(s, `answer is ${words} words (want 40-70)`);
  if (r.bullets.length < 4 || r.bullets.length > 6) fail(s, `${r.bullets.length} bullets (want 4-6)`);
  if (r.faqs.length < 4 || r.faqs.length > 5) fail(s, `${r.faqs.length} FAQs (want 4-5)`);
  if (r.essentials.length < 3) fail(s, "fewer than 3 essentials");
  if (!r.essentials.some((e) => e.sources?.length)) fail(s, "no essential carries an official source");

  const faqs = [{ q: roleQuestion(r), a: r.answer.text }, ...r.faqs];
  for (const f of faqs) {
    if (f.q.length > 160) fail(s, `FAQ question > 160: ${f.q}`);
    if (f.a.length > 800) fail(s, `FAQ answer ${f.a.length} > 800: ${f.q}`);
    if (!f.q.trim().endsWith("?")) fail(s, `FAQ question is not a question: ${f.q}`);
  }

  for (const g of r.guides) {
    if (!existsSync(join(root, "content/blog", `${g}.mdx`))) fail(s, `guide slug not found: ${g}`);
  }
  for (const e of r.essentials) {
    if (e.link?.href.startsWith("/blog/") && !existsSync(join(root, "content/blog", `${e.link.href.slice(6)}.mdx`)))
      fail(s, `essential links to a missing post: ${e.link.href}`);
    for (const src of e.sources ?? []) {
      if (!/^https:\/\/[^/]*\.(gov\.ae|ae)\//.test(src.url)) fail(s, `source is not an official .ae page: ${src.url}`);
    }
  }
  if (!llms.includes(`https://www.makemycv.ae${rolePath(s)})`)) fail(s, "missing from public/llms.txt");

  // Every sentence-sized string this page renders.
  const strings = [
    r.metaTitle, r.metaDescription, r.heroSub, r.answer.text, r.essentialsIntro, r.skillsNote, r.ctaLine,
    ...r.bullets.flatMap((b) => [b.weak, b.strong, b.why]),
    ...r.essentials.map((e) => e.text),
    ...r.faqs.flatMap((f) => [f.q, f.a]),
  ];
  for (const str of strings) {
    for (const re of BANNED) if (re.test(str)) fail(s, `banned wording (${re}): ${str.slice(0, 80)}`);
    if (str.includes("—")) fail(s, `em dash in copy: ${str.slice(0, 80)}`);
    const key = str.trim().toLowerCase();
    const other = seen.get(key);
    if (other && other !== s) fail(s, `same text as ${other}: ${str.slice(0, 80)}`);
    seen.set(key, s);
  }
}

if (ROLE_EXAMPLES.length !== 10) errors.push(`expected 10 roles, found ${ROLE_EXAMPLES.length}`);

if (errors.length) {
  console.error(`role examples: ${errors.length} problem(s)\n` + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
console.log(`role examples: ${ROLE_EXAMPLES.length} roles OK`);
