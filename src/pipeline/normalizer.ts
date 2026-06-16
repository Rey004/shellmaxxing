import { CommandEntry } from './types.js';

/**
 * Standardizes a text string by trimming, removing extra spaces, and optionally converting casing.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .replace(/\s+/g, ' '); // Collapse multiple spaces
}

/**
 * Converts a string to standard lowercase.
 */
export function canonicalize(text: string): string {
  return normalizeText(text).toLowerCase();
}

/**
 * Generates a unique kebab-case identifier from an intent string.
 */
export function generateId(intent: string): string {
  const clean = canonicalize(intent)
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)/g, '');    // Strip leading/trailing hyphens
  return clean || 'unnamed-intent';
}

/**
 * Processes a CommandEntry to normalize all text properties.
 */
export function normalizeEntry(entry: CommandEntry): CommandEntry {
  const normalizedIntent = normalizeText(entry.intent);
  
  return {
    id: generateId(normalizedIntent),
    intent: normalizedIntent,
    aliases: entry.aliases.map(alias => normalizeText(alias)).filter(Boolean),
    windows: normalizeText(entry.windows),
    linux: normalizeText(entry.linux),
    mac: normalizeText(entry.mac),
    description: normalizeText(entry.description),
    examples: entry.examples.map(ex => normalizeText(ex)).filter(Boolean),
    category: canonicalize(entry.category),
    riskLevel: canonicalize(entry.riskLevel) as CommandEntry['riskLevel']
  };
}
