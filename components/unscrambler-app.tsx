"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Copy, Link2, Search, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { WordModal } from "@/components/word-modal";
import { defaultFilters } from "@/lib/constants";
import { findUnscrambledWords } from "@/lib/dictionary";
import type { DictionaryMode, Filters, GameMode, WordResult } from "@/lib/types";
import { sanitizeLetters } from "@/lib/utils";

type UnscramblerAppProps = {
  initialLetters?: string;
};

const localStorageKeys = {
  letters: "unscrambler_letters",
  filters: "unscrambler_filters",
  recent: "unscrambler_recent",
  dictMode: "unscrambler_dict_mode",
  wildcard: "unscrambler_wildcard"
};

const modeToDictionary: Record<GameMode, DictionaryMode> = {
  general: "general",
  scrabble: "scrabble",
  wwf: "scrabble",
  wordle: "general"
};

export function UnscramblerApp({ initialLetters = "" }: UnscramblerAppProps) {
  const [lettersInput, setLettersInput] = useState(initialLetters);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [results, setResults] = useState<WordResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("general");
  const [dictionaryMode, setDictionaryMode] = useState<DictionaryMode>("general");
  const [allowWildcards, setAllowWildcards] = useState(true);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedScore, setSelectedScore] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const normalizedInput = sanitizeLetters(lettersInput);
  const wildcardCountInInput = Math.min(4, (normalizedInput.match(/\?/g) || []).length);
  const effectiveWildcards = allowWildcards ? wildcardCountInInput : 0;
  const rackLetters = normalizedInput.replace(/\?/g, "");

  const syncFromUrl = useCallback(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const fromUrlLetters = params.get("letters") || "";
    if (fromUrlLetters) {
      setLettersInput(fromUrlLetters);
    }

    const nextFilters: Filters = {
      minLength: Number(params.get("min") || defaultFilters.minLength),
      maxLength: Number(params.get("max") || defaultFilters.maxLength),
      startsWith: (params.get("starts") || "").toUpperCase(),
      endsWith: (params.get("ends") || "").toUpperCase(),
      contains: (params.get("contains") || "").toUpperCase(),
      excludes: (params.get("excludes") || "").toUpperCase(),
      sortBy: (params.get("sort") as Filters["sortBy"]) || defaultFilters.sortBy
    };
    setFilters(nextFilters);

    const mode = (params.get("mode") as GameMode) || "general";
    if (["general", "scrabble", "wwf", "wordle"].includes(mode)) {
      setGameMode(mode);
      setDictionaryMode(modeToDictionary[mode]);
    }
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    syncFromUrl();

    if (typeof window === "undefined") return;

    const savedLetters = localStorage.getItem(localStorageKeys.letters);
    const savedFilters = localStorage.getItem(localStorageKeys.filters);
    const savedRecent = localStorage.getItem(localStorageKeys.recent);
    const savedMode = localStorage.getItem(localStorageKeys.dictMode) as DictionaryMode | null;
    const savedWildcard = localStorage.getItem(localStorageKeys.wildcard);

    if (savedLetters && !initialLetters) setLettersInput(savedLetters);
    if (savedFilters) {
      try {
        setFilters((prev) => ({ ...prev, ...JSON.parse(savedFilters) }));
      } catch {
        // Ignore corrupted cache values.
      }
    }
    if (savedRecent) {
      try {
        setRecentSearches(JSON.parse(savedRecent));
      } catch {
        // Ignore corrupted cache values.
      }
    }
    if (savedMode === "general" || savedMode === "scrabble") setDictionaryMode(savedMode);
    if (savedWildcard === "false") setAllowWildcards(false);
  }, [initialLetters, syncFromUrl]);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.letters, normalizedInput);
    localStorage.setItem(localStorageKeys.filters, JSON.stringify(filters));
    localStorage.setItem(localStorageKeys.recent, JSON.stringify(recentSearches));
    localStorage.setItem(localStorageKeys.dictMode, dictionaryMode);
    localStorage.setItem(localStorageKeys.wildcard, String(allowWildcards));
  }, [allowWildcards, dictionaryMode, filters, normalizedInput, recentSearches]);

  const updateRecentSearches = useCallback((value: string) => {
    if (!value) return;
    setRecentSearches((prev) => [value, ...prev.filter((x) => x !== value)].slice(0, 10));
  }, []);

  const executeUnscramble = useCallback(async () => {
    if (!rackLetters && effectiveWildcards === 0) {
      setResults([]);
      return;
    }

    if (effectiveWildcards > 4) {
      toast.error("You can use up to 4 wildcard tiles.");
      return;
    }

    setIsLoading(true);
    try {
      const found = await findUnscrambledWords(rackLetters, effectiveWildcards, filters, dictionaryMode);
      setResults(found);
      updateRecentSearches(normalizedInput);
    } catch {
      toast.error("Unable to unscramble right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [dictionaryMode, effectiveWildcards, filters, normalizedInput, rackLetters, updateRecentSearches]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void executeUnscramble();
    }, 140);
    return () => clearTimeout(timer);
  }, [executeUnscramble]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        void executeUnscramble();
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [executeUnscramble]);

  const grouped = useMemo(() => {
    const map = new Map<number, WordResult[]>();
    for (const item of results) {
      if (!map.has(item.length)) map.set(item.length, []);
      map.get(item.length)!.push(item);
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [results]);

  const copyText = async (text: string, label = "Copied") => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(label);
    } catch {
      toast.error("Copy failed. Please try again.");
    }
  };

  const buildShareUrl = useCallback(() => {
    const params = new URLSearchParams();
    params.set("letters", normalizedInput);
    params.set("min", String(filters.minLength));
    params.set("max", String(filters.maxLength));
    params.set("starts", filters.startsWith);
    params.set("ends", filters.endsWith);
    params.set("contains", filters.contains);
    params.set("excludes", filters.excludes);
    params.set("sort", filters.sortBy);
    params.set("mode", gameMode);

    const slug = normalizedInput ? `/unscramble/${normalizedInput.toLowerCase()}` : "/";
    return `${window.location.origin}${slug}?${params.toString()}`;
  }, [filters, gameMode, normalizedInput]);

  const shareUrl = typeof window !== "undefined" ? buildShareUrl() : "";
  const shareText = `Unscramble ${normalizedInput || "letters"} instantly with filters and Scrabble scores.`;

  const onGameModeChange = (mode: GameMode) => {
    setGameMode(mode);
    setDictionaryMode(modeToDictionary[mode]);
    if (mode === "wordle") {
      setFilters((prev) => ({ ...prev, minLength: 5, maxLength: 5, sortBy: "alpha" }));
    }
    if (mode === "scrabble") {
      setFilters((prev) => ({ ...prev, sortBy: "score" }));
    }
  };

  return (
    <main className="stagger-in">
      <AdPlaceholder id="adsense-placeholder-1" className="mb-6" label="Top responsive banner" />

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="surface space-y-5 p-4 sm:p-6">
          <div className="space-y-3">
            <CardTitle className="text-balance text-2xl leading-tight sm:text-3xl lg:text-4xl">
              Instant Word Unscrambler and Scrabble Finder
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Unscramble letters in milliseconds. Use wildcard blanks, pattern filters, and score sorting to find winning words.
            </p>
          </div>

          <div className="grid gap-3">
            <label htmlFor="letters-input" className="text-sm font-medium">
              Enter letters (spaces and commas allowed)
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                id="letters-input"
                ref={inputRef}
                value={lettersInput}
                onChange={(event) => setLettersInput(event.target.value)}
                placeholder="example: t,e,a,r?s"
                className="h-14 text-xl tracking-[0.12em]"
                aria-label="Letters to unscramble"
              />
              <Button className="h-14 min-w-36 text-base shadow-lg shadow-primary/25" onClick={() => void executeUnscramble()}>
                <Search className="mr-2 h-4 w-4" />
                Unscramble
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Auto-cleans to uppercase. Supports up to 4 wildcard tiles as ? and keyboard shortcut Ctrl/Cmd + Enter.
            </p>
          </div>

          <div className="grid gap-3 rounded-lg border border-border/60 bg-muted/20 p-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="grid gap-1 text-xs">
              Min letters
              <select
                aria-label="Minimum letter count"
                className="h-9 rounded-md border border-input bg-background px-2"
                value={filters.minLength}
                onChange={(event) => setFilters((prev) => ({ ...prev, minLength: Number(event.target.value) }))}
              >
                {Array.from({ length: 14 }, (_, idx) => idx + 2).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-xs">
              Max letters
              <select
                aria-label="Maximum letter count"
                className="h-9 rounded-md border border-input bg-background px-2"
                value={filters.maxLength}
                onChange={(event) => setFilters((prev) => ({ ...prev, maxLength: Number(event.target.value) }))}
              >
                {Array.from({ length: 14 }, (_, idx) => idx + 2).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-xs">
              Dictionary
              <select
                aria-label="Dictionary mode"
                className="h-9 rounded-md border border-input bg-background px-2"
                value={dictionaryMode}
                onChange={(event) => setDictionaryMode(event.target.value as DictionaryMode)}
              >
                <option value="general">General English</option>
                <option value="scrabble">Scrabble-friendly</option>
              </select>
            </label>

            <label className="grid gap-1 text-xs">
              Sort by
              <select
                aria-label="Sort results"
                className="h-9 rounded-md border border-input bg-background px-2"
                value={filters.sortBy}
                onChange={(event) => setFilters((prev) => ({ ...prev, sortBy: event.target.value as Filters["sortBy"] }))}
              >
                <option value="length">Length</option>
                <option value="alpha">A-Z</option>
                <option value="score">Scrabble score</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["general", "scrabble", "wwf", "wordle"] as GameMode[]).map((mode) => (
              <Button
                key={mode}
                variant={gameMode === mode ? "default" : "secondary"}
                size="sm"
                className="rounded-full"
                onClick={() => onGameModeChange(mode)}
              >
                {mode === "wwf" ? "Words With Friends" : mode === "wordle" ? "Wordle Helper" : mode[0].toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </div>

          <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Wildcard blanks</p>
              <button
                type="button"
                className={`rounded-full px-3 py-1 text-xs ${allowWildcards ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                onClick={() => setAllowWildcards((prev) => !prev)}
                aria-label="Toggle wildcard support"
              >
                {allowWildcards ? "Enabled" : "Disabled"}
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Current wildcard count from input: {wildcardCountInInput} (max 4). Use ? in your letters.
            </p>
          </div>

          <details className="rounded-lg border border-border/60 bg-muted/20 p-3">
            <summary className="cursor-pointer text-sm font-medium">Advanced Filters</summary>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <label className="text-xs">
                Starts with
                <Input
                  value={filters.startsWith}
                  onChange={(event) =>
                    setFilters((prev) => ({ ...prev, startsWith: sanitizeLetters(event.target.value).replace(/\?/g, "") }))
                  }
                  className="mt-1"
                  maxLength={4}
                  aria-label="Starts with letters"
                />
              </label>

              <label className="text-xs">
                Ends with
                <Input
                  value={filters.endsWith}
                  onChange={(event) =>
                    setFilters((prev) => ({ ...prev, endsWith: sanitizeLetters(event.target.value).replace(/\?/g, "") }))
                  }
                  className="mt-1"
                  maxLength={4}
                  aria-label="Ends with letters"
                />
              </label>

              <label className="text-xs">
                Contains
                <Input
                  value={filters.contains}
                  onChange={(event) =>
                    setFilters((prev) => ({ ...prev, contains: sanitizeLetters(event.target.value).replace(/\?/g, "") }))
                  }
                  className="mt-1"
                  maxLength={6}
                  aria-label="Contains letters"
                />
              </label>

              <label className="text-xs">
                Excludes letters
                <Input
                  value={filters.excludes}
                  onChange={(event) =>
                    setFilters((prev) => ({ ...prev, excludes: sanitizeLetters(event.target.value).replace(/\?/g, "") }))
                  }
                  className="mt-1"
                  maxLength={8}
                  aria-label="Exclude specific letters"
                />
              </label>
            </div>
          </details>

          <AdPlaceholder id="adsense-placeholder-2" label="Inline responsive banner" />

          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">Results ({results.length})</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    void copyText(
                      grouped
                        .map(([length, words]) => `${length} letters: ${words.map((word) => word.word.toLowerCase()).join(", ")}`)
                        .join("\n"),
                      "Copied all grouped results"
                    )
                  }
                  disabled={!results.length}
                >
                  <Copy className="mr-1 h-4 w-4" />
                  Copy All
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => void copyText(shareUrl, "Share link copied")}
                  disabled={!normalizedInput}
                >
                  <Link2 className="mr-1 h-4 w-4" />
                  Copy Link
                </Button>
              </div>
            </div>

            {!results.length && !isLoading ? (
              <div className="rounded-lg border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
                No words yet. Try more letters, remove filters, or add ? wildcard tiles.
              </div>
            ) : null}

            {isLoading ? <p className="text-sm text-muted-foreground">Finding best matches...</p> : null}

            <div className="space-y-3">
              {grouped.map(([length, words]) => (
                <article key={length} className="rounded-lg border border-border/70 bg-background/50 p-3 transition-colors hover:border-primary/35">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{length} letters</p>
                      <Badge variant="secondary">{words.length}</Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() =>
                        void copyText(
                          `${length} letters: ${words.map((w) => w.word.toLowerCase()).join(", ")}`,
                          `Copied ${length}-letter words`
                        )
                      }
                    >
                      Copy Group
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {words.map((item) => (
                      <button
                        key={item.word}
                        type="button"
                        className="rounded-md border border-border bg-card px-2 py-1 text-sm transition hover:-translate-y-0.5 hover:border-primary"
                        onClick={() => {
                          setSelectedWord(item.word);
                          setSelectedScore(item.score);
                        }}
                        aria-label={`Open definition for ${item.word}`}
                      >
                        {item.word.toLowerCase()} <span className="text-xs text-muted-foreground">({item.score})</span>
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Card>

        <aside className="space-y-4 lg:sticky lg:top-5 lg:self-start">
          <Card className="surface">
            <CardHeader className="pb-3">
              <h3 className="flex items-center gap-2 font-semibold">
                <Sparkles className="h-4 w-4" />
                Share and Social
              </h3>
              <p className="text-xs text-muted-foreground">Generate a clean URL with letters and active filters.</p>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button
                size="sm"
                onClick={() =>
                  void copyText(
                    `${shareText}\n${shareUrl}`,
                    "Share preview and link copied"
                  )
                }
                disabled={!normalizedInput}
              >
                <Share2 className="mr-1 h-4 w-4" />
                Copy Preview Text
              </Button>
              <a
                className="rounded-md border border-input px-3 py-2 text-sm hover:bg-muted"
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              >
                Share on X
              </a>
              <a
                className="rounded-md border border-input px-3 py-2 text-sm hover:bg-muted"
                target="_blank"
                rel="noreferrer"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              >
                Share on Facebook
              </a>
            </CardContent>
          </Card>

          <Card className="surface">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Recent Searches</h3>
                <Button variant="outline" size="sm" onClick={() => setRecentSearches([])}>
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {recentSearches.length ? (
                  recentSearches.map((item) => (
                    <button
                      key={item}
                      className="rounded-md border border-border px-2 py-1 text-xs hover:border-primary"
                      onClick={() => setLettersInput(item)}
                      type="button"
                    >
                      {item.toLowerCase()}
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">Your recent searches appear here.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <AdPlaceholder id="adsense-placeholder-3" className="hidden lg:block" label="Sidebar ad unit" />
          <AdPlaceholder id="adsense-placeholder-3-mobile" className="lg:hidden" label="Bottom mobile ad unit" />
        </aside>
      </section>

      <WordModal word={selectedWord} score={selectedScore} onClose={() => setSelectedWord(null)} />
    </main>
  );
}
