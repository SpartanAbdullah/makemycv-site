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
    title: "Keep it free for everyone",
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

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl">
            MakeMyCV is free. Always.
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Built for UAE job seekers and kept free by people who find it
            valuable. If it helped you land an interview, you can leave a tip
            below &mdash; no pressure either way.
          </p>
        </div>
      </section>

      {/* Why support */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-800 md:text-4xl">
            What tips help with
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whySupport.map((item) => (
              <div
                key={item.title}
                className="card-lift rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-bold text-slate-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-brand-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tip jar */}
      <section className="bg-brand-light py-12 md:py-20">
        <div className="mx-auto max-w-2xl px-6">
          <TipJar variant="full" context="support-page" />
        </div>
      </section>

      {/* What you get */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-800 md:text-3xl">
            What you get for tipping
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Nothing extra. This is a tip jar, not a paywall. Every feature is
            free for everyone, tip or no tip.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-light py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-800">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-4">
            {faq.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <p className="font-semibold text-slate-800">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </div>
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
