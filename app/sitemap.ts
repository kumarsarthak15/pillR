import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6
  }));

  return [
    { url: `${SITE_CONFIG.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_CONFIG.url}/for-shops`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_CONFIG.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_CONFIG.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_CONFIG.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...blogPosts,
    { url: `${SITE_CONFIG.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_CONFIG.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_CONFIG.url}/refund`, lastModified: now, changeFrequency: "yearly", priority: 0.3 }
  ];
}
