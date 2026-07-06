"use client";

import { useState } from "react";
import {
  computeGratuity,
  formatAed,
  formatAedPrecise,
} from "@/components/tools/gratuity";

/**
 * Interactive UAE gratuity calculator (client island). All the citable text —
 * the method, worked examples, FAQ — is server-rendered on the page; this
 * component is only the live calculator. Calculation logic lives in the pure,
 * testable `gratuity.ts`.
 */
export function GratuityCalculator() {
  const [salary, setSalary] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");

  const basicSalary = parseFloat(salary);
  const y = parseInt(years, 10);
  const m = parseInt(months, 10);

  const hasInput = salary !== "" && (years !== "" || months !== "");
  const result = computeGratuity({
    basicSalary: Number.isNaN(basicSalary) ? 0 : basicSalary,
    years: Number.isNaN(y) ? 0 : y,
    months: Number.isNaN(m) ? 0 : m,
  });

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Basic monthly salary (AED)
          </span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            placeholder="e.g. 8000"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
          <span className="mt-1 block text-xs text-slate-500">
            Basic pay only — exclude housing, transport and other allowances.
          </span>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Years of service
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="e.g. 8"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
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
            placeholder="e.g. 6"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </label>
      </div>

      {/* Result */}
      <div className="mt-6 rounded-2xl border border-line bg-paper-2 p-6">
        {!hasInput ? (
          <p className="text-sm text-slate-500">
            Enter your basic salary and length of service to see an estimated
            end-of-service gratuity.
          </p>
        ) : !result.eligible ? (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Estimated gratuity
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold text-slate-900">
              {formatAed(0)}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Under the UAE Labour Law, you become entitled to end-of-service
              gratuity only after <strong>one full year</strong> of continuous
              service. Below 12 months, no gratuity is due.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Estimated gratuity
            </p>
            <p className="mt-2 font-display text-4xl font-extrabold text-brand-blue">
              {formatAed(result.gratuity)}
            </p>

            <dl className="mt-5 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              <div className="flex justify-between border-b border-line py-1.5">
                <dt className="text-slate-600">Daily wage (basic ÷ 30)</dt>
                <dd className="font-semibold text-slate-900">
                  {formatAedPrecise(result.dailyWage)}
                </dd>
              </div>
              <div className="flex justify-between border-b border-line py-1.5">
                <dt className="text-slate-600">Total days accrued</dt>
                <dd className="font-semibold text-slate-900">
                  {result.totalDays.toFixed(1)} days
                </dd>
              </div>
              <div className="flex justify-between border-b border-line py-1.5">
                <dt className="text-slate-600">First 5 years (21 days/yr)</dt>
                <dd className="font-semibold text-slate-900">
                  {result.first5Days.toFixed(1)} days
                </dd>
              </div>
              <div className="flex justify-between border-b border-line py-1.5">
                <dt className="text-slate-600">Beyond 5 years (30 days/yr)</dt>
                <dd className="font-semibold text-slate-900">
                  {result.beyond5Days.toFixed(1)} days
                </dd>
              </div>
            </dl>

            {result.capApplied && (
              <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Capped at two years&rsquo; basic salary ({formatAed(result.cap)}).
                Before the cap, the raw figure was {formatAed(result.grossGratuity)}.
              </p>
            )}
          </div>
        )}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Estimate only, for the standard private-sector case under Federal
        Decree-Law No. 33 of 2021. Free-zone regimes (e.g. DIFC&rsquo;s DEWS,
        ADGM), domestic-worker contracts and dismissals under Article 44 can
        differ. Confirm your exact figure with{" "}
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
  );
}
