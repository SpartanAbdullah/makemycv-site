import { defineConfig, defineCollection, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s.object({
    title: s.string().max(100),
    slug: s.path(),
    excerpt: s.string().max(300),
    date: s.isodate(),
    author: s.string().default('MakeMyCV Team'),
    category: s.enum([
      'CV Tips',
      'UAE Job Market',
      'ATS Guide',
      'Career Advice',
      'Interview Tips',
      'Industry Guide',
    ]),
    tags: s.array(s.string()).default([]),
    coverImage: s.string().default('/blog/default-cover.png'),
    featured: s.boolean().default(false),
    readingTime: s.number().optional(),
    published: s.boolean().default(true),
    body: s.mdx(),
  })
  .transform((data) => ({
    ...data,
    slugPath: data.slug.replace('blog/', ''),
  })),
})

const templates = defineCollection({
  name: 'Template',
  pattern: 'templates/**/*.mdx',
  schema: s.object({
    name: s.string().max(50),
    slug: s.slug('templates').optional(),
    positioning: s.string().max(120),
    tags: s.array(s.string()).default([]),
    thumbnail: s.string().default(''),
    accent: s.enum(['blue', 'emerald', 'amber', 'slate', 'indigo']).default('blue'),
    order: s.number().default(100),
    pro: s.boolean().default(false),
    published: s.boolean().default(true),
  })
  .transform((data, { meta }) => ({
    ...data,
    slug: data.slug ?? meta.path.split(/[\\/]/).pop()!.replace(/\.mdx$/, ''),
  })),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, templates },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
})
