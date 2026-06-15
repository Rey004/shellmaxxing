import React from 'react';
import { Box, Text } from 'ink';

interface ActivePromptProps {
  query: string;
}

export const ActivePrompt: React.FC<ActivePromptProps> = ({ query }) => (
  <Box paddingLeft={2} marginBottom={1}>
    <Text color="yellow" bold>&gt; </Text>
    <Text color="white">{query}</Text>
    <Text color="#FF8C00">█</Text>
  </Box>
);

export default ActivePrompt;
