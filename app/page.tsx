import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MakeMyCV — Free CV Builder for UAE Jobs",
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen dot-grid noise-overlay overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%)' }}>
        {/* Blue orb top right */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)'
          }} />
        {/* Indigo orb bottom left */}
        <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)'
          }} />

        <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-6 py-20 lg:flex-row lg:py-32">
          {/* Left */}
          <div className="flex-[3] text-center lg:text-left">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
              &#127462;&#127466; Built for the UAE Job Market
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-tight text-white md:text-7xl">
              Get Hired
              <br />
              <span className="text-brand-blue">in the </span>
              <span className="gradient-text">UAE.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-xl text-slate-300 lg:mx-0">
              Build a professional, ATS-friendly CV in under 5 minutes. No
              sign-up. No templates that look like everyone else&apos;s.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="https://app.makemycv.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-white font-bold text-lg px-8 py-4 rounded-2xl"
              >
                Build My CV Free &rarr;
              </a>
              <a
                href="/templates"
                className="rounded-xl border border-slate-600 px-8 py-4 text-lg text-slate-300 transition-all duration-300 hover:bg-white/10"
              >
                See Templates
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {['\u2713 Free', '\u2713 No sign-up', '\u2713 PDF in 5 mins', '\u2713 ATS-optimized'].map(item => (
                <span key={item} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-300 border border-white/10">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right — CV mockup */}
          <div className="hidden flex-[2] lg:block">
            <div
              className="rounded-2xl bg-white p-8 animate-float"
              style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)' }}
            >
              <div className="border-b border-slate-200 pb-3">
                <p className="text-lg font-bold text-slate-900">
                  SARAH AL-RASHIDI
                </p>
                <p className="text-sm text-slate-500">Marketing Manager</p>
                <p className="mt-1 text-xs text-slate-400">
                  Dubai, UAE &middot; sarah@email.com &middot; +971 50 000 0000
                </p>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Experience
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Marketing Manager{" "}
                    <span className="font-normal text-slate-500">
                      | Emirates Group
                    </span>
                  </p>
                  <p className="text-xs text-slate-400">2021 - Present</p>
                  <div className="mt-1 space-y-0.5 text-xs text-slate-600">
                    <p>
                      &bull; Led digital campaigns reaching 2M+ users across
                      GCC
                    </p>
                    <p>&bull; Increased brand engagement by 45% YoY</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Education
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  BBA Marketing{" "}
                  <span className="font-normal text-slate-500">
                    | American University of Sharjah
                  </span>
                </p>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Skills
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[
                    "Digital Marketing",
                    "Google Ads",
                    "Brand Strategy",
                    "Analytics",
                  ].map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ── */}
      <section className="bg-slate-50 py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-800 md:text-4xl">
            Most UAE CVs Get Rejected Before a Human Reads Them
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="card-lift rounded-2xl p-8 bg-white border border-slate-100 shadow-sm text-center">
              <p className="text-4xl">&#10060;</p>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-800">
                ATS Systems Reject 75% of CVs
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Most companies in Dubai use automated screening. If your CV
                isn&apos;t formatted correctly, it never reaches a hiring
                manager.
              </p>
            </div>
            <div className="card-lift rounded-2xl p-8 bg-white border border-slate-100 shadow-sm text-center">
              <p className="text-4xl">&#128553;</p>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-800">
                Word Templates Look Unprofessional
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Generic CV templates don&apos;t reflect UAE hiring standards.
                Recruiters in the Gulf see thousands of identical-looking CVs
                every week.
              </p>
            </div>
            <div className="card-lift rounded-2xl p-8 bg-white border border-slate-100 shadow-sm text-center">
              <p className="text-4xl">&#9989;</p>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-800">
                MakeMyCV Fixes Both Problems
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Our builder formats your CV for ATS systems automatically —
                while keeping it visually clean for human recruiters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-brand-light py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-800 md:text-4xl">
            Build Your CV in 3 Steps
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Fill in Your Details",
                desc: "Enter your experience, education, and skills using our guided step-by-step builder. Takes under 5 minutes.",
              },
              {
                step: "2",
                title: "Choose Your Template",
                desc: "Pick from ATS-friendly templates designed for UAE hiring standards. Classic, Modern, and more.",
              },
              {
                step: "3",
                title: "Download & Apply",
                desc: "Export as PDF or Word. Your CV is ready to send to recruiters in Dubai, Abu Dhabi, or anywhere in the GCC.",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative text-center">
                {i < 2 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[2px] border-t-2 border-dashed border-blue-200" />
                )}
                <div className="w-12 h-12 rounded-2xl btn-primary flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-brand-muted">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="https://app.makemycv.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-primary rounded-xl px-7 py-3.5 font-bold text-white"
            >
              Start Now — It&apos;s Free &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-800 md:text-4xl">
            Everything You Need. Nothing You Don&apos;t.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "\uD83D\uDCCB",
                title: "ATS-Optimized Format",
                desc: "Passes automated screening used by top UAE employers like ENOC, Emaar, and banks.",
              },
              {
                icon: "\uD83C\uDDE6\uD83C\uDDEA",
                title: "UAE Market Focus",
                desc: "Includes fields like visa status, nationality, and driving license \u2014 standard in the Gulf.",
              },
              {
                icon: "\uD83D\uDCC4",
                title: "Instant PDF Export",
                desc: "Download your CV as a perfectly formatted PDF. No watermark on the free plan.",
              },
              {
                icon: "\uD83D\uDC41\uFE0F",
                title: "Live Preview",
                desc: "See your CV update in real-time as you type. No surprises on the final output.",
              },
              {
                icon: "\uD83C\uDFA8",
                title: "Multiple Templates",
                desc: "Classic and Modern designs. Both clean, both ATS-safe.",
              },
              {
                icon: "\uD83D\uDD12",
                title: "No Account Needed",
                desc: "Start building immediately. Your data stays in your browser \u2014 never on our servers.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="card-lift rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-200 hover:shadow-card-blue group"
              >
                <div className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center text-white text-lg mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="dot-grid py-12 md:py-20" style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%)' }}>
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-white md:text-4xl">
            Trusted by UAE Job Seekers
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            From fresh graduates to senior managers
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "I had been applying for 3 months with no responses. After rebuilding my CV with MakeMyCV, I got 3 interview calls in one week.",
                name: "Ahmed K.",
                role: "Operations Manager, Dubai",
              },
              {
                quote:
                  "The ATS formatting made a huge difference. HR at a DIFC firm told me my CV was one of the cleanest they\u2019d received.",
                name: "Priya S.",
                role: "Finance Analyst, Abu Dhabi",
              },
              {
                quote:
                  "As a fresh graduate competing with experienced candidates, having a professional CV gave me the confidence boost I needed.",
                name: "Fatima A.",
                role: "Marketing Graduate, Sharjah",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="glass-card rounded-2xl p-6 card-lift"
              >
                <div className="gradient-text text-lg mb-3">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {t.name}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden py-12 md:py-20" style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1a1040 100%)' }}>
        {/* Blue orb top right */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)'
          }} />
        {/* Indigo orb bottom left */}
        <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)'
          }} />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl font-extrabold text-white md:text-5xl">
            Your next job in the UAE
            <br />
            starts with the right CV.
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Free. No sign-up. Ready in 5 minutes.
          </p>
          <div className="mt-10">
            <a
              href="https://app.makemycv.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-primary text-white font-bold text-xl px-12 py-6 rounded-2xl"
              style={{ boxShadow: '0 8px 60px rgba(37,99,235,0.5)' }}
            >
              Build My CV Now &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
