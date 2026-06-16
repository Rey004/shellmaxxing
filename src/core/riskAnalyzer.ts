import { loadAllCommands } from './dbLoader.js';

export type RiskLevel = 'safe' | 'medium' | 'high' | 'critical' | 'unknown';

let risksCache: Record<string, RiskLevel> | null = null;

function getRisksData(): Record<string, RiskLevel> {
  if (risksCache) return risksCache;

  const data: Record<string, RiskLevel> = {};
  const commands = loadAllCommands();

  // Add specific hardcoded critical mappings as safety fallbacks
  data['rm -rf'] = 'critical';
  data['format'] = 'critical';
  data['del /f'] = 'high';

  for (const cmd of commands) {
    if (cmd.windows) data[cmd.windows] = cmd.riskLevel;
    if (cmd.linux) data[cmd.linux] = cmd.riskLevel;
    if (cmd.mac) data[cmd.mac] = cmd.riskLevel;

    // Also map the base binary name
    const winBase = cmd.windows.split(' ')[0];
    const linBase = cmd.linux.split(' ')[0];
    const macBase = cmd.mac.split(' ')[0];

    if (winBase && !data[winBase]) data[winBase] = cmd.riskLevel;
    if (linBase && !data[linBase]) data[linBase] = cmd.riskLevel;
    if (macBase && !data[macBase]) data[macBase] = cmd.riskLevel;
  }

  risksCache = data;
  return data;
}

/**
 * Analyzes the risk level of a command.
 * @param command The command to analyze.
 * @returns The risk level ('safe', 'medium', 'high', 'critical', or 'unknown').
 */
export function getCommandRisk(command: string): RiskLevel {
  const cleanCommand = command.trim();
  const data = getRisksData();

  // Sort keys by length descending to match longer prefixes first (e.g. "rm -rf" before "rm")
  const keys = Object.keys(data).sort((a, b) => b.length - a.length);

  for (const key of keys) {
    if (cleanCommand.startsWith(key)) {
      return data[key] || 'unknown';
    }
  }

  return 'unknown';
}
