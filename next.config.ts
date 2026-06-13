import type { NextConfig } from "next";

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
        // Consolidated the duplicate "UAE CV format" guides (2026-06): the 2025
        // post is fully superseded by cv-format-uae-2026. 301 to preserve any
        // inbound links/rankings and avoid keyword cannibalization.
        source: '/blog/uae-cv-format-guide',
        destination: '/blog/cv-format-uae-2026',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
