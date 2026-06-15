import React from 'react';
import { Box, Text } from 'ink';

export const Tips: React.FC = () => (
  <Box flexDirection="column" marginBottom={2} paddingLeft={2}>
    <Text color="gray" bold>Tips for getting started:</Text>
    <Text color="white">1. Enter queries in natural language (e.g., "find my ip address", "delete file").</Text>
    <Text color="white">2. Commands auto-adapt to your detected OS platform.</Text>
    <Text color="white">3. Review the risk rating before running suggested commands.</Text>
  </Box>
);

export default Tips;
