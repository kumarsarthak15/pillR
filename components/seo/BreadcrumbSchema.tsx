import { SITE_CONFIG } from "@/lib/constants";

export type BreadcrumbItem = {
  name: string;
  /** Absolute path on this site (e.g. "/about"). Omit for the current page. */
  href?: string;
};

/**
 * Emits a BreadcrumbList JSON-LD block so Google can show breadcrumbs in SERPs.
 * Place once near the top of a page. Last item should omit `href`.
 */
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const itemListElement = items.map((item, i) => {
    const entry: Record<string, unknown> = {
      "@type": "ListItem",
      position: i + 1,
      name: item.name
    };
    if (item.href) {
      entry.item = `${SITE_CONFIG.url}${item.href}`;
    }
    return entry;
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
