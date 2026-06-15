/**
 * Single source of truth for the marketing-site template gallery.
 *
 * These mirror the REAL templates shipped in the builder (app.makemycv.ae,
 * see makemycv-app/lib/templates/index.tsx) so the marketing site never
 * advertises a template the app doesn't have. Keep this list in sync with the
 * app's `templates` registry.
 *
 * `badge` is an honest ATS-safety signal: single-column text-first layouts are
 * "ATS-safe"; sidebar / two-column structures are "Design-led" (great for
 * emailing a recruiter directly, riskier through older online ATS portals).
 */
export type TemplateVariant =
  | "classic"
  | "ats-clean"
  | "modern"
  | "executive"
  | "exec-split"
  | "corp-sidebar";

export type TemplateAccent = "blue" | "emerald" | "amber" | "slate" | "indigo";

export type MarketingTemplate = {
  slug: string;
  name: string;
  variant: TemplateVariant;
  accent: TemplateAccent;
  badge: "ATS-safe" | "Design-led";
  positioning: string;
  tags: string[];
};

export const marketingTemplates: MarketingTemplate[] = [
  {
    slug: "classic",
    name: "Classic",
    variant: "classic",
    accent: "slate",
    badge: "ATS-safe",
    positioning:
      "Clean single-column layout trusted by UAE recruiters in finance, operations and government.",
    tags: ["Finance", "Government", "Operations"],
  },
  {
    slug: "ats-clean",
    name: "ATS Clean",
    variant: "ats-clean",
    accent: "blue",
    badge: "ATS-safe",
    positioning:
      "Single-column, text-first layout engineered for maximum ATS pass rate on online portals.",
    tags: ["Online portals", "Maximum parse", "All roles"],
  },
  {
    slug: "modern",
    name: "Modern",
    variant: "modern",
    accent: "emerald",
    badge: "Design-led",
    positioning:
      "Two-column layout with a refined accent sidebar — ideal for tech, marketing and creative roles.",
    tags: ["Tech", "Marketing", "Creative"],
  },
  {
    slug: "executive",
    name: "Executive",
    variant: "executive",
    accent: "indigo",
    badge: "Design-led",
    positioning:
      "Navy header for senior professionals. Best emailed directly to a recruiter.",
    tags: ["Leadership", "Senior", "Manager"],
  },
  {
    slug: "exec-split",
    name: "Executive Split",
    variant: "exec-split",
    accent: "slate",
    badge: "Design-led",
    positioning:
      "Dark header with a two-column body for directors and C-suite profiles.",
    tags: ["Director", "C-suite", "Strategy"],
  },
  {
    slug: "corp-sidebar",
    name: "Corporate",
    variant: "corp-sidebar",
    accent: "blue",
    badge: "Design-led",
    positioning:
      "Right dark sidebar for skills and contact. A polished corporate look for direct applications.",
    tags: ["Corporate", "Consulting", "Sales"],
  },
];

export function getFeaturedMarketingTemplates(limit = 3): MarketingTemplate[] {
  return marketingTemplates.slice(0, limit);
}
