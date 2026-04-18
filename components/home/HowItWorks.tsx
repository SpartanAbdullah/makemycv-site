import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    n: 1,
    time: "~2 min",
    title: "Fill in your details.",
    body: "Paste from your old CV, or start fresh. We guide you field by field — visa status, experience, skills.",
  },
  {
    n: 2,
    time: "~1 min",
    title: "Pick a template.",
    body: "Classic, Modern, Executive, Graduate. Switch any time — your data stays.",
  },
  {
    n: 3,
    time: "~30 sec",
    title: "Download & apply.",
    body: "Export as PDF, or unlock AI rewriting and watermark removal for $5.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="From blank page to PDF in 5 minutes."
          subcopy="No account. No credit card. No \u201Cupgrade to continue\u201D popup at step 3."
        />

        <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <div key={s.n} className="relative text-center">
              {/* Dashed connector between steps */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[calc(50%+28px)] right-[calc(-50%+28px)] top-6 hidden h-px md:block"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to right, #cbd5e1 0, #cbd5e1 6px, transparent 6px, transparent 12px)",
                  }}
                />
              )}

              <div className="relative z-10 mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-lg font-bold text-white shadow-cta">
                {s.n}
              </div>

              <span className="mt-4 inline-block rounded-full bg-blue-50 px-3 py-0.5 text-[11px] font-semibold text-brand-blue">
                {s.time}
              </span>

              <h3 className="mt-3 font-display text-lg font-bold text-slate-900">
                {s.title}
              </h3>
              <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-slate-600">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            withArrow
            data-event="home_how_it_works_cta_click"
          >
            Start building — Free
          </Button>
          <p className="mt-4 text-sm text-slate-500">
            No credit card. No account. Your data never leaves your browser.
          </p>
        </div>
      </div>
    </section>
  );
}
