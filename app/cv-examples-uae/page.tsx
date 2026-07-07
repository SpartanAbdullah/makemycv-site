import Link from "next/link";
import { ArrowRight, FileCheck2, ScanSearch, X, Check } from "lucide-react";
import { buildPageMetadata, canonicalUrl, APP_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo-schema";

export const metadata = buildPageMetadata({
  title: "UAE CV Examples — Weak vs Strong Bullets by Sector",
  description:
    "Before/after CV bullet rewrites for six UAE sectors — banking & DIFC finance, executive, tech, healthcare, oil & gas, and sales. See exactly how to add AED figures, scale and UAE context that recruiters and ATS reward.",
  path: "/cv-examples-uae",
});

// Branded quick answer (B0 pattern), folded into the page FAQPage below.
const aiAnswer = {
  q: "What does a strong CV bullet look like for UAE jobs?",
  lead: "MakeMyCV's UAE CV examples show weak-to-strong bullet rewrites for six sectors",
  a: "MakeMyCV's UAE CV examples show weak-to-strong bullet rewrites for six sectors — banking and DIFC finance, executive, tech, healthcare, oil and gas, and sales. A strong UAE CV bullet opens with an action verb, quantifies the result in AED, percentages or scale, and anchors real UAE context such as DIFC, ADNOC or DOH. All examples are illustrative patterns, free to copy and adapt.",
};

// Illustrative examples — written to demonstrate the pattern. NOT client data;
// the page says so explicitly (honesty guardrail).
const sectors = [
  {
    name: "Banking & Finance (DIFC)",
    role: "Relationship Manager",
    weak: "Responsible for handling client accounts and daily banking operations.",
    strong:
      "Managed 40+ high-net-worth portfolios worth AED 180M at a DIFC-regulated bank, cutting client churn 15% by introducing quarterly portfolio reviews.",
    why: "Portfolio count, AED scale, the DIFC regulatory context and a % outcome — four concrete signals in one line.",
  },
  {
    name: "Executive & Leadership",
    role: "General Manager",
    weak: "Led the company's growth strategy and managed several departments.",
    strong:
      "Directed a 120-person operation across three emirates, growing annual revenue from AED 45M to AED 68M in two years while lifting EBITDA margin four points.",
    why: "Span of control, geographic scope, and hard financial movement — the three things boards and search firms scan for.",
  },
  {
    name: "Technology & IT",
    role: "Full-Stack Developer",
    weak: "Worked on the company website and fixed bugs.",
    strong:
      "Rebuilt the e-commerce checkout in Next.js for a Dubai retailer, cutting page-load time 38% and cart abandonment 12% across 250K monthly sessions.",
    why: "Names the stack, quantifies performance and business impact, and shows the traffic scale you operated at.",
  },
  {
    name: "Healthcare",
    role: "ER Staff Nurse",
    weak: "Provided patient care and assisted doctors in the department.",
    strong:
      "Triaged 60+ patients per shift in a 400-bed Abu Dhabi hospital ER, maintaining DOH documentation compliance and cutting average wait time 22%.",
    why: "Patient volume, facility scale, the UAE regulator (DOH) and a measurable service outcome.",
  },
  {
    name: "Oil & Gas",
    role: "Maintenance Planner",
    weak: "Involved in maintenance activities at the plant.",
    strong:
      "Planned shutdown maintenance for three gas-processing trains on an ADNOC-contracted site, delivering the turnaround four days early with zero LTI.",
    why: "Scope (three trains), client context (ADNOC), schedule performance and the safety metric the industry actually uses (LTI).",
  },
  {
    name: "Sales & Retail",
    role: "Senior Sales Consultant",
    weak: "Achieved sales targets and helped customers in the store.",
    strong:
      "Ranked first of 14 consultants at a Mall of the Emirates electronics store, averaging AED 620K monthly sales at 112% of target through bilingual (English/Arabic) upselling.",
    why: "Rank against peers, a named venue, AED volume, % of target — and bilingual selling, a genuine UAE differentiator.",
  },
];

const faqs = [
  {
    q: "What makes a CV bullet strong for UAE employers?",
    a: "Four things: it opens with an action verb, it quantifies the outcome (AED figures, percentages, volumes), it shows the scale you operated at (team size, portfolio value, patient volume), and it anchors UAE context — an emirate, a regulator like DOH or a client context like DIFC or ADNOC — where that's genuinely true of your experience.",
  },
  {
    q: "Should I put AED figures on my CV?",
    a: "Yes, where you can back them up. UAE recruiters read AED figures fluently, and a revenue, portfolio or savings number is the fastest way to show weight. Convert home-market currencies to AED for UAE applications, and round honestly — 'AED 2.3M' reads better than a suspiciously exact number.",
  },
  {
    q: "What if I don't have exact numbers for my achievements?",
    a: "Use honest approximations and ranges you could defend in an interview — '60+ patients per shift', 'a team of around 12', 'roughly 20% faster'. Never invent a figure: a fabricated metric collapses in the first competency question. If a result genuinely can't be quantified, show scale or frequency instead.",
  },
  {
    q: "Are these examples from real CVs?",
    a: "No — every example on this page is illustrative, written to demonstrate the pattern. They are not taken from client CVs or real people. Copy the structure, then replace every fact with your own true numbers and context.",
  },
];

const faqSchema = faqPageSchema([{ q: aiAnswer.q, a: aiAnswer.a }, ...faqs]);

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to rewrite a weak CV bullet for UAE jobs",
  description:
    "Turn a vague duty statement into a quantified, UAE-anchored achievement bullet recruiters and ATS reward.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open with an action verb",
      text: "Replace 'responsible for' and 'involved in' with what you actually did: managed, rebuilt, triaged, planned, directed.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Show your scale",
      text: "Add the size of what you handled — team headcount, portfolio value, patient volume, monthly sessions.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Quantify the outcome",
      text: "State the result in AED, percentages or time saved — using only numbers you can defend in an interview.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Anchor honest UAE context",
      text: "Name the emirate, regulator or client context (DIFC, DOH, ADNOC) where it's genuinely part of your experience.",
    },
  ],
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", item: canonicalUrl("/") },
  { name: "UAE CV Examples", item: canonicalUrl("/cv-examples-uae") },
]);

export default function CvExamplesUaePage() {
  return (
    <>
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumb} />

      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-300">
            <ScanSearch size={13} /> Six sectors · Free to copy
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold text-white md:text-5xl">
            UAE CV Examples:
            <br />
            <span className="text-brand-blue">Weak vs Strong, by Sector</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            The same bullet, before and after — with the AED figures, scale and
            UAE context that make recruiters stop scrolling.
          </p>
        </div>
      </section>

      {/* Branded quick answer (schema folded into faqSchema) */}
      <AiAnswer
        question={aiAnswer.q}
        lead={aiAnswer.lead}
        answer={aiAnswer.a}
        emitSchema={false}
        className="bg-paper py-12 md:py-14"
      />

      {/* Sector examples — SSR, crawlable */}
      <section className="bg-paper pb-16 md:pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            All examples are illustrative, written to demonstrate the pattern —
            they are not client CVs or real people. Copy the structure; replace
            every fact with your own.
          </p>

          <div className="mt-10 space-y-10">
            {sectors.map((s) => (
              <article key={s.name}>
                <h2 className="font-display text-2xl font-bold tracking-[-0.015em] text-slate-900">
                  {s.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Example role: {s.role}
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border-2 border-red-100 bg-red-50/60 p-6">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-red-600">
                      <X size={14} strokeWidth={2.5} /> Weak — a duty, not an
                      achievement
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
                      &ldquo;{s.weak}&rdquo;
                    </p>
                  </div>
                  <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/60 p-6">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                      <Check size={14} strokeWidth={2.5} /> Strong — quantified
                      &amp; UAE-anchored
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-800">
                      &ldquo;{s.strong}&rdquo;
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  <strong className="text-slate-800">Why it works:</strong>{" "}
                  {s.why}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — SSR */}
      <section className="bg-paper-2 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="font-display font-bold text-slate-900 tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.2 }}
          >
            Writing UAE CV bullets — questions, answered
          </h2>
          <dl className="mt-8 space-y-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-line bg-white p-6"
              >
                <dt className="font-display text-base font-bold text-slate-900">
                  {item.q}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-slate-600">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-paper py-14 md:py-16">
        <div className="mx-auto grid max-w-3xl gap-4 px-6 sm:grid-cols-2">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-6 transition hover:border-brand-blue/40"
            data-event="cv_examples_cross_link_click"
            data-cta-location="builder"
          >
            <FileCheck2 className="mt-0.5 shrink-0 text-brand-blue" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-slate-900">
                Put these into a CV{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Free UAE CV builder with an AI bullet rewriter designed not to
                invent facts — you review every suggestion.
              </span>
            </span>
          </a>
          <Link
            href="/resume-checker"
            className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-6 transition hover:border-brand-blue/40"
          >
            <ScanSearch className="mt-0.5 shrink-0 text-brand-blue" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-slate-900">
                Check your rewritten CV{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Free ATS checker — 60+ UAE-tuned checks in ~30 seconds.
              </span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
