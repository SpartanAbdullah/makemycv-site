/**
 * Homepage FAQ — the visible content for the FAQPage schema in app/page.tsx.
 *
 * Rule: the visible Q/A strings and the schema's `mainEntity[].name` /
 * `acceptedAnswer.text` must match. Both are sourced from `homepageFaqs`
 * exported below so they cannot drift apart.
 *
 * Each answer is self-contained (40–60 words), so an AI engine can quote it
 * standalone — that's what makes the FAQPage block worth its weight.
 */

import { Reveal } from "@/components/ui/Reveal";

export const homepageFaqs = [
  {
    q: "Is MakeMyCV free?",
    a: "Yes. MakeMyCV is completely free — no sign-up, no paywall, no watermark on exports. You can build and download a CV in about five minutes. If it helped you, you can leave a voluntary tip on the support page toward hosting and AI costs, but the tool itself stays free.",
  },
  {
    q: "Will my CV pass ATS filters used by UAE employers?",
    a: "Yes. MakeMyCV templates are built to match the parsing logic used by UAE banks, telcos, and DIFC firms — single-column structure, standard section headers, no image-based text or broken multi-column layouts. The same templates feed the free /resume-checker for verification.",
  },
  {
    q: "Should a UAE CV include visa status and nationality?",
    a: "In the UAE, recruiters typically expect visa status and nationality on a CV, and often the Emirates ID and a driving licence flag — unlike Western markets where those would be inappropriate. MakeMyCV groups these in a dedicated UAE Essentials step, as optional, off-by-default fields you can switch on per role.",
  },
  {
    q: "Can I add a photo to my CV?",
    a: "Yes — photos are common on UAE CVs, and MakeMyCV lets you upload one and choose per application whether it shows. It's entirely your call: every layout is available with or without a photo, and templates like Professional Photo, Onyx and Sandstone are designed around one.",
  },
] as const;

export function HomepageFAQ() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <Reveal className="mx-auto max-w-3xl px-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          Frequently asked
        </p>
        <h2
          className="mt-4 font-display font-bold text-ink tracking-[-0.02em]"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2rem)", lineHeight: 1.2 }}
        >
          What people ask before they build.
        </h2>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {homepageFaqs.map((item) => (
            <details
              key={item.q}
              className="group py-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <span className="font-display text-lg font-semibold text-ink md:text-xl">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-150 group-open:rotate-45 group-open:border-accent group-open:text-accent"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1v10M1 6h10"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 pr-12 text-[15px] leading-relaxed text-ink-2 md:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
