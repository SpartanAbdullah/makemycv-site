/**
 * UAE end-of-service gratuity — pure calculation (no React, SSR-safe, testable).
 *
 * Basis: UAE Labour Law (Federal Decree-Law No. 33 of 2021), standard
 * private-sector full-time case:
 *   • Under 1 year of continuous service → no gratuity.
 *   • 21 days of BASIC salary for each of the first 5 years.
 *   • 30 days of BASIC salary for each year beyond 5.
 *   • Daily wage = basic monthly salary ÷ 30.
 *   • Partial years are pro-rated.
 *   • Total gratuity is capped at 2 years' basic salary.
 *
 * This is an estimate for the standard case. Free-zone regimes (e.g. DIFC's
 * DEWS, ADGM), domestic workers, and dismissals under Article 44 can differ —
 * the page copy tells users to confirm with MOHRE. We invent no other rules.
 */

export type GratuityInput = {
  /** Basic monthly salary in AED (excludes housing/transport/other allowances). */
  basicSalary: number;
  /** Completed years of service. */
  years: number;
  /** Additional months of service (0–11). */
  months: number;
};

export type GratuityResult = {
  eligible: boolean;
  totalMonths: number;
  dailyWage: number;
  first5Days: number;
  beyond5Days: number;
  totalDays: number;
  /** Gratuity before the 2-year cap is applied. */
  grossGratuity: number;
  /** 2 years' basic salary (the statutory cap). */
  cap: number;
  capApplied: boolean;
  /** Final estimated gratuity in AED, after the cap. */
  gratuity: number;
};

export function computeGratuity({
  basicSalary,
  years,
  months,
}: GratuityInput): GratuityResult {
  const safeSalary = Number.isFinite(basicSalary) && basicSalary > 0 ? basicSalary : 0;
  const safeYears = Number.isFinite(years) && years > 0 ? years : 0;
  const safeMonths = Number.isFinite(months) && months > 0 ? months : 0;

  const totalMonths = safeYears * 12 + safeMonths;
  const dailyWage = safeSalary / 30;

  // Under 1 year of continuous service → no entitlement.
  if (totalMonths < 12 || safeSalary === 0) {
    return {
      eligible: false,
      totalMonths,
      dailyWage,
      first5Days: 0,
      beyond5Days: 0,
      totalDays: 0,
      grossGratuity: 0,
      cap: safeSalary * 24,
      capApplied: false,
      gratuity: 0,
    };
  }

  const totalYears = totalMonths / 12;
  const first5Years = Math.min(totalYears, 5);
  const beyond5Years = Math.max(0, totalYears - 5);

  const first5Days = first5Years * 21;
  const beyond5Days = beyond5Years * 30;
  const totalDays = first5Days + beyond5Days;

  const grossGratuity = totalDays * dailyWage;
  const cap = safeSalary * 24; // two years' basic salary
  const capApplied = grossGratuity > cap;
  const gratuity = capApplied ? cap : grossGratuity;

  return {
    eligible: true,
    totalMonths,
    dailyWage,
    first5Days,
    beyond5Days,
    totalDays,
    grossGratuity,
    cap,
    capApplied,
    gratuity,
  };
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
