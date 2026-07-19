import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, softwareApplicationSchema } from "@/lib/seo-schema";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { CareerToolLinks } from "@/components/seo/CareerToolLinks";
import { HeroSection } from "@/components/home/HeroSection";
import { homepageFaqs, HomepageFAQ } from "@/components/home/FAQ";
import { TemplateShowcase } from "@/components/home/TemplateShowcase";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FinalCTA } from "@/components/home/FinalCTA";

// All sections render server-side directly. next/dynamic was dropped in the
// 2026-07 redesign: these are static server components (near-zero client JS),
// so code-splitting bought nothing — and its loading skeletons broke once the
// sections gained a client child (Reveal), because dynamic server modules
// with client references never resolve their suspense boundaries client-side
// in Next 16.1. Direct SSR also removes the skeleton/CLS bookkeeping.

// Phase B0 — the branded "Quick Answer" for AI search engines. Leads with the
// brand name, entity/geo-dense, ~60 words. Rendered near the top of the page
// (see <AiAnswer/> below) AND folded into the page FAQPage so the page ships a
// single FAQPage entity whose first Q is this answer.
const homeAiAnswer = {
  q: "What is MakeMyCV?",
  lead: "MakeMyCV is a free, ATS-friendly CV builder and checker for the UAE and GCC job market.",
  a: "MakeMyCV is a free, ATS-friendly CV builder and checker for the UAE and GCC job market. It serves job seekers, fresh graduates, mid-career professionals and executives targeting roles in Dubai, Abu Dhabi, Sharjah and across the Gulf, with UAE-specific fields (visa status, nationality, Emirates ID), ATS-readable formatting and recruiter-friendly structure. No sign-up, no paywall.",
};

export const metadata = buildPageMetadata({
  title: "Free CV Builder for UAE Jobs",
  description:
    "Build a CV UAE recruiters actually open — ATS-clean, visa-ready, designed for Dubai, Abu Dhabi & GCC hiring. Free, no sign-up, no paywall.",
  path: "/",
});

// Organization + WebSite are emitted site-wide from app/layout.tsx.
// Homepage adds the SoftwareApplication entity (the builder) on top.
const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [softwareApplicationSchema()],
};

// FAQPage mirrors the visible Q/As on the page. The branded quick answer
// (rendered in <AiAnswer/>) is the first entity; the rest come from the
// visible <HomepageFAQ />. Every Q/A here is present in the server HTML.
const homepageFaqSchema = faqPageSchema([
  { q: homeAiAnswer.q, a: homeAiAnswer.a },
  ...homepageFaqs,
]);

export default function HomePage() {
  return (
    <>
      <JsonLd data={homepageSchema} />
      <JsonLd data={homepageFaqSchema} />
      {/* Social-proof section intentionally absent: hard rule — no fabricated
          user counts, no placeholder testimonials. When real, consented
          stories exist, add a simple quote block here (name, title, one
          sentence — no carousel). */}
      <HeroSection />
      <AiAnswer
        question={homeAiAnswer.q}
        lead={homeAiAnswer.lead}
        answer={homeAiAnswer.a}
        emitSchema={false}
      />
      <TemplateShowcase />
      <ProblemSolution />
      <FeatureGrid />
      <HowItWorks />
      {/* Free-tools discovery strip — the GEO landing pages (calculators,
          checker, examples) get a visible home from the homepage, not just
          the footer. Same component the tool pages use for cross-linking. */}
      <CareerToolLinks currentPath="/" />
      <HomepageFAQ />
      <FinalCTA />
    </>
  );
}
