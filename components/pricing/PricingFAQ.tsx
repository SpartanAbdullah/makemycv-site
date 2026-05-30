"use client";

import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "./faqItems";

export function PricingFAQ() {
  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading title="Questions, answered straight." />

        <div className="mt-12 space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs open:shadow-md-soft"
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900 hover:bg-paper-2"
                data-event="pricing_faq_expand"
                data-question-id={item.id}
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-brand-blue transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-700">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
