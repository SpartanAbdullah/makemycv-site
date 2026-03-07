"use client";

export const PricingCards = () => {
  return (
    <div className="mx-auto grid max-w-4xl gap-8 px-6 md:grid-cols-2">
      {/* Free */}
      <div className="rounded-2xl border border-slate-200 p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
          Most Popular
        </p>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="font-display text-5xl font-extrabold text-slate-800">
            AED 0
          </span>
          <span className="text-sm text-brand-muted">/ forever</span>
        </div>
        <p className="mt-3 text-sm text-brand-muted">
          Everything you need to build and download a great CV.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-slate-600">
          {[
            "Classic template",
            "All 9 builder sections",
            "Unlimited edits",
            "PDF export",
            "DOCX export",
            "Live preview",
            "ATS-optimized format",
            "No account required",
          ].map((f) => (
            <li key={f}>&#10003; {f}</li>
          ))}
        </ul>
        <a
          href="https://app.makemycv.ae"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block rounded-xl bg-brand-blue px-7 py-3.5 text-center font-bold text-white transition-all hover:bg-blue-700"
        >
          Start Building Free &rarr;
        </a>
      </div>

      {/* Pro */}
      <div className="rounded-2xl border-2 border-brand-blue p-8 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">
          Pro
        </p>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="font-display text-5xl font-extrabold text-brand-blue">
            AED 29
          </span>
          <span className="text-sm text-brand-muted">/ month</span>
        </div>
        <p className="mt-3 text-sm text-brand-muted">
          For serious job seekers who want every advantage.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-slate-600">
          {[
            "Everything in Free",
            "Modern template (sidebar layout)",
            "All future templates",
            "Remove MakeMyCV watermark",
            "Priority ATS score check",
            "Email support",
          ].map((f) => (
            <li key={f}>&#10003; {f}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() =>
            alert(
              "Pro plan launching soon! We'll notify you when it's live.",
            )
          }
          className="mt-8 block w-full rounded-xl bg-brand-blue px-7 py-3.5 text-center font-bold text-white transition-all hover:bg-blue-700"
        >
          Upgrade to Pro &rarr;
        </button>
      </div>
    </div>
  );
};
