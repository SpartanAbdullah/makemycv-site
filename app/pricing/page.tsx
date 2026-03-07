import type { Metadata } from "next";
import { PricingCards } from "./PricingCards";

export const metadata: Metadata = {
  title: "Pricing — Free & Pro Plans",
  description:
    "MakeMyCV is free to use. Upgrade to Pro for premium templates, unlimited exports, and no watermark. AED 29/month.",
};

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

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl">
            Simple, Honest Pricing
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Start free. Upgrade only if you need more.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-white py-12 md:py-20">
        <PricingCards />
      </section>

      {/* FAQ */}
      <section className="bg-brand-light py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-800">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-6">
            {faq.map((item) => (
              <div key={item.q}>
                <h3 className="font-display text-base font-bold text-slate-800">
                  {item.q}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-muted">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
