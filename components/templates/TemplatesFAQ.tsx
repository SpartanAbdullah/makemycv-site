export type FAQItem = { id: string; q: string; a: string };

export const faqItems: FAQItem[] = [
  {
    id: "which",
    q: "Which CV template should I use for UAE jobs?",
    a: "For most UAE corporate roles, choose a clean single-column layout marked ATS-safe, because it parses reliably through the online application portals large Gulf employers use. Design-led, multi-column layouts suit roles where a person reviews your CV directly, such as creative or smaller-firm applications.",
  },
  {
    id: "ats",
    q: "Are the templates ATS-friendly?",
    a: "The layouts flagged ATS-safe use single-column, text-based structure that applicant tracking systems parse cleanly. They avoid tables, multi-column blocks and graphics, which are the elements that most often break ATS parsing.",
  },
  {
    id: "free",
    q: "Are the templates free?",
    a: "Yes. Every template is free to use and download, with no watermark and no account required.",
  },
  {
    id: "switch",
    q: "Can I switch templates without losing my content?",
    a: "Yes. Your CV content is stored separately from the layout, so you can switch templates at any time and your text carries over.",
  },
  {
    id: "outside-uae",
    q: "Do these templates work outside the UAE?",
    a: "Yes. The ATS and formatting principles are universal. The UAE-specific fields, such as visa status and nationality, are optional and can be left out for applications elsewhere.",
  },
];

export function TemplatesFAQ() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center font-display text-3xl font-bold text-slate-900 md:text-4xl">
          Template questions, answered.
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
