import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedTemplates } from "@/lib/templates";
import { TemplateThumbnail } from "./TemplateThumbnail";

type ThumbVariant = "classic" | "modern" | "executive" | "graduate" | "minimal";

function getVariant(slug: string): ThumbVariant {
  const known: ThumbVariant[] = [
    "classic",
    "modern",
    "executive",
    "graduate",
    "minimal",
  ];
  return known.find((k) => k === slug) ?? "classic";
}

export function TemplateShowcase() {
  const templates = getFeaturedTemplates(3);
  if (templates.length === 0) return null;

  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Templates"
          title="Templates designed for UAE recruiters — not US LinkedIn influencers."
          subcopy="Every template is ATS-parseable, Gulf-appropriate (photo field optional, visa status supported), and reviewed by recruiters hiring in the region."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <article
              key={t.slug}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg-soft"
            >
              {/* Thumbnail well — paper-on-desk effect */}
              <div className="relative bg-gradient-to-b from-slate-100 to-slate-50 p-6 pb-3">
                <span
                  className={`absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-eyebrow ${
                    t.pro
                      ? "bg-slate-900 text-white"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {t.pro ? "Pro" : "Free"}
                </span>

                <div className="relative mx-auto max-w-[320px]">
                  <TemplateThumbnail
                    variant={getVariant(t.slug)}
                    accent={t.accent}
                  />

                  {/* Hover overlay (desktop) */}
                  <div className="pointer-events-none absolute inset-0 hidden items-end justify-center gap-2 rounded-xl bg-gradient-to-t from-slate-900/85 via-slate-900/35 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:flex md:pointer-events-auto">
                    <Link
                      href={`/templates#${t.slug}`}
                      className="rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-slate-900 shadow-md hover:bg-white"
                    >
                      Preview
                    </Link>
                    <a
                      href="https://app.makemycv.ae"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-brand-blue px-3 py-2 text-xs font-semibold text-white shadow-md hover:bg-brand-blue-dark"
                      data-event="home_template_card_click"
                      data-template-id={t.slug}
                    >
                      Use This Template
                    </a>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    {t.name}
                  </h3>
                  <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-emerald-600">
                    <Check size={12} strokeWidth={3} />
                    ATS-safe
                  </span>
                </div>
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

                {/* Mobile CTA — overlay is hover-only on desktop */}
                <a
                  href="https://app.makemycv.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-1 rounded-lg bg-brand-blue px-3 py-2.5 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-brand-blue-dark md:hidden"
                  data-event="home_template_card_click_mobile"
                  data-template-id={t.slug}
                >
                  Use This Template
                  <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline underline-offset-4"
          >
            Browse all templates
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
