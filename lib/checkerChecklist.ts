/**
 * The ONE place the marketing site states what the ATS checker checks and
 * how many checks there are (Mission 8, 2026-10-31).
 *
 * The source of truth is the app: makemycv-app `lib/resumeChecker/checklist.ts`,
 * which a test pins to the score engine, and which the app serves as JSON at
 *   GET https://app.makemycv.ae/api/resume-checker/checklist
 * ({ version: 1, count, categories: [{ id, label, count, items }] }).
 *
 * This file is deliberately static — the rendered list on /resume-checker is
 * server-rendered copy for search engines and must not depend on a build-time
 * fetch of the app. Drift is caught instead by `npm run check:checklist`
 * (scripts/check-checklist-contract.mjs), which CI runs as a non-blocking job:
 * it fetches the endpoint and compares `count` and each category's `count`
 * against the values here. When it fails, update the numbers AND the item
 * wording below from the app's list, in one commit.
 *
 * Family `id`s are the app's ScoreCategoryId values; keep them identical, the
 * script matches on them. Icons live in components/resume-checker/WhatWeCheck.tsx
 * (this module stays free of React so the script can import it under tsx).
 *
 * Things the engine does NOT check (so this site must not claim them):
 * nationality, keyword match against a job ad (that is JD Match), fonts,
 * colours or page layout — the engine only sees extracted text.
 */

export const CHECKLIST_ENDPOINT =
  "https://app.makemycv.ae/api/resume-checker/checklist";

/** Payload shape version the script understands. */
export const CHECKLIST_CONTRACT_VERSION = 1;

/** Exact count quoted on /resume-checker ("44 individual checks"). */
export const CHECK_COUNT = 44;

/**
 * The rounded figure in marketing copy — "40+ UAE-tuned checks" — appears in
 * the resume-checker metadata, HowItWorks, AtsSystems, CareerToolLinks, the
 * calculator and cv-examples cross-links and several blog posts (grep "40+").
 * The script asserts the live count is still >= this floor; if the engine
 * ever drops below it, that copy has to change everywhere it appears.
 */
export const CHECK_COUNT_COPY_FLOOR = 40;

export type CheckFamilyId = "content" | "sections" | "atsEssentials" | "design";

export type CheckFamily = {
  id: CheckFamilyId;
  name: string;
  /** Engine sub-signals in this category (must equal the app's category count). */
  count: number;
  /** Engine sub-signal ids covered, for auditing against the app's list. */
  signals: string;
  items: readonly string[];
};

export const checkFamilies: readonly CheckFamily[] = [
  {
    id: "content",
    name: "Content",
    count: 14,
    signals: "C1–C14",
    items: [
      "Professional summary: present, 40–200 words, with at least one number or metric",
      "Bullet points that open with action verbs (at least half, ideally 70%)",
      "Bullets that state a measurable outcome — numbers, %, AED, scale (at least a quarter, ideally half)",
      "Bullet length: every bullet 40 words or fewer, none over 60, at least one bullet per role",
      "Spelling issues the parser spotted, and filler phrases like “responsible for” or “team player”",
    ],
  },
  {
    id: "sections",
    name: "Sections",
    count: 7,
    signals: "S4, S5, S7–S11",
    items: [
      "Location stated, plus a LinkedIn URL or personal website",
      "At least one experience entry (two or more preferred), each with role, company and start date",
      "At least one education entry and at least one skill",
    ],
  },
  {
    id: "atsEssentials",
    name: "ATS essentials",
    count: 14,
    signals: "A1–A14",
    items: [
      "A valid email format and a phone number the parser can find",
      "No tables, images or scrambled formatting in the extracted text, and no emojis",
      "Experience dates in a format a parser can read (at least half, ideally all)",
      "A headline or job title, a company on every role, and a current role with both role and company",
      "UAE fields written as plain lines: visa status, availability or notice period, UAE driving licence",
    ],
  },
  {
    id: "design",
    name: "Design & length",
    count: 9,
    signals: "D1–D9",
    items: [
      "Overall length: at least 150 words (300+ preferred) and no more than 1,200",
      "A skills list sized for keyword matching: 5–30 skills (10+ preferred), each 40 characters or fewer",
      "Education entries that carry both school and degree",
      "Three or more bullets per role on average",
    ],
  },
];

/** Sum of the family counts — must equal CHECK_COUNT (the script checks it too). */
export const CHECK_FAMILY_TOTAL = checkFamilies.reduce((s, f) => s + f.count, 0);
