/**
 * Stress-test battery for the three calculator engines.
 * Run: npx -y tsx scripts/stress-test-calculators.ts
 * Exits 1 if any case fails. Expected values are hand-computed from the law
 * rules (21/30-day gratuity + 2yr cap; 30-90 notice clamp + /30 in-lieu;
 * 30-day/2-per-month leave + basic/30 encashment).
 */
import {
  computeGratuity,
  computeDews,
  dateDiffSpan,
} from "../components/tools/gratuity";
import { computeNotice } from "../components/tools/notice";
import {
  computeLeaveEntitlement,
  computeLeaveEncashment,
} from "../components/tools/leave";

let pass = 0;
let fail = 0;
const failures: string[] = [];

function eq(name: string, actual: number | boolean, expected: number | boolean, tol = 0.01) {
  const ok =
    typeof expected === "number" && typeof actual === "number"
      ? Math.abs(actual - expected) <= tol
      : actual === expected;
  if (ok) pass++;
  else {
    fail++;
    failures.push(`FAIL ${name}: expected ${expected}, got ${actual}`);
  }
}

/* ─── GRATUITY ─── */
// Personas
let g = computeGratuity({ basicSalary: 8000, years: 8, months: 0 }); // mid-career
eq("G1 8y/8000 gratuity", g.gratuity, 52000);
eq("G1 daily", g.dailyWage, 266.6667, 0.01);
eq("G1 days", g.totalDays, 195);
eq("G1 capApplied", g.capApplied, false);

g = computeGratuity({ basicSalary: 6000, years: 3, months: 0 }); // early career
eq("G2 3y/6000", g.gratuity, 12600);

g = computeGratuity({ basicSalary: 7000, years: 0, months: 8 }); // fresh joiner
eq("G3 8mo ineligible", g.eligible, false);
eq("G3 amount", g.gratuity, 0);

g = computeGratuity({ basicSalary: 6000, years: 1, months: 0 }); // exactly 1 year
eq("G4 exactly 12mo eligible", g.eligible, true);
eq("G4 amount", g.gratuity, 4200);

g = computeGratuity({ basicSalary: 6000, years: 0, months: 11 }); // 11 months
eq("G5 11mo ineligible", g.eligible, false);

g = computeGratuity({ basicSalary: 9000, years: 5, months: 0 }); // 5y boundary
eq("G6 exactly 5y days", g.totalDays, 105);
eq("G6 amount", g.gratuity, 31500);

g = computeGratuity({ basicSalary: 9000, years: 5, months: 1 }); // just past 5y
eq("G7 5y1m days", g.totalDays, 107.5);
eq("G7 amount", g.gratuity, 32250);

g = computeGratuity({ basicSalary: 10000, years: 40, months: 0 }); // long service exec — cap
eq("G8 40y capApplied", g.capApplied, true);
eq("G8 amount = 24x salary", g.gratuity, 240000);
eq("G8 gross before cap", g.grossGratuity, 385000);

g = computeGratuity({ basicSalary: 6000, years: 25, months: 6 }); // exact cap boundary (720 days)
eq("G9 boundary days", g.totalDays, 720);
eq("G9 gross == cap", g.grossGratuity, 144000);
eq("G9 capApplied at equality", g.capApplied, false);
eq("G9 amount", g.gratuity, 144000);

g = computeGratuity({ basicSalary: 6000, years: 25, months: 7 }); // just over cap
eq("G10 capApplied", g.capApplied, true);
eq("G10 amount", g.gratuity, 144000);

// Hostile inputs
eq("G11 zero salary", computeGratuity({ basicSalary: 0, years: 5, months: 0 }).eligible, false);
eq("G12 negative salary", computeGratuity({ basicSalary: -5000, years: 5, months: 0 }).eligible, false);
eq("G13 NaN salary", computeGratuity({ basicSalary: NaN, years: 5, months: 0 }).eligible, false);
eq("G14 Infinity salary", computeGratuity({ basicSalary: Infinity, years: 5, months: 0 }).eligible, false);
eq("G15 negative years", computeGratuity({ basicSalary: 8000, years: -2, months: 6 }).eligible, false);
eq("G16 NaN years+months", computeGratuity({ basicSalary: 8000, years: NaN, months: NaN }).eligible, false);
g = computeGratuity({ basicSalary: 1e9, years: 50, months: 0 }); // huge numbers
eq("G17 huge salary capped", g.gratuity, 24e9);
g = computeGratuity({ basicSalary: 8000, years: 0, months: 25 }); // months > 11 (API-level)
eq("G18 25 months eligible", g.eligible, true);
eq("G18 amount", g.gratuity, Math.round((25 / 12) * 21 * (8000 / 30) * 100) / 100, 1);

/* ─── GRATUITY v2 features ─── */
// Day precision: 4y 7m 12d on 8000 basic → months = 55.4, years 4.61667
g = computeGratuity({ basicSalary: 8000, years: 4, months: 7, days: 12 });
eq("G19 days serviceMonths", g.serviceMonths, 55.4);
eq("G19 totalDays", g.totalDays, (55.4 / 12) * 21, 0.01);
eq("G19 amount", g.gratuity, (55.4 / 12) * 21 * (8000 / 30), 0.5);

// Unpaid leave excluded: 8y minus 60 unpaid days → 94 months → 190 days pay
g = computeGratuity({ basicSalary: 8000, years: 8, months: 0, unpaidLeaveDays: 60 });
eq("G20 unpaid serviceMonths", g.serviceMonths, 94);
eq("G20 totalDays", g.totalDays, 190, 0.01);
eq("G20 amount", g.gratuity, 190 * (8000 / 30), 0.5);
eq("G20 unpaidDaysExcluded", g.unpaidDaysExcluded, 60);

// Unpaid leave pushing below 12 months → ineligible
g = computeGratuity({ basicSalary: 8000, years: 1, months: 0, unpaidLeaveDays: 40 });
eq("G21 unpaid below threshold ineligible", g.eligible, false);

// Death in service under 1 year → still eligible, pro-rated
g = computeGratuity({ basicSalary: 6000, years: 0, months: 8, deathInService: true });
eq("G22 death eligible", g.eligible, true);
eq("G22 amount", g.gratuity, (8 / 12) * 21 * 200, 0.5);

// Death with zero service → ineligible
eq("G23 death zero service", computeGratuity({ basicSalary: 6000, years: 0, months: 0, deathInService: true }).eligible, false);

// Part-time 24h of 48h → ratio 0.5
g = computeGratuity({ basicSalary: 8000, years: 8, months: 0, partTime: { weeklyHours: 24, fullTimeWeeklyHours: 48 } });
eq("G24 partTime ratio", g.partTimeRatio, 0.5);
eq("G24 amount", g.gratuity, 26000);

// Part-time hours >= full-time clamps to 1
g = computeGratuity({ basicSalary: 8000, years: 8, months: 0, partTime: { weeklyHours: 60, fullTimeWeeklyHours: 48 } });
eq("G25 ratio clamp", g.partTimeRatio, 1);

// Part-time with bad hours → ratio 1
g = computeGratuity({ basicSalary: 8000, years: 8, months: 0, partTime: { weeklyHours: 0, fullTimeWeeklyHours: 48 } });
eq("G26 bad hours ratio 1", g.partTimeRatio, 1);

// Cap applies before part-time ratio: 40y exec at 0.5 → 240000 × 0.5
g = computeGratuity({ basicSalary: 10000, years: 40, months: 0, partTime: { weeklyHours: 20, fullTimeWeeklyHours: 40 } });
eq("G27 capped then ratio", g.gratuity, 120000);

/* ─── DEWS ─── */
let d = computeDews(10000, 36);
eq("D1 36mo contributions", d.contributions, 20988, 0.5);
d = computeDews(10000, 72);
eq("D2 72mo split", d.first5Months, 60);
eq("D2 beyond", d.beyond5Months, 12);
eq("D2 contributions", d.contributions, 34980 + 9996, 0.5);
eq("D3 zero salary", computeDews(0, 36).contributions, 0);
eq("D4 negative months", computeDews(10000, -5).contributions, 0);

/* ─── dateDiffSpan ─── */
let s = dateDiffSpan("2020-01-15", "2024-08-27");
eq("DT1 years", s!.years, 4);
eq("DT1 months", s!.months, 7);
eq("DT1 days", s!.days, 12);
s = dateDiffSpan("2024-01-31", "2024-03-01"); // double borrow
eq("DT2 years", s!.years, 0);
eq("DT2 months", s!.months, 0);
eq("DT2 days", s!.days, 30);
s = dateDiffSpan("2020-02-29", "2021-02-28"); // leap start
eq("DT3 years", s!.years, 0);
eq("DT3 months", s!.months, 11);
eq("DT3 days", s!.days, 30);
eq("DT4 end before start null", dateDiffSpan("2024-05-01", "2024-04-01") === null, true);
eq("DT5 same day null", dateDiffSpan("2024-05-01", "2024-05-01") === null, true);
eq("DT6 invalid date null", dateDiffSpan("banana", "2024-05-01") === null, true);
s = dateDiffSpan("2021-07-01", "2026-07-01"); // exactly 5 years
eq("DT7 exact 5y", s!.years === 5 && s!.months === 0 && s!.days === 0, true);

/* ─── NOTICE ─── */
let n = computeNotice({ scenario: "standard", contractDays: 30, grossSalary: 12000, servedDays: 0 });
eq("N1 required", n.requiredDays, 30);
eq("N1 payInLieu", n.payInLieu, 12000);

n = computeNotice({ scenario: "standard", contractDays: 60, grossSalary: 9000, servedDays: 45 });
eq("N2 unserved", n.unservedDays, 15);
eq("N2 payInLieu", n.payInLieu, 4500);

n = computeNotice({ scenario: "probation-employer", contractDays: 30, grossSalary: 6000, servedDays: 0 });
eq("N3 probation employer", n.requiredDays, 14);
eq("N3 payInLieu", n.payInLieu, 2800);

eq("N4 probation resign UAE", computeNotice({ scenario: "probation-resign-uae", contractDays: 30, grossSalary: 5000, servedDays: 0 }).requiredDays, 30);
eq("N5 probation resign leave", computeNotice({ scenario: "probation-resign-leave", contractDays: 30, grossSalary: 5000, servedDays: 0 }).requiredDays, 14);

n = computeNotice({ scenario: "standard", contractDays: 120, grossSalary: 3000, servedDays: 0 });
eq("N6 clamp high", n.requiredDays, 90);
eq("N6 clamped flag", n.clamped, true);

n = computeNotice({ scenario: "standard", contractDays: 10, grossSalary: 3000, servedDays: 0 });
eq("N7 clamp low", n.requiredDays, 30);
eq("N7 clamped flag", n.clamped, true);

n = computeNotice({ scenario: "standard", contractDays: 30, grossSalary: 9000, servedDays: 200 });
eq("N8 overserved unserved=0", n.unservedDays, 0);
eq("N8 payInLieu 0", n.payInLieu, 0);

n = computeNotice({ scenario: "standard", contractDays: 30, grossSalary: 9000, servedDays: -10 });
eq("N9 negative served -> full", n.unservedDays, 30);

eq("N10 NaN salary payInLieu 0", computeNotice({ scenario: "standard", contractDays: 30, grossSalary: NaN, servedDays: 0 }).payInLieu, 0);
eq("N11 zero contract -> default 30", computeNotice({ scenario: "standard", contractDays: 0, grossSalary: 3000, servedDays: 0 }).requiredDays, 30);

/* ─── LEAVE ─── */
let e = computeLeaveEntitlement({ years: 0, months: 4 });
eq("L1 4mo ineligible", e.eligible, false);
e = computeLeaveEntitlement({ years: 0, months: 6 });
eq("L2 6mo = 12 days", e.days, 12);
eq("L2 basis", e.basis === "monthly-2-days", true);
e = computeLeaveEntitlement({ years: 0, months: 11 });
eq("L3 11mo = 22 days", e.days, 22);
e = computeLeaveEntitlement({ years: 0, months: 12 });
eq("L4 12mo = 30 days (annual branch)", e.days, 30);
e = computeLeaveEntitlement({ years: 1, months: 0 });
eq("L5 1y = 30", e.days, 30);
e = computeLeaveEntitlement({ years: 1, months: 6 });
eq("L6 1y6m = 45", e.days, 45);
e = computeLeaveEntitlement({ years: 2, months: 6 });
eq("L7 2y6m = 75", e.days, 75);
eq("L8 NaN ineligible", computeLeaveEntitlement({ years: NaN, months: NaN }).eligible, false);
eq("L9 negative ineligible", computeLeaveEntitlement({ years: -1, months: -5 }).eligible, false);

let c = computeLeaveEncashment({ basicSalary: 9000, unusedDays: 15 });
eq("L10 encash 9000/15", c.amount, 4500);
c = computeLeaveEncashment({ basicSalary: 12000, unusedDays: 30 });
eq("L11 encash 12000/30", c.amount, 12000);
eq("L12 negative days -> 0", computeLeaveEncashment({ basicSalary: 9000, unusedDays: -5 }).amount, 0);
c = computeLeaveEncashment({ basicSalary: 9000, unusedDays: 0.5 });
eq("L13 fractional days", c.amount, 150);
eq("L14 NaN salary -> 0", computeLeaveEncashment({ basicSalary: NaN, unusedDays: 10 }).amount, 0);

/* ─── Report ─── */
console.log(`\n${pass} passed, ${fail} failed`);
if (failures.length) {
  console.log(failures.join("\n"));
  process.exit(1);
}
