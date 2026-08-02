// Sentry — server + edge runtimes for the marketing site.
// (2026-08-02, audit A-W5-031: no error tracking existed in either repo.)
//
// This site is 100% statically rendered with zero API routes, so the server
// surface is thin — but a build-time or RSC error still needs to reach someone,
// and today nothing does.
//
// Lower PII risk than the app (no CV data here), with one real exception: the
// contact form at /contact posts name, email and message to Formspree. If that
// submission throws, the payload must not ride along into Sentry. Hence the
// same body-stripping posture as the app.

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

const shared = {
  dsn,
  tracesSampleRate: 0,
  // Never attach IP / cookies / headers automatically.
  sendDefaultPii: false,
  maxValueLength: 2000,
  enabled: process.env.NODE_ENV === "production",
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  beforeSend(event: Sentry.ErrorEvent): Sentry.ErrorEvent {
    if (event.request) {
      delete event.request.data;
      delete event.request.cookies;
      delete event.request.query_string;
    }
    delete event.user;
    return event;
  },
};

export async function register() {
  if (!dsn) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init(shared);
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init(shared);
  }
}

export const onRequestError = Sentry.captureRequestError;
