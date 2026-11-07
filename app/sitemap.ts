import type { MetadataRoute } from 'next'
import { canonicalUrl } from '@/lib/seo'
import { getAllPosts } from '@/lib/blog'
import { HUMAN_REVIEW_ON } from '@/lib/features'

// Google ignores <changefreq> and <priority>, so entries carry only the URL
// and, where we know it, a real lastmod.
const staticPaths = [
  '/',
  '/jd-match',
  '/templates',
  '/resume-checker',
  '/gratuity-calculator',
  '/notice-period-calculator',
  '/annual-leave-calculator',
  '/resignation-letter-generator',
  '/cv-examples-uae',
  '/free-cv-maker-dubai',
  '/blog',
  '/about',
  '/support',
  '/contact',
  '/author/makemycv-team',
  '/privacy',
  ...(HUMAN_REVIEW_ON ? ['/human-cv-review'] : []),
]

// No lastModified for static routes: the previous value was the source
// file's mtime at build time, which every fresh clone/CI build resets, so it
// told crawlers "changed today" on every deploy. Posts keep their real dates.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: canonicalUrl(path),
  }))

  // Only published posts — reuse getAllPosts(), the same published filter the
  // blog listing and [slug] pages use, so drafts never reach the sitemap.
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: canonicalUrl(`/blog/${post.slugPath}`),
    // Mirror the article metadata's freshness fallback so updated evergreen
    // posts report their real dateModified, not just the original publish date.
    lastModified: new Date(post.dateModified ?? post.date),
  }))

  return [
    ...staticEntries,
    ...blogEntries,
  ]
}
