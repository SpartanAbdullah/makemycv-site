import { Check, X } from "lucide-react";

/**
 * B1 — dense, always-visible, server-rendered "how the ATS checker works"
 * section. Names the real ATS platforms UAE employers use and how each tends
 * to read a CV, then a DO / DON'T list. This is the JobXDubai-beating
 * substance: crawlable text an answer engine can quote, not an animation.
 *
 * Honesty: parser behaviour is described as general tendencies ("tends to",
 * "sensitive to"), not exact guarantees — matched to the page's "deterministic,
 * no AI hallucination / no fixed score promised" framing.
 */

const systems = [
  {
    name: "Workday",
    used: "Large UAE corporates, banks and telcos",
    parses:
      "Reads your file into structured fields and asks you to confirm them. Rewards clean section headings and reverse-chronological dates; drops data trapped in tables or columns.",
  },
  {
    name: "Taleo (Oracle)",
    used: "Government bodies and legacy enterprises across the Gulf",
    parses:
      "An older parser that is sensitive to non-standard section names and any graphics. Plain headings like Experience, Education and Skills survive; creative labels often don't.",
  },
  {
    name: "Greenhouse",
    used: "Tech firms, scale-ups and startups in the UAE",
    parses:
      "Extracts text and keywords into a candidate profile. Multi-column layouts and text stored inside images are the most common things it fails to read.",
  },
  {
    name: "iCIMS",
    used: "Enterprise employers with high applicant volume",
    parses:
      "Ranks CVs on keyword relevance to the job. Prefers standard section names and simple formatting; contact details in headers or footers can be missed.",
  },
  {
    name: "Lever",
    used: "Technology and fast-growing companies",
    parses:
      "Parses resume text into a profile for recruiters. Tables, text boxes and header/footer regions frequently break clean field extraction.",
  },
];

const dos = [
  "One single-column layout — content flows top to bottom",
  "Standard headings: Experience, Education, Skills",
  "Real selectable text, never text baked into an image",
  "Reverse-chronological dates in a consistent format (e.g. Jan 2023)",
  "Common fonts and a text-based PDF export",
  "The job ad's exact terms — but only where they're true of you",
];

const donts = [
  "Tables, text boxes or multi-column blocks for real content",
  "Icons, logos or charts carrying information a recruiter needs",
  "Contact details placed in the header or footer region",
  "Decorative or uncommon fonts the parser can't map",
  "A scanned or image-based PDF with no readable text",
  "Keyword-stuffing you can't back up in an interview",
];

export function AtsSystems() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            The methodology
          </p>
          <h2
            className="mt-4 font-display font-bold text-slate-900 tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
          >
            Which ATS systems UAE employers use — and how they read your CV.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
            MakeMyCV&rsquo;s free checker runs your PDF against the parsing
            behaviour of the applicant tracking systems UAE employers actually
            deploy, then reports every issue across{" "}
            <strong>60+ UAE-tuned checks</strong> &mdash; content, structure,
            ATS-compatibility, design, and UAE-specific fields like visa status
            and nationality. It is <strong>deterministic</strong>: the same CV
            always returns the same findings, and we never promise a fixed ATS
            score or a guaranteed pass, because no such universal score exists.
          </p>
        </div>

        {/* Systems table — server-rendered, crawlable text */}
        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="py-3 pr-6 font-display text-sm font-bold text-slate-900">
                  ATS platform
                </th>
                <th className="py-3 pr-6 font-display text-sm font-bold text-slate-900">
                  Common UAE users
                </th>
                <th className="py-3 font-display text-sm font-bold text-slate-900">
                  How it tends to parse your CV
                </th>
              </tr>
            </thead>
            <tbody>
              {systems.map((s) => (
                <tr key={s.name} className="border-b border-line align-top">
                  <td className="py-4 pr-6 font-semibold text-slate-900">
                    {s.name}
                  </td>
                  <td className="py-4 pr-6 text-[15px] text-slate-600">
                    {s.used}
                  </td>
                  <td className="py-4 text-[15px] leading-relaxed text-slate-600">
                    {s.parses}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DO / DON'T */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="rounded-[24px] border-2 border-emerald-100 bg-emerald-50/60 p-8">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-emerald-700">
              <Check size={20} strokeWidth={2.5} /> Do this — the ATS reads it
            </h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-slate-700">
              {dos.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    size={18}
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border-2 border-red-100 bg-red-50/60 p-8">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-red-600">
              <X size={20} strokeWidth={2.5} /> Avoid this — it gets filtered
            </h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-slate-700">
              {donts.map((item) => (
                <li key={item} className="flex gap-3">
                  <X
                    size={18}
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0 text-red-500"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
