import type { Metadata } from 'next'
import { getAllPosts, categories as ALL_CATEGORIES, formatDate } from '@/lib/blog'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/seo-schema'
import {
  SITE_NAME,
  absoluteUrl,
  canonicalUrl,
  indexableRobots,
} from '@/lib/seo'
import { plusJakarta, ibmPlexMono } from './fonts'
import { BlogIndexClient, type CardPost } from '@/components/blog/BlogIndexClient'

export const metadata: Metadata = {
  // Layout template appends " | MakeMyCV" — don't include it here.
  title: 'CV Tips & UAE Career Advice',
  description:
    'Expert CV writing tips, ATS guides, and UAE job market advice from the team at MakeMyCV. Free resources for Dubai and Gulf job seekers.',
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
  const posts = getAllPosts()

  // Lightweight, serialisable shape for the Client Component (no MDX body code).
  const cards: CardPost[] = posts.map((p) => ({
    slugPath: p.slugPath,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.date,
    dateFormatted: formatDate(p.date),
    readingTime: p.readingTime ?? p.metadata?.readingTime ?? 5,
    coverImage: p.coverImage,
    featured: p.featured,
    author: p.author,
  }))

  // Category tabs derived from posts that actually exist (canonical order).
  const counts = new Map<string, number>()
  for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
  const categories = ALL_CATEGORIES.filter((c) => counts.has(c)).map((name) => ({
    name,
    count: counts.get(name)!,
  }))

  return (
    <div
      className={`${plusJakarta.variable} ${ibmPlexMono.variable} bg-[#0a0f1e] text-white`}
      style={{ fontFamily: 'var(--font-plus-jakarta)' }}
    >
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', item: canonicalUrl('/') },
          { name: 'Blog', item: canonicalUrl('/blog') },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-spotlight" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-8 pt-14 md:pt-20">
          <p className="mb-5 inline-flex items-center gap-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.14em] text-[#34d399]">
            <span className="h-2 w-2 rounded-full bg-[#34d399]" aria-hidden="true" />
            MakeMyCV · Career Guides
          </p>
          <h1
            className="max-w-3xl text-[clamp(2.1rem,5.2vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.02em]"
            style={{ textWrap: 'balance' }}
          >
            Career guides for the{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg,#60a5fa,#34d399)' }}
            >
              UAE job market
            </span>
            .
          </h1>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/65">
            Practical, ATS-focused advice for job seekers in Dubai, Abu Dhabi and
            across the GCC — written by the MakeMyCV team. Free, no sign-up.
          </p>
        </div>
      </section>

      {/* Search + filter + grid (Client) */}
      <BlogIndexClient posts={cards} categories={categories} />

      {/* Closing CTA */}
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-[-0.02em]">
            Ready to build your UAE CV?
          </h2>
          <p className="mt-3 text-white/65">
            Put these guides into practice. Free, ATS-ready, no sign-up.
          </p>
          <a
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            data-event="blog_cta_click"
            className="btn-primary mt-7 inline-block rounded-xl px-8 py-4 text-base font-bold text-white"
          >
            Build My CV Free &rarr;
          </a>
        </div>
      </section>
    </div>
  )
}
