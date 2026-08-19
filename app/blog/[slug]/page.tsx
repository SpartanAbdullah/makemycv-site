import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts, getRelatedPosts, formatDate } from '@/lib/blog'
import { MDXContent } from '@/lib/mdx'
import { AuthorBlock } from '@/components/blog/AuthorBlock'
import { SharePost } from '@/components/blog/SharePost'
import { JsonLd } from '@/components/seo/JsonLd'
import { postSchema } from '@/lib/seo-schema'
import {
  SITE_NAME,
  absoluteUrl,
  canonicalUrl,
  indexableRobots,
} from '@/lib/seo'
import { rasterCover } from '@/lib/og-image'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slugPath }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const ogImageUrl = rasterCover(post.coverImage)
  const postCanonicalUrl = canonicalUrl(`/blog/${post.slugPath}`)
  const modifiedTime = post.dateModified ?? post.date

  return {
    // Layout's metadata.title.template appends " | MakeMyCV" — don't double it.
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author, url: canonicalUrl('/about') }],
    alternates: {
      canonical: postCanonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postCanonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_AE',
      type: 'article',
      publishedTime: post.date,
      modifiedTime,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: absoluteUrl(ogImageUrl),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [absoluteUrl(ogImageUrl)],
      site: '@makemycvae',
      creator: '@makemycvae',
    },
    robots: indexableRobots,
  }
}

const categoryEmoji: Record<string, string> = {
  'CV Tips': '\uD83D\uDCC4',
  'UAE Job Market': '\uD83C\uDDE6\uD83C\uDDEA',
  'ATS Guide': '\u2705',
  'Career Advice': '\uD83D\uDCBC',
  'Interview Tips': '\uD83C\uDFAF',
  'Industry Guide': '\uD83D\uDCCA',
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(post)
  const emoji = categoryEmoji[post.category] ?? '\uD83D\uDCCA'

  return (
    <>
      {/* Article + Person (author) + BreadcrumbList + (conditional) FAQPage —
          all derived from the post's Velite frontmatter. Future posts
          inherit this automatically. */}
      <JsonLd data={postSchema(post)} />
      {/* Hero — warm-paper skin (Part 3 reskin): paper band + green wash
          instead of the legacy dark hero band. */}
      <section className="relative bg-paper py-16 md:py-24 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 55% at 76% 32%, rgba(14, 124, 74, 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-ink transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-ink-2 line-clamp-1">{post.title}</span>
          </nav>

          <span className="mb-4 inline-block rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-deep">
            {post.category}
          </span>

          <h1 className="font-display text-[clamp(34px,4vw,52px)] font-bold text-ink leading-[1.1] tracking-tight-2 mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-muted leading-relaxed mb-8 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <Link href="/author/makemycv-team" className="hover:text-accent transition-colors">
              By {post.author}
            </Link>
            <span>&middot;</span>
            <span>{formatDate(post.date)}</span>
            {post.dateModified && post.dateModified !== post.date && (
              <>
                <span aria-hidden="true">·</span>
                <span>Updated {formatDate(post.dateModified)}</span>
              </>
            )}
            <span>&middot;</span>
            <span>{post.readingTime ?? 5} min read</span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
        <div className="rounded-[28px] overflow-hidden shadow-float">
          <img
            src={post.coverImage ?? '/og-image.png'}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>
      </div>

      {/* Content + Sidebar */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Article content */}
          <article className="flex-1 min-w-0">
            <div className="prose prose-stone prose-lg max-w-none prose-headings:font-bold prose-headings:text-ink prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-code:bg-paper-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-l-accent prose-blockquote:bg-accent-soft prose-blockquote:px-6 prose-blockquote:py-1 prose-blockquote:rounded-r-xl prose-li:text-ink-2">
              <MDXContent code={post.body} />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-line">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-paper-2 text-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share row — absolute URL, since share targets reject relative paths */}
            <SharePost
              url={canonicalUrl(`/blog/${post.slugPath}`)}
              title={post.title}
            />

            {/* Author block */}
            <AuthorBlock />
          </article>

          {/* Sticky sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">

              {/* CTA card */}
              <div className="rounded-2xl bg-sheet p-6 shadow-float">
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="font-display font-semibold text-xl text-ink mb-2">
                  Ready to build your CV?
                </h3>
                <p className="text-muted text-sm mb-5 leading-relaxed">
                  Apply everything in this guide instantly.
                  Free, ATS-ready, 5 minutes.
                </p>
                <a
                  href="https://app.makemycv.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary block text-center text-white font-semibold py-3 text-sm"
                >
                  Build My CV Free &rarr;
                </a>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="font-semibold text-accent text-[11px] uppercase tracking-[0.14em] mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slugPath}
                        href={`/blog/${related.slugPath}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-paper-2 flex items-center justify-center text-xl flex-shrink-0">
                          {categoryEmoji[related.category] ?? '\uD83D\uDCBC'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-ink group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                            {related.title}
                          </p>
                          <p className="text-xs text-muted mt-1">
                            {related.readingTime ?? 5} min read
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* Bottom CTA — dark green closing band (dark is allowed here, navy is not) */}
      <section className="bg-accent-deep py-20 text-center text-white">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-[36px] md:text-[48px] font-bold leading-[1.05] tracking-tight-2 text-white mb-4">
            Put This Into Practice
          </h2>
          <p className="text-white/75 mb-8">
            Build your UAE CV right now. Free, ATS-ready, no sign-up.
          </p>
          <a
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-accent-deep font-semibold text-lg px-10 py-4 rounded-full shadow-md transition-all duration-200 hover:-translate-y-px hover:bg-paper"
          >
            Build My CV Free &rarr;
          </a>
        </div>
      </section>
    </>
  )
}
