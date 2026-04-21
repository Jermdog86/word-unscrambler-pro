type TrieNode = {
  children: Map<string, TrieNode>;
  isWord: boolean;
};

export class Trie {
  private root: TrieNode;

  constructor(words: string[] = []) {
    this.root = { children: new Map(), isWord: false };
    words.forEach((word) => this.insert(word));
  }

  insert(word: string) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, { children: new Map(), isWord: false });
      }
      node = node.children.get(ch)!;
    }
    node.isWord = true;
  }

  searchByRack(letters: string, wildcards: number, minLength: number, maxLength: number) {
    const normalized = letters.toUpperCase().replace(/[^A-Z]/g, "");
    const counts = new Array<number>(26).fill(0);

    for (const ch of normalized) {
      const index = ch.charCodeAt(0) - 65;
      if (index >= 0 && index < 26) counts[index] += 1;
    }

    const out = new Set<string>();

    const dfs = (node: TrieNode, current: string, remainingWildcards: number) => {
      if (current.length >= minLength && node.isWord) {
        out.add(current);
      }

      if (current.length >= maxLength) return;

      for (const [ch, child] of node.children.entries()) {
        const idx = ch.charCodeAt(0) - 65;

        if (counts[idx] > 0) {
          counts[idx] -= 1;
          dfs(child, current + ch, remainingWildcards);
          counts[idx] += 1;
          continue;
        }

        if (remainingWildcards > 0) {
          dfs(child, current + ch, remainingWildcards - 1);
        }
      }
    };

    dfs(this.root, "", wildcards);
    return Array.from(out);
  }
}
