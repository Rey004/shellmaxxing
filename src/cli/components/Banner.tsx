import React from 'react';
import { Box, Text } from 'ink';

const bannerLines = [
  "  ████ ██ ██ ████ ██   ██   ██    ██  ████  ██    ██  ██    ██ ████ ███    ██ ██████",
  "  ██   ██ ██ ██   ██   ██   ███  ███ ██  ██  ██  ██    ██  ██   ██  ████   ██ ██  ",
  "  ████ █████ ████ ██   ██   ██ ██ ██ ██████   ████      ████    ██  ██ ███ ██ ██  ███",
  "    ██ ██ ██ ██   ██   ██   ██    ██ ██  ██  ██  ██    ██  ██   ██  ██   ████ ██   ██",
  "  ████ ██ ██ ████ ████ ████ ██    ██ ██  ██ ██    ██  ██    ██ ████ ██    ███  █████"
];

const gradientColors = ['#FFDD00', '#FCD303', '#FBB03B', '#FF8F00', '#FF6F00'];
const shadowColor = '#582c00ff';

/**
 * Renders one banner line with a subtle left-side shadow:
 * Any space that is immediately followed by a '█' gets replaced with
 * a dim '▌' (left half-block) in shadowColor. This creates a dark edge
 * on the left side of each letter block without disrupting the layout.
 */
function renderLineWithLeftShadow(line: string, mainColor: string): React.ReactNode {
  const spans: React.ReactNode[] = [];

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    const next = line[i + 1] ?? ' ';

    if (ch === ' ' && next === '█') {
      // Space directly before a block = left edge → dark shadow half-block
      spans.push(
        <Text key={i} color={shadowColor}>▌</Text>
      );
    } else if (ch === '█') {
      spans.push(
        <Text key={i} color={mainColor} bold>█</Text>
      );
    } else {
      // Plain space (not adjacent to a block)
      spans.push(
        <Text key={i}> </Text>
      );
    }
  }

  return <Box key={line}>{spans}</Box>;
}

export const Banner: React.FC = () => (
  <Box flexDirection="column" marginBottom={1}>

    <Text color="yellow" dimColor>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</Text>
    {/* Main rows with subtle left-side shadow baked in */}
    {bannerLines.map((line, idx) =>
      renderLineWithLeftShadow(line, gradientColors[idx] ?? 'yellow')
    )}

    {/* Single bottom-shadow row: replaced █ with ▄ for a thin bottom edge only */}
    <Text color={shadowColor} dimColor>
      {(bannerLines.at(-1) ?? '').slice(1).replace(/█/g, '▄')}
    </Text>

    <Text color="yellow" dimColor>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</Text>
  </Box>
);

export default Banner;
