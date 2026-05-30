import {
  APP_URL,
  ORGANIZATION_ID,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildPageMetadata,
  canonicalUrl,
} from "@/lib/seo";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingCards } from "@/components/pricing/PricingCards";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { faqItems } from "@/components/pricing/faqItems";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = buildPageMetadata({
  title: "Pricing — Free to build, $5 per download",
  description:
    "Build and preview your CV free. Pay $5 only when you download the final, watermark-free version. No subscription, no auto-renewal.",
  path: "/pricing",
});

const PRICING_PAGE_URL = canonicalUrl("/pricing");

const pricingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": `${PRICING_PAGE_URL}#product`,
      name: `${SITE_NAME} CV Builder`,
      description:
        "ATS-friendly CV builder for UAE job seekers. Free to build and preview; $5 one-time per final download.",
      brand: {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
      },
      url: APP_URL,
      image: absoluteUrl("/og-image.png"),
      offers: [
        {
          "@type": "Offer",
          name: "Free",
          description:
            "Full builder, all templates, watermarked PDF download.",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: APP_URL,
          category: "free",
        },
        {
          "@type": "Offer",
          name: "Pro — per download",
          description:
            "Removes watermark, unlocks AI rewriter and priority templates. One-time $5 per final download.",
          price: "5.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: APP_URL,
          category: "one-time",
          eligibleTransactionVolume: {
            "@type": "PriceSpecification",
            price: "5.00",
            priceCurrency: "USD",
          },
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PRICING_PAGE_URL}#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <PricingHero />
      <PricingCards />
      <ComparisonTable />
      <PricingFAQ />
      <FinalCTA />
    </>
  );
}
