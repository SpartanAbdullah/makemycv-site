import Link from 'next/link'
import type { Post } from '@/lib/blog'
import { formatDate } from '@/lib/blog'

const categoryColors: Record<string, string> = {
  'CV Tips': 'bg-blue-50 text-blue-700',
  'UAE Job Market': 'bg-emerald-50 text-emerald-700',
  'ATS Guide': 'bg-violet-50 text-violet-700',
  'Career Advice': 'bg-amber-50 text-amber-700',
  'Interview Tips': 'bg-rose-50 text-rose-700',
  'Industry Guide': 'bg-slate-100 text-slate-700',
}

const categoryEmoji: Record<string, string> = {
  'CV Tips': '\uD83D\uDCC4',
  'UAE Job Market': '\uD83C\uDDE6\uD83C\uDDEA',
  'ATS Guide': '\u2705',
  'Career Advice': '\uD83D\uDCBC',
  'Interview Tips': '\uD83C\uDFAF',
  'Industry Guide': '\uD83D\uDCCA',
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slugPath}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden card-lift hover:border-blue-200"
    >
      {/* Cover image */}
      <div className="relative h-48 w-full overflow-hidden flex-shrink-0 bg-slate-900">
        <img
          src={post.coverImage ?? '/og-image.png'}
          alt={post.title}
          width={600}
          height={315}
          className="w-full h-full object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category + reading time */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] ?? 'bg-slate-100 text-slate-600'}`}>
            {post.category}
          </span>
          <span className="text-xs text-slate-400">
            {post.readingTime ?? 5} min read
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-[#2563eb] transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-4">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
          <span className="text-xs text-slate-400">
            {formatDate(post.date)}
          </span>
          <span className="text-xs font-semibold text-[#2563eb] group-hover:underline">
            Read &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
