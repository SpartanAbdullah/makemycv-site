import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { KarakPicker } from "@/components/KarakPicker";

/* The URL stays /support deliberately — it has inbound internal links and
   accrued history. Only the human-facing label changed to the "karak" framing
   (2026-08-11). Do not rename the route; that would need a 301 for no gain.

   2026-10-24 redesign (design_handoff_support_karak): the ask comes first.
   Hero → tip picker → Why support → About → What you get → FAQ → footer.
   The standalone TipJar section is gone; its content lives in the hero card. */
export const metadata = buildPageMetadata({
  title: "Support This Project",
  description:
    "The MakeMyCV builder is free for everyone. If it helped you, buy us a karak — it covers hosting and AI costs. No paywall, no subscription.",
  path: "/support",
});

const CONTACT_EMAIL = "hello@makemycv.ae";

const whySupport = [
  {
    title: "Cover hosting",
    desc: "Vercel, domain, infrastructure.",
  },
  {
    title: "Pay for AI",
    desc: "Every AI rewrite costs real money. Tips keep it free for everyone.",
  },
  {
    title: "Keep it independent",
    desc: "No ads, no data selling, no investors to please.",
  },
];

const faq = [
  {
    q: "Is the tool actually free?",
    a: "Yes. The builder has no paid tier, no premium features and no export fees.",
  },
  {
    q: "Where does my tip go?",
    a: "Ko-fi forwards your tip directly to our PayPal Business account. You'll see Ko-fi's secure checkout, with “MakeMyCV” as the recipient name. Cards work without a Ko-fi account.",
  },
  {
    q: "Can I tip in AED?",
    a: "Tips are processed in USD. If you have a UAE card, your bank handles the conversion at standard FX rates.",
  },
  {
    q: "Will there be a paid version later?",
    a: "The builder will stay free. If we ever offer paid extras, they will be separate from it.",
  },
  {
    q: "Can I get a refund?",
    a: `Yes — email us at ${CONTACT_EMAIL} and we'll refund any tip, no questions asked. Tipping should feel good, not regretted.`,
  },
  {
    q: "How do I contact you about anything else?",
    a: `Same email: ${CONTACT_EMAIL}. A real person reads every message.`,
  },
];

const EYEBROW =
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-accent";

export default function SupportPage() {
  return (
    <>

      {/* 1. Hero + CTA */}
      <section className="relative overflow-hidden bg-paper px-6 pt-[88px] pb-[104px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 55% at 50% 18%, rgba(14, 124, 74, 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gold-soft px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-[0.04em] text-gold-deep sm:text-xs">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-gold"
            />
            Tip jar &middot; Built by one person in Dubai
          </span>
          <h1 className="mt-6 font-display text-[clamp(44px,6vw,80px)] font-bold leading-[1.02] tracking-[-0.03em] text-ink [text-wrap:balance]">
            Buy us a <span className="text-accent">karak</span>
          </h1>
          {/* Plain-language subline: "karak" is everyday UAE vocabulary but not
              universal, and this page is read by people who have just arrived.
              The ask has to be legible without knowing the term. */}
          <p className="mx-auto mt-5 max-w-[560px] text-xl leading-[1.55] text-muted [text-wrap:pretty]">
            The builder is free and always will be &mdash; a karak keeps it running.
          </p>
        </div>
        <div className="relative">
          <KarakPicker context="support-page" />
        </div>
      </section>

      {/* 2. Why support */}
      <section className="bg-paper-2 px-6 py-24">
        <div className="mx-auto max-w-[1080px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="shrink-0 whitespace-nowrap">
              <p className={EYEBROW}>Where it goes</p>
              <h2 className="mt-3 font-display text-[clamp(36px,4vw,52px)] font-bold leading-[1.05] tracking-tight-2 text-ink">
                Why support
              </h2>
            </div>
            <p className="max-w-[380px] text-base leading-[1.6] text-muted">
              Every karak goes straight into keeping the builder online, fast
              and free.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {whySupport.map((item, i) => (
              <div
                key={item.title}
                className="card-lift rounded-[20px] bg-sheet p-7 shadow-float"
              >
                <span className="font-mono text-[13px] font-semibold tracking-[0.08em] text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.01em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-muted">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About */}
      <section className="bg-paper px-6 py-24">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-start gap-12">
          <div className="flex flex-[0_0_220px] flex-col gap-4">
            <p className={EYEBROW}>Who&apos;s behind it</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/logo-mark.svg"
              alt=""
              width={120}
              height={120}
              className="h-[120px] w-[120px] rounded-3xl"
            />
            <div>
              <p className="text-xl font-semibold text-ink">The MakeMyCV team</p>
              <p className="mt-1 text-sm text-muted">Dubai, UAE</p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm font-semibold text-accent hover:text-accent-deep"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="min-w-0 flex-[1_1_420px] rounded-3xl bg-sheet p-10 shadow-sheet">
            <h2 className="font-display text-[clamp(28px,3vw,36px)] font-bold tracking-tight-2 text-ink">
              Made by one developer in Dubai who cares.
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-[17px] leading-[1.7] text-ink-2 [text-wrap:pretty]">
              <p>
                MakeMyCV started because every CV builder tried was either built
                for the US market, charged $5 per download, or just didn&apos;t
                understand the UAE job market. So a solo developer here made one
                for UAE job seekers &mdash; and made it free.
              </p>
              <p>
                If it helped you, a small tip helps cover the hosting and AI
                costs that keep it running. No pressure either way.
              </p>
            </div>
            <p className="mt-7 font-mono text-[13px] font-medium text-gold-deep">
              &mdash; The MakeMyCV team, Dubai
            </p>
          </div>
        </div>
      </section>

      {/* 4. What you get for tipping */}
      <section className="bg-paper-2 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight-2 text-ink md:text-3xl">
            What do you get for tipping?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Honestly? Nothing extra. This is a tip jar, not a paywall. Every
            builder feature is free for everyone, tip or no tip. A tip just
            buys a longer runway for the tool and a little more sleep.
          </p>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center font-display text-[36px] font-bold leading-[1.05] tracking-tight-2 text-ink md:text-[48px]">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-3">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl bg-sheet p-6 shadow-float transition-all duration-200 hover:shadow-float-hover"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink">
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-xl leading-none text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer CTA */}
      <section className="bg-accent-deep py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-[36px] font-bold leading-[1.05] tracking-tight-2 text-white md:text-[48px]">
            Back to building.
          </h2>
          <p className="mt-3 text-white/75">
            Your CV is waiting. Free, always.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://app.makemycv.ae"
              className="inline-block rounded-full bg-white px-7 py-3.5 text-base font-semibold text-accent-deep shadow-md transition-all duration-200 hover:-translate-y-px hover:bg-paper"
            >
              Back to the builder &rarr;
            </a>
            <Link
              href="/blog"
              className="inline-block rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
