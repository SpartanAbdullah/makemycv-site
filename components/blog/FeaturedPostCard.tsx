import Link from 'next/link'
import type { Post } from '@/lib/blog'
import { formatDate } from '@/lib/blog'

const categoryEmoji: Record<string, string> = {
  'CV Tips': '\uD83D\uDCC4',
  'UAE Job Market': '\uD83C\uDDE6\uD83C\uDDEA',
  'ATS Guide': '\u2705',
  'Career Advice': '\uD83D\uDCBC',
  'Interview Tips': '\uD83C\uDFAF',
  'Industry Guide': '\uD83D\uDCCA',
}

export function FeaturedPostCard({ post }: { post: Post }) {
  const emoji = categoryEmoji[post.category] ?? '\uD83D\uDCCA'

  return (
    <Link
      href={`/blog/${post.slugPath}`}
      className="group relative flex flex-col md:flex-row rounded-3xl overflow-hidden card-lift border border-slate-200 bg-white"
    >
      {/* Image side */}
      <div className="relative md:w-2/5 h-56 md:h-auto bg-gradient-hero flex-shrink-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <span className="text-8xl relative z-10">{emoji}</span>
        <div className="absolute top-4 left-4">
          <span className="bg-[#2563eb] text-white text-xs font-bold px-3 py-1 rounded-full">
            &#9733; Featured
          </span>
        </div>
      </div>

      {/* Content side */}
      <div className="flex flex-col justify-center p-8 flex-1">
        <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest mb-3">
          {post.category}
        </span>
        <h2 className="text-2xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-[#2563eb] transition-colors">
          {post.title}
        </h2>
        <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">
            {formatDate(post.date)}
          </span>
          <span className="text-sm text-slate-400">&middot;</span>
          <span className="text-sm text-slate-400">
            {post.readingTime ?? 5} min read
          </span>
        </div>
        <div className="mt-4">
          <span className="btn-primary inline-block text-white text-sm font-bold px-6 py-2.5 rounded-xl">
            Read Article &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
