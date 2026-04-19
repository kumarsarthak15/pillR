import type { Metadata } from "next";
import { LegalPageLayout, LegalH2 } from "@/components/ui/LegalPageLayout";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_CONFIG.name} collects, uses, and protects your personal data under the DPDP Act 2023.`
};

export default function PrivacyPage() {
  // TODO: legal entity name + grievance officer name finalised before launch.
  return (
    <LegalPageLayout title="Privacy Policy" updated="April 2026">
      <p>
        This Privacy Policy explains how <strong>{SITE_CONFIG.legalEntity}</strong> (operating
        as &ldquo;{SITE_CONFIG.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;) collects, uses, shares, and protects your personal data when you
        use {SITE_CONFIG.domain} or our medicine delivery facilitation service in
        {" "}{SITE_CONFIG.city}.
      </p>
      <p>
        We are a <strong>Data Fiduciary</strong> as defined under the Digital Personal Data
        Protection Act, 2023 (DPDP Act).
      </p>

      <LegalH2>1. Introduction</LegalH2>
      <p>
        PillR.in is a technology and logistics service that connects patients with
        CDSCO-licensed local pharmacies. This policy covers all data we handle in the course
        of providing that service.
      </p>

      <LegalH2>2. Information We Collect</LegalH2>
      <ul>
        <li>
          <strong>Personal data</strong> — name, phone number, email, delivery address.
        </li>
        <li>
          <strong>Order data</strong> — medicines ordered, prescription images, order history.
        </li>
        <li>
          <strong>Usage data</strong> — anonymised analytics, device type, browser, referral
          source, page views.
        </li>
        <li>
          <strong>Device data</strong> — IP address, operating system, approximate location
          (only when you grant permission for delivery routing).
        </li>
      </ul>

      <LegalH2>3. How We Use Your Information</LegalH2>
      <ul>
        <li>To process, route, and deliver your medicine orders.</li>
        <li>To communicate order status, delivery updates, and refunds.</li>
        <li>To improve service quality, response times, and inventory accuracy.</li>
        <li>To meet legal, tax, and pharmacy compliance obligations.</li>
      </ul>

      <LegalH2>4. Health Data</LegalH2>
      <p>
        Prescription images and medicine lists are <strong>health-adjacent data</strong> and
        are treated with elevated security. They are stored encrypted, accessed only by the
        fulfilling pharmacist and our limited support staff, and never used for marketing.
      </p>

      <LegalH2>5. Data Sharing</LegalH2>
      <ul>
        <li>
          <strong>Partner pharmacies</strong> — only the order details necessary to dispense.
        </li>
        <li>
          <strong>Delivery partners</strong> — only the address and contact info needed to
          deliver.
        </li>
        <li>
          <strong>Payment processors</strong> (Razorpay) — only the data required to process
          payment.
        </li>
        <li>
          <strong>Analytics providers</strong> (Google Analytics, Meta Pixel) — anonymised
          usage data only.
        </li>
      </ul>
      <p>We do <strong>not</strong> sell or rent your personal data to anyone.</p>

      <LegalH2>6. Cookies & Tracking</LegalH2>
      <p>
        We use essential cookies for site functionality, plus Google Analytics and Meta Pixel
        for anonymised usage measurement. You can disable non-essential cookies through your
        browser settings.
      </p>

      <LegalH2>7. Data Retention</LegalH2>
      <p>
        Order records and prescriptions are retained for the period required under Indian
        pharmacy and tax laws (typically 5–7 years). Personal data not legally required is
        deleted within 12 months of your last order or on your written request.
      </p>

      <LegalH2>8. Your Rights under the DPDP Act 2023</LegalH2>
      <ul>
        <li>Right to access your personal data.</li>
        <li>Right to correction of inaccurate data.</li>
        <li>Right to erasure of data not legally required.</li>
        <li>Right to data portability.</li>
        <li>Right to grievance redressal — see Section 13 below.</li>
      </ul>

      <LegalH2>9. Data Security</LegalH2>
      <p>
        Data is transmitted over HTTPS/TLS, stored encrypted at rest, and access is
        restricted to authorised personnel on a need-to-know basis.
      </p>

      <LegalH2>10. Children&apos;s Privacy</LegalH2>
      <p>
        PillR is for adults (18+). We do not knowingly collect personal data from children
        under 18. If you believe we have, contact us immediately and we will delete it.
      </p>

      <LegalH2>11. Third-Party Links</LegalH2>
      <p>
        Our site may link to third-party websites. We are not responsible for their privacy
        practices.
      </p>

      <LegalH2>12. Changes to This Policy</LegalH2>
      <p>
        We will post any updates on this page with a revised &ldquo;last updated&rdquo; date.
        Material changes will be notified via WhatsApp or email.
      </p>

      <LegalH2>13. Grievance Officer</LegalH2>
      <p>
        Name: [Grievance Officer Name]
        <br />
        Email: <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
        <br />
        Response timeline: within 48 hours of receipt.
      </p>

      <LegalH2>14. Contact</LegalH2>
      <p>
        {SITE_CONFIG.legalEntity}
        <br />
        {SITE_CONFIG.address}
        <br />
        Email: <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
        <br />
        Phone: <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}>{SITE_CONFIG.phone}</a>
      </p>
    </LegalPageLayout>
  );
}
