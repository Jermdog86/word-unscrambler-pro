import { getPublishedBlogPosts } from "@/lib/blog";

const base = "https://word-unscrambler-pro.vercel.app";

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getPublishedBlogPosts();

  const items = posts
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      const description = escapeXml(post.excerpt);
      const title = escapeXml(post.title);
      const pubDate = new Date(post.publishedAt).toUTCString();

      return `<item>
<title>${title}</title>
<link>${url}</link>
<guid>${url}</guid>
<pubDate>${pubDate}</pubDate>
<description>${description}</description>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>Word Unscrambler Pro Blog</title>
<link>${base}/blog</link>
<description>Strategy guides, drills, and practical tips for word games.</description>
<language>en-us</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
