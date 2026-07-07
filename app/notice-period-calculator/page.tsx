import Link from "next/link";
import { Calculator, FileCheck2, ArrowRight, Banknote } from "lucide-react";
import { buildPageMetadata, canonicalUrl, APP_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo-schema";
import { NoticePeriodCalculator } from "@/components/tools/NoticePeriodCalculator";

export const metadata = buildPageMetadata({
  title: "UAE Notice Period Calculator — Free, Under Labour Law",
  description:
    "Free UAE notice period calculator. Check the notice you must give or receive under the UAE Labour Law (Federal Decree-Law No. 33 of 2021) — 30–90 days after probation, 14 or 30 days during it — plus payment in lieu. No sign-up.",
  path: "/notice-period-calculator",
});

// Branded quick answer (B0 pattern), folded into the page FAQPage below.
const aiAnswer = {
  q: "How long is the notice period under UAE labour law?",
  lead: "MakeMyCV's free UAE notice period calculator shows the notice you must give or receive under the UAE Labour Law (Federal Decree-Law No. 33 of 2021).",
  a: "MakeMyCV's free UAE notice period calculator shows the notice you must give or receive under the UAE Labour Law (Federal Decree-Law No. 33 of 2021). After probation, notice is whatever your contract states within 30 to 90 days. During probation it is 14 days if the employer terminates, 30 days if you resign to join another UAE employer, and 14 days if you are leaving the UAE. No sign-up.",
};

const faqs = [
  {
    q: "What is the minimum and maximum notice period in the UAE?",
    a: "After probation, the notice period is whatever your employment contract states, but the law sets a floor of 30 days and a ceiling of 90 days. A contract clause shorter than 30 days or longer than 90 days is not enforceable beyond those limits.",
  },
  {
    q: "What is the notice period during probation?",
    a: "During probation, an employer terminating the contract must give at least 14 days' written notice. An employee resigning to join another employer inside the UAE must give 30 days' notice, and an employee resigning to leave the UAE must give at least 14 days' notice.",
  },
  {
    q: "Is notice pay based on basic salary or full salary?",
    a: "Payment in lieu of notice is based on your full wage — basic salary plus allowances — calculated at your last received rate, with the daily figure being the monthly wage divided by 30. This differs from end-of-service gratuity, which uses basic salary only.",
  },
  {
    q: "Can my employer end my contract without making me work the notice?",
    a: "Yes, if they pay in lieu: your employer can release you immediately and pay compensation equal to your full wage for the unserved notice days. The same applies in reverse — if you resign and don't serve your notice, you owe the employer the wage of the unserved part. Dismissal for gross misconduct under Article 44 is a separate, stricter route.",
  },
  {
    q: "Am I paid normally during the notice period?",
    a: "Yes. The employment contract stays fully in force during notice — you work as usual and your employer must pay your full wage and keep all contractual benefits until the last working day.",
  },
  {
    q: "Does the notice period apply if I resign, or only if I'm terminated?",
    a: "It applies both ways. Whether you resign or your employer terminates, the same contractual notice period (30–90 days after probation) must be respected by the party ending the contract, or compensated with payment in lieu.",
  },
  {
    q: "Is this calculator free and is the figure official?",
    a: "The calculator is completely free with no sign-up. The result is an estimate to help you plan — not an official ruling. Individual contracts, free-zone rules and special cases vary, so confirm your exact position with MOHRE or your employer.",
  },
];

const faqSchema = faqPageSchema([{ q: aiAnswer.q, a: aiAnswer.a }, ...faqs]);

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to work out your UAE notice period and payment in lieu",
  description:
    "Find the notice you must give or receive under Federal Decree-Law No. 33 of 2021 and the compensation due if the notice is not served.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Identify your situation",
      text: "After probation, your notice is the contract figure within 30–90 days. During probation: 14 days if the employer terminates, 30 days if you resign to join another UAE employer, 14 days if you are leaving the UAE.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Find your daily wage",
      text: "Divide your full monthly salary (basic plus allowances) by 30. Notice pay uses the full wage, unlike gratuity.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Count the unserved days",
      text: "Subtract the notice days actually worked from the required notice days.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Multiply for the payment in lieu",
      text: "Unserved days × daily wage = the compensation the party cutting the notice short owes the other.",
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MakeMyCV UAE Notice Period Calculator",
  url: canonicalUrl("/notice-period-calculator"),
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
  description:
    "Free UAE notice period calculator based on the UAE Labour Law (Federal Decree-Law No. 33 of 2021). Shows required notice days for your situation and the payment in lieu for unserved notice — no sign-up.",
  audience: {
    "@type": "Audience",
    audienceType: "Private-sector employees in the UAE",
  },
  featureList: [
    "Required notice days per situation (post-probation and probation cases)",
    "30–90 day statutory clamp on contract clauses",
    "Payment in lieu on the full wage (÷30 daily rate)",
    "UAE Labour Law explainer and worked examples",
    "No sign-up",
  ],
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", item: canonicalUrl("/") },
  {
    name: "Notice Period Calculator",
    item: canonicalUrl("/notice-period-calculator"),
  },
]);

// Illustrative worked examples (not real user data). Numbers verified against
// the pure computeNotice logic in components/tools/notice.ts.
const examples = [
  {
    label: "Resigning with a 30-day contract notice, AED 12,000 full salary, serving 0 days",
    steps:
      "Daily wage = 12,000 ÷ 30 = AED 400. Unserved days = 30. Compensation owed to the employer: 30 × 400.",
    result: "AED 12,000",
  },
  {
    label: "60-day contract notice, AED 9,000 full salary, employer releases you after 45 days",
    steps:
      "Daily wage = 9,000 ÷ 30 = AED 300. Unserved days = 60 − 45 = 15. Employer pays in lieu: 15 × 300.",
    result: "AED 4,500",
  },
  {
    label: "Probation, employer terminates — AED 6,000 full salary",
    steps:
      "Required notice is 14 days. If the employer releases you immediately instead: 14 × (6,000 ÷ 30) = 14 × 200.",
    result: "AED 2,800",
  },
];

export default function NoticePeriodCalculatorPage() {
  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumb} />

      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-300">
            <Calculator size={13} /> UAE Labour Law · Free
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold text-white md:text-5xl">
            UAE Notice Period Calculator
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Check the notice you must give or receive — and the payment in lieu
            if it isn&rsquo;t served — under Federal Decree-Law No. 33 of 2021.
            Free, instant, no sign-up.
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

      {/* Calculator island */}
      <section className="bg-paper pb-8">
        <div className="mx-auto max-w-3xl px-6">
          <NoticePeriodCalculator />
        </div>
      </section>

      {/* How it works — SSR, crawlable */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="font-display font-bold text-slate-900 tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.2 }}
          >
            How the UAE notice period works
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700 md:text-lg">
            <p>
              After probation, your notice period is whatever your employment
              contract says, within the statutory range of{" "}
              <strong>30 to 90 days</strong> (Article 43). It applies equally
              whether you resign or your employer terminates, and the contract
              stays fully in force — normal work, full pay — until the last
              day.
            </p>
            <p>
              During probation (Article 9), the rules are fixed: an employer
              terminating must give <strong>14 days&rsquo;</strong> written
              notice; an employee resigning to join another employer inside the
              UAE must give <strong>30 days&rsquo;</strong>; an employee
              resigning to leave the UAE must give{" "}
              <strong>14 days&rsquo;</strong>.
            </p>
            <p>
              If the notice isn&rsquo;t served, the party cutting it short
              compensates the other with the wage of the unserved days —{" "}
              <strong>payment in lieu</strong>. It is calculated on your{" "}
              <strong>full wage</strong> (basic plus allowances) at your last
              received rate, with the daily figure being the monthly wage
              divided by 30. That&rsquo;s different from end-of-service
              gratuity, which uses basic salary only.
            </p>
          </div>

          {/* Worked examples */}
          <h3 className="mt-12 font-display text-xl font-bold text-slate-900">
            Worked examples
          </h3>
          <div className="mt-5 space-y-4">
            {examples.map((ex) => (
              <div
                key={ex.label}
                className="rounded-2xl border border-line bg-paper-2 p-5"
              >
                <p className="font-semibold text-slate-900">{ex.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {ex.steps}
                </p>
                <p className="mt-2 font-display text-lg font-bold text-brand-blue">
                  = {ex.result}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Figures are illustrative estimates for the standard case. Article 44
            gross-misconduct dismissals and some free-zone contracts differ —
            confirm your exact position with MOHRE.
          </p>
        </div>
      </section>

      {/* FAQ — SSR, answers present in the DOM */}
      <section className="bg-paper-2 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="font-display font-bold text-slate-900 tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.2 }}
          >
            UAE notice period — questions, answered
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

      {/* Internal links — gratuity + builder + ATS hub */}
      <section className="bg-paper py-14 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-4 px-6 sm:grid-cols-3">
          <Link
            href="/gratuity-calculator"
            className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-6 transition hover:border-brand-blue/40"
          >
            <Banknote className="mt-0.5 shrink-0 text-brand-blue" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-slate-900">
                Gratuity Calculator{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Estimate your end-of-service benefit next.
              </span>
            </span>
          </Link>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-6 transition hover:border-brand-blue/40"
            data-event="notice_cross_link_click"
            data-cta-location="builder"
          >
            <FileCheck2 className="mt-0.5 shrink-0 text-brand-blue" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-slate-900">
                Build your ATS-ready CV{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Moving jobs? Free UAE CV builder — no sign-up.
              </span>
            </span>
          </a>
          <Link
            href="/resume-checker"
            className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-6 transition hover:border-brand-blue/40"
          >
            <Calculator className="mt-0.5 shrink-0 text-brand-blue" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-slate-900">
                Check your CV against UAE ATS{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                60+ UAE-tuned checks in ~30 seconds.
              </span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
