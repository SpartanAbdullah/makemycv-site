import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/seo-schema";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { CareerToolLinks } from "@/components/seo/CareerToolLinks";
import { HeroSection } from "@/components/home/HeroSection";
import { homepageFaqs, HomepageFAQ } from "@/components/home/FAQ";
import { TemplateShowcase } from "@/components/home/TemplateShowcase";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SocialSection } from "@/components/home/SocialSection";

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

/* Title/description rewritten 2026-08-10 (GA4 + Search Console audit). The site
   already ranks 1.0–1.7 for `dubai resume maker`, `cv maker uae format` and
   `dubai format cv maker free` and earned ZERO clicks on them — a snippet
   problem, not a ranking problem. Two deliberate changes:
     - "Maker", not "Builder". Every converting query uses "maker"
       (`cv maker for dubai jobs` converts at 20%, `uae cv maker free` at 10.7%);
       nothing ranking here says "builder".
     - Leads with "Free" + the UAE/Dubai qualifier, which is what the converting
       queries all contain.
   The layout template appends " | MakeMyCV.ae" (14 chars), so keep this ≤45 to
   render under 60. We do NOT optimise for the bare brand name — see
   makemycv-brand-disambiguation. */
export const metadata = buildPageMetadata({
  title: "Free CV Maker for UAE Jobs — Dubai CV Format",
  description:
    "Free CV maker for Dubai & UAE jobs. Build an ATS-ready CV in the format UAE recruiters expect — visa status, photo optional. No sign-up, no paywall.",
  path: "/",
});

// Organization + WebSite + WebApplication are all emitted site-wide from
// app/layout.tsx. This page deliberately adds no entity nodes — re-emitting
// the builder here would duplicate @id #webapp on the homepage.

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
      {/* Social follow — the one intentionally-client section on the page
          (framer-motion floating icons). LinkedIn + Instagram only for now. */}
      <SocialSection />
      <FinalCTA />
    </>
  );
}
