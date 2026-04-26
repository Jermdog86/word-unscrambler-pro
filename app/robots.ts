import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.unscramble.fyi/sitemap.xml",
    host: "https://www.unscramble.fyi"
  };
}
