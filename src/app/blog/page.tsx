import { allPosts } from "content-collections";
import type { Metadata } from "next";
import BlogMagazine, { SerializedPost } from "@/components/blog-magazine";

export const metadata: Metadata = {
  title: "The Journal | Blog",
  description: "Long-form notes on business analysis, requirements engineering, product architecture, and technical workflows by Mustafa Pinjari.",
  openGraph: {
    title: "The Journal | Mustafa Pinjari",
    description: "Long-form notes on business analysis, requirements engineering, product architecture, and technical workflows by Mustafa Pinjari.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Journal | Mustafa Pinjari",
    description: "Long-form notes on business analysis, requirements engineering, product architecture, and technical workflows by Mustafa Pinjari.",
  },
};

export default function BlogPage() {
  const sortedPosts: SerializedPost[] = [...allPosts]
    .sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map((p) => ({
      slug: p._meta.path.replace(/\.mdx$/, ""),
      title: p.title,
      publishedAt: p.publishedAt,
      summary: p.summary,
      image: p.image,
      author: p.author,
      readingTime: (p as any).readingTime || "5 min read",
    }));

  return (
    <section id="blog" className="min-h-dvh">
      <BlogMagazine posts={sortedPosts} />
    </section>
  );
}
