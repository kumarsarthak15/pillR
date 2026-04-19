"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";
import { trackContactFormSubmit } from "@/lib/analytics";

// TODO Phase 1: replace WhatsApp handoff with email API/webhook (Resend, Web3Forms, etc.).
const SUBJECTS = ["General Inquiry", "Partnership", "Investment", "Press", "Complaint", "Other"];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const msg = `Hi PillR! New contact form submission.

Name: ${data.get("name")}
Email: ${data.get("email")}
Subject: ${data.get("subject")}

Message:
${data.get("message")}`;
    trackContactFormSubmit();
    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
    setSubmitted(true);
    e.currentTarget.reset();
  }

  if (submitted) {
    return (
      <div className="rounded-md bg-pillr-section border border-verified/30 p-6 text-center">
        <CheckCircle className="mx-auto text-verified mb-3" size={36} />
        <h3 className="font-heading font-bold text-white text-lg">Message sent!</h3>
        <p className="text-sm text-pillr-muted mt-1">We&apos;ll reply within 2 hours during business hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField name="name" label="Your Name" required />
      <FormField name="email" label="Email" type="email" required />
      <FormSelect name="subject" label="Subject" options={SUBJECTS} required />
      <FormField name="message" label="Message" textarea required minLength={20} />
      <button type="submit" className="btn-base btn-primary w-full">
        Send Message
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
    "w-full bg-pillr-black border border-pillr-section rounded-md px-3 py-3 text-base text-white placeholder:text-pillr-muted focus:outline-none focus:border-pillr-red transition-colors";
  return (
    <label htmlFor={name} className="block">
      <span className="block text-sm font-heading font-semibold text-white mb-1.5">
        {label}
        {required ? <span className="text-pillr-red"> *</span> : null}
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
        {required ? <span className="text-pillr-red"> *</span> : null}
      </span>
      <select
        id={name}
        name={name}
        defaultValue=""
        required={required}
        className="w-full bg-pillr-black border border-pillr-section rounded-md px-3 py-3 text-base text-white focus:outline-none focus:border-pillr-red transition-colors"
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
