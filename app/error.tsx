"use client";

import { useEffect } from "react";

/* Root error boundary for the marketing site (audit 2026-06-12, gap #2).
 * A marketing page crash should never strand a visitor — recover in
 * place, and keep the conversion path (the app) one click away. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[site/error]", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper-2 px-6">
      <div className="w-full max-w-md rounded-2xl border border-line bg-paper p-8 text-center shadow-lg-soft">
        <span
          aria-hidden
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl font-bold text-brand-blue"
        >
          !
        </span>
        <h1 className="mt-4 text-xl font-semibold text-brand-ink">
          Something went wrong on our side
        </h1>
        <p className="mt-2 text-sm leading-6 text-brand-muted">
          Sorry about that — it&apos;s us, not you. Trying again usually
          fixes it. The CV builder itself is unaffected.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-cta"
          >
            Try again
          </button>
          <a
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-brand-border px-5 py-2.5 text-sm font-medium text-brand-deep"
          >
            Open the CV builder
          </a>
        </div>
        <p className="mt-6 text-xs text-brand-muted">
          Keeps happening? Email{" "}
          <a href="mailto:hello@makemycv.ae" className="underline">
            hello@makemycv.ae
          </a>
          {error.digest ? ` and mention code ${error.digest}` : ""}.
        </p>
      </div>
    </main>
  );
}
