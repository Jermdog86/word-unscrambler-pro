import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type GeneratedPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  coverHint: string;
  content: string[];
};

type BlogDataFile = {
  backdatedPosts?: GeneratedPost[];
};

/**
 * Cron endpoint that generates weekly blog posts
 * Triggered by Vercel Cron Jobs (see vercel.json)
 * 
 * This endpoint should only be called by Vercel's internal cron scheduler
 * and requires the CRON_SECRET to be set in environment variables
 */
export async function POST(request: NextRequest) {
  // Verify the request is from Vercel's cron service
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Read the blog posts configuration
    const contentPath = path.join(process.cwd(), "content", "blog-posts.json");
    const raw = fs.readFileSync(contentPath, "utf8");
    const data = JSON.parse(raw) as BlogDataFile;

    // Calculate the date window for generation
    const todayLocal = new Date();
    const end = new Date(todayLocal.getFullYear(), todayLocal.getMonth(), todayLocal.getDate());
    const start = new Date(end);
    start.setMonth(start.getMonth() - 5);

    const toYmd = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };

    const topics = [
      "Rack Balance",
      "Blank Tile Timing",
      "Board Control",
      "Endgame Tracking",
      "Opening Move Choices",
      "Scoring Lanes",
      "Defensive Turns",
      "Hook Awareness",
      "Leave Quality",
      "Tempo Management"
    ];

    const tagsByTopic = [
      ["rack-management", "strategy", "scrabble"],
      ["wildcards", "tactics", "scrabble"],
      ["board-control", "decision-making", "scrabble"],
      ["endgame", "tracking", "advanced"],
      ["openings", "strategy", "beginner"],
      ["scoring", "patterns", "intermediate"],
      ["defense", "matchplay", "strategy"],
      ["hooks", "pattern-recognition", "training"],
      ["leave-quality", "improvement", "scrabble"],
      ["tempo", "midgame", "strategy"]
    ];

    const generated: GeneratedPost[] = [];
    const cursor = new Date(end);
    let i = 0;

    while (cursor >= start) {
      const ymd = toYmd(cursor);
      const topic = topics[i % topics.length];
      const tags = tagsByTopic[i % tagsByTopic.length];

      generated.push({
        slug: `weekly-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${ymd}`,
        title: `Weekly Word Strategy: ${topic} (${ymd})`,
        excerpt: `This week's playbook focuses on ${topic.toLowerCase()} so you can make stronger choices under time pressure.`,
        tags,
        publishedAt: ymd,
        coverHint: "Scrabble board strategy notes",
        content: [
          `This week, focus on ${topic.toLowerCase()} before chasing peak score on every turn. Small structural decisions create consistent wins over long matches.`,
          "Generate three candidate plays, then compare immediate points, rack leave, and what premium squares you open for the opponent.",
          "Run post-game review on only two critical turns where momentum shifted. This keeps analysis practical and repeatable.",
          "Repeat this routine for five games and track one KPI: how often your chosen move matches your best two-turn expected outcome."
        ]
      });

      cursor.setDate(cursor.getDate() - 7);
      i += 1;
    }

    generated.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));

    const startYmd = toYmd(start);
    const endYmd = toYmd(end);

    const inWindow = (post: GeneratedPost | undefined) => {
      if (!post || !post.publishedAt) return false;
      return post.publishedAt >= startYmd && post.publishedAt <= endYmd;
    };

    const existingBackdated: GeneratedPost[] = Array.isArray(data.backdatedPosts) ? data.backdatedPosts : [];
    const preserved = existingBackdated.filter((p) => !inWindow(p));

    data.backdatedPosts = [...preserved, ...generated].sort((a, b) =>
      a.publishedAt.localeCompare(b.publishedAt)
    );

    // Write updated blog posts back to file
    fs.writeFileSync(contentPath, JSON.stringify(data, null, 2) + "\n", "utf8");

    return NextResponse.json(
      {
        success: true,
        generatedCount: generated.length,
        startDate: startYmd,
        endDate: endYmd,
        firstPublished: generated[0]?.publishedAt,
        lastPublished: generated[generated.length - 1]?.publishedAt,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Blog generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate blog posts",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
