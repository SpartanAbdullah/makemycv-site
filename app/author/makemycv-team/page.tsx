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
      {/* Hero */}
      <section className="relative bg-gradient-hero dot-grid py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div
              className="w-24 h-24 rounded-3xl flex-shrink-0 flex items-center justify-center text-white font-bold text-3xl"
              style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)', boxShadow: '0 0 40px rgba(37,99,235,0.3)' }}
            >
              MC
            </div>

            <div>
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">Author</p>
              <h1 className="font-display text-4xl font-extrabold text-white mb-2">
                MakeMyCV Team
              </h1>
              <p className="text-slate-400 text-sm">
                UAE CV &amp; Career Specialists · Based in Dubai
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-2xl">
            <p className="text-slate-300 text-lg leading-relaxed">
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
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-slate-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-2xl font-bold text-slate-900">{allPosts.length}</p>
              <p className="text-xs text-slate-500 mt-0.5">Articles published</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">UAE</p>
              <p className="text-xs text-slate-500 mt-0.5">Market focus</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">ATS</p>
              <p className="text-xs text-slate-500 mt-0.5">Optimised content</p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">
          All Articles
        </h2>
        <div className="space-y-4">
          {allPosts.map((post) => (
            <Link
              key={post.slugPath}
              href={`/blog/${post.slugPath}`}
              className="group flex items-start gap-5 p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-xs"
                style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
              >
                {post.category.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 group-hover:text-[#2563eb] transition-colors leading-snug">
                  {post.title}
                </p>
                <p className="text-sm text-slate-500 mt-1 line-clamp-1">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-slate-400">{formatDate(post.date)}</span>
                  <span className="text-xs text-slate-300">·</span>
                  <span className="text-xs text-slate-400">{post.readingTime ?? 5} min read</span>
                  <span className="text-xs text-slate-300">·</span>
                  <span className="text-xs font-medium text-blue-600">{post.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
