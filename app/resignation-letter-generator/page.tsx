import Link from "next/link";
import { FileSignature, Timer, Banknote, ArrowRight, FileCheck2 } from "lucide-react";
import { buildPageMetadata, canonicalUrl, APP_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo-schema";
import { ResignationLetterGenerator } from "@/components/tools/ResignationLetterGenerator";
import { TrustBadge } from "@/components/tools/CalculatorShared";

export const metadata = buildPageMetadata({
  title: "UAE Resignation Letter Generator — Free, Under Labour Law",
  description:
    "Generate a professional UAE resignation letter in under a minute — correct notice period under the UAE Labour Law (Federal Decree-Law No. 33 of 2021), last working day included. Free, in-browser, no sign-up.",
  path: "/resignation-letter-generator",
});

// Branded quick answer (B0 pattern), folded into the page FAQPage below.
const aiAnswer = {
  q: "How do I write a resignation letter in the UAE?",
  lead: "MakeMyCV.ae's free UAE resignation letter generator creates a professional, labour-law-compliant letter with the correct notice period in under a minute.",
  a: "MakeMyCV.ae's free UAE resignation letter generator creates a professional, labour-law-compliant letter with the correct notice period in under a minute. Under the UAE Labour Law (Federal Decree-Law No. 33 of 2021), resignation must be in writing, and the notice is whatever your contract states between 30 and 90 days — or, during probation, 30 days if you are joining another UAE employer and 14 days if you are leaving the country. Pick your situation, fill in your details, and copy or download the finished letter. Everything stays in your browser.",
};

const faqs = [
  {
    q: "Does a resignation letter have to be in writing in the UAE?",
    a: "Yes. Article 43 of Federal Decree-Law No. 33 of 2021 requires the party ending the contract to notify the other in writing. A conversation or WhatsApp message is not a safe substitute — hand in a dated letter or email and keep proof it was delivered.",
  },
  {
    q: "How much notice do I have to give when I resign?",
    a: "After probation, whatever your employment contract states within the statutory 30–90 day range. During probation it is fixed by law: 30 days if you are resigning to join another employer inside the UAE, and 14 days if you are resigning to leave the country.",
  },
  {
    q: "Can I resign by email?",
    a: "Generally yes — an email from your work or personal address to your manager and HR satisfies the written-notice requirement in most workplaces, and many companies also have an HR portal for it. Check your contract for any specific procedure, and keep a dated copy either way.",
  },
  {
    q: "Do I have to give a reason for resigning?",
    a: "No. UAE law does not require a reason, and a professional resignation letter is perfectly complete without one. If you choose to give a reason, keep it short and neutral — the letter goes in your employment file.",
  },
  {
    q: "What am I owed when I resign?",
    a: "Resigning does not forfeit your dues: with at least one year of service you are owed end-of-service gratuity on your basic wage, plus encashment of unused annual leave (no minimum service) and any unpaid salary. Everything must be settled within 14 days of your last working day under Article 53.",
  },
  {
    q: "Can my employer refuse my resignation?",
    a: "No — resignation is a unilateral right; it does not need the employer's approval. They can require you to serve the contractual notice (or agree payment in lieu), but they cannot reject the resignation itself or hold you beyond the notice period.",
  },
  {
    q: "Is this generator free, and where does my letter go?",
    a: "Completely free, no sign-up. The letter is assembled entirely in your browser — nothing you type is sent to a server or stored by us, which you can also verify in our privacy policy.",
  },
];

const faqSchema = faqPageSchema([{ q: aiAnswer.q, a: aiAnswer.a }, ...faqs]);

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to resign properly in the UAE",
  description:
    "Resign cleanly under Federal Decree-Law No. 33 of 2021: written notice, the correct notice period, and a settled exit.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Confirm your notice period",
      text: "After probation it is your contract figure within 30–90 days (Article 43). During probation: 30 days if joining another UAE employer, 14 days if leaving the country (Article 9).",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Write the letter",
      text: "State your position, that you are resigning, the notice you will serve with the legal basis, and your last working day. A reason is optional.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Deliver it in writing and keep proof",
      text: "Email it to your manager and HR or hand in a signed copy — dated, with a copy kept. Written notice is what Article 43 requires.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Serve the notice and plan your settlement",
      text: "Work normally through the notice period on full pay, hand over properly, and check what you are owed: gratuity, unused leave and final salary, all due within 14 days of your last day (Article 53).",
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MakeMyCV.ae UAE Resignation Letter Generator",
  url: canonicalUrl("/resignation-letter-generator"),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
  description:
    "Free UAE resignation letter generator based on the UAE Labour Law (Federal Decree-Law No. 33 of 2021). Correct notice period for your situation, last working day, professional wording — built in your browser, no sign-up.",
  audience: {
    "@type": "Audience",
    audienceType: "Private-sector employees in the UAE",
  },
  featureList: [
    "Correct notice period per situation (post-probation and probation cases)",
    "Last working day computed from your notice start date",
    "Optional handover, gratitude and settlement-confirmation paragraphs",
    "Copy or download the finished letter",
    "Runs entirely in the browser — nothing stored",
    "No sign-up",
  ],
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", item: canonicalUrl("/") },
  {
    name: "Resignation Letter Generator",
    item: canonicalUrl("/resignation-letter-generator"),
  },
]);

export default function ResignationLetterGeneratorPage() {
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
            <FileSignature size={13} /> UAE Labour Law · Free
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold text-white md:text-5xl">
            UAE Resignation Letter Generator
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            A professional resignation letter with the correct notice period
            under Federal Decree-Law No. 33 of 2021 — written in your browser,
            in under a minute. Free, no sign-up.
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

      {/* Generator island */}
      <section className="bg-paper pb-8">
        <div className="mx-auto max-w-3xl px-6">
          <TrustBadge />
          <ResignationLetterGenerator />
        </div>
      </section>

      {/* How to resign properly — SSR, crawlable */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="font-display font-bold text-slate-900 tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.2 }}
          >
            How to resign properly in the UAE
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700 md:text-lg">
            <p>
              UAE law requires resignation to be{" "}
              <strong>notified in writing</strong> (Article 43). The notice you
              owe is whatever your contract states within{" "}
              <strong>30 to 90 days</strong> — or, during probation,{" "}
              <strong>30 days</strong> if you are joining another UAE employer
              and <strong>14 days</strong> if you are leaving the country
              (Article 9). Your last working day is simply the notice start
              date plus those days, and the letter should state it.
            </p>
            <p>
              A clean resignation letter needs only four things: your position,
              a clear statement that you are resigning, the notice you will
              serve with its start date, and your last working day. A reason is
              optional — the law does not ask for one. Deliver it by email or
              signed letter and <strong>keep dated proof</strong>; disputes
              about when notice started are the most common resignation
              problem.
            </p>
            <p>
              Through the notice period the contract stays fully in force: you
              work normally and are paid normally. Resigning{" "}
              <strong>does not forfeit your end-of-service dues</strong> — with
              a year or more of service you are owed{" "}
              <Link
                href="/gratuity-calculator"
                className="font-semibold text-brand-blue hover:underline"
              >
                gratuity on your basic wage
              </Link>
              , plus{" "}
              <Link
                href="/annual-leave-calculator"
                className="font-semibold text-brand-blue hover:underline"
              >
                encashment of unused annual leave
              </Link>{" "}
              and any unpaid salary, all due within 14 days of your last
              working day (Article 53). If you plan to leave earlier than your
              notice allows, the{" "}
              <Link
                href="/notice-period-calculator"
                className="font-semibold text-brand-blue hover:underline"
              >
                notice period calculator
              </Link>{" "}
              shows what the unserved days would cost you.
            </p>
            <p>
              After your last day, your employer cancels your work permit; how
              long you can then stay in the UAE depends on your residency type
              and its grace period — confirm your own case with ICP/GDRFA
              before booking anything.
            </p>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Legal basis shared with our Notice Period Calculator — Federal
            Decree-Law 33/2021, Articles 9, 43 &amp; 53, last verified 12 July
            2026.
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
            Resigning in the UAE — questions, answered
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

      {/* Internal links — the resignation journey, in order */}
      <section className="bg-paper py-14 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
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
                Notice days and the cost of leaving early.
              </span>
            </span>
          </Link>
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
                What you&rsquo;re owed when you leave.
              </span>
            </span>
          </Link>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-6 transition hover:border-brand-blue/40"
            data-event="resignation_cross_link_click"
            data-cta-location="builder"
          >
            <FileCheck2 className="mt-0.5 shrink-0 text-brand-blue" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-slate-900">
                Build your ATS-ready CV{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Resigning for a better role? Start the CV now.
              </span>
            </span>
          </a>
          <Link
            href="/jd-match"
            className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-6 transition hover:border-brand-blue/40"
          >
            <FileSignature className="mt-0.5 shrink-0 text-brand-blue" size={22} />
            <span>
              <span className="flex items-center gap-1 font-display font-bold text-slate-900">
                JD Match{" "}
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-slate-600">
                Check your CV against the next job first.
              </span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
