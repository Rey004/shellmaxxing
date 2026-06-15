import Fuse from 'fuse.js';
import * as fs from 'fs';
import * as path from 'path';

export interface Intent {
  intent: string;
  aliases: string[];
  windows: string;
  linux: string;
  mac: string;
}

// Load intents from the JSON file
const intentsPath = path.resolve(process.cwd(), 'src/data/intents.json');
const intents: Intent[] = JSON.parse(fs.readFileSync(intentsPath, 'utf-8'));

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
  if (results.length > 0 && results[0]) {
    const bestResult = results[0];
    if (bestResult.score !== undefined && bestResult.score < 0.6) {
      return bestResult.item;
    }
  }

  return null;
}

