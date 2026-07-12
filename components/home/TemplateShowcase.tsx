import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedTemplates } from "@/lib/templates";

export function TemplateShowcase() {
  const templates = getFeaturedTemplates(3);
  if (templates.length === 0) return null;

  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <Reveal className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Templates"
          title="Templates designed for UAE recruiters — not US LinkedIn influencers."
          subcopy="Every template is ATS-parseable, Gulf-appropriate, and works with or without a photo — you decide per application. Visa status and UAE Essentials supported throughout."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <article
              key={t.slug}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-sheet shadow-xs transition-all duration-150 hover:-translate-y-1 hover:border-line-strong hover:shadow-lg-soft"
            >
              {/* Thumbnail well — paper-on-desk effect */}
              <div className="relative border-b border-line bg-paper-2 p-6 pb-3">
                <span className="absolute right-3 top-3 z-10 rounded-full bg-gold-soft px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-eyebrow text-gold-deep">
                  Free
                </span>

                <div className="relative mx-auto max-w-[320px]">
                  {/* Real screenshot of the actual template, captured from
                      the builder — not a mockup. */}
                  <div
                    className="overflow-hidden rounded-lg bg-sheet ring-1 ring-line"
                    style={{ aspectRatio: "1 / 1.414", boxShadow: "var(--shadow-sheet)" }}
                  >
                    {t.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.thumbnail}
                        alt={`${t.name} CV template preview — ${t.positioning}`}
                        width={794}
                        height={1123}
                        loading="lazy"
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="h-full w-full bg-paper-2" />
                    )}
                  </div>

                  {/* Hover overlay (desktop) — also revealed on keyboard focus
                      so the tab stops inside are never invisible. */}
                  <div className="pointer-events-none absolute inset-0 hidden items-end justify-center gap-2 rounded-xl bg-gradient-to-t from-ink/85 via-ink/35 to-transparent p-4 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 md:flex md:pointer-events-auto">
                    <Link
                      href={`/templates#${t.slug}`}
                      className="rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-ink shadow-md transition-colors duration-150 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink/50"
                    >
                      Preview
                    </Link>
                    <a
                      href="https://app.makemycv.ae"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white shadow-md transition-colors duration-150 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink/50"
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
                  <h3 className="font-display text-lg font-bold text-ink">
                    {t.name}
                  </h3>
                  {t.tags.includes("ATS-safe") ? (
                    <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-accent">
                      <Check size={12} strokeWidth={3} />
                      ATS-Friendly
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-ink-2">
                      Design-led
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm leading-snug text-muted">
                  {t.positioning}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-paper-2 px-2.5 py-0.5 text-[11px] font-medium text-ink-2"
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
                  className="mt-5 inline-flex items-center justify-center gap-1 rounded-lg bg-accent px-3 py-2.5 text-sm font-semibold text-white shadow-cta transition-all duration-150 hover:bg-accent-deep md:hidden"
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
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors duration-150 hover:text-accent-deep hover:underline underline-offset-4"
          >
            See all 10 templates
            <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
