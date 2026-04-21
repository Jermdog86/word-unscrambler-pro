export type DictionaryMode = "general" | "scrabble";
export type GameMode = "general" | "scrabble" | "wwf" | "wordle";
export type SortMode = "length" | "alpha" | "score";

export type Filters = {
  minLength: number;
  maxLength: number;
  startsWith: string;
  endsWith: string;
  contains: string;
  excludes: string;
  sortBy: SortMode;
};

export type WordResult = {
  word: string;
  score: number;
  length: number;
};
