import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Word Unscrambler Pro",
    short_name: "Unscrambler",
    description: "Instant word unscrambler with Scrabble scoring and wildcard support.",
    start_url: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    orientation: "portrait",
    lang: "en-US",
    categories: ["utilities", "productivity", "education"],
    background_color: "#0d1117",
    theme_color: "#14b8a6",
    icons: [
      {
        src: "/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml"
      },
      {
        src: "/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml"
      }
    ],
    shortcuts: [
      {
        name: "Unscramble RETAIN",
        short_name: "RETAIN",
        url: "/unscramble/retain"
      },
      {
        name: "Unscramble STREAM",
        short_name: "STREAM",
        url: "/unscramble/stream"
      }
    ]
  };
}
