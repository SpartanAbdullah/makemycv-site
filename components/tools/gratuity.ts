/**
 * UAE end-of-service gratuity — pure calculation (no React, SSR-safe, testable).
 *
 * Basis: UAE Labour Law (Federal Decree-Law No. 33 of 2021, Art. 51) and
 * Cabinet Resolution No. 1 of 2022, standard private-sector full-time case:
 *   • Under 1 year of continuous service → no gratuity (except death in
 *     service, where accrued gratuity passes to the heirs regardless).
 *   • 21 days of BASIC salary for each of the first 5 years.
 *   • 30 days of BASIC salary for each year beyond 5.
 *   • Daily wage = LAST basic monthly salary ÷ 30 (applied to all years).
 *   • Partial years are pro-rated; days count as 1/30 month (the same 30-day
 *     month convention the daily wage uses).
 *   • Days of unpaid absence are excluded from the service period.
 *   • Total gratuity is capped at 2 years' basic salary (Art. 51(4)).
 *   • Since 2 Feb 2022 resignation and termination pay the SAME gratuity —
 *     the old 1/3–2/3 resignation reductions and the limited/unlimited
 *     contract split were repealed. We deliberately have no contract-type or
 *     reduction logic.
 *   • Part-time (Cabinet Res. 1/2022): benefit = (contracted weekly hours ÷
 *     full-time weekly hours) × the full-time benefit.
 *
 * DIFC (only) replaced lump-sum gratuity with the funded DEWS scheme:
 * employer contributes monthly ≈5.83% of basic (service < 5 years) or 8.33%
 * (≥ 5 years). computeDews() estimates the contributions to date — actual
 * value depends on fund returns. ADGM KEPT the standard lump-sum gratuity
 * (ADGM Employment Regulations mirror the 21/30-day model); since 1 Apr 2025
 * ADGM employers may offer an optional savings scheme as an opt-in
 * alternative — that is not modelled here beyond a copy note.
 *
 * Estimates only — the page copy tells users to confirm with MOHRE.
 */

export type GratuityInput = {
  /** LAST basic monthly salary in AED (excludes allowances). */
  basicSalary: number;
  /** Completed years of service. */
  years: number;
  /** Additional months of service (0–11). */
  months: number;
  /** Additional days of service (0–30). Counted as 1/30 month each. */
  days?: number;
  /** Days of voluntary unpaid leave / unauthorised absence — excluded from service. */
  unpaidLeaveDays?: number;
  /** Death in service: the 1-year minimum does not apply; accrued gratuity goes to the heirs. */
  deathInService?: boolean;
  /** Part-time pro-rating (Cabinet Res. 1/2022). Both must be > 0; ratio is clamped to (0, 1]. */
  partTime?: { weeklyHours: number; fullTimeWeeklyHours: number };
};

export type GratuityResult = {
  eligible: boolean;
  /** Effective service in months (after unpaid-leave exclusion), 30-day-month convention. */
  serviceMonths: number;
  /** Unpaid days actually excluded. */
  unpaidDaysExcluded: number;
  dailyWage: number;
  first5Days: number;
  beyond5Days: number;
  totalDays: number;
  /** Gratuity before the 2-year cap and part-time ratio. */
  grossGratuity: number;
  /** 2 years' basic salary (the statutory cap). */
  cap: number;
  capApplied: boolean;
  /** Part-time ratio applied (1 for full-time). */
  partTimeRatio: number;
  /** Final estimated gratuity in AED (after cap, then part-time ratio). */
  gratuity: number;
};

function safeNum(v: number | undefined, fallback = 0): number {
  return typeof v === "number" && Number.isFinite(v) && v > 0 ? v : fallback;
}

export function computeGratuity({
  basicSalary,
  years,
  months,
  days,
  unpaidLeaveDays,
  deathInService = false,
  partTime,
}: GratuityInput): GratuityResult {
  const safeSalary = safeNum(basicSalary);
  const safeYears = safeNum(years);
  const safeMonths = safeNum(months);
  const safeDays = safeNum(days);
  const unpaid = safeNum(unpaidLeaveDays);

  // Service in months, 30-day-month convention; unpaid absence excluded.
  const rawMonths = safeYears * 12 + safeMonths + safeDays / 30;
  const unpaidMonths = unpaid / 30;
  const serviceMonths = Math.max(0, rawMonths - unpaidMonths);
  const unpaidDaysExcluded = Math.min(unpaid, rawMonths * 30);

  // Part-time ratio (Cabinet Res. 1/2022) — clamped to (0, 1].
  let partTimeRatio = 1;
  if (partTime) {
    const wh = safeNum(partTime.weeklyHours);
    const fh = safeNum(partTime.fullTimeWeeklyHours);
    if (wh > 0 && fh > 0) partTimeRatio = Math.min(1, wh / fh);
  }

  const dailyWage = safeSalary / 30;
  const cap = safeSalary * 24; // two years' basic salary (Art. 51(4))

  // Under 1 year of continuous service → no entitlement, EXCEPT death in
  // service, where accrued gratuity is due to the heirs regardless of length.
  if (safeSalary === 0 || (serviceMonths < 12 && !deathInService) || serviceMonths <= 0) {
    return {
      eligible: false,
      serviceMonths,
      unpaidDaysExcluded,
      dailyWage,
      first5Days: 0,
      beyond5Days: 0,
      totalDays: 0,
      grossGratuity: 0,
      cap,
      capApplied: false,
      partTimeRatio,
      gratuity: 0,
    };
  }

  const totalYears = serviceMonths / 12;
  const first5Years = Math.min(totalYears, 5);
  const beyond5Years = Math.max(0, totalYears - 5);

  const first5Days = first5Years * 21;
  const beyond5Days = beyond5Years * 30;
  const totalDays = first5Days + beyond5Days;

  const grossGratuity = totalDays * dailyWage;
  const capApplied = grossGratuity > cap;
  const capped = capApplied ? cap : grossGratuity;
  const gratuity = capped * partTimeRatio;

  return {
    eligible: true,
    serviceMonths,
    unpaidDaysExcluded,
    dailyWage,
    first5Days,
    beyond5Days,
    totalDays,
    grossGratuity,
    cap,
    capApplied,
    partTimeRatio,
    gratuity,
  };
}

/* ── DIFC DEWS funded scheme ───────────────────────────────────────────── */

export type DewsResult = {
  /** Months at the 5.83% rate (first 5 years). */
  first5Months: number;
  /** Months at the 8.33% rate (beyond 5 years). */
  beyond5Months: number;
  /** Estimated total employer contributions (excludes investment returns). */
  contributions: number;
};

/**
 * Estimate employer contributions under DIFC's mandatory DEWS scheme:
 * ≈5.83% of basic per month for the first 5 years of service, ≈8.33% after.
 * The real pot depends on fund performance; this is the contribution floor.
 * DIFC-only — ADGM kept standard lump-sum gratuity (optional scheme aside).
 */
export function computeDews(basicSalary: number, serviceMonths: number): DewsResult {
  const salary = safeNum(basicSalary);
  const m = Math.max(0, safeNum(serviceMonths));
  const first5Months = Math.min(m, 60);
  const beyond5Months = Math.max(0, m - 60);
  const contributions =
    salary * 0.0583 * first5Months + salary * 0.0833 * beyond5Months;
  return { first5Months, beyond5Months, contributions };
}

/* ── Date helpers (client-side date-mode entry) ────────────────────────── */

export type ServiceSpan = { years: number; months: number; days: number };

/**
 * Calendar difference between two dates as full years + months + leftover
 * days. Returns null when the range is invalid (end before start).
 */
export function dateDiffSpan(startIso: string, endIso: string): ServiceSpan | null {
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  if (end <= start) return null;

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  // Borrow from months while days are negative (can happen twice when the
  // start day exceeds the length of the month before `end`, e.g. Jan 31 → Mar 1).
  let borrowMonth = end.getMonth();
  let borrowYear = end.getFullYear();
  while (days < 0) {
    months -= 1;
    // days in the month before the current borrow point
    const prevMonthDays = new Date(borrowYear, borrowMonth, 0).getDate();
    days += prevMonthDays;
    borrowMonth -= 1;
    if (borrowMonth < 0) {
      borrowMonth = 11;
      borrowYear -= 1;
    }
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

/** Format an AED amount for display (no decimals, thousands separators). */
export function formatAed(amount: number): string {
  return `AED ${Math.round(amount).toLocaleString("en-AE")}`;
}

/**
 * Format an AED amount with 2 decimals — used for per-day figures (e.g. the
 * daily wage) so the displayed number matches the worked examples exactly
 * (8,000 ÷ 30 = AED 266.67, not a rounded 267).
 */
export function formatAedPrecise(amount: number): string {
  return `AED ${amount.toLocaleString("en-AE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
