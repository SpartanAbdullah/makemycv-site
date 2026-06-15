import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SupportTip } from "@/components/SupportTip";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Support MakeMyCV",
  description:
    "MakeMyCV is free for UAE job seekers — no ads, no paywall. If it helped, an optional tip via Ko-fi keeps it free for the next person.",
  path: "/support",
});

const included = [
  "The full CV builder and every template",
  "JD Match — match your CV to any job, free",
  "Honest AI rewriting and the ATS resume checker",
  "PDF download, with no watermark",
];

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)",
        }}
      >
        <div className="hero-spotlight" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-blue-400">
            Support
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight-2 text-white md:text-[52px]">
            Free for job seekers. Kept alive by tips.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
            Everything on MakeMyCV is free to use — no ads, no paywall, no
            sign-up. If it helped your job search, a small tip keeps it running
            and free for the next person.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              What you get — all free
            </h2>
            <ul className="mt-6 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-slate-700">
                  <Check
                    size={18}
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              Tips are optional and never unlock anything — there&rsquo;s
              nothing locked. They simply help cover hosting and AI costs so the
              tools stay free.
            </p>
            <div className="mt-8">
              <Button
                href="https://app.makemycv.ae"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                withArrow
                data-event="support_build_cta_click"
              >
                Build my CV — Free
              </Button>
            </div>
          </div>

          <SupportTip />
        </div>
      </section>
    </>
  );
}
