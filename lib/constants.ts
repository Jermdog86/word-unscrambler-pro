import type { Filters } from "@/lib/types";

export const SCRABBLE_POINTS: Record<string, number> = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10
};

export const defaultFilters: Filters = {
  minLength: 2,
  maxLength: 15,
  startsWith: "",
  endsWith: "",
  contains: "",
  excludes: "",
  sortBy: "length"
};

export const popularExamples = [
  { letters: "retain", label: "6+ letter wins" },
  { letters: "stream", label: "mid-length finder" },
  { letters: "qz?e", label: "wildcard challenge" },
  { letters: "alerts", label: "anagram style" },
  { letters: "puzzle", label: "high score plays" }
];

export const faqItems = [
  {
    question: "How many wildcard blanks can I use?",
    answer: "You can use up to four ? wildcard tiles. Each wildcard can represent any letter and scores as zero in Scrabble mode."
  },
  {
    question: "Is this word unscrambler free?",
    answer: "Yes. Core unscrambling is always free, instant, and never blocked by ads."
  },
  {
    question: "Can I filter words by length or pattern?",
    answer: "Yes. Use min/max length and advanced filters for starts with, ends with, contains, and excludes letters."
  }
];
