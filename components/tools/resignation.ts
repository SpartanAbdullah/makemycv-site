/**
 * UAE resignation letter — pure letter builder (no React, SSR-safe, testable).
 *
 * Legal basis is NOT re-derived here: notice-day rules come from
 * `computeNotice` in ./notice.ts (Articles 9 & 43 of Federal Decree-Law
 * No. 33 of 2021), so this tool can never contradict the Notice Period
 * Calculator. The letter cites the same articles the calculator explains.
 *
 * Resignation scenarios only — "probation-employer" from notice.ts is a
 * termination case and has no resignation letter.
 */
import { computeNotice, lastWorkingDay } from "@/components/tools/notice";

export type ResignationScenario =
  | "standard" // after probation — contractual 30–90 days (Art. 43)
  | "probation-resign-uae" // during probation, joining another UAE employer — 30 days (Art. 9)
  | "probation-resign-leave"; // during probation, leaving the UAE — 14 days (Art. 9)

export type ReasonKey =
  | "private"
  | "new-opportunity"
  | "relocation"
  | "personal"
  | "career-change";

/** One professional sentence per reason; "private" adds nothing — the law
 *  does not require a reason and the page says so. */
export const REASONS: Record<ReasonKey, { label: string; sentence: string | null }> = {
  private: { label: "Keep it private (recommended)", sentence: null },
  "new-opportunity": {
    label: "New opportunity",
    sentence:
      "I have accepted an opportunity that aligns with the next step in my career.",
  },
  relocation: {
    label: "Relocation",
    sentence: "I am relocating and will be unable to continue in my role.",
  },
  personal: {
    label: "Personal reasons",
    sentence: "I am resigning for personal reasons.",
  },
  "career-change": {
    label: "Career change",
    sentence: "I have decided to take my career in a new direction.",
  },
};

export type ResignationInput = {
  fullName: string;
  jobTitle: string;
  companyName: string;
  /** Line manager or HR contact; empty → "Sir/Madam". */
  recipientName: string;
  scenario: ResignationScenario;
  /** Contractual notice days — used only for the "standard" scenario. */
  contractDays: number;
  /** ISO date the notice starts (letter date). */
  noticeStartIso: string;
  reason: ReasonKey;
  includeGratitude: boolean;
  includeHandover: boolean;
  includeSettlementRequest: boolean;
};

export type ResignationResult = {
  letter: string;
  requiredDays: number;
  /** True when the contract figure was clamped into the 30–90 range. */
  clamped: boolean;
  /** Formatted last working day, or null while the date input is invalid. */
  lastDay: string | null;
  articleCited: "43" | "9";
};

/** "2 August 2026" — letter-date format, no weekday. */
export function formatLetterDate(iso: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const ph = (value: string, placeholder: string) => {
  const v = value.trim();
  return v.length > 0 ? v : placeholder;
};

export function buildResignationLetter(input: ResignationInput): ResignationResult {
  const {
    scenario,
    contractDays,
    noticeStartIso,
    reason,
    includeGratitude,
    includeHandover,
    includeSettlementRequest,
  } = input;

  // Notice facts from the shared law logic (salary/served are irrelevant here).
  const notice = computeNotice({
    scenario,
    contractDays,
    grossSalary: 0,
    servedDays: 0,
  });
  const articleCited: "43" | "9" = scenario === "standard" ? "43" : "9";

  const letterDate = formatLetterDate(noticeStartIso);
  const lastDay = letterDate ? lastWorkingDay(noticeStartIso, notice.requiredDays) : null;

  const fullName = ph(input.fullName, "[Your full name]");
  const jobTitle = ph(input.jobTitle, "[Your job title]");
  const companyName = ph(input.companyName, "[Company name]");
  const recipient = input.recipientName.trim();

  const openingNotice =
    scenario === "standard"
      ? `in accordance with my employment contract and Article 43 of Federal Decree-Law No. 33 of 2021, I will serve the required ${notice.requiredDays}-day notice period`
      : scenario === "probation-resign-uae"
        ? `as I am currently in my probation period and will be joining another employer within the UAE, I will serve the 30-day notice period required by Article 9 of Federal Decree-Law No. 33 of 2021`
        : `as I am currently in my probation period and will be leaving the UAE, I will serve the 14-day notice period required by Article 9 of Federal Decree-Law No. 33 of 2021`;

  const paragraphs: string[] = [];

  paragraphs.push(
    `Please accept this letter as formal notice of my resignation from my position as ${jobTitle} at ${companyName}, effective ${letterDate ?? "[date]"}. ` +
      `${openingNotice[0].toUpperCase()}${openingNotice.slice(1)}` +
      (lastDay ? `, making my last working day ${lastDay}.` : "."),
  );

  const reasonSentence = REASONS[reason].sentence;
  if (reasonSentence) paragraphs.push(reasonSentence);

  if (includeHandover) {
    paragraphs.push(
      "During the notice period I will continue to carry out my responsibilities in full and will prepare a complete handover, including documenting my current tasks and briefing a colleague or successor, to make the transition as smooth as possible.",
    );
  }

  if (includeSettlementRequest) {
    paragraphs.push(
      "I would appreciate written confirmation of my final settlement — including any end-of-service gratuity, accrued leave and outstanding salary — in line with Federal Decree-Law No. 33 of 2021.",
    );
  }

  if (includeGratitude) {
    paragraphs.push(
      `I am grateful for the opportunities and support I have received during my time at ${companyName}, and I wish the team continued success.`,
    );
  }

  paragraphs.push(
    "Kindly confirm receipt of this letter and my agreed last working day.",
  );

  const letter = [
    letterDate ?? "[date]",
    "",
    recipient.length > 0 ? recipient : "The HR Manager",
    companyName,
    "",
    `Subject: Resignation — ${fullName}, ${jobTitle}`,
    "",
    `Dear ${recipient.length > 0 ? recipient : "Sir/Madam"},`,
    "",
    paragraphs.join("\n\n"),
    "",
    "Yours sincerely,",
    fullName,
    jobTitle,
  ].join("\n");

  return {
    letter,
    requiredDays: notice.requiredDays,
    clamped: notice.clamped,
    lastDay,
    articleCited,
  };
}
