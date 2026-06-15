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
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { faqItems } from "@/components/pricing/faqItems";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata = buildPageMetadata({
  title: "Pricing — Free, with optional tips",
  description:
    "MakeMyCV is free for UAE job seekers — builder, JD Match, AI rewriting and watermark-free PDF download, no sign-up. Optional tips keep it free for the next person.",
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
        "ATS-friendly CV builder, JD Match and resume checker for UAE job seekers. Free to use, including watermark-free PDF download. Optional tips supported.",
      brand: {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
      },
      url: APP_URL,
      image: absoluteUrl("/og-image.png"),
      offers: {
        "@type": "Offer",
        name: "Free",
        description:
          "Full builder, all templates, JD Match, AI rewriting and watermark-free PDF download — free, no sign-up.",
        price: "0",
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
        url: APP_URL,
        category: "free",
      },
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
      <PricingFAQ />
      <FinalCTA />
    </>
  );
}
