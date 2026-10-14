import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export interface LiveStatsResponse {
  github: {
    username: string;
    publicRepos: number;
    followers: number;
    totalStars: number;
    profileUrl: string;
  };
  wakatime: {
    totalHours: string;
    totalSeconds: number;
    topLanguages: {
      name: string;
      percent: number;
      text: string;
    }[];
  };
  status: "live" | "fallback";
}

export async function GET() {
  const githubToken =
    process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const wakaKey = process.env.WAKATIME_SECRET_KEY;

  // Defaults based on verified profile stats
  let githubData = {
    username: "MustafaPinjari",
    publicRepos: 38,
    followers: 30,
    totalStars: 5,
    profileUrl: "https://github.com/MustafaPinjari",
  };

  let wakatimeData = {
    totalHours: "435+ hrs",
    totalSeconds: 1566840,
    topLanguages: [
      { name: "Python", percent: 26.1, text: "115 hrs" },
      { name: "HTML & CSS", percent: 56.5, text: "248 hrs" },
      { name: "Markdown & Docs", percent: 4.3, text: "19 hrs" },
      { name: "JavaScript / TS", percent: 3.1, text: "13 hrs" },
    ],
  };

  let isLive = false;

  // 1. Fetch GitHub Live Stats
  try {
    const headers: Record<string, string> = {
      "User-Agent": "MustafaPinjari-Portfolio",
    };
    if (githubToken) {
      headers["Authorization"] = `token ${githubToken.trim()}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/MustafaPinjari", {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/users/MustafaPinjari/repos?per_page=100&type=owner", {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (userRes.ok) {
      const userData = await userRes.json();
      githubData.publicRepos = userData.public_repos ?? githubData.publicRepos;
      githubData.followers = userData.followers ?? githubData.followers;
      isLive = true;
    }

    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos)) {
        const totalStars = repos.reduce(
          (sum: number, r: { stargazers_count?: number }) =>
            sum + (r.stargazers_count || 0),
          0
        );
        githubData.totalStars = totalStars;
      }
    }
  } catch (err) {
    console.warn("GitHub live stats fetch failed, using fallback:", err);
  }

  // 2. Fetch WakaTime Live Stats
  if (wakaKey) {
    try {
      const auth = Buffer.from(wakaKey.trim()).toString("base64");
      const wakaRes = await fetch(
        "https://wakatime.com/api/v1/users/current/stats/all_time",
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "User-Agent": "MustafaPinjari-Portfolio",
          },
          next: { revalidate: 3600 },
        }
      );

      if (wakaRes.ok) {
        const json = await wakaRes.json();
        const data = json.data;
        if (data) {
          if (data.human_readable_total) {
            wakatimeData.totalHours = data.human_readable_total;
          }
          if (data.total_seconds) {
            wakatimeData.totalSeconds = Math.round(data.total_seconds);
          }
          if (Array.isArray(data.languages) && data.languages.length > 0) {
            wakatimeData.topLanguages = data.languages
              .slice(0, 4)
              .map((l: { name: string; percent: number; text: string }) => ({
                name: l.name,
                percent: Math.round(l.percent * 10) / 10,
                text: l.text,
              }));
          }
          isLive = true;
        }
      }
    } catch (err) {
      console.warn("WakaTime live stats fetch failed, using fallback:", err);
    }
  }

  const response: LiveStatsResponse = {
    github: githubData,
    wakatime: wakatimeData,
    status: isLive ? "live" : "fallback",
  };

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
