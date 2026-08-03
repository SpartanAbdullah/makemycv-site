import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How MakeMyCV.ae handles your data: CVs stay in your browser, ATS reports auto-delete after 24 hours, and we never sell your information.",
  path: "/privacy",
});

/**
 * Every claim on this page was verified against the actual code paths on
 * 2026-08-02 (makemycv-app api routes + this repo). If a data flow changes —
 * a new API route, a new analytics tag, a new form — update this page in the
 * same PR. A privacy policy that drifts from the code is worse than none.
 *
 * Verified facts this page states:
 * - Builder persistence is browser localStorage only; no accounts, no server
 *   copy of the working CV.
 * - AI features (ai-improve, jd-match, rewrite-bullet) call Anthropic's API
 *   server-side; request bodies are not logged or stored.
 * - ATS checker reports ARE stored server-side: Vercel KV, random id,
 *   24h TTL (lib/resumeChecker/storage.ts — TTL_SECONDS = 86400).
 * - Rate limiting keys on client IP in Vercel KV. TRANSIENT as of 2026-08-02:
 *   the limiters previously ran with `analytics: true`, which wrote client IPs
 *   into KV permanently with no TTL (audit A-W3-001) and made the "held
 *   briefly" wording below false. That flag is now off in all eight limiters.
 * - Contact form posts to Formspree (form id mqeykryy).
 * - Analytics: GA4 via GTM + Vercel Analytics/Speed Insights on this site;
 *   Vercel Analytics/Speed Insights added to app.makemycv.ae on 2026-08-02.
 * - Error monitoring: Sentry on BOTH repos as of 2026-08-02, EU region
 *   (ingest host *.ingest.de.sentry.io). Configured with sendDefaultPii:false,
 *   request bodies stripped in beforeSend, and session replay hard-disabled
 *   (replaysSessionSampleRate / replaysOnErrorSampleRate both 0). If any of
 *   those change, the "Error monitoring" section below becomes false.
 * - Tips: Ko-fi → PayPal, external checkout only.
 */

const LAST_UPDATED = "2 August 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-bold tracking-tight-2 text-ink">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-2">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper py-16 md:py-20">
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
            Privacy <span className="text-accent">Policy</span>
          </h1>
          <p className="mt-4 text-lg text-muted">
            Plain English, no legal maze. Last updated {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          {/* The short version — mirrors the AiAnswer pattern: lead with the
              answer, details below. */}
          <div className="rounded-2xl border border-line bg-paper-2 p-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              The short version
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-2">
              <li>
                Your CV lives in your browser, not on our servers — no account,
                no cloud copy.
              </li>
              <li>
                AI features send only the text you ask us to work on, return the
                result, and don&apos;t keep your text.
              </li>
              <li>
                ATS checker reports are stored under a random link for 24 hours,
                then deleted automatically.
              </li>
              <li>
                We never sell your data, and we never see your card details.
              </li>
            </ul>
          </div>

          <Section title="Who we are">
            <p>
              MakeMyCV.ae is a free, ATS-friendly CV builder made in Dubai for
              job seekers applying in the UAE and the wider GCC. It is operated
              from Dubai, United Arab Emirates. This policy covers the website
              at www.makemycv.ae and the builder at app.makemycv.ae. Questions,
              or want something deleted? Email{" "}
              <a
                href="mailto:hello@makemycv.ae"
                className="font-semibold text-accent underline underline-offset-2"
              >
                hello@makemycv.ae
              </a>
              .
            </p>
          </Section>

          <Section title="Your CV in the builder">
            <p>
              The builder runs in your browser. What you type is saved to your
              own device (browser local storage) so your draft survives a page
              refresh. There are no accounts and we do not keep a copy of your
              working CV on our servers — we couldn&apos;t read it if we wanted
              to. Clearing your browser data deletes it.
            </p>
          </Section>

          <Section title="AI features">
            <p>
              When you use an AI feature — the bullet-point rewriter, JD Match,
              or the ATS checker — the text you submit is sent to our server and
              on to Anthropic (the AI provider behind Claude) to generate the
              result. Under Anthropic&apos;s commercial API terms, content sent
              this way is not used to train their models. We do not log or store
              the text you submit to the rewriter or JD Match.
            </p>
            <p>
              To keep these features free, we rate-limit them by IP address.
              Your IP is held briefly in short-lived storage for that counting
              and is not used to build any profile of you.
            </p>
          </Section>

          <Section title="ATS checker reports">
            <p>
              The ATS checker is the one feature that stores content
              server-side: your report (including the parsed CV content it is
              built from) is saved under a random, unguessable ID so the report
              page can load and you can reopen it. It is deleted automatically
              after 24 hours. If you want it gone sooner, email us the report
              link.
            </p>
          </Section>

          <Section title="Contact form">
            <p>
              The form on our{" "}
              <Link
                href="/contact"
                className="font-semibold text-accent underline underline-offset-2"
              >
                contact page
              </Link>{" "}
              collects your name, email, subject and message. Submissions are
              delivered to our inbox by Formspree, a form-handling service. We
              use what you send solely to reply to you.
            </p>
          </Section>

          <Section title="Analytics & cookies">
            <p>
              We use Google Analytics 4 (loaded via Google Tag Manager) to
              understand which pages help people, and Vercel Analytics for
              performance monitoring. Google Analytics sets cookies;
              you can block or clear them in your browser settings, and the site
              works fine without them. We run no advertising networks and no
              cross-site tracking of our own.
            </p>
          </Section>

          <Section title="Tips">
            <p>
              If you leave a tip, checkout happens on Ko-fi and is settled by
              PayPal. Your card details go to them, never to us — we receive
              only the tip and whatever name you choose to show.
            </p>
          </Section>

          <Section title="Who we share data with">
            <p>
              Only the service providers needed to run the product, each for one
              job: Vercel (hosting and the short-lived storage described above),
              Google (analytics), Formspree (contact form delivery), Anthropic
              (AI processing), Sentry (error monitoring), and Ko-fi/PayPal
              (tips). Some of these providers process data in the United States
              or Europe. We do not sell or rent personal data to anyone.
            </p>
          </Section>

          <Section title="Error monitoring">
            <p>
              When something breaks, we use Sentry to record the technical
              details of the failure so we can fix it. Sentry receives the error
              message, the code path that failed, the page you were on, and your
              browser and operating system version.
            </p>
            <p>
              It is deliberately configured not to receive the things that would
              identify you: no IP address, no cookies, no form contents, and no
              CV text. We do not use Sentry&apos;s session-replay feature, which
              would record your screen as you type — that is switched off in
              both our applications and we do not intend to turn it on. Sentry
              stores this data in the European Union.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Under the UAE Personal Data Protection Law (Federal Decree-Law
              No. 45 of 2021) you can ask what we hold about you, ask for it to
              be corrected, or ask for it to be deleted. For most of what this
              site does, the honest answer is that we hold nothing — your CV is
              on your device. For anything we do hold (a contact-form email, an
              ATS report link), email{" "}
              <a
                href="mailto:hello@makemycv.ae"
                className="font-semibold text-accent underline underline-offset-2"
              >
                hello@makemycv.ae
              </a>{" "}
              and we&apos;ll sort it out.
            </p>
          </Section>

          <Section title="Children">
            <p>
              MakeMyCV.ae is a job-seeking tool and is not directed at children
              under 16.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If how we handle data changes, this page changes with it, and the
              date at the top is updated. Meaningful changes will be called out,
              not buried.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
