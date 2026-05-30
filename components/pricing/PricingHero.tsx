export function PricingHero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)",
      }}
    >
      <div className="hero-spotlight" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-blue-400">
          Pricing
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight-2 text-white md:text-[56px]">
          Pay once, when you&rsquo;re ready. Never a subscription.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
          Build and preview your CV free. Pay $5 only when you download the
          final, watermark-free version.
        </p>
      </div>
    </section>
  );
}
