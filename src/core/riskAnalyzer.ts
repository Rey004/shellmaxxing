import * as fs from 'fs';
import * as path from 'path';

export type RiskLevel = 'safe' | 'medium' | 'high' | 'critical' | 'unknown';

const risksPath = path.resolve(process.cwd(), 'src/data/risks.json');
const risksData: Record<string, string> = JSON.parse(
  fs.readFileSync(risksPath, 'utf-8')
);

/**
 * Analyzes the risk level of a command.
 * @param command The command to analyze.
 * @returns The risk level ('safe', 'medium', 'high', 'critical', or 'unknown').
 */
export function getCommandRisk(command: string): RiskLevel {
  const cleanCommand = command.trim();

  // Sort keys by length descending to match longer prefixes first (e.g. "rm -rf" before "rm")
  const keys = Object.keys(risksData).sort((a, b) => b.length - a.length);

  for (const key of keys) {
    if (cleanCommand.startsWith(key)) {
      return (risksData[key] as RiskLevel) || 'unknown';
    }
  }

  return 'unknown';
}
