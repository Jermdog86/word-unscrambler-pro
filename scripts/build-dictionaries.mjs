import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dictionariesDir = path.join(root, "public", "dictionaries");

const targets = [
  {
    source: "words_alpha.txt",
    output: "words_alpha.min.json",
    mode: "general"
  },
  {
    source: "scrabble_words.txt",
    output: "scrabble_words.min.json",
    mode: "scrabble"
  }
];

function normalizeWords(raw) {
  const unique = new Set();
  for (const line of raw.split(/\r?\n/)) {
    const word = line.trim().toUpperCase();
    if (/^[A-Z]+$/.test(word)) unique.add(word);
  }
  return Array.from(unique).sort((a, b) => a.localeCompare(b));
}

function groupByLength(words) {
  const byLength = {};
  for (const word of words) {
    const key = String(word.length);
    if (!byLength[key]) byLength[key] = [];
    byLength[key].push(word);
  }
  return byLength;
}

async function buildTarget(target) {
  const sourcePath = path.join(dictionariesDir, target.source);
  const outputPath = path.join(dictionariesDir, target.output);
  const raw = await fs.readFile(sourcePath, "utf8");
  const words = normalizeWords(raw);

  const payload = {
    mode: target.mode,
    generatedAt: new Date().toISOString(),
    wordCount: words.length,
    byLength: groupByLength(words)
  };

  await fs.writeFile(outputPath, JSON.stringify(payload), "utf8");
  return { outputPath, wordCount: words.length };
}

async function main() {
  const results = [];
  for (const target of targets) {
    results.push(await buildTarget(target));
  }

  const summary = results.map((item) => `${item.outputPath}: ${item.wordCount} words`).join("\n");
  process.stdout.write(`Dictionary compression complete\n${summary}\n`);
}

main().catch((error) => {
  process.stderr.write(`Dictionary build failed: ${error.message}\n`);
  process.exit(1);
});
