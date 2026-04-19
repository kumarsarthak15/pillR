import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_CONFIG.url}/`, lastModified: now, priority: 1.0 },
    { url: `${SITE_CONFIG.url}/for-shops`, lastModified: now, priority: 0.9 },
    { url: `${SITE_CONFIG.url}/about`, lastModified: now, priority: 0.8 },
    { url: `${SITE_CONFIG.url}/contact`, lastModified: now, priority: 0.7 },
    { url: `${SITE_CONFIG.url}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${SITE_CONFIG.url}/terms`, lastModified: now, priority: 0.3 },
    { url: `${SITE_CONFIG.url}/refund`, lastModified: now, priority: 0.3 }
  ];
}
