/**
 * Unit checks for the resignation-letter builder.
 *
 *   npx tsx scripts/test-resignation-letter.ts
 *
 * Sibling of stress-test-calculators.ts (kept separate: that file is the
 * 99-case calculator battery; this covers the letter builder). Exits 1 on
 * any failure.
 */
import {
  buildResignationLetter,
  formatLetterDate,
  type ResignationInput,
} from "../components/tools/resignation";

let failures = 0;
function check(name: string, cond: boolean, detail?: string) {
  if (cond) {
    console.log(`  ok    ${name}`);
  } else {
    failures++;
    console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

const base: ResignationInput = {
  fullName: "Sarah Ahmed",
  jobTitle: "Operations Manager",
  companyName: "Gulf Logistics LLC",
  recipientName: "Mr. Khalid Rahman",
  scenario: "standard",
  contractDays: 30,
  noticeStartIso: "2026-08-02",
  reason: "private",
  includeGratitude: true,
  includeHandover: true,
  includeSettlementRequest: false,
};

console.log("resignation-letter builder");

// ─── notice-day law (must match the Notice Period Calculator) ───────────────
{
  const r = buildResignationLetter(base);
  check("standard 30-day contract → 30 days", r.requiredDays === 30);
  check("standard cites Art. 43", r.articleCited === "43" && r.letter.includes("Article 43"));

  const r90 = buildResignationLetter({ ...base, contractDays: 120 });
  check("contract 120 clamps to 90", r90.requiredDays === 90 && r90.clamped);

  const r14 = buildResignationLetter({ ...base, contractDays: 14 });
  check("contract 14 clamps to 30", r14.requiredDays === 30 && r14.clamped);

  const pUae = buildResignationLetter({ ...base, scenario: "probation-resign-uae" });
  check("probation → UAE employer = 30 days, Art. 9", pUae.requiredDays === 30 && pUae.articleCited === "9" && pUae.letter.includes("Article 9"));

  const pLeave = buildResignationLetter({ ...base, scenario: "probation-resign-leave" });
  check("probation → leaving UAE = 14 days, Art. 9", pLeave.requiredDays === 14 && pLeave.articleCited === "9");
}

// ─── date math ──────────────────────────────────────────────────────────────
{
  const r = buildResignationLetter(base);
  // 2 Aug 2026 + 30 days = 1 Sep 2026
  check("last working day = start + 30 (1 September 2026)", r.lastDay !== null && r.lastDay.includes("1 September 2026"), String(r.lastDay));
  check("letter date formatted without weekday", formatLetterDate("2026-08-02") === "2 August 2026", String(formatLetterDate("2026-08-02")));

  const bad = buildResignationLetter({ ...base, noticeStartIso: "not-a-date" });
  check("invalid date → null lastDay, [date] placeholder", bad.lastDay === null && bad.letter.includes("[date]"));
}

// ─── letter content ─────────────────────────────────────────────────────────
{
  const r = buildResignationLetter(base);
  check("subject line present", r.letter.includes("Subject: Resignation — Sarah Ahmed, Operations Manager"));
  check("addressed to recipient", r.letter.includes("Dear Mr. Khalid Rahman,"));
  check("last working day stated in body", r.lastDay !== null && r.letter.includes(r.lastDay));
  check("private reason adds no reason sentence", !r.letter.includes("personal reasons") && !r.letter.includes("opportunity that aligns"));
  check("gratitude present when on", r.letter.includes("grateful for the opportunities"));
  check("handover present when on", r.letter.includes("complete handover"));
  check("settlement absent when off", !r.letter.includes("final settlement"));

  const bare = buildResignationLetter({
    ...base,
    reason: "new-opportunity",
    includeGratitude: false,
    includeHandover: false,
    includeSettlementRequest: true,
  });
  check("reason sentence present when chosen", bare.letter.includes("opportunity that aligns"));
  check("gratitude absent when off", !bare.letter.includes("grateful for the opportunities"));
  check("handover absent when off", !bare.letter.includes("complete handover"));
  check("settlement request present when on", bare.letter.includes("final settlement") && bare.letter.includes("gratuity"));

  const empty = buildResignationLetter({
    ...base,
    fullName: "",
    jobTitle: "  ",
    companyName: "",
    recipientName: "",
  });
  check("empty fields → placeholders", empty.letter.includes("[Your full name]") && empty.letter.includes("[Your job title]") && empty.letter.includes("[Company name]"));
  check("no recipient → HR Manager + Sir/Madam", empty.letter.includes("The HR Manager") && empty.letter.includes("Dear Sir/Madam,"));
}

console.log(failures === 0 ? "\nall checks passed" : `\n${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
