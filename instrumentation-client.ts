// Sentry — browser runtime for the marketing site.
// Same posture as instrumentation.ts; read that header first.
//
// The SDK itself is loaded lazily from lib/sentry-client.ts (2026-11-02): a
// static import here put it in the main chunk every page parses before the
// hero paints. This file only schedules the load once the page is idle.
//
// Session Replay is OFF here too. The site itself carries little PII, but
// /contact collects name, email and message, and the calculators take salary
// figures — none of which belongs in a third-party screen recording. Keeping
// both repos on the same rule also means nobody has to remember which one is
// "the safe one".

import { loadSentry } from "./lib/sentry-client";

if (typeof window !== "undefined") {
  const start = () => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1));
    idle(() => void loadSentry());
  };
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
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
