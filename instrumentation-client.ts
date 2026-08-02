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
