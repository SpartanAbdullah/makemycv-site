import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

function getBlogSlugs(): string[] {
  const contentDir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(contentDir)) return []
  return fs
    .readdirSync(contentDir)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => f.replace(/\.(mdx|md)$/, ''))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getBlogSlugs()

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `https://makemycv.ae/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://makemycv.ae',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://makemycv.ae/templates',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: 'https://makemycv.ae/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://makemycv.ae/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://makemycv.ae/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: 'https://makemycv.ae/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    ...blogEntries,
  ]
}
