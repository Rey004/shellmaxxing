import { CommandEntry, RiskLevel } from './types.js';

export const VALID_CATEGORIES = new Set([
  'filesystem',
  'networking',
  'processes',
  'git',
  'docker',
  'kubernetes',
  'cloud',
  'package_management',
  'system_administration',
  'database',
  'security',
  'text_processing',
  'compression'
]);

export const VALID_RISK_LEVELS = new Set<RiskLevel>([
  'safe',
  'medium',
  'high',
  'critical',
  'unknown'
]);

/**
 * Normalizes and classifies an entry's category based on its properties and commands.
 */
export function classifyCategory(entry: CommandEntry): string {
  const originalCat = entry.category ? entry.category.toLowerCase().trim().replace(/\s+/g, '_') : '';
  
  if (VALID_CATEGORIES.has(originalCat)) {
    return originalCat;
  }

  // Fallbacks: map common alternate names
  if (originalCat === 'package_management' || originalCat === 'pkg') return 'package_management';
  if (originalCat === 'system_admin' || originalCat === 'sysadmin') return 'system_administration';

  // Keyword matching based on commands or intent
  const content = `${entry.intent} ${entry.windows} ${entry.linux} ${entry.mac}`.toLowerCase();

  if (content.includes('kubectl') || content.includes('kubernetes') || content.includes('pod')) {
    return 'kubernetes';
  }
  if (content.includes('git') || content.includes('repo')) {
    return 'git';
  }
  if (content.includes('docker') || content.includes('container')) {
    return 'docker';
  }
  if (content.includes('aws') || content.includes('s3') || content.includes('ec2') || content.includes('cloud')) {
    return 'cloud';
  }
  if (
    content.includes('npm') ||
    content.includes('apt') ||
    content.includes('brew') ||
    content.includes('winget') ||
    content.includes('yarn') ||
    content.includes('pnpm') ||
    content.includes('pip')
  ) {
    return 'package_management';
  }
  if (
    content.includes('ipconfig') ||
    content.includes('ifconfig') ||
    content.includes('ping') ||
    content.includes('netstat') ||
    content.includes('curl') ||
    content.includes('wget') ||
    content.includes('port') ||
    content.includes('ssh ')
  ) {
    if (content.includes('ssh ')) {
      return 'security';
    }
    return 'networking';
  }
  if (
    content.includes('ps ') ||
    content.includes('tasklist') ||
    content.includes('kill') ||
    content.includes('process') ||
    content.includes('top')
  ) {
    return 'processes';
  }
  if (
    content.includes('psql') ||
    content.includes('mysql') ||
    content.includes('redis') ||
    content.includes('mongo') ||
    content.includes('sqlite') ||
    content.includes('database') ||
    content.includes('db ')
  ) {
    return 'database';
  }
  if (
    content.includes('chmod') ||
    content.includes('chown') ||
    content.includes('ssh-keygen') ||
    content.includes('firewall') ||
    content.includes('ufw') ||
    content.includes('security') ||
    content.includes('encrypt')
  ) {
    return 'security';
  }
  if (
    content.includes('grep') ||
    content.includes('findstr') ||
    content.includes('cat ') ||
    content.includes('tail') ||
    content.includes('head') ||
    content.includes('echo ') ||
    content.includes('sed') ||
    content.includes('awk') ||
    content.includes('text')
  ) {
    return 'text_processing';
  }
  if (
    content.includes('tar ') ||
    content.includes('zip') ||
    content.includes('unzip') ||
    content.includes('gzip') ||
    content.includes('compress')
  ) {
    return 'compression';
  }
  if (
    content.includes('ls ') ||
    content.includes('dir ') ||
    content.includes('mkdir') ||
    content.includes('rm ') ||
    content.includes('del ') ||
    content.includes('cp ') ||
    content.includes('mv ') ||
    content.includes('copy ') ||
    content.includes('move ')
  ) {
    return 'filesystem';
  }

  return 'system_administration';
}

/**
 * Validates a CommandEntry. Returns true if valid, false if it should be rejected.
 * Modifies/normalizes properties on the entry in-place where applicable.
 */
export function validateEntry(entry: CommandEntry): boolean {
  // 1. Check mandatory fields
  if (!entry.id || !entry.intent) {
    console.warn(`[VALIDATION FAILED] Missing ID or Intent:`, entry);
    return false;
  }

  // 2. Ensure at least one platform command template is specified
  if (!entry.windows && !entry.linux && !entry.mac) {
    console.warn(`[VALIDATION FAILED] No platform implementation command for ID: ${entry.id}`);
    return false;
  }

  // 3. Normalize description
  if (!entry.description) {
    entry.description = 'No command description available.';
  }

  // 4. Validate and classify category
  entry.category = classifyCategory(entry);

  // 5. Validate risk level
  const risk = entry.riskLevel ? (entry.riskLevel.toLowerCase().trim() as RiskLevel) : 'unknown';
  entry.riskLevel = VALID_RISK_LEVELS.has(risk) ? risk : 'unknown';

  return true;
}
