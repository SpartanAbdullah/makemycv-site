/**
 * Realistic mini-CV previews for the home-page template showcase.
 * Renders actual sample content (name, role, experience, skills) styled per template.
 * Sample data is UAE-relevant — names, employers, locations, role framings.
 */

type Accent = "blue" | "emerald" | "amber" | "slate" | "indigo";
type Variant = "classic" | "modern" | "executive" | "graduate" | "minimal";

const accents: Record<
  Accent,
  { text: string; bg: string; bgSoft: string; chip: string; chipText: string; border: string }
> = {
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    bgSoft: "bg-blue-50",
    chip: "bg-blue-100",
    chipText: "text-blue-700",
    border: "border-blue-200",
  },
  emerald: {
    text: "text-emerald-600",
    bg: "bg-emerald-600",
    bgSoft: "bg-emerald-50",
    chip: "bg-emerald-100",
    chipText: "text-emerald-700",
    border: "border-emerald-200",
  },
  amber: {
    text: "text-amber-600",
    bg: "bg-amber-600",
    bgSoft: "bg-amber-50",
    chip: "bg-amber-100",
    chipText: "text-amber-700",
    border: "border-amber-200",
  },
  slate: {
    text: "text-slate-700",
    bg: "bg-slate-800",
    bgSoft: "bg-slate-50",
    chip: "bg-slate-100",
    chipText: "text-slate-700",
    border: "border-slate-200",
  },
  indigo: {
    text: "text-indigo-600",
    bg: "bg-indigo-700",
    bgSoft: "bg-indigo-50",
    chip: "bg-indigo-100",
    chipText: "text-indigo-700",
    border: "border-indigo-200",
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
      {/* paper sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50" />

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
    <div className="flex h-full flex-col p-[5%] text-slate-800">
      <div>
        <h4 className="font-display text-[11px] font-bold leading-tight tracking-tight text-slate-900">
          Omar Al-Hashimi
        </h4>
        <p className={`text-[7px] font-semibold uppercase tracking-wider ${a.text}`}>
          Finance Manager · DIFC
        </p>
        <p className="mt-0.5 text-[6px] text-slate-500">
          Dubai, UAE · omar.h@email.ae · +971 50 ••• ••••
        </p>
      </div>

      <div className={`my-2 h-px w-full ${a.bg} opacity-80`} />

      <Section label="Experience" a={a}>
        <Role
          title="Senior Finance Manager"
          org="Emirates NBD · Dubai"
          dates="2021 — Present"
        />
        <Bullet>Led AED 120M budget across 4 GCC entities</Bullet>
        <Bullet>Cut monthly close cycle from 9 to 5 days</Bullet>
      </Section>

      <Section label="Education" a={a}>
        <p className="text-[6.5px] font-semibold text-slate-800">CFA Charterholder · 2019</p>
        <p className="text-[6px] text-slate-500">BSc Finance — AUS</p>
      </Section>

      <Section label="Skills" a={a}>
        <ChipRow a={a} items={["IFRS", "SAP", "FP&A", "Power BI", "VAT"]} />
      </Section>
    </div>
  );
}

/* ── Executive — top color band, confident hierarchy ──────────────── */
function ExecutivePreview({ a }: { a: AccentObj }) {
  return (
    <div className="flex h-full flex-col text-slate-800">
      <div className={`${a.bg} px-[5%] py-2.5 text-white`}>
        <h4 className="font-display text-[11px] font-bold leading-tight tracking-tight">
          Layla Khoury
        </h4>
        <p className="text-[7px] font-medium opacity-90">
          Chief Operating Officer
        </p>
        <p className="mt-0.5 text-[6px] opacity-75">
          Abu Dhabi · 18+ years · GCC, MENA
        </p>
      </div>

      <div className="flex-1 px-[5%] py-2">
        <Section label="Profile" a={a}>
          <p className="text-[6.5px] leading-snug text-slate-600">
            Operations leader scaling regional businesses across UAE,
            KSA & Egypt. P&L ownership of $80M+.
          </p>
        </Section>

        <Section label="Leadership" a={a}>
          <Role title="COO" org="Aldar Properties · Abu Dhabi" dates="2020 — Present" />
          <Bullet>Restructured 350-person operations org</Bullet>
          <Bullet>Delivered 22% YoY EBITDA growth</Bullet>
        </Section>

        <Section label="Board & Advisory" a={a}>
          <p className="text-[6.5px] text-slate-700">
            Non-Exec Director · DIFC Fintech Forum
          </p>
        </Section>
      </div>
    </div>
  );
}

/* ── Graduate — fresh, education-forward ──────────────────────────── */
function GraduatePreview({ a }: { a: AccentObj }) {
  return (
    <div className="flex h-full flex-col p-[5%] text-slate-800">
      <div className="flex items-start gap-2">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${a.chip} ${a.chipText} text-[7px] font-bold`}
        >
          AM
        </div>
        <div className="min-w-0">
          <h4 className="font-display text-[10.5px] font-bold leading-tight text-slate-900">
            Aisha Al-Mansouri
          </h4>
          <p className={`text-[7px] font-semibold ${a.text}`}>
            Marketing Graduate · Open to UAE
          </p>
          <p className="text-[6px] text-slate-500">
            Sharjah · UAE National · Visa-ready
          </p>
        </div>
      </div>

      <div className="my-2 h-px w-full bg-slate-200" />

      <Section label="Education" a={a}>
        <Role
          title="BBA Marketing — Distinction"
          org="American University of Sharjah"
          dates="2024"
        />
        <Bullet>GPA 3.78 · Dean's List 6 semesters</Bullet>
      </Section>

      <Section label="Internship" a={a}>
        <Role title="Marketing Intern" org="Majid Al Futtaim · Dubai" dates="Summer 2023" />
        <Bullet>Ran 3 social campaigns for Carrefour UAE</Bullet>
      </Section>

      <Section label="Skills" a={a}>
        <ChipRow a={a} items={["Arabic", "English", "GA4", "Canva", "HubSpot"]} />
      </Section>
    </div>
  );
}

/* ── Minimal — clean typographic, no chrome ───────────────────────── */
function MinimalPreview({ a }: { a: AccentObj }) {
  return (
    <div className="flex h-full flex-col p-[6%] text-slate-800">
      <div>
        <h4 className="font-display text-[11px] font-bold leading-tight tracking-tight text-slate-900">
          Rashid Patel
        </h4>
        <p className="text-[7px] text-slate-500">
          Senior Software Engineer
        </p>
        <p className="mt-1 text-[6px] text-slate-400">
          Dubai · github.com/rpatel · +971 ••
        </p>
      </div>

      <div className="my-3 h-px w-1/3 bg-slate-300" />

      <div className="space-y-2.5">
        <div>
          <div className="flex items-baseline justify-between">
            <p className="text-[7px] font-semibold text-slate-800">
              Staff Engineer
            </p>
            <p className="text-[5.5px] text-slate-400">2022—Now</p>
          </div>
          <p className={`text-[6px] ${a.text}`}>Careem · Dubai</p>
          <div className="mt-0.5 space-y-0.5">
            <Bullet>Owns ride-hailing checkout — 4M req/day</Bullet>
            <Bullet>Cut p99 latency 340ms → 90ms</Bullet>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <p className="text-[7px] font-semibold text-slate-800">
              Senior Engineer
            </p>
            <p className="text-[5.5px] text-slate-400">2019—22</p>
          </div>
          <p className={`text-[6px] ${a.text}`}>Talabat · Dubai</p>
        </div>
      </div>

      <div className="mt-auto pt-2">
        <p className="text-[5.5px] uppercase tracking-wider text-slate-400">Stack</p>
        <p className="text-[6.5px] text-slate-700">
          Go · TypeScript · Postgres · Kafka · AWS
        </p>
      </div>
    </div>
  );
}

/* ── Modern — two-column with sidebar ─────────────────────────────── */
function ModernPreview({ a }: { a: AccentObj }) {
  return (
    <div className="grid h-full grid-cols-[38%_62%] text-slate-800">
      {/* Sidebar */}
      <aside className={`${a.bgSoft} flex h-full flex-col gap-2 p-[6%]`}>
        <div className={`mx-auto h-8 w-8 rounded-full ${a.bg}`} />
        <div className="text-center">
          <p className="font-display text-[9px] font-bold leading-tight text-slate-900">
            Sara Mahmoud
          </p>
          <p className={`text-[6px] font-medium ${a.text}`}>
            Product Designer
          </p>
        </div>

        <div>
          <p className={`text-[6px] font-bold uppercase tracking-wider ${a.text}`}>
            Contact
          </p>
          <p className="text-[5.5px] leading-relaxed text-slate-600">
            Dubai Marina<br />
            sara.m@email.ae<br />
            +971 55 ••• ••••
          </p>
        </div>

        <div>
          <p className={`text-[6px] font-bold uppercase tracking-wider ${a.text}`}>
            Skills
          </p>
          <div className="mt-0.5 space-y-0.5">
            {[
              ["Figma", 95],
              ["Design Systems", 88],
              ["Prototyping", 82],
              ["User Research", 75],
            ].map(([label, pct]) => (
              <div key={label as string}>
                <p className="text-[5.5px] text-slate-700">{label}</p>
                <div className="h-[2px] w-full rounded bg-white">
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
          <p className={`text-[6px] font-bold uppercase tracking-wider ${a.text}`}>
            Languages
          </p>
          <p className="text-[5.5px] text-slate-600">Arabic · English · French</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-col gap-2 p-[6%]">
        <div>
          <p className={`text-[6px] font-bold uppercase tracking-wider ${a.text}`}>
            Profile
          </p>
          <p className="text-[6px] leading-snug text-slate-600">
            Product designer shipping fintech UX across MENA. Led
            redesign of Mashreq's mobile app — +28% activation.
          </p>
        </div>

        <div>
          <p className={`text-[6px] font-bold uppercase tracking-wider ${a.text}`}>
            Experience
          </p>
          <Role title="Senior Designer" org="Mashreq · Dubai" dates="2022 — Now" />
          <Bullet>Owns lifecycle of mobile banking app</Bullet>
          <Bullet>Built design system used by 40 engineers</Bullet>

          <div className="mt-1.5">
            <Role title="Product Designer" org="Noon · Riyadh" dates="2019 — 22" />
            <Bullet>Checkout redesign — +12% conversion</Bullet>
          </div>
        </div>

        <div>
          <p className={`text-[6px] font-bold uppercase tracking-wider ${a.text}`}>
            Education
          </p>
          <p className="text-[6.5px] font-semibold text-slate-800">
            BA Visual Design
          </p>
          <p className="text-[5.5px] text-slate-500">Zayed University · 2019</p>
        </div>
      </main>
    </div>
  );
}

/* ── Shared atoms ─────────────────────────────────────────────────── */

function Section({
  label,
  a,
  children,
}: {
  label: string;
  a: AccentObj;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-1.5 first:mt-0">
      <p
        className={`text-[6px] font-bold uppercase tracking-wider ${a.text}`}
      >
        {label}
      </p>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

function Role({
  title,
  org,
  dates,
}: {
  title: string;
  org: string;
  dates: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <div className="min-w-0">
        <p className="truncate text-[7px] font-semibold text-slate-800">
          {title}
        </p>
        <p className="truncate text-[6px] text-slate-500">{org}</p>
      </div>
      <p className="shrink-0 text-[5.5px] text-slate-400">{dates}</p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-1 text-[6px] leading-snug text-slate-600">
      <span className="text-slate-400">·</span>
      <span className="min-w-0 flex-1">{children}</span>
    </div>
  );
}

function ChipRow({ a, items }: { a: AccentObj; items: string[] }) {
  return (
    <div className="flex flex-wrap gap-0.5">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-sm px-1 py-px text-[5.5px] font-medium ${a.chip} ${a.chipText}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
