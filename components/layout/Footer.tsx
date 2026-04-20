import Link from "next/link";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { Logo } from "./Logo";
import {
  SITE_CONFIG,
  NAV_LINKS,
  LEGAL_LINKS,
  SOCIAL_LINKS,
  CDSCO_DISCLAIMER
} from "@/lib/constants";

const iconMap = {
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pillr-black border-t border-pillr-section">
      <div className="mx-auto max-w-container px-5 md:px-6 py-10 md:py-14 grid gap-8 md:gap-10 md:grid-cols-4">
        <div className="md:col-span-1 space-y-4">
          <Logo size="lg" />
          <p className="text-sm text-pillr-muted leading-relaxed max-w-[260px]">
            30-minute medicine delivery from CDSCO-licensed pharmacies in {SITE_CONFIG.city}.
            Order on WhatsApp, no app needed.
          </p>
        </div>

        <div>
          <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wide mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-pillr-muted hover:text-white transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wide mb-4">
            Legal
          </h3>
          <ul className="space-y-2 text-sm">
            {LEGAL_LINKS.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-pillr-muted hover:text-white transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wide mb-4">
            Contact
          </h3>
          <address className="not-italic text-sm text-pillr-muted leading-relaxed space-y-1">
            <div className="text-white">{SITE_CONFIG.legalEntity}</div>
            <div>{SITE_CONFIG.address}</div>
            <div>
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {SITE_CONFIG.phone}
              </a>
            </div>
            <div>
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white">
                {SITE_CONFIG.email}
              </a>
            </div>
          </address>

          <div className="mt-4 flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap];
              if (!Icon) return null;
              return (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-pillr-muted hover:text-pillr-red transition-transform duration-base hover:scale-[1.15]"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-pillr-section">
        <div className="mx-auto max-w-container px-5 md:px-6 py-5 flex flex-col gap-3 text-[12px] md:text-[13px] text-pillr-muted md:flex-row md:items-center md:justify-between">
          <span>© {year} {SITE_CONFIG.legalEntity}. All rights reserved.</span>
          <span className="md:max-w-[60%] md:text-right">{CDSCO_DISCLAIMER}</span>
        </div>
      </div>
    </footer>
  );
}
