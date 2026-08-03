import { Check, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

/**
 * Server-rendered hero CV — NOT an image.
 * Facsimile of the Professional (photo) template: the UAE-market document —
 * photo, visa status, nationality and availability up front. Kept in HTML/CSS
 * for crisp scaling. The headshot is a real photograph (Unsplash License,
 * photo id 0GySOsRq-fE / photo-1771240730278-55a716725567, facearea crop) —
 * the market expects a photo slot with a photo in it, not an illustration.
 */


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
            {/* eslint-disable-next-line @next/next/no-img-element -- 18KB fixed-size asset; next/image buys nothing at 96px */}
            <img
              src="/static/cv-photo-amira.jpg"
              alt=""
              width={320}
              height={320}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
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
