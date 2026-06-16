import React from 'react';
import { Box, Text } from 'ink';

interface StatusBarProps {
  platform: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ platform }) => (
  <Box borderStyle="round" borderColor="#FF8C00" paddingLeft={1} paddingRight={1} width={91} gap={2}>
    {/* OS Badge */}
    <Box>
      <Text color="black" backgroundColor="#FF8C00" bold> OS </Text>
      <Text color="#FF8C00" bold> {platform.toUpperCase()} </Text>
    </Box>

    <Text color="white">|</Text>

    {/* Search Shortcut */}
    <Box>
      <Text color="black" backgroundColor="white" bold> Enter </Text>
      <Text color="white"> Search </Text>
    </Box>

    <Text color="white">|</Text>

    {/* Exit Shortcut */}
    <Box>
      <Text color="black" backgroundColor="white" bold> Esc </Text>
      <Text color="white"> Exit </Text>
    </Box>
  </Box>
);

export default StatusBar;
