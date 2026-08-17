import type { Metadata } from "next";

// Canonical entity name. Must match LinkedIn, Crunchbase, Trustpilot, GBP and
// every other owned profile verbatim — inconsistent name strings split the
// entity and are what let makemycv.com/.fr absorb our brand signals.
// "MakeMyCV" survives only as an alternateName in the Organization node.
export const SITE_NAME = "MakeMyCV.ae";
export const SITE_URL = "https://www.makemycv.ae";
export const APP_URL = "https://app.makemycv.ae";
export const DEFAULT_OG_IMAGE = "/og-image.png";
// The 512x512 logo the entity spec calls for, shipped in the 2026-08-02 brand
// drop. A 404 here weakens the Organization node, so keep file and constant in
// sync — /logo-512.png is the canonical copy, the manifest icons are duplicates
// of the same artwork at the sizes each surface expects.
export const ORG_LOGO = "/logo-512.png";
export const ORG_LOGO_SIZE = 512;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const WEBAPP_ID = `${SITE_URL}/#webapp`;
export const LOGO_ID = `${SITE_URL}/#logo`;

/**
 * sameAs — the spine of the entity graph. Binds off-site profiles we own to
 * this domain so engines resolve them to one organisation.
 *
 * HARD RULE: only profiles we own and control. Never add an unclaimed
 * directory listing, and never reference any other makemycv.* property —
 * a sameAs we don't control is an entity-merge risk.
 *
 * Claim order (each becomes another UAE-scoped citation):
 * Google Business Profile > Crunchbase > Trustpilot > X/Instagram
 * (@makemycvae) > Product Hunt > UAE directories.
 */
export const ORG_SAME_AS: readonly string[] = [
  "https://www.linkedin.com/company/makemycv-ae",
  "https://www.instagram.com/makemycv.ae/",
  // Medium syndication profile. A personal handle rather than a publication
  // (Medium publications are a paid feature), but it carries the display name
  // "Abdullah — MakeMyCV.ae", publishes only this site's content, and every
  // story canonicals back to this domain. If the entity graph is ever
  // tightened to org-owned profiles only, this is the single line to remove.
  "https://medium.com/@abdullahportfolio5",
];

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function absoluteUrl(pathname = "/"): string {
  if (/^https?:\/\//.test(pathname)) {
    return pathname;
  }

  const normalizedPath = normalizePath(pathname);
  return normalizedPath === "/" ? SITE_URL : `${SITE_URL}${normalizedPath}`;
}

export function canonicalUrl(pathname = "/"): string {
  return absoluteUrl(pathname);
}

const googleBotDirectives = {
  index: true,
  follow: true,
  "max-image-preview": "large" as const,
  "max-snippet": -1,
};

export const indexableRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: googleBotDirectives,
};

export const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: true,
  googleBot: {
    ...googleBotDirectives,
    index: false,
    follow: true,
  },
};

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  index?: boolean;
  image?: string;
  keywords?: string[];
  /**
   * Emit the title as `{ absolute }`, bypassing the root layout's
   * `title.template`. Only the homepage needs this: Next.js does not apply a
   * layout's template to the page in the SAME route segment, so app/page.tsx
   * silently rendered with no " | MakeMyCV.ae" suffix — and therefore no brand
   * token at all. `absolute` makes that explicit instead of accidental, so the
   * homepage title states the brand itself. Child segments must leave this off
   * or they render a doubled brand.
   */
  titleAbsolute?: boolean;
};

/**
 * Single source of truth for a page's title/description across <title>,
 * og: and twitter:.
 *
 * ALWAYS call this directly. Never spread it and override a field:
 *
 *   // WRONG — <title> changes, og:title keeps the old string
 *   export const metadata = { ...buildPageMetadata({ title: "A", ... }), title: "B" }
 *
 * That pattern shipped a real defect: /jd-match rendered
 * <title>"…CV-vs-Job Description Check…"</title> against
 * og:title "…CV-vs-Job Check…" for as long as the override existed.
 * `keywords` is a parameter here precisely so no page needs the spread.
 */
export function buildPageMetadata({
  title,
  description,
  path = "/",
  index = true,
  image = DEFAULT_OG_IMAGE,
  keywords,
  titleAbsolute = false,
}: BuildPageMetadataOptions): Metadata {
  const url = canonicalUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    // og:/twitter: titles below deliberately reuse the same bare `title`
    // string — they carry no template in any case, so they stay in sync.
    title: titleAbsolute ? { absolute: title } : title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: url,
    },
    robots: index ? indexableRobots : noIndexRobots,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
