const steps = [
  {
    num: "00",
    title: "Upload your PDF",
    body: "Drop in the CV you'd send today. PDF only — no DOCX, no sign-up, no email field.",
    detail: "Parsed entirely in our backend. Your file is deleted after 24 hours.",
  },
  {
    num: "01",
    title: "We scan against 60+ UAE-tuned checks",
    body: "Every issue across content, structure, ATS compatibility and design — including UAE-specific gaps like visa status and nationality.",
    detail: "Same rule engine used by our builder. No AI hallucination, deterministic output.",
  },
  {
    num: "02",
    title: "You review the full report",
    body: "Severity-ranked. Fix-first list. No premium gate — every finding is visible, whether you use our builder or not.",
    detail: "Optionally import the parsed data into the builder and fix everything in one pass.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            The flow
          </p>
          <h2 className="mt-4 font-display font-bold text-slate-900 tracking-[-0.02em]" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
            How it works.
          </h2>
        </div>

        <ol className="relative mt-14 space-y-10 md:mt-20 md:space-y-16">
          {/* vertical rail on desktop */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[10%] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-brand-blue/40 via-line to-transparent md:block"
          />
          {steps.map((s, i) => (
            <li
              key={s.num}
              className={`relative grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-10 ${
                i === 1 ? "md:pl-[10%]" : i === 2 ? "md:pl-[20%]" : ""
              }`}
            >
              <div className="md:col-span-3">
                <span className="font-mono text-xs font-semibold text-brand-blue">
                  {s.num}
                </span>
                <h3 className="mt-2 font-display text-[26px] font-bold leading-tight tracking-[-0.02em] text-slate-900 md:text-[32px]">
                  {s.title}
                </h3>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <p className="text-lg leading-relaxed text-slate-700">{s.body}</p>
                <p className="mt-3 text-sm text-slate-500">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
