"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { Search, Sparkles, ArrowRight, Clock, BookOpen, Layers, ShieldCheck, Database, ArrowUpRight } from "lucide-react";

export interface SerializedPost {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  author?: string;
  readingTime?: string;
}

interface BlogMagazineProps {
  posts: SerializedPost[];
}

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

function formatArchiveDate(dateStr: string) {
  const d = new Date(dateStr);
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function formatCoverDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function FallbackThumbnail({ index, title }: { index: number; title: string }) {
  const styles = [
    {
      bg: "bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900",
      accent: "text-amber-400 border-amber-500/20 bg-amber-500/10",
      code: "BRD / FRD Spec v2.4",
      sub: "Requirement Traceability Matrix",
    },
    {
      bg: "bg-gradient-to-br from-neutral-950 via-slate-950 to-neutral-900",
      accent: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      code: "Scenario: Checkout Flow",
      sub: "Given active cart | When pay | Then orderId",
    },
    {
      bg: "bg-gradient-to-br from-zinc-950 via-neutral-900 to-black",
      accent: "text-sky-400 border-sky-500/20 bg-sky-500/10",
      code: "GET /api/v1/orders/{id}",
      sub: "HTTP 200 OK • Payload Contract Validated",
    },
    {
      bg: "bg-gradient-to-br from-neutral-900 via-stone-950 to-neutral-950",
      accent: "text-purple-400 border-purple-500/20 bg-purple-500/10",
      code: "As-Is -> To-Be Transition",
      sub: "BPMN 2.0 Swimlane Process Architecture",
    },
    {
      bg: "bg-gradient-to-br from-neutral-950 via-neutral-900 to-stone-900",
      accent: "text-rose-400 border-rose-500/20 bg-rose-500/10",
      code: "MoSCoW & RICE Scoreboard",
      sub: "Backlog Prioritization & Sprint Triage",
    },
    {
      bg: "bg-gradient-to-br from-slate-950 via-neutral-900 to-neutral-950",
      accent: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
      code: "SELECT funnel_step, dropoff",
      sub: "Window Analytics & SQL Diagnostics",
    },
  ];

  const theme = styles[index % styles.length];

  return (
    <div className={`w-full h-full ${theme.bg} p-6 flex flex-col justify-between select-none relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="flex items-center justify-between z-10">
        <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${theme.accent}`}>
          {theme.code}
        </span>
        <div className="flex gap-1.5 opacity-40">
          <div className="size-2 rounded-full bg-neutral-400" />
          <div className="size-2 rounded-full bg-neutral-400" />
          <div className="size-2 rounded-full bg-neutral-400" />
        </div>
      </div>
      <div className="z-10 mt-auto">
        <p className="text-xs text-neutral-400 font-mono line-clamp-1">{theme.sub}</p>
        <p className="text-sm font-serif font-medium text-neutral-200 line-clamp-1 mt-1">{title}</p>
      </div>
    </div>
  );
}

function BlogCardImage({
  src,
  alt,
  priority = false,
  sizes,
  fallbackIndex,
  title,
}: {
  src?: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  fallbackIndex: number;
  title: string;
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return <FallbackThumbnail index={fallbackIndex} title={title} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      onError={() => setError(true)}
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-102"
    />
  );
}

export default function BlogMagazine({ posts }: BlogMagazineProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase().trim();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (CATEGORY_MAP[p.slug] || "").toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  const coverPost = posts[0];
  const archivePosts = useMemo(() => {
    if (searchQuery.trim()) {
      return filteredPosts;
    }
    return posts.slice(1);
  }, [posts, filteredPosts, searchQuery]);

  return (
    <div className="flex flex-col gap-12 pb-16 w-full">
      {/* Editorial Header */}
      <BlurFade delay={0.04}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
              EDITORIAL
            </span>
            <span className="text-neutral-500 text-xs">•</span>
            <span className="text-xs text-muted-foreground font-mono">
              Volume {new Date().getFullYear()}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-foreground">
            The journal
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Long-form notes on business analysis, requirements engineering, product architecture, and technical workflows. Search the archive or explore our featured cover story.
          </p>

          {/* Minimalist Search Bar */}
          <div className="mt-4 relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, framework, or keyword (e.g. BRD, SQL, Gherkin)..."
              aria-label="Search articles"
              className="w-full pl-10 pr-12 py-2.5 bg-card/60 hover:bg-card focus:bg-card border border-border/80 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground font-mono"
                aria-label="Clear search query"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </BlurFade>

      {/* Featured Cover Story Card (Shown when not actively searching) */}
      {!searchQuery && coverPost && (
        <BlurFade delay={0.08}>
          <div className="relative rounded-3xl overflow-hidden border border-border/80 bg-neutral-950 text-white p-6 sm:p-10 shadow-xl group transition-all duration-300">
            {/* Subtle ambient lighting accent */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Story Overview */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6 order-2 lg:order-1">
                {/* Pillar highlights */}
                <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
                      <Layers className="size-3.5 text-amber-400" />
                      <span>Process Modeling</span>
                    </div>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">
                      BPMN 2.0 swimlanes, rule-based state transitions, and handoffs.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
                      <ShieldCheck className="size-3.5 text-emerald-400" />
                      <span>Traceability</span>
                    </div>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">
                      End-to-end alignment from business vision to Gherkin test cases.
                    </p>
                  </div>
                </div>

                {/* Cover story title & excerpt */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md text-white border border-white/15">
                      <Sparkles className="size-3 text-amber-300" />
                      <span>Cover story</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      {CATEGORY_MAP[coverPost.slug] || "Analysis"}
                    </span>
                  </div>

                  <Link href={`/blog/${coverPost.slug}`} className="block group-hover:text-neutral-100 transition-colors">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal tracking-tight leading-tight text-white group-hover:underline decoration-white/30 underline-offset-4">
                      {coverPost.title}
                    </h2>
                  </Link>

                  <p className="text-neutral-300 text-sm leading-relaxed max-w-xl line-clamp-3">
                    {coverPost.summary}
                  </p>
                </div>

                {/* Author attribution row */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                    <Avatar className="size-6 border border-white/20">
                      <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
                      <AvatarFallback>{DATA.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-white">{DATA.name}</span>
                    <span className="text-neutral-500">•</span>
                    <span>{formatCoverDate(coverPost.publishedAt)}</span>
                    {coverPost.readingTime && (
                      <>
                        <span className="text-neutral-500">•</span>
                        <span className="inline-flex items-center gap-1 text-neutral-400">
                          <Clock className="size-3" />
                          {coverPost.readingTime}
                        </span>
                      </>
                    )}
                  </div>

                  <Link
                    href={`/blog/${coverPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-amber-300 transition-colors"
                  >
                    Read Story
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Featured Image */}
              <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
                <Link
                  href={`/blog/${coverPost.slug}`}
                  className="w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative block group/img bg-neutral-900"
                >
                  <BlogCardImage
                    src={coverPost.image}
                    alt={ALT_TEXT_MAP[coverPost.slug] || coverPost.title}
                    priority
                    sizes="(max-width: 1024px) 100vw, 340px"
                    fallbackIndex={0}
                    title={coverPost.title}
                  />
                </Link>
              </div>
            </div>
          </div>
        </BlurFade>
      )}

      {/* From the archive Section Header */}
      <BlurFade delay={0.12}>
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-foreground">
            {searchQuery ? `Search Results (${archivePosts.length})` : "From the archive"}
          </h2>
          <span className="text-xs font-mono text-muted-foreground">
            {archivePosts.length} {archivePosts.length === 1 ? "entry" : "entries"}
          </span>
        </div>
      </BlurFade>

      {/* 2-Column Grid matching the screenshot with consistent aspect ratio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {archivePosts.map((post, idx) => (
          <BlurFade key={post.slug} delay={0.14 + idx * 0.04}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-4 h-full"
            >
              {/* Thumbnail preview container with standard 16/10 aspect ratio */}
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border/80 bg-neutral-900 relative shadow-xs group-hover:shadow-xl transition-all duration-300">
                <BlogCardImage
                  src={post.image}
                  alt={ALT_TEXT_MAP[post.slug] || post.title}
                  priority={idx < 2}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  fallbackIndex={idx + 1}
                  title={post.title}
                />
              </div>

              {/* Metadata & Title */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-medium uppercase tracking-widest text-muted-foreground/80">
                    {formatArchiveDate(post.publishedAt)}
                  </span>
                  {post.readingTime && (
                    <>
                      <span className="text-muted-foreground/50">•</span>
                      <span className="text-muted-foreground/80 font-mono text-[11px] flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readingTime}
                      </span>
                    </>
                  )}
                  {CATEGORY_MAP[post.slug] && (
                    <span className="ml-auto text-[11px] font-mono text-primary/80 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                      {CATEGORY_MAP[post.slug]}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground group-hover:text-primary transition-colors tracking-tight line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {post.summary}
                </p>

                {/* Author row */}
                <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                  <Avatar className="size-5 border border-border/60">
                    <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
                    <AvatarFallback>{DATA.initials}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground/80">{DATA.name}</span>
                </div>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>

      {archivePosts.length === 0 && (
        <div className="py-16 text-center text-muted-foreground text-sm font-mono border border-dashed border-border rounded-2xl">
          No articles found matching &quot;{searchQuery}&quot;. Try searching for &quot;BRD&quot;, &quot;SQL&quot;, or &quot;Gherkin&quot;.
        </div>
      )}
    </div>
  );
}
