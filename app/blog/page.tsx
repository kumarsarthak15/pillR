import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getAllPosts, formatBlogDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Medicine Delivery, Pharmacy & Pune Healthcare",
  description:
    "Practical guides on ordering medicines, choosing licensed pharmacies, and getting healthcare faster in Pune. Written by the MediGrab team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "MediGrab Blog | Medicine Delivery & Pharmacy Guides",
    description: "Practical guides on medicine delivery, pharmacy regulation, and healthcare in Pune.",
    url: "/blog"
  }
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />

      {/* ── Hero ── */}
      <section className="bg-medigrab-navy py-16 md:py-20">
        <div className="mx-auto max-w-container px-5 md:px-6 max-w-4xl">
          <p className="font-heading font-semibold text-[13px] tracking-[0.2em] uppercase text-medigrab-teal mb-4">
            The MediGrab Blog
          </p>
          <h1 className="font-display text-[36px] md:text-[52px] text-white mb-4 leading-[1.05]">
            Notes on medicine, delivery, and getting healthcare faster.
          </h1>
          <p className="text-lg md:text-xl text-medigrab-muted max-w-2xl">
            Practical guides for patients in Pune — written by the team building MediGrab.
          </p>
        </div>
      </section>

      {/* ── Post grid ── */}
      <section className="bg-medigrab-card py-14 md:py-20">
        <div className="mx-auto max-w-container px-5 md:px-6">
          {posts.length === 0 ? (
            <p className="text-center text-medigrab-muted">No posts yet — check back soon.</p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full rounded-[20px] bg-medigrab-section border border-white/5 p-7 transition-all duration-base hover:-translate-y-1 hover:border-medigrab-teal/40 hover:shadow-hover"
                  >
                    <div className="flex items-center gap-3 text-xs text-medigrab-muted mb-4">
                      <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} aria-hidden="true" />
                        {post.readingMinutes} min read
                      </span>
                    </div>
                    <h2 className="font-heading font-bold text-[20px] md:text-[22px] text-white mb-3 leading-snug group-hover:text-medigrab-teal transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm md:text-base text-[#D1D5DB] mb-5 line-clamp-3">
                      {post.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-medigrab-teal">
                      Read article
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
