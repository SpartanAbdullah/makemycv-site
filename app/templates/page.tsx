import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Templates for UAE Jobs",
  description:
    "ATS-friendly CV templates designed for Dubai and UAE job market. Classic and Modern styles. Free to use.",
};

export default function TemplatesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl">
            Professional CV Templates
            <br />
            <span className="text-brand-blue">for the UAE Job Market</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Every template is ATS-tested and formatted to Gulf hiring standards.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-800">
            Choose Your Template
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Classic */}
            <div className="relative rounded-2xl border-2 border-slate-200 p-8 transition-all hover:border-blue-300 hover:shadow-xl">
              <span className="absolute right-4 top-4 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                FREE
              </span>
              {/* Thumbnail */}
              <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="h-3 w-24 rounded bg-slate-300" />
                    <div className="h-2 w-20 rounded bg-slate-200" />
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="h-2 w-16 rounded bg-slate-200" />
                    <div className="h-2 w-12 rounded bg-slate-200" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-16 rounded bg-slate-300" />
                  <div className="h-2 w-full rounded bg-slate-200" />
                  <div className="h-2 w-5/6 rounded bg-slate-200" />
                </div>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-slate-800">
                Classic
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Clean, structured, and trusted by UAE recruiters. Perfect for
                corporate roles in finance, operations, and government sectors.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                <li>&#10003; Single column layout</li>
                <li>&#10003; ATS-optimized structure</li>
                <li>&#10003; Works for all industries</li>
                <li>&#10003; PDF &amp; DOCX export</li>
              </ul>
              <a
                href="https://app.makemycv.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block rounded-xl bg-brand-blue px-7 py-3.5 text-center font-bold text-white transition-all hover:bg-blue-700"
              >
                Use This Template &rarr;
              </a>
            </div>

            {/* Modern */}
            <div className="relative rounded-2xl border-2 border-slate-200 p-8 transition-all hover:border-blue-300 hover:shadow-xl">
              <span className="absolute right-4 top-4 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-brand-blue">
                PRO
              </span>
              {/* Thumbnail */}
              <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-white p-4">
                <div className="h-4 w-16 rounded bg-emerald-200" />
                <div className="mt-3 grid grid-cols-[2fr_1fr] gap-2">
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-slate-200" />
                    <div className="h-2 w-5/6 rounded bg-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-emerald-100" />
                    <div className="h-2 w-4/6 rounded bg-emerald-100" />
                  </div>
                </div>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-slate-800">
                Modern
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Two-column design with a sidebar. Ideal for creative, tech, and
                marketing roles where visual presentation matters.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                <li>&#10003; Two-column sidebar layout</li>
                <li>&#10003; Skills visualization</li>
                <li>&#10003; Profile photo support</li>
                <li>&#10003; ATS-safe design</li>
              </ul>
              <a
                href="/pricing"
                className="mt-6 block rounded-xl bg-brand-blue px-7 py-3.5 text-center font-bold text-white transition-all hover:bg-blue-700"
              >
                Unlock with Pro &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ATS Explainer */}
      <section className="bg-brand-light py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-800 md:text-4xl">
            What is ATS and Why Does It Matter in UAE?
          </h2>
          <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
            <div className="text-sm leading-relaxed text-slate-700">
              <p>
                Most large UAE employers — ADNOC, Emirates, Emaar, DEWA, and
                international banks in DIFC — use Applicant Tracking Systems
                (ATS) to filter CVs before a human ever sees them.
              </p>
              <p className="mt-4">
                An ATS scans for keywords, proper formatting, and standard
                section headers. If your CV uses tables, graphics, or unusual
                fonts, it gets rejected automatically.
              </p>
              <p className="mt-4">
                All MakeMyCV templates are built to pass ATS screening while
                still looking professional to human recruiters.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <p className="text-sm font-bold text-red-700">
                  &#10060; Rejected by ATS
                </p>
                <ul className="mt-2 space-y-1 text-xs text-red-600">
                  <li>&bull; Tables and multi-column layouts</li>
                  <li>&bull; Graphics, icons, and logos</li>
                  <li>&bull; Unusual or decorative fonts</li>
                  <li>&bull; Missing section headers</li>
                </ul>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-sm font-bold text-emerald-700">
                  &#9989; Passes ATS
                </p>
                <ul className="mt-2 space-y-1 text-xs text-emerald-600">
                  <li>&bull; Clean text formatting</li>
                  <li>&bull; Standard section headers</li>
                  <li>&bull; Keyword-friendly structure</li>
                  <li>&bull; Consistent date formats</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
