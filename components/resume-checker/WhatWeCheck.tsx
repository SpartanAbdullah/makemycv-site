import { FileText, LayoutList, ScanSearch, Palette } from "lucide-react";
import { Button } from "@/components/ui/Button";

const categories = [
  {
    icon: FileText,
    name: "Content",
    items: [
      "Summary depth and hook in the first 3 lines",
      "Quantified impact — numbers, %, currency, scale",
      "Action verbs vs. passive, vague phrasing",
    ],
  },
  {
    icon: LayoutList,
    name: "Section structure",
    items: [
      "Required sections for UAE hiring (visa, nationality, languages)",
      "Field completeness and labelling consistency",
      "Recruiter-scannability in the 6-second window",
    ],
  },
  {
    icon: ScanSearch,
    name: "ATS essentials",
    items: [
      "Format parseability — no tables, text boxes, images",
      "Date structure recognized by Workday, Taleo, SuccessFactors",
      "Font, columns and spacing that survive the scan",
    ],
  },
  {
    icon: Palette,
    name: "Design",
    items: [
      "Length calibrated to experience level",
      "Skills coverage depth vs. the role target",
      "Visual hierarchy — headings, whitespace, density",
    ],
  },
];

export function WhatWeCheck() {
  return (
    <section className="relative bg-paper-2 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              The scan
            </p>
            <h2 className="mt-4 font-display font-bold text-slate-900 tracking-[-0.02em]" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
              What we check in your CV.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-600">
            Four categories. ~60 individual checks. Every issue shown, no gated
            premium report.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {categories.map((c) => (
            <article
              key={c.name}
              className="group relative rounded-[24px] border border-line bg-paper p-8 transition-shadow"
              style={{ boxShadow: "var(--shadow-sm-soft)" }}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                <c.icon size={22} strokeWidth={2.25} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.015em] text-slate-900">
                {c.name}
              </h3>
              <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-slate-600">
                {c.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 rounded-[28px] border border-line bg-gradient-to-br from-white via-white to-blue-50/60 p-10 text-center md:flex-row md:justify-between md:text-left" style={{ boxShadow: "var(--shadow-md-soft)" }}>
          <div>
            <h3 className="font-display text-xl font-bold tracking-[-0.015em] text-slate-900 md:text-2xl">
              See what we&apos;d find in yours.
            </h3>
            <p className="mt-1.5 text-[15px] text-slate-600">
              Drop your PDF. We&apos;ll hand back every issue in under 30 seconds.
            </p>
          </div>
          <Button
            href="https://app.makemycv.ae/resume-checker"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            withArrow
            data-event="resume_checker_cta_click"
            data-cta-location="categories"
          >
            Check my CV — Free
          </Button>
        </div>
      </div>
    </section>
  );
}
