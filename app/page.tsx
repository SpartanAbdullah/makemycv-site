import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, softwareApplicationSchema } from "@/lib/seo-schema";
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

// FAQPage mirrors the visible Q/As in <HomepageFAQ />. Both source from
// `homepageFaqs` so the schema cannot drift from what users see.
const homepageFaqSchema = faqPageSchema(homepageFaqs);

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
      <TemplateShowcase />
      <ProblemSolution />
      <FeatureGrid />
      <HowItWorks />
      <HomepageFAQ />
      <FinalCTA />
    </>
  );
}
