import { CreditCard, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustChip } from "@/components/ui/TrustChip";

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
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <h2 className="font-display font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.05 }}>
          Your next UAE job starts with a CV
          <br className="hidden md:block" /> that actually gets read.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-slate-300">
          Free check. 30 seconds. No sign-up.
        </p>

        <div className="mt-10 flex justify-center">
          <Button
            href="https://app.makemycv.ae/resume-checker"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            withArrow
            data-event="resume_checker_cta_click"
            data-cta-location="final"
          >
            Check my CV — Free
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <TrustChip icon={Lock} label="No sign-up" tone="dark" />
          <TrustChip icon={Zap} label="30 seconds" tone="dark" />
          <TrustChip icon={CreditCard} label="No card required" tone="dark" />
        </div>
      </div>
    </section>
  );
}
