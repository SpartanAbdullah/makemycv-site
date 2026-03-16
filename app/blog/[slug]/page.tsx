import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts, getRelatedPosts, formatDate } from '@/lib/blog'
import { MDXContent } from '@/lib/mdx'
import { AuthorBlock } from '@/components/blog/AuthorBlock'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slugPath }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const ogImageUrl = `/blog/covers/${post.slugPath}.png`
  const canonicalUrl = `https://makemycv.ae/blog/${post.slugPath}`

  return {
    title: `${post.title} | MakeMyCV`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author, url: 'https://makemycv.ae' }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: 'MakeMyCV',
      locale: 'en_AE',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `https://makemycv.ae${ogImageUrl}`,
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
      images: [`https://makemycv.ae${ogImageUrl}`],
      site: '@makemycvae',
      creator: '@makemycvae',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
              "@type": "Organization",
              "name": "MakeMyCV",
              "url": "https://makemycv.ae"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MakeMyCV",
              "url": "https://makemycv.ae",
              "logo": {
                "@type": "ImageObject",
                "url": "https://makemycv.ae/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://makemycv.ae/blog/${post.slugPath}`
            },
            "image": {
              "@type": "ImageObject",
              "url": `https://makemycv.ae/blog/covers/${post.slugPath}.png`,
              "width": 1200,
              "height": 630
            },
            "keywords": post.tags.join(', '),
            "articleSection": post.category,
            "inLanguage": "en-AE"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://makemycv.ae" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://makemycv.ae/blog" },
              { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://makemycv.ae/blog/${post.slugPath}` }
            ]
          })
        }}
      />
      {/* Hero */}
      <section className="relative bg-gradient-hero dot-grid py-16 md:py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-300 line-clamp-1">{post.title}</span>
          </nav>

          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 block">
            {post.category}
          </span>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <Link href="/author/makemycv-team" className="hover:text-blue-400 transition-colors">
              By {post.author}
            </Link>
            <span>&middot;</span>
            <span>{formatDate(post.date)}</span>
            <span>&middot;</span>
            <span>{post.readingTime ?? 5} min read</span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
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
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-[#2563eb] prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-l-[#2563eb] prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-1 prose-blockquote:rounded-r-xl prose-li:text-slate-600">
              <MDXContent code={post.body} />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-slate-200">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author block */}
            <AuthorBlock />
          </article>

          {/* Sticky sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">

              {/* CTA card */}
              <div
                className="rounded-2xl p-6 text-white"
                style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 100%)',
                  border: '1px solid rgba(37,99,235,0.3)',
                  boxShadow: '0 0 40px rgba(37,99,235,0.1)',
                }}
              >
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="font-display font-bold text-lg mb-2">
                  Ready to build your CV?
                </h3>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                  Apply everything in this guide instantly.
                  Free, ATS-ready, 5 minutes.
                </p>
                <a
                  href="https://app.makemycv.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary block text-center text-white font-bold py-3 rounded-xl text-sm"
                >
                  Build My CV Free &rarr;
                </a>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slugPath}
                        href={`/blog/${related.slugPath}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl flex-shrink-0">
                          {categoryEmoji[related.category] ?? '\uD83D\uDCBC'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-[#2563eb] transition-colors line-clamp-2 leading-snug">
                            {related.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
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

      {/* Bottom CTA */}
      <section className="bg-gradient-hero dot-grid py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl font-extrabold text-white mb-4">
            Put This Into Practice
          </h2>
          <p className="text-slate-300 mb-8">
            Build your UAE CV right now. Free, ATS-ready, no sign-up.
          </p>
          <a
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block text-white font-bold text-lg px-10 py-4 rounded-2xl"
          >
            Build My CV Free &rarr;
          </a>
        </div>
      </section>
    </>
  )
}
