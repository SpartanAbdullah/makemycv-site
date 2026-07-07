import Link from "next/link";
import { Calculator, FileCheck2, ArrowRight } from "lucide-react";
import { buildPageMetadata, canonicalUrl, APP_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo-schema";
import { GratuityCalculator } from "@/components/tools/GratuityCalculator";
import {
  TrustBadge,
  WageBasisExplainer,
  SettlementFooter,
} from "@/components/tools/CalculatorShared";

export const metadata = buildPageMetadata({
  title: "UAE Gratuity Calculator — Free End-of-Service Estimate",
  description:
    "Free UAE end-of-service gratuity calculator. Estimate your benefit under the UAE Labour Law (Federal Decree-Law No. 33 of 2021) — 21 days' basic pay per year for the first 5 years, 30 after. No sign-up.",
  path: "/gratuity-calculator",
});

// Branded quick answer (Phase B0 pattern). Folded into the page FAQPage below
// so the page ships a single FAQPage entity whose first Q is this answer.
const aiAnswer = {
  q: "How is end-of-service gratuity calculated in the UAE?",
  lead: "MakeMyCV's free UAE gratuity calculator estimates your end-of-service benefit under the UAE Labour Law (Federal Decree-Law No. 33 of 2021).",
  a: "MakeMyCV's free UAE gratuity calculator estimates your end-of-service benefit under the UAE Labour Law (Federal Decree-Law No. 33 of 2021). For private-sector staff, gratuity is 21 days of basic salary for each of the first five years and 30 days for each year after, based on basic pay only, capped at two years' salary. Enter your basic salary and service length for an instant estimate — no sign-up.",
};

const faqs = [
  {
    q: "Is gratuity based on basic salary or total salary?",
    a: "Gratuity is calculated on your basic salary only. Allowances such as housing, transport, and other benefits are excluded, so the figure is usually lower than one based on your gross pay. Always use the basic pay stated in your contract.",
  },
  {
    q: "How many days of pay is UAE gratuity per year?",
    a: "For the standard private-sector case, you earn 21 days of basic salary for each of your first five years of service, and 30 days of basic salary for each year beyond five. Partial years are pro-rated.",
  },
  {
    q: "Do I still get gratuity if I resign?",
    a: "Yes. After completing one year of continuous service you are entitled to gratuity whether you resign or your employer ends the contract. Under the current UAE Labour Law (Federal Decree-Law No. 33 of 2021), resignation is calculated with the same 21/30-day formula — the old reductions for resigning were removed. Dismissal for gross misconduct under Article 44 can affect entitlement, so confirm your case with MOHRE.",
  },
  {
    q: "What if I worked less than one year?",
    a: "No gratuity is due below 12 months of continuous service. Once you pass one full year, you become entitled, and any additional months are counted pro-rata toward the 21-days-per-year calculation.",
  },
  {
    q: "Is there a maximum gratuity amount?",
    a: "Yes. Total end-of-service gratuity cannot exceed the equivalent of two years' basic salary, regardless of how long you have worked. Our calculator applies this cap automatically and shows you when it takes effect.",
  },
  {
    q: "Do DIFC and free-zone employees use the same rules?",
    a: "Not always. DIFC replaced traditional gratuity with the DEWS scheme, a funded workplace savings plan, and some other free zones (such as ADGM) have their own arrangements. If you work in a financial free zone, check whether DEWS or a similar scheme applies to you rather than the standard gratuity formula.",
  },
  {
    q: "Is this calculator free and is the figure official?",
    a: "The calculator is completely free with no sign-up. The result is an estimate to help you plan — it is not an official statement of entitlement. For your exact figure, confirm with MOHRE or your employer, as individual contracts and special cases can vary.",
  },
];

// One FAQPage: the branded quick answer first, then the visible FAQ below.
const faqSchema = faqPageSchema([{ q: aiAnswer.q, a: aiAnswer.a }, ...faqs]);

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to calculate your UAE end-of-service gratuity",
  description:
    "Estimate your UAE end-of-service gratuity under Federal Decree-Law No. 33 of 2021 using your basic salary and length of service.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find your basic monthly salary",
      text: "Use the basic pay stated in your contract, excluding housing, transport and other allowances.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Work out your daily wage",
      text: "Divide your basic monthly salary by 30 to get your daily wage.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Count 21 days for each of the first five years",
      text: "Multiply your daily wage by 21 for every year of service up to five years.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Add 30 days for each year beyond five",
      text: "For service longer than five years, add 30 days of basic pay for each additional year.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Apply the two-year cap",
      text: "Cap the total so it does not exceed two years' basic salary.",
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MakeMyCV UAE Gratuity Calculator",
  url: canonicalUrl("/gratuity-calculator"),
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
  description:
    "Free UAE end-of-service gratuity calculator based on the UAE Labour Law (Federal Decree-Law No. 33 of 2021). Estimates your benefit from your basic salary and years of service — no sign-up.",
  audience: {
    "@type": "Audience",
    audienceType: "Private-sector employees in the UAE",
  },
  featureList: [
    "Instant end-of-service gratuity estimate",
    "21-days / 30-days rule with the two-year cap",
    "Basic-salary basis (allowances excluded)",
    "Worked examples and UAE Labour Law explainer",
    "No sign-up",
  ],
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", item: canonicalUrl("/") },
  { name: "Gratuity Calculator", item: canonicalUrl("/gratuity-calculator") },
]);

// Illustrative worked examples (not real user data). Numbers verified against
// the pure computeGratuity logic in components/tools/gratuity.ts.
const examples = [
  {
    label: "Under 1 year — 8 months, AED 7,000 basic",
    steps: "Below 12 months of service, no gratuity is due.",
    result: "AED 0",
  },
  {
    label: "3 years, AED 6,000 basic",
    steps:
      "Daily wage = 6,000 ÷ 30 = AED 200. 21 days × 3 years = 63 days. 63 × 200.",
    result: "AED 12,600",
  },
  {
    label: "8 years, AED 8,000 basic",
    steps:
      "Daily wage = 8,000 ÷ 30 = AED 266.67. First 5 years: 21 × 5 = 105 days. Next 3 years: 30 × 3 = 90 days. 195 × 266.67.",
    result: "AED 52,000",
  },
];

export default function GratuityCalculatorPage() {
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
            UAE Gratuity Calculator
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Estimate your end-of-service benefit under the UAE Labour Law
            (Federal Decree-Law No. 33 of 2021) — free, instant, no sign-up.
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
          <TrustBadge />
          <GratuityCalculator />
        </div>
      </section>

      <WageBasisExplainer />
      <SettlementFooter currentPath="/gratuity-calculator" />

      {/* How it's calculated — SSR, crawlable */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="font-display font-bold text-slate-900 tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.2 }}
          >
            How UAE end-of-service gratuity is calculated
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700 md:text-lg">
            <p>
              For a full-time private-sector employee, UAE end-of-service
              gratuity is based on your <strong>basic salary</strong> — the
              figure in your contract, before housing, transport and other
              allowances. Your daily wage is that basic monthly salary{" "}
              <strong>divided by 30</strong>.
            </p>
            <p>
              You earn <strong>21 days</strong> of basic salary for each of your
              first five years of service, and <strong>30 days</strong> of basic
              salary for every year beyond five. You must complete at least{" "}
              <strong>one full year</strong> to be entitled to anything, and the
              total is capped at <strong>two years&rsquo; basic salary</strong>.
              Partial years are pro-rated.
            </p>
            <p>
              Under the current UAE Labour Law (Federal Decree-Law No. 33 of
              2021), gratuity is worked out the same way whether you resign or
              your employer ends the contract, once you have passed one year of
              service — the older reductions for resigning were removed.
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
            Figures are illustrative estimates for the standard case. Free-zone
            schemes (e.g. DIFC&rsquo;s DEWS), domestic workers and Article 44
            dismissals can differ — confirm your exact entitlement with MOHRE.
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
            UAE gratuity — questions, answered
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

      {/* Internal links — sibling calculators + builder + ATS hub cross-links */}
      <section className="bg-paper py-14 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/notice-period-calculator"
            className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-6 transition hover:border-brand-blue/40"
          >
            <Calculator className="mt-0.5 shrink-0 text-brand-blue" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-slate-900">
                Notice Period Calculator{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Leaving? Check your notice days and pay in lieu.
              </span>
            </span>
          </Link>
          <Link
            href="/annual-leave-calculator"
            className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-6 transition hover:border-brand-blue/40"
          >
            <Calculator className="mt-0.5 shrink-0 text-brand-blue" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-slate-900">
                Annual Leave Calculator{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Entitlement plus unused-leave payout.
              </span>
            </span>
          </Link>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-6 transition hover:border-brand-blue/40"
            data-event="gratuity_cross_link_click"
            data-cta-location="builder"
          >
            <FileCheck2 className="mt-0.5 shrink-0 text-brand-blue" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-slate-900">
                Build your ATS-ready CV{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Free UAE CV builder — visa-ready fields, no sign-up.
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
                Free ATS checker — 60+ UAE-tuned checks in ~30 seconds.
              </span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
