/**
 * Mini-CV previews for the home-page template showcase.
 * Each variant renders realistic UAE-context content sized to be legible
 * at the ~280–320px container width used by the showcase grid.
 */

type Accent = "blue" | "emerald" | "amber" | "slate" | "indigo";
type Variant = "classic" | "modern" | "executive" | "graduate" | "minimal";

const accents: Record<
  Accent,
  { text: string; bg: string; bgSoft: string; chip: string; chipText: string }
> = {
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    bgSoft: "bg-blue-50",
    chip: "bg-blue-100",
    chipText: "text-blue-700",
  },
  emerald: {
    text: "text-emerald-600",
    bg: "bg-emerald-600",
    bgSoft: "bg-emerald-50",
    chip: "bg-emerald-100",
    chipText: "text-emerald-700",
  },
  amber: {
    text: "text-amber-600",
    bg: "bg-amber-600",
    bgSoft: "bg-amber-50",
    chip: "bg-amber-100",
    chipText: "text-amber-700",
  },
  slate: {
    text: "text-slate-700",
    bg: "bg-slate-800",
    bgSoft: "bg-slate-50",
    chip: "bg-slate-100",
    chipText: "text-slate-700",
  },
  indigo: {
    text: "text-indigo-600",
    bg: "bg-indigo-700",
    bgSoft: "bg-indigo-50",
    chip: "bg-indigo-100",
    chipText: "text-indigo-700",
  },
};

type Props = {
  variant: Variant;
  accent?: Accent;
};

export function TemplateThumbnail({ variant, accent = "slate" }: Props) {
  const a = accents[accent];

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 shadow-sm-soft">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/60" />
      <div className="relative h-full w-full">
        {variant === "classic" && <ClassicPreview a={a} />}
        {variant === "executive" && <ExecutivePreview a={a} />}
        {variant === "graduate" && <GraduatePreview a={a} />}
        {variant === "minimal" && <MinimalPreview a={a} />}
        {variant === "modern" && <ModernPreview a={a} />}
      </div>
    </div>
  );
}

type AccentObj = (typeof accents)[Accent];

/* ── Classic — single column, traditional ─────────────────────────── */
function ClassicPreview({ a }: { a: AccentObj }) {
  return (
    <div className="flex h-full flex-col px-4 py-4 text-slate-800">
      <div>
        <h4 className="font-display text-[15px] font-bold leading-tight tracking-tight text-slate-900">
          Omar Al-Hashimi
        </h4>
        <p className={`mt-0.5 text-[10px] font-semibold uppercase tracking-wider ${a.text}`}>
          Senior Finance Manager
        </p>
        <p className="mt-1 text-[8px] text-slate-500">
          Dubai, UAE  ·  omar.h@email.ae  ·  +971 50 4·· ····
        </p>
      </div>

      <div className={`mt-3 h-[1.5px] w-full ${a.bg} opacity-90`} />

      <SectionLabel a={a}>Experience</SectionLabel>
      <Role
        title="Senior Finance Manager"
        org="Emirates NBD · Dubai"
        dates="2021 — Present"
      />
      <Bullets
        items={[
          "Led AED 120M budget across 4 GCC entities",
          "Cut monthly close cycle from 9 to 5 days",
        ]}
      />

      <SectionLabel a={a} className="mt-2.5">Education</SectionLabel>
      <p className="text-[9px] font-semibold text-slate-800">
        CFA Charterholder · 2019
      </p>
      <p className="text-[8.5px] text-slate-500">BSc Finance — AUS</p>

      <SectionLabel a={a} className="mt-2.5">Skills</SectionLabel>
      <ChipRow a={a} items={["IFRS", "SAP", "FP&A", "Power BI"]} />
    </div>
  );
}

/* ── Executive — top color band ───────────────────────────────────── */
function ExecutivePreview({ a }: { a: AccentObj }) {
  return (
    <div className="flex h-full flex-col text-slate-800">
      <div className={`${a.bg} px-4 py-3 text-white`}>
        <h4 className="font-display text-[15px] font-bold leading-tight tracking-tight">
          Layla Khoury
        </h4>
        <p className="mt-0.5 text-[10px] font-medium opacity-95">
          Chief Operating Officer
        </p>
        <p className="mt-1 text-[8px] opacity-80">
          Abu Dhabi  ·  18+ years  ·  GCC & MENA
        </p>
      </div>

      <div className="flex-1 px-4 py-3">
        <SectionLabel a={a}>Profile</SectionLabel>
        <p className="text-[9px] leading-snug text-slate-600">
          Operations leader scaling regional businesses across UAE,
          KSA & Egypt. P&L ownership of $80M+.
        </p>

        <SectionLabel a={a} className="mt-2.5">Leadership</SectionLabel>
        <Role
          title="Chief Operating Officer"
          org="Aldar Properties · Abu Dhabi"
          dates="2020 — Now"
        />
        <Bullets
          items={[
            "Restructured 350-person operations org",
            "Delivered 22% YoY EBITDA growth",
          ]}
        />

        <SectionLabel a={a} className="mt-2.5">Board</SectionLabel>
        <p className="text-[9px] text-slate-700">
          Non-Exec Director · DIFC Fintech Forum
        </p>
      </div>
    </div>
  );
}

/* ── Graduate — fresh, education-forward ──────────────────────────── */
function GraduatePreview({ a }: { a: AccentObj }) {
  return (
    <div className="flex h-full flex-col px-4 py-4 text-slate-800">
      <div className="flex items-start gap-2.5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${a.chip} ${a.chipText} text-[11px] font-bold`}
        >
          AM
        </div>
        <div className="min-w-0">
          <h4 className="font-display text-[14px] font-bold leading-tight text-slate-900">
            Aisha Al-Mansouri
          </h4>
          <p className={`text-[10px] font-semibold ${a.text}`}>
            Marketing Graduate
          </p>
          <p className="text-[8px] text-slate-500">
            Sharjah · UAE National · Visa-ready
          </p>
        </div>
      </div>

      <div className="mt-3 h-px w-full bg-slate-200" />

      <SectionLabel a={a} className="mt-2">Education</SectionLabel>
      <Role
        title="BBA Marketing — Distinction"
        org="American University of Sharjah"
        dates="2024"
      />
      <Bullets items={["GPA 3.78 · Dean's List 6 semesters"]} />

      <SectionLabel a={a} className="mt-2.5">Internship</SectionLabel>
      <Role
        title="Marketing Intern"
        org="Majid Al Futtaim · Dubai"
        dates="Summer '23"
      />
      <Bullets items={["Ran 3 social campaigns for Carrefour UAE"]} />

      <SectionLabel a={a} className="mt-2.5">Skills</SectionLabel>
      <ChipRow a={a} items={["Arabic", "English", "GA4", "Canva"]} />
    </div>
  );
}

/* ── Minimal — clean typographic ──────────────────────────────────── */
function MinimalPreview({ a }: { a: AccentObj }) {
  return (
    <div className="flex h-full flex-col px-5 py-5 text-slate-800">
      <div>
        <h4 className="font-display text-[15px] font-bold leading-tight tracking-tight text-slate-900">
          Rashid Patel
        </h4>
        <p className="mt-0.5 text-[10px] text-slate-500">
          Senior Software Engineer
        </p>
        <p className="mt-1 text-[8px] text-slate-400">
          Dubai  ·  github.com/rpatel  ·  +971 ··
        </p>
      </div>

      <div className="my-3 h-px w-1/3 bg-slate-300" />

      <div className="space-y-2.5">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[10px] font-semibold text-slate-800">
              Staff Engineer
            </p>
            <p className="text-[8px] text-slate-400">2022 — Now</p>
          </div>
          <p className={`text-[9px] ${a.text}`}>Careem · Dubai</p>
          <Bullets
            items={[
              "Owns ride-hailing checkout — 4M req/day",
              "Cut p99 latency 340ms → 90ms",
            ]}
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[10px] font-semibold text-slate-800">
              Senior Engineer
            </p>
            <p className="text-[8px] text-slate-400">2019 — 22</p>
          </div>
          <p className={`text-[9px] ${a.text}`}>Talabat · Dubai</p>
        </div>
      </div>

      <div className="mt-auto pt-2">
        <p className="text-[8px] uppercase tracking-wider text-slate-400">
          Stack
        </p>
        <p className="text-[9px] text-slate-700">
          Go · TypeScript · Postgres · Kafka · AWS
        </p>
      </div>
    </div>
  );
}

/* ── Modern — two-column with sidebar ─────────────────────────────── */
function ModernPreview({ a }: { a: AccentObj }) {
  return (
    <div className="grid h-full grid-cols-[40%_60%] text-slate-800">
      {/* Sidebar */}
      <aside className={`${a.bgSoft} flex h-full flex-col gap-2.5 px-3 py-4`}>
        <div className={`mx-auto h-10 w-10 rounded-full ${a.bg}`} />
        <div className="text-center">
          <p className="font-display text-[11px] font-bold leading-tight text-slate-900">
            Sara Mahmoud
          </p>
          <p className={`text-[8px] font-medium ${a.text}`}>
            Product Designer
          </p>
        </div>

        <div>
          <p className={`text-[8px] font-bold uppercase tracking-wider ${a.text}`}>
            Contact
          </p>
          <p className="mt-0.5 text-[7.5px] leading-relaxed text-slate-600">
            Dubai Marina<br />
            sara.m@email.ae<br />
            +971 55 ··· ····
          </p>
        </div>

        <div>
          <p className={`text-[8px] font-bold uppercase tracking-wider ${a.text}`}>
            Skills
          </p>
          <div className="mt-1 space-y-1">
            {[
              ["Figma", 95],
              ["Design Sys", 85],
              ["Research", 75],
            ].map(([label, pct]) => (
              <div key={label as string}>
                <p className="text-[7.5px] text-slate-700">{label}</p>
                <div className="mt-0.5 h-[3px] w-full rounded bg-white">
                  <div
                    className={`h-full rounded ${a.bg}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className={`text-[8px] font-bold uppercase tracking-wider ${a.text}`}>
            Languages
          </p>
          <p className="text-[7.5px] text-slate-600">
            Arabic · English · French
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-col gap-2.5 px-3 py-4">
        <div>
          <p className={`text-[8px] font-bold uppercase tracking-wider ${a.text}`}>
            Profile
          </p>
          <p className="mt-0.5 text-[8px] leading-snug text-slate-600">
            Product designer shipping fintech UX across MENA. Led
            Mashreq's mobile redesign — +28% activation.
          </p>
        </div>

        <div>
          <p className={`text-[8px] font-bold uppercase tracking-wider ${a.text}`}>
            Experience
          </p>
          <Role
            title="Senior Designer"
            org="Mashreq · Dubai"
            dates="2022 — Now"
            tight
          />
          <Bullets
            items={[
              "Owns mobile banking app lifecycle",
              "Built design system used by 40 engineers",
            ]}
          />

          <div className="mt-1.5">
            <Role
              title="Product Designer"
              org="Noon · Riyadh"
              dates="2019 — 22"
              tight
            />
            <Bullets items={["Checkout redesign — +12% conversion"]} />
          </div>
        </div>

        <div>
          <p className={`text-[8px] font-bold uppercase tracking-wider ${a.text}`}>
            Education
          </p>
          <p className="text-[9px] font-semibold text-slate-800">
            BA Visual Design
          </p>
          <p className="text-[7.5px] text-slate-500">Zayed University · 2019</p>
        </div>
      </main>
    </div>
  );
}

/* ── Shared atoms ─────────────────────────────────────────────────── */

function SectionLabel({
  a,
  children,
  className = "",
}: {
  a: AccentObj;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[8.5px] font-bold uppercase tracking-wider ${a.text} ${className}`.trim()}
    >
      {children}
    </p>
  );
}

function Role({
  title,
  org,
  dates,
  tight = false,
}: {
  title: string;
  org: string;
  dates: string;
  tight?: boolean;
}) {
  return (
    <div className="mt-0.5 flex items-baseline justify-between gap-2">
      <div className="min-w-0">
        <p className={`truncate font-semibold text-slate-800 ${tight ? "text-[9px]" : "text-[10px]"}`}>
          {title}
        </p>
        <p className={`truncate text-slate-500 ${tight ? "text-[7.5px]" : "text-[8.5px]"}`}>
          {org}
        </p>
      </div>
      <p className={`shrink-0 text-slate-400 ${tight ? "text-[7.5px]" : "text-[8px]"}`}>
        {dates}
      </p>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-0.5 space-y-0.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-1 text-[8.5px] leading-snug text-slate-600"
        >
          <span className="text-slate-400">·</span>
          <span className="min-w-0 flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ChipRow({ a, items }: { a: AccentObj; items: string[] }) {
  return (
    <div className="mt-0.5 flex flex-wrap gap-1">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded px-1.5 py-px text-[8px] font-medium ${a.chip} ${a.chipText}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
