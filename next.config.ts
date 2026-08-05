import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "makemycv.ae" }],
        destination: "https://www.makemycv.ae/:path*",
        permanent: true,
      },
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/support',
        permanent: true,
      },
      // Old blog slugs (published briefly, then consolidated in 9350db9 and
      // 404ing since). 301 to their successors so any lingering index entries
      // and backlinks land on the live equivalents instead of a 404.
      {
        source: '/blog/chatgpt-write-cv-uae',
        destination: '/blog/can-chatgpt-write-cv',
        permanent: true,
      },
      {
        source: '/blog/best-cv-for-uae-jobs',
        destination: '/blog/best-cv-writers-uae',
        permanent: true,
      },
      // Thin Jan-2026 format guide retired 2026-08-05 — cannibalized the
      // comprehensive cv-format-uae-2026 post (same query intent).
      {
        source: '/blog/uae-cv-format-guide',
        destination: '/blog/cv-format-uae-2026',
        permanent: true,
      },
    ];
  },
};

// withSentryConfig WRAPS the config above — it does not replace it. Both the
// headers() block and the redirects() block (which carries the apex->www
// redirect and the old-blog-slug 301s) are preserved. If you refactor this
// line, verify a redirect still fires:
// `curl -sI https://makemycv.ae/pricing | grep -i location`.
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  // Build-time only; never bundled. Without it the build still succeeds, you
  // just get minified stack traces.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: !process.env.CI,

  // Upload maps to Sentry, then delete them so they are not served publicly.
  widenClientFileUpload: true,
  sourcemaps: { deleteSourcemapsAfterUpload: true },

  // No tunnel — this site ships no CSP, so there is nothing to work around,
  // and proxying would add function invocations to a project that currently
  // runs zero.
  tunnelRoute: undefined,

  reactComponentAnnotation: { enabled: false },

  disableLogger: true,
});
