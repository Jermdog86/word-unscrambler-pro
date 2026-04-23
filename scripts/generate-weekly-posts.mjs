import fs from "node:fs";
import path from "node:path";

const filePath = path.join("content", "blog-posts.json");
const raw = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(raw);

const todayLocal = new Date();
const end = new Date(todayLocal.getFullYear(), todayLocal.getMonth(), todayLocal.getDate());
const start = new Date(end);
start.setMonth(start.getMonth() - 5);

const toYmd = (d) => {
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

const generated = [];
let cursor = new Date(end);
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

const inWindow = (post) => {
  if (!post || !post.publishedAt) return false;
  return post.publishedAt >= startYmd && post.publishedAt <= endYmd;
};

const existingBackdated = Array.isArray(data.backdatedPosts) ? data.backdatedPosts : [];
const preserved = existingBackdated.filter((p) => !inWindow(p));

data.backdatedPosts = [...preserved, ...generated].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));

fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");

console.log(
  JSON.stringify(
    {
      generatedCount: generated.length,
      startDate: startYmd,
      endDate: endYmd,
      firstPublished: generated[0]?.publishedAt,
      lastPublished: generated[generated.length - 1]?.publishedAt
    },
    null,
    2
  )
);
