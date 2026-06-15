
import * as fs from 'fs';
import * as path from 'path';

interface Explanation {
  description: string;
}

const explanationsPath = path.resolve(process.cwd(), 'src/data/explainations.json');
const explanationsData: Record<string, Explanation> = JSON.parse(
  fs.readFileSync(explanationsPath, 'utf-8')
);

/**
 * Gets the description explanation for a given command.
 * @param command The resolved command string (e.g., "mkdir <folder-name>").
 * @returns The explanation description, or a default message if not found.
 */
export function getCommandExplanation(command: string): string {
  const cleanCommand = command.trim();
  
  // Sort keys by length descending so longer matching prefixes (e.g., "kill -9") match before shorter ones
  const keys = Object.keys(explanationsData).sort((a, b) => b.length - a.length);
  
  for (const key of keys) {
    if (cleanCommand.startsWith(key)) {
      return explanationsData[key]?.description || 'No explanation available.';
    }
  }

  return 'No explanation available.';
}
