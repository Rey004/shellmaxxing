import { loadAllCommands } from './dbLoader.js';

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

// Common stop words to ignore when performing semantic checks
const STOP_WORDS = new Set([
  'how', 'do', 'i', 'a', 'an', 'the', 'in', 'on', 'at', 'for', 'to', 'of', 'and', 'or', 'is', 'are', 'be', 'am', 
  'want', 'please', 'can', 'you', 'tell', 'me', 'show', 'my', 'find', 'get', 'run', 'execute', 'start', 'stop', 
  'with', 'using', 'from', 'some', 'any', 'all', 'this', 'that', 'these', 'those', 'please', 'would', 'could',
  'should', 'help', 'info', 'about'
]);

/**
 * Normalizes and stems a word to account for common plurals or suffixes.
 */
function stemWord(word: string): string {
  const w = word.toLowerCase().trim();
  if (w.endsWith('s') && w.length > 3 && !w.endsWith('ss')) return w.slice(0, -1);
  if (w.endsWith('ing') && w.length > 5) return w.slice(0, -3);
  if (w.endsWith('ed') && w.length > 4) return w.slice(0, -2);
  return w;
}

/**
 * Tokenizes text into a clean list of stems (filtering out stop words when key words exist).
 */
function getTokens(text: string): string[] {
  const words = text.toLowerCase()
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);
  
  const keywords = words.filter(w => w.length >= 2 && !STOP_WORDS.has(w)).map(stemWord);
  if (keywords.length > 0) return keywords;
  return words.filter(w => w.length >= 2).map(stemWord);
}

/**
 * Matches a user input string against the defined intents database using semantic keyword scoring.
 * @param input The natural language query or input from the user.
 * @returns The best matching Intent object, or null if no confident match is found.
 */
export function matchIntent(input: string): Intent | null {
  if (!input || input.trim() === '') {
    return null;
  }

  // Token-based semantic matching
  const queryTokens = getTokens(input);
  if (queryTokens.length === 0) {
    return null;
  }

  let bestIntent: Intent | null = null;
  let bestScore = 0;

  for (const item of intents) {
    const candidates = [item.intent, ...item.aliases];
    
    for (const candidate of candidates) {
      const candidateTokens = getTokens(candidate);
      if (candidateTokens.length === 0) continue;

      let matchCount = 0;
      for (const ct of candidateTokens) {
        if (queryTokens.includes(ct)) {
          matchCount++;
        } else {
          // Allow prefix/stemming matching for words >= 4 chars
          for (const qt of queryTokens) {
            if (qt.length >= 4 && ct.length >= 4 && (qt.startsWith(ct) || ct.startsWith(qt))) {
              matchCount += 0.8;
              break;
            }
          }
        }
      }

      const recall = matchCount / candidateTokens.length;
      const precision = matchCount / queryTokens.length;
      
      // Calculate a weighted score: Recall is highly weighted (85%), Precision adds specificity (15%)
      const score = recall * 0.85 + precision * 0.15;

      if (score > bestScore) {
        bestScore = score;
        bestIntent = item;
      }
    }
  }

  // A threshold of 0.45 prevents unrelated queries from matching spuriously
  if (bestScore >= 0.45) {
    return bestIntent;
  }

  return null;
}


