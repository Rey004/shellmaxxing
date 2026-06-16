export type RiskLevel = 'safe' | 'medium' | 'high' | 'critical' | 'unknown';

export interface CommandEntry {
  id: string;
  intent: string;
  aliases: string[];
  windows: string;
  linux: string;
  mac: string;
  description: string;
  examples: string[];
  category: string;
  riskLevel: RiskLevel;
}
