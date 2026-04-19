import { Mail, MapPin, Phone } from "lucide-react";

/**
 * Server-rendered mini CV card — NOT an image.
 * Visual facsimile of the Classic template. Kept in HTML/CSS for perf + crisp scaling.
 */
export function CvPreviewCard() {
  return (
    <div
      className="relative rounded-2xl bg-white p-6 md:p-7"
      style={{
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {/* Live Preview pill */}
      <div className="absolute -top-3 right-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white shadow-md">
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        Live Preview
      </div>

      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <p className="font-display text-xl font-bold tracking-tight-1-5 text-slate-900">
          SARAH AL-RASHIDI
        </p>
        <p className="text-sm font-medium text-slate-600">
          Senior Marketing Manager
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1">
            <MapPin size={11} /> Dubai, UAE
          </span>
          <span className="inline-flex items-center gap-1">
            <Mail size={11} /> sarah.r@email.com
          </span>
          <span className="inline-flex items-center gap-1">
            <Phone size={11} /> +971 50 000 0000
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            Residence Visa
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            UAE Driving Licence
          </span>
        </div>
      </div>

      {/* Experience */}
      <div className="mt-4">
        <p className="text-[10px] font-bold uppercase tracking-eyebrow text-slate-400">
          Experience
        </p>
        <div className="mt-2">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-slate-900">
              Senior Marketing Manager
            </p>
            <p className="shrink-0 text-[11px] text-slate-500">2021 – Present</p>
          </div>
          <p className="text-xs text-slate-500">Emirates Group · Dubai</p>
          <ul className="mt-1.5 space-y-0.5 text-[11px] leading-snug text-slate-700">
            <li>
              · Led GCC digital campaigns reaching{" "}
              <span className="font-semibold text-slate-900">2.1M users</span>, +45% YoY engagement
            </li>
            <li>
              · Cut CPA{" "}
              <span className="font-semibold text-slate-900">32%</span> via
              paid-search restructure
            </li>
            <li>
              · Managed AED 4.2M annual marketing budget across 6 markets
            </li>
          </ul>
        </div>
      </div>

      {/* Education */}
      <div className="mt-3.5">
        <p className="text-[10px] font-bold uppercase tracking-eyebrow text-slate-400">
          Education
        </p>
        <div className="mt-1.5 flex items-baseline justify-between gap-2">
          <p className="text-sm font-semibold text-slate-900">BBA, Marketing</p>
          <p className="shrink-0 text-[11px] text-slate-500">2016</p>
        </div>
        <p className="text-xs text-slate-500">
          American University of Sharjah
        </p>
      </div>

      {/* Skills */}
      <div className="mt-3.5">
        <p className="text-[10px] font-bold uppercase tracking-eyebrow text-slate-400">
          Skills
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[
            "Digital Marketing",
            "Google Ads",
            "HubSpot",
            "Brand Strategy",
            "GA4",
            "Arabic",
          ].map((s) => (
            <span
              key={s}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
