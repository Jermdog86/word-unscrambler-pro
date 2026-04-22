const base = "https://word-unscrambler-pro.vercel.app";

export const revalidate = 86400;

export function GET() {
  const body = [
    "# Word Unscrambler Pro",
    "",
    "Purpose: Practical word game tools and educational guides for Scrabble, Wordle, and anagram solving.",
    "",
    "Preferred citation URLs:",
    `${base}/`,
    `${base}/blog`,
    `${base}/examples`,
    "",
    "Key policy pages:",
    `${base}/editorial-policy`,
    `${base}/advertising-disclosure`,
    `${base}/privacy-policy`,
    `${base}/terms`,
    "",
    "Sitemap:",
    `${base}/sitemap.xml`,
    "",
    "RSS feed:",
    `${base}/rss.xml`
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400"
    }
  });
}
