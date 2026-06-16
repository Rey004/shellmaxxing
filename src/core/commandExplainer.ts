import { loadAllCommands } from './dbLoader.js';

let explanationsCache: Record<string, string> | null = null;

function getExplanationsData(): Record<string, string> {
  if (explanationsCache) return explanationsCache;
  
  const data: Record<string, string> = {};
  const commands = loadAllCommands();
  
  for (const cmd of commands) {
    // Map full command templates to the description
    if (cmd.windows) data[cmd.windows] = cmd.description;
    if (cmd.linux) data[cmd.linux] = cmd.description;
    if (cmd.mac) data[cmd.mac] = cmd.description;
    
    // Also map the base binary name (e.g. "mkdir" from "mkdir <folder-name>")
    const winBase = cmd.windows.split(' ')[0];
    const linBase = cmd.linux.split(' ')[0];
    const macBase = cmd.mac.split(' ')[0];
    
    if (winBase && !data[winBase]) data[winBase] = cmd.description;
    if (linBase && !data[linBase]) data[linBase] = cmd.description;
    if (macBase && !data[macBase]) data[macBase] = cmd.description;
  }
  
  explanationsCache = data;
  return data;
}

/**
 * Gets the description explanation for a given command.
 * @param command The resolved command string (e.g., "mkdir <folder-name>").
 * @returns The explanation description, or a default message if not found.
 */
export function getCommandExplanation(command: string): string {
  const cleanCommand = command.trim();
  const data = getExplanationsData();
  
  // Sort keys by length descending so longer matching prefixes (e.g., "kill -9") match before shorter ones
  const keys = Object.keys(data).sort((a, b) => b.length - a.length);
  
  for (const key of keys) {
    if (cleanCommand.startsWith(key)) {
      return data[key] || 'No explanation available.';
    }
  }

  return 'No explanation available.';
}
