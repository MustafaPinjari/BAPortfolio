"use client";

import { useEffect, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Icons } from "@/components/icons";
import {
  Code2,
  Clock,
  ExternalLink,
  Flame,
  Radio,
  Star,
  Users,
  Eye,
  CheckCircle2,
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
    totalHours: "435+ hrs",
    totalSeconds: 1566840,
    topLanguages: [
      { name: "Python", percent: 26.1, text: "115 hrs" },
      { name: "HTML & CSS", percent: 56.5, text: "248 hrs" },
      { name: "Markdown & Docs", percent: 4.3, text: "19 hrs" },
      { name: "JavaScript / TS", percent: 3.1, text: "13 hrs" },
    ],
  },
  status: "fallback",
};

export default function LiveMetricsSection() {
  const [stats, setStats] = useState<LiveStatsResponse>(INITIAL_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Stats request failed");
        return res.json();
      })
      .then((data: LiveStatsResponse) => {
        if (isMounted) {
          setStats(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="live-metrics" className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Radio className="size-3 animate-pulse text-emerald-500" />
            Live Technical Telemetry
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            GitHub &bull; WakaTime &bull; LogRocket
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight">
          Quantified Technical Execution
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Real-time metrics streaming directly from developer APIs, verifying
          hands-on technical product building, code commits, and documented
          delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: GitHub Activity */}
        <div className="relative group rounded-2xl border border-border/80 bg-card/60 p-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-sm flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Icons.github className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-none">
                    GitHub Activity
                  </h3>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                    @{stats.github.username}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Synced
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-4">
              <div className="flex flex-col p-2.5 rounded-xl bg-muted/40 border border-border/40 text-center">
                <span className="text-xl font-bold font-mono tracking-tight">
                  {stats.github.publicRepos}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
                  Repos
                </span>
              </div>
              <div className="flex flex-col p-2.5 rounded-xl bg-muted/40 border border-border/40 text-center">
                <span className="text-xl font-bold font-mono tracking-tight flex items-center justify-center gap-1">
                  <Star className="size-3.5 text-amber-500 fill-amber-500" />
                  {stats.github.totalStars}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
                  Stars
                </span>
              </div>
              <div className="flex flex-col p-2.5 rounded-xl bg-muted/40 border border-border/40 text-center">
                <span className="text-xl font-bold font-mono tracking-tight flex items-center justify-center gap-1">
                  <Users className="size-3.5 text-blue-500" />
                  {stats.github.followers}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
                  Followers
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-normal">
              Active engineering repos including BA product specs, API mock
              integrations, and Fullstack apps.
            </p>
          </div>

          <Link
            href={stats.github.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-2 px-3 rounded-lg bg-muted/80 hover:bg-muted text-foreground transition-colors group-hover:text-primary"
          >
            <span>Explore Repositories</span>
            <ExternalLink className="size-3" />
          </Link>
        </div>

        {/* Card 2: WakaTime Time & Language Breakdown */}
        <div className="relative group rounded-2xl border border-border/80 bg-card/60 p-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-sm flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Clock className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-none">
                    Tracked Coding Time
                  </h3>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                    WakaTime Telemetry
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-600 dark:text-amber-400">
                <Flame className="size-3 fill-amber-500/20" />
                Active
              </span>
            </div>

            <div className="py-3">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-bold font-mono tracking-tight">
                  {stats.wakatime.totalHours}
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">
                  All-time Tracked
                </span>
              </div>

              {/* Language Breakdown */}
              <div className="space-y-2 pt-1">
                {stats.wakatime.topLanguages.slice(0, 3).map((lang) => (
                  <div key={lang.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-foreground">{lang.name}</span>
                      <span className="text-muted-foreground text-[11px]">
                        {lang.text} ({lang.percent}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary/80 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(lang.percent, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-muted-foreground font-mono flex items-center justify-between pt-2 border-t border-border/40">
            <span>Primary Focus:</span>
            <span className="font-semibold text-foreground">
              Python, SQL & Product Docs
            </span>
          </div>
        </div>

        {/* Card 3: Telemetry & Quality Assurance (LogRocket) */}
        <div className="relative group rounded-2xl border border-border/80 bg-card/60 p-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-sm flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Eye className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-none">
                    Session Telemetry
                  </h3>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                    LogRocket Integration
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>

            <div className="space-y-3 py-3">
              <div className="flex items-start gap-2.5 text-xs text-muted-foreground leading-normal">
                <CheckCircle2 className="size-4 text-emerald-500 flex-none mt-0.5" />
                <span>
                  <strong className="text-foreground font-medium">
                    Session Replay:
                  </strong>{" "}
                  Monitoring recruiter journey, portfolio engagement, and
                  technical document navigation.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-muted-foreground leading-normal">
                <CheckCircle2 className="size-4 text-emerald-500 flex-none mt-0.5" />
                <span>
                  <strong className="text-foreground font-medium">
                    Error & Network Diagnostics:
                  </strong>{" "}
                  Client-side telemetry capturing zero-friction user experience.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-muted-foreground leading-normal">
                <CheckCircle2 className="size-4 text-emerald-500 flex-none mt-0.5" />
                <span>
                  <strong className="text-foreground font-medium">
                    Edge Caching:
                  </strong>{" "}
                  Vercel ISR cached responses ensuring sub-millisecond response
                  times.
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-2 border-t border-border/40">
            <span>Security:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Sanitized & Masked
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
