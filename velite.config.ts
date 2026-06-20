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
    // Optional explicit freshness signal for evergreen posts re-edited
    // after publish. Falls back to `date` in schema builders.
    dateModified: s.isodate().optional(),
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
    // Computed reading time + word count from the post body (real, not faked).
    // Surfaced on the blog index; falls back to explicit `readingTime` if set.
    metadata: s.metadata(),
    published: s.boolean().default(true),
    // Optional FAQ array. When present, becomes FAQPage schema. Only add
    // here if the same Q/As are visible on the page — schema must mirror
    // visible content.
    faqs: s
      .array(
        s.object({
          q: s.string().max(160),
          a: s.string().max(800),
        })
      )
      .default([]),
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
