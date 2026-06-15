import { Highlighter, Lock, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustChip } from "@/components/ui/TrustChip";
import { HeatmapPreview } from "@/components/jd-match/HeatmapPreview";
import { JdMatchSteps } from "@/components/jd-match/JdMatchSteps";
import { HonestMatching } from "@/components/jd-match/HonestMatching";
import { JdMatchFAQ, faqItems } from "@/components/jd-match/JdMatchFAQ";
import { JdMatchFinalCTA } from "@/components/jd-match/JdMatchFinalCTA";
import { APP_URL, SITE_URL, buildPageMetadata, canonicalUrl } from "@/lib/seo";

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
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
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
              you cover and every gap to close. Free. Your CV never leaves your
              browser.
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
              <TrustChip icon={Lock} label="CV stays in your browser" tone="dark" />
              <TrustChip icon={Highlighter} label="Heatmap on the real JD" tone="dark" />
            </div>
          </div>

          {/* Visual */}
          <div>
            <HeatmapPreview />
          </div>
        </div>
      </section>

      <JdMatchSteps />
      <HonestMatching />
      <JdMatchFAQ />
      <JdMatchFinalCTA />
    </>
  );
}
