import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ATS-Friendly CV Templates for UAE Jobs",
  description:
    "Browse ATS-friendly CV templates built for Dubai and UAE hiring standards. Pick a clean format and create your CV in minutes.",
  path: "/templates",
});

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
            <div className="relative rounded-3xl border-2 border-slate-200 bg-white p-8 card-lift">
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
                className="mt-6 block btn-primary rounded-xl px-7 py-3.5 text-center font-bold text-white"
              >
                Use This Template &rarr;
              </a>
            </div>

            {/* Modern */}
            <div
              className="relative rounded-3xl border-2 border-[#2563eb] p-8 card-lift"
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 100%)',
                boxShadow: '0 0 60px rgba(37,99,235,0.2)',
              }}
            >
              <span className="absolute right-4 top-4 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
                PRO
              </span>
              {/* Thumbnail */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="h-4 w-16 rounded bg-blue-400/30" />
                <div className="mt-3 grid grid-cols-[2fr_1fr] gap-2">
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-white/20" />
                    <div className="h-2 w-5/6 rounded bg-white/15" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-blue-400/20" />
                    <div className="h-2 w-4/6 rounded bg-blue-400/15" />
                  </div>
                </div>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-white">
                Modern
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Two-column design with a sidebar. Ideal for creative, tech, and
                marketing roles where visual presentation matters.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-300">
                <li className="flex items-start gap-2"><span className="text-blue-400">&#10003;</span> Two-column sidebar layout</li>
                <li className="flex items-start gap-2"><span className="text-blue-400">&#10003;</span> Skills visualization</li>
                <li className="flex items-start gap-2"><span className="text-blue-400">&#10003;</span> Profile photo support</li>
                <li className="flex items-start gap-2"><span className="text-blue-400">&#10003;</span> ATS-safe design</li>
              </ul>
              <a
                href="/pricing"
                className="mt-6 block btn-primary rounded-xl px-7 py-3.5 text-center font-bold text-white"
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
              <div className="rounded-2xl p-6 border-2 border-red-100 bg-red-50">
                <p className="font-bold text-red-600 mb-3 flex items-center gap-2">
                  <span>&#10060;</span> Rejected by ATS
                </p>
                <ul className="space-y-1 text-xs text-red-600">
                  <li>&bull; Tables and multi-column layouts</li>
                  <li>&bull; Graphics, icons, and logos</li>
                  <li>&bull; Unusual or decorative fonts</li>
                  <li>&bull; Missing section headers</li>
                </ul>
              </div>
              <div className="rounded-2xl p-6 border-2 border-green-100 bg-green-50">
                <p className="font-bold text-green-600 mb-3 flex items-center gap-2">
                  <span>&#9989;</span> Passes ATS
                </p>
                <ul className="space-y-1 text-xs text-green-600">
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
