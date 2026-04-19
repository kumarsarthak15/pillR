import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalH2 } from "@/components/ui/LegalPageLayout";
import { SITE_CONFIG, CDSCO_DISCLAIMER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `${SITE_CONFIG.name} terms of service for customers and pharmacy partners.`
};

export default function TermsPage() {
  // TODO: legal entity name finalised before launch.
  return (
    <LegalPageLayout title="Terms of Service" updated="April 2026">
      <p>
        These Terms govern your use of {SITE_CONFIG.domain} and the {SITE_CONFIG.name} medicine
        delivery facilitation service operated by <strong>{SITE_CONFIG.legalEntity}</strong>.
      </p>

      <LegalH2>1. Acceptance of Terms</LegalH2>
      <p>
        By using our website or messaging us on WhatsApp to place an order, you accept these
        Terms.
      </p>

      <LegalH2>2. Service Description</LegalH2>
      <p>{CDSCO_DISCLAIMER}</p>

      <LegalH2>3. Eligibility</LegalH2>
      <p>You must be 18 years or older to use this service.</p>

      <LegalH2>4. User Obligations</LegalH2>
      <ul>
        <li>Provide accurate name, address, and contact information.</li>
        <li>
          Provide a valid prescription from a registered medical practitioner for any
          Schedule H, H1, or X medicine.
        </li>
        <li>Not misuse the service for fraudulent or illegal purposes.</li>
      </ul>

      <LegalH2>5. Ordering & Delivery</LegalH2>
      <p>
        Orders are placed via WhatsApp. We target a 30-minute delivery window in serviceable
        areas of {SITE_CONFIG.city}, but actual times depend on weather, traffic, distance,
        and stock availability. 30 minutes is a target, not a guarantee.
      </p>

      <LegalH2>6. Pricing & Payment</LegalH2>
      <p>
        Prices are confirmed by the dispensing pharmacist before order acceptance. All prices
        include GST where applicable. Payment via Cash on Delivery or Razorpay (UPI, card,
        netbanking).
      </p>

      <LegalH2>7. Cancellation</LegalH2>
      <p>
        You may cancel any order on WhatsApp before the pharmacy confirms preparation. Once
        the order is dispatched, please refer to our Refund Policy.
      </p>

      <LegalH2>8. Refund Policy</LegalH2>
      <p>
        See our full <Link href="/refund">Refund Policy</Link>. In summary: damaged, wrong, or
        non-delivered orders are refundable within 24 hours of delivery.
      </p>

      <LegalH2>9. Prescription Medicines</LegalH2>
      <p>
        Schedule H, H1, and X medicines require a valid prescription. The fulfilling
        pharmacist may refuse to dispense if the prescription is invalid or missing.
      </p>

      <LegalH2>10. Limitation of Liability</LegalH2>
      <p>
        {SITE_CONFIG.name} is a facilitator. Partner pharmacies are responsible for the
        quality, authenticity, and dispensing of medicines. {SITE_CONFIG.legalEntity}&apos;s
        total liability for any single order is limited to the value of that order.
      </p>

      <LegalH2>11. Intellectual Property</LegalH2>
      <p>
        The {SITE_CONFIG.name} brand, logo, content, and design are the property of
        {" "}{SITE_CONFIG.legalEntity}. Unauthorised use is prohibited.
      </p>

      <LegalH2>12. Governing Law</LegalH2>
      <p>
        These Terms are governed by the laws of India. Jurisdiction: courts of {SITE_CONFIG.city},
        Maharashtra.
      </p>

      <LegalH2>13. Dispute Resolution</LegalH2>
      <p>
        Please contact us at <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a> first.
        Unresolved disputes will be referred to arbitration in {SITE_CONFIG.city} under the
        Arbitration and Conciliation Act, 1996.
      </p>

      <LegalH2>14. Modifications</LegalH2>
      <p>
        We may update these Terms from time to time. Material changes will be notified on
        this page and via WhatsApp or email.
      </p>

      <LegalH2>15. Contact</LegalH2>
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
