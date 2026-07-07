"use client";

/**
 * Clipboard write with a legacy fallback. navigator.clipboard.writeText
 * requires a secure context AND transient user activation — which can be
 * missing in embedded webviews and some mobile browsers. Falls back to the
 * textarea + execCommand approach so the copy button works everywhere.
 * Returns true when either path succeeded.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
