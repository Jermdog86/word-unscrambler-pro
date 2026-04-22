import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertising Disclosure",
  description: "Advertising disclosure for Word Unscrambler Pro, including ad placement principles and sponsored content policy.",
  alternates: {
    canonical: "/advertising-disclosure"
  }
};

export default function AdvertisingDisclosurePage() {
  return (
    <main className="rounded-xl border border-border/70 bg-card/40 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold">Advertising Disclosure</h2>
      <div className="mt-4 space-y-4 text-sm text-muted-foreground sm:text-base">
        <p>
          Word Unscrambler Pro displays advertising to support free access to our tools and educational content.
        </p>
        <p>
          We separate ads from core tool output and editorial content. Ads do not determine our rankings, recommendations, or
          article conclusions.
        </p>
        <p>
          We do not publish paid endorsements disguised as independent advice. If sponsored content is ever published, it will be
          clearly labeled.
        </p>
        <p>
          If you notice an ad quality issue, contact us and include the page URL and screenshot when possible.
        </p>
      </div>
    </main>
  );
}
