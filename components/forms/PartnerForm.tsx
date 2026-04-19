"use client";

import { useState } from "react";
import { CheckCircle, Lock } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";
import { trackPartnerFormSubmit } from "@/lib/analytics";

// TODO Phase 1: replace WhatsApp redirect with API call → Airtable / webhook → CRM.
export function PartnerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    const data = new FormData(e.currentTarget);
    const msg = `Hi PillR! I'd like to partner my pharmacy.

Pharmacy Name: ${data.get("shopName")}
Owner / Manager: ${data.get("ownerName")}
Phone: ${data.get("phone")}
Email: ${data.get("email") || "—"}
Address: ${data.get("address")}
Drug Licence Number: ${data.get("licence")}
Pin Code: ${data.get("pin")}
Heard from: ${data.get("source")}`;
    trackPartnerFormSubmit();
    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
    setSubmitted(true);
    e.currentTarget.reset();
  }

  if (submitted) {
    return (
      <div className="rounded-md bg-pillr-section border border-verified/30 p-6 text-center">
        <CheckCircle className="mx-auto text-verified mb-3" size={36} />
        <h3 className="font-heading font-bold text-white text-lg">Application Received!</h3>
        <p className="text-sm text-pillr-muted mt-1">We&apos;ll call you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field name="shopName" label="Pharmacy Name" required />
      <Field name="ownerName" label="Owner / Manager Name" required />
      <Field name="phone" label="Phone Number" type="tel" pattern="[0-9]{10}" required />
      <Field name="email" label="Email (optional)" type="email" />
      <Field name="address" label="Pharmacy Address" textarea required />
      <Field name="licence" label="Drug Licence Number" required />
      <Field name="pin" label="Pin Code" pattern="[0-9]{6}" required />
      <Select
        name="source"
        label="How did you hear about PillR?"
        options={["WhatsApp", "Google", "Friend", "Social Media", "Other"]}
      />

      <label className="flex items-start gap-3 text-sm text-pillr-muted cursor-pointer select-none">
        <input
          type="checkbox"
          required
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-4 w-4 accent-pillr-red"
        />
        <span>
          I agree to receive WhatsApp messages from PillR.in for partnership updates.
        </span>
      </label>

      <button
        type="submit"
        className="btn-base btn-primary w-full"
        aria-label="Submit partner application"
      >
        Submit Application
      </button>

      <p className="flex items-center justify-center gap-2 text-sm text-pillr-muted">
        <Lock size={14} />
        Your information is secure and only used for partnership communication.
      </p>
    </form>
  );
}

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  pattern?: string;
};

function Field({ name, label, type = "text", required, textarea, pattern }: FieldProps) {
  const cls =
    "w-full bg-pillr-black border border-pillr-section rounded-md px-3 py-3 text-base text-white placeholder:text-pillr-muted focus:outline-none focus:border-pillr-red transition-colors";
  return (
    <label htmlFor={name} className="block">
      <span className="block text-sm font-heading font-semibold text-white mb-1.5">
        {label}
        {required ? <span className="text-pillr-red"> *</span> : null}
      </span>
      {textarea ? (
        <textarea id={name} name={name} rows={3} required={required} className={cls} />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          pattern={pattern}
          className={cls}
        />
      )}
    </label>
  );
}

function Select({ name, label, options }: { name: string; label: string; options: readonly string[] }) {
  return (
    <label htmlFor={name} className="block">
      <span className="block text-sm font-heading font-semibold text-white mb-1.5">{label}</span>
      <select
        id={name}
        name={name}
        defaultValue=""
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
