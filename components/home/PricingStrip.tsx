import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PricingStrip() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Free forever. Pro is $5 per download — pay only when you\u2019re ready to send it."
          subcopy="No subscriptions. No trials. No auto-renewal traps."
        />

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-slate-500">
              Free
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold text-slate-900">
              $0
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Full builder. All templates. PDF download with small watermark.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
              {["Full CV builder", "All templates", "Live preview"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-500"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="relative rounded-2xl border-2 border-brand-blue bg-white p-6 shadow-cta">
            <span className="absolute -top-3 left-6 rounded-full bg-brand-blue px-2.5 py-1 text-[10px] font-bold uppercase tracking-eyebrow text-white">
              Most Popular
            </span>
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-brand-blue">
              Pro
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold text-slate-900">
              $5
              <span className="text-base font-medium text-slate-500">
                {" "}
                / download
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-600">
              No watermark. AI rewriter. Priority templates.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
              {[
                "Everything in Free",
                "No watermark",
                "AI rewriter",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-brand-blue"
                    strokeWidth={2.5}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline underline-offset-4"
            data-event="home_pricing_strip_click"
          >
            See full comparison
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
