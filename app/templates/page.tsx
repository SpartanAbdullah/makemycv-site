import { buildPageMetadata, canonicalUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";
import {
  breadcrumbSchema,
  softwareApplicationSchema,
} from "@/lib/seo-schema";
import { CheckCircle2, XCircle } from "lucide-react";
import { getAllTemplates } from "@/lib/templates";

// Phase B0 — branded "Quick Answer" for AI search. Reconciled with the real
// app template set (Phase B-T): all 10 templates, honest ATS-Friendly vs
// Design-led framing. This page has no other FAQPage, so <AiAnswer/> emits
// its own single-Q FAQPage.
const templatesAiAnswer = {
  q: "Which CV template should I use for UAE jobs?",
  lead: "MakeMyCV offers 10 free CV templates built for the UAE job market.",
  a: "MakeMyCV offers 10 free CV templates built for the UAE job market. For online portals, pick an ATS-Friendly single-column layout — Classic for corporate, finance and government roles, ATS Clean for fresh graduates, or Professional. Design-led layouts like Modern and Executive suit direct email to a recruiter. All include UAE fields such as visa status, and every layout is available with or without a photo.",
};

export const metadata = buildPageMetadata({
  title: "ATS-Friendly CV Templates for UAE Jobs",
  description:
    "Browse all 10 free CV templates built for Dubai and UAE hiring standards — ATS-friendly single-column layouts and design-led formats, with or without a photo.",
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

/* Badge = the product's own honest signal (mirrors the builder registry):
   single-column layouts are ATS-Friendly; sidebar/two-column layouts are
   Design-led (better for direct email than portal uploads). */
function badgeFor(tags: readonly string[]) {
  if (tags.includes("ATS-safe"))
    return { label: "ATS-Friendly", cls: "bg-accent-soft text-accent-deep" };
  if (tags.includes("New"))
    return { label: "New", cls: "bg-gold-soft text-gold-deep" };
  return { label: "Design-led", cls: "bg-ink/75 text-white" };
}

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
            additions are labelled New.
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

          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {templates.map((t) => {
              const badge = badgeFor(t.tags);
              return (
                <article
                  key={t.slug}
                  id={t.slug}
                  className="group scroll-mt-24"
                >
                  <h3 className="mb-2 text-center font-display text-base font-bold text-ink">
                    {t.name}
                  </h3>

                  <a
                    href="https://app.makemycv.ae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper-2"
                    data-event="templates_page_use_template_click"
                    data-template-id={t.slug}
                    aria-label={`Use the ${t.name} template — opens the free builder`}
                  >
                    <div
                      className="relative overflow-hidden rounded-lg bg-sheet ring-1 ring-line transition-all duration-150 group-hover:-translate-y-1 group-hover:ring-accent group-hover:shadow-lg-soft"
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

                      {/* Honest status badge (mirrors the builder) */}
                      <span
                        className={`absolute right-2 top-2 rounded-full px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.1em] ${badge.cls}`}
                      >
                        {badge.label}
                      </span>

                      {/* Export formats */}
                      <span className="absolute bottom-2 left-2 rounded bg-ink/75 px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-white">
                        PDF · DOCX
                      </span>

                      {/* Hover / focus CTA */}
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-150 group-hover:bg-ink/25 group-hover:opacity-100 group-focus-within:bg-ink/25 group-focus-within:opacity-100">
                        <span className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-md">
                          Use This Template
                        </span>
                      </span>
                    </div>
                  </a>

                  <p className="mx-auto mt-2 max-w-[26ch] text-center text-xs leading-snug text-muted">
                    {t.positioning}
                  </p>
                </article>
              );
            })}
          </div>
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
                That&apos;s why the badge on each template above matters:
                single-column layouts are engineered to parse cleanly through
                online portals, while design-led layouts are best sent
                straight to a recruiter&apos;s inbox, where a human reads
                first.
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
