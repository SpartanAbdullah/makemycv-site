import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About MakeMyCV",
  description:
    "Learn why MakeMyCV was built for UAE job seekers and how it helps candidates create professional, ATS-friendly CVs for Dubai and GCC jobs.",
  path: "/about",
});

const values = [
  {
    icon: "\uD83C\uDDE6\uD83C\uDDEA",
    title: "UAE First",
    desc: "Every template, field, and default is optimized for Gulf hiring standards.",
  },
  {
    icon: "\uD83D\uDD12",
    title: "Privacy by Design",
    desc: "Your CV data never leaves your browser. We don\u2019t store personal information.",
  },
  {
    icon: "\uD83D\uDC9A",
    title: "Free, Always",
    desc: "MakeMyCV is fully free. We accept voluntary tips from people who find it useful \u2014 never a paywall.",
  },
];

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

          {/* Visible counterpart to the Organization node in lib/seo-schema.ts
              (foundingDate, address, areaServed, email). House rule: schema
              mirrors on-page content — if you change one, change both. These
              facts also state, in plain text, that this is the Dubai-based
              MakeMyCV.ae and not a similarly-named operator elsewhere. */}
          <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-slate-200 pt-8 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-slate-800">Founded</dt>
              <dd className="mt-1 text-slate-600">2026</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Based in</dt>
              <dd className="mt-1 text-slate-600">
                Dubai, United Arab Emirates
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Serving</dt>
              <dd className="mt-1 text-slate-600">
                The UAE, Saudi Arabia, Qatar, Kuwait, Oman &amp; Bahrain
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Contact</dt>
              <dd className="mt-1 text-slate-600">
                <a
                  href="mailto:hello@makemycv.ae"
                  className="underline underline-offset-2 hover:text-slate-900"
                >
                  hello@makemycv.ae
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-light py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-lift rounded-2xl p-8 text-center bg-white border border-slate-200 hover:border-blue-200 hover:shadow-card-blue"
              >
                <div className="w-14 h-14 rounded-2xl btn-primary flex items-center justify-center text-2xl mx-auto mb-5">
                  {v.icon}
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-3">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
