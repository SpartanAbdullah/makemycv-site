"use client";

import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { copyText } from "@/components/tools/copyText";
import { IconWhatsAppGlyph } from "@/components/SocialIcons";
import { ctaAttrs } from "@/lib/inline-cta";

/**
 * "Copy breakdown" button shared by the three calculators. Clipboard access
 * can be denied outright (some webviews/embedded browsers), so failure is
 * made productive: the breakdown appears in a selectable textarea the user
 * can copy manually — the feature degrades, it never dead-ends.
 */
export function CopyBreakdownButton({
  getText,
  label = "Copy breakdown",
}: {
  getText: () => string;
  /** Button label; defaults to the calculators' "Copy breakdown". */
  label?: string;
}) {
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
        className="inline-flex items-center gap-2 rounded-full bg-sheet px-4 py-2.5 text-sm font-semibold text-ink-2 shadow-float transition-all duration-200 hover:-translate-y-px hover:shadow-float-hover"
      >
        {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
        {copied ? "Copied" : label}
      </button>
      {fallbackText !== null && (
        <div className="w-full">
          <p className="text-xs text-muted">
            Your browser blocked automatic copying — the breakdown is selected
            below; press Ctrl/Cmd+C.
          </p>
          <textarea
            ref={taRef}
            readOnly
            value={fallbackText}
            rows={Math.min(12, fallbackText.split("\n").length + 1)}
            className="mt-2 w-full rounded-xl border border-line-strong bg-paper-2 p-3 font-mono text-xs text-ink-2"
          />
        </div>
      )}
    </>
  );
}

/**
 * "Send on WhatsApp" beside the copy button (2026-11-21). A settlement figure
 * is something people forward to a spouse or a colleague, and in the UAE that
 * happens on WhatsApp. Opens wa.me with the same breakdown text the copy
 * button produces; nothing is sent anywhere unless the person picks a chat
 * and presses send. Tracked as `cta_click` (`<tool>_share_whatsapp`).
 */
export function WhatsAppShareButton({
  getText,
  tool,
}: {
  getText: () => string;
  tool: "gratuity" | "notice" | "leave";
}) {
  return (
    <button
      type="button"
      onClick={() =>
        window.open(
          `https://wa.me/?text=${encodeURIComponent(getText())}`,
          "_blank",
          "noopener,noreferrer",
        )
      }
      className="inline-flex items-center gap-2 rounded-full bg-sheet px-4 py-2.5 text-sm font-semibold text-ink-2 shadow-float transition-all duration-200 hover:-translate-y-px hover:shadow-float-hover"
      {...ctaAttrs(`${tool}_share_whatsapp`, "calculator_result")}
    >
      <IconWhatsAppGlyph className="h-[15px] w-[15px]" aria-hidden="true" />
      Send on WhatsApp
    </button>
  );
}
