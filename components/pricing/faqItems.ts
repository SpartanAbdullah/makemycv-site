export type FAQItem = { id: string; q: string; a: string };

export const faqItems: FAQItem[] = [
  {
    id: "one-time",
    q: "Is this really a one-time payment?",
    a: "Yes. $5 per final download. No subscription, no auto-renewal, no hidden fees. If you want to update your CV in 3 months, that\u2019s another $5 — or free if it\u2019s within 30 days of your last download.",
  },
  {
    id: "preview",
    q: "Can I see my CV before I pay?",
    a: "Yes. You build and preview for free. You only pay to remove the watermark on the final PDF.",
  },
  {
    id: "ai-rewrite",
    q: "What does \u201CAI rewrite\u201D actually do?",
    a: "It rewrites weak job descriptions into measurable, recruiter-friendly bullet points. Example: \u201CHandled customer queries\u201D \u2192 \u201CResolved 40+ customer queries daily with a 94% first-contact resolution rate.\u201D",
  },
  {
    id: "data",
    q: "Do you store my data?",
    a: "No. Your CV lives in your browser. Nothing is uploaded to our servers until you click download — and even then we only store the payment record, not your CV content.",
  },
];
