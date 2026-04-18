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
import { TemplateShowcase } from "@/components/home/TemplateShowcase";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCTA } from "@/components/home/FinalCTA";

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
      {/* TODO: Step 7 — PricingStrip goes here */}
      <TrustSection />
      <FinalCTA />
    </>
  );
}
