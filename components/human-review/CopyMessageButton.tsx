"use client";

import { useState } from "react";

/* Copies a ready-to-send message so a visitor doesn't face a blank LinkedIn box.
   The ref tells us which surface sent them, since LinkedIn itself reports
   nothing back. It is read in the browser so the page can stay static. */
const REFS: Record<string, string> = { pe: "PE", ck: "CK" };

const buildMessage = () => {
  const from = new URLSearchParams(window.location.search).get("from") ?? "";
  const ref = REFS[from] ?? "WEB";
  return `Hi MakeMyCV, I'd like a human CV review. Target role: ___. Ref: ${ref}`;
};

export const CopyMessageButton = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildMessage());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* Clipboard blocked: the steps below still explain what to send. */
    }
  };

  return (
    <button
      type="button"
      onClick={() => void copy()}
      data-event="cta_click"
      data-cta-id="human_review_copy"
      data-cta-location="human_review_page"
      className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-sheet px-6 text-base font-semibold text-ink transition-colors hover:bg-paper-2"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy my message"}</span>
    </button>
  );
};
