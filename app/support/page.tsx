import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { buildPageMetadata, canonicalUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo-schema";
import { TipJar } from "@/components/TipJar";

/* The URL stays /support deliberately — it has inbound internal links and
   accrued history. Only the human-facing label changed to the "karak" framing
   (2026-08-11). Do not rename the route; that would need a 301 for no gain. */
export const metadata = buildPageMetadata({
  title: "Support This Project",
  description:
    "MakeMyCV is free for everyone. If it helped you, buy me a karak — it covers hosting and AI costs. No paywall, no Pro tier, no subscription.",
  path: "/support",
});

const supportBreadcrumb = breadcrumbSchema([
  { name: "Home", item: canonicalUrl("/") },
  { name: "Support This Project", item: canonicalUrl("/support") },
]);

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
    a: "Yes, completely. No paid tier, no premium features, no hidden export fees.",
  },
  {
    q: "Where does my tip go?",
    a: "Ko-fi forwards your tip directly to my PayPal Business account. You'll see Ko-fi's secure checkout, with “MakeMyCV” as the recipient name. Cards work without a Ko-fi account.",
  },
  {
    q: "Can I tip in AED?",
    a: "Tips are processed in USD. If you have a UAE card, your bank handles the conversion at standard FX rates.",
  },
  {
    q: "Will there be a paid version later?",
    a: "Maybe. If MakeMyCV grows significantly, optional premium features may launch in the future. The current free tool will remain free regardless.",
  },
  {
    q: "Can I get a refund?",
    a: `Yes — email me at ${CONTACT_EMAIL} and I'll refund any tip, no questions asked. Tipping should feel good, not regretted.`,
  },
  {
    q: "How do I contact you for anything else?",
    a: `Same email: ${CONTACT_EMAIL}. I read everything personally.`,
  },
];

function abdullahPhotoExists(): boolean {
  const candidates = ["abdullah.jpg", "abdullah.jpeg", "abdullah.png", "abdullah.webp"];
  const imagesDir = path.join(process.cwd(), "public", "images");
  return candidates.some((name) => {
    try {
      return fs.existsSync(path.join(imagesDir, name));
    } catch {
      return false;
    }
  });
}

function getAbdullahPhotoPath(): string | null {
  const candidates = ["abdullah.jpg", "abdullah.jpeg", "abdullah.png", "abdullah.webp"];
  const imagesDir = path.join(process.cwd(), "public", "images");
  for (const name of candidates) {
    try {
      if (fs.existsSync(path.join(imagesDir, name))) return `/images/${name}`;
    } catch {
      // ignore
    }
  }
  return null;
}

export default function SupportPage() {
  const photoPath = abdullahPhotoExists() ? getAbdullahPhotoPath() : null;

  return (
    <>
      <JsonLd data={supportBreadcrumb} />
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-paper py-16 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 55% at 76% 32%, rgba(14, 124, 74, 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.1] tracking-tight-2 text-ink">
            Buy me a <span className="text-accent">karak</span>
          </h1>
          {/* Plain-language subline: "karak" is everyday UAE vocabulary but not
              universal, and this page is read by people who have just arrived.
              The ask has to be legible without knowing the term. */}
          <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">
            MakeMyCV is free and always will be — a karak keeps it running.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Built by one person in Dubai. Supported by people who find it
            useful.
          </p>
        </div>
      </section>

      {/* 2. About Abdullah */}
      <section className="bg-paper-2 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
            <div className="shrink-0">
              {photoPath ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoPath}
                  alt="Abdullah"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-accent-soft text-3xl font-bold text-accent"
                >
                  A
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-display text-2xl font-bold tracking-tight-2 text-ink md:text-3xl">
                Hi, I&apos;m Abdullah.
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-2">
                <p>
                  I&apos;m a solo developer based in Dubai. I built MakeMyCV
                  because every CV builder I tried was either built for the US
                  market, charged $5 per download, or just didn&apos;t
                  understand the UAE job market. So I made my own &mdash; and
                  made it free.
                </p>
                <p>
                  If it helped you, a small tip helps me cover hosting and AI
                  costs that keep it running. No pressure either way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why support */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              Where it goes
            </p>
            <h2 className="mt-3 font-display text-[36px] font-bold leading-[1.05] tracking-tight-2 text-ink md:text-[48px]">
              Why support
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {whySupport.map((item, i) => (
              <div
                key={item.title}
                className="card-lift rounded-2xl bg-sheet p-6 shadow-float"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TipJar */}
      <section className="bg-paper-2 py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-6">
          <TipJar variant="full" context="support-page" />
        </div>
      </section>

      {/* 5. What you get for tipping */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight-2 text-ink md:text-3xl">
            What do you get for tipping?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Honestly? Nothing extra. This is a tip jar, not a paywall. Every
            feature is free for everyone, tip or no tip. Tipping just means
            more sleep for me and a longer runway for the tool.
          </p>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="bg-paper-2 py-16 md:py-20">
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

      {/* 7. Footer CTA */}
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
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-white px-7 py-3.5 text-base font-semibold text-accent-deep shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-paper"
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
