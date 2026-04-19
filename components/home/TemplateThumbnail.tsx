/**
 * CSS-only placeholder styled to resemble a CV card.
 * TODO: Before launch, replace with real PNG renders of each template in public/templates/{slug}.png
 */

type Accent = "blue" | "emerald" | "amber" | "slate" | "indigo";

const accents: Record<Accent, { bar: string; tag: string }> = {
  blue: { bar: "bg-blue-500", tag: "bg-blue-100" },
  emerald: { bar: "bg-emerald-500", tag: "bg-emerald-100" },
  amber: { bar: "bg-amber-500", tag: "bg-amber-100" },
  slate: { bar: "bg-slate-700", tag: "bg-slate-200" },
  indigo: { bar: "bg-indigo-600", tag: "bg-indigo-100" },
};

type Props = {
  variant: "classic" | "modern" | "executive" | "graduate" | "minimal";
  accent?: Accent;
};

export function TemplateThumbnail({ variant, accent = "slate" }: Props) {
  const a = accents[accent];
  const isTwoCol = variant === "modern";
  const hasTopBar = variant === "executive" || variant === "modern";

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 ring-1 ring-slate-200">
      {/* Optional header bar */}
      {hasTopBar && (
        <div className={`absolute inset-x-0 top-0 h-8 ${a.bar}`} />
      )}

      <div
        className={`relative flex h-full w-full ${hasTopBar ? "pt-10" : "pt-5"} px-5 pb-5`}
      >
        {isTwoCol ? (
          <div className="grid w-full grid-cols-[1fr_2fr] gap-3">
            {/* Sidebar */}
            <div className="space-y-2.5">
              <div className="h-2 w-10 rounded bg-slate-300" />
              <div className="h-1.5 w-full rounded bg-slate-200" />
              <div className="h-1.5 w-5/6 rounded bg-slate-200" />
              <div className="mt-3 h-2 w-8 rounded bg-slate-300" />
              <div className="space-y-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`h-1.5 rounded ${a.tag}`} style={{ width: `${95 - i * 10}%` }} />
                ))}
              </div>
            </div>
            {/* Main */}
            <div className="space-y-3">
              <div>
                <div className="h-3 w-3/4 rounded bg-slate-800" />
                <div className="mt-1 h-2 w-1/2 rounded bg-slate-400" />
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-full rounded bg-slate-200" />
                <div className="h-1.5 w-11/12 rounded bg-slate-200" />
                <div className="h-1.5 w-3/4 rounded bg-slate-200" />
              </div>
              <div className={`h-1.5 w-8 rounded ${a.bar}`} />
              <div className="space-y-1">
                <div className="h-1.5 w-full rounded bg-slate-200" />
                <div className="h-1.5 w-10/12 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-3">
            {/* Header */}
            <div>
              <div className="h-3.5 w-2/3 rounded bg-slate-800" />
              <div className="mt-1.5 h-2 w-2/5 rounded bg-slate-400" />
              <div className="mt-1.5 flex gap-1.5">
                <div className="h-1.5 w-10 rounded bg-slate-300" />
                <div className="h-1.5 w-12 rounded bg-slate-300" />
                <div className="h-1.5 w-8 rounded bg-slate-300" />
              </div>
            </div>

            <div className={`h-[2px] w-full ${a.bar} opacity-80`} />

            {/* Section 1 */}
            <div className="space-y-1.5">
              <div className={`h-2 w-16 rounded ${a.bar}`} />
              <div className="h-1.5 w-full rounded bg-slate-200" />
              <div className="h-1.5 w-11/12 rounded bg-slate-200" />
              <div className="h-1.5 w-3/4 rounded bg-slate-200" />
            </div>

            {/* Section 2 */}
            <div className="space-y-1.5">
              <div className={`h-2 w-14 rounded ${a.bar}`} />
              <div className="h-1.5 w-full rounded bg-slate-200" />
              <div className="h-1.5 w-4/5 rounded bg-slate-200" />
            </div>

            {/* Skills tags */}
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded ${a.tag}`}
                  style={{ width: `${28 + (i % 3) * 10}px` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
