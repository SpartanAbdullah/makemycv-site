import Link from "next/link";
import {
  Camera,
  CreditCard,
  FileDown,
  Lock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { buildPageMetadata, APP_URL } from "@/lib/seo";
import { faqPageSchema } from "@/lib/seo-schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { CareerToolLinks } from "@/components/seo/CareerToolLinks";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CvMakerHero } from "@/components/cv-maker-dubai/CvMakerHero";

// Phase B0 — branded "Quick Answer" for AI search. Targets the creation-intent
// query "how do I make a CV for a Dubai job?" that accounts for 340 lost Bing AI
// citations (12.37% share on ~388 pool). Folded into faqSchema below so the page
// ships one FAQPage entity.
const cvMakerAiAnswer = {
  q: "How do I make a CV for a Dubai job?",
  lead: "MakeMyCV is a free online CV maker built for Dubai and UAE jobs.",
  a: "MakeMyCV is a free online CV maker built for Dubai and UAE jobs. It formats your CV in the structure Dubai recruiters and ATS systems expect — visa status, nationality, notice period, optional photo — and exports a clean PDF in under five minutes. No sign-up, no paywall, no watermark. Your draft stays in your browser.",
};

// Visible FAQ items — sourced here so the schema and the rendered <CvMakerFAQ />
// component both draw from the same array (they cannot drift apart).
const faqItems = [
  {
    q: "Is MakeMyCV really free?",
    a: "Yes. You can build, edit, and download your CV as a PDF without paying, signing up, or removing a watermark. A Pro tier with advanced features is available but not required.",
  },
  {
    q: "What format should a CV for Dubai follow?",
    a: "Dubai recruiters expect a 1–2 page CV with personal details, professional summary, work experience, education, skills, and a UAE Essentials section covering visa status, nationality, and notice period. MakeMyCV follows this order automatically.",
  },
  {
    q: "Do I need a photo on my Dubai CV?",
    a: "It depends on the employer. Photo is common in the UAE but not mandatory. MakeMyCV lets you toggle it on or off per template — include it for hospitality or client-facing roles, leave it off for banking or tech.",
  },
  {
    q: "Will my CV pass ATS filters used in Dubai?",
    a: "Yes. Every MakeMyCV template uses a single-column, parser-safe layout tested against ATS systems used by major UAE employers including Emaar, ADNOC, and Chalhoub Group.",
  },
  {
    q: "Can I make a CV on my phone?",
    a: "Yes. MakeMyCV works in any mobile browser — no app download needed. The editor is responsive and the PDF export works the same way.",
  },
  {
    q: "How is this different from Canva or Google Docs CV templates?",
    a: "Canva and Google Docs templates are designed for US/UK formatting. They don’t include visa status, nationality, or the UAE section order. They also often break ATS parsing because of columns, text boxes, and graphics. MakeMyCV is built specifically for the Gulf hiring process.",
  },
] as const;

/* Child segment — the root layout's title.template appends " | MakeMyCV.ae".
   "Maker", not "Builder": Search Console data shows "maker" converts; "builder"
   does not. Leads with "Free" + "Dubai" (the AI-winning geo anchor — 11.5x more
   citation share than "UAE" per the Bing report). */
export const metadata = buildPageMetadata({
  title: "Free CV Maker for Dubai Jobs — ATS-Ready Templates",
  description:
    "Free online CV maker built for Dubai jobs. ATS-safe formatting, visa-status field, optional photo — download your PDF in five minutes. No sign-up, no paywall.",
  path: "/free-cv-maker-dubai",
  keywords: [
    "cv maker dubai",
    "free cv maker dubai",
    "make cv for dubai job",
    "build cv online dubai free",
    "dubai cv maker 2026",
    "cv builder uae free",
    "online cv maker uae",
    "free resume maker dubai",
    "ats cv maker dubai",
  ],
});

// FAQPage mirrors the visible Q/As on the page. The branded quick answer
// (rendered in <AiAnswer/>) is the first entity; the rest come from the
// visible <CvMakerFAQ />. Every Q/A here is present in the server HTML.
const faqSchema = faqPageSchema([
  { q: cvMakerAiAnswer.q, a: cvMakerAiAnswer.a },
  ...faqItems,
]);

/* ──────────────────────────────────────────────────────────────────── */
/* Page-specific section components                                     */
/* ──────────────────────────────────────────────────────────────────── */

function DubaiDifference() {
  return (
    <section className="bg-paper py-16 md:py-20">
      <Reveal className="mx-auto max-w-3xl px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          Dubai CV format
        </p>
        <h2 className="mt-4 font-display text-[36px] font-bold leading-[1.05] tracking-tight-2 text-ink md:text-[48px]">
          Why a Dubai CV isn&rsquo;t just a CV with a different header.
        </h2>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-ink-2 md:text-lg">
          <p>
            Most online CV makers are built for the US or UK market. They leave
            out the fields Dubai recruiters expect to see &mdash; and include
            sections that waste space in the Gulf.
          </p>
          <p>
            A Dubai CV needs: your visa status, nationality, notice period, and
            availability date. Photo is optional but common. Religion, marital
            status, and date of birth are still listed on many Gulf CVs but
            increasingly unnecessary for private-sector roles in Dubai.
          </p>
          <p>
            MakeMyCV includes a dedicated &ldquo;UAE Essentials&rdquo; step that
            adds these fields cleanly &mdash; no awkward workarounds, no manual
            table hacks. The rest of the CV follows the 10-section order UAE
            recruiters and ATS filters expect.
          </p>
        </div>

        <div className="mt-8">
          <Button
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            withArrow
            data-event="cv_maker_dubai_cta_click"
            data-cta-location="dubai-difference"
          >
            Build your Dubai CV now
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

const steps = [
  {
    number: "1",
    title: "Pick a template",
    body: "Choose from 10 templates designed for UAE hiring. Every layout is ATS-parseable and tested against the filters at ENOC, Emaar, and Majid Al Futtaim.",
  },
  {
    number: "2",
    title: "Fill in your details",
    body: "Follow the guided sections: contact info, professional summary, experience, education, skills, and the UAE Essentials step (visa status, nationality, notice period). AI rewrites your bullet points if you want — or skip it.",
  },
  {
    number: "3",
    title: "Download your CV",
    body: "Export a clean A4 PDF or DOCX. No watermark, no paywall, no account needed. Your draft saves in your browser so you can come back and edit.",
  },
] as const;

function MakerHowItWorks() {
  return (
    <section className="bg-paper-2 py-16 md:py-20">
      <Reveal className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            How it works
          </p>
          <h2 className="mt-4 font-display text-[36px] font-bold leading-[1.05] tracking-tight-2 text-ink md:text-[48px]">
            Three steps. Five minutes.{" "}
            <span className="text-accent">Done.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((s) => (
            <article key={s.number} className="text-center md:text-left">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {s.number}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                {s.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            withArrow
            data-event="cv_maker_dubai_cta_click"
            data-cta-location="how-it-works"
          >
            Start now &mdash; it&rsquo;s free
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

const features = [
  {
    icon: ShieldCheck,
    title: "ATS-safe formatting",
    body: "Single-column, parser-safe layouts that pass automated screening at UAE companies. We test against the same filters recruiters use.",
  },
  {
    icon: MapPin,
    title: "UAE Essentials step",
    body: "Visa status, nationality, driving licence, notice period — the fields Gulf recruiters check first, built into the flow.",
  },
  {
    icon: Camera,
    title: "Optional photo",
    body: "Toggle your photo on or off per application. Some Dubai employers expect it; others prefer without. You choose each time.",
  },
  {
    icon: Sparkles,
    title: "AI bullet rewriter",
    body: "Paste your job duties, get recruiter-optimised bullet points. Works in English — Arabic support coming.",
  },
  {
    icon: FileDown,
    title: "Free PDF & DOCX export",
    body: "Download a clean A4 document. No watermark on the free tier. No account required.",
  },
  {
    icon: Lock,
    title: "Browser-local privacy",
    body: "Your CV draft stays in your browser, not on a server. No sign-up means no data collection.",
  },
] as const;

function MakerFeatures() {
  return (
    <section className="bg-paper py-16 md:py-20">
      <Reveal className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            Features
          </p>
          <h2 className="mt-4 font-display text-[36px] font-bold leading-[1.05] tracking-tight-2 text-ink md:text-[48px]">
            Built for how Dubai hiring actually works.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl bg-paper-2 p-6 shadow-float"
            >
              <f.icon className="text-accent" size={22} aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function CvMakerFAQ() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <Reveal className="mx-auto max-w-3xl px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          Frequently asked
        </p>
        <h2 className="mt-4 font-display text-[36px] font-bold leading-[1.05] text-ink tracking-[-0.02em] md:text-[48px]">
          Questions people ask before they build.
        </h2>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="group py-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <span className="font-display text-lg font-semibold text-ink md:text-xl">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-150 group-open:rotate-45 group-open:border-accent group-open:text-accent"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1v10M1 6h10"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 pr-12 text-[15px] leading-relaxed text-ink-2 md:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function CvMakerFinalCTA() {
  return (
    <section className="bg-accent-deep text-white">
      <Reveal className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <h2
          className="font-display text-[36px] font-bold leading-[1.05] tracking-tight-2 md:text-[48px]"
          style={{ textWrap: "balance" }}
        >
          Your next Dubai job starts with a CV that gets opened.
        </h2>
        <p className="mt-5 text-lg text-white/75">
          Most CVs submitted in Dubai never reach a human. ATS filters, wrong
          formatting, missing fields &mdash; the reasons are fixable. MakeMyCV
          handles them for you.
        </p>

        <div className="mt-10">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-accent-deep shadow-md transition-all duration-200 hover:-translate-y-px hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent-deep"
            data-event="cv_maker_dubai_final_cta_click"
          >
            Build My Dubai CV &mdash; Free
            <span aria-hidden="true" className="ml-2">
              &rarr;
            </span>
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/75">
          <span className="inline-flex items-center gap-1.5">
            <Lock size={14} className="text-gold-light" />
            No sign-up
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap size={14} className="text-gold-light" />
            PDF in 5 minutes
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CreditCard size={14} className="text-gold-light" />
            No watermark
          </span>
        </div>
      </Reveal>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Page                                                                 */
/* ──────────────────────────────────────────────────────────────────── */

// Organization + WebSite + WebApplication are all emitted site-wide from
// app/layout.tsx. This page deliberately adds no entity nodes — re-emitting
// the builder here would duplicate @id #webapp.
export default function CvMakerDubaiPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <CvMakerHero />
      <AiAnswer
        question={cvMakerAiAnswer.q}
        lead={cvMakerAiAnswer.lead}
        answer={cvMakerAiAnswer.a}
        emitSchema={false}
      />
      <DubaiDifference />
      <MakerHowItWorks />
      <MakerFeatures />
      <CareerToolLinks currentPath="/free-cv-maker-dubai" />
      <CvMakerFAQ />
      <CvMakerFinalCTA />
    </>
  );
}
