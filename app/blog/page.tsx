import type { Metadata } from 'next'
import { getAllPosts, getFeaturedPosts, categories } from '@/lib/blog'
import { PostCard } from '@/components/blog/PostCard'
import { FeaturedPostCard } from '@/components/blog/FeaturedPostCard'
import {
  SITE_NAME,
  absoluteUrl,
  canonicalUrl,
  indexableRobots,
} from '@/lib/seo'

export const metadata: Metadata = {
  title: 'CV Tips & UAE Career Advice | MakeMyCV Blog',
  description: 'Expert CV writing tips, ATS guides, and UAE job market advice from the team at MakeMyCV. Free resources for Dubai and Gulf job seekers.',
  keywords: 'cv tips uae, dubai cv format, ats cv guide, uae job market, cv writing advice dubai',
  alternates: {
    canonical: canonicalUrl('/blog'),
  },
  openGraph: {
    title: 'CV Tips & UAE Career Advice | MakeMyCV Blog',
    description: 'Expert CV writing tips, ATS guides, and UAE job market advice.',
    url: canonicalUrl('/blog'),
    siteName: SITE_NAME,
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: absoluteUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: 'MakeMyCV Blog - UAE CV Tips',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV Tips & UAE Career Advice | MakeMyCV Blog',
    description: 'Expert CV writing tips, ATS guides, and UAE job market advice.',
    images: [absoluteUrl('/og-image.png')],
  },
  robots: indexableRobots,
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()
  const regularPosts = allPosts.filter((p) => !p.featured)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": canonicalUrl("/")
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": canonicalUrl("/blog")
              }
            ]
          })
        }}
      />
      {/* Hero */}
      <section className="relative bg-gradient-hero dot-grid py-20 md:py-28 overflow-hidden">
        <div
          className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }}
        />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
            UAE Career Resources
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            CV &amp; Career Guides
            <br />
            <span className="gradient-text">for UAE Jobs</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Practical, ATS-focused advice for job seekers in Dubai,
            Abu Dhabi, and across the GCC. Written by people who
            know the UAE market.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-slate-300 border border-white/10"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured posts */}
      {featuredPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">
            Featured Guides
          </h2>
          <div className="space-y-6">
            {featuredPosts.map((post) => (
              <FeaturedPostCard key={post.slugPath} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* All posts grid */}
      {regularPosts.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">
              All Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <PostCard key={post.slugPath} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-hero dot-grid py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-4xl font-extrabold text-white mb-4">
            Ready to Apply What You&apos;ve Learned?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Build your ATS-ready UAE CV in minutes. Free, no sign-up.
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
