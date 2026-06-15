import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const included = [
  "Full CV builder + every template",
  "JD Match — match your CV to any job",
  "Honest AI rewriting + ATS checker",
  "PDF download, no watermark",
  "UAE-specific fields throughout",
  "No sign-up, no ads, no paywall",
];

export function PricingStrip() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="It’s free. All of it."
          subcopy="No subscriptions, no trials, no watermark, no “upgrade to download”. If MakeMyCV helps your job search, you can leave an optional tip — never required."
        />

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-display text-5xl font-extrabold text-slate-900">
              Free
            </span>
            <span className="text-base font-medium text-slate-500">
              forever
            </span>
          </div>

          <ul className="mx-auto mt-8 grid max-w-xl gap-2.5 sm:grid-cols-2">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-slate-700"
              >
                <Check
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  strokeWidth={2.5}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Link
            href="/support"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline underline-offset-4"
            data-event="home_pricing_strip_support_click"
          >
            Why it’s free, and how to support it
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
