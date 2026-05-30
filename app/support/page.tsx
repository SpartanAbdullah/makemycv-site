import { buildPageMetadata } from "@/lib/seo";
import { TipJar } from "@/components/TipJar";

export const metadata = buildPageMetadata({
  title: "Support MakeMyCV",
  description:
    "MakeMyCV is free for everyone. If it helped you, you can leave a tip to support hosting and AI costs. No paywall, no Pro tier — just a tip jar.",
  path: "/support",
});

const whySupport = [
  {
    title: "Cover hosting",
    desc: "Keeping the site online and fast for everyone who needs it.",
  },
  {
    title: "Pay for AI",
    desc: "The rewrite and review features run on AI models that cost per request.",
  },
  {
    title: "Keep it free",
    desc: "So the next job seeker doesn't hit a paywall when they need help most.",
  },
];

const faq = [
  {
    q: "Is the tool actually free?",
    a: "Yes — every feature is free for everyone, with no account, no trial, and no credit card. The tip jar is entirely optional.",
  },
  {
    q: "Where does my tip go?",
    a: "Straight into running costs — hosting, domain, AI requests for the rewrite and review features. Anything beyond that supports future features and keeping the tool free.",
  },
  {
    q: "Can I tip in AED?",
    a: "PayPal will convert automatically. The presets are listed in USD because that's the simplest cross-border currency, but you'll see your local AED equivalent at checkout.",
  },
  {
    q: "Will there be a paid version later?",
    a: "If MakeMyCV grows significantly, we may introduce optional premium features in the future. The current tool will remain free.",
  },
  {
    q: "How do I get a refund?",
    a: "Email operations@interior-360.com with the PayPal transaction ID. Tips are voluntary, so refunds are handled case-by-case and there's no fine print.",
  },
];

const trustChips = [
  "No paywall",
  "No account",
  "No upsell",
  "No ads",
];

export default function SupportPage() {
  return (
    <>
      {/* Hero with split layout — TipJar above the fold on laptop */}
      <section className="relative overflow-hidden bg-brand-navy dot-grid">
        {/* Subtle orbs for atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-120px] right-[-100px] h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-150px] left-[-100px] h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(79,70,229,0.14) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
          {/* Left — story */}
          <div className="lg:col-span-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-blue-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
              100% free &middot; Tip supported
            </p>

            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-[3.25rem]">
              MakeMyCV is free.
              <br />
              <span className="gradient-text">Always.</span>
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              Built for UAE job seekers and kept free by people who find it
              useful. If it helped you land an interview &mdash; or even just
              saved you an evening of formatting &mdash; you can leave a tip
              toward hosting and AI costs.
            </p>

            <p className="mt-3 text-base text-slate-400">
              Not a paywall. Not a subscription. Just a thank-you that keeps
              the next job seeker from hitting one.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              {trustChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
                >
                  &#10003; {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Right — TipJar above the fold */}
          <div className="lg:col-span-7">
            <TipJar variant="full" context="support-page-hero" />
          </div>
        </div>
      </section>

      {/* What tips help with */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Where it goes
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-800 md:text-4xl">
              What tips help with
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {whySupport.map((item, i) => (
              <div
                key={item.title}
                className="card-lift rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-[#2563eb]">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-brand-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get for tipping — trust statement */}
      <section className="bg-brand-light py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-800 md:text-3xl">
            What you get for tipping
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            <strong className="text-slate-800">Nothing extra.</strong> This is
            a tip jar, not a paywall. Every feature is free for everyone &mdash;
            tip or no tip. It&apos;s the only honest way to keep the tool
            genuinely free.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-800">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-3">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-blue-200"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-800">
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-xl leading-none text-[#2563eb] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-brand-navy py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            Back to building.
          </h2>
          <p className="mt-3 text-slate-400">
            Your CV is waiting. Ready in 5 minutes, always free.
          </p>
          <div className="mt-8">
            <a
              href="https://app.makemycv.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-primary rounded-xl px-7 py-3.5 text-base font-bold text-white"
            >
              Open the CV Builder &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
