import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/blog'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'MakeMyCV Team - UAE CV and Career Specialists',
  description:
    'The MakeMyCV editorial team writes practical, ATS-focused CV guides for UAE and Gulf job seekers.',
  path: '/author/makemycv-team',
})

export default function AuthorPage() {
  const allPosts = getAllPosts().filter((p) => p.author === 'MakeMyCV Team')

  return (
    <>
      {/* Hero — warm-paper skin (Part 3 reskin): paper band + green wash
          instead of the legacy dark hero band. */}
      <section className="relative bg-paper py-16 md:py-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 55% at 76% 32%, rgba(14, 124, 74, 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div
              className="w-24 h-24 rounded-3xl flex-shrink-0 flex items-center justify-center text-white font-bold text-3xl shadow-cta"
              style={{ background: 'linear-gradient(135deg, #0e7c4a 0%, #0a5c37 100%)' }}
            >
              MC
            </div>

            <div>
              <p className="font-mono text-[11px] text-accent font-semibold uppercase tracking-[0.14em] mb-2">Author</p>
              <h1 className="font-display text-4xl font-bold tracking-tight-2 text-ink mb-2">
                MakeMyCV Team
              </h1>
              <p className="text-muted text-sm">
                UAE CV &amp; Career Specialists · Based in Dubai
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-2xl">
            <p className="text-ink-2 text-lg leading-relaxed">
              The MakeMyCV editorial team specialises in CV writing, ATS optimisation,
              and career strategy for the UAE and Gulf job market. Our guides are written
              specifically for students, fresh graduates, expats, and professionals
              navigating hiring in Dubai, Abu Dhabi, and Sharjah.
            </p>
          </div>

          {/* Credentials */}
          <div className="flex flex-wrap gap-3 mt-6">
            {['UAE Job Market', 'ATS Optimisation', 'CV Writing', 'Gulf Careers', 'Dubai Hiring'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-paper-2 text-ink-2 border border-line"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-line bg-sheet">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-2xl font-bold text-ink">{allPosts.length}</p>
              <p className="text-xs text-muted mt-0.5">Articles published</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-ink">UAE</p>
              <p className="text-xs text-muted mt-0.5">Market focus</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-ink">ATS</p>
              <p className="text-xs text-muted mt-0.5">Optimised content</p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl font-bold tracking-tight-2 text-ink mb-8">
          All Articles
        </h2>
        <div className="space-y-4">
          {allPosts.map((post) => (
            <Link
              key={post.slugPath}
              href={`/blog/${post.slugPath}`}
              className="group flex items-start gap-5 p-5 rounded-2xl border border-line bg-sheet hover:border-line-strong hover:shadow-md-soft transition-all"
            >
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-xs"
                style={{ background: 'linear-gradient(135deg, #0e7c4a 0%, #0a5c37 100%)' }}
              >
                {post.category.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </p>
                <p className="text-sm text-muted mt-1 line-clamp-1">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-muted">{formatDate(post.date)}</span>
                  <span className="text-xs text-line-strong">·</span>
                  <span className="text-xs text-muted">{post.readingTime ?? 5} min read</span>
                  <span className="text-xs text-line-strong">·</span>
                  <span className="text-xs font-medium text-accent">{post.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
