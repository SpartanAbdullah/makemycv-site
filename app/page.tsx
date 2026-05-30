import dynamic from "next/dynamic";
import {
  APP_URL,
  ORGANIZATION_ID,
  SITE_NAME,
  SITE_URL,
  WEBAPP_ID,
  WEBSITE_ID,
  absoluteUrl,
  buildPageMetadata,
} from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";

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
const PricingStrip = dynamic(
  () => import("@/components/home/PricingStrip").then((m) => ({ default: m.PricingStrip })),
  { loading: () => <div style={{ minHeight: 400 }} /> },
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
    "Build a CV UAE recruiters actually open — ATS-clean, visa-ready, designed for Dubai, Abu Dhabi & GCC hiring. Free to build, no sign-up. $5 one-time download to remove watermark.",
  path: "/",
});

const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/apple-touch-icon.png"),
      },
      areaServed: "AE",
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-AE",
      publisher: {
        "@id": ORGANIZATION_ID,
      },
    },
    {
      "@type": "WebApplication",
      "@id": WEBAPP_ID,
      name: SITE_NAME,
      url: APP_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Free CV builder for UAE job seekers with ATS-friendly formatting and PDF export.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "AED",
      },
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      publisher: {
        "@id": ORGANIZATION_ID,
      },
      inLanguage: "en-AE",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema),
        }}
      />
      <HeroSection />
      <TemplateShowcase />
      <ProblemSolution />
      <FeatureGrid />
      <HowItWorks />
      <PricingStrip />
      <TrustSection />
      <FinalCTA />
    </>
  );
}
