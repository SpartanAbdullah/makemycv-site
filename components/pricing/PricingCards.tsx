import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SupportTip } from "@/components/SupportTip";

const included = [
  "Full CV builder",
  "Every template",
  "UAE-specific fields (emirate, visa status, nationality)",
  "Live preview as you type",
  "Import an existing PDF or DOCX",
  "JD Match — match your CV to any job",
  "Honest AI rewriting",
  "ATS resume checker",
  "PDF download — no watermark",
];

export function PricingCards() {
  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl items-start gap-6 px-6 md:grid-cols-2">
        {/* Free — everything */}
        <div className="flex flex-col rounded-2xl border-2 border-brand-blue bg-white p-8 shadow-cta">
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-brand-blue">
            Everything, free
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-5xl font-extrabold text-slate-900">
              $0
            </span>
            <span className="text-base font-medium text-slate-500">forever</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            No tiers, no trial, no auto-charge. Nothing is locked behind a
            payment.
          </p>
          <ul className="mt-6 space-y-2">
            {included.map((label) => (
              <li
                key={label}
                className="flex items-start gap-2.5 text-sm text-slate-700"
              >
                <Check
                  size={16}
                  strokeWidth={2.5}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button
              href="https://app.makemycv.ae"
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              withArrow
              className="w-full"
              data-event="pricing_plan_cta_click"
              data-plan="free"
            >
              Start Building Free
            </Button>
          </div>
        </div>

        {/* Optional tip */}
        <div className="flex flex-col gap-4">
          <SupportTip />
          <p className="px-2 text-center text-xs leading-relaxed text-slate-500">
            Tips are optional and never unlock anything. They help cover hosting
            and AI costs so MakeMyCV stays free for every UAE job seeker.
          </p>
        </div>
      </div>
    </section>
  );
}
