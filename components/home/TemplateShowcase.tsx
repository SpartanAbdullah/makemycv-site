import Link from "next/link";
import { ArrowRight, Camera, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllTemplates } from "@/lib/templates";

/**
 * All ten templates in a CSS scroll-snap strip — the cvtoolspro-style
 * "abundance" shelf, but with zero client JS: the cut-off card at the
 * container edge is the scroll affordance. Badges are factual only
 * (ATS-safe / Photo / New from the content tags) — no invented
 * "most popular" claims.
 */
export function TemplateShowcase() {
  const all = getAllTemplates();
  if (all.length === 0) return null;

  // Editorial order for the homepage strip: lead with the photo template the
  // hero card features; /templates keeps the canonical content order.
  const featured = [
    ...all.filter((t) => t.slug === "professional-photo"),
    ...all.filter((t) => t.slug !== "professional-photo"),
  ];

  return (
    <section className="overflow-hidden bg-paper-2 py-20 md:py-28">
      <Reveal className="mx-auto w-full max-w-[1400px] px-6 md:px-10 xl:px-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Templates"
            title="Templates designed for UAE recruiters — not US LinkedIn influencers."
            subcopy="ATS-friendly single-column layouts, plus design-led formats for direct-to-recruiter email — all Gulf-appropriate, all free, with or without a photo."
          />
          <Link
            href="/templates"
            className="mb-1 hidden shrink-0 items-center gap-1 text-sm font-semibold text-accent transition-colors duration-150 hover:text-accent-deep hover:underline underline-offset-4 md:inline-flex"
          >
            See all {all.length} templates
            <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>

      {/* The shelf. Scroll container is capped at the same 1400px so the
          header and first card share a left edge; snap padding mirrors the
          gutters. */}
      <div className="mx-auto mt-10 w-full max-w-[1400px] md:mt-12">
        <div className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-6 px-6 pb-4 pt-2 md:scroll-pl-10 md:px-10 xl:scroll-pl-14 xl:px-14">
          {featured.map((t) => (
            <article
              key={t.slug}
              className="group relative w-[236px] shrink-0 snap-start md:w-[272px]"
            >
              <div
                className="relative overflow-hidden rounded-lg bg-sheet ring-1 ring-line transition-all duration-150 group-hover:-translate-y-1 group-hover:shadow-lg-soft"
                style={{ aspectRatio: "1 / 1.414", boxShadow: "var(--shadow-sm-soft)" }}
              >
                {/* Photo templates ship a second, photo-less capture; a
                    CSS-only checkbox (peer) flips between the two so users
                    can compare with/without — still zero client JS. */}
                {t.tags.includes("Photo") && (
                  <input
                    type="checkbox"
                    id={`nophoto-${t.slug}`}
                    className="peer sr-only"
                    aria-label={`Show the ${t.name} template without photo`}
                  />
                )}
                {t.thumbnail ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size Playwright captures; sized + lazy */}
                    <img
                      src={t.thumbnail}
                      alt={`${t.name} CV template preview — ${t.positioning}`}
                      width={794}
                      height={1123}
                      loading="lazy"
                      className="h-full w-full object-cover object-top peer-checked:hidden"
                    />
                    {t.tags.includes("Photo") && (
                      // eslint-disable-next-line @next/next/no-img-element -- fixed-size Playwright captures; sized + lazy
                      <img
                        src={t.thumbnail.replace("-preview.png", "-nophoto-preview.png")}
                        alt={`${t.name} CV template preview without photo`}
                        width={794}
                        height={1123}
                        loading="lazy"
                        className="hidden h-full w-full object-cover object-top peer-checked:block"
                      />
                    )}
                  </>
                ) : (
                  <div className="h-full w-full bg-paper-2" />
                )}

                {/* Photo on/off switch — a label for the hidden checkbox. */}
                {t.tags.includes("Photo") && (
                  <label
                    htmlFor={`nophoto-${t.slug}`}
                    className="absolute right-2.5 top-2.5 z-10 cursor-pointer select-none rounded-full border border-line bg-sheet/95 px-2.5 py-1 text-[10px] font-semibold text-ink-2 shadow-sm-soft transition-colors duration-150 hover:border-accent hover:text-accent peer-checked:[&_.label-off]:inline peer-checked:[&_.label-on]:hidden peer-focus-visible:ring-2 peer-focus-visible:ring-accent"
                  >
                    <span className="label-on">Hide photo</span>
                    <span className="label-off hidden">Show photo</span>
                  </label>
                )}

                {/* Factual badges, top-left on the sheet. */}
                <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
                  {t.tags.includes("Photo") && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                      <Camera size={10} aria-hidden="true" /> Photo
                    </span>
                  )}
                  {t.tags.includes("New") && (
                    <span className="rounded-full bg-gold-soft px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-eyebrow text-gold-deep">
                      New
                    </span>
                  )}
                </div>

                {/* Hover / focus overlay (desktop) — keyboard reveals it too. */}
                <div className="pointer-events-none absolute inset-0 hidden items-end justify-center gap-2 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-4 opacity-0 transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100 md:flex md:pointer-events-auto">
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
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </div>

                {/* Mobile: the whole sheet taps through to the template. */}
                <Link
                  href={`/templates#${t.slug}`}
                  className="absolute inset-0 md:hidden"
                  aria-label={`${t.name} template — preview`}
                />
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-2 px-0.5">
                <h3 className="font-display text-[15px] font-bold text-ink md:text-base">
                  {t.name}
                </h3>
                {t.tags.includes("ATS-safe") ? (
                  <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-accent">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                    ATS-Friendly
                  </span>
                ) : (
                  <span className="shrink-0 text-[11px] font-medium text-muted">
                    Design-led
                  </span>
                )}
              </div>
            </article>
          ))}

          {/* End cap — the browse-everything card. */}
          <Link
            href="/templates"
            className="flex w-[236px] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line-strong bg-sheet/60 text-center transition-colors duration-150 hover:border-accent hover:bg-accent-soft/40 md:w-[272px]"
            style={{ aspectRatio: "1 / 1.5" }}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
              <ArrowRight size={20} aria-hidden="true" />
            </span>
            <span className="px-6 font-display text-base font-bold text-ink">
              Browse all {all.length} templates
            </span>
            <span className="px-6 text-xs text-muted">
              Filters for ATS, photo &amp; industry
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile-only browse link (the header link is hidden below md). */}
      <div className="mt-6 text-center md:hidden">
        <Link
          href="/templates"
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors duration-150 hover:text-accent-deep hover:underline underline-offset-4"
        >
          See all {all.length} templates
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
