import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Word Unscrambler Pro",
  description:
    "Learn about Word Unscrambler Pro, our editorial approach, and how we build useful word game tools and educational content.",
  alternates: {
    canonical: "/about"
  }
};

export default function AboutPage() {
  return (
    <main className="rounded-xl border border-border/70 bg-card/40 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold">About Us</h2>
      <div className="mt-3 space-y-4 text-sm text-muted-foreground sm:text-base">
        <p>
          Word Unscrambler Pro helps players solve letter racks, practice strategy, and improve game decisions with fast, transparent
          tools.
        </p>
        <p>
          We combine utility pages with educational articles so users get both immediate results and deeper guidance on improving
          over time.
        </p>
        <p>
          Our content is written and reviewed for accuracy, clarity, and practical usefulness. We update key pages as gameplay
          strategies and player needs evolve.
        </p>
      </div>
    </main>
  );
}
