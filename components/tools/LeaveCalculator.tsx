"use client";

import { useState } from "react";
import {
  computeLeaveEncashment,
  computeLeaveEntitlement,
} from "@/components/tools/leave";
import { formatAed, formatAedPrecise } from "@/components/tools/gratuity";
import { BasicSalaryInput } from "@/components/tools/BasicSalaryInput";
import { CopyBreakdownButton } from "@/components/tools/CopyBreakdownButton";

/**
 * Interactive UAE annual-leave calculator (client island), v2 — upgraded from
 * the calculator-pain research:
 *  • basic-vs-gross helper on the encashment salary (the #1 wrong input);
 *  • "days already taken" so the entitlement card shows what's actually LEFT,
 *    not just what accrued;
 *  • copy-breakdown button.
 * Citable text (method, examples, FAQ) is server-rendered on the page; logic
 * lives in the pure `leave.ts`.
 */
export function LeaveCalculator() {
  // Encashment
  const [salary, setSalary] = useState("");
  const [unused, setUnused] = useState("");
  // Entitlement
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [taken, setTaken] = useState("");
  const [salaryDerived, setSalaryDerived] = useState(false);

  const basicSalary = parseFloat(salary);
  const unusedDays = parseFloat(unused);
  const y = parseInt(years, 10);
  const m = parseInt(months, 10);
  const takenDays = parseFloat(taken) || 0;

  const encash = computeLeaveEncashment({
    basicSalary: Number.isNaN(basicSalary) ? 0 : basicSalary,
    unusedDays: Number.isNaN(unusedDays) ? 0 : unusedDays,
  });
  const hasEncashInput =
    salary !== "" && unused !== "" && basicSalary > 0 && unusedDays > 0;

  const entitlement = computeLeaveEntitlement({
    years: Number.isNaN(y) ? 0 : y,
    months: Number.isNaN(m) ? 0 : m,
  });
  const hasServiceInput = years !== "" || months !== "";
  const remaining = Math.max(0, entitlement.days - Math.max(0, takenDays));
  const remainingValue =
    basicSalary > 0 ? (basicSalary / 30) * remaining : null;

  function buildBreakdown(): string {
    const lines = ["UAE Annual Leave Estimate — makemycv.ae/annual-leave-calculator"];
    if (hasEncashInput) {
      lines.push(
        `Leave salary (encashment, Art. 29 + Cabinet Res. 1/2022):`,
        `Basic monthly salary${salaryDerived ? " (estimated from gross)" : ""}: ${formatAed(basicSalary)}`,
        `Daily rate (basic ÷ 30): ${formatAedPrecise(encash.dailyWage)}`,
        `Unused days: ${unusedDays}`,
        `Estimated payout: ${formatAed(encash.amount)} (paid on top of gratuity; cannot be forfeited)`,
      );
    }
    if (hasServiceInput && entitlement.eligible) {
      lines.push(
        `Entitlement for ${entitlement.totalMonths} months of service: ${entitlement.days.toFixed(1)} days accrued`,
      );
      if (takenDays > 0)
        lines.push(
          takenDays >= entitlement.days
            ? `All ${entitlement.days.toFixed(1)} accrued days already taken → 0 remaining`
            : `Minus ${takenDays} days taken → ${remaining.toFixed(1)} days remaining`,
        );
      if (remainingValue !== null && remaining > 0)
        lines.push(`Remaining days' value at basic rate: ${formatAed(remainingValue)}`);
    }
    lines.push("Estimate only — confirm with MOHRE (600 590 000) or your employer.");
    return lines.join("\n");
  }

  const inputCls =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Encashment */}
      <div className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8">
        <h3 className="font-display text-lg font-bold text-slate-900">
          Leave salary (encashment)
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          What your unused leave days are worth at end of service.
        </p>

        <div className="mt-5 grid gap-4">
          <BasicSalaryInput
            value={salary}
            onChange={setSalary}
            onDerivedChange={setSalaryDerived}
            placeholder="e.g. 9000"
          />
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Unused leave days
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              placeholder="e.g. 15"
              value={unused}
              onChange={(e) => setUnused(e.target.value)}
              className={inputCls}
            />
          </label>
        </div>

        <div className="mt-5 rounded-2xl border border-line bg-paper-2 p-5">
          {!hasEncashInput ? (
            <p className="text-sm text-slate-500">
              Enter your basic salary and unused days to see the estimate.
            </p>
          ) : (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                Estimated leave salary
              </p>
              <p className="mt-2 font-display text-3xl font-extrabold text-brand-blue">
                {formatAed(encash.amount)}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Daily rate {formatAedPrecise(encash.dailyWage)} (basic ÷ 30) ×{" "}
                {unusedDays} days. Paid on top of your gratuity — accrued leave{" "}
                <strong>cannot be forfeited</strong> (Art. 29).
              </p>
            </>
          )}
        </div>
      </div>

      {/* Entitlement */}
      <div className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8">
        <h3 className="font-display text-lg font-bold text-slate-900">
          Annual leave entitlement
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Days accrued from your length of service — and what&rsquo;s left.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Years of service
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="e.g. 1"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Extra months
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={11}
              placeholder="e.g. 8"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Days already taken
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              placeholder="0"
              value={taken}
              onChange={(e) => setTaken(e.target.value)}
              className={inputCls}
            />
          </label>
        </div>

        <div className="mt-5 rounded-2xl border border-line bg-paper-2 p-5">
          {!hasServiceInput ? (
            <p className="text-sm text-slate-500">
              Enter your length of service to see the estimate.
            </p>
          ) : !entitlement.eligible ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                Estimated entitlement
              </p>
              <p className="mt-2 font-display text-3xl font-extrabold text-slate-900">
                0 days
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Statutory annual leave for full-time employees begins once you
                complete <strong>six months</strong> of service (2 days per
                month from then until your first anniversary).
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                {takenDays > 0 ? "Remaining leave" : "Estimated entitlement"}
              </p>
              <p className="mt-2 font-display text-3xl font-extrabold text-brand-blue">
                {(takenDays > 0 ? remaining : entitlement.days)
                  .toFixed(1)
                  .replace(/\.0$/, "")}{" "}
                days
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {entitlement.basis === "monthly-2-days"
                  ? "Service between 6 and 12 months accrues 2 days per month of service."
                  : "30 days per completed year, plus 2.5 days per month for the fraction of the final year."}
                {takenDays > 0 &&
                  (takenDays >= entitlement.days ? (
                    <>
                      {" "}
                      (all {entitlement.days.toFixed(1).replace(/\.0$/, "")}{" "}
                      accrued days already used.)
                    </>
                  ) : (
                    <>
                      {" "}
                      ({entitlement.days.toFixed(1).replace(/\.0$/, "")} accrued
                      − {takenDays} taken.)
                    </>
                  ))}
              </p>
              {remainingValue !== null && remaining > 0 && (
                <p className="mt-2 text-sm text-slate-600">
                  Worth about <strong>{formatAed(remainingValue)}</strong> at
                  your basic daily rate if paid out.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Copy + disclaimer */}
      <div className="lg:col-span-2">
        <div className="flex flex-wrap gap-3">
          <CopyBreakdownButton getText={buildBreakdown} />
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          Estimates only, for the standard full-time private-sector case under
          Federal Decree-Law No. 33 of 2021 (Article 29) and Cabinet Resolution
          No. 1 of 2022 (Article 19). Contracts and free-zone rules can be more
          generous, and encashment during employment (for carried-forward
          leave) is by agreement. Confirm your exact figures with{" "}
          <a
            href="https://www.mohre.gov.ae/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="font-medium text-brand-blue hover:underline"
          >
            MOHRE
          </a>{" "}
          or your employer.
        </p>
      </div>
    </div>
  );
}
