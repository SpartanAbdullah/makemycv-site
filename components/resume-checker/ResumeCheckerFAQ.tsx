export const faqItems = [
  {
    q: "Is this actually free?",
    a: "Yes — the full ATS check is free and every finding is visible. No email gate, no premium tier, no account needed. We make money only if you choose to buy a polished download from the MakeMyCV builder for a one-time $5.",
  },
  {
    q: "What happens to my CV after I upload it?",
    a: "Your CV is parsed on our servers to produce the report, and the file is permanently deleted after 24 hours. It's never shared with recruiters, employers or third parties, and never used to train AI models.",
  },
  {
    q: "How is this different from other resume checkers?",
    a: "Most generic checkers are tuned for US/UK hiring. Ours is built around UAE recruiting reality — visa status, nationality, Arabic-name handling, GCC-specific recruiter norms, and the ATS platforms actually used by Emaar, ADCB, ENOC and DIFC firms.",
  },
  {
    q: "Does this work for non-English CVs?",
    a: "The checker is built for English-language CVs, which is what 95%+ of UAE corporate hiring requires. Arabic CVs aren't fully supported yet. If your CV is bilingual with English as the primary language, it will work.",
  },
  {
    q: "Is my CV shared with recruiters or employers?",
    a: "No. We are not a recruiting platform. MakeMyCV never sends your CV to employers, never sells contact data, and never shares uploads with third parties. You upload, you get a report, we delete the file.",
  },
  {
    q: "Can I use this if I'm not in the UAE?",
    a: "You can — the ATS checks for parseability, structure and scannability are universal. The UAE-specific checks (visa status, nationality fields) will surface as suggestions you can safely ignore if you're applying elsewhere.",
  },
];

export function ResumeCheckerFAQ() {
  return (
    <section className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Before you upload
        </p>
        <h2 className="mt-4 font-display font-bold text-slate-900 tracking-[-0.02em]" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
          Questions people ask before uploading.
        </h2>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="group py-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <span className="font-display text-lg font-semibold text-slate-900 md:text-xl">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-slate-500 transition-transform group-open:rotate-45"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 pr-12 text-[15px] leading-relaxed text-slate-600 md:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
