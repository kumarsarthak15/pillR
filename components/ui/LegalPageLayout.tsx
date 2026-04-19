import type { ReactNode } from "react";

export function LegalPageLayout({
  title,
  updated,
  children
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-pillr-black py-20">
      <div className="mx-auto max-w-[800px] px-6">
        <header className="mb-10">
          <h1 className="font-heading font-extrabold text-[36px] md:text-[44px] text-white mb-3 leading-tight">
            {title}
          </h1>
          <p className="text-sm text-pillr-muted">Last updated: {updated}</p>
        </header>
        <div className="legal-prose text-base text-[#D1D5DB] leading-[1.8]">{children}</div>
      </div>
    </section>
  );
}

export function LegalH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-heading font-bold text-[24px] text-white mt-12 mb-4">{children}</h2>
  );
}
