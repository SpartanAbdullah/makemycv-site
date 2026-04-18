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

      {/* TODO: Step 4 — TemplateShowcase goes here */}

      {/* ── PROBLEM / SOLUTION (legacy — replaced in Step 5) ── */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-800 md:text-4xl">
            Most UAE CVs Get Rejected Before a Human Reads Them
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="card-lift rounded-2xl p-8 bg-white border border-slate-100 shadow-sm text-center">
              <h3 className="mt-4 font-display text-lg font-bold text-slate-800">
                ATS Systems Reject 75% of CVs
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Most companies in Dubai use automated screening. If your CV
                isn&apos;t formatted correctly, it never reaches a hiring
                manager.
              </p>
            </div>
            <div className="card-lift rounded-2xl p-8 bg-white border border-slate-100 shadow-sm text-center">
              <h3 className="mt-4 font-display text-lg font-bold text-slate-800">
                Word Templates Look Unprofessional
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Generic CV templates don&apos;t reflect UAE hiring standards.
                Recruiters in the Gulf see thousands of identical-looking CVs
                every week.
              </p>
            </div>
            <div className="card-lift rounded-2xl p-8 bg-white border border-slate-100 shadow-sm text-center">
              <h3 className="mt-4 font-display text-lg font-bold text-slate-800">
                MakeMyCV Fixes Both Problems
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Our builder formats your CV for ATS systems automatically —
                while keeping it visually clean for human recruiters.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
