import { promises as fs } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const englishWords = require("an-array-of-english-words");

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

function normalizeWordArray(words) {
  const unique = new Set();
  for (const item of words) {
    const word = String(item || "").trim().toUpperCase();
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

async function writeWordListFile(fileName, words) {
  const targetPath = path.join(dictionariesDir, fileName);
  await fs.writeFile(targetPath, `${words.join("\n")}\n`, "utf8");
  return targetPath;
}

async function prepareGeneralDictionary() {
  const words = normalizeWordArray(Array.isArray(englishWords) ? englishWords : []);

  if (words.length < 100000) {
    throw new Error("General dictionary source appears incomplete");
  }

  const outputPath = await writeWordListFile("words_alpha.txt", words);
  return { words, outputPath };
}

async function prepareScrabbleDictionary(fallbackWords) {
  const sourcePath = path.join(dictionariesDir, "scrabble_words.txt");
  let words = [];

  try {
    const raw = await fs.readFile(sourcePath, "utf8");
    words = normalizeWords(raw);
  } catch {
    words = [];
  }

  if (words.length < 1000) {
    words = fallbackWords.filter((word) => word.length <= 15);
  }

  const outputPath = await writeWordListFile("scrabble_words.txt", words);
  return { words, outputPath };
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
  const generalPrepared = await prepareGeneralDictionary();
  const scrabblePrepared = await prepareScrabbleDictionary(generalPrepared.words);

  const results = [];
  for (const target of targets) {
    results.push(await buildTarget(target));
  }

  const summary = [
    `Source generated: ${generalPrepared.outputPath} (${generalPrepared.words.length} words)`,
    `Source generated: ${scrabblePrepared.outputPath} (${scrabblePrepared.words.length} words)`,
    ...results.map((item) => `${item.outputPath}: ${item.wordCount} words`)
  ].join("\n");

  process.stdout.write(`Dictionary preparation and compression complete\n${summary}\n`);
}

main().catch((error) => {
  process.stderr.write(`Dictionary build failed: ${error.message}\n`);
  process.exit(1);
});
