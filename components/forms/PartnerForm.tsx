"use client";

import { useState } from "react";
import { CheckCircle, Lock } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";
import { trackPartnerFormSubmit } from "@/lib/analytics";
import { submitToWeb3Forms } from "@/lib/formSubmit";

export function PartnerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    const form = e.currentTarget;
    const data = new FormData(form);

    const shopName = String(data.get("shopName") || "");
    const ownerName = String(data.get("ownerName") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const address = String(data.get("address") || "");
    const licence = String(data.get("licence") || "");
    const pin = String(data.get("pin") || "");
    const source = String(data.get("source") || "");

    setSubmitting(true);

    // 1. Capture pharmacy lead to inbox.
    await submitToWeb3Forms({
      form_type: "pharmacy_partner",
      subject: `[Pharmacy Partner] ${shopName} — ${ownerName}`,
      from_name: ownerName,
      email,
      phone,
      pharmacy_name: shopName,
      pharmacy_address: address,
      drug_licence_number: licence,
      pin_code: pin,
      heard_from: source,
      page: typeof window !== "undefined" ? window.location.href : ""
    });

    // 2. Track + open WhatsApp for immediate engagement.
    const waMsg = `Hi MediGrab! I'd like to partner my pharmacy.

Pharmacy Name: ${shopName}
Owner / Manager: ${ownerName}
Phone: ${phone}
Email: ${email || "—"}
Address: ${address}
Drug Licence Number: ${licence}
Pin Code: ${pin}
Heard from: ${source}`;
    trackPartnerFormSubmit();
    window.open(whatsappUrl(waMsg), "_blank", "noopener,noreferrer");

    setSubmitting(false);
    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <div className="rounded-md bg-medigrab-section border border-verified/30 p-6 text-center">
        <CheckCircle className="mx-auto text-verified mb-3" size={36} />
        <h3 className="font-heading font-bold text-white text-lg">Application Received!</h3>
        <p className="text-sm text-medigrab-muted mt-1">We&apos;ll call you within 24 hours.</p>
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
        label="How did you hear about MediGrab?"
        options={["WhatsApp", "Google", "Friend", "Social Media", "Other"]}
      />

      <label className="flex items-start gap-3 text-sm text-medigrab-muted cursor-pointer select-none">
        <input
          type="checkbox"
          required
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-4 w-4 accent-medigrab-teal"
        />
        <span>
          I agree to receive WhatsApp messages from MediGrab for partnership updates.
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="btn-base btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label="Submit partner application"
      >
        {submitting ? "Submitting…" : "Submit Application"}
      </button>

      <p className="flex items-center justify-center gap-2 text-sm text-medigrab-muted">
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
    "w-full bg-medigrab-navy border border-medigrab-section rounded-md px-3 py-3 text-base text-white placeholder:text-medigrab-muted focus:outline-none focus:border-medigrab-teal transition-colors";
  return (
    <label htmlFor={name} className="block">
      <span className="block text-sm font-heading font-semibold text-white mb-1.5">
        {label}
        {required ? <span className="text-medigrab-teal"> *</span> : null}
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
