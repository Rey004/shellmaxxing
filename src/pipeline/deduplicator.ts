import { CommandEntry, RiskLevel } from './types.js';
import { generateId, canonicalize } from './normalizer.js';

/**
 * Calculates the Levenshtein distance between two strings.
 */
function getLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= a.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,    // deletion
          matrix[i][j - 1] + 1,    // insertion
          matrix[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return matrix[a.length][b.length];
}

/**
 * Computes a normalized similarity score between 0.0 and 1.0.
 */
export function getSimilarity(a: string, b: string): number {
  const cleanA = canonicalize(a);
  const cleanB = canonicalize(b);
  const maxLen = Math.max(cleanA.length, cleanB.length);
  if (maxLen === 0) return 1.0;
  return 1.0 - getLevenshteinDistance(cleanA, cleanB) / maxLen;
}

/**
 * Priority ordering for merging risk levels.
 */
const riskPriority: Record<RiskLevel, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  safe: 1,
  unknown: 0
};

/**
 * Merges two command entries into a single unified record.
 */
export function mergeEntries(a: CommandEntry, b: CommandEntry): CommandEntry {
  // Aliases: Union of unique aliases, filtering out the intents themselves
  const cleanIntentA = canonicalize(a.intent);
  const cleanIntentB = canonicalize(b.intent);
  const rawAliases = [...a.aliases, ...b.aliases, a.intent, b.intent];
  const uniqueAliases = [...new Set(
    rawAliases
      .map(al => al.trim())
      .filter(al => {
        const cleanAl = canonicalize(al);
        return cleanAl !== cleanIntentA && cleanAl !== cleanIntentB && cleanAl.length > 0;
      })
  )];

  // Description: Keep the longer one (usually more informative)
  const description = a.description.length >= b.description.length ? a.description : b.description;

  // OS commands: Keep the non-empty template
  const windows = a.windows || b.windows;
  const linux = a.linux || b.linux;
  const mac = a.mac || b.mac;

  // Examples: Union of examples
  const examples = [...new Set([...a.examples, ...b.examples])];

  // Category: Prefer non-empty, default to a's category
  const category = a.category || b.category;

  // Risk Level: Choose the higher risk classification
  const riskA = a.riskLevel || 'unknown';
  const riskB = b.riskLevel || 'unknown';
  const riskLevel = riskPriority[riskA] >= riskPriority[riskB] ? riskA : riskB;

  return {
    id: a.id,
    intent: a.intent,
    aliases: uniqueAliases,
    windows,
    linux,
    mac,
    description,
    examples,
    category,
    riskLevel
  };
}

/**
 * Automatically deduplicates and merges duplicate entries.
 */
export function deduplicateEntries(entries: CommandEntry[]): CommandEntry[] {
  const merged: CommandEntry[] = [];

  for (const entry of entries) {
    let matchedIndex = -1;

    for (let i = 0; i < merged.length; i++) {
      const existing = merged[i];

      // Match conditions:
      // 1. Same normalized ID
      // 2. High intent similarity (> 0.85)
      // 3. Exact matching command implementations
      const idMatch = existing.id === entry.id;
      const fuzzyMatch = getSimilarity(existing.intent, entry.intent) > 0.85;
      const signatureMatch =
        (existing.windows && existing.windows === entry.windows) ||
        (existing.linux && existing.linux === entry.linux) ||
        (existing.mac && existing.mac === entry.mac);

      if (idMatch || fuzzyMatch || (signatureMatch && fuzzyMatch)) {
        matchedIndex = i;
        break;
      }
    }

    if (matchedIndex !== -1) {
      merged[matchedIndex] = mergeEntries(merged[matchedIndex], entry);
    } else {
      merged.push({ ...entry });
    }
  }

  return merged;
}
