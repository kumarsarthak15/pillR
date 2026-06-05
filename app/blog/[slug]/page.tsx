import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllPostSlugs, getPostBySlug, formatBlogDate } from "@/lib/blog";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description
    }
  };
}

export default async function BlogPostPage({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: { "@type": "ImageObject", url: `${SITE_CONFIG.url}/logo.png` }
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_CONFIG.url}/blog/${post.slug}` },
    keywords: post.tags.join(", ")
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title }
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ── Article header ── */}
      <section className="bg-medigrab-navy pt-12 md:pt-16 pb-10">
        <div className="mx-auto max-w-container px-5 md:px-6 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-medigrab-muted hover:text-medigrab-teal transition-colors mb-8"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to all posts
          </Link>

          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-5" aria-label="Tags">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center rounded-full bg-medigrab-card px-2.5 py-1 text-[11px] font-heading font-semibold uppercase tracking-wider text-medigrab-teal"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <h1 className="font-display text-[32px] md:text-[44px] text-white leading-[1.1] mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-medigrab-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} aria-hidden="true" />
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {post.readingMinutes} min read
            </span>
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <section className="bg-medigrab-card py-12 md:py-16">
        <div className="mx-auto max-w-container px-5 md:px-6 max-w-3xl">
          <article
            className="prose-medigrab"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* CTA */}
          <div className="mt-14 rounded-[20px] bg-medigrab-section border border-medigrab-teal/20 p-7 md:p-8">
            <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-2">
              Need medicine in Pune right now?
            </h2>
            <p className="text-medigrab-muted mb-5">
              Order on WhatsApp from a CDSCO-licensed pharmacy. Delivered in about 30 minutes.
            </p>
            <Link href="/" className="btn-base btn-primary">
              Start an order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
