"use client";

import { useEffect, useState } from "react";
import { fetchDefinition } from "@/lib/definition";
import { Button } from "@/components/ui/button";

type WordModalProps = {
  word: string | null;
  score: number;
  onClose: () => void;
};

export function WordModal({ word, score, onClose }: WordModalProps) {
  const [definition, setDefinition] = useState("Loading definition...");

  useEffect(() => {
    let active = true;
    if (!word) return;

    setDefinition("Loading definition...");
    fetchDefinition(word).then((text) => {
      if (active) setDefinition(text);
    });

    return () => {
      active = false;
    };
  }, [word]);

  if (!word) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-slate/75 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold">{word}</h3>
          <span className="rounded-md bg-primary/20 px-2 py-1 text-xs">Scrabble: {score}</span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{definition}</p>
        <div className="mt-5 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
