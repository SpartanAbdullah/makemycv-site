import { Layers, MapPin, ScanLine } from "lucide-react";

const modes = [
  {
    icon: Layers,
    title: "The ATS can't parse fancy layouts",
    body:
      "Two-column templates, text boxes and embedded tables read as scrambled text to an ATS. Your real experience never makes it into the recruiter's search results.",
  },
  {
    icon: MapPin,
    title: "Missing UAE-specific fields signal 'generic CV'",
    body:
      "No nationality, no visa status, no availability — and Gulf recruiters move to the next file. UAE hiring runs on context that US/UK CV templates don't cover.",
  },
  {
    icon: ScanLine,
    title: "Walls of text lose the 6-second recruiter scan",
    body:
      "Unquantified bullets, passive verbs, and 3-line paragraphs are the top reason qualified candidates get skipped. Scannability is the gatekeeper.",
  },
];

export function FilterProblem() {
  return (
    <section className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            The hiring reality
          </p>
          <h2 className="mt-4 font-display font-bold text-slate-900 tracking-[-0.02em]" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
            Why 75% of UAE CVs get filtered out before a human reads them.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            ENOC, Emaar, Majid Al Futtaim, ADCB and most DIFC firms run every
            application through an applicant tracking system first. Your CV is
            software-filtered long before a recruiter opens it — and three
            specific issues kill most qualified candidates.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-[28px] border border-line bg-paper-2" style={{ boxShadow: "var(--shadow-md-soft)" }}>
          <ol className="divide-y divide-line">
            {modes.map((m, i) => (
              <li key={m.title} className="grid gap-5 p-8 md:grid-cols-[auto_auto_1fr] md:items-start md:gap-7 md:p-10">
                <span className="font-mono text-xs font-semibold text-slate-400 md:pt-1">
                  0{i + 1}
                </span>
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <m.icon size={20} strokeWidth={2.25} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-[-0.015em] text-slate-900 md:text-2xl">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600 md:text-base">
                    {m.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 text-lg text-slate-700">
          Our checker catches all three in 30 seconds.{" "}
          <a
            href="https://app.makemycv.ae/resume-checker"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-blue underline-offset-4 hover:underline"
            data-event="resume_checker_cta_click"
            data-cta-location="problem"
          >
            See what we&apos;d find in yours &rarr;
          </a>
        </p>
      </div>
    </section>
  );
}
