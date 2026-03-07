"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 transition-all";
const labelClass =
  "block mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500";

export const ContactForm = () => {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="text-lg font-bold text-emerald-700">
          &#10003; Message sent!
        </p>
        <p className="mt-2 text-sm text-emerald-600">
          We&apos;ll reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-5"
    >
      <div>
        <label className={labelClass}>Name *</label>
        <input
          type="text"
          required
          placeholder="Your full name"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Email *</label>
        <input
          type="email"
          required
          placeholder="you@email.com"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Subject</label>
        <select className={inputClass} defaultValue="">
          <option value="" disabled>
            Select a topic
          </option>
          <option>General Question</option>
          <option>Bug Report</option>
          <option>Feature Request</option>
          <option>Partnership</option>
          <option>Pro Plan Info</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          required
          rows={5}
          placeholder="How can we help?"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-brand-blue px-7 py-3.5 font-bold text-white transition-all hover:bg-blue-700"
      >
        Send Message &rarr;
      </button>
    </form>
  );
};
