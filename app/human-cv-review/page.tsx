import { notFound } from "next/navigation";
import { CopyMessageButton } from "@/components/human-review/CopyMessageButton";
import { HUMAN_REVIEW_ON } from "@/lib/features";
import { buildPageMetadata } from "@/lib/seo";
import { SERVICE_PAGE_URL } from "@/lib/social";

/* Off until the release gate in docs/human-review-launch-2026-11/PLAN.md is met.
   No form or upload here on purpose: the site collects nothing for this service.
   Makes no licence claim and names no licensed seller (owner decision 2026-11-07);
   revisit when a licence covering this service is obtained. */
export const metadata = buildPageMetadata({
  title: "Human CV Review",
  description:
    "Have a person read your CV and show you what to cut, move and add for the UAE roles you want. From AED 79. Separate from the free MakeMyCV builder.",
  path: "/human-cv-review",
});

const packages = [
  {
    name: "Human review",
    aed: "AED 79",
    usd: "USD 21.51 on PayPal",
    what: "Written notes on what to cut, what to move up and what to add for the roles you want.",
  },
  {
    name: "Full CV rewrite",
    aed: "AED 149",
    usd: "USD 40.57 on PayPal",
    what: "Your CV rewritten and delivered as PDF and Word.",
  },
  {
    name: "CV + LinkedIn profile",
    aed: "AED 200",
    usd: "USD 54.46 on PayPal",
    what: "The rewrite, plus a new LinkedIn headline, About section and experience text, ready to paste in.",
  },
];

const steps = [
  "Copy the message below and send it with your CV. Please remove passport and Emirates ID numbers first.",
  "We confirm the package and you pay by PayPal.",
  "We review your CV personally and use AI tools to check ATS compatibility.",
];

const EMAIL_HREF =
  "mailto:hello@makemycv.ae?subject=Human%20CV%20review&body=Hi%20MakeMyCV%2C%20I%27d%20like%20a%20human%20CV%20review.%20Target%20role%3A%20";

const EYEBROW = "text-[11px] font-semibold uppercase tracking-[0.14em] text-accent";

const Actions = ({ location }: { location: string }) => (
  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
    <a
      href={SERVICE_PAGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-event="cta_click"
      data-cta-id="human_review_linkedin"
      data-cta-location={location}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-white transition-colors hover:bg-accent-deep"
    >
      Message us on LinkedIn
    </a>
    <CopyMessageButton />
    <a
      href={EMAIL_HREF}
      data-event="cta_click"
      data-cta-id="human_review_email"
      data-cta-location={location}
      className="inline-flex min-h-12 items-center justify-center px-3 text-base font-semibold text-accent underline underline-offset-4 hover:text-accent-deep"
    >
      Email hello@makemycv.ae
    </a>
  </div>
);

export default function HumanCvReviewPage() {
  if (!HUMAN_REVIEW_ON) notFound();

  return (
    <>
      <section className="bg-paper px-6 pb-16 pt-20 text-center">
        <div className="mx-auto max-w-3xl">
          <p className={EYEBROW}>Separate from the free builder</p>
          <h1 className="mt-4 font-display text-[clamp(40px,6vw,68px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink [text-wrap:balance]">
            Have a person read your CV
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-lg leading-[1.55] text-muted [text-wrap:pretty]">
            The builder and checker stay free. If you want someone to read your CV and show you
            what to cut, move and add for the roles you want, that&apos;s this.
          </p>
          <Actions location="human_review_page" />
        </div>
      </section>

      <section className="bg-paper-2 px-6 py-16">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight-2 text-ink md:text-4xl">
            Packages
          </h2>
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {packages.map((p) => (
              <div key={p.name} className="rounded-[20px] bg-sheet p-7 shadow-float">
                <h3 className="font-display text-xl font-semibold text-ink">{p.name}</h3>
                <p className="mt-3 font-display text-3xl font-bold text-accent">{p.aed}</p>
                <p className="mt-1 text-xs text-muted">{p.usd}</p>
                <p className="mt-4 text-[15px] leading-[1.55] text-ink-2">{p.what}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            We only include facts you can stand behind, and we promise no interviews.
          </p>
        </div>
      </section>

      <section className="bg-paper px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight-2 text-ink">How it works</h2>
          <ol className="mt-6 space-y-3 text-[17px] leading-[1.6] text-ink-2">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="font-mono text-sm font-semibold leading-[1.9] text-gold-deep">{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>

          <h2 className="mt-14 font-display text-3xl font-bold tracking-tight-2 text-ink">Terms</h2>
          <div className="mt-6 space-y-3 text-[15px] leading-[1.65] text-ink-2">
            <p>
              <strong>Payment:</strong> in advance, by PayPal. PayPal charges in USD.
            </p>
            <p>
              <strong>Delivery:</strong> within 3 working days of payment and your details.
            </p>
            <p>
              <strong>Revisions:</strong> up to three rounds, each one list of changes sent within
              14 days of the latest version. A new target role is new work.
            </p>
            <p>
              <strong>Refund:</strong> if you are still unsatisfied after round three and ask for a
              refund, you get a full refund within 5 working days. Your UAE consumer rights are
              unaffected.
            </p>
          </div>

          <h2 className="mt-14 font-display text-3xl font-bold tracking-tight-2 text-ink">Your data</h2>
          <p className="mt-6 text-[15px] leading-[1.65] text-ink-2">
            This service is separate from the free builder, and you choose to send us your CV by
            LinkedIn or email. We use it only to deliver your order. Hostinger (email), LinkedIn,
            PayPal and our AI tools provider handle it, some of them outside the UAE. We delete our
            copies 30 days after final delivery, except payment records.
          </p>
          <p className="mt-6 text-sm text-muted">
            MakeMyCV.ae, Dubai, United Arab Emirates. Questions:{" "}
            <a href="mailto:hello@makemycv.ae" className="font-semibold text-accent underline underline-offset-2">
              hello@makemycv.ae
            </a>
          </p>
        </div>
      </section>

      <section className="bg-paper-2 px-6 py-16 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight-2 text-ink">Ready when you are</h2>
        <Actions location="human_review_page_end" />
      </section>
    </>
  );
}
