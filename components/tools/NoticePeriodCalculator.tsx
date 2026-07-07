"use client";

import { useState } from "react";
import {
  computeNotice,
  type NoticeScenario,
} from "@/components/tools/notice";
import { formatAed, formatAedPrecise } from "@/components/tools/gratuity";

const scenarios: Array<{ value: NoticeScenario; label: string }> = [
  { value: "standard", label: "After probation (normal case)" },
  { value: "probation-employer", label: "Probation — employer is terminating" },
  {
    value: "probation-resign-uae",
    label: "Probation — I'm resigning to join another UAE employer",
  },
  {
    value: "probation-resign-leave",
    label: "Probation — I'm resigning and leaving the UAE",
  },
];

/**
 * Interactive UAE notice-period calculator (client island). The citable text
 * — method, worked examples, FAQ — is server-rendered on the page; this
 * component is only the live calculator. Logic lives in the pure `notice.ts`.
 */
export function NoticePeriodCalculator() {
  const [scenario, setScenario] = useState<NoticeScenario>("standard");
  const [contractDays, setContractDays] = useState("30");
  const [salary, setSalary] = useState("");
  const [served, setServed] = useState("");

  const grossSalary = parseFloat(salary);
  const cd = parseInt(contractDays, 10);
  const sd = parseInt(served, 10);

  const result = computeNotice({
    scenario,
    contractDays: Number.isNaN(cd) ? 30 : cd,
    grossSalary: Number.isNaN(grossSalary) ? 0 : grossSalary,
    servedDays: Number.isNaN(sd) ? 0 : sd,
  });

  const hasSalary = salary !== "" && grossSalary > 0;

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-slate-700">
            Your situation
          </span>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value as NoticeScenario)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          >
            {scenarios.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        {scenario === "standard" && (
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Notice period in your contract (days)
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={30}
              max={90}
              placeholder="e.g. 30"
              value={contractDays}
              onChange={(e) => setContractDays(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
            <span className="mt-1 block text-xs text-slate-500">
              The law allows 30–90 days; values outside that range are clamped.
            </span>
          </label>
        )}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Full monthly salary (AED)
          </span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            placeholder="e.g. 12000"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
          <span className="mt-1 block text-xs text-slate-500">
            Total salary including allowances — notice pay uses the full wage,
            not just basic.
          </span>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Notice days you&rsquo;ll actually serve
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="e.g. 0"
            value={served}
            onChange={(e) => setServed(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
          <span className="mt-1 block text-xs text-slate-500">
            Leave 0 if no notice will be worked at all.
          </span>
        </label>
      </div>

      {/* Result */}
      <div className="mt-6 rounded-2xl border border-line bg-paper-2 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
          Required notice
        </p>
        <p className="mt-2 font-display text-4xl font-extrabold text-brand-blue">
          {result.requiredDays} days
        </p>
        {result.clamped && (
          <p className="mt-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Your contract figure sits outside the statutory 30&ndash;90 day
            range, so the law clamps it to {result.requiredDays} days.
          </p>
        )}

        {hasSalary && (
          <dl className="mt-5 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between border-b border-line py-1.5">
              <dt className="text-slate-600">Daily wage (full salary ÷ 30)</dt>
              <dd className="font-semibold text-slate-900">
                {formatAedPrecise(result.dailyWage)}
              </dd>
            </div>
            <div className="flex justify-between border-b border-line py-1.5">
              <dt className="text-slate-600">Unserved notice days</dt>
              <dd className="font-semibold text-slate-900">
                {result.unservedDays} days
              </dd>
            </div>
            <div className="flex justify-between border-b border-line py-1.5 sm:col-span-2">
              <dt className="text-slate-600">
                Compensation for the unserved part (payment in lieu)
              </dt>
              <dd className="font-semibold text-slate-900">
                {formatAed(result.payInLieu)}
              </dd>
            </div>
          </dl>
        )}

        <p className="mt-4 text-sm text-slate-600">
          Whichever party cuts the notice short compensates the other with the
          wage of the unserved days — if you resign and don&rsquo;t serve, you
          owe it; if your employer releases you early, they pay it.
        </p>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Estimate only, for the standard private-sector case under Federal
        Decree-Law No. 33 of 2021 (Articles 9 &amp; 43). Dismissal for gross
        misconduct under Article 44 and some free-zone contracts differ.
        Confirm your exact position with{" "}
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
