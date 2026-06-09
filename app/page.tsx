import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, softwareApplicationSchema } from "@/lib/seo-schema";
import { HeroSection } from "@/components/home/HeroSection";
import { homepageFaqs, HomepageFAQ } from "@/components/home/FAQ";

// Below-the-fold sections — split into separate chunks to keep initial payload lean.
// ssr:true (default) preserves SEO; sized skeletons prevent CLS during load.
const TemplateShowcase = dynamic(
  () => import("@/components/home/TemplateShowcase").then((m) => ({ default: m.TemplateShowcase })),
  { loading: () => <div className="bg-paper-2" style={{ minHeight: 720 }} /> },
);
const ProblemSolution = dynamic(
  () => import("@/components/home/ProblemSolution").then((m) => ({ default: m.ProblemSolution })),
  { loading: () => <div style={{ minHeight: 600 }} /> },
);
const FeatureGrid = dynamic(
  () => import("@/components/home/FeatureGrid").then((m) => ({ default: m.FeatureGrid })),
  { loading: () => <div style={{ minHeight: 600 }} /> },
);
const HowItWorks = dynamic(
  () => import("@/components/home/HowItWorks").then((m) => ({ default: m.HowItWorks })),
  { loading: () => <div style={{ minHeight: 500 }} /> },
);
const TrustSection = dynamic(
  () => import("@/components/home/TrustSection").then((m) => ({ default: m.TrustSection })),
  { loading: () => <div style={{ minHeight: 400 }} /> },
);
const FinalCTA = dynamic(
  () => import("@/components/home/FinalCTA").then((m) => ({ default: m.FinalCTA })),
  { loading: () => <div style={{ minHeight: 300 }} /> },
);

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
      <HeroSection />
      <TemplateShowcase />
      <ProblemSolution />
      <FeatureGrid />
      <HowItWorks />
      <TrustSection />
      <HomepageFAQ />
      <FinalCTA />
    </>
  );
}
