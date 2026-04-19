import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { canonicalUrl } from '@/lib/seo'

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
    path: '/author/makemycv-team',
    sourceFile: 'app/author/makemycv-team/page.tsx',
    changeFrequency: 'monthly',
    priority: 0.5,
  },
]

function getLastModified(filePath: string): Date {
  return fs.statSync(path.join(process.cwd(), filePath)).mtime
}

function getBlogFiles(): Array<{ slug: string; filePath: string }> {
  const contentDir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(contentDir)) return []

  return fs
    .readdirSync(contentDir)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(fileName => ({
      slug: fileName.replace(/\.(mdx|md)$/, ''),
      filePath: path.join(contentDir, fileName),
    }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: canonicalUrl(route.path),
    lastModified: getLastModified(route.sourceFile),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = getBlogFiles().map(({ slug, filePath }) => ({
    url: canonicalUrl(`/blog/${slug}`),
    lastModified: fs.statSync(filePath).mtime,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticEntries,
    ...blogEntries,
  ]
}
