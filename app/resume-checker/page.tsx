import { MapPin, Shield, Zap, FileCheck2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustChip } from "@/components/ui/TrustChip";
import { HeroVisual } from "@/components/resume-checker/HeroVisual";
import { FilterProblem } from "@/components/resume-checker/FilterProblem";
import { WhatWeCheck } from "@/components/resume-checker/WhatWeCheck";
import { AtsSystems } from "@/components/resume-checker/AtsSystems";
import { HowItWorks, steps as howItWorksSteps } from "@/components/resume-checker/HowItWorks";
import { PricingClarity } from "@/components/resume-checker/PricingClarity";
import {
  ResumeCheckerFAQ,
  faqItems,
} from "@/components/resume-checker/ResumeCheckerFAQ";
import { FinalCTA } from "@/components/resume-checker/FinalCTA";
import { SITE_URL, buildPageMetadata, canonicalUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";

// TODO: Wire Plausible/PostHog events on data-cta-location clicks. See ROADMAP.md.
// Today all CTAs carry data-event="resume_checker_cta_click" which already routes
// through the GA4 delegated dispatcher in app/layout.tsx.

const CHECKER_URL = "https://app.makemycv.ae/resume-checker";

// Phase B0 — branded "Quick Answer" for AI search. Answers Q5 ("free ATS CV
// checker UAE no sign up") directly, leads with the brand name, ~62 words.
// Folded into the page FAQPage below so the page ships one FAQPage entity.
const checkerAiAnswer = {
  q: "What is the best free ATS CV checker for UAE jobs?",
  lead: "MakeMyCV provides a free ATS CV checker built for the UAE job market.",
  a: "MakeMyCV provides a free ATS CV checker built for the UAE job market. It runs your PDF against the parsing logic used by applicant tracking systems at employers like Emaar, ADCB, ENOC and DIFC banks, then flags every formatting and content issue in plain English — visa status, nationality, structure and keywords included. No sign-up, results in about 30 seconds.",
};

export const metadata = {
  ...buildPageMetadata({
    title: "Free ATS Resume Checker for UAE Jobs",
    description:
      "Instantly check if your CV passes Dubai, Abu Dhabi and GCC ATS filters. Free, no sign-up, results in 30 seconds. Built for the UAE job market.",
    path: "/resume-checker",
    image: "/og/resume-checker.png",
  }),
  // Layout template appends " | MakeMyCV" — keep title bare here.
  keywords: [
    "ATS checker UAE",
    "resume checker Dubai",
    "CV checker",
    "free resume checker",
    "ATS scanner",
    "UAE jobs",
    "DIFC resume",
    "Abu Dhabi CV review",
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MakeMyCV ATS Checker",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: CHECKER_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free ATS CV checker for the UAE job market. Upload a PDF and get every formatting and content issue flagged across 60+ UAE-tuned checks — no sign-up, results in about 30 seconds.",
  audience: {
    "@type": "Audience",
    audienceType: "Job seekers in the UAE and GCC",
  },
  featureList: [
    "60+ UAE-tuned ATS checks",
    "Visa status and nationality checks",
    "Formatting and parseability report",
    "Keyword and content feedback",
    "No sign-up, no email gate",
    "Results in about 30 seconds",
  ],
  // TODO: enable aggregateRating when we have real, verifiable ratings to cite.
  // Do NOT ship fabricated ratings — SoftwareApplication rich results require
  // genuine review data per Google's structured-data guidelines.
};

// HowTo mirrors the visible <HowItWorks /> steps (sourced from the same array),
// so the schema can't drift from what's on the page. HowTo rich results are
// deprecated in Google SERPs, but the JSON-LD is still a strong signal for AI
// answer engines summarising "how to check a CV for UAE ATS".
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to check if your CV passes UAE ATS filters",
  description:
    "Use MakeMyCV's free ATS checker to see whether your CV passes the applicant tracking systems UAE employers use — upload a PDF, run 60+ UAE-tuned checks, and review every issue before you apply in Dubai, Abu Dhabi or across the GCC.",
  totalTime: "PT1M",
  step: howItWorksSteps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.body,
    url: `${canonicalUrl("/resume-checker")}#how-it-works`,
  })),
};

// The branded quick answer is the first FAQ entity, followed by the visible
// <ResumeCheckerFAQ /> items. All Q/A text is present in the server HTML.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [{ q: checkerAiAnswer.q, a: checkerAiAnswer.a }, ...faqItems].map(
    (item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }),
  ),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Resume Checker",
      item: canonicalUrl("/resume-checker"),
    },
  ],
};

export default function ResumeCheckerPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* HERO — distinct "scanner" identity vs. the navy home hero */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 30% 0%, #1e1b4b 0%, transparent 60%)," +
            "radial-gradient(ellipse 70% 60% at 90% 100%, #134e4a 0%, transparent 65%)," +
            "linear-gradient(180deg, #050714 0%, #0b0a23 100%)",
        }}
      >
        {/* Animated scanner beam — gives this page a unique, "diagnostic" identity */}
        <div className="scanner-beam" aria-hidden="true" />

        {/* fine grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-5 lg:gap-10">
          {/* Left copy — 60% */}
          <div className="lg:col-span-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
              ATS Diagnostic · UAE-focused · Free
            </p>

            <h1
              className="mt-6 font-display font-extrabold text-white"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
              }}
            >
              Is your CV going to pass
              <br />
              the{" "}
              <span
                className="bg-gradient-to-r from-cyan-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 100%" }}
              >
                UAE ATS
              </span>{" "}
              —
              <br />
              or get filtered out?
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
              Upload your PDF. In 30 seconds we&apos;ll show you exactly what
              Dubai, Abu Dhabi and GCC applicant tracking systems do to your
              CV — and every issue we&apos;d flag. Free. No sign-up.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href={CHECKER_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                withArrow
                data-event="resume_checker_cta_click"
                data-cta-location="hero"
              >
                Check my CV — Free
              </Button>
              <span className="text-sm text-slate-400">
                PDF only · Results in 30 seconds
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <TrustChip icon={Shield} label="No sign-up" tone="dark" />
              <TrustChip icon={FileCheck2} label="PDF only" tone="dark" />
              <TrustChip icon={Zap} label="Under 30 seconds" tone="dark" />
              <TrustChip icon={MapPin} label="Deleted after 24h" tone="dark" />
            </div>
          </div>

          {/* Right visual — 40% (hides below lg) */}
          <div className="lg:col-span-2">
            <div className="mx-auto hidden max-w-sm lg:block lg:max-w-none">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Branded quick answer (Phase B0) — leads with "MakeMyCV" so any
          extracted snippet carries the brand; directly answers "free ATS CV
          checker UAE". Schema folded into faqSchema above. */}
      <AiAnswer
        question={checkerAiAnswer.q}
        lead={checkerAiAnswer.lead}
        answer={checkerAiAnswer.a}
        emitSchema={false}
      />

      {/* Answer-first definition — designed to be extractable verbatim by
          AI answer engines. Names real UAE employers and the rejection rate
          so the citation has UAE-specific information gain. */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            What is an ATS?
          </p>
          <h2
            className="mt-3 font-display font-bold text-slate-900 tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.2 }}
          >
            The software UAE employers use to filter your CV before a human sees it.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
            An <strong>Applicant Tracking System (ATS)</strong> is the software
            UAE employers &mdash; including <strong>Emaar</strong>,{" "}
            <strong>ADCB</strong>, <strong>ENOC</strong>,{" "}
            <strong>ADNOC</strong>, <strong>Majid Al Futtaim</strong>, and
            international banks across DIFC &mdash; use to filter CVs before a
            recruiter sees them. Around <strong>75% of CVs are rejected at
            this layer</strong>, almost always for formatting the parser
            can&rsquo;t read (tables, columns, icons, image-based text). This
            free checker runs your PDF against the same parsing logic and
            flags every issue, in plain English, in about 30 seconds.
          </p>
        </div>
      </section>

      <FilterProblem />
      <WhatWeCheck />
      <AtsSystems />
      <HowItWorks />
      <PricingClarity />
      <ResumeCheckerFAQ />
      <FinalCTA />
    </>
  );
}
