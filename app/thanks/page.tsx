import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you for supporting MakeMyCV.",
  alternates: { canonical: canonicalUrl("/thanks") },
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-paper py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 76% 32%, rgba(14, 124, 74, 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <h1 className="font-display text-[clamp(40px,5vw,64px)] font-bold leading-[1.1] tracking-tight-2 text-ink">
          <span className="text-accent">Thank you</span> &#x1F64F;
        </h1>
        <p className="mt-6 text-lg text-ink-2">
          Really &mdash; thank you. Your tip keeps MakeMyCV free for everyone.
        </p>
        <p className="mt-4 text-base italic text-muted">
          If you have a moment, sharing the tool with someone job-hunting in
          the UAE helps just as much as a tip. &mdash; Abdullah
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block px-7 py-3.5 text-base font-semibold text-white"
          >
            Back to the CV builder &rarr;
          </a>
          <Link
            href="/blog"
            className="inline-block rounded-full bg-sheet text-ink shadow-float hover:shadow-float-hover hover:-translate-y-px transition-all duration-200 px-7 py-3.5 text-base font-semibold"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </section>
  );
}
