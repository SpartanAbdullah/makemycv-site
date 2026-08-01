/**
 * JSON-LD schema builders.
 *
 * All builders return plain objects (or arrays/graphs of them) suitable
 * for <JsonLd data={...}>. None of them touch the DOM, window, or any
 * client-only API — they're safe to call from server components,
 * generateMetadata, or layout files.
 *
 * Schema must mirror visible on-page content. If a builder accepts FAQ
 * items, only pass items whose Q/A is actually on the page.
 */
import type { Post } from "@/lib/blog";
import {
  APP_URL,
  DEFAULT_OG_IMAGE,
  LOGO_ID,
  ORGANIZATION_ID,
  ORG_LOGO,
  ORG_LOGO_SIZE,
  ORG_SAME_AS,
  SITE_NAME,
  SITE_URL,
  WEBAPP_ID,
  WEBSITE_ID,
  absoluteUrl,
  canonicalUrl,
} from "@/lib/seo";

const AUTHOR_PAGE_PATH = "/author/makemycv-team";
const ABOUT_PAGE_PATH = "/about";
const CONTACT_EMAIL = "hello@makemycv.ae";
const LOGO_URL = absoluteUrl(ORG_LOGO);

/**
 * Canonical short description. Used verbatim in the Organization node and on
 * every owned off-site profile — matching strings across surfaces is what
 * makes engines resolve them to one entity.
 */
const ORG_DESCRIPTION =
  "Free ATS-friendly CV builder made in Dubai for job seekers applying in the UAE and the wider GCC.";

/**
 * The disambiguation payload. A machine-readable claim that this organisation
 * serves the UAE and the GCC — the territorial statement that separates this
 * entity from the similarly-named European operators.
 */
const GCC_AREA_SERVED = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Oman",
  "Bahrain",
].map((name) => ({ "@type": "Country", name }));

/* ──────────────────────────────────────────────────────────────────── */
/* Entity primitives                                                    */
/* ──────────────────────────────────────────────────────────────────── */

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    // Keeps the pre-rename brand string attached to this entity instead of
    // floating free for another makemycv.* property to claim.
    alternateName: ["MakeMyCV", "MakeMyCV UAE"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: LOGO_URL,
      width: ORG_LOGO_SIZE,
      height: ORG_LOGO_SIZE,
      caption: SITE_NAME,
    },
    image: { "@id": LOGO_ID },
    description: ORG_DESCRIPTION,
    foundingDate: "2026",
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: GCC_AREA_SERVED,
    knowsAbout: [
      "CV writing for UAE jobs",
      "ATS-friendly CV formatting",
      "UAE CV format",
      "Dubai CV format",
      "GCC hiring standards",
      "Visa status on a CV",
    ],
    founder: { "@type": "Person", name: "Abdullah" },
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "customer support",
      areaServed: "AE",
      availableLanguage: ["English", "Arabic"],
    },
    // Omitted entirely when empty — an empty sameAs is noise, and a sameAs
    // pointing at a profile we don't control is an entity-merge risk.
    ...(ORG_SAME_AS.length > 0 ? { sameAs: [...ORG_SAME_AS] } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en-AE",
    publisher: { "@id": ORGANIZATION_ID },
  } as const;
}

/**
 * WebApplication schema for the builder. Per the spec (§1.3) this is what
 * makes AI say "MakeMyCV.ae is a free CV builder for the UAE" instead of
 * guessing. We deliberately do NOT include aggregateRating — Google's
 * guidelines require real, verifiable review data, and fake ratings risk a
 * manual penalty.
 *
 * WebApplication (not the broader SoftwareApplication) because the builder is
 * browser-only. Emitted site-wide from app/layout.tsx as the third node of the
 * entity graph — do NOT also emit it per-page, or pages carry a duplicate
 * @id and the graph stops resolving to one entity.
 */
export function webApplicationSchema() {
  return {
    "@type": "WebApplication",
    "@id": WEBAPP_ID,
    name: `${SITE_NAME} CV Builder`,
    url: APP_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    browserRequirements: "Requires JavaScript",
    description:
      "Free ATS-optimized CV builder with a dedicated UAE Essentials step (visa status, Emirates ID, nationality, driving licence, notice period) and optional photo per template. No sign-up, no paywall, data stays in the browser.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "ATS-parseable structure",
      "UAE Essentials step (visa status, Emirates ID, nationality, driving licence)",
      "Optional photo — on or off per application",
      "Instant PDF/DOCX export",
      "Live preview",
      "AI bullet-point rewriter",
      "Browser-only data (no accounts)",
    ],
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en-AE",
  } as const;
}

/* ──────────────────────────────────────────────────────────────────── */
/* Composable helpers                                                   */
/* ──────────────────────────────────────────────────────────────────── */

type FaqItem = { q: string; a: string };

export function faqPageSchema(items: ReadonlyArray<FaqItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  } as const;
}

type BreadcrumbItem = { name: string; item?: string };

export function breadcrumbSchema(items: ReadonlyArray<BreadcrumbItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => {
      const listItem: Record<string, unknown> = {
        "@type": "ListItem",
        position: index + 1,
        name: entry.name,
      };
      if (entry.item) listItem.item = entry.item;
      return listItem;
    }),
  } as const;
}

/* ──────────────────────────────────────────────────────────────────── */
/* Blog post schema graph                                               */
/* ──────────────────────────────────────────────────────────────────── */

/**
 * Returns the full schema graph for a single blog post:
 *   Article + Person (author) + BreadcrumbList + (conditional) FAQPage.
 *
 * - `author` is a Person bylined to the post's `author` field, linked to
 *   /about (the spec requires Person + linked author page).
 * - `dateModified` defaults to `date` if the post doesn't override.
 * - FAQPage is only emitted when the post's frontmatter declares `faqs`
 *   AND that array is non-empty. We never fabricate Q/As.
 *
 * Consumers wrap this in <JsonLd data={postSchema(post)} />.
 */
/**
 * Normalize whatever Velite hands us (Date, ISO string, etc) to a clean
 * YYYY-MM-DD that matches the spec's schema examples. Engines accept both
 * formats but date-only avoids leaking a meaningless 00:00:00.000Z time.
 */
function toIsoDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string") {
    return value.slice(0, 10);
  }
  return new Date(String(value)).toISOString().slice(0, 10);
}

export function postSchema(post: Post) {
  const postPath = `/blog/${post.slugPath}`;
  const postUrl = canonicalUrl(postPath);
  const imageUrl = absoluteUrl(post.coverImage ?? DEFAULT_OG_IMAGE);
  const datePublished = toIsoDate(post.date);
  const dateModified = toIsoDate(post.dateModified ?? post.date);

  const article: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${postUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: post.author,
      url: canonicalUrl(ABOUT_PAGE_PATH),
    },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en-AE",
    isPartOf: { "@id": WEBSITE_ID },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: canonicalUrl("/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  const author = {
    "@type": "Person",
    name: post.author,
    url: canonicalUrl(AUTHOR_PAGE_PATH),
    description:
      "MakeMyCV editorial team writing about UAE and Gulf job market CV strategy.",
    worksFor: { "@id": ORGANIZATION_ID },
  };

  const graph: Array<Record<string, unknown>> = [article, breadcrumb, author];

  if (post.faqs && post.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  } as const;
}
