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

/*
 * Matcher (narrowed 2026-11-04). In Next 16 the proxy runs as a Vercel
 * function, so every match spends Fluid Active CPU — and the old catch-all
 * ran on every image, font and icon (~9.6K runs a day, the site's whole CPU
 * line, with the free team at its 4-hour limit). Two kinds of entry now:
 *   1. the bot sweeps, always: their probes often carry file extensions
 *      (`/static/js/main.js`, `/personashttp:/x.nl`), so they are listed
 *      explicitly rather than reached through the page pattern;
 *   2. page paths (no dot in the path) ONLY while the region cookie is
 *      missing — once a visitor has it there is nothing left to stamp.
 * A new BOT_PATHS prefix needs an entry in (1) as well, or its dotted probes
 * fall through to the React not-found page again.
 *
 * Named crawlers skip the page entry (2026-11-07). They never keep cookies, so
 * each of their page requests ran the proxy to stamp a cookie nobody reads.
 * The list names crawlers on purpose. Do NOT replace it with a bare "bot"
 * match: a missing cookie reads as non-EU in lib/consent.ts, so a real EU
 * visitor caught by the rule would get analytics on by default, and real
 * phones such as Cubot have "bot" in their user agent.
 * Bot sweeps in (1) still run for everyone, crawlers included.
 */
export const config = {
  matcher: [
    "/static/js/:path*",
    "/static/media/:path*",
    "/(personas.*)",
    "/(ingresa-tus-datos|autenticacion|assets|en|home|login|groups|article)",
    "/(ingresa-tus-datos|autenticacion|assets|en|home|login|groups|article)/:path*",
    {
      source: "/((?!api|_next/static|_next/image|.*\\..*).*)",
      // = GEO_COOKIE; Next reads `config` statically, so it must be a literal.
      missing: [
        { type: "cookie", key: "mmcv_geo" },
        {
          type: "header",
          key: "user-agent",
          value:
            ".*(Googlebot|GoogleOther|Google-InspectionTool|AdsBot-Google|Mediapartners-Google|Storebot-Google|bingbot|BingPreview|msnbot|adidxbot|GPTBot|OAI-SearchBot|ChatGPT-User|PerplexityBot|Perplexity-User|ClaudeBot|Claude-User|Claude-SearchBot|meta-webindexer|meta-externalagent|meta-externalfetcher|facebookexternalhit|Amazonbot|Applebot|AhrefsBot|SemrushBot|MJ12bot|DotBot|PetalBot|YandexBot|Baiduspider|DuckDuckBot|Bytespider|CCBot|DataForSeoBot|BLEXBot|LinkedInBot|Twitterbot|TelegramBot|Slackbot|Discordbot|SentryUptimeBot).*",
        },
      ],
    },
  ],
};
