import { Highlighter, Lock, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustChip } from "@/components/ui/TrustChip";
import { HeatmapPreview } from "@/components/jd-match/HeatmapPreview";
import { JdMatchSteps, steps as jdMatchSteps } from "@/components/jd-match/JdMatchSteps";
import { HonestMatching } from "@/components/jd-match/HonestMatching";
import { JdMatchFAQ, faqItems } from "@/components/jd-match/JdMatchFAQ";
import { JdMatchFinalCTA } from "@/components/jd-match/JdMatchFinalCTA";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { CareerToolLinks } from "@/components/seo/CareerToolLinks";
import { APP_URL, SITE_URL, buildPageMetadata, canonicalUrl } from "@/lib/seo";

// Phase B0 — branded "Quick Answer" for AI search. Answers Q6 ("tool to check
// if my CV matches a job description UAE"), leads with the brand name, ~63
// words, and preserves the build/import/paste instruction from the old BLUF.
// Folded into faqSchema below so the page ships one FAQPage entity.
const jdAiAnswer = {
  q: "How do I check if my CV matches a UAE job description?",
  lead: "MakeMyCV's JD Match compares your CV against any UAE job description and returns a match score plus a green/amber heatmap of every requirement you cover or miss.",
  a: "MakeMyCV's JD Match compares your CV against any UAE job description and returns a match score plus a green/amber heatmap of every requirement you cover or miss. Build or import your CV, paste the job ad, and close each gap. Built for Dubai, Abu Dhabi and GCC hiring, it never invents experience — your draft stays in your browser while matching runs server-side. Free, no sign-up.",
};

export const metadata = {
  ...buildPageMetadata({
    title: "JD Match — Free CV-vs-Job Check for UAE Jobs",
    description:
      "Paste any UAE job description and see how your CV matches it — a match score plus a green/amber heatmap of every requirement you cover or miss. Free, honest, private. Built for Dubai, Abu Dhabi & GCC hiring.",
    path: "/jd-match",
  }),
  title: "JD Match — Free CV-vs-Job Description Check for UAE Jobs | MakeMyCV",
  keywords: [
    "JD match",
    "CV job match UAE",
    "match CV to job description",
    "tailor CV to job UAE",
    "CV keyword check Dubai",
    "job description match score",
    "tailor resume UAE",
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MakeMyCV JD Match",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: APP_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
  description:
    "Free CV-to-job-description matcher for the UAE job market. Paste any Dubai, Abu Dhabi or GCC job ad and get a match score plus a green/amber requirement heatmap — with honest keyword matching that never invents experience. No sign-up.",
  audience: {
    "@type": "Audience",
    audienceType: "Job seekers in the UAE and GCC",
  },
  featureList: [
    "CV-to-job-description match score",
    "Green/amber requirement heatmap",
    "Honest keyword matching (never fabricates)",
    "Per-role tailored CV download",
    "UAE-tuned fields and examples",
    "No sign-up",
  ],
};

// HowTo mirrors the visible <JdMatchSteps /> (sourced from the same array), so
// the schema can't drift from what's on the page. Strong signal for AI answer
// engines summarising "how to match a CV to a UAE job description".
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to match your CV to a UAE job description",
  description:
    "Use MakeMyCV's free JD Match to see how your CV fits a UAE job: paste the job ad to get a green/amber requirement heatmap, close the highest-impact gaps first, then download a copy tailored to that role for jobs in Dubai, Abu Dhabi and across the GCC.",
  totalTime: "PT5M",
  step: jdMatchSteps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.body,
    url: `${canonicalUrl("/jd-match")}#how-jd-match-works`,
  })),
};

// The branded quick answer is the first FAQ entity, followed by the visible
// <JdMatchFAQ /> items. All Q/A text is present in the server HTML.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [{ q: jdAiAnswer.q, a: jdAiAnswer.a }, ...faqItems].map(
    (item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }),
  ),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "JD Match",
      item: canonicalUrl("/jd-match"),
    },
  ],
};

export default function JdMatchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* HERO */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)",
        }}
      >
        <div className="hero-spotlight" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:gap-10">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-blue-400">
              <MapPin size={14} />
              JD Match · Free · Built for UAE hiring
            </p>

            <h1 className="mt-5 font-display text-[40px] font-extrabold leading-[1.06] tracking-tight-2 text-white md:text-[58px]">
              See how your CV matches{" "}
              <span className="text-blue-400">any UAE job.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl lg:mx-0">
              Paste a job description and get an instant match score — plus a
              green/amber heatmap on the real job ad showing every requirement
              you cover and every gap to close. Free, with no sign-up.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button
                href="https://app.makemycv.ae"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                withArrow
                data-event="jd_match_cta_click"
                data-cta-location="hero"
              >
                Build &amp; match my CV — Free
              </Button>
              <span className="text-sm text-slate-400">
                Build or import a CV, then paste the job
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <TrustChip icon={ShieldCheck} label="Honest AI — never invents" tone="dark" />
              <TrustChip icon={Lock} label="Draft saved in your browser" tone="dark" />
              <TrustChip icon={Highlighter} label="Heatmap on the real JD" tone="dark" />
            </div>
          </div>

          {/* Visual */}
          <div>
            <HeatmapPreview />
          </div>
        </div>
      </section>

      {/* Branded quick answer (Phase B0) — replaces the plain BLUF paragraph
          with a boxed, schema-backed answer that leads with "MakeMyCV". Schema
          folded into faqSchema above (emitSchema={false}). */}
      <AiAnswer
        question={jdAiAnswer.q}
        lead={jdAiAnswer.lead}
        answer={jdAiAnswer.a}
        emitSchema={false}
        className="bg-white py-12 md:py-14"
      />

      <JdMatchSteps />
      <HonestMatching />
      <JdMatchFAQ />
      <CareerToolLinks currentPath="/jd-match" />
      <JdMatchFinalCTA />
    </>
  );
}
