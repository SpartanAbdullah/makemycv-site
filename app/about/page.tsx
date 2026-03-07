import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MakeMyCV",
  description:
    "MakeMyCV was built to help UAE job seekers create professional, ATS-friendly CVs without expensive career coaches or complicated tools.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl">
            Built for the UAE.
            <br />
            <span className="text-brand-blue">By Someone Who Gets It.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            MakeMyCV exists because getting a job in the UAE is competitive —
            and your CV is your first impression.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl font-bold text-slate-800">
            Why We Built This
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
            <p>
              The UAE job market is unique. Recruiters here see CVs from
              candidates worldwide. Standing out means having a CV that&apos;s
              both visually clean and ATS-compliant — a combination that&apos;s
              surprisingly rare.
            </p>
            <p>
              Most online CV builders are built for Western markets. They
              don&apos;t account for UAE-specific fields like visa status,
              nationality, or the driving license that many Gulf employers ask
              for. We built MakeMyCV specifically for this market.
            </p>
            <p>
              We believe everyone deserves a professional CV — whether
              you&apos;re a fresh graduate in Sharjah, an expat professional in
              DIFC, or someone switching careers in Abu Dhabi. That&apos;s why
              the core tool is completely free.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-light py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "UAE First",
                desc: "Every template, field, and default is optimized for Gulf hiring standards.",
              },
              {
                title: "Privacy by Design",
                desc: "Your CV data never leaves your browser. We don\u2019t store personal information.",
              },
              {
                title: "Always Free at Core",
                desc: "The fundamental tool will always be free. We monetize Pro features, not basic access.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <h3 className="font-display text-lg font-bold text-slate-800">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-brand-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
