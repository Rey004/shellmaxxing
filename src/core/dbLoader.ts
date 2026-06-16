import * as fs from 'fs';
import * as path from 'path';
import { CommandEntry } from '../pipeline/types.js';

const CATEGORIES_DIR = path.resolve(process.cwd(), 'src/data/categories');

let cachedEntries: CommandEntry[] | null = null;

/**
 * Loads all command entries from all JSON files in the categories directory.
 * Caches the results for fast subsequent accesses.
 */
export function loadAllCommands(): CommandEntry[] {
  if (cachedEntries) {
    return cachedEntries;
  }

  const entries: CommandEntry[] = [];

  try {
    if (!fs.existsSync(CATEGORIES_DIR)) {
      console.warn(`[DB LOADER] Categories directory does not exist: ${CATEGORIES_DIR}`);
      return [];
    }

    const files = fs.readdirSync(CATEGORIES_DIR).filter(file => file.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(CATEGORIES_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      try {
        const fileEntries: CommandEntry[] = JSON.parse(content);
        if (Array.isArray(fileEntries)) {
          entries.push(...fileEntries);
        }
      } catch (err) {
        console.error(`[DB LOADER] Failed to parse JSON file: ${filePath}`, err);
      }
    }
  } catch (err) {
    console.error(`[DB LOADER] Failed to read categories directory: ${CATEGORIES_DIR}`, err);
  }

  cachedEntries = entries;
  return entries;
}
