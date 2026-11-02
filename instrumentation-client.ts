// Sentry — browser runtime for the marketing site.
// Same posture as instrumentation.ts; read that header first.
//
// The SDK itself is loaded lazily from lib/sentry-client.ts (2026-11-02): a
// static import here put it in the main chunk every page parses before the
// hero paints. This file only schedules the load: on the visitor's first
// interaction, or 10 s after `load`, whichever comes first, so the SDK's
// startup work stays out of the page's initial blocking time.
//
// Session Replay is OFF here too. The site itself carries little PII, but
// /contact collects name, email and message, and the calculators take salary
// figures — none of which belongs in a third-party screen recording. Keeping
// both repos on the same rule also means nobody has to remember which one is
// "the safe one".

import { loadSentry } from "./lib/sentry-client";

if (typeof window !== "undefined") {
  const triggers = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const start = () => {
    clearTimeout(timer);
    triggers.forEach((t) => window.removeEventListener(t, start));
    void loadSentry();
  };
  triggers.forEach((t) => window.addEventListener(t, start, { once: true, passive: true }));
  const arm = () => {
    timer = setTimeout(start, 10_000);
  };
  if (document.readyState === "complete") arm();
  else window.addEventListener("load", arm, { once: true });
}

// CSP observation (2026-10-24): the Report-Only policy in next.config.ts
// fires this event for anything it WOULD have blocked. First three per page
// go to Sentry so the allow-list can be completed before enforcement.
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_SENTRY_DSN) {
  let reported = 0;
  window.addEventListener("securitypolicyviolation", (e) => {
    if (reported >= 3) return;
    reported += 1;
    let host = e.blockedURI;
    try {
      host = new URL(e.blockedURI).host || e.blockedURI;
    } catch {
      /* "inline", "eval", "data" and friends have no host */
    }
    void loadSentry().then((Sentry) =>
      Sentry?.captureMessage(`CSP violation: ${e.violatedDirective} blocked ${host}`, {
        level: "warning",
        tags: { csp_directive: e.violatedDirective, csp_host: host, csp_mode: e.disposition },
        fingerprint: ["csp", e.violatedDirective, host],
      }),
    );
  });
}
