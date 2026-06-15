import { ShieldCheck, PencilLine, MailCheck } from "lucide-react";
import { StoryForm } from "./StoryForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Share your MakeMyCV story",
  description:
    "Got hired using MakeMyCV? Share your story — with your consent, we may feature it to help the next UAE job seeker. Real stories only, never fabricated.",
  path: "/share-your-story",
  index: false,
});

const promises = [
  {
    icon: ShieldCheck,
    title: "Only with your consent",
    body: "We never publish anything until you tick the box — and we'll email before featuring you.",
  },
  {
    icon: PencilLine,
    title: "Lightly edited at most",
    body: "We may trim for length, never change your meaning. You can ask for initials only.",
  },
  {
    icon: MailCheck,
    title: "Real stories only",
    body: "No incentives, no invented reviews. Your email stays private and is only used to verify.",
  },
];

export default function ShareYourStoryPage() {
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
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-blue-400">
            Share your story
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight-2 text-white md:text-5xl">
            Got hired with MakeMyCV?
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
            Your story could help the next UAE job seeker know it works. Tell us
            what changed — and, if you&apos;re happy to, we&apos;ll feature it.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Promises */}
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              How we handle your story
            </h2>
            <ul className="mt-6 space-y-6">
              {promises.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                    <p.icon size={20} strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm-soft md:p-8">
            <StoryForm />
          </div>
        </div>
      </section>
    </>
  );
}
