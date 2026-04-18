import { Check, Minus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Row = {
  feature: string;
  free: true | false | string;
  pro: true | string;
};

const rows: Row[] = [
  { feature: "CV builder", free: true, pro: true },
  { feature: "All templates", free: true, pro: true },
  { feature: "UAE-specific fields", free: true, pro: true },
  { feature: "Live preview", free: true, pro: true },
  { feature: "PDF export", free: "Watermarked", pro: "Clean" },
  { feature: "AI rewrite suggestions", free: false, pro: true },
  {
    feature: "Priority templates (Executive, Graduate Pro)",
    free: false,
    pro: true,
  },
  {
    feature: "Re-download same CV free for 30 days",
    free: false,
    pro: true,
  },
  { feature: "Email support", free: "Community", pro: "Priority" },
  { feature: "Price", free: "Free", pro: "$5 per download" },
];

function Cell({ value }: { value: true | false | string }) {
  if (value === true) {
    return (
      <Check
        size={18}
        className="mx-auto text-emerald-500"
        strokeWidth={2.5}
        aria-label="Included"
      />
    );
  }
  if (value === false) {
    return (
      <Minus
        size={18}
        className="mx-auto text-slate-400"
        strokeWidth={2.5}
        aria-label="Not included"
      />
    );
  }
  return <span className="text-sm text-slate-700">{value}</span>;
}

export function ComparisonTable() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading title="Compare plans at a glance." />

        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-paper-2">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-eyebrow text-slate-600">
                  Feature
                </th>
                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-eyebrow text-slate-600">
                  Free
                </th>
                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-eyebrow text-brand-blue">
                  Pro
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.feature}
                  className={
                    i < rows.length - 1 ? "border-b border-slate-100" : ""
                  }
                >
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-800">
                    {r.feature}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <Cell value={r.free} />
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <Cell value={r.pro} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
