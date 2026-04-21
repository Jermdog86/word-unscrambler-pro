import type { MetadataRoute } from "next";
import { popularExamples } from "@/lib/constants";
import { getTopStaticLetters } from "@/lib/seo";

const base = "https://example-unscrambler.com";

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
    }
  ];

  const allTargets = Array.from(new Set([...popularExamples.map((item) => item.letters), ...getTopStaticLetters(60)]));

  const exampleRoutes = allTargets.map((letters) => ({
    url: `${base}/unscramble/${letters}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  return [...staticRoutes, ...exampleRoutes];
}
