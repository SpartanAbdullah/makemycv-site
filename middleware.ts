import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge 404 guard for automated path sweeps.
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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    BOT_PERSONAS.test(pathname) ||
    BOT_PATHS.test(pathname) ||
    BOT_STATIC.test(pathname)
  ) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
