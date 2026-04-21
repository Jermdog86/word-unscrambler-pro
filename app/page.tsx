import type { Metadata } from "next";
import { UnscramblerApp } from "@/components/unscrambler-app";
import { faqItems, popularExamples } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Word Unscrambler - Unscramble Letters for Scrabble, Wordle, WWF",
  description:
    "Unscramble letters instantly with wildcard support, Scrabble points, advanced filters, and shareable links. Built for speed and ranking power.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <UnscramblerApp />

      <section className="mt-12 grid gap-5 rounded-xl border border-border/70 bg-card/50 p-5 sm:grid-cols-2">
        <article>
          <h2 className="text-xl font-semibold">How This Unscrambler Works</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Type letters, include up to four ? wildcards, and get grouped results by length with Scrabble scoring.
            Filters help you target exact board needs, and every search can be shared via URL.
          </p>
        </article>
        <article>
          <h2 className="text-xl font-semibold">Popular Unscramble Examples</h2>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {popularExamples.map((example) => (
              <li key={example.letters}>
                <a className="underline-offset-4 hover:underline" href={`/unscramble/${example.letters}`}>
                  Unscramble {example.letters.toUpperCase()} ({example.label})
                </a>
              </li>
            ))}
            <li>
              <a className="underline-offset-4 hover:underline" href="/examples">
                Browse 50+ popular letter sets
              </a>
            </li>
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-xl border border-border/70 bg-card/40 p-5">
        <h2 className="text-xl font-semibold">Word Unscrambler FAQ</h2>
        <div className="mt-3 space-y-4">
          {faqItems.map((faq) => (
            <article key={faq.question}>
              <h3 className="font-medium">{faq.question}</h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
