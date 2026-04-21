export async function fetchDefinition(word: string): Promise<string> {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
    if (!response.ok) throw new Error("No definition");

    const body = await response.json();
    const meaning = body?.[0]?.meanings?.[0]?.definitions?.[0]?.definition;
    if (typeof meaning === "string" && meaning.trim().length > 0) {
      return meaning;
    }
  } catch {
    // Keep fallback response for reliability.
  }

  return "Common word hint: often played in word games. Live dictionary meaning unavailable right now.";
}
