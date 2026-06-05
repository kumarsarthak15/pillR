"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";
import { trackContactFormSubmit } from "@/lib/analytics";
import { submitToWeb3Forms } from "@/lib/formSubmit";

const SUBJECTS = ["General Inquiry", "Partnership", "Investment", "Press", "Complaint", "Other"];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "");
    const message = String(data.get("message") || "");

    setSubmitting(true);

    // 1. Capture the lead to our inbox (non-blocking on failure).
    await submitToWeb3Forms({
      form_type: "contact",
      subject: `[Contact] ${subject} — ${name}`,
      from_name: name,
      email,
      message,
      page: typeof window !== "undefined" ? window.location.href : ""
    });

    // 2. Track + open WhatsApp for instant follow-up.
    const waMsg = `Hi MediGrab! New contact form submission.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;
    trackContactFormSubmit();
    window.open(whatsappUrl(waMsg), "_blank", "noopener,noreferrer");

    setSubmitting(false);
    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <div className="rounded-md bg-medigrab-section border border-verified/30 p-6 text-center">
        <CheckCircle className="mx-auto text-verified mb-3" size={36} />
        <h3 className="font-heading font-bold text-white text-lg">Message sent!</h3>
        <p className="text-sm text-medigrab-muted mt-1">We&apos;ll reply within 2 hours during business hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField name="name" label="Your Name" required />
      <FormField name="email" label="Email" type="email" required />
      <FormSelect name="subject" label="Subject" options={SUBJECTS} required />
      <FormField name="message" label="Message" textarea required minLength={20} />
      <button type="submit" disabled={submitting} className="btn-base btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  minLength?: number;
};

function FormField({ name, label, type = "text", required, textarea, minLength }: FieldProps) {
  const cls =
    "w-full bg-medigrab-navy border border-medigrab-section rounded-md px-3 py-3 text-base text-white placeholder:text-medigrab-muted focus:outline-none focus:border-medigrab-teal transition-colors";
  return (
    <label htmlFor={name} className="block">
      <span className="block text-sm font-heading font-semibold text-white mb-1.5">
        {label}
        {required ? <span className="text-medigrab-teal"> *</span> : null}
      </span>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          required={required}
          minLength={minLength}
          className={cls}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          minLength={minLength}
          className={cls}
        />
      )}
    </label>
  );
}

function FormSelect({
  name,
  label,
  options,
  required
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="block text-sm font-heading font-semibold text-white mb-1.5">
        {label}
        {required ? <span className="text-medigrab-teal"> *</span> : null}
      </span>
      <select
        id={name}
        name={name}
        defaultValue=""
        required={required}
        className="w-full bg-medigrab-navy border border-medigrab-section rounded-md px-3 py-3 text-base text-white focus:outline-none focus:border-medigrab-teal transition-colors"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
