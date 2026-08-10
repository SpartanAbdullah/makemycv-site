import Link from "next/link";
import { buildPageMetadata, canonicalUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { breadcrumbSchema } from "@/lib/seo-schema";
import { CheckCircle2, XCircle } from "lucide-react";
import { getAllTemplates } from "@/lib/templates";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCTA } from "@/components/home/FinalCTA";
import { TemplateGrid } from "@/components/templates/TemplateGrid";

// Phase B0 — branded "Quick Answer" for AI search. Reconciled with the real
// app template set (Phase B-T): all 10 templates, honest ATS-Friendly vs
// Design-led framing. This page has no other FAQPage, so <AiAnswer/> emits
// its own single-Q FAQPage.
const templatesAiAnswer = {
  q: "Which CV template should I use for UAE jobs?",
  lead: "MakeMyCV offers 10 free CV templates built for the UAE job market.",
  a: "MakeMyCV offers 10 free CV templates built for the UAE job market. For online portals, pick an ATS-Friendly single-column layout — Classic for corporate, finance and government roles, ATS Clean for fresh graduates, or Professional. Design-led layouts like Modern and Executive suit direct email to a recruiter. All include UAE fields such as visa status, and every layout is available with or without a photo.",
};

/* Rewritten 2026-08-10 (Search Console audit): `cv template uae` earns 14
   impressions at position 4.6 and zero clicks. Leads with "Free" + "UAE" and
   fronts the count, which the old title buried. */
export const metadata = buildPageMetadata({
  title: "Free CV Templates UAE — 10 ATS-Ready Formats",
  description:
    "10 free CV templates for Dubai & UAE jobs — ATS-friendly single-column layouts and design-led formats, with or without a photo. No sign-up.",
  path: "/templates",
});

// The builder's WebApplication node is emitted site-wide from app/layout.tsx,
// so an AI agent landing here already resolves the page to the builder it
// advertises. Only the Breadcrumb is page-specific.
const templatesBreadcrumb = breadcrumbSchema([
  { name: "Home", item: canonicalUrl("/") },
  { name: "Templates", item: canonicalUrl("/templates") },
]);

export default function TemplatesPage() {
  const templates = getAllTemplates();

  return (
    <>
      <JsonLd data={templatesBreadcrumb} />

      {/* Hero */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            Templates
          </p>
          <h1 className="mt-4 font-display text-[36px] font-bold leading-[1.1] tracking-tight-2 text-ink md:text-[44px]">
            All {templates.length} CV templates,
            <br />
            <span className="text-accent">built for the UAE job market.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Real captures from the builder — the same templates you download,
            all free, no watermark. Every layout is available with or without
            a photo: upload once, choose per application.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted">
            Single-column layouts carry the ATS-Friendly badge, design-led
            layouts shine when you email a recruiter directly, and the newest
            additions are labelled New. Uploading to a portal? Flip a photo
            template to <span className="font-semibold">Without</span> — the
            layout stays the same.
          </p>
        </div>
      </section>

      {/* Branded quick answer (Phase B0) — leads with "MakeMyCV", names the
          templates and who each suits. Emits its own FAQPage. */}
      <AiAnswer
        question={templatesAiAnswer.q}
        lead={templatesAiAnswer.lead}
        answer={templatesAiAnswer.a}
      />

      {/* Templates Grid — preview-first, minimal chrome */}
      <section className="bg-paper-2 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* Keeps the h1 > h2 > h3 outline (card names are h3s). */}
          <h2 className="sr-only">Choose your template</h2>

          <TemplateGrid
            templates={templates.map((t) => ({
              slug: t.slug,
              name: t.name,
              positioning: t.positioning,
              thumbnail: t.thumbnail,
              tags: [...t.tags],
            }))}
          />

        </div>
      </section>

      {/* ATS Explainer */}
      <section className="bg-paper py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="ATS explained"
            title="What ATS is — and why it decides UAE applications."
          />
          <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
            <div className="text-sm leading-relaxed text-ink-2">
              <p>
                Most large UAE employers — ADNOC, Emirates, Emaar, DEWA, and
                international banks in DIFC — use Applicant Tracking Systems
                (ATS) to filter CVs before a human ever sees them.
              </p>
              <p className="mt-4">
                An ATS scans for keywords, proper formatting, and standard
                section headers. If your CV uses tables, graphics, or unusual
                fonts, it gets rejected automatically.
              </p>
              <p className="mt-4">
                That&apos;s why the badge on each template above matters:
                single-column layouts are engineered to parse cleanly through
                online portals, while design-led layouts are best sent
                straight to a recruiter&apos;s inbox, where a human reads
                first. You can test your current CV against these rules with
                the{" "}
                <Link
                  href="/resume-checker"
                  className="font-semibold text-accent underline-offset-4 hover:underline"
                >
                  free ATS checker
                </Link>
                .
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-xl border border-red-200/70 bg-red-50/50 p-6">
                <p className="mb-3 flex items-center gap-2 font-bold text-red-600">
                  <XCircle size={18} className="text-red-500" /> Rejected by ATS
                </p>
                <ul className="space-y-1 text-xs text-red-700/90">
                  <li>&bull; Tables and multi-column layouts</li>
                  <li>&bull; Graphics, icons, and logos</li>
                  <li>&bull; Unusual or decorative fonts</li>
                  <li>&bull; Missing section headers</li>
                </ul>
              </div>
              <div className="rounded-xl border border-accent/25 bg-accent-soft p-6">
                <p className="mb-3 flex items-center gap-2 font-bold text-accent-deep">
                  <CheckCircle2 size={18} className="text-accent" /> Passes ATS
                </p>
                <ul className="space-y-1 text-xs text-ink-2">
                  <li>&bull; Clean text formatting</li>
                  <li>&bull; Standard section headers</li>
                  <li>&bull; Keyword-friendly structure</li>
                  <li>&bull; Consistent date formats</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion close — the browse page must not dead-end at the ATS
          fear panel; same green band the homepage funnels into. */}
      <FinalCTA eventName="templates_final_cta_click" />
    </>
  );
}
