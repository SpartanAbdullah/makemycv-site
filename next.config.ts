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
    ];
  },
};

export default nextConfig;
