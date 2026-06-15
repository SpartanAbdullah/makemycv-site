export type FAQItem = { id: string; q: string; a: string };

export const faqItems: FAQItem[] = [
  {
    id: "really-free",
    q: "Is it really free?",
    a: "Yes. The builder, every template, JD Match, the resume checker, AI rewriting and PDF download are all free — no watermark, no sign-up, no paywall. If MakeMyCV helps your job search you can leave an optional tip, but nothing is gated behind it.",
  },
  {
    id: "catch",
    q: "What’s the catch?",
    a: "There isn’t one. MakeMyCV is built by a solo developer in Dubai and kept free. Optional tips via Ko-fi (or PayPal) help cover hosting and AI costs so the tools stay free for the next person.",
  },
  {
    id: "ai-rewrite",
    q: "What does the AI rewriting actually do?",
    a: "It re-words an experience bullet you already wrote so a job’s keyword surfaces naturally — only when your experience genuinely backs it. If it can’t do that truthfully, it declines rather than invent a metric, tool, or certification. You review every suggestion before it’s applied.",
  },
  {
    id: "data",
    q: "Do you store my data?",
    a: "Your CV stays in your browser — it isn’t uploaded to our servers. For JD Match, only the job text you paste is sent for analysis, and it isn’t stored. Imported PDF/DOCX files are read locally on your device.",
  },
];
