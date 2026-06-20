import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { canonicalUrl } from '@/lib/seo'
import { getAllPosts } from '@/lib/blog'

type SitemapEntry = {
  path: string
  sourceFile: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  priority: number
}

const staticRoutes: SitemapEntry[] = [
  {
    path: '/',
    sourceFile: 'app/page.tsx',
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    path: '/jd-match',
    sourceFile: 'app/jd-match/page.tsx',
    changeFrequency: 'weekly',
    priority: 0.95,
  },
  {
    path: '/templates',
    sourceFile: 'app/templates/page.tsx',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/resume-checker',
    sourceFile: 'app/resume-checker/page.tsx',
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    path: '/blog',
    sourceFile: 'app/blog/page.tsx',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    path: '/about',
    sourceFile: 'app/about/page.tsx',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/support',
    sourceFile: 'app/support/page.tsx',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/author/makemycv-team',
    sourceFile: 'app/author/makemycv-team/page.tsx',
    changeFrequency: 'monthly',
    priority: 0.5,
  },
]

function getLastModified(filePath: string): Date {
  return fs.statSync(path.join(process.cwd(), filePath)).mtime
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: canonicalUrl(route.path),
    lastModified: getLastModified(route.sourceFile),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Only published posts — reuse getAllPosts(), the same published filter the
  // blog listing and [slug] pages use, so drafts never reach the sitemap.
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: canonicalUrl(`/blog/${post.slugPath}`),
    // Mirror the article metadata's freshness fallback so updated evergreen
    // posts report their real dateModified, not just the original publish date.
    lastModified: new Date(post.dateModified ?? post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticEntries,
    ...blogEntries,
  ]
}
