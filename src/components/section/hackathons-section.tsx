import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";
import { Trophy, Sparkles } from "lucide-react";

export default function HackathonsSection() {
  return (
    <section id="hackathons" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">Hackathons & Competitions</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">I like building things</h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              I actively participate in hackathons to tackle complex business and technical challenges under strict time limits. Across 2022 and 2026, I&apos;ve built practical platforms—from e-commerce and campus ERPs to satellite telemetry portals and emergency protocol games—earning two Runner-Up finishes as Team Captain and product builder.
            </p>
          </div>
        </div>
        <Timeline>
          {DATA.hackathons.map((hackathon) => (
            <TimelineItem key={hackathon.title + hackathon.dates} className="w-full flex items-start justify-between gap-6 sm:gap-10">
              <TimelineConnectItem className="flex items-start justify-center">
                {hackathon.image ? (
                  <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none"
                  />
                ) : (
                  <div className="size-10 bg-card z-10 shrink-0 overflow-hidden border rounded-full shadow ring-2 ring-border flex items-center justify-center flex-none">
                    {hackathon.win ? (
                      <Trophy className="size-4.5 text-amber-500 fill-amber-500/20" />
                    ) : (
                      <Sparkles className="size-4 text-primary/70" />
                    )}
                  </div>
                )}
              </TimelineConnectItem>
              <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {hackathon.title && (
                    <h3 className="font-semibold leading-none">{hackathon.title}</h3>
                  )}
                  {hackathon.win && (
                    <Badge variant="outline" className="text-[11px] font-semibold border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 py-0 px-2 h-5">
                      🏆 {hackathon.win}
                    </Badge>
                  )}
                  {hackathon.project && (
                    <Badge variant="secondary" className="text-[11px] font-medium py-0 px-2 h-5">
                      Built: {hackathon.project}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                  {hackathon.dates && (
                    <time className="tabular-nums">{hackathon.dates}</time>
                  )}
                  {hackathon.dates && hackathon.location && (
                    <span>•</span>
                  )}
                  {hackathon.location && (
                    <span>{hackathon.location}</span>
                  )}
                </div>
                {hackathon.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                    {hackathon.description}
                  </p>
                )}
                {hackathon.links && hackathon.links.length > 0 && (
                  <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                    {hackathon.links.map((link, idx) => (
                      <Link
                        href={link.href}
                        key={idx}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Badge className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground">
                          {link.icon}
                          {link.title}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
