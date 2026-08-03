import { Check, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

/**
 * Server-rendered hero CV — NOT an image.
 * Facsimile of the Professional (photo) template: the UAE-market document —
 * photo, visa status, nationality and availability up front. Kept in HTML/CSS
 * for crisp scaling; the headshot is an inline illustrated SVG (no fake
 * stock-photo person, no extra request).
 */

function Headshot() {
  return (
    <svg
      viewBox="0 0 96 96"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id="hs-clip">
          <circle cx="48" cy="48" r="48" />
        </clipPath>
        <linearGradient id="hs-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dcebe2" />
          <stop offset="100%" stopColor="#c3ddcf" />
        </linearGradient>
        <linearGradient id="hs-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eec39a" />
          <stop offset="100%" stopColor="#dfa87b" />
        </linearGradient>
        <linearGradient id="hs-blazer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d3a2c" />
          <stop offset="100%" stopColor="#122619" />
        </linearGradient>
      </defs>
      <g clipPath="url(#hs-clip)">
        <rect width="96" height="96" fill="url(#hs-bg)" />
        {/* neck */}
        <path d="M42 52h12v14H42z" fill="url(#hs-skin)" />
        <path d="M42 52h12v6c-4 2.5-8 2.5-12 0v-6z" fill="#d29a6e" />
        {/* face */}
        <ellipse cx="48" cy="38" rx="13.5" ry="15.5" fill="url(#hs-skin)" />
        {/* ears */}
        <circle cx="34.5" cy="39" r="2.6" fill="url(#hs-skin)" />
        <circle cx="61.5" cy="39" r="2.6" fill="url(#hs-skin)" />
        {/* brows */}
        <path
          d="M40.5 34.6c1.6-1.2 3.8-1.4 5.4-.7"
          stroke="#4a3526"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M50.1 33.9c1.6-.7 3.8-.5 5.4.7"
          stroke="#4a3526"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        {/* eyes */}
        <ellipse cx="43.2" cy="38.6" rx="1.7" ry="2" fill="#3a2c22" />
        <ellipse cx="52.8" cy="38.6" rx="1.7" ry="2" fill="#3a2c22" />
        <circle cx="43.8" cy="37.9" r="0.55" fill="#fff" />
        <circle cx="53.4" cy="37.9" r="0.55" fill="#fff" />
        {/* nose */}
        <path
          d="M47.6 41.5c-.3 1.6-.3 2.6.9 3.1"
          stroke="#c78d63"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
        {/* smile */}
        <path
          d="M43.8 48c2.6 2.3 5.8 2.3 8.4 0"
          stroke="#a85c4d"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* blush */}
        <ellipse cx="40" cy="44.5" rx="2.4" ry="1.4" fill="#e2967a" opacity="0.35" />
        <ellipse cx="56" cy="44.5" rx="2.4" ry="1.4" fill="#e2967a" opacity="0.35" />
        {/* hair — parted, swept back to a low bun */}
        <path
          d="M48 20.5c-9.5 0-15.5 6.8-15.5 15.2 0 2.6.4 4.6.9 6.3 1.6-5.6 3.4-8.2 5-9.6 1.1 1.8 4 3.1 9.6 3.1s8.5-1.3 9.6-3.1c1.6 1.4 3.4 4 5 9.6.5-1.7.9-3.7.9-6.3 0-8.4-6-15.2-15.5-15.2z"
          fill="#33281f"
        />
        <circle cx="63.5" cy="30" r="5.5" fill="#33281f" />
        {/* hair sheen */}
        <path
          d="M39 26.5c2.5-2.6 6-4 9-4"
          stroke="#5a4634"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        {/* earring */}
        <circle cx="34.5" cy="42.5" r="1.1" fill="#c49a48" />
        {/* shoulders / blazer */}
        <path
          d="M48 62c-13 0-22.5 6.5-26 16l-2 18h56l-2-18c-3.5-9.5-13-16-26-16z"
          fill="url(#hs-blazer)"
        />
        {/* shirt V */}
        <path d="M41 64.5 48 76l7-11.5c-2-1.2-4.4-1.9-7-1.9s-5 .7-7 1.9z" fill="#fbfaf7" />
        {/* lapels */}
        <path d="M41 64.5 48 76l-5.5 4.5-4.5-14c.6-.8 1.6-1.5 3-2z" fill="#16301f" />
        <path d="M55 64.5 48 76l5.5 4.5 4.5-14c-.6-.8-1.6-1.5-3-2z" fill="#16301f" />
      </g>
    </svg>
  );
}

export function CvPhotoCard() {
  return (
    // One announcement for AT instead of ~30 nodes of fictional personal data.
    <div
      className="relative"
      role="img"
      aria-label="Sample UAE-format CV — photo, visa status, nationality and availability fields, ATS-safe layout"
    >
      {/* Stacked sheets behind — document depth. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-md border border-line bg-sheet/60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-md border border-line bg-sheet/80"
      />

      {/* The document itself. */}
      <div className="relative rounded-md border border-line bg-sheet p-6 shadow-sheet md:p-8">
        {/* Header — centered, photo-first: the UAE format. */}
        <div className="flex flex-col items-center border-b border-line pb-5 text-center">
          <div className="h-20 w-20 overflow-hidden rounded-full ring-2 ring-accent/25 ring-offset-2 ring-offset-sheet md:h-24 md:w-24">
            <Headshot />
          </div>
          <p className="mt-3 font-display text-xl font-bold tracking-tight-1-5 text-ink md:text-2xl">
            AMIRA KHALID
          </p>
          <p className="text-sm font-medium text-ink-2 md:text-[15px]">
            Senior Marketing Manager
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted md:text-xs">
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} /> Dubai, UAE
            </span>
            <span className="inline-flex items-center gap-1">
              <Mail size={12} /> amira.k@email.ae
            </span>
            <span className="inline-flex items-center gap-1">
              <Phone size={12} /> +971 50 000 0000
            </span>
          </div>
          {/* The fields this market screens for, right where recruiters look. */}
          <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[10.5px] font-semibold text-accent-deep">
              Visa: UAE Residence
            </span>
            <span className="rounded-full bg-paper-2 px-2.5 py-0.5 text-[10.5px] font-semibold text-ink-2">
              Available: Immediately
            </span>
            <span className="rounded-full bg-paper-2 px-2.5 py-0.5 text-[10.5px] font-semibold text-ink-2">
              Nationality: Egyptian
            </span>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-5">
          <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted">
            Experience
          </p>
          <div className="mt-2.5">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-ink md:text-[15px]">
                Senior Marketing Manager
              </p>
              <p className="shrink-0 text-[11px] text-muted md:text-xs">
                2021 – Present
              </p>
            </div>
            <p className="text-xs text-muted md:text-[13px]">Careem · Dubai, UAE</p>
            <ul className="mt-2 space-y-1 text-xs leading-snug text-ink-2 md:text-[13px]">
              <li>
                · Scaled GCC campaigns to{" "}
                <span className="font-semibold text-ink">2.1M users</span>, +45%
                YoY engagement
              </li>
              <li>
                · Cut CPA <span className="font-semibold text-ink">32%</span> via
                paid-search restructure
              </li>
              <li>· Managed AED 4.2M media budget across 6 GCC markets</li>
            </ul>
          </div>
        </div>

        {/* Education */}
        <div className="mt-4">
          <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted">
            Education
          </p>
          <div className="mt-1.5 flex items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-ink md:text-[15px]">
              BBA, Marketing
            </p>
            <p className="shrink-0 text-[11px] text-muted md:text-xs">2016</p>
          </div>
          <p className="text-xs text-muted md:text-[13px]">
            American University of Sharjah
          </p>
        </div>

        {/* Skills + languages */}
        <div className="mt-4">
          <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted">
            Skills
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[
              "Performance Marketing",
              "Google Ads",
              "Brand Strategy",
              "GA4",
              "Arabic · English",
            ].map((s) => (
              <span
                key={s}
                className="rounded-full bg-paper-2 px-2.5 py-0.5 text-[11px] text-ink-2 md:text-xs"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating proof chips — the product story, pinned to the document. */}
      <div
        aria-hidden="true"
        className="absolute -top-3.5 right-3 flex items-center gap-1.5 rounded-full border border-line bg-sheet py-1.5 pl-2.5 pr-3.5 shadow-md-soft md:-right-5"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
          <Check size={13} strokeWidth={3} className="text-white" />
        </span>
        <span className="text-xs font-semibold text-ink">ATS-readable</span>
      </div>
      <div
        aria-hidden="true"
        className="absolute -bottom-3.5 left-3 flex items-center gap-1.5 rounded-full border border-line bg-sheet py-1.5 pl-2.5 pr-3.5 shadow-md-soft md:-left-5"
      >
        <ShieldCheck size={15} className="text-gold-deep" />
        <span className="text-xs font-semibold text-ink">
          Visa &amp; nationality fields built in
        </span>
      </div>
    </div>
  );
}
