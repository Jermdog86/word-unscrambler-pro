import type { Metadata } from "next";
import Link from "next/link";
import { UnscramblerApp } from "@/components/unscrambler-app";
import { faqItems, popularExamples } from "@/lib/constants";
import { getLatestBlogPosts } from "@/lib/blog";

export const revalidate = 3600;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Word Unscrambler - Unscramble Letters for Scrabble, Wordle, WWF",
  description:
    "Unscramble letters instantly with wildcard support, Scrabble points, advanced filters, and shareable links. Built for speed and ranking power.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  const latestPosts = getLatestBlogPosts(3);

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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Word Unscrambler Pro",
    url: "https://unscramble.fyi",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://unscramble.fyi/unscramble/{letters}",
      "query-input": "required name=letters"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
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

      <section className="mt-8 rounded-xl border border-border/70 bg-card/40 p-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Latest Blog Guides</h2>
          <Link href="/blog" className="text-sm underline-offset-4 hover:underline">
            View all posts
          </Link>
        </div>
        <ul className="mt-3 space-y-3">
          {latestPosts.map((post) => (
            <li key={post.slug} className="rounded-lg border border-border/70 bg-background/35 p-3">
              <p className="text-xs text-muted-foreground">{post.publishedAt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-1 block font-medium underline-offset-4 hover:underline">
                {post.title}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
