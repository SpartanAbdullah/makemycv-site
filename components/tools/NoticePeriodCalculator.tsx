"use client";

import { useState } from "react";
import {
  computeNotice,
  lastWorkingDay,
  type NoticeScenario,
} from "@/components/tools/notice";
import { formatAed, formatAedPrecise } from "@/components/tools/gratuity";
import { CopyBreakdownButton } from "@/components/tools/CopyBreakdownButton";

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
 * Interactive UAE notice-period calculator (client island), v2 — upgraded
 * from the calculator-pain research:
 *  • explicit direction-of-money ("you owe" vs "employer owes you") driven
 *    by a who-is-ending toggle;
 *  • optional notice-start date → the actual calendar LAST WORKING DAY
 *    (the thing people plan visas and start dates around);
 *  • plain-language notes on each probation branch (gratuity = 0, the
 *    leaving-UAE and join-another-employer wrinkles);
 *  • full-wage basis called out explicitly; copy-breakdown button.
 * Citable text stays server-rendered on the page; logic in pure `notice.ts`.
 */
export function NoticePeriodCalculator() {
  const [scenario, setScenario] = useState<NoticeScenario>("standard");
  const [whoEnds, setWhoEnds] = useState<"me" | "employer">("me");
  const [contractDays, setContractDays] = useState("30");
  const [salary, setSalary] = useState("");
  const [served, setServed] = useState("");
  const [startDate, setStartDate] = useState("");

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
  const lastDay = startDate ? lastWorkingDay(startDate, result.requiredDays) : null;

  // Who owes whom for the unserved part.
  const iAmLeaving =
    scenario === "probation-resign-uae" ||
    scenario === "probation-resign-leave" ||
    (scenario === "standard" && whoEnds === "me");

  function buildBreakdown(): string {
    const lines = [
      "UAE Notice Period Estimate — makemycv.ae/notice-period-calculator",
      `Situation: ${scenarios.find((s) => s.value === scenario)?.label}${scenario === "standard" ? ` (${whoEnds === "me" ? "I am resigning" : "employer is terminating"})` : ""}`,
      `Required notice (Art. ${scenario === "standard" ? "43" : "9"}): ${result.requiredDays} days`,
    ];
    if (lastDay) lines.push(`Notice starting ${startDate} → last working day: ${lastDay}`);
    if (hasSalary) {
      lines.push(
        `Daily wage (FULL salary ÷ 30 — not basic): ${formatAedPrecise(result.dailyWage)}`,
        `Unserved days: ${result.unservedDays}`,
        `Payment in lieu: ${formatAed(result.payInLieu)} — ${
          result.unservedDays === 0
            ? "none (full notice served)"
            : iAmLeaving
              ? "owed BY you to the employer (deductible from your settlement)"
              : "owed TO you by the employer"
        }`,
      );
    }
    lines.push("Estimate only — confirm with MOHRE (600 590 000) or your employer.");
    return lines.join("\n");
  }

  const inputCls =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

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
            className={inputCls}
          >
            {scenarios.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        {scenario === "standard" && (
          <>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Who is ending the contract?
              </span>
              <select
                value={whoEnds}
                onChange={(e) => setWhoEnds(e.target.value as "me" | "employer")}
                className={inputCls}
              >
                <option value="me">I&rsquo;m resigning</option>
                <option value="employer">My employer is terminating</option>
              </select>
            </label>
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
                className={inputCls}
              />
              <span className="mt-1 block text-xs text-slate-500">
                The law allows 30–90 days; values outside that range are clamped.
              </span>
            </label>
          </>
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
            className={inputCls}
          />
          <span className="mt-1 block text-xs text-slate-500">
            Total salary <strong>including allowances</strong> — notice pay in
            lieu uses the full wage (Art. 43), unlike gratuity which uses basic.
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
            className={inputCls}
          />
          <span className="mt-1 block text-xs text-slate-500">
            Leave 0 if no notice will be worked at all.
          </span>
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-slate-700">
            Notice starts on <span className="font-normal text-slate-500">(optional — shows your last working day)</span>
          </span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={inputCls}
          />
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
        {lastDay && (
          <p className="mt-2 text-base text-slate-700">
            Serving in full, your last working day would be{" "}
            <strong>{lastDay}</strong>.
          </p>
        )}
        {result.clamped && (
          <p className="mt-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Your contract figure sits outside the statutory 30&ndash;90 day
            range, so the law clamps it to {result.requiredDays} days.
          </p>
        )}

        {hasSalary && (
          <>
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
            </dl>

            {result.unservedDays === 0 ? (
              <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900">
                Full notice served — <strong>no payment in lieu either way</strong>.
              </p>
            ) : iAmLeaving ? (
              <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-800">
                <strong>You would owe your employer {formatAed(result.payInLieu)}</strong>{" "}
                for the {result.unservedDays} unserved days — and it can
                legally be deducted from your final settlement or gratuity. If
                serving longer costs less than that, it usually pays to serve.
              </p>
            ) : (
              <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900">
                <strong>Your employer would owe you {formatAed(result.payInLieu)}</strong>{" "}
                for the {result.unservedDays} days of notice they&rsquo;re not
                letting you work — on your full wage, on top of your other
                settlement dues.
              </p>
            )}
          </>
        )}

        {/* Probation-specific realities */}
        {scenario !== "standard" && (
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
            <p>
              <strong>Gratuity during probation: AED 0.</strong> End-of-service
              gratuity needs one full year of service, so leaving in probation
              means no gratuity — but accrued leave (from month 6) and unpaid
              salary are still owed.
            </p>
            {scenario === "probation-resign-uae" && (
              <p>
                Joining another UAE employer straight from probation? By law
                your <strong>new employer may owe your old one</strong>{" "}
                compensation for recruitment costs (Art. 9) — worth knowing if
                the new company hesitates; it&rsquo;s their bill, not yours.
              </p>
            )}
            {scenario === "probation-resign-leave" && (
              <p>
                Leaving the UAE: serve the 14 days, and note that if you return
                and join a UAE employer <strong>within 3 months</strong>, the
                new employer may owe your previous one recruitment-cost
                compensation (Art. 9).
              </p>
            )}
          </div>
        )}
      </div>

      {/* Copy */}
      <div className="mt-4 flex flex-wrap gap-3">
        <CopyBreakdownButton getText={buildBreakdown} />
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
