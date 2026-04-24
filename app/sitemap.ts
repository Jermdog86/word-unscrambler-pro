import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blog";
import { popularExamples } from "@/lib/constants";
import { getTopStaticLetters } from "@/lib/seo";

export const revalidate = 3600;

const base = "https://unscramble.fyi";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${base}/examples`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${base}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.45
    },
    {
      url: `${base}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.45
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.45
    },
    {
      url: `${base}/advertising-disclosure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.45
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.45
    },
    {
      url: `${base}/rss.xml`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.4
    },
    {
      url: `${base}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.35
    }
  ];

  const allTargets = Array.from(new Set([...popularExamples.map((item) => item.letters), ...getTopStaticLetters(60)]));

  const exampleRoutes = allTargets.map((letters) => ({
    url: `${base}/unscramble/${letters}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const blogRoutes = getPublishedBlogPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...exampleRoutes, ...blogRoutes];
}
