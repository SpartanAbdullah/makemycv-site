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
      <section className="relative overflow-hidden bg-paper py-16 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 55% at 76% 32%, rgba(14, 124, 74, 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <h1 className="font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.1] tracking-tight-2 text-ink">
            Built for the UAE.
            <br />
            <span className="text-accent">By Someone Who Gets It.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            MakeMyCV exists because getting a job in the UAE is competitive —
            and your CV is your first impression.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-paper py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-[30px] font-bold leading-[1.15] tracking-tight-2 text-ink md:text-[38px]">
            Why We Built This
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-2">
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
          <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-line pt-8 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-ink">Founded</dt>
              <dd className="mt-1 text-muted">2026</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Based in</dt>
              <dd className="mt-1 text-muted">
                Dubai, United Arab Emirates
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Serving</dt>
              <dd className="mt-1 text-muted">
                The UAE, Saudi Arabia, Qatar, Kuwait, Oman &amp; Bahrain
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Contact</dt>
              <dd className="mt-1 text-muted">
                <a
                  href="mailto:hello@makemycv.ae"
                  className="underline underline-offset-2 hover:text-ink"
                >
                  hello@makemycv.ae
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Values */}
      <section className="bg-paper-2 py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-lift rounded-2xl p-8 text-center bg-sheet border border-line shadow-sm-soft hover:border-line-strong"
              >
                <div className="w-14 h-14 rounded-2xl btn-primary flex items-center justify-center text-2xl mx-auto mb-5">
                  {v.icon}
                </div>
                <h3 className="font-bold text-xl text-ink mb-3">{v.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
