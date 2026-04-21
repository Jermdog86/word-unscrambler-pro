import type { Metadata } from "next";
import { UnscramblerApp } from "@/components/unscrambler-app";
import { popularExamples } from "@/lib/constants";
import { getTopStaticLetters } from "@/lib/seo";

type RouteParams = {
  params: Promise<{ letters: string }>;
};

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { letters } = await params;
  const cleanedLetters = decodeURIComponent(letters).replace(/[^a-zA-Z?]/g, "").slice(0, 15).toUpperCase() || "LETTERS";

  const title = `Unscramble ${cleanedLetters} - Instant Word Finder (Scrabble, Wordle, WWF)`;
  const description = `Unscramble ${cleanedLetters} instantly with wildcard support, Scrabble scores, advanced filters, and shareable results.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/unscramble/${letters}`
    },
    openGraph: {
      title,
      description,
      url: `/unscramble/${letters}`
    },
    twitter: {
      title,
      description
    }
  };
}

export function generateStaticParams() {
  const combined = new Set([...popularExamples.map((item) => item.letters), ...getTopStaticLetters(40)]);
  return Array.from(combined).map((letters) => ({ letters }));
}

export default async function UnscrambleLettersPage({ params }: RouteParams) {
  const { letters } = await params;
  return <UnscramblerApp initialLetters={decodeURIComponent(letters)} />;
}
