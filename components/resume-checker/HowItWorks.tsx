import type { SVGProps } from "react";

type Step = {
  num: string;
  title: string;
  body: string;
  detail: string;
  Visual: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
};

function UploadVisual(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* document */}
      <path
        d="M38 12 H70 L82 24 V68 a4 4 0 0 1 -4 4 H38 a4 4 0 0 1 -4 -4 V16 a4 4 0 0 1 4 -4 Z"
        className="text-brand-blue"
      />
      <path d="M70 12 V24 H82" className="text-brand-blue" />
      <path d="M42 36 H68 M42 44 H74 M42 52 H62" className="text-slate-300" />
      {/* upload arrow */}
      <g className="text-brand-blue-dark">
        <circle cx="96" cy="56" r="12" fill="white" />
        <path d="M96 62 V50 M90 56 L96 50 L102 56" />
      </g>
    </svg>
  );
}

function ScanVisual(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* document */}
      <rect x="30" y="12" width="52" height="60" rx="4" className="text-brand-blue" />
      <path
        d="M38 26 H74 M38 34 H70 M38 42 H74 M38 50 H66 M38 58 H72"
        className="text-slate-300"
      />
      {/* scan beam */}
      <rect
        x="28"
        y="40"
        width="56"
        height="6"
        rx="1"
        className="text-brand-blue"
        fill="rgba(37,99,235,0.12)"
        stroke="rgba(37,99,235,0.55)"
      />
      {/* check dots running down the side */}
      <g className="text-brand-blue">
        <circle cx="94" cy="22" r="2" fill="currentColor" stroke="none" />
        <circle cx="94" cy="34" r="2" fill="currentColor" stroke="none" />
        <circle cx="94" cy="46" r="2" fill="currentColor" stroke="none" />
        <circle cx="94" cy="58" r="2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

function ReviewVisual(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* row 1 — error (red) */}
      <rect x="20" y="18" width="8" height="8" rx="2" fill="#DC2626" stroke="none" />
      <path d="M36 22 H98" className="text-slate-300" />
      {/* row 2 — review (amber) */}
      <rect x="20" y="36" width="8" height="8" rx="2" fill="#D97706" stroke="none" />
      <path d="M36 40 H92" className="text-slate-300" />
      {/* row 3 — good (green) */}
      <rect x="20" y="54" width="8" height="8" rx="2" fill="#059669" stroke="none" />
      <path d="M36 58 H100" className="text-slate-300" />
      {/* check mark */}
      <g className="text-brand-blue-dark">
        <path d="M20 18 L22.5 20.5 L27 16" stroke="white" strokeWidth="1.5" />
        <path d="M20 36 L22.5 38.5 L27 34" stroke="white" strokeWidth="1.5" />
        <path d="M20 54 L22.5 56.5 L27 52" stroke="white" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

const steps: Step[] = [
  {
    num: "00",
    title: "Upload your PDF",
    body: "Drop in the CV you'd send today. PDF only — no DOCX, no sign-up, no email field.",
    detail: "Parsed in our backend. Your file is deleted after 24 hours.",
    Visual: UploadVisual,
  },
  {
    num: "01",
    title: "We scan 60+ UAE-tuned checks",
    body: "Every issue across content, structure, ATS compatibility and design — including UAE-specific gaps like visa status and nationality.",
    detail: "Same rule engine as our builder. Deterministic, no AI hallucination.",
    Visual: ScanVisual,
  },
  {
    num: "02",
    title: "You review the full report",
    body: "Severity-ranked. Fix-first list. No premium gate — every finding is visible.",
    detail: "Optionally import the parsed data into the builder and fix everything in one pass.",
    Visual: ReviewVisual,
  },
];

export function HowItWorks() {
  return (
    <section className="relative bg-paper-2 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            The flow
          </p>
          <h2 className="mt-4 font-display font-bold text-slate-900 tracking-[-0.02em]" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
            How it works.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            No account. No email. No upsell between you and your report.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {steps.map(({ num, title, body, detail, Visual }) => (
            <article
              key={num}
              className="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition-all hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              <span className="font-mono text-[34px] font-semibold leading-none text-brand-blue">
                {num}
              </span>

              <h3 className="mt-5 font-display text-[22px] font-bold leading-tight tracking-[-0.015em] text-slate-900 md:text-[24px]">
                {title}
              </h3>

              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                {body}
              </p>

              <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
                {detail}
              </p>

              <div className="mt-6 flex-1" />

              <div className="mt-4 rounded-xl border border-line bg-paper-2 p-4">
                <Visual className="h-16 w-full" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
