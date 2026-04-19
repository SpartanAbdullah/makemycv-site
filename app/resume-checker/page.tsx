import { MapPin, Shield, Zap, FileCheck2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustChip } from "@/components/ui/TrustChip";
import { HeroVisual } from "@/components/resume-checker/HeroVisual";
import { FilterProblem } from "@/components/resume-checker/FilterProblem";
import { WhatWeCheck } from "@/components/resume-checker/WhatWeCheck";
import { HowItWorks } from "@/components/resume-checker/HowItWorks";
import { PricingClarity } from "@/components/resume-checker/PricingClarity";
import {
  ResumeCheckerFAQ,
  faqItems,
} from "@/components/resume-checker/ResumeCheckerFAQ";
import { FinalCTA } from "@/components/resume-checker/FinalCTA";
import { SITE_URL, buildPageMetadata, canonicalUrl } from "@/lib/seo";

// TODO: Wire Plausible/PostHog events on data-cta-location clicks. See ROADMAP.md.
// Today all CTAs carry data-event="resume_checker_cta_click" which already routes
// through the GA4 delegated dispatcher in app/layout.tsx.

const CHECKER_URL = "https://app.makemycv.ae/resume-checker";

export const metadata = {
  ...buildPageMetadata({
    title: "Free ATS Resume Checker for UAE Jobs",
    description:
      "Instantly check if your CV passes Dubai, Abu Dhabi and GCC ATS filters. Free, no sign-up, results in 30 seconds. Built for the UAE job market.",
    path: "/resume-checker",
    image: "/og/resume-checker.png",
  }),
  title: "Free ATS Resume Checker for UAE Jobs | MakeMyCV",
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
  // TODO: enable aggregateRating when we have real, verifiable ratings to cite.
  // Do NOT ship fabricated ratings — SoftwareApplication rich results require
  // genuine review data per Google's structured-data guidelines.
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* HERO — asymmetric 60/40 editorial layout */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)",
        }}
      >
        <div className="hero-spotlight" aria-hidden="true" />
        {/* subtle dot grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-5 lg:gap-10">
          {/* Left copy — 60% */}
          <div className="lg:col-span-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Free · UAE-focused
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
              the <span className="text-blue-400">UAE ATS</span> —
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

      <FilterProblem />
      <WhatWeCheck />
      <HowItWorks />
      <PricingClarity />
      <ResumeCheckerFAQ />
      <FinalCTA />
    </>
  );
}
