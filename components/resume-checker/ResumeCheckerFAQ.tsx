export const faqItems = [
  {
    q: "Is this actually free?",
    a: "Yes — the full ATS check is free and every finding is visible. No email gate, no paid tier, no account needed. The whole MakeMyCV builder is free too. If the tool helped you, you can leave a voluntary tip on the support page toward hosting and AI costs — entirely optional.",
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
  {
    q: "Should I upload my CV as a PDF or DOCX for UAE jobs?",
    a: "Use a text-based PDF (one you exported from a document, not a scan or screenshot). Modern applicant tracking systems used by UAE employers parse text-based PDFs reliably, and a PDF keeps your layout intact for the recruiter who reads it afterwards. A scanned or image-based PDF has no readable text, so the ATS sees a blank CV. This checker only accepts PDF.",
  },
  {
    q: "Is passing the ATS enough to get the job?",
    a: "No. Passing the ATS only means a human recruiter actually sees your CV — it's the first gate, not the finish line. After that, your content, relevance to the role, and how clearly you show impact decide the outcome. This checker fixes the formatting and keyword issues that get CVs filtered out before a person reads them; it doesn't assess whether you're the right hire.",
  },
  {
    q: "How do I add keywords without keyword-stuffing?",
    a: "Mirror the exact wording of the job ad only where it's genuinely true of your experience — job titles, tools, certifications and skills you actually have. Put them in context inside your bullet points, not in a hidden list or a wall of comma-separated terms. Stuffing keywords you can't back up gets flagged by recruiters and can't survive an interview, so the checker rewards relevant, in-context terms rather than raw density.",
  },
  {
    q: "Why do different ATS systems score the same CV differently?",
    a: "Because there is no single universal ATS score. Systems like Workday, Greenhouse, Lever, Taleo and iCIMS each parse and rank CVs with their own logic, and every employer configures the keywords and knockout rules for their specific role. That's why we don't promise a fixed score or a guaranteed pass — we flag the concrete parsing and content issues that hurt you across all of them, so your CV is readable whichever system an employer uses.",
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
