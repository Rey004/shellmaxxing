import * as os from 'os';

export type OSPlatform = 'windows' | 'linux' | 'mac';

/**
 * Detects the current Operating System platform.
 * Returns 'windows', 'linux', or 'mac'.
 */
export function getOSPlatform(): OSPlatform {
  const platform = os.platform();
  if (platform === 'win32') {
    return 'windows';
  } else if (platform === 'darwin') {
    return 'mac';
  } else {
    return 'linux';
  }
}
