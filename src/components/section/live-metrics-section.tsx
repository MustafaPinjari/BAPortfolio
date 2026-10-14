"use client";

import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import {
  Clock,
  Radio,
  Star,
  Users,
  Eye,
  GitBranch,
  ShieldCheck,
  Layers,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import type { LiveStatsResponse } from "@/app/api/stats/route";

const INITIAL_STATS: LiveStatsResponse = {
  github: {
    username: "MustafaPinjari",
    publicRepos: 38,
    followers: 30,
    totalStars: 5,
    profileUrl: "https://github.com/MustafaPinjari",
  },
  wakatime: {
    totalHours: "435 hrs 14 mins",
    totalSeconds: 1566840,
    topLanguages: [
      { name: "HTML & UI", percent: 39.1, text: "172 hrs 13 mins" },
      { name: "Python", percent: 26.1, text: "115 hrs 1 min" },
      { name: "CSS & Systems", percent: 17.4, text: "76 hrs 22 mins" },
      { name: "Markdown & Specs", percent: 4.3, text: "18 hrs 53 mins" },
    ],
  },
  status: "fallback",
};

export default function LiveMetricsSection() {
  const [stats, setStats] = useState<LiveStatsResponse>(INITIAL_STATS);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Stats request failed");
        return res.json();
      })
      .then((data: LiveStatsResponse) => {
        if (isMounted) setStats(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="live-metrics" className="w-full flex flex-col gap-5 py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-zinc-300 bg-white/10">
            <span className="size-1.5 rounded-full bg-white/80" />
            <span>Developer Telemetry</span>
            <span className="text-zinc-500">&bull;</span>
            <span className="text-zinc-400">Live API Sync</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
            Quantified Technical Execution
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Real-time developer telemetry from GitHub &amp; WakaTime verifying hands-on product implementation.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-400">
          <Radio className="size-3 text-zinc-400" />
          <span>Automated 1h Sync</span>
        </div>
      </div>

      {/* Bento Grid (90% Black / 10% White, Borderless, Monochrome) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* BENTO 1: GitHub Activity (Span 2) */}
        <div className="md:col-span-2 rounded-2xl bg-black/90 text-white p-6 flex flex-col justify-between gap-5 transition-transform duration-200 hover:-translate-y-0.5">
          {/* Top Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center text-white flex-none">
                <Icons.github className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    GitHub Activity
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                    Synced
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  github.com/{stats.github.username}
                </p>
              </div>
            </div>

            <Link
              href={stats.github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <span>Profile</span>
              <ArrowUpRight className="size-3.5 text-zinc-300" />
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-xl bg-white/5 p-3.5 text-center">
              <span className="text-2xl font-bold font-mono tracking-tight text-white">
                {stats.github.publicRepos}
              </span>
              <div className="flex items-center justify-center gap-1 mt-1 text-[11px] text-zinc-400">
                <GitBranch className="size-3 text-zinc-400" />
                <span>Public Repos</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 p-3.5 text-center">
              <span className="text-2xl font-bold font-mono tracking-tight text-white flex items-center justify-center gap-1">
                <Star className="size-3.5 text-zinc-300 fill-zinc-300" />
                {stats.github.totalStars}
              </span>
              <div className="mt-1 text-[11px] text-zinc-400">
                <span>Stars</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 p-3.5 text-center">
              <span className="text-2xl font-bold font-mono tracking-tight text-white flex items-center justify-center gap-1">
                <Users className="size-3.5 text-zinc-300" />
                {stats.github.followers}
              </span>
              <div className="mt-1 text-[11px] text-zinc-400">
                <span>Followers</span>
              </div>
            </div>
          </div>

          {/* Bottom Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 text-xs">
            <span className="text-zinc-500 font-mono text-[11px]">Highlights:</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-zinc-200 text-xs">
              WariMitra (Safety Platform)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-zinc-200 text-xs">
              BA Documentation Catalog
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-zinc-200 text-xs">
              REST API Mockups
            </span>
          </div>
        </div>

        {/* BENTO 2: Session Telemetry (Span 1) */}
        <div className="rounded-2xl bg-black/90 text-white p-6 flex flex-col justify-between gap-4 transition-transform duration-200 hover:-translate-y-0.5">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Eye className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Telemetry
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    LogRocket Observability
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                Active
              </span>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-2.5 text-xs text-zinc-300 leading-normal">
                <div className="size-1.5 rounded-full bg-white/80 flex-none mt-1.5" />
                <div>
                  <strong className="text-white block font-medium">Session Replay</strong>
                  <span className="text-zinc-400 text-[11px]">
                    Recruiter interaction &amp; case study engagement tracking.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-zinc-300 leading-normal">
                <div className="size-1.5 rounded-full bg-white/80 flex-none mt-1.5" />
                <div>
                  <strong className="text-white block font-medium">Quality Assurance</strong>
                  <span className="text-zinc-400 text-[11px]">
                    Real-time exception capture and error isolation.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-zinc-300 leading-normal">
                <div className="size-1.5 rounded-full bg-white/80 flex-none mt-1.5" />
                <div>
                  <strong className="text-white block font-medium">Edge ISR Caching</strong>
                  <span className="text-zinc-400 text-[11px]">
                    Sub-millisecond static page delivery worldwide.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Status:</span>
            <span className="text-white font-medium">Operational</span>
          </div>
        </div>

        {/* BENTO 3: WakaTime Tracked Time (Span 2) */}
        <div className="md:col-span-2 rounded-2xl bg-black/90 text-white p-6 flex flex-col justify-between gap-5 transition-transform duration-200 hover:-translate-y-0.5">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Tracked Coding &amp; Spec Time
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    WakaTime automated IDE logging
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white block">
                  {stats.wakatime.totalHours}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                  Total Tracked
                </span>
              </div>
            </div>

            {/* Language Distribution in Clean Monochrome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {stats.wakatime.topLanguages.slice(0, 4).map((lang) => (
                <div
                  key={lang.name}
                  className="rounded-xl bg-white/5 p-3 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-200 font-medium">
                      {lang.name}
                    </span>
                    <span className="text-zinc-400 text-[11px]">
                      {lang.text} ({lang.percent}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/80 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(lang.percent, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <span className="font-mono text-[11px]">Primary Tools:</span>
            <span className="text-zinc-200 font-medium">
              Python, SQL, Markdown Docs &amp; Web Stack
            </span>
          </div>
        </div>

        {/* BENTO 4: Core Technical BA Stack (Span 1) */}
        <div className="rounded-2xl bg-black/90 text-white p-6 flex flex-col justify-between gap-4 transition-transform duration-200 hover:-translate-y-0.5">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Layers className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    BA Architecture
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Core Specifications
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                Agile
              </span>
            </div>

            <div className="space-y-2 pt-4">
              <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-200 font-medium">BRD &amp; FRD Specs</span>
                <span className="text-[10px] font-mono text-zinc-400">Audit Grade</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-200 font-medium">Gherkin BDD Stories</span>
                <span className="text-[10px] font-mono text-zinc-400">Given/When/Then</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-200 font-medium">SQL &amp; Diagnostics</span>
                <span className="text-[10px] font-mono text-zinc-400">PostgreSQL</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-200 font-medium">API Contracts</span>
                <span className="text-[10px] font-mono text-zinc-400">REST Specs</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Cadence:</span>
            <span className="text-white font-medium">2-Wk Sprint Cycles</span>
          </div>
        </div>
      </div>
    </section>
  );
}
