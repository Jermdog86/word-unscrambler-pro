import { Trie } from "@/lib/trie";
import type { DictionaryMode, Filters, WordResult } from "@/lib/types";
import { SCRABBLE_POINTS } from "@/lib/constants";

const FALLBACK_WORDS = [
  "ATE",
  "EAT",
  "TEA",
  "RATE",
  "TEAR",
  "TARE",
  "ALTER",
  "ALERT",
  "LATER",
  "ART",
  "RAT",
  "TAR",
  "TRAIN",
  "RETAIN",
  "RETINA",
  "STARE",
  "ASTER",
  "STREAM",
  "MASTER",
  "TEAM",
  "MEAT"
];

const cache = new Map<DictionaryMode, { words: string[]; trie: Trie }>();

type PackedDictionary = {
  mode: DictionaryMode;
  generatedAt: string;
  wordCount: number;
  byLength: Record<string, string[]>;
};

function parseWordList(raw: string) {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim().toUpperCase())
    .filter((word) => /^[A-Z]+$/.test(word));
}

async function loadRawDictionary(mode: DictionaryMode) {
  const targetFile = mode === "scrabble" ? "/dictionaries/scrabble_words.txt" : "/dictionaries/words_alpha.txt";
  try {
    const response = await fetch(targetFile, { cache: "force-cache" });
    if (!response.ok) throw new Error("Dictionary download failed");
    const words = parseWordList(await response.text());
    return words.length ? words : FALLBACK_WORDS;
  } catch {
    return FALLBACK_WORDS;
  }
}

async function loadPackedDictionary(mode: DictionaryMode) {
  const targetFile = mode === "scrabble" ? "/dictionaries/scrabble_words.min.json" : "/dictionaries/words_alpha.min.json";
  try {
    const response = await fetch(targetFile, { cache: "force-cache" });
    if (!response.ok) throw new Error("Packed dictionary unavailable");
    const payload = (await response.json()) as PackedDictionary;
    const words: string[] = [];

    for (const bucket of Object.values(payload.byLength)) {
      for (const word of bucket) {
        if (/^[A-Z]+$/.test(word)) words.push(word);
      }
    }

    return words.length ? words : null;
  } catch {
    return null;
  }
}

export async function getDictionary(mode: DictionaryMode) {
  if (cache.has(mode)) return cache.get(mode)!;

  const packedWords = await loadPackedDictionary(mode);
  const words = packedWords ?? (await loadRawDictionary(mode));
  const trie = new Trie(words);
  const value = { words, trie };
  cache.set(mode, value);
  return value;
}

export function scoreWord(word: string) {
  return word.split("").reduce((total, ch) => total + (SCRABBLE_POINTS[ch] ?? 0), 0);
}

function passesFilters(word: string, filters: Filters) {
  if (word.length < filters.minLength || word.length > filters.maxLength) return false;
  if (filters.startsWith && !word.startsWith(filters.startsWith)) return false;
  if (filters.endsWith && !word.endsWith(filters.endsWith)) return false;
  if (filters.contains && !word.includes(filters.contains)) return false;

  const excludes = new Set(filters.excludes.split("").filter(Boolean));
  for (const letter of excludes) {
    if (word.includes(letter)) return false;
  }

  return true;
}

export async function findUnscrambledWords(
  letters: string,
  wildcardCount: number,
  filters: Filters,
  mode: DictionaryMode
): Promise<WordResult[]> {
  const { trie } = await getDictionary(mode);
  const candidates = trie.searchByRack(letters, wildcardCount, filters.minLength, filters.maxLength);

  const filtered = candidates.filter((word) => passesFilters(word, filters));

  const out = filtered.map((word) => ({
    word,
    score: scoreWord(word),
    length: word.length
  }));

  if (filters.sortBy === "alpha") {
    out.sort((a, b) => a.word.localeCompare(b.word));
  } else if (filters.sortBy === "score") {
    out.sort((a, b) => b.score - a.score || b.length - a.length || a.word.localeCompare(b.word));
  } else {
    out.sort((a, b) => b.length - a.length || b.score - a.score || a.word.localeCompare(b.word));
  }

  return out;
}
