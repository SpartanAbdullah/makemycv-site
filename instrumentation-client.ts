// Sentry — browser runtime for the marketing site.
// Same posture as instrumentation.ts; read that header first.
//
// Session Replay is OFF here too. The site itself carries little PII, but
// /contact collects name, email and message, and the calculators take salary
// figures — none of which belongs in a third-party screen recording. Keeping
// both repos on the same rule also means nobody has to remember which one is
// "the safe one".

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0,
    sendDefaultPii: false,
    maxValueLength: 2000,
    enabled: process.env.NODE_ENV === "production",
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,

    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,

    beforeSend(event) {
      delete event.user;
      if (event.request) {
        delete event.request.data;
        delete event.request.cookies;
        delete event.request.query_string;
      }
      return event;
    },

    beforeBreadcrumb(breadcrumb) {
      if (breadcrumb.category === "console") return null;
      if (breadcrumb.data) delete breadcrumb.data.body;
      return breadcrumb;
    },
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

// CSP observation (2026-10-24): the Report-Only policy in next.config.ts
// fires this event for anything it WOULD have blocked. First three per page
// go to Sentry so the allow-list can be completed before enforcement.
if (typeof window !== "undefined" && dsn) {
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
    Sentry.captureMessage(`CSP violation: ${e.violatedDirective} blocked ${host}`, {
      level: "warning",
      tags: { csp_directive: e.violatedDirective, csp_host: host, csp_mode: e.disposition },
      fingerprint: ["csp", e.violatedDirective, host],
    });
  });
}
