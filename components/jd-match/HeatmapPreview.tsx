/**
 * HeatmapPreview — the signature JD Match visual.
 *
 * A faux job description with each requirement marked the way JD Match marks
 * the real one you paste: green where your CV already covers it, amber where
 * there's a gap. Static, on-brand (emerald = matched, amber = missing), and
 * stacks cleanly on mobile. No data is real — it's an illustration, labelled.
 */

type Line = { text: string; state: "match" | "gap" | "plain" };

const lines: Line[] = [
  { text: "Senior Accountant — DIFC, Dubai", state: "plain" },
  { text: "5+ years in audit or financial reporting", state: "match" },
  { text: "IFRS and UAE VAT compliance", state: "match" },
  { text: "Hands-on with Oracle NetSuite", state: "gap" },
  { text: "Month-end close and reconciliations", state: "match" },
  { text: "Team leadership experience", state: "match" },
  { text: "CMA or ACCA preferred", state: "gap" },
];

const stateClass: Record<Line["state"], string> = {
  match: "bg-emerald-400/15 text-emerald-100 ring-1 ring-inset ring-emerald-400/30",
  gap: "bg-amber-400/15 text-amber-100 ring-1 ring-inset ring-amber-400/30",
  plain: "text-slate-400",
};

export function HeatmapPreview() {
  return (
    <div className="mx-auto w-full max-w-sm lg:max-w-none">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg-soft backdrop-blur-sm">
        {/* Header: score + band */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-slate-400">
              Match score
            </p>
            <p className="mt-1 font-display text-3xl font-extrabold text-white">
              74<span className="text-lg text-slate-500">/100</span>
            </p>
          </div>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
            Good match — close the gaps
          </span>
        </div>

        {/* The pasted JD, lit up */}
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-eyebrow text-slate-500">
          The job description you pasted
        </p>
        <ul className="mt-3 space-y-1.5">
          {lines.map((line) => (
            <li
              key={line.text}
              className={`rounded-md px-2.5 py-1.5 text-sm leading-snug ${stateClass[line.state]}`}
            >
              {line.text}
            </li>
          ))}
        </ul>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-400/70" />
            On your CV
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-amber-400/70" />
            A gap to close
          </span>
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-slate-500 lg:text-left">
        Illustration — your real result is based on the CV in your browser.
      </p>
    </div>
  );
}
