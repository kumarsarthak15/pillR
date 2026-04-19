import type { Metadata } from "next";
import { LegalPageLayout, LegalH2 } from "@/components/ui/LegalPageLayout";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `${SITE_CONFIG.name} refund and return policy. 5–7 business day refunds via Razorpay.`
};

export default function RefundPage() {
  // TODO: legal entity name finalised before launch.
  return (
    <LegalPageLayout title="Refund Policy" updated="April 2026">
      <p>
        This policy explains when and how {SITE_CONFIG.name} (operated by
        {" "}<strong>{SITE_CONFIG.legalEntity}</strong>) processes refunds for medicine orders.
      </p>

      <LegalH2>1. Refund Eligibility</LegalH2>
      <ul>
        <li>Damaged, expired, or tampered medicines on delivery.</li>
        <li>Wrong medicine dispensed by the partner pharmacy.</li>
        <li>Non-delivery beyond a reasonable extended window after the ETA.</li>
      </ul>

      <LegalH2>2. Non-Refundable Items</LegalH2>
      <ul>
        <li>
          Correctly delivered medicines. Indian pharmacy regulations prohibit returns of
          dispensed medicines.
        </li>
        <li>Opened, used, or partially consumed packs.</li>
        <li>
          Customer-side errors after two delivery attempts (e.g. unavailable at the address
          twice).
        </li>
      </ul>

      <LegalH2>3. Refund Process</LegalH2>
      <ol>
        <li>Message us on WhatsApp within 24 hours of delivery.</li>
        <li>Share photos of the issue and your order ID.</li>
        <li>
          We investigate with the fulfilling pharmacy and respond within 48 hours with a
          decision.
        </li>
      </ol>

      <LegalH2>4. Refund Timeline</LegalH2>
      <p>
        Approved refunds are processed to the original payment method within
        {" "}<strong>5–7 business days</strong> via Razorpay (Razorpay&apos;s standard
        timeline). Cash-on-delivery refunds are issued via UPI to a number you provide.
      </p>

      <LegalH2>5. Cancellation Refunds</LegalH2>
      <p>
        Full refund if you cancel before the pharmacy confirms order preparation. No refund
        once the order is dispatched (subject to Section 1 above).
      </p>

      <LegalH2>6. Delivery Issues</LegalH2>
      <p>
        For delivery delays, partial deliveries, or service failures on our side, we will
        either re-deliver at no cost or process a full refund — your choice.
      </p>

      <LegalH2>7. Contact for Refunds</LegalH2>
      <p>
        WhatsApp:{" "}
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {SITE_CONFIG.whatsappNumber}
        </a>
        <br />
        Email: <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
        <br />
        Phone: <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}>{SITE_CONFIG.phone}</a>
      </p>
    </LegalPageLayout>
  );
}
