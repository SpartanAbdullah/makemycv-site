"use client";

import { useState } from "react";
import { formatAed } from "@/components/tools/gratuity";

/**
 * Basic-salary input with an "I only know my gross" helper — the single
 * most common calculator mistake in the research: users type gross/total
 * salary and get a figure inflated 40–60%, then feel cheated at settlement.
 * UAE packages commonly set basic at 35–60% of gross; the toggle derives an
 * estimated basic from gross × percentage so nobody is forced to guess.
 *
 * Controlled from outside via value/onChange (the derived basic is pushed
 * through onChange so the host calculator only ever sees one number).
 */
export function BasicSalaryInput({
  value,
  onChange,
  onDerivedChange,
  label = "Basic monthly salary (AED)",
  placeholder = "e.g. 8000",
}: {
  value: string;
  onChange: (v: string) => void;
  /** Notified when the value starts/stops being gross-derived (estimated). */
  onDerivedChange?: (derived: boolean) => void;
  label?: string;
  placeholder?: string;
}) {
  const [grossMode, setGrossMode] = useState(false);
  const [gross, setGross] = useState("");
  const [basicPct, setBasicPct] = useState("50");

  const applyGross = (g: string, pct: string) => {
    setGross(g);
    setBasicPct(pct);
    const gv = parseFloat(g);
    const pv = parseFloat(pct);
    if (Number.isFinite(gv) && gv > 0 && Number.isFinite(pv) && pv > 0 && pv <= 100) {
      onChange(String(Math.round(gv * (pv / 100))));
    } else {
      onChange("");
    }
  };

  return (
    <div>
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        {!grossMode && (
          <>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
            <span className="mt-1 block text-xs text-slate-500">
              The <strong>Basic</strong> line on your payslip / MOHRE contract —{" "}
              <strong>not</strong> gross. Exclude housing, transport,
              allowances, commission and bonus. If it changed over the years,
              enter your <strong>final</strong> basic salary.
            </span>
          </>
        )}
      </label>

      {grossMode && (
        <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-slate-700">
                Gross monthly salary (AED)
              </span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                placeholder="e.g. 16000"
                value={gross}
                onChange={(e) => applyGross(e.target.value, basicPct)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-700">
                Basic as % of gross
              </span>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={100}
                value={basicPct}
                onChange={(e) => applyGross(gross, e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
              <span className="mt-1 block text-[11px] text-slate-500">
                Check your contract — UAE packages commonly set basic at
                35–60% of gross.
              </span>
            </label>
          </div>
          {value !== "" && parseFloat(value) > 0 && (
            <p className="mt-3 text-sm text-slate-700">
              Estimated basic used: <strong>{formatAed(parseFloat(value))}</strong>
              {" "}— the real figure is on your contract; if your true basic is
              lower, the payout will be lower.
            </p>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          const next = !grossMode;
          setGrossMode(next);
          onDerivedChange?.(next);
          if (next) {
            onChange("");
            setGross("");
          }
        }}
        className="mt-2 text-xs font-semibold text-brand-blue hover:underline"
      >
        {grossMode
          ? "I know my exact basic salary"
          : "I only know my gross salary"}
      </button>
    </div>
  );
}
