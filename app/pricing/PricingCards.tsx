"use client";

import { useState } from "react";

const faq = [
  {
    q: "Is MakeMyCV really free?",
    a: "Yes. The Classic template, all builder sections, PDF export, and DOCX export are completely free. No credit card, no trial period.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. Your CV data is saved in your browser\u2019s local storage. Nothing is sent to our servers.",
  },
  {
    q: "Will my CV pass ATS screening?",
    a: "Both our templates are built with ATS compliance in mind \u2014 clean text formatting, standard section headers, and no tables or graphics that confuse automated scanners.",
  },
  {
    q: "Can I edit my CV after downloading?",
    a: "Yes. Export as DOCX to get a fully editable Word document. Your browser-saved data also persists so you can return and make changes anytime.",
  },
  {
    q: "Is the Pro plan available now?",
    a: "Pro is launching soon. Sign up on the Contact page to be notified when it goes live.",
  },
];

export const PricingCards = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <div className="mx-auto grid max-w-4xl gap-8 px-6 md:grid-cols-2">
        {/* Free */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 card-lift">
          <div className="flex flex-col h-full">
            <p className="text-xs font-bold uppercase tracking-widest text-[#2563eb] mb-4">
              Most Popular
            </p>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-5xl font-extrabold text-slate-800">
                AED 0
              </span>
              <span className="text-sm text-brand-muted">/ forever</span>
            </div>
            <p className="mt-3 text-sm text-brand-muted">
              Everything you need to build and download a great CV.
            </p>
            <div className="flex-1">
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
            </div>
            <div className="mt-8">
              <a
                href="https://app.makemycv.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="block btn-primary w-full rounded-xl px-7 py-3.5 text-center font-bold text-white"
              >
                Start Building Free &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Pro */}
        <div
          className="rounded-3xl border-2 border-[#2563eb] p-8 card-lift"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 100%)',
            boxShadow: '0 0 60px rgba(37,99,235,0.2)',
          }}
        >
          <div className="flex flex-col h-full">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
              Pro
            </p>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-5xl font-extrabold gradient-text">
                AED 29
              </span>
              <span className="text-sm text-slate-400">/ month</span>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              For serious job seekers who want every advantage.
            </p>
            <div className="flex-1">
              <ul className="mt-6 space-y-2 text-sm text-slate-300">
                {[
                  "Everything in Free",
                  "Modern template (sidebar layout)",
                  "All future templates",
                  "Remove MakeMyCV watermark",
                  "Priority ATS score check",
                  "Email support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-blue-400">&#10003;</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={() =>
                  alert(
                    "Pro plan launching soon! We'll notify you when it's live.",
                  )
                }
                className="block w-full btn-primary rounded-xl px-7 py-3.5 text-center font-bold text-white"
              >
                Upgrade to Pro &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="mx-auto mt-20 max-w-3xl px-6">
        <h2 className="text-center font-display text-3xl font-bold text-slate-800">
          Frequently Asked Questions
        </h2>
        <div className="mt-10 space-y-3">
          {faq.map((item, i) => (
            <div key={item.q} className="border border-slate-200 rounded-2xl overflow-hidden card-lift">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span>{item.q}</span>
                <span className={`text-[#2563eb] transition-transform duration-200 ${openIndex === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
