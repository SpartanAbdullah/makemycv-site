import { NextResponse, type NextRequest } from "next/server";
import { GEO_COOKIE, geoBucket } from "./lib/consent";

/**
 * Edge 404 guard for automated path sweeps.
 *
 * Renamed from middleware.ts → proxy.ts (Next 16 convention; the old name
 * logged a deprecation on every build). Same matcher, same behaviour.
 *
 * WHY: the Next.js not-found page is a React route, so every scanner probe
 * rendered it, fired a `page_view`, and became a fake user + session in GA4.
 * Over the 28 days to 9 Aug 2026 that was ~229 views / ~226 "users", every one
 * at exactly 1.00 views-per-user and 0s engagement — making "Page not found"
 * the second-biggest page on the site and inflating users by roughly 23%.
 * Returning a bare 404 here short-circuits before React (and therefore before
 * GTM) ever loads. It also cuts Vercel function invocations.
 *
 * The path list is observational, taken from the GA4 hostname/page report —
 * a Spanish-CMS path list plus generic probes. It is deliberately NOT a
 * catch-all: anything not proven to be bot traffic keeps rendering normally.
 *
 * ⚠️ DO NOT broaden `/static`. `public/static/cv-photo-amira.jpg` is a real,
 * referenced asset. Only the two subtrees the scanners actually hit
 * (`/static/js`, `/static/media`) are blocked. Blocking `/static` wholesale
 * would silently break a live image.
 *
 * ⚠️ `/en` and `/login` are blocked because nothing serves them today. If an
 * English locale prefix is ever added, or the marketing domain ever proxies
 * auth, REMOVE the matching entry here first — otherwise the new route 404s
 * with no error anywhere to explain it.
 */

// Prefix match, not boundary-anchored: the scanners also request malformed
// variants like `/personashttp:/iphoneservicelimburg.nl`. No real route on this
// site begins with "personas".
const BOT_PERSONAS = /^\/personas/;

const BOT_PATHS =
  /^\/(ingresa-tus-datos|autenticacion|assets|en|home|login|groups|article)(\/|$)/;

const BOT_STATIC = /^\/static\/(js|media)(\/|$)/;

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    BOT_PERSONAS.test(pathname) ||
    BOT_PATHS.test(pathname) ||
    BOT_STATIC.test(pathname)
  ) {
    return new NextResponse(null, { status: 404 });
  }

  // Region bucket for the consent default (2026-10-24): EU/UK/CH visitors
  // start with analytics denied. Only the bucket is stored, never the
  // country. See lib/consent.ts.
  const res = NextResponse.next();
  if (!request.cookies.get(GEO_COOKIE)) {
    res.cookies.set(GEO_COOKIE, geoBucket(request.headers.get("x-vercel-ip-country")), {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
    });
  }
  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
