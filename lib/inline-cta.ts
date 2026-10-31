/**
 * Inline CTA attribution for links inside article bodies.
 *
 * The [data-event] dispatcher in app/layout.tsx tracks `cta_click` on the
 * navbar, footer, sidebar, end-band and 404 CTAs, but until 2026-10-31 a link
 * written in MDX (`[the builder](https://app.makemycv.ae)`) carried nothing,
 * so the GA4 `cta_click` report could not see which product links inside
 * articles people actually use. `inlineCtaAttrs()` derives the data-*
 * attributes for an href that points at a product destination and returns
 * nothing for everything else (blog-to-blog links, external sources, mailto:),
 * which stays untracked by design.
 *
 * Ids are `blog_inline_<target>`; `target` is derived from the href so a
 * writer never has to annotate a link by hand. Keep the target list in sync
 * with the GA4 `cta_id` report when a product surface is added or renamed.
 */

export type InlineCtaTarget =
  | "builder"
  | "checker"
  | "jd_match"
  | "cv_maker_dubai"
  | "gratuity"
  | "notice"
  | "leave"
  | "resignation"
  | "cover_letter"
  | "linkedin_message";

const APP_HOSTS = new Set(["app.makemycv.ae"]);
const SITE_HOSTS = new Set(["makemycv.ae", "www.makemycv.ae"]);

/** Routes inside the app (app.makemycv.ae). Anything else on that host is the builder. */
const APP_PATHS: Record<string, InlineCtaTarget> = {
  "/": "builder",
  "/builder": "builder",
  "/resume-checker": "checker",
  "/jd-match": "jd_match",
  "/cover-letter": "cover_letter",
  "/linkedin-message": "linkedin_message",
};

/** Product routes on this site (relative hrefs or makemycv.ae absolute URLs). */
const SITE_PATHS: Record<string, InlineCtaTarget> = {
  "/resume-checker": "checker",
  "/jd-match": "jd_match",
  "/free-cv-maker-dubai": "cv_maker_dubai",
  "/gratuity-calculator": "gratuity",
  "/notice-period-calculator": "notice",
  "/annual-leave-calculator": "leave",
  "/resignation-letter-generator": "resignation",
};

function normalisePath(pathname: string): string {
  const bare = pathname.split(/[?#]/)[0].replace(/\/+$/, "");
  return bare === "" ? "/" : bare;
}

/**
 * Map an href to the product surface it opens, or null when it is not a
 * product link (blog posts, external sources, anchors, mailto:, ...).
 */
export function inlineCtaTarget(href: string | undefined | null): InlineCtaTarget | null {
  if (!href) return null;

  if (href.startsWith("/")) {
    if (href.startsWith("//")) return null; // protocol-relative, not a site path
    return SITE_PATHS[normalisePath(href)] ?? null;
  }

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null; // "#faq", "../x" and other relative forms are never product links
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const path = normalisePath(url.pathname);
  if (APP_HOSTS.has(url.hostname)) return APP_PATHS[path] ?? "builder";
  if (SITE_HOSTS.has(url.hostname)) return SITE_PATHS[path] ?? null;
  return null;
}

export type InlineCtaAttrs = {
  "data-event": "cta_click";
  "data-cta-id": `blog_inline_${InlineCtaTarget}`;
  "data-cta-location": "blog_body";
};

export type CtaAttrs = {
  "data-event": "cta_click";
  "data-cta-id": string;
  "data-cta-location": string;
};

/**
 * The same convention for a hand-placed CTA (hero buttons, cards, calculator
 * result blocks): one `cta_click` event name for every product CTA, the CTA
 * itself named by a stable snake_case `cta_id` (`<page>_<placement>_<action>`)
 * and its slot by `cta_location`. Until 2026-10-31 most of these carried
 * their own event names (`home_hero_cta_click`, `*_cross_link_click`, ...),
 * which no GTM trigger matched, so none of them ever reached GA4.
 */
export function ctaAttrs(id: string, location: string): CtaAttrs {
  return { "data-event": "cta_click", "data-cta-id": id, "data-cta-location": location };
}

/**
 * The data-* attributes the [data-event] dispatcher reads, for a product href;
 * undefined for every other link so the caller can spread it unconditionally.
 */
export function inlineCtaAttrs(href: string | undefined | null): InlineCtaAttrs | undefined {
  const target = inlineCtaTarget(href);
  if (!target) return undefined;
  return {
    "data-event": "cta_click",
    "data-cta-id": `blog_inline_${target}`,
    "data-cta-location": "blog_body",
  };
}
