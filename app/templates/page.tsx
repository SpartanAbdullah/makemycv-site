import { buildPageMetadata, canonicalUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  softwareApplicationSchema,
} from "@/lib/seo-schema";
import { Check, CheckCircle2, XCircle } from "lucide-react";
import { getAllTemplates } from "@/lib/templates";

export const metadata = buildPageMetadata({
  title: "ATS-Friendly CV Templates for UAE Jobs",
  description:
    "Browse ATS-friendly CV templates built for Dubai and UAE hiring standards. Pick a clean format and create your CV in minutes.",
  path: "/templates",
});

// SoftwareApplication so an AI agent landing on /templates resolves the
// page to the builder it advertises; Breadcrumb for the entity graph.
const templatesSchema = {
  "@context": "https://schema.org",
  "@graph": [softwareApplicationSchema()],
};

const templatesBreadcrumb = breadcrumbSchema([
  { name: "Home", item: canonicalUrl("/") },
  { name: "Templates", item: canonicalUrl("/templates") },
]);

// Feature bullets per template — kept next to the data, not in MDX, so the
// list stays curated alongside the layout it describes.
const templateFeatures: Record<string, string[]> = {
  classic: [
    "Single-column layout trusted by UAE banks & DIFC firms",
    "Visa status, nationality & Emirates ID fields",
    "Works for all industries",
    "PDF & DOCX export",
  ],
  executive: [
    "Senior-weighted layout — leadership first",
    "Full-height accent sidebar, still parser-safe",
    "Built for 15+ year careers",
    "PDF & DOCX export",
  ],
  modern: [
    "Two-column sidebar with skills visualisation",
    "Profile photo support (optional)",
    "Ideal for creative, tech & marketing roles",
    "ATS-safe despite the layout",
  ],
  "ats-clean": [
    "Maximum-parse single column for job portals",
    "Education & projects get top billing",
    "Ideal for fresh graduates & career starters",
    "PDF & DOCX export",
  ],
};

export default function TemplatesPage() {
  const templates = getAllTemplates();

  return (
    <>
      <JsonLd data={templatesSchema} />
      <JsonLd data={templatesBreadcrumb} />

      {/* Hero */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            Templates
          </p>
          <h1 className="mt-4 font-display text-[36px] font-bold leading-[1.1] tracking-tight-2 text-ink md:text-[44px]">
            Professional CV templates
            <br />
            <span className="text-accent">for the UAE job market.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Every template is ATS-tested and formatted to Gulf hiring
            standards. These previews are real exports from the builder — what
            you see is what you download.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="bg-paper-2 py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {templates.map((t) => (
              <article
                key={t.slug}
                id={t.slug}
                className="relative flex flex-col rounded-xl border border-line bg-sheet p-6 shadow-xs transition-all duration-150 hover:-translate-y-1 hover:border-line-strong hover:shadow-lg-soft md:p-8 scroll-mt-24"
              >
                <span className="absolute right-4 top-4 z-10 rounded-full bg-gold-soft px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-eyebrow text-[#8a6a25]">
                  Free
                </span>

                {/* Real screenshot in a document frame */}
                <div className="border-b border-line bg-paper-2 -mx-6 -mt-6 rounded-t-xl p-6 md:-mx-8 md:-mt-8 md:p-8">
                  <div
                    className="mx-auto max-w-[340px] overflow-hidden rounded-lg bg-sheet ring-1 ring-line"
                    style={{
                      aspectRatio: "1 / 1.414",
                      boxShadow: "var(--shadow-sheet)",
                    }}
                  >
                    {t.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.thumbnail}
                        alt={`${t.name} CV template — ${t.positioning}`}
                        width={794}
                        height={1123}
                        loading="lazy"
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="h-full w-full bg-paper-2" />
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="shrink-0 font-display text-2xl font-bold text-ink">
                    {t.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-paper-2 px-2.5 py-0.5 text-[11px] font-medium text-ink-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted">{t.positioning}</p>

                <ul className="mt-4 flex-1 space-y-1.5 text-sm text-ink-2">
                  {(templateFeatures[t.slug] ?? []).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-accent"
                        strokeWidth={2.5}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://app.makemycv.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6 block rounded-xl px-7 py-3.5 text-center font-bold text-white"
                  data-event="templates_page_use_template_click"
                  data-template-id={t.slug}
                >
                  Use This Template &rarr;
                </a>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            Six more layouts — including photo and sidebar variants — are
            available inside the{" "}
            <a
              href="https://app.makemycv.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent transition-colors duration-150 hover:text-accent-deep hover:underline underline-offset-4"
            >
              free builder
            </a>
            . Your data carries over when you switch.
          </p>
        </div>
      </section>

      {/* ATS Explainer */}
      <section className="bg-paper py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-[28px] font-bold tracking-tight-2 text-ink md:text-[32px]">
            What is ATS and Why Does It Matter in UAE?
          </h2>
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
                All MakeMyCV templates are built to pass ATS screening while
                still looking professional to human recruiters.
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
    </>
  );
}
