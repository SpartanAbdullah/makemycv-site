import Link from "next/link";
import { Calculator, FileCheck2, ArrowRight, Banknote, Timer } from "lucide-react";
import { buildPageMetadata, canonicalUrl, APP_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { ReadNext } from "@/components/seo/ReadNext";
import { faqPageSchema } from "@/lib/seo-schema";
import { LeaveCalculator } from "@/components/tools/LeaveCalculator";
import {
  TrustBadge,
  WageBasisExplainer,
  SettlementFooter,
  NextRoleCta,
} from "@/components/tools/CalculatorShared";

/* Rewritten 2026-08-10 (Search Console audit). "Free" to the front; title cut
   from 48 to 41 chars so the rendered version clears 60 with the
   " | MakeMyCV.ae" suffix. "Leave Salary" compressed to "Salary" — the leave-
   salary intent is carried by the description and the H2s. Law citation stays
   in the body, quick answer and FAQPage schema.
   2026-11-28: description names leave salary and both pay bases. Search Console
   (30 Oct-26 Nov) showed ~2,000 impressions a month on leave-salary searches at
   positions 5-10 for 15 clicks; the page answered them only for unused days. */
export const metadata = buildPageMetadata({
  title: "UAE Annual Leave Calculator",
  description:
    "Free UAE annual leave and leave salary calculator. Leave you take is paid at full wage; unused days at end of service at basic salary ÷ 30.",
  path: "/annual-leave-calculator",
  image: "/og/annual-leave-calculator.png",
});

// Branded quick answer (B0 pattern), folded into the page FAQPage below.
const aiAnswer = {
  q: "How is annual leave calculated in the UAE?",
  lead: "MakeMyCV's free UAE annual leave calculator covers both entitlement and leave salary under the UAE Labour Law (Federal Decree-Law No. 33 of 2021).",
  a: "MakeMyCV's free UAE annual leave calculator covers both entitlement and leave salary under the UAE Labour Law (Federal Decree-Law No. 33 of 2021). Full-time private-sector employees earn 30 calendar days of paid leave per completed year, or 2 days per month once they pass six months of service. Leave you take is paid at your full wage; unused days at end of service are paid at basic salary ÷ 30 per day. Free, no sign-up.",
};

const faqs = [
  {
    q: "How many days of annual leave do I get in the UAE?",
    a: "A full-time private-sector employee earns 30 calendar days of paid annual leave for each completed year of service. Between six months and one year of service, the entitlement is 2 days for every month worked. Under six months, statutory annual leave hasn't started yet for full-time staff.",
  },
  {
    q: "Is leave salary based on basic or full salary?",
    a: "It depends on the situation. Days you take as annual leave are paid at your full wage: basic salary plus the allowances in your contract (Federal Decree-Law No. 33 of 2021, Articles 1 and 29). Unused days paid out when your service ends are calculated on your basic salary only, (basic ÷ 30) × unused days (Cabinet Resolution No. 1 of 2022, Article 19). Your contract can be more generous.",
  },
  {
    q: "What happens to my unused leave days when I leave the job?",
    a: "You are paid for them. At end of service the employer must pay a cash allowance for all accrued but untaken leave days, including fractions of the final year, at your basic daily rate (basic monthly salary divided by 30). This is separate from, and on top of, your gratuity.",
  },
  {
    q: "Can I carry leave forward or encash it while still employed?",
    a: "Within limits. With your employer's approval you can carry forward up to half of a year's annual leave into the next year, or agree with your employer to be paid for it instead, at the wage you earn when the leave falls due (Cabinet Resolution No. 1 of 2022, Article 19). The default is that leave is taken in the year it is earned, and your employer cannot stop you taking leave you are owed for more than two years unless you choose to carry it forward or be paid for it (Article 29).",
  },
  {
    q: "Does my service before six months count for anything?",
    a: "Yes. Those months count toward reaching the six-month threshold and your first anniversary — the 2-days-per-month entitlement applies once you complete six months, and the full 30-day entitlement from one year. Whether you can take leave earlier is up to your employer's policy.",
  },
  {
    q: "Can my employer decide when I take annual leave?",
    a: "The employer can set the dates of your annual leave according to work requirements, in agreement with you, and must tell you the dates at least one month in advance (Article 29). What they cannot do is take away leave you have legally accrued — untaken days must either be carried forward within the legal limits or paid out.",
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

// Illustrative worked examples (not real user data). Numbers verified against
// the pure logic in components/tools/leave.ts.
const examples = [
  {
    label: "Unused leave paid out — 15 days, AED 9,000 basic",
    steps: "Daily rate = 9,000 ÷ 30 = AED 300. 15 × 300.",
    result: "AED 4,500",
  },
  {
    label: "Unused leave paid out — 30 days, AED 12,000 basic",
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

/* Leave salary: the three situations and the pay basis of each (added 2026-11-28).
   Sources read that day on uaelegislation.gov.ae (law consolidated to 29 Jul 2024):
   - Decree-Law 33/2021 Art. 29(1) leave "with full pay"; Art. 29(6) "the wage for the
     period of his annual leave"; Art. 1 "Wage" = basic wage plus the cash allowances
     and benefits in kind in the contract; Art. 67 a month is 30 days.
   - Cabinet Resolution 1/2022 Art. 19(1): carry forward up to half, or agree a cash
     equivalent "according to his wage" at the time the leave is due (Arabic: أجره, not
     الأجر الأساسي); Art. 19(2): balance at end of service "according to the basic wage".
   The law sets no separate payment date for leave you take, so none is stated. */
const leaveSalaryCases = [
  {
    title: "You take your annual leave",
    paidOn: "Full wage: basic salary plus the allowances in your contract",
    formula: "(full monthly wage ÷ 30) × leave days",
    basis:
      "Article 29 of Federal Decree-Law No. 33 of 2021 gives annual leave with full pay, and Article 1 defines the wage as the basic wage plus the cash allowances and benefits in your contract.",
  },
  {
    title: "Your service ends with unused days",
    paidOn: "Basic salary only",
    formula: "(basic monthly salary ÷ 30) × unused days",
    basis:
      "Cabinet Resolution No. 1 of 2022, Article 19, says the leave balance at the end of service is paid according to the basic wage. This is what the calculator above works out.",
  },
  {
    title: "You agree to cash in leave while still employed",
    paidOn: "Your wage at the time the leave falls due",
    formula: "(monthly wage ÷ 30) × days cashed in",
    basis:
      "The same Article 19 lets you carry forward up to half a year's leave, or agree with your employer to be paid for it instead, according to your wage when the leave falls due. Here the regulation says wage, not basic wage. It needs your employer's agreement.",
  },
];

// One illustrative employee across the three cases (not real user data).
const leaveSalaryExample = {
  setup:
    "Basic salary AED 9,000, housing allowance AED 3,000, transport allowance AED 1,500: full wage AED 13,500 a month.",
  lines: [
    {
      label: "Takes 10 days of annual leave",
      steps: "13,500 ÷ 30 = AED 450 a day. 10 × 450.",
      result: "AED 4,500",
    },
    {
      label: "Leaves the job with 12 unused days",
      steps: "9,000 ÷ 30 = AED 300 a day. 12 × 300.",
      result: "AED 3,600",
    },
    {
      label: "Agrees to cash in 10 days while still employed",
      steps: "Paid at the wage when the leave falls due: 10 × 450.",
      result: "AED 4,500",
    },
  ],
};

export default function AnnualLeaveCalculatorPage() {
  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero — warm-paper skin (Part 3 reskin) */}
      <section className="relative overflow-hidden bg-paper pb-8 pt-12 md:pb-10 md:pt-14">
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


      {/* Calculator islands */}
      <section className="bg-paper pb-8">
        <div className="mx-auto max-w-5xl px-6">
          <TrustBadge />
          <LeaveCalculator />
          <NextRoleCta tool="leave" />
        </div>
      </section>

      {/* Quick answer sits under the tool since 2026-11-21: the first input used to be
          a full screen down (1,018px on a 735px viewport). */}
      <AiAnswer
        question={aiAnswer.q}
        lead={aiAnswer.lead}
        answer={aiAnswer.a}
        emitSchema={false}
        className="bg-paper py-10 md:py-12"
      />

      <WageBasisExplainer />

      {/* Leave salary — SSR, crawlable (2026-11-28). Answers the leave-salary searches
          the page ranked 5-10 for; the three pay bases are in leaveSalaryCases. */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display font-bold text-ink text-[36px] md:text-[48px] leading-[1.05] tracking-tight-2">
            How is leave salary calculated in the UAE?
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-2 md:text-lg">
            <p>
              Leave salary in the UAE is not one rate: it depends on whether
              you take the leave, leave the job with days unused, or cash leave
              in while still employed. Days you take are paid at your{" "}
              <strong>full wage</strong>: basic salary plus the allowances in
              your contract. Unused days paid out when your service ends are
              paid at your <strong>basic salary</strong> only. All three use a
              30-day month, so the daily rate is the monthly figure divided by
              30 (Article 67 of the UAE Labour Law).
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {leaveSalaryCases.map((c) => (
              <div key={c.title} className="rounded-2xl bg-paper-2 p-5 shadow-float">
                <h3 className="font-display text-lg font-bold text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                  <strong className="text-ink">Paid on:</strong> {c.paidOn}
                </p>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-2">
                  <strong className="text-ink">Formula:</strong>{" "}
                  <span className="font-semibold text-accent">{c.formula}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {c.basis}
                </p>
              </div>
            ))}
          </div>

          <h3 className="mt-12 font-display text-[24px] font-semibold leading-[1.25] text-ink md:text-[30px]">
            Worked example: the same employee, three situations
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-2">
            {leaveSalaryExample.setup}
          </p>
          <div className="mt-5 space-y-4">
            {leaveSalaryExample.lines.map((line) => (
              <div key={line.label} className="rounded-2xl bg-paper-2 p-5 shadow-float">
                <p className="font-semibold text-ink">{line.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {line.steps}
                </p>
                <p className="mt-2 font-display text-lg font-bold text-accent">
                  = {line.result}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 text-sm leading-relaxed text-muted">
            <p>
              Taking leave should not reduce your monthly pay: the 10 days
              above are paid at AED 450 a day, not at the AED 300 basic rate.
              The law does not set a separate date for paying leave salary, so
              check your contract or company policy for when it is paid.
            </p>
            <p>
              Contracts can be more generous than the law, and some free zones
              have their own employment rules. Confirm your exact figures with
              MOHRE or your employer.
            </p>
          </div>
        </div>
      </section>

      <SettlementFooter currentPath="/annual-leave-calculator" />

      {/* How it works — SSR, crawlable */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="font-display font-bold text-ink text-[36px] md:text-[48px] leading-[1.05] tracking-tight-2"
          >
            How UAE annual leave is calculated
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
              During employment, with your employer&rsquo;s approval, up to{" "}
              <strong>half</strong> of a year&rsquo;s leave can be carried
              forward, or you can agree with your employer to be paid for it
              instead. Subtract the days you have
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
            Legal basis last verified 28 November 2026 against Federal
            Decree-Law 33/2021, Articles 1, 29 and 67, and Cabinet Resolution
            1/2022, Article 19, on the UAE Legislation portal (the law as last
            updated there on 29 July 2024).
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
            data-event="cta_click"
            data-cta-id="leave_related_build_cv"
            data-cta-location="related_tools"
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
                40+ UAE-tuned checks, free.
              </span>
            </span>
          </Link>
        </div>
      </section>
      {/* B5 — leave-payout readers are often weighing a move: market and
          career-change guides. */}
      <ReadNext
        className="bg-paper-2"
        title="Thinking about a move? Start here."
        slugs={[
          "why-cv-ignored-dubai",
          "uae-sectors-hiring-2026",
          "career-change-cv-uae",
        ]}
      />
    </>
  );
}
