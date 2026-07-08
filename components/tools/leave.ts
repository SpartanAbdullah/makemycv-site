/**
 * UAE annual leave & leave encashment — pure calculation (no React, SSR-safe,
 * testable).
 *
 * Basis: UAE Labour Law (Federal Decree-Law No. 33 of 2021) Article 29 and
 * Cabinet Resolution No. 1 of 2022 Article 19, standard private-sector
 * full-time case:
 *   • 30 calendar days of paid annual leave per completed year of service.
 *   • 2 days per month for service of at least 6 months but under 1 year.
 *   • Under 6 months → no statutory annual leave yet (full-time case).
 *   • Fractions of the final year (after the first year) accrue pro-rata
 *     (30/12 = 2.5 days per month).
 *   • Encashment of unused leave at end of service is calculated on the
 *     BASIC wage: (basic monthly ÷ 30) × unused days — unless the contract
 *     is more favourable.
 *
 * Estimates only — contracts and free-zone rules can be more generous; the
 * page copy tells users to confirm with MOHRE.
 */

export type EntitlementInput = {
  /** Completed years of service. */
  years: number;
  /** Additional months of service (0–11). */
  months: number;
};

export type EntitlementResult = {
  eligible: boolean;
  totalMonths: number;
  /** Estimated accrued leave days for the service entered. */
  days: number;
  /** Which rule produced the figure. */
  basis: "none" | "monthly-2-days" | "annual-30-days";
};

export function computeLeaveEntitlement({
  years,
  months,
}: EntitlementInput): EntitlementResult {
  const safeYears = Number.isFinite(years) && years > 0 ? years : 0;
  const safeMonths = Number.isFinite(months) && months > 0 ? months : 0;
  const totalMonths = safeYears * 12 + safeMonths;

  if (totalMonths < 6) {
    return { eligible: false, totalMonths, days: 0, basis: "none" };
  }

  if (totalMonths < 12) {
    // 6–12 months: 2 days per month of service.
    return {
      eligible: true,
      totalMonths,
      days: totalMonths * 2,
      basis: "monthly-2-days",
    };
  }

  // 1 year+: 30 days per full year, plus pro-rata (2.5/month) for the
  // fraction of the final year.
  const fullYears = Math.floor(totalMonths / 12);
  const remainderMonths = totalMonths - fullYears * 12;
  const days = fullYears * 30 + remainderMonths * 2.5;
  return { eligible: true, totalMonths, days, basis: "annual-30-days" };
}

export type EncashmentInput = {
  /** Basic monthly salary in AED (excludes allowances). */
  basicSalary: number;
  /** Unused annual leave days being encashed. */
  unusedDays: number;
};

export type EncashmentResult = {
  dailyWage: number;
  amount: number;
};

export function computeLeaveEncashment({
  basicSalary,
  unusedDays,
}: EncashmentInput): EncashmentResult {
  const safeSalary =
    Number.isFinite(basicSalary) && basicSalary > 0 ? basicSalary : 0;
  const safeDays = Number.isFinite(unusedDays) && unusedDays > 0 ? unusedDays : 0;

  const dailyWage = safeSalary / 30;
  return { dailyWage, amount: dailyWage * safeDays };
}
