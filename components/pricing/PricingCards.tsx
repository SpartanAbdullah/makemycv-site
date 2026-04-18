import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Line = { label: string; included: boolean };

const freeLines: Line[] = [
  { label: "Full CV builder", included: true },
  { label: "All templates", included: true },
  { label: "Live preview", included: true },
  { label: "PDF download (with watermark)", included: true },
  { label: "UAE-specific fields", included: true },
  { label: "AI rewriting", included: false },
  { label: "Watermark on PDF", included: false },
];

const proLines: Line[] = [
  { label: "Everything in Free", included: true },
  { label: "No watermark", included: true },
  { label: "AI rewriter — weak bullets → measurable achievements", included: true },
  { label: "Priority templates (Executive, Graduate Pro)", included: true },
  { label: "Re-download same CV free for 30 days", included: true },
  { label: "Priority email support", included: true },
];

function LineItem({ line, accent = "emerald" }: { line: Line; accent?: "emerald" | "blue" }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-slate-700">
      {line.included ? (
        <Check
          size={16}
          strokeWidth={2.5}
          className={`mt-0.5 shrink-0 ${accent === "blue" ? "text-brand-blue" : "text-emerald-500"}`}
        />
      ) : (
        <X
          size={16}
          strokeWidth={2.5}
          className="mt-0.5 shrink-0 text-slate-400"
        />
      )}
      <span className={line.included ? "" : "text-slate-400 line-through"}>
        {line.label}
      </span>
    </li>
  );
}

export function PricingCards() {
  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-2">
        {/* Free */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-slate-500">
            Free
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-5xl font-extrabold text-slate-900">
              $0
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Everything you need to build and preview your CV.
          </p>
          <ul className="mt-6 space-y-2">
            {freeLines.map((l) => (
              <LineItem key={l.label} line={l} accent="emerald" />
            ))}
          </ul>
          <div className="mt-8">
            <Button
              href="https://app.makemycv.ae"
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              withArrow
              variant="ghost"
              tone="light"
              className="w-full"
              data-event="pricing_plan_cta_click"
              data-plan="free"
            >
              Start Building Free
            </Button>
          </div>
        </div>

        {/* Pro — featured */}
        <div className="relative flex flex-col rounded-2xl border-2 border-brand-blue bg-white p-8 shadow-cta">
          <span className="absolute -top-3 left-8 rounded-full bg-brand-blue px-3 py-1 text-[10px] font-bold uppercase tracking-eyebrow text-white">
            Most Popular
          </span>
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-brand-blue">
            Pro
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-5xl font-extrabold text-slate-900">
              $5
            </span>
            <span className="text-base font-medium text-slate-500">
              / download
            </span>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-500">
            one-time, per CV
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Unlock when you&rsquo;re happy with your CV. Download as many
            versions as you want — each download is $5.
          </p>
          <ul className="mt-6 space-y-2">
            {proLines.map((l) => (
              <LineItem key={l.label} line={l} accent="blue" />
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
              data-plan="pro"
            >
              Build First, Pay Later
            </Button>
            <p className="mt-3 text-center text-xs text-slate-500">
              You only pay after you see the finished CV. No trial, no
              auto-charge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
