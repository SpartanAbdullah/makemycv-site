import {
  Download,
  Eye,
  FileCheck2,
  Globe2,
  Lock,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";

type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    icon: FileCheck2,
    title: "ATS-parseable by default",
    body: "Tested against the same parsers used by UAE banks, telcos, and DIFC firms. No broken columns. No lost formatting.",
  },
  {
    icon: Globe2,
    title: "UAE-specific fields",
    body: "Nationality, visa status, Emirates ID, driving licence, languages — all built-in, all optional.",
  },
  {
    icon: Download,
    title: "Instant PDF export",
    body: "One click, clean PDF. Free download comes with a light watermark. Pro removes it for $5.",
  },
  {
    icon: Eye,
    title: "Live preview as you type",
    body: "No \u201Chit save to see it\u201D. See every change the moment you type it.",
  },
  {
    icon: Sparkles,
    title: "AI rewriter (Pro)",
    body: "Turns \u201Cresponsible for managing team\u201D into \u201CLed 8-person operations team, reduced fulfilment time 22%\u201D.",
  },
  {
    icon: Lock,
    title: "Your data stays in your browser",
    body: "No accounts, no uploads, no databases. Close the tab, it\u2019s gone.",
  },
];

export function FeatureGrid() {
  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Built around how UAE hiring actually works."
          subcopy="Every feature exists because a recruiter, HR manager, or job seeker told us it mattered."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md-soft"
            >
              <IconBadge icon={f.icon} tone="blue" />
              <h3 className="mt-4 font-display text-base font-bold text-slate-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
