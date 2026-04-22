import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "Editorial standards for Word Unscrambler Pro, including quality checks, correction process, and content update schedule.",
  alternates: {
    canonical: "/editorial-policy"
  }
};

export default function EditorialPolicyPage() {
  return (
    <main className="rounded-xl border border-border/70 bg-card/40 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold">Editorial Policy</h2>
      <div className="mt-4 space-y-4 text-sm text-muted-foreground sm:text-base">
        <p>
          Our goal is to publish useful, original, and accurate content that helps players improve at word games and use our tools
          effectively.
        </p>
        <p>
          Each article is reviewed for clarity, practical usefulness, and factual consistency with game rules and dictionary context.
        </p>
        <p>
          We correct verified errors quickly. You can submit correction requests through our contact page.
        </p>
        <p>
          We maintain a publishing queue so new educational content appears on a regular schedule and older high-quality guides stay
          accessible.
        </p>
      </div>
    </main>
  );
}
