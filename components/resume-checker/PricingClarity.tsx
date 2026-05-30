import Link from "next/link";

export function PricingClarity() {
  return (
    <section className="relative bg-paper-2 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          No catch
        </p>
        <h2
          className="mt-4 font-display font-bold text-slate-900 tracking-[-0.02em]"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.05 }}
        >
          Free to check.
          <br />
          <span className="text-brand-blue">Free to fix.</span>
        </h2>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-700">
          <p>
            The ATS check is fully free. Every issue we find is visible in the
            report — severity, explanation, how to fix. Nothing hidden behind
            a paywall, no email wall to see your score, no &ldquo;upgrade to
            unlock&rdquo;.
          </p>
          <p>
            You can take the report and rewrite your CV anywhere — including
            the{" "}
            <a
              href="https://app.makemycv.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-blue underline-offset-4 hover:underline"
            >
              MakeMyCV builder
            </a>
            , also free. If it saved you hours of guesswork, you can{" "}
            <Link
              href="/support"
              className="font-semibold text-brand-blue underline-offset-4 hover:underline"
            >
              leave a tip
            </Link>{" "}
            toward hosting and AI costs. Entirely optional.
          </p>
        </div>

        <p className="mt-10 text-lg text-slate-700">
          <a
            href="https://app.makemycv.ae/resume-checker"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-blue underline-offset-4 hover:underline"
            data-event="resume_checker_cta_click"
            data-cta-location="pricing"
          >
            Try it free &rarr;
          </a>
        </p>
      </div>
    </section>
  );
}
