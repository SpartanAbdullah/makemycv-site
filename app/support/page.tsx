import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { TipJar } from "@/components/TipJar";

export const metadata = buildPageMetadata({
  title: "Support MakeMyCV",
  description:
    "MakeMyCV is free for everyone. If it helped you, you can leave a tip to support hosting and AI costs. No paywall, no Pro tier — just a tip jar.",
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
      {/* 1. Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-display text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            MakeMyCV is free. Always.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 md:text-xl">
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
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-[#2563eb]"
                >
                  A
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Hi, I&apos;m Abdullah.
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">
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
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Where it goes
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-800 md:text-4xl">
              Why support
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

      {/* 4. TipJar */}
      <section className="bg-paper-2 py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-6">
          <TipJar variant="full" context="support-page" />
        </div>
      </section>

      {/* 5. What you get for tipping */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-800 md:text-3xl">
            What do you get for tipping?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Honestly? Nothing extra. This is a tip jar, not a paywall. Every
            feature is free for everyone, tip or no tip. Tipping just means
            more sleep for me and a longer runway for the tool.
          </p>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="bg-paper-2 py-16 md:py-20">
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

      {/* 7. Footer CTA */}
      <section className="bg-brand-navy dot-grid py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            Back to building.
          </h2>
          <p className="mt-3 text-slate-400">
            Your CV is waiting. Free, always.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://app.makemycv.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-primary rounded-xl px-7 py-3.5 text-base font-bold text-white"
            >
              Back to the builder &rarr;
            </a>
            <Link
              href="/blog"
              className="inline-block rounded-xl border border-slate-600 px-7 py-3.5 text-base font-semibold text-slate-200 transition-colors hover:bg-white/10"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
