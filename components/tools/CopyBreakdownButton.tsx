"use client";

import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { copyText } from "@/components/tools/copyText";

/**
 * "Copy breakdown" button shared by the three calculators. Clipboard access
 * can be denied outright (some webviews/embedded browsers), so failure is
 * made productive: the breakdown appears in a selectable textarea the user
 * can copy manually — the feature degrades, it never dead-ends.
 */
export function CopyBreakdownButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);
  const [fallbackText, setFallbackText] = useState<string | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  async function onClick() {
    const text = getText();
    if (await copyText(text)) {
      setCopied(true);
      setFallbackText(null);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setFallbackText(text);
      // Select it for the user so a manual Ctrl/Cmd+C is one keystroke away.
      setTimeout(() => {
        taRef.current?.focus();
        taRef.current?.select();
      }, 50);
    }
  }

  // Fragment: the button sits inline with its siblings (e.g. a print button
  // in a flex-wrap row); the fallback block is w-full so it wraps onto its
  // own full-width line.
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-blue/50"
      >
        {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
        {copied ? "Copied" : "Copy breakdown"}
      </button>
      {fallbackText !== null && (
        <div className="w-full">
          <p className="text-xs text-slate-500">
            Your browser blocked automatic copying — the breakdown is selected
            below; press Ctrl/Cmd+C.
          </p>
          <textarea
            ref={taRef}
            readOnly
            value={fallbackText}
            rows={Math.min(12, fallbackText.split("\n").length + 1)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-paper-2 p-3 font-mono text-xs text-slate-700"
          />
        </div>
      )}
    </>
  );
}
