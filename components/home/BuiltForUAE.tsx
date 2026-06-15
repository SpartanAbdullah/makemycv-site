import {
  MapPin,
  BadgeCheck,
  Languages,
  Stamp,
  Building2,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Item = { icon: LucideIcon; title: string; body: string };

const items: Item[] = [
  {
    icon: BadgeCheck,
    title: "Visa status & availability",
    body: "The fields Gulf recruiters look for first — visa status, notice period, availability — built in and optional.",
  },
  {
    icon: MapPin,
    title: "Emirate & location",
    body: "Dubai, Abu Dhabi, Sharjah and the wider GCC — location framed the way regional employers expect.",
  },
  {
    icon: Languages,
    title: "Nationality & languages",
    body: "Nationality and language fields handled with care, including Arabic-name formatting.",
  },
  {
    icon: Stamp,
    title: "Attestation-aware",
    body: "Prompts and examples that understand UAE attestation and documentation norms.",
  },
  {
    icon: Sparkles,
    title: "UAE-aware suggestions",
    body: "Examples and wording tuned to UAE roles and sectors as you write — not generic global copy.",
  },
  {
    icon: Building2,
    title: "Reads cleanly for GCC hiring",
    body: "ATS-clean structure that the systems used by UAE banks, telcos and DIFC firms can actually parse.",
  },
];

export function BuiltForUAE() {
  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="UAE-optimised"
          title="Built for the UAE — not adapted for it."
          subcopy="Most builders are made for the US or UK and bolted onto the Gulf. MakeMyCV is the only CV builder designed for the UAE market from the ground up."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                <it.icon size={21} strokeWidth={2} />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-slate-900">
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {it.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
