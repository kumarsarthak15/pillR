"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
    window.fbq?.("trackCustom", name, params);
  } catch {
    // analytics never blocks UX
  }
}

export const trackWhatsAppClick = (source: string = "unknown") =>
  trackEvent("whatsapp_click", { source });

export const trackPartnerFormSubmit = () => trackEvent("partner_form_submit");

export const trackContactFormSubmit = () => trackEvent("contact_form_submit");

export const trackEmailSignup = (source: string = "waitlist") =>
  trackEvent("email_signup", { source });
