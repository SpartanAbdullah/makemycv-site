// Sentry for the browser, loaded on demand (2026-11-02).
//
// The SDK used to be imported statically by instrumentation-client.ts, which
// put it in the main client chunk that every page parses before the hero can
// paint. PageSpeed (mobile, Lighthouse 13.6) traced the late LCP to that chunk.
// It now lives in its own async chunk: instrumentation-client.ts loads it on
// the visitor's first interaction (or 10 s after load), and the error
// boundaries load it the moment they catch something. The trade-off is that an
// error thrown before that point is not captured; the boundaries still report
// theirs.
//
// Posture unchanged from the original init (read instrumentation.ts first):
// Session Replay is OFF — /contact collects name, email and message, and the
// calculators take salary figures, none of which belongs in a screen recording.

type SentryModule = typeof import("./sentry-client-impl");

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

let loading: Promise<SentryModule | null> | null = null;

export function loadSentry(): Promise<SentryModule | null> {
  if (!dsn || typeof window === "undefined") return Promise.resolve(null);
  loading ??= import("./sentry-client-impl").then((Sentry) => {
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
    return Sentry;
  });
  return loading;
}

/** Report an error caught by a boundary; never throws. */
export function reportError(error: unknown): void {
  loadSentry()
    .then((Sentry) => Sentry?.captureException(error))
    .catch(() => {
      /* reporting must never break the page */
    });
}
