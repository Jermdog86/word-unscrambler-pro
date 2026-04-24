import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://unscramble.fyi/sitemap.xml",
    host: "https://unscramble.fyi"
  };
}
