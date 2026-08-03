import Link from "next/link";
import { buildPageMetadata, canonicalUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiAnswer } from "@/components/seo/AiAnswer";
import { breadcrumbSchema } from "@/lib/seo-schema";
import { ArrowRight, Camera, CheckCircle2, XCircle } from "lucide-react";
import { getAllTemplates } from "@/lib/templates";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCTA } from "@/components/home/FinalCTA";

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

// The builder's WebApplication node is emitted site-wide from app/layout.tsx,
// so an AI agent landing here already resolves the page to the builder it
// advertises. Only the Breadcrumb is page-specific.
const templatesBreadcrumb = breadcrumbSchema([
  { name: "Home", item: canonicalUrl("/") },
  { name: "Templates", item: canonicalUrl("/templates") },
]);

/* Badges = the product's own honest signal (mirrors the builder registry):
   every card gets its classification — ATS-Friendly (single-column),
   Photo-first (same layout, photo on top) or Design-led (sidebar/two-column,
   better for direct email than portal uploads) — and New stacks as a second
   pill rather than replacing it. */
function badgesFor(tags: readonly string[]) {
  const badges = tags.includes("ATS-safe")
    ? [{ label: "ATS-Friendly", cls: "bg-accent-soft text-accent-deep" }]
    : tags.includes("Photo")
      ? [{ label: "Photo-first", cls: "bg-sheet/95 text-ink-2 ring-1 ring-line" }]
      : [{ label: "Design-led", cls: "bg-ink/75 text-white" }];
  if (tags.includes("New"))
    badges.push({ label: "New", cls: "bg-gold-soft text-gold-deep" });
  return badges;
}

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

          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {templates.map((t) => {
              const badges = badgesFor(t.tags);
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
                    className="tpl-cta relative block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper-2"
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
                        <>
                          {/* 544w WebP thumbs — cards render ≤260px wide. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={t.thumbnail.replace(/\.png$/, "-thumb.webp")}
                            alt={`${t.name} CV template — ${t.positioning}`}
                            width={544}
                            height={769}
                            loading="lazy"
                            className="h-full w-full object-cover object-top group-has-[.nophoto-radio:checked]:hidden"
                          />
                          {t.tags.includes("Photo") && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={t.thumbnail.replace("-preview.png", "-nophoto-preview-thumb.webp")}
                              alt={`${t.name} CV template without photo`}
                              width={544}
                              height={769}
                              loading="lazy"
                              className="hidden h-full w-full object-cover object-top group-has-[.nophoto-radio:checked]:block"
                            />
                          )}
                        </>
                      ) : (
                        <div className="h-full w-full bg-paper-2" />
                      )}

                      {/* Honest status badges (mirror the builder) — the
                          classification always shows; New stacks under it. */}
                      <span className="absolute right-2 top-2 flex flex-col items-end gap-1">
                        {badges.map((b) => (
                          <span
                            key={b.label}
                            className={`rounded-full px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.1em] ${b.cls}`}
                          >
                            {b.label}
                          </span>
                        ))}
                      </span>

                      {/* Export formats */}
                      <span className="absolute bottom-2 left-2 rounded bg-ink/75 px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-white">
                        PDF · DOCX
                      </span>

                      {/* Hover / focus CTA — focus reveal scoped to the card
                          link itself so focusing the photo radios below
                          doesn't summon it. */}
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-150 group-has-[.tpl-cta:focus-visible]:bg-ink/25 group-has-[.tpl-cta:focus-visible]:opacity-100 group-hover:bg-ink/25 group-hover:opacity-100">
                        <span className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-md">
                          Use This Template
                        </span>
                      </span>
                    </div>
                  </a>

                  <p className="mx-auto mt-2 max-w-[26ch] text-center text-xs leading-snug text-muted">
                    {t.positioning}
                  </p>

                  {/* Visible with/without-photo switch — two radios so the
                      active side is a no-op and AT announces selection. */}
                  {t.tags.includes("Photo") && (
                    <fieldset className="mx-auto mt-2.5 flex w-fit items-center rounded-full border border-line bg-paper p-0.5 text-[11px] font-semibold text-muted transition-colors duration-150 hover:border-accent/50 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-accent">
                      <legend className="sr-only">
                        {t.name} template photo preview
                      </legend>
                      <Camera size={11} className="ml-1.5 mr-1 shrink-0" aria-hidden="true" />
                      <input
                        type="radio"
                        id={`tpl-photo-${t.slug}-with`}
                        name={`tpl-photo-${t.slug}`}
                        defaultChecked
                        className="sr-only"
                      />
                      <label
                        htmlFor={`tpl-photo-${t.slug}-with`}
                        className="flex min-h-[36px] cursor-pointer select-none items-center rounded-full bg-sheet px-3 text-accent-deep shadow-xs transition-all duration-150 group-has-[.nophoto-radio:checked]:bg-transparent group-has-[.nophoto-radio:checked]:text-muted group-has-[.nophoto-radio:checked]:shadow-none md:min-h-[30px] md:px-2.5"
                      >
                        With photo
                      </label>
                      <input
                        type="radio"
                        id={`tpl-photo-${t.slug}-without`}
                        name={`tpl-photo-${t.slug}`}
                        className="nophoto-radio sr-only"
                      />
                      <label
                        htmlFor={`tpl-photo-${t.slug}-without`}
                        className="flex min-h-[36px] cursor-pointer select-none items-center rounded-full px-3 transition-all duration-150 group-has-[.nophoto-radio:checked]:bg-sheet group-has-[.nophoto-radio:checked]:text-ink group-has-[.nophoto-radio:checked]:shadow-xs md:min-h-[30px] md:px-2.5"
                      >
                        Without
                      </label>
                    </fieldset>
                  )}
                </article>
              );
            })}

            {/* End-cap — fills the orphan grid slot and closes the browse
                loop, mirroring the homepage shelf's dashed card. */}
            <a
              href="https://app.makemycv.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line-strong bg-sheet/60 p-6 text-center transition-colors duration-150 hover:border-accent hover:bg-accent-soft/40"
              style={{ aspectRatio: "1 / 1.414" }}
              data-event="templates_page_endcap_click"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                <ArrowRight size={20} aria-hidden="true" />
              </span>
              <span className="font-display text-base font-bold text-ink">
                Can&apos;t decide? Start with Classic
              </span>
              <span className="text-xs text-muted">
                Free, no sign-up — switch templates anytime in the builder
              </span>
            </a>
          </div>
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
