import Link from "next/link";
import { Calculator, FileCheck2, ArrowRight, Banknote, Timer } from "lucide-react";
import { buildPageMetadata, canonicalUrl, APP_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo-schema";
import { LeaveCalculator } from "@/components/tools/LeaveCalculator";

export const metadata = buildPageMetadata({
  title: "UAE Annual Leave & Leave Salary Calculator — Free",
  description:
    "Free UAE annual leave calculator. Check your leave entitlement (30 days a year after one year; 2 days a month from 6 months) and what unused days are worth at end of service under the UAE Labour Law. No sign-up.",
  path: "/annual-leave-calculator",
});

// Branded quick answer (B0 pattern), folded into the page FAQPage below.
const aiAnswer = {
  q: "How is annual leave calculated in the UAE?",
  lead: "MakeMyCV's free UAE annual leave calculator covers both entitlement and leave salary under the UAE Labour Law (Federal Decree-Law No. 33 of 2021).",
  a: "MakeMyCV's free UAE annual leave calculator covers both entitlement and leave salary under the UAE Labour Law (Federal Decree-Law No. 33 of 2021). Full-time private-sector employees earn 30 calendar days of paid leave per completed year, or 2 days per month once they pass six months of service. Unused days at end of service are paid at basic salary ÷ 30 per day. Free, no sign-up.",
};

const faqs = [
  {
    q: "How many days of annual leave do I get in the UAE?",
    a: "A full-time private-sector employee earns 30 calendar days of paid annual leave for each completed year of service. Between six months and one year of service, the entitlement is 2 days for every month worked. Under six months, statutory annual leave hasn't started yet for full-time staff.",
  },
  {
    q: "Is leave salary based on basic or full salary?",
    a: "Both rules exist, for different situations. While you are actually on annual leave, you receive your normal full wage. But when unused leave is cashed out at the end of service, the allowance is calculated on your basic salary only — (basic ÷ 30) × unused days — unless your contract is more generous.",
  },
  {
    q: "What happens to my unused leave days when I leave the job?",
    a: "You are paid for them. At end of service the employer must pay a cash allowance for all accrued but untaken leave days, including fractions of the final year, at your basic daily rate (basic monthly salary divided by 30). This is separate from, and on top of, your gratuity.",
  },
  {
    q: "Can I carry leave forward or encash it while still employed?",
    a: "Partly. The law lets you carry forward up to half of your annual leave into the next year, and — by written agreement with your employer — receive a cash allowance for the carried-forward portion instead. The default position, though, is that leave should actually be taken.",
  },
  {
    q: "Does my service before six months count for anything?",
    a: "Yes. Those months count toward reaching the six-month threshold and your first anniversary — the 2-days-per-month entitlement applies once you complete six months, and the full 30-day entitlement from one year. Whether you can take leave earlier is up to your employer's policy.",
  },
  {
    q: "Can my employer decide when I take annual leave?",
    a: "The employer can schedule annual leave according to work requirements and in coordination with you, and many companies set notice rules for booking it. What they cannot do is take away leave you have legally accrued — untaken days must either be carried forward within the legal limits or paid out.",
  },
  {
    q: "Is this calculator free and is the figure official?",
    a: "The calculator is completely free with no sign-up. The result is an estimate to help you plan — not an official ruling. Contracts and free-zone rules can be more generous, so confirm your exact figures with MOHRE or your employer.",
  },
];

const faqSchema = faqPageSchema([{ q: aiAnswer.q, a: aiAnswer.a }, ...faqs]);

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to calculate your UAE leave salary (unused leave encashment)",
  description:
    "Work out what your unused annual leave days are worth at end of service under Federal Decree-Law No. 33 of 2021.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Count your unused leave days",
      text: "Add up the accrued annual leave days you have not taken, including the pro-rata fraction of your final year.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Find your basic daily rate",
      text: "Divide your basic monthly salary (excluding allowances) by 30.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Multiply days by the daily rate",
      text: "Unused days × basic daily rate = your leave salary, paid on top of gratuity at end of service.",
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MakeMyCV UAE Annual Leave Calculator",
  url: canonicalUrl("/annual-leave-calculator"),
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
  description:
    "Free UAE annual leave calculator based on the UAE Labour Law (Federal Decree-Law No. 33 of 2021): leave entitlement from length of service, plus the cash value of unused days at end of service — no sign-up.",
  audience: {
    "@type": "Audience",
    audienceType: "Private-sector employees in the UAE",
  },
  featureList: [
    "Annual leave entitlement estimate (30 days/year; 2 days/month from 6 months)",
    "Leave salary / encashment on the basic daily rate (÷30)",
    "Pro-rata handling for partial years",
    "UAE Labour Law explainer and worked examples",
    "No sign-up",
  ],
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", item: canonicalUrl("/") },
  {
    name: "Annual Leave Calculator",
    item: canonicalUrl("/annual-leave-calculator"),
  },
]);

// Illustrative worked examples (not real user data). Numbers verified against
// the pure logic in components/tools/leave.ts.
const examples = [
  {
    label: "Leave salary — 15 unused days, AED 9,000 basic",
    steps: "Daily rate = 9,000 ÷ 30 = AED 300. 15 × 300.",
    result: "AED 4,500",
  },
  {
    label: "Leave salary — 30 unused days, AED 12,000 basic",
    steps: "Daily rate = 12,000 ÷ 30 = AED 400. 30 × 400.",
    result: "AED 12,000",
  },
  {
    label: "Entitlement — 8 months of service",
    steps:
      "Between 6 and 12 months you accrue 2 days per month of service: 8 × 2 = 16 days. If you left with all of them unused on AED 6,000 basic: 16 × 200.",
    result: "16 days (worth AED 3,200)",
  },
];

export default function AnnualLeaveCalculatorPage() {
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
            <Timer size={13} /> UAE Labour Law · Free
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold text-white md:text-5xl">
            UAE Annual Leave Calculator
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Your leave entitlement — and what unused days are worth at end of
            service — under Federal Decree-Law No. 33 of 2021. Free, instant,
            no sign-up.
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

      {/* Calculator islands */}
      <section className="bg-paper pb-8">
        <div className="mx-auto max-w-5xl px-6">
          <LeaveCalculator />
        </div>
      </section>

      {/* How it works — SSR, crawlable */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="font-display font-bold text-slate-900 tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.2 }}
          >
            How UAE annual leave and leave salary are calculated
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700 md:text-lg">
            <p>
              A full-time private-sector employee earns{" "}
              <strong>30 calendar days</strong> of paid annual leave for each
              completed year of service. Between{" "}
              <strong>six months and one year</strong>, the entitlement is{" "}
              <strong>2 days per month</strong> of service. Fractions of the
              final year accrue pro-rata. While on leave, you receive your
              normal full wage.
            </p>
            <p>
              Unused leave doesn&rsquo;t vanish when you leave the job. At end
              of service, accrued but untaken days are paid out at your{" "}
              <strong>basic daily rate</strong> — basic monthly salary divided
              by 30 — including the fraction of your final year. This leave
              salary is paid <strong>on top of</strong> your end-of-service
              gratuity.
            </p>
            <p>
              During employment, up to <strong>half</strong> of a year&rsquo;s
              leave can be carried forward, and the carried-forward portion can
              be encashed by written agreement. Subtract the days you have
              already taken from any entitlement figure — the calculator
              estimates what you have accrued, not what remains.
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
            Figures are illustrative estimates for the standard case. Contracts
            and free-zone rules can be more generous — confirm your exact
            figures with MOHRE.
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
            UAE annual leave — questions, answered
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

      {/* Internal links — sibling calculators + builder + ATS hub */}
      <section className="bg-paper py-14 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
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
                Your end-of-service benefit.
              </span>
            </span>
          </Link>
          <Link
            href="/notice-period-calculator"
            className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-6 transition hover:border-brand-blue/40"
          >
            <Timer className="mt-0.5 shrink-0 text-brand-blue" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-slate-900">
                Notice Period Calculator{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Notice days and pay in lieu.
              </span>
            </span>
          </Link>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-6 transition hover:border-brand-blue/40"
            data-event="leave_cross_link_click"
            data-cta-location="builder"
          >
            <FileCheck2 className="mt-0.5 shrink-0 text-brand-blue" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-slate-900">
                Build your ATS-ready CV{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Free UAE CV builder — no sign-up.
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
                60+ UAE-tuned checks, free.
              </span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
