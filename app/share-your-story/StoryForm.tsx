"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition-all";
const labelClass =
  "block mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500";

/**
 * StoryForm — consent-based testimonial collection.
 *
 * Posts to the same Formspree endpoint as the contact form, tagged
 * type: "Testimonial" so submissions are easy to filter. Publishing consent is
 * an explicit, required checkbox; email is collected to verify authenticity and
 * is never published. Swap the endpoint for a dedicated Formspree form if you
 * want testimonials in a separate inbox.
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqeykryy";

const EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
  "Outside the UAE",
];

export const StoryForm = () => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    type: "Testimonial",
    name: "",
    email: "",
    role: "",
    emirate: "Dubai",
    outcome: "",
    story: "",
    consentPublish: false,
    initialsOnly: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consentPublish) return;
    setFormState("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2
          size={48}
          className="mx-auto mb-3 text-emerald-500"
          strokeWidth={2}
        />
        <h3 className="mb-2 text-xl font-bold text-green-800">
          Thank you — story received!
        </h3>
        <p className="text-sm text-green-700">
          We read every one. If we&apos;d like to feature yours, we&apos;ll email
          you first to confirm. Your story is only ever published with your
          consent.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formState === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Something went wrong. Please try again, or email hello@makemycv.ae.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name *</label>
          <input
            type="text"
            required
            placeholder="Your full name"
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            required
            placeholder="you@email.com"
            className={inputClass}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <p className="mt-1 text-[11px] text-slate-400">
            Private — used only to confirm it&apos;s really you. Never published.
          </p>
        </div>
        <div>
          <label className={labelClass}>Role / job title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Senior Accountant"
            className={inputClass}
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Emirate</label>
          <select
            className={inputClass}
            value={form.emirate}
            onChange={(e) => setForm({ ...form, emirate: e.target.value })}
          >
            {EMIRATES.map((em) => (
              <option key={em}>{em}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Outcome (optional)</label>
        <input
          type="text"
          placeholder="e.g. Hired at a DIFC audit firm, Feb 2026"
          className={inputClass}
          value={form.outcome}
          onChange={(e) => setForm({ ...form, outcome: e.target.value })}
        />
      </div>

      <div>
        <label className={labelClass}>Your story *</label>
        <textarea
          required
          rows={5}
          placeholder="What did MakeMyCV help you do? Be specific — what changed, and what happened next."
          className={inputClass}
          value={form.story}
          onChange={(e) => setForm({ ...form, story: e.target.value })}
        />
      </div>

      {/* Consent */}
      <div className="space-y-3 rounded-xl border border-slate-200 bg-paper-2 p-4">
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            checked={form.consentPublish}
            onChange={(e) =>
              setForm({ ...form, consentPublish: e.target.checked })
            }
          />
          <span>
            I&apos;m happy for MakeMyCV to share my story publicly (on the site
            or social), and understand it may be lightly edited for length.{" "}
            <span className="text-red-500">*</span>
          </span>
        </label>
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            checked={form.initialsOnly}
            onChange={(e) =>
              setForm({ ...form, initialsOnly: e.target.checked })
            }
          />
          <span>Show my name as initials only (e.g. &ldquo;R.H.&rdquo;).</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={formState === "submitting" || !form.consentPublish}
        className="btn-primary w-full rounded-2xl py-4 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {formState === "submitting" ? "Sending..." : "Share my story"}
      </button>
      <p className="text-center text-[11px] text-slate-400">
        We only publish real stories, with consent. No incentives, no fabricated
        reviews.
      </p>
    </form>
  );
};
