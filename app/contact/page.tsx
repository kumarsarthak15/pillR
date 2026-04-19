import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contact PillR | Get In Touch",
  description: `Reach the PillR team in ${SITE_CONFIG.city}. WhatsApp, phone, email, or contact form.`
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-pillr-black py-20">
        <div className="mx-auto max-w-container px-6 max-w-4xl">
          <h1 className="font-heading font-extrabold text-[36px] md:text-[52px] text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-pillr-muted">
            Questions, partnerships, press enquiries — we&apos;re here.
          </p>
        </div>
      </section>

      <section className="bg-pillr-card py-16 md:py-20">
        <div className="mx-auto max-w-container px-6 grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-[20px] bg-pillr-section p-6 border-l-4 border-whatsapp">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="text-whatsapp" size={24} />
                <h2 className="font-heading font-bold text-xl text-white">Chat on WhatsApp</h2>
              </div>
              <p className="text-sm text-pillr-muted mb-4">
                Fastest response — usually within minutes during business hours.
              </p>
              <WhatsAppButton label="Open WhatsApp" source="contact-page" />
            </div>

            <ContactCard Icon={Mail} title="Email">
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-pillr-red hover:underline break-all">
                {SITE_CONFIG.email}
              </a>
            </ContactCard>

            <ContactCard Icon={Phone} title="Phone">
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="text-pillr-red hover:underline">
                {SITE_CONFIG.phone}
              </a>
            </ContactCard>

            <ContactCard Icon={MapPin} title="Address">
              <address className="not-italic text-[#D1D5DB] text-sm leading-relaxed">
                <span className="block text-white font-semibold">{SITE_CONFIG.legalEntity}</span>
                {SITE_CONFIG.address}
              </address>
            </ContactCard>

            <ContactCard Icon={Clock} title="Operating hours">
              <p className="text-[#D1D5DB] text-sm">
                We respond within 2 hours during business hours (9 AM – 9 PM IST).
              </p>
            </ContactCard>
          </div>

          <div className="rounded-[20px] bg-pillr-section p-6 md:p-8 border border-white/5">
            <h2 className="font-heading font-bold text-xl text-white mb-6">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  Icon,
  title,
  children
}: {
  Icon: typeof Mail;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[20px] bg-pillr-section p-6">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="text-pillr-red" size={20} />
        <h2 className="font-heading font-bold text-base text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}
