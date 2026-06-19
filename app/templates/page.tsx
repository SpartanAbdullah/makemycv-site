import { buildPageMetadata } from "@/lib/seo";
import { Check, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { TemplateThumbnail } from "@/components/home/TemplateThumbnail";
import { marketingTemplates } from "@/lib/marketingTemplates";
import { TemplatesFAQ, faqItems } from "@/components/templates/TemplatesFAQ";

export const metadata = buildPageMetadata({
  title: "ATS-Friendly CV Templates for UAE Jobs",
  description:
    "Browse the CV templates built into MakeMyCV — ATS-safe and design-led layouts formatted for Dubai and UAE hiring. Free to use, no sign-up. Pick one and build your CV in minutes.",
  path: "/templates",
});

const APP_URL = "https://app.makemycv.ae";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function TemplatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl">
            CV Templates
            <br />
            <span className="text-brand-blue">built for the UAE job market</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Every template in the builder is ATS-tested and formatted to Gulf
            hiring standards. All free — switch any time, your content stays.
          </p>
        </div>
      </section>

      {/* Answer-first opener — "What CV template should I use for UAE jobs?" */}
      <section className="border-b border-slate-200 bg-white py-12 md:py-14">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
            For most UAE jobs, choose a clean, single-column template marked
            ATS-safe — it parses reliably through the applicant tracking systems
            large Gulf employers use, so your CV reaches a recruiter intact. Keep
            design-led, multi-column layouts for roles where a person reviews
            your CV directly, such as creative or smaller-firm applications.
            Every template below is free, UAE-formatted, and you can switch
            layouts without losing your content.
          </p>
        </div>
      </section>

      {/* Templates gallery */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-900">
            Choose your template
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            These are the real templates inside the builder — preview them here,
            then pick one and start writing.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marketingTemplates.map((t) => (
              <article
                key={t.slug}
                id={t.slug}
                className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg-soft"
              >
                {/* Preview well */}
                <div className="relative bg-gradient-to-b from-slate-100 to-slate-50 p-6 pb-3">
                  <span
                    className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-eyebrow ${
                      t.badge === "ATS-safe"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {t.badge}
                  </span>
                  <span className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-eyebrow text-slate-600 ring-1 ring-slate-200">
                    Free
                  </span>

                  <div className="relative mx-auto max-w-[320px]">
                    <TemplateThumbnail variant={t.variant} accent={t.accent} />

                    {/* Hover CTA (desktop) */}
                    <div className="pointer-events-none absolute inset-0 hidden items-end justify-center rounded-xl bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:flex md:pointer-events-auto">
                      <a
                        href={APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-brand-blue px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-brand-blue-dark"
                        data-event="templates_card_click"
                        data-template-id={t.slug}
                      >
                        Use This Template
                      </a>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    {t.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-snug text-slate-600">
                    {t.positioning}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-1 rounded-lg bg-brand-blue px-3 py-2.5 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-brand-blue-dark md:hidden"
                    data-event="templates_card_click_mobile"
                    data-template-id={t.slug}
                  >
                    Use This Template
                    <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary rounded-xl px-8 py-4 text-base font-bold text-white"
              data-event="templates_build_cta_click"
            >
              Build my CV — Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-3 text-sm text-slate-500">
              No account. No watermark. No card.
            </p>
          </div>
        </div>
      </section>

      {/* ATS Explainer */}
      <section className="bg-brand-light py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-800 md:text-4xl">
            What is ATS and why does it matter in the UAE?
          </h2>
          <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
            <div className="text-sm leading-relaxed text-slate-700">
              <p>
                Most large UAE employers — ADNOC, Emirates, Emaar, DEWA, and
                international banks in DIFC — use Applicant Tracking Systems
                (ATS) to sort CVs before a recruiter reads them.
              </p>
              <p className="mt-4">
                An ATS reads your text, structure and section headers. Tables,
                graphics and unusual fonts can break the parse, so a strong CV
                can rank low and get buried.
              </p>
              <p className="mt-4">
                Every MakeMyCV template is built to be parsed cleanly while
                still looking professional to a human recruiter — and our
                &quot;ATS-safe&quot; badge flags the single-column layouts that
                travel most reliably through online portals.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl p-6 border-2 border-red-100 bg-red-50">
                <p className="font-bold text-red-600 mb-3 flex items-center gap-2">
                  <XCircle size={18} className="text-red-500" /> Confuses the ATS
                </p>
                <ul className="space-y-1 text-xs text-red-600">
                  <li>&bull; Tables and multi-column layouts</li>
                  <li>&bull; Graphics, icons, and logos</li>
                  <li>&bull; Unusual or decorative fonts</li>
                  <li>&bull; Missing section headers</li>
                </ul>
              </div>
              <div className="rounded-2xl p-6 border-2 border-green-100 bg-green-50">
                <p className="font-bold text-green-600 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500" /> Parses
                  cleanly
                </p>
                <ul className="space-y-1 text-xs text-green-600">
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

      <TemplatesFAQ />
    </>
  );
}
