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
    <section className="min-h-[60vh] bg-brand-navy dot-grid py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h1 className="font-display text-5xl font-extrabold text-white md:text-6xl">
          Thank you &#x1F64F;
        </h1>
        <p className="mt-6 text-lg text-slate-300">
          Really &mdash; thank you. Your tip keeps MakeMyCV free for everyone.
        </p>
        <p className="mt-4 text-base italic text-slate-400">
          If you have a moment, sharing the tool with someone job-hunting in
          the UAE helps just as much as a tip. &mdash; Abdullah
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block rounded-xl px-7 py-3.5 text-base font-bold text-white"
          >
            Back to the CV builder &rarr;
          </a>
          <Link
            href="/blog"
            className="inline-block rounded-xl border border-slate-600 px-7 py-3.5 text-base font-semibold text-slate-200 transition-colors hover:bg-white/10"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </section>
  );
}
