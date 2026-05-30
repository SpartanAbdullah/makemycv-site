export function PricingClarity() {
  return (
    <section className="relative bg-paper-2 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          No catch
        </p>
        <h2 className="mt-4 font-display font-bold text-slate-900 tracking-[-0.02em]" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.05 }}>
          Free to check.
          <br />
          <span className="text-brand-blue">$5 only if you want to fix it.</span>
        </h2>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-700">
          <p>
            The ATS check is fully free. Every issue we find is visible in the
            report — severity, explanation, how to fix. There&apos;s no
            &ldquo;premium report&rdquo; hidden behind a paywall, and no email
            wall to see your score.
          </p>
          <p>
            The $5 is optional: if you want us to import the parsed CV into the{" "}
            <a
              href="https://app.makemycv.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-blue underline-offset-4 hover:underline"
            >
              MakeMyCV builder
            </a>{" "}
            and download a polished, ATS-clean version ready to send, it&apos;s a
            one-time fee. No subscription. No account required to check.
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
