/**
 * UAE notice period — pure calculation (no React, SSR-safe, testable).
 *
 * Basis: UAE Labour Law (Federal Decree-Law No. 33 of 2021), Articles 9 & 43,
 * standard private-sector full-time case:
 *   • After probation: notice is what the contract says, within the statutory
 *     30–90 day range (Article 43).
 *   • During probation (Article 9):
 *       – employer terminates → at least 14 days' notice;
 *       – employee resigns to join another employer in the UAE → 30 days;
 *       – employee resigns to leave the UAE → at least 14 days.
 *   • Payment in lieu: the party not serving notice compensates the other with
 *     the wage of the unserved part. Unlike gratuity (basic salary), this is
 *     based on the FULL wage (basic + allowances), daily = monthly ÷ 30.
 *
 * Estimates only — special cases (Article 44 dismissal, collective agreements)
 * differ; the page copy tells users to confirm with MOHRE.
 */

export type NoticeScenario =
  | "standard" // after probation — contractual 30–90 days
  | "probation-employer" // employer terminates during probation
  | "probation-resign-uae" // employee resigns during probation, joining another UAE employer
  | "probation-resign-leave"; // employee resigns during probation to leave the UAE

export type NoticeInput = {
  scenario: NoticeScenario;
  /** Contractual notice days (only used for the "standard" scenario). */
  contractDays: number;
  /** Full monthly salary in AED (basic + allowances). */
  grossSalary: number;
  /** Days of notice actually served (0..required). */
  servedDays: number;
};

export type NoticeResult = {
  /** Statutorily required notice days for the scenario. */
  requiredDays: number;
  /** True if the contract days were clamped into the 30–90 statutory range. */
  clamped: boolean;
  dailyWage: number;
  unservedDays: number;
  /** Compensation for the unserved part (paid by whichever party cut it short). */
  payInLieu: number;
};

export function computeNotice({
  scenario,
  contractDays,
  grossSalary,
  servedDays,
}: NoticeInput): NoticeResult {
  const safeSalary =
    Number.isFinite(grossSalary) && grossSalary > 0 ? grossSalary : 0;
  const safeContract =
    Number.isFinite(contractDays) && contractDays > 0 ? contractDays : 30;
  const safeServed = Number.isFinite(servedDays) && servedDays > 0 ? servedDays : 0;

  let requiredDays: number;
  let clamped = false;

  switch (scenario) {
    case "probation-employer":
      requiredDays = 14;
      break;
    case "probation-resign-uae":
      requiredDays = 30;
      break;
    case "probation-resign-leave":
      requiredDays = 14;
      break;
    case "standard":
    default: {
      // Article 43: contractual, but never below 30 or above 90 days.
      requiredDays = Math.min(90, Math.max(30, safeContract));
      clamped = requiredDays !== safeContract;
      break;
    }
  }

  const dailyWage = safeSalary / 30;
  const unservedDays = Math.max(0, requiredDays - Math.min(safeServed, requiredDays));
  const payInLieu = unservedDays * dailyWage;

  return { requiredDays, clamped, dailyWage, unservedDays, payInLieu };
}

/**
 * Last working day = notice start date + required notice days (calendar).
 * Returns a formatted date string, or null when the input date is invalid.
 * Pure: only uses the caller-provided date.
 */
export function lastWorkingDay(startIso: string, requiredDays: number): string | null {
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime()) || !Number.isFinite(requiredDays)) return null;
  const end = new Date(start);
  end.setDate(end.getDate() + Math.max(0, Math.round(requiredDays)));
  return end.toLocaleDateString("en-AE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
