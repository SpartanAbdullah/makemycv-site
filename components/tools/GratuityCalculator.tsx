"use client";

import { useState } from "react";
import { Printer } from "lucide-react";
import {
  computeGratuity,
  computeDews,
  dateDiffSpan,
  formatAed,
  formatAedPrecise,
} from "@/components/tools/gratuity";
import { BasicSalaryInput } from "@/components/tools/BasicSalaryInput";
import { CopyBreakdownButton } from "@/components/tools/CopyBreakdownButton";
import Link from "next/link";

/**
 * Interactive UAE gratuity calculator (client island), v2 — rebuilt from the
 * calculator-pain research (Reddit / forums / competitor teardowns):
 *  • date-of-joining + last-working-day entry (payroll-precise) with a
 *    manual years/months fallback;
 *  • basic-vs-gross helper (the #1 wrong-input);
 *  • reason-for-leaving selector that debunks the repealed resignation cuts,
 *    handles Art. 44 misconduct and death-in-service;
 *  • jurisdiction selector — DIFC/ADGM get a DEWS contributions estimate
 *    instead of a silently-wrong lump sum;
 *  • advanced: unpaid-leave exclusion and part-time pro-rating;
 *  • cap callout with the article, under-1-year rescue callout, copy/print.
 * All the citable text (method, examples, FAQ) stays server-rendered on the
 * page; calculation logic lives in the pure `gratuity.ts`.
 */

type Jurisdiction = "mainland" | "difc" | "adgm";
type Reason = "resigned" | "terminated" | "expired" | "misconduct" | "death";
type EntryMode = "dates" | "manual";

const reasons: Array<{ value: Reason; label: string }> = [
  { value: "resigned", label: "I resigned" },
  { value: "terminated", label: "Employer terminated my contract" },
  { value: "expired", label: "Contract expired / not renewed" },
  { value: "misconduct", label: "Dismissed for gross misconduct (Art. 44)" },
  { value: "death", label: "Death in service (calculating for family)" },
];

export function GratuityCalculator() {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("mainland");
  const [salary, setSalary] = useState("");
  const [entryMode, setEntryMode] = useState<EntryMode>("dates");
  const [joinDate, setJoinDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [reason, setReason] = useState<Reason>("resigned");
  const [unpaidDays, setUnpaidDays] = useState("");
  const [partTime, setPartTime] = useState(false);
  const [myHours, setMyHours] = useState("");
  const [ftHours, setFtHours] = useState("");
  const [salaryDerived, setSalaryDerived] = useState(false);

  const basicSalary = parseFloat(salary);

  // Service span from either entry mode.
  const span =
    entryMode === "dates" && joinDate && endDate
      ? dateDiffSpan(joinDate, endDate)
      : null;
  const invalidDates =
    entryMode === "dates" && joinDate !== "" && endDate !== "" && span === null;

  const y =
    entryMode === "dates" ? (span?.years ?? 0) : parseInt(years, 10) || 0;
  const m =
    entryMode === "dates" ? (span?.months ?? 0) : parseInt(months, 10) || 0;
  const d = entryMode === "dates" ? (span?.days ?? 0) : 0;

  const hasService =
    entryMode === "dates" ? span !== null : years !== "" || months !== "";
  const hasInput = salary !== "" && basicSalary > 0 && hasService;

  const result = computeGratuity({
    basicSalary: Number.isFinite(basicSalary) ? basicSalary : 0,
    years: y,
    months: m,
    days: d,
    unpaidLeaveDays: parseFloat(unpaidDays) || 0,
    deathInService: reason === "death",
    // ADGM Employment Regulations 2024 (in force 1 Apr 2025) removed the
    // two-year cap; mainland keeps it (Art. 51(6)).
    capApplies: jurisdiction !== "adgm",
    partTime:
      partTime && myHours !== "" && ftHours !== ""
        ? {
            weeklyHours: parseFloat(myHours) || 0,
            fullTimeWeeklyHours: parseFloat(ftHours) || 0,
          }
        : undefined,
  });

  const dews = computeDews(
    Number.isFinite(basicSalary) ? basicSalary : 0,
    result.serviceMonths,
  );

  const serviceLabel = span
    ? `${span.years}y ${span.months}m ${span.days}d`
    : `${y}y ${m}m`;

  const unpaidExcluded = result.unpaidDaysExcluded > 0;

  function buildBreakdown(): string {
    const lines = [
      "UAE Gratuity Estimate — makemycv.ae/gratuity-calculator",
      `Basic monthly salary (last${salaryDerived ? ", estimated from gross" : ""}): ${formatAed(basicSalary)}`,
      `Service entered: ${serviceLabel}${unpaidExcluded ? ` (minus ${result.unpaidDaysExcluded} unpaid days)` : ""}`,
    ];
    if (jurisdiction === "difc") {
      lines.push(
        "DIFC DEWS scheme — employer contributions estimate:",
        `First 5 years @ ~5.83%/month: ${dews.first5Months.toFixed(1)} months`,
        `Beyond 5 years @ ~8.33%/month: ${dews.beyond5Months.toFixed(1)} months`,
        `Estimated contributions to date: ${formatAed(dews.contributions)} (excludes investment returns)`,
        "DIFC service before Feb 2020 accrued under the old gratuity rules and is settled separately.",
      );
    } else {
      lines.push(
        `Daily basic wage (÷30): ${formatAedPrecise(result.dailyWage)}`,
        `Years 1–5 @ 21 days/yr (Art. 51): ${result.first5Days.toFixed(1)} days`,
        `Beyond 5 years @ 30 days/yr (Art. 51): ${result.beyond5Days.toFixed(1)} days`,
        `Total: ${result.totalDays.toFixed(1)} days`,
        jurisdiction === "adgm"
          ? "Cap: none — ADGM Employment Regulations 2024 removed the two-year cap (from 1 Apr 2025)"
          : `Cap at two years' wage (Art. 51(6), applied to basic as entered): ${result.capApplied ? `applied — capped at ${formatAed(result.cap)}` : "not reached"}`,
      );
      if (result.partTimeRatio < 1)
        lines.push(
          `Part-time pro-rating (Cabinet Res. 1/2022): ×${(result.partTimeRatio * 100).toFixed(0)}%`,
        );
      lines.push(`Estimated gratuity: ${formatAed(result.gratuity)}`);
      if (jurisdiction === "adgm")
        lines.push(
          "ADGM: standard lump-sum gratuity applies by default; the ADGM workplace-savings scheme (since 1 Apr 2025) is an optional opt-in alternative.",
        );
      if (reason === "death")
        lines.push(
          "Death in service: the accrued gratuity is due to the legal heirs regardless of length of service.",
        );
      else if (reason === "misconduct")
        lines.push(
          "Article 44 dismissal: the worker generally still keeps the gratuity — it can only be withheld where the law specifically allows.",
        );
      else
        lines.push(
          "Note: since 2 Feb 2022 resignation and termination pay the same full gratuity — calculators still applying 1/3 or 2/3 resignation cuts use the repealed pre-2022 law.",
        );
    }
    lines.push("Estimate only — confirm with MOHRE (600 590 000) or your employer.");
    return lines.join("\n");
  }

  const inputCls =
    "mt-2 w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <div className="rounded-[28px] bg-sheet p-6 shadow-float md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Jurisdiction */}
        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-ink-2">
            Where do you work?
          </span>
          <select
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value as Jurisdiction)}
            className={inputCls}
          >
            <option value="mainland">
              Mainland &amp; most free zones (incl. JAFZA, DMCC)
            </option>
            <option value="difc">DIFC (DEWS scheme)</option>
            <option value="adgm">
              ADGM (standard gratuity — optional savings scheme)
            </option>
          </select>
        </label>

        {/* Salary */}
        <div className="md:col-span-2">
          <BasicSalaryInput
            value={salary}
            onChange={setSalary}
            onDerivedChange={setSalaryDerived}
          />
        </div>

        {/* Service entry */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink-2">
              Length of service
            </span>
            <button
              type="button"
              onClick={() => setEntryMode(entryMode === "dates" ? "manual" : "dates")}
              className="text-xs font-semibold text-accent hover:underline"
            >
              {entryMode === "dates"
                ? "Enter years & months instead"
                : "Use exact dates instead"}
            </button>
          </div>

          {entryMode === "dates" ? (
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold text-muted">
                  Date of joining
                </span>
                <input
                  type="date"
                  value={joinDate}
                  onChange={(e) => setJoinDate(e.target.value)}
                  className={inputCls}
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-muted">
                  Last working day
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={inputCls}
                />
              </label>
              {span && (
                <p className="text-sm text-muted sm:col-span-2">
                  Service:{" "}
                  <strong>
                    {span.years} years, {span.months} months, {span.days} days
                  </strong>{" "}
                  — check this against your records.
                </p>
              )}
              {invalidDates && (
                <p className="text-sm text-red-600 sm:col-span-2">
                  The last working day must be after the date of joining.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold text-muted">
                  Years of service
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="e.g. 8"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className={inputCls}
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-muted">
                  Extra months
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={11}
                  placeholder="e.g. 6"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className={inputCls}
                />
              </label>
            </div>
          )}
        </div>

        {/* Reason for leaving */}
        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-ink-2">
            Reason for leaving
          </span>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as Reason)}
            className={inputCls}
          >
            {reasons.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </label>

        {/* Advanced */}
        <details className="md:col-span-2 rounded-2xl bg-paper-2 p-4 [&_summary::-webkit-details-marker]:hidden">
          <summary className="cursor-pointer text-sm font-semibold text-ink-2">
            Advanced: unpaid leave, part-time
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-muted">
                Voluntary unpaid leave taken (days)
              </span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="0"
                value={unpaidDays}
                onChange={(e) => setUnpaidDays(e.target.value)}
                className={inputCls}
              />
              <span className="mt-1 block text-[11px] leading-relaxed text-muted">
                Unpaid absence doesn&rsquo;t count as service. Do <strong>not</strong>{" "}
                subtract sick leave, maternity leave or annual leave — those
                count in full.
              </span>
            </label>
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-muted">
                <input
                  type="checkbox"
                  checked={partTime}
                  onChange={(e) => setPartTime(e.target.checked)}
                  className="h-4 w-4 rounded border-line-strong"
                />
                I work part-time
              </label>
              {partTime && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="text-[11px] text-muted">My weekly hours</span>
                    <input
                      type="number"
                      min={1}
                      placeholder="24"
                      value={myHours}
                      onChange={(e) => setMyHours(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-line-strong bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] text-muted">Full-time hours</span>
                    <input
                      type="number"
                      min={1}
                      placeholder="48"
                      value={ftHours}
                      onChange={(e) => setFtHours(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-line-strong bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  <p className="col-span-2 text-[11px] leading-relaxed text-muted">
                    Part-time gratuity is pro-rated by hours (Cabinet Res.
                    1/2022). Enter the <strong>full-time basic salary</strong>{" "}
                    for your role above so the ratio applies correctly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </details>
      </div>

      {/* ── Result ── */}
      <div className="mt-6 rounded-2xl bg-paper-2 p-6">
        {!hasInput ? (
          <p className="text-sm text-muted">
            Enter your basic salary and service dates to see an estimated
            end-of-service gratuity.
          </p>
        ) : jurisdiction === "difc" ? (
          /* DIFC — mandatory DEWS scheme, not lump-sum gratuity */
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              DIFC — DEWS scheme
            </p>
            <p className="mt-2 font-display text-4xl font-extrabold text-accent">
              {formatAed(dews.contributions)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              DIFC replaced lump-sum gratuity with the funded DEWS scheme: your
              employer contributes about <strong>5.83%</strong> of basic salary
              monthly for your first five years and <strong>8.33%</strong>{" "}
              after. The figure above is the estimated{" "}
              <strong>contributions</strong> for{" "}
              {Math.round(result.serviceMonths)} months of service — your
              actual pot depends on the fund&rsquo;s investment returns, so
              check your DEWS statement for the real balance.
            </p>
            <p className="mt-3 rounded-lg bg-accent-soft px-4 py-3 text-sm text-ink-2">
              DIFC service <strong>before Feb 2020</strong> accrued under the
              old gratuity rules and is settled separately by your employer.
            </p>
          </div>
        ) : !result.eligible ? (
          reason === "death" ? (
            <p className="text-sm text-muted">
              Enter the service period to calculate — for death in service,
              gratuity is due to the legal heirs even under one year.
            </p>
          ) : (
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                Estimated gratuity
              </p>
              <p className="mt-2 font-display text-3xl font-extrabold text-ink">
                {formatAed(0)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Gratuity needs <strong>one full year</strong> of continuous
                service{unpaidExcluded ? " (unpaid days excluded)" : ""}.
              </p>
              <p className="mt-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900">
                <strong>But you don&rsquo;t walk away with nothing:</strong>{" "}
                accrued annual-leave encashment has <strong>no minimum
                service</strong> (2 days/month from month 6) and any unpaid
                salary is still owed.{" "}
                <Link href="/annual-leave-calculator" className="font-semibold underline">
                  Value your unused leave →
                </Link>
              </p>
            </div>
          )
        ) : (
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              Estimated gratuity
            </p>
            <p className="mt-2 font-display text-4xl font-extrabold text-accent">
              {formatAed(result.gratuity)}
            </p>

            <dl className="mt-5 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              <div className="flex justify-between border-b border-line py-1.5">
                <dt className="text-muted">Daily wage (basic ÷ 30)</dt>
                <dd className="font-semibold text-ink">
                  {formatAedPrecise(result.dailyWage)}
                </dd>
              </div>
              <div className="flex justify-between border-b border-line py-1.5">
                <dt className="text-muted">Service used</dt>
                <dd className="font-semibold text-ink">
                  {serviceLabel}
                  {unpaidExcluded && (
                    <span className="text-muted"> −{result.unpaidDaysExcluded}d unpaid</span>
                  )}
                </dd>
              </div>
              <div className="flex justify-between border-b border-line py-1.5">
                <dt className="text-muted">First 5 years (21 days/yr)</dt>
                <dd className="font-semibold text-ink">
                  {result.first5Days.toFixed(1)} days
                </dd>
              </div>
              <div className="flex justify-between border-b border-line py-1.5">
                <dt className="text-muted">Beyond 5 years (30 days/yr)</dt>
                <dd className="font-semibold text-ink">
                  {result.beyond5Days.toFixed(1)} days
                </dd>
              </div>
              {result.partTimeRatio < 1 && (
                <div className="flex justify-between border-b border-line py-1.5 sm:col-span-2">
                  <dt className="text-muted">Part-time pro-rating</dt>
                  <dd className="font-semibold text-ink">
                    ×{(result.partTimeRatio * 100).toFixed(0)}%
                  </dd>
                </div>
              )}
            </dl>

            {result.capApplied && (
              <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-800">
                Your raw entitlement ({formatAed(result.grossGratuity)}) exceeds
                the legal maximum of two years&rsquo; wage (Art. 51(6)), so it
                is capped at {formatAed(result.cap)} — applied here against
                your basic salary, the conservative reading. Not a bug — the
                law stops it there.
              </p>
            )}

            {jurisdiction === "adgm" && (
              <p className="mt-4 rounded-lg bg-accent-soft px-4 py-3 text-sm leading-relaxed text-ink-2">
                <strong>ADGM kept the standard lump-sum gratuity</strong> — its
                Employment Regulations mirror the 21/30-day model, so the
                figure above applies by default. Two ADGM differences: the
                Employment Regulations 2024 (in force 1 April 2025){" "}
                <strong>removed the two-year cap</strong> — long service pays
                out in full, and this calculator applies no cap for ADGM — and
                employers may offer an <strong>optional</strong>{" "}
                workplace-savings scheme as an alternative; if you actively
                opted in, your benefit comes from that scheme&rsquo;s statement
                instead of this formula.
              </p>
            )}

            {jurisdiction === "mainland" && (
              <p className="mt-4 rounded-lg bg-paper-2 px-4 py-3 text-[13px] leading-relaxed text-muted">
                One exception to know: if your employer enrolled you in
                MOHRE&rsquo;s <strong>voluntary alternative end-of-service
                savings scheme</strong>, gratuity stops accruing from the
                enrolment date and that scheme pays instead — check with HR if
                unsure.
              </p>
            )}

            {(reason === "resigned" || reason === "terminated" || reason === "expired") && (
              <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900">
                <strong>Resigning doesn&rsquo;t cut your gratuity.</strong>{" "}
                Since 2 Feb 2022 (Federal Decree-Law 33/2021), resignation and
                termination pay the <strong>same full gratuity</strong> — the
                old 1/3 and 2/3 resignation cuts and the limited/unlimited
                contract split were repealed. Calculators showing you less for
                resigning are using the old law.
              </p>
            )}
            {reason === "misconduct" && (
              <p className="mt-4 rounded-lg bg-accent-soft px-4 py-3 text-sm leading-relaxed text-ink-2">
                Even after an Article 44 dismissal you{" "}
                <strong>generally keep your gratuity</strong> — it can only be
                withheld where the law specifically allows it (e.g. a court
                order). If your employer zeroes it unilaterally, that&rsquo;s
                worth a free MOHRE complaint.
              </p>
            )}
            {reason === "death" && (
              <p className="mt-4 rounded-lg bg-accent-soft px-4 py-3 text-sm leading-relaxed text-ink-2">
                For death in service, the accrued gratuity is due to the{" "}
                <strong>legal heirs regardless of service length</strong>, and
                UAE law requires employers to settle the family&rsquo;s dues
                promptly. Our condolences — MOHRE (600&nbsp;590&nbsp;000) can
                help if the employer delays.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Copy / print */}
      {hasInput && (jurisdiction === "difc" || result.eligible) && (
        <div className="mt-4 flex flex-wrap gap-3">
          <CopyBreakdownButton getText={buildBreakdown} />
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-sheet px-4 py-2.5 text-sm font-semibold text-ink-2 shadow-float transition-all duration-200 hover:-translate-y-px hover:shadow-float-hover"
          >
            <Printer size={15} /> Print / save as PDF
          </button>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Estimate only, for the standard private-sector case under Federal
        Decree-Law No. 33 of 2021.{" "}
        {jurisdiction === "difc" ? (
          <>
            In DIFC, DEWS contributions replace lump-sum gratuity for service
            since Feb 2020 — your DEWS statement is the source of truth.
          </>
        ) : (
          <>
            Gratuity uses your <strong>last</strong> basic salary applied to
            all years (Art. 51) — employers can&rsquo;t pro-rate earlier years
            at an older, lower basic.
          </>
        )}{" "}
        Domestic-worker contracts differ. Confirm your exact figure with{" "}
        <a
          href="https://www.mohre.gov.ae/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="font-medium text-accent hover:underline"
        >
          MOHRE
        </a>{" "}
        or your employer.
      </p>
    </div>
  );
}
