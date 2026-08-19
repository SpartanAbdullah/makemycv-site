"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import {
  buildResignationLetter,
  REASONS,
  type ReasonKey,
  type ResignationScenario,
} from "@/components/tools/resignation";
import { CopyBreakdownButton } from "@/components/tools/CopyBreakdownButton";

const scenarios: Array<{ value: ResignationScenario; label: string }> = [
  { value: "standard", label: "After probation (normal case)" },
  {
    value: "probation-resign-uae",
    label: "Probation — joining another UAE employer",
  },
  { value: "probation-resign-leave", label: "Probation — leaving the UAE" },
];

/** Today's date as the YYYY-MM-DD an <input type="date"> expects (local tz). */
function todayIso(): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${mm}-${dd}`;
}

/**
 * Interactive UAE resignation letter generator (client island).
 *
 * Everything runs in the browser — there is no fetch here and there must
 * never be one: the page and the privacy policy both promise that what the
 * user types never leaves their device. Letter text and notice-day facts
 * come from the pure builder in resignation.ts, which reuses the Notice
 * Period Calculator's law logic so the two tools cannot disagree.
 */
export function ResignationLetterGenerator() {
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [scenario, setScenario] = useState<ResignationScenario>("standard");
  const [contractDays, setContractDays] = useState("30");
  const [startDate, setStartDate] = useState(todayIso);
  const [reason, setReason] = useState<ReasonKey>("private");
  const [includeGratitude, setIncludeGratitude] = useState(true);
  const [includeHandover, setIncludeHandover] = useState(true);
  const [includeSettlementRequest, setIncludeSettlementRequest] =
    useState(false);

  const cd = parseInt(contractDays, 10);
  const result = buildResignationLetter({
    fullName,
    jobTitle,
    companyName,
    recipientName,
    scenario,
    contractDays: Number.isNaN(cd) ? 30 : cd,
    noticeStartIso: startDate,
    reason,
    includeGratitude,
    includeHandover,
    includeSettlementRequest,
  });

  function downloadTxt() {
    const blob = new Blob([result.letter], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resignation-letter-${startDate || "draft"}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const inputCls =
    "mt-2 w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";
  const checkCls =
    "h-4 w-4 rounded border-line-strong text-accent accent-[#0E7C4A]";

  return (
    <div className="rounded-[28px] bg-sheet p-6 shadow-float md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-ink-2">
            Your full name
          </span>
          <input
            type="text"
            placeholder="e.g. Sarah Ahmed"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputCls}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-ink-2">
            Your job title
          </span>
          <input
            type="text"
            placeholder="e.g. Operations Manager"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className={inputCls}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-ink-2">
            Company name
          </span>
          <input
            type="text"
            placeholder="e.g. Gulf Logistics LLC"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className={inputCls}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-ink-2">
            Addressed to{" "}
            <span className="font-normal text-muted">(optional)</span>
          </span>
          <input
            type="text"
            placeholder="e.g. Mr. Khalid Rahman"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className={inputCls}
          />
          <span className="mt-1 block text-xs text-muted">
            Your line manager or HR contact. Left empty, the letter is
            addressed to the HR Manager.
          </span>
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-ink-2">
            Your situation
          </span>
          <select
            value={scenario}
            onChange={(e) =>
              setScenario(e.target.value as ResignationScenario)
            }
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
          <label className="block">
            <span className="text-sm font-semibold text-ink-2">
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
            <span className="mt-1 block text-xs text-muted">
              The law allows 30–90 days; values outside that range are clamped.
            </span>
          </label>
        )}

        <label className="block">
          <span className="text-sm font-semibold text-ink-2">
            Notice starts on
          </span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={inputCls}
          />
          <span className="mt-1 block text-xs text-muted">
            Usually the day you hand the letter in — it becomes the letter
            date.
          </span>
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-ink-2">Reason</span>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as ReasonKey)}
            className={inputCls}
          >
            {(Object.keys(REASONS) as ReasonKey[]).map((key) => (
              <option key={key} value={key}>
                {REASONS[key].label}
              </option>
            ))}
          </select>
          <span className="mt-1 block text-xs text-muted">
            UAE law does not require a reason — keeping it private is
            perfectly professional.
          </span>
        </label>

        <fieldset className="md:col-span-2">
          <legend className="text-sm font-semibold text-ink-2">
            Optional paragraphs
          </legend>
          <div className="mt-2 flex flex-col gap-2.5 text-sm text-ink-2">
            <label className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={includeHandover}
                onChange={(e) => setIncludeHandover(e.target.checked)}
                className={checkCls}
              />
              Offer a full handover during the notice period
            </label>
            <label className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={includeGratitude}
                onChange={(e) => setIncludeGratitude(e.target.checked)}
                className={checkCls}
              />
              Thank the company (keeps the door open for references)
            </label>
            <label className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={includeSettlementRequest}
                onChange={(e) => setIncludeSettlementRequest(e.target.checked)}
                className={checkCls}
              />
              Ask for written confirmation of your final settlement
            </label>
          </div>
        </fieldset>
      </div>

      {/* Notice facts strip */}
      <div className="mt-6 rounded-2xl bg-paper-2 px-5 py-4 text-sm text-ink-2">
        Required notice for this situation:{" "}
        <strong className="text-ink">
          {result.requiredDays} days
        </strong>{" "}
        (Article {result.articleCited}, Federal Decree-Law No. 33 of 2021)
        {result.lastDay && (
          <>
            {" "}
            — served in full, your last working day is{" "}
            <strong className="text-ink">{result.lastDay}</strong>
          </>
        )}
        .
        {result.clamped && (
          <span className="mt-2 block rounded-lg bg-amber-50 px-3 py-2 text-amber-800">
            Your contract figure sits outside the statutory 30–90 day range,
            so the letter uses the clamped {result.requiredDays} days.
          </span>
        )}
      </div>

      {/* Letter preview */}
      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          Your letter
        </p>
        <pre className="mt-3 whitespace-pre-wrap rounded-2xl bg-paper-2 p-6 font-sans text-[15px] leading-relaxed text-ink md:p-8">
          {result.letter}
        </pre>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-3">
        <CopyBreakdownButton getText={() => result.letter} label="Copy letter" />
        <button
          type="button"
          onClick={downloadTxt}
          data-event="resignation_download_click"
          className="inline-flex items-center gap-2 rounded-full bg-sheet px-4 py-2.5 text-sm font-semibold text-ink-2 shadow-float transition-all duration-200 hover:-translate-y-px hover:shadow-float-hover"
        >
          <Download size={15} />
          Download .txt
        </button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Your letter is built entirely in your browser — nothing you type here
        is sent to a server or stored by us. Template for the standard
        private-sector case under Federal Decree-Law No. 33 of 2021; deliver
        it in writing (email or signed letter) and keep dated proof.
      </p>
    </div>
  );
}
