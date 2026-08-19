import type { Metadata } from "next";
import Link from "next/link";

/* 404 for the marketing site (audit 2026-06-12, gap #2).
 * SEO note: Next serves this with a real 404 status, which is exactly
 * what Google wants for dead URLs. Funnel the human to the highest-value
 * pages instead of a dead end. */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper-2 px-6">
      <div className="w-full max-w-md rounded-2xl bg-sheet p-8 text-center shadow-float">
        <p className="text-sm font-semibold tracking-eyebrow text-accent">
          404
        </p>
        <h1 className="mt-2 text-xl font-semibold text-ink">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          The link may be old or mistyped — but everything you came for is
          still here.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <a
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-cta transition-all duration-200 hover:-translate-y-px hover:shadow-cta-hover hover:brightness-[1.08]"
          >
            Build My CV — Free
          </a>
          <Link
            href="/blog"
            className="rounded-full bg-sheet px-5 py-2.5 text-sm font-semibold text-ink-2 shadow-float transition-all duration-200 hover:-translate-y-px hover:shadow-float-hover"
          >
            Read the blog
          </Link>
        </div>
        <p className="mt-6 text-xs text-muted">
          Or go back to the{" "}
          <Link href="/" className="underline">
            homepage
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
