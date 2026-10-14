import { allPosts } from "content-collections";
import { formatDate } from "@/lib/utils";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import { ChevronLeft, ChevronRight, Clock, Calendar, User, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ALT_TEXT_MAP: Record<string, string> = {
  "mastering-brd-frd-requirements": "Defensible BRD and FRD requirements engineering framework and traceability matrix",
  "writing-user-stories-with-gherkin": "Agile user stories decomposition with Gherkin Given-When-Then acceptance criteria",
  "technical-ba-api-database-workflows": "Technical Business Analyst API contracts, data dictionaries, and system workflows",
  "gap-analysis-and-as-is-to-to-be-mapping": "Enterprise gap analysis workflow mapping As-Is state to To-Be target architecture",
  "agile-backlog-refinement-and-prioritization": "Agile sprint backlog refinement matrix comparing MoSCoW and RICE prioritization models",
  "stakeholder-management-for-technical-bas": "Stakeholder elicitation discovery workshops and RACI matrix governance framework",
  "sql-and-data-analytics-for-modern-bas": "SQL analytics query recipes for business analysts tracking product conversion funnels",
};

const CATEGORY_MAP: Record<string, string> = {
  "mastering-brd-frd-requirements": "Requirements Engineering",
  "writing-user-stories-with-gherkin": "Agile & Scrum",
  "technical-ba-api-database-workflows": "Systems Architecture",
  "gap-analysis-and-as-is-to-to-be-mapping": "Enterprise Analysis",
  "agile-backlog-refinement-and-prioritization": "Product Prioritization",
  "stakeholder-management-for-technical-bas": "Stakeholder Elicitation",
  "sql-and-data-analytics-for-modern-bas": "Product Telemetry",
};

function getSortedPosts() {
  return [...allPosts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path.replace(/\.mdx$/, "") === slug);

  if (!post) {
    return undefined;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post;

  return {
    title: `${title} | Mustafa Pinjari`,
    description,
    alternates: {
      canonical: `${DATA.url}/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${slug}`,
      ...(image && {
        images: [
          {
            url: `${DATA.url}${image}`,
            alt: ALT_TEXT_MAP[slug] || title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && {
        images: [`${DATA.url}${image}`],
      }),
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const sortedPosts = getSortedPosts();
  const currentIndex = sortedPosts.findIndex(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );
  const post = sortedPosts[currentIndex];

  if (!post) {
    notFound();
  }

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  const getSlug = (item: (typeof sortedPosts)[0]) =>
    item._meta.path.replace(/\.mdx$/, "");

  const readingTime = (post as any).readingTime || "5 min read";
  const category = CATEGORY_MAP[slug] || "Business Analysis";
  const altText = ALT_TEXT_MAP[slug] || post.title;

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    description: post.summary,
    image: post.image
      ? `${DATA.url}${post.image}`
      : `${DATA.url}/blog/${slug}/opengraph-image`,
    url: `${DATA.url}/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${DATA.url}/blog/${slug}`,
    },
    author: {
      "@type": "Person",
      name: DATA.name,
      url: DATA.url,
    },
    publisher: {
      "@type": "Person",
      name: DATA.name,
    },
    inLanguage: "en-US",
  }).replace(/</g, "\\u003c");

  return (
    <article id="blog-article" className="flex flex-col gap-8 pb-20 w-full">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: jsonLdContent,
        }}
      />

      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/60 pb-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
          aria-label="Back to Journal"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>The Journal</span>
        </Link>
        <span className="font-mono uppercase tracking-wider text-[11px] text-muted-foreground/80">
          {category}
        </span>
      </div>

      {/* Article Header (Editorial typography) */}
      <header className="flex flex-col gap-5 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-medium text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
            {category}
          </span>
          <span className="text-muted-foreground/40">•</span>
          <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
            <Clock className="size-3" />
            {readingTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-foreground leading-[1.15]">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans max-w-3xl">
          {post.summary}
        </p>

        {/* Author & Publication metadata */}
        <div className="flex items-center gap-3 pt-2 text-xs text-muted-foreground">
          <Avatar className="size-7 border border-border">
            <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
            <AvatarFallback>{DATA.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-medium text-foreground">{DATA.name}</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {formatDate(post.publishedAt)}
            </span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <>
                <span className="text-muted-foreground/40">•</span>
                <span>Updated {formatDate(post.updatedAt)}</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Featured Hero Image */}
      {post.image && (
        <div className="my-2 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/80 bg-neutral-900 relative shadow-sm">
          <Image
            src={post.image}
            alt={altText}
            priority
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      )}

      {/* Subtle Divider */}
      <div className="my-2 flex w-full items-center">
        <div
          className="flex-1 h-px bg-border/80"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          }}
        />
      </div>

      {/* Article Body Content */}
      <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-foreground prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-strong:text-foreground prose-blockquote:border-l-primary/60 prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg">
        <MDXContent code={post.mdx} components={mdxComponents} />
      </div>

      {/* Bottom Prev / Next Navigation */}
      <nav className="mt-14 pt-8 border-t border-border/70" aria-label="Article navigation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {previousPost ? (
            <Link
              href={`/blog/${getSlug(previousPost)}`}
              className="group flex flex-col gap-1.5 p-5 rounded-2xl border border-border/80 hover:border-primary/40 bg-card/60 hover:bg-card transition-all"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <ChevronLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Previous Article
              </span>
              <span className="text-sm font-serif font-medium group-hover:text-primary transition-colors line-clamp-2">
                {previousPost.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextPost ? (
            <Link
              href={`/blog/${getSlug(nextPost)}`}
              className="group flex flex-col gap-1.5 p-5 rounded-2xl border border-border/80 hover:border-primary/40 bg-card/60 hover:bg-card transition-all sm:text-right"
            >
              <span className="flex items-center sm:justify-end gap-1 text-xs text-muted-foreground font-mono">
                Next Article
                <ChevronRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="text-sm font-serif font-medium group-hover:text-primary transition-colors line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </nav>
    </article>
  );
}
