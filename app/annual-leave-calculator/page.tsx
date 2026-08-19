import Link from "next/link";
import { Calculator, FileCheck2, ArrowRight, Banknote, Timer } from "lucide-react";
import { buildPageMetadata, canonicalUrl, APP_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo-schema";
import { LeaveCalculator } from "@/components/tools/LeaveCalculator";
import {
  TrustBadge,
  WageBasisExplainer,
  SettlementFooter,
} from "@/components/tools/CalculatorShared";

/* Rewritten 2026-08-10 (Search Console audit). "Free" to the front; title cut
   from 48 to 41 chars so the rendered version clears 60 with the
   " | MakeMyCV.ae" suffix. "Leave Salary" compressed to "Salary" — the leave-
   salary intent is carried by the description and the H2s. Law citation stays
   in the body, quick answer and FAQPage schema. */
export const metadata = buildPageMetadata({
  title: "UAE Annual Leave Calculator",
  description:
    "Free UAE annual leave calculator. Check your entitlement — 30 days a year after one year — and what unused days are worth at end of service.",
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

// No aggregateRating by design — the Rich Results Test's "optional" warning is
// expected. Only real, user-sourced, on-page-visible ratings may ever go here;
// policy in lib/seo-schema.ts (webApplicationSchema docblock).
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

      {/* Hero — warm-paper skin (Part 3 reskin) */}
      <section className="relative overflow-hidden bg-paper py-16 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 55% at 76% 32%, rgba(14, 124, 74, 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            <Timer size={13} /> UAE Labour Law · Free
          </p>
          <h1 className="mt-5 text-balance font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.08] tracking-tight-2 text-ink">
            UAE <span className="text-accent">Annual Leave</span> Calculator
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
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
          <TrustBadge />
          <LeaveCalculator />
        </div>
      </section>

      <WageBasisExplainer />
      <SettlementFooter currentPath="/annual-leave-calculator" />

      {/* How it works — SSR, crawlable */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="font-display font-bold text-ink text-[36px] md:text-[48px] leading-[1.05] tracking-tight-2"
          >
            How UAE annual leave and leave salary are calculated
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-2 md:text-lg">
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
          <h3 className="mt-12 font-display text-[24px] font-semibold leading-[1.25] text-ink md:text-[30px]">
            Worked examples
          </h3>
          <div className="mt-5 space-y-4">
            {examples.map((ex) => (
              <div
                key={ex.label}
                className="rounded-2xl bg-paper-2 p-5 shadow-float"
              >
                <p className="font-semibold text-ink">{ex.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {ex.steps}
                </p>
                <p className="mt-2 font-display text-lg font-bold text-accent">
                  = {ex.result}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            Figures are illustrative estimates for the standard case. Contracts
            and free-zone rules can be more generous — confirm your exact
            figures with MOHRE.
          </p>
          <p className="mt-2 text-xs text-muted">
            Legal basis last verified 12 July 2026 against Federal Decree-Law
            33/2021, Article 29 and Cabinet Resolution 1/2022, Article 19
            (unchanged by the 2022 and 2023 amendments).
          </p>
        </div>
      </section>

      {/* FAQ — SSR, answers present in the DOM */}
      <section className="bg-paper-2 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="font-display font-bold text-ink text-[36px] md:text-[48px] leading-[1.05] tracking-tight-2"
          >
            UAE annual leave — questions, answered
          </h2>
          <dl className="mt-8 space-y-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl bg-sheet p-6 shadow-float"
              >
                <dt className="font-display text-base font-bold text-ink">
                  {item.q}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-muted">
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
            className="group flex items-start gap-3 rounded-2xl bg-paper-2 p-6 shadow-float transition-all duration-200 hover:-translate-y-0.5 hover:shadow-float-hover"
          >
            <Banknote className="mt-0.5 shrink-0 text-accent" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-ink">
                Gratuity Calculator{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-muted">
                Your end-of-service benefit.
              </span>
            </span>
          </Link>
          <Link
            href="/notice-period-calculator"
            className="group flex items-start gap-3 rounded-2xl bg-paper-2 p-6 shadow-float transition-all duration-200 hover:-translate-y-0.5 hover:shadow-float-hover"
          >
            <Timer className="mt-0.5 shrink-0 text-accent" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-ink">
                Notice Period Calculator{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-muted">
                Notice days and pay in lieu.
              </span>
            </span>
          </Link>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-2xl bg-paper-2 p-6 shadow-float transition-all duration-200 hover:-translate-y-0.5 hover:shadow-float-hover"
            data-event="leave_cross_link_click"
            data-cta-location="builder"
          >
            <FileCheck2 className="mt-0.5 shrink-0 text-accent" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-ink">
                Build your ATS-ready CV{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-muted">
                Free UAE CV builder — no sign-up.
              </span>
            </span>
          </a>
          <Link
            href="/resume-checker"
            className="group flex items-start gap-3 rounded-2xl bg-paper-2 p-6 shadow-float transition-all duration-200 hover:-translate-y-0.5 hover:shadow-float-hover"
          >
            <Calculator className="mt-0.5 shrink-0 text-accent" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-ink">
                Check your CV against UAE ATS{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-muted">
                60+ UAE-tuned checks, free.
              </span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
