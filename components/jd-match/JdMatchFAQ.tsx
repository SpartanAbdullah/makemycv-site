export type FAQItem = { id: string; q: string; a: string };

export const faqItems: FAQItem[] = [
  {
    id: "free",
    q: "Is JD Match free?",
    a: "Yes. Pasting a job description, seeing your match score, and reading the green/amber heatmap are all free. The whole builder is free to use — if it helped, you can leave an optional tip, but nothing is gated behind a payment.",
  },
  {
    id: "need-cv",
    q: "Do I need a CV first?",
    a: "Yes — JD Match compares a job description against your CV, so build or import your CV first, then paste the job ad. You can import an existing PDF or DOCX in seconds and review every field before it's added.",
  },
  {
    id: "privacy",
    q: "Is my data private when I use JD Match?",
    a: "Your working CV draft is saved in your browser's local storage, not in an account. When you run a match or use AI-improve, the relevant CV and job-description text is sent to our servers to generate the result — it's never shown to recruiters, sold, or used to train AI models. So the builder keeps your draft local, while the matching and rewriting happen server-side.",
  },
  {
    id: "honest",
    q: "Will the AI exaggerate my experience to score higher?",
    a: "No — that's the opposite of what it's built to do. When it rewords a bullet to surface a keyword, it only re-expresses what you already did. If your experience can't truthfully back a keyword, it declines rather than invent a metric, tool, or certification. You review every suggestion before it's applied.",
  },
  {
    id: "tailor",
    q: "Can I tailor my CV per job without losing my full one?",
    a: "Yes. Tailor your CV to a specific role and download a focused copy for that application, while your master CV keeps everything. You're never rewriting from scratch for the next role.",
  },
  {
    id: "uae",
    q: "Is this built for the UAE job market?",
    a: "Yes. JD Match and the builder are UAE-aware throughout — emirate, visa status and nationality fields, attestation, and UAE-specific examples and suggestions — so your CV fits how Dubai, Abu Dhabi and GCC employers actually read it.",
  },
];

export function JdMatchFAQ() {
  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center font-display text-[32px] font-bold tracking-tight-1-5 text-slate-900 md:text-[40px]">
          JD Match — questions, answered.
        </h2>

        <dl className="mt-12 space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
            >
              <dt className="font-display text-base font-bold text-slate-900">
                {item.q}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
