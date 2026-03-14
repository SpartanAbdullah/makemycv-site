import Link from 'next/link'

export function AuthorBlock() {
  return (
    <div className="flex items-start gap-5 mt-14 pt-10 border-t border-slate-200">
      {/* Avatar */}
      <div
        className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-white font-bold text-xl"
        style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
        aria-label="MakeMyCV Team avatar"
      >
        MC
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <Link
            href="/author/makemycv-team"
            className="font-bold text-slate-900 hover:text-[#2563eb] transition-colors text-base"
          >
            MakeMyCV Team
          </Link>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
            UAE CV Specialists
          </span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">
          The MakeMyCV editorial team specialises in UAE and Gulf job market careers.
          We write practical, ATS-focused CV guides for students, fresh graduates,
          and professionals navigating Dubai and Abu Dhabi&apos;s hiring landscape.
        </p>
        <Link
          href="/author/makemycv-team"
          className="inline-block mt-2 text-xs font-semibold text-[#2563eb] hover:underline"
        >
          More articles by this author →
        </Link>
      </div>
    </div>
  )
}