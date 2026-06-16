import Fuse from 'fuse.js';
import { loadAllCommands } from './dbLoader.js';
import { CommandEntry } from '../pipeline/types.js';

export interface Intent {
  id: string;
  intent: string;
  aliases: string[];
  windows: string;
  linux: string;
  mac: string;
  description: string;
  examples: string[];
  category: string;
  riskLevel: string;
}

// Load intents dynamically using the dbLoader
const intents = loadAllCommands() as Intent[];

// Initialize Fuse.js with options optimized for finding matches within longer sentences
const fuse = new Fuse<Intent>(intents, {
  keys: [
    { name: 'intent', weight: 0.6 },
    { name: 'aliases', weight: 0.4 }
  ],
  threshold: 0.8,
  ignoreLocation: true, // Do not penalize matches that appear later in long inputs
  findAllMatches: true,
  includeScore: true
});

/**
 * Checks if any intent or alias is a direct substring of the user's normalized input.
 * This ensures that if the user writes a long sentence containing the exact phrase, it matches instantly.
 */
function findSubstringMatch(input: string): Intent | null {
  const cleanInput = input.toLowerCase().trim();
  
  for (const item of intents) {
    const candidates = [item.intent, ...item.aliases];
    for (const candidate of candidates) {
      if (cleanInput.includes(candidate.toLowerCase())) {
        return item;
      }
    }
  }
  return null;
}

/**
 * Validates that there is at least some word-level overlap/substring relationship
 * between the query and the candidate intents/aliases. This prevents loose
 * character-level matching on completely unrelated single-word inputs.
 */
function hasWordOverlap(input: string, intent: Intent): boolean {
  const inputWords = input.toLowerCase().split(/[^a-zA-Z0-9]+/).filter(w => w.length >= 2);
  const candidateWords = [intent.intent, ...intent.aliases]
    .flatMap(c => c.toLowerCase().split(/[^a-zA-Z0-9]+/))
    .filter(w => w.length >= 2);

  for (const iw of inputWords) {
    for (const cw of candidateWords) {
      if (iw === cw) {
        return true;
      }
      // Allow prefix matching (e.g., folder vs folders) only for words that are at least 4 characters long
      if (iw.length >= 4 && cw.length >= 4 && (iw.startsWith(cw) || cw.startsWith(iw))) {
        return true;
      }
    }
  }
  return false;
}

function hasStrongWordOverlap(input: string, intent: Intent): boolean {
  const inputWords = new Set(input.toLowerCase().split(/[^a-zA-Z0-9]+/).filter(w => w.length >= 2));
  if (inputWords.size === 0) return false;

  const candidates = [intent.intent, ...intent.aliases];
  for (const candidate of candidates) {
    const candidateWords = candidate.toLowerCase().split(/[^a-zA-Z0-9]+/).filter(w => w.length >= 2);
    if (candidateWords.length === 0) continue;

    const allPresent = candidateWords.every(cw => {
      if (inputWords.has(cw)) return true;
      for (const iw of inputWords) {
        if (iw.length >= 4 && cw.length >= 4 && (iw.startsWith(cw) || cw.startsWith(iw))) {
          return true;
        }
      }
      return false;
    });

    if (allPresent) {
      return true;
    }
  }
  return false;
}

/**
 * Matches a user input string against the defined intents database.
 * Supports long, noisy inputs using substring fallback and location-insensitive fuzzy matching.
 * @param input The natural language query or input from the user.
 * @returns The best matching Intent object, or null if no confident match is found.
 */
export function matchIntent(input: string): Intent | null {
  if (!input || input.trim() === '') {
    return null;
  }

  // 1. Try a direct substring match first (extremely reliable for long inputs containing key phrases)
  const substringMatch = findSubstringMatch(input);
  if (substringMatch) {
    return substringMatch;
  }

  // 2. Fall back to Fuse.js with location-insensitive matching
  const results = fuse.search(input);
  const limit = results.length;

  for (let i = 0; i < limit; i++) {
    const res = results[i];
    if (res && res.score !== undefined) {
      if (res.score < 0.6) {
        if (hasWordOverlap(input, res.item)) {
          return res.item;
        }
      } else if (res.score < 0.8) {
        if (hasStrongWordOverlap(input, res.item)) {
          return res.item;
        }
      }
    }
  }

  return null;
}


