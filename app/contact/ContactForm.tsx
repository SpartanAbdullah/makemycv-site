"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-line bg-sheet px-4 py-3 text-sm text-ink placeholder:text-muted outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft transition-all";
const labelClass =
  "block mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted";

export const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Question",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    try {
      const res = await fetch("https://formspree.io/f/mqeykryy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState("success");
        setForm({
          name: "",
          email: "",
          subject: "General Question",
          message: "",
        });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-3" strokeWidth={2} />
        <h3 className="font-bold text-green-800 text-xl mb-2">
          Message Sent!
        </h3>
        <p className="text-green-700 text-sm">
          We&apos;ll reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formState === "error" && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          Something went wrong. Please try again or email us directly at hello@makemycv.ae.
        </div>
      )}
      {/* id/htmlFor pairs: without them the select was an unnamed combobox
          and the text fields were named only by their vanishing placeholders
          (WCAG 1.3.1/4.1.2/3.3.2 — Part 3 review). */}
      <div>
        <label htmlFor="contact-name" className={labelClass}>Name *</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="Your full name"
          className={inputClass}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>Email *</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className={inputClass}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="contact-subject" className={labelClass}>Subject</label>
        <select
          id="contact-subject"
          name="subject"
          className={inputClass}
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        >
          <option>General Question</option>
          <option>Bug Report</option>
          <option>Feature Request</option>
          <option>Partnership</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>Message *</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="How can we help?"
          className={inputClass}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      <button
        type="submit"
        disabled={formState === "submitting"}
        className="btn-primary w-full text-white font-semibold py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {formState === "submitting" ? "Sending..." : "Send Message \u2192"}
      </button>
      {/* Consent notice \u2014 the details entered above go to Formspree and then
          our inbox; the Privacy Policy's "Contact form" section is the page
          this line points at. Keep the two in sync. */}
      <p className="text-center text-xs leading-relaxed text-muted">
        By clicking &ldquo;Send Message&rdquo;, you consent to us using the
        details you&apos;ve entered to respond to your enquiry, as described in
        our{" "}
        <Link
          href="/privacy"
          className="font-semibold text-ink-2 underline underline-offset-2 hover:text-accent"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
};
