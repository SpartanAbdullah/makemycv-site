import { Highlighter, ListChecks, FileDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = {
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
  points: string[];
};

// Exported so app/jd-match/page.tsx can build HowTo JSON-LD from the same
// source as the visible steps — schema mirrors on-page content, can't drift.
export const steps: Step[] = [
  {
    icon: Highlighter,
    tag: "Heatmap",
    title: "Read the job. See where you stand.",
    body: "We light up the actual job description you paste — green where your CV already covers a requirement, amber where there's a gap. No dense report to decode. You read the real job ad and see exactly what's missing.",
    points: [
      "Every requirement marked matched or missing",
      "Grouped by skills, tools, certifications and keywords",
      "Score band, not a pass/fail verdict",
    ],
  },
  {
    icon: ListChecks,
    tag: "Guided Coach",
    title: "Fix the gaps that move the needle first.",
    body: "Instead of a wall of gaps, the coach walks you through the highest-impact fixes one at a time — and shows the score lift each one earns, so you spend your effort where it counts.",
    points: [
      "Highest-impact gaps first",
      "See the score lift before you commit",
      "Your score updates live as you fix",
    ],
  },
  {
    icon: FileDown,
    tag: "Tailor & download",
    title: "A focused CV for every application.",
    body: "Tailor your CV to that one role and download a copy built for it — while your master CV keeps everything. A fresh, focused application each time, without rewriting from scratch or losing your full history.",
    points: [
      "Download a per-job, tailored copy",
      "Your master CV stays complete",
      "No starting over for the next role",
    ],
  },
];

export function JdMatchSteps() {
  return (
    <section id="how-jd-match-works" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How JD Match works"
          title="From a job ad to a CV built for it."
          subcopy="Paste any job description. JD Match shows you the gap, walks you through closing it, and lets you download a version tailored to that role."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <article
              key={s.tag}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                  <s.icon size={22} strokeWidth={2} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-eyebrow text-slate-500">
                  {`Step ${i + 1} · ${s.tag}`}
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold leading-snug text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                {s.body}
              </p>

              <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm text-slate-700">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          From DIFC banking roles to ADNOC and Emaar project teams, JD Match
          reads the job ad back to you and shows exactly where your CV falls
          short &mdash; the fastest way to see why an application isn&rsquo;t
          landing.
        </p>
      </div>
    </section>
  );
}
