import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import readingTime from "reading-time";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;             // ISO date e.g. 2026-06-06
  author: string;
  tags: string[];
  readingMinutes: number;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readPostFile(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const stats = readingTime(parsed.content);
  return { parsed, stats };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => {
      const { parsed, stats } = readPostFile(slug);
      const data = parsed.data as Partial<BlogPostMeta>;
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "1970-01-01",
        author: data.author ?? "MediGrab Team",
        tags: data.tags ?? [],
        readingMinutes: Math.max(1, Math.round(stats.minutes))
      } satisfies BlogPostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { parsed, stats } = readPostFile(slug);
    const data = parsed.data as Partial<BlogPostMeta>;
    const processed = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(parsed.content);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "1970-01-01",
      author: data.author ?? "MediGrab Team",
      tags: data.tags ?? [],
      readingMinutes: Math.max(1, Math.round(stats.minutes)),
      contentHtml: processed.toString()
    };
  } catch {
    return null;
  }
}

export function formatBlogDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
