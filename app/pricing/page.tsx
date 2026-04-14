import { buildPageMetadata } from "@/lib/seo";
import { PricingCards } from "./PricingCards";

export const metadata = buildPageMetadata({
  title: "Pricing - Free and Pro Plans",
  description:
    "See the current MakeMyCV plan options, including the free builder and the upcoming Pro plan.",
  path: "/pricing",
  index: false,
});

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

      {/* Pricing Cards + FAQ */}
      <section className="bg-white py-12 md:py-20">
        <PricingCards />
      </section>
    </>
  );
}
