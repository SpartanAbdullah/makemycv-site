import {
  FileCheck2,
  FileUp,
  Globe2,
  Lock,
  Sparkles,
  Target,
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
    title: "UAE-optimised throughout",
    body: "Emirate, visa status, nationality, attestation, languages — built in and optional, with UAE-aware examples and suggestions as you write.",
  },
  {
    icon: FileUp,
    title: "Import your existing CV",
    body: "Bring a PDF or DOCX and we read it in your browser \u2014 never uploaded. You review every field before it\u2019s added.",
  },
  {
    icon: Target,
    title: "Tailor to each job",
    body: "JD Match focuses your CV on one role and lets you download a tailored copy, while your master CV keeps everything.",
  },
  {
    icon: Sparkles,
    title: "Honest AI rewriting",
    body: "Rewords what you actually did to surface a job\u2019s keywords. When it can\u2019t do that truthfully, it declines rather than invent.",
  },
  {
    icon: Lock,
    title: "Your data stays in your browser",
    body: "No accounts, no CV uploads, no databases. Only the job text you paste is sent for analysis. Close the tab, it\u2019s gone.",
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
