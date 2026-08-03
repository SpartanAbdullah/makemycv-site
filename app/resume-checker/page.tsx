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
import { CareerToolLinks } from "@/components/seo/CareerToolLinks";

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
  a: "MakeMyCV provides a free ATS CV checker built for the UAE job market. It reads your PDF the way an applicant tracking system does — raw text extraction and section detection — then flags every formatting and content issue in plain English, including visa status, nationality, structure and keywords. No sign-up, results in about 30 seconds.",
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
  // AED for consistency with every other *Application node on the site
  // (was USD, a stray from the original template).
  offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
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
  // No aggregateRating by design — the Rich Results Test's "optional" warning
  // is expected. Only real, user-sourced, on-page-visible ratings may ever go
  // here; policy in lib/seo-schema.ts (webApplicationSchema docblock).
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

      {/* HERO — warm-paper skin (Part 3 reskin, 2026-08-03): same layout
          rhythm as the homepage hero (1400px container, green wash, one
          CTA), diagnostic identity carried by the pulse-dot eyebrow and the
          live score card instead of the old cyan scanner-beam-on-navy. */}
      <section className="relative overflow-hidden bg-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 55% at 76% 32%, rgba(14, 124, 74, 0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-12 md:gap-16 md:px-10 md:py-24 lg:grid-cols-5 lg:gap-10 lg:py-[104px] xl:px-14">
          {/* Left copy — 60% */}
          <div className="lg:col-span-3">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent md:text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              ATS Diagnostic · UAE-focused · Free
            </p>

            <h1 className="mt-6 max-w-[18ch] text-balance font-display text-[clamp(40px,4.6vw,60px)] font-bold leading-[1.04] tracking-tight-2 text-ink">
              Is your CV going to pass the{" "}
              <span className="text-accent">UAE ATS</span> — or get filtered
              out?
            </h1>

            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted md:text-xl">
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
              <span className="text-sm text-muted">
                PDF only · Results in 30 seconds
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <TrustChip icon={Shield} label="No sign-up" />
              <TrustChip icon={FileCheck2} label="PDF only" />
              <TrustChip icon={Zap} label="Under 30 seconds" />
              <TrustChip icon={MapPin} label="Deleted after 24h" />
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
      <CareerToolLinks currentPath="/resume-checker" />
      <FinalCTA />
    </>
  );
}
