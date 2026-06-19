export type FAQItem = { id: string; q: string; a: string };

export const faqItems: FAQItem[] = [
  {
    id: "free",
    q: "Is MakeMyCV free?",
    a: "Yes. Building, editing and downloading your CV are free, with no watermark and no account required. If it helps your search you can leave an optional tip, but nothing is locked behind a payment.",
  },
  {
    id: "signup",
    q: "Do I need to sign up or enter a card?",
    a: "No. You can build and download a CV without an account or a credit card, and JD Match runs without sign-up too.",
  },
  {
    id: "what",
    q: "What can I do with MakeMyCV?",
    a: "Build an ATS-clean CV from a UAE-aware template, then use JD Match to paste a job description and see a match score plus a requirement-by-requirement heatmap of what your CV covers and what it is missing.",
  },
  {
    id: "ats-uae",
    q: "Are the CVs suitable for ATS and UAE employers?",
    a: "Yes. The templates use clean, single-column structure that applicant tracking systems parse reliably, and the builder includes UAE-specific fields such as emirate, visa status and nationality.",
  },
  {
    id: "privacy",
    q: "Is my data private?",
    a: "Your working CV draft is saved in your browser's local storage, not in an account. When you run a JD match or use AI-improve, the relevant text is sent to our servers to generate the result — it is not shown to recruiters, sold, or used to train AI models.",
  },
];

export function HomeFAQ() {
  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center font-display text-[32px] font-bold tracking-tight-1-5 text-slate-900 md:text-[40px]">
          MakeMyCV — questions, answered.
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
