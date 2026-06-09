import { FileCheck2, Lock, Sparkles, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";

/* ──────────────────────────────────────────────────────────────────────
 * Proof block — verifiable product facts only.
 *
 * Hard rule: no fabricated user counts, no animated counters that SSR
 * to "0+", and no fake/placeholder testimonials. If/when we have real,
 * sourced numbers and consented quotes, slot them in here.
 * ──────────────────────────────────────────────────────────────────── */

type ProductFact = {
  icon: typeof FileCheck2;
  title: string;
  desc: string;
};

const productFacts: ProductFact[] = [
  {
    icon: Sparkles,
    title: "Free for everyone",
    desc: "No sign-up, no paywall, no watermark on the PDF you download.",
  },
  {
    icon: FileCheck2,
    title: "ATS-tested templates",
    desc: "Single-column, parser-safe structure — built for the systems UAE banks, telcos and DIFC firms use.",
  },
  {
    icon: Lock,
    title: "Browser-only data",
    desc: "Your CV never leaves your device. No accounts, no server-side storage, nothing to leak.",
  },
  {
    icon: MapPin,
    title: "UAE-specific fields",
    desc: "Visa status, nationality, Emirates ID and driving licence built in as optional fields.",
  },
];

export function TrustSection() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28 text-white"
      style={{
        background:
          "linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)",
      }}
    >
      <div className="hero-spotlight" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Tier A — verifiable product facts */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-blue-400">
            What you actually get
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl tracking-tight-1-5">
            Built for the 2026 UAE hiring season.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400 md:text-base">
            No fluff. Free, ATS-clean, UAE-specific — the things that matter
            when your CV hits a recruiter&rsquo;s inbox in Dubai or Abu Dhabi.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productFacts.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tier B — collection slots for real testimonials.
            Intentionally empty of content until consented quotes land. */}
        <div className="mt-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-blue-400">
              Recently hired?
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl tracking-tight-1-5">
              Your story can help the next person.
            </h3>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={`slot-${i}`} variant="glass">
                <p className="text-sm font-semibold text-white">
                  Just got hired using MakeMyCV?
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Share your story &mdash; we&rsquo;ll feature it here (with your
                  consent) so the next person knows it works.
                </p>
                <a
                  href="/contact"
                  className="mt-4 inline-flex text-xs font-semibold text-blue-400 hover:underline underline-offset-4"
                >
                  Send your story &rarr;
                </a>
              </Card>
            ))}
          </div>
        </div>

        {/* Tier C — logo wall left out by design until verified consent lands. */}
      </div>
    </section>
  );
}
