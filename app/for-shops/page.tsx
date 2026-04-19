import type { Metadata } from "next";
import Link from "next/link";
import {
  PackageCheck,
  DollarSign,
  Truck,
  Users,
  ShieldCheck,
  ArrowDown
} from "lucide-react";
import { FAQ, type FaqItem } from "@/components/sections/FAQ";
import { PartnerForm } from "@/components/forms/PartnerForm";

export const metadata: Metadata = {
  title: "Partner With PillR | Zero-Cost Pharmacy Partnership",
  description:
    "Join 50+ pharmacies earning more with PillR. Zero cost. No commission. Apply in 2 minutes."
};

const BENEFITS = [
  {
    Icon: PackageCheck,
    title: "Extra Orders Daily",
    body:
      "Receive medicine orders from patients in your area. More footfall without marketing spend."
  },
  {
    Icon: DollarSign,
    title: "Zero Cost to Join",
    body:
      "No sign-up fee. No monthly charges. No commission on medicine prices. You keep your margins."
  },
  {
    Icon: Truck,
    title: "We Handle Delivery",
    body:
      "Our delivery network picks up and delivers. You just pack the order. No logistics headache."
  },
  {
    Icon: Users,
    title: "Keep Your Customers",
    body:
      "No exclusivity required. PillR adds new customers. Your existing business stays unchanged."
  }
];

const STEPS = [
  { n: "1", title: "Apply", body: "Fill the form below. We verify your drug license and location." },
  { n: "2", title: "Receive Orders", body: "Patients in your area order via WhatsApp. We notify you instantly." },
  { n: "3", title: "We Deliver", body: "Pack the order. Our rider picks it up. Patient receives in 30 minutes." }
];

const FAQS: FaqItem[] = [
  {
    q: "Is there any cost to join PillR?",
    a: "No. Zero. PillR is completely free to join for pharmacy partners during our Pune pilot. No sign-up fee, no monthly fee, no commission on medicine prices."
  },
  {
    q: "Do I need to give exclusive rights to PillR?",
    a: "Absolutely not. You keep all existing customers and continue your direct business. PillR only adds new orders on top."
  },
  {
    q: "How will I receive orders?",
    a: "Via WhatsApp or phone call from our coordination team. You confirm stock and price before we accept the customer order."
  },
  {
    q: "Who handles delivery?",
    a: "PillR's delivery network. You only need to pack the order. Our rider picks it up from your counter and delivers to the patient."
  },
  {
    q: "What about payment?",
    a: "Patients pay COD or via Razorpay link. Settlements happen daily/weekly to your registered bank account or UPI — your choice."
  },
  {
    q: "What if a medicine is out of stock?",
    a: "Simply inform us. We'll check the next nearest pharmacy in our network. Your only job is to be honest about stock."
  },
  {
    q: "Can I leave PillR anytime?",
    a: "Yes. No contracts. No lock-in. Just tell us and we'll stop routing orders to you immediately."
  }
];

export default function ForShopsPage() {
  return (
    <>
      <section className="bg-pillr-black min-h-[70vh] flex items-center py-20">
        <div className="mx-auto max-w-container px-6 text-center">
          <p className="font-heading font-semibold text-[13px] tracking-[0.2em] uppercase text-pillr-red mb-5">
            For Pharmacy Owners
          </p>
          <h1 className="font-heading font-extrabold text-[36px] md:text-[52px] text-white leading-tight max-w-3xl mx-auto mb-5">
            Get More Customers. <span className="text-pillr-red">Zero Investment.</span>
          </h1>
          <p className="text-lg md:text-xl text-pillr-muted max-w-2xl mx-auto mb-8">
            Join 50+ pharmacies already earning extra revenue through PillR. No fees. No
            commission on medicines. No exclusivity.
          </p>
          <a href="#partner-form" className="btn-base btn-primary">
            Apply Now — It&apos;s Free
            <ArrowDown size={18} />
          </a>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {["Zero cost to join", "Cancel anytime", "No exclusivity"].map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-pillr-card px-3 py-1.5 text-[13px] font-heading font-semibold text-pillr-muted"
              >
                <ShieldCheck size={14} className="text-verified" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-pillr-card py-16 md:py-24">
        <div className="mx-auto max-w-container px-6">
          <h2 className="font-heading font-bold text-[28px] md:text-[36px] text-white text-center mb-12">
            What&apos;s In It For You?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="rounded-[20px] bg-pillr-section p-8 transition-all duration-base hover:-translate-y-1 hover:shadow-hover"
              >
                <div className="w-14 h-14 rounded-full bg-pillr-red/10 inline-flex items-center justify-center mb-4">
                  <b.Icon size={26} className="text-pillr-red" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">{b.title}</h3>
                <p className="text-base text-[#D1D5DB]">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pillr-black py-16 md:py-24">
        <div className="mx-auto max-w-container px-6">
          <h2 className="font-heading font-bold text-[28px] md:text-[36px] text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-[20px] bg-pillr-card p-8">
                <div className="font-display text-5xl text-pillr-red mb-3">{s.n}</div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">{s.title}</h3>
                <p className="text-base text-[#D1D5DB]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pillr-card py-16 md:py-24">
        <div className="mx-auto max-w-container px-6">
          <h2 className="font-heading font-bold text-[28px] md:text-[36px] text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <FAQ items={FAQS} />
        </div>
      </section>

      <section id="partner-form" className="bg-pillr-black py-16 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-container px-6">
          <header className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading font-bold text-[28px] md:text-[36px] text-white mb-3">
              Partner With PillR
            </h2>
            <p className="text-pillr-muted">
              Fill in the details. We&apos;ll reach out within 24 hours.
            </p>
          </header>

          <div className="max-w-2xl mx-auto rounded-[20px] bg-pillr-card border border-pillr-section p-6 md:p-8">
            <PartnerForm />
          </div>

          <p className="text-center mt-6 text-sm text-pillr-muted">
            Want to chat first? <Link href="/contact" className="text-pillr-red hover:underline">Contact us</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
