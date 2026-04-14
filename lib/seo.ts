import type { Metadata } from "next";

export const SITE_NAME = "MakeMyCV";
export const SITE_URL = "https://www.makemycv.ae";
export const APP_URL = "https://app.makemycv.ae";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const WEBAPP_ID = `${SITE_URL}/#webapp`;

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
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  index = true,
  image = DEFAULT_OG_IMAGE,
}: BuildPageMetadataOptions): Metadata {
  const url = canonicalUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
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
