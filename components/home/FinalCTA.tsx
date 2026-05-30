import { CreditCard, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
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
        <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight-2 text-white md:text-5xl">
          Your next UAE job starts with the right CV.
        </h2>
        <p className="mt-5 text-lg text-slate-300 md:text-xl">
          Free to build. $5 only if you love it enough to download without the
          watermark.
        </p>

        <div className="mt-10">
          <Button
            href="https://app.makemycv.ae"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            withArrow
            data-event="home_final_cta_click"
          >
            Build My CV — Free
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Lock size={14} className="text-blue-400" />
            Your data stays in your browser
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap size={14} className="text-blue-400" />
            Ready in 5 minutes
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CreditCard size={14} className="text-blue-400" />
            No card required
          </span>
        </div>
      </div>
    </section>
  );
}
