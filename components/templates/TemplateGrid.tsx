"use client";

import { useState } from "react";
import { ArrowRight, Camera } from "lucide-react";

/**
 * The /templates grid with client-side filtering. A client component so the
 * filter pills work, but it still SSRs — every card is in the initial HTML,
 * so crawlers see all templates regardless of filter state. Filtered-out
 * cards are hidden (not unmounted) so thumbnails stay loaded and the
 * with/without-photo radios keep their state.
 */

export type TemplateCard = {
  slug: string;
  name: string;
  positioning: string;
  thumbnail?: string;
  tags: string[];
};

type FilterId = "all" | "ats" | "photo" | "design";

/* Classification mirrors the builder registry: ATS-safe single-column,
   Photo-first (same layout, photo on top), Design-led (sidebar/two-column,
   best for direct email). */
const classify = (tags: string[]): Exclude<FilterId, "all"> =>
  tags.includes("ATS-safe") ? "ats" : tags.includes("Photo") ? "photo" : "design";

/* Badges = the product's own honest signal — classification always shows,
   New stacks as a second pill rather than replacing it. */
function badgesFor(tags: string[]) {
  const badges =
    classify(tags) === "ats"
      ? [{ label: "ATS-Friendly", cls: "bg-accent-soft text-accent-deep" }]
      : classify(tags) === "photo"
        ? [{ label: "Photo-first", cls: "bg-sheet/95 text-ink-2 ring-1 ring-line" }]
        : [{ label: "Design-led", cls: "bg-ink/75 text-white" }];
  if (tags.includes("New"))
    badges.push({ label: "New", cls: "bg-gold-soft text-gold-deep" });
  return badges;
}

export function TemplateGrid({ templates }: { templates: TemplateCard[] }) {
  const [filter, setFilter] = useState<FilterId>("all");

  const count = (id: FilterId) =>
    id === "all"
      ? templates.length
      : templates.filter((t) => classify(t.tags) === id).length;

  const filters: Array<{ id: FilterId; label: string }> = [
    { id: "all", label: "All" },
    { id: "ats", label: "ATS-Friendly" },
    { id: "photo", label: "With photo" },
    { id: "design", label: "Design-led" },
  ];

  const visibleCount = count(filter);

  return (
    <>
      {/* Filter pills — the homepage end-cap promises filters; here they are. */}
      <div
        role="group"
        aria-label="Filter templates"
        className="mb-10 flex flex-wrap items-center justify-center gap-2"
      >
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper-2 ${
                active
                  ? "border-accent bg-accent-soft text-accent-deep"
                  : "border-line bg-sheet text-ink-2 hover:border-accent/40 hover:text-accent"
              }`}
            >
              {f.label}
              <span
                className={`font-mono text-[11px] ${active ? "text-accent-deep/70" : "text-muted"}`}
              >
                {count(f.id)}
              </span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visibleCount} of {templates.length} templates
      </p>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {templates.map((t) => {
          const badges = badgesFor(t.tags);
          const shown = filter === "all" || classify(t.tags) === filter;
          return (
            <article
              key={t.slug}
              id={t.slug}
              className={`group scroll-mt-24 ${shown ? "" : "hidden"}`}
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
                      {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size WebP thumbs; sized + lazy */}
                      <img
                        src={t.thumbnail.replace(/\.png$/, "-thumb.webp")}
                        alt={`${t.name} CV template — ${t.positioning}`}
                        width={544}
                        height={769}
                        loading="lazy"
                        className="h-full w-full object-cover object-top group-has-[.nophoto-radio:checked]:hidden"
                      />
                      {t.tags.includes("Photo") && (
                        // eslint-disable-next-line @next/next/no-img-element -- fixed-size WebP thumbs; sized + lazy
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
                    <span className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-cta">
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

        {/* End-cap — closes the browse loop under every filter,
            mirroring the homepage shelf's dashed card. */}
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
    </>
  );
}
