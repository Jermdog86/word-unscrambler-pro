import type { Metadata } from "next";
import Link from "next/link";
import { getTopStaticLetters } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Unscramble Examples - Popular Letter Sets and Anagram Ideas",
  description:
    "Explore popular word unscrambler examples and jump directly into letter combinations used by Scrabble and Wordle players."
};

export default function ExamplesPage() {
  const examples = getTopStaticLetters(50);

  return (
    <main className="rounded-xl border border-border/70 bg-card/40 p-5">
      <h2 className="text-2xl font-semibold">Popular Unscramble Letter Sets</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        These high-intent combinations are prelinked for quick access and stronger internal SEO structure.
      </p>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((letters) => (
          <li key={letters}>
            <Link
              href={`/unscramble/${encodeURIComponent(letters)}`}
              className="block rounded-md border border-border bg-background/40 px-3 py-2 text-sm hover:border-primary"
            >
              Unscramble {letters.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
