import React from 'react';
import { Box, Text } from 'ink';

export const About: React.FC = () => (
  <Box 
    flexDirection="column" 
    borderStyle="round" 
    borderColor="#FF8C00" 
    paddingLeft={2} 
    paddingRight={2}
    marginBottom={1}
    width={91}
  >
    <Box gap={1}>
      <Text color="#FFDD00" bold>⚡ [INFO]</Text>
      <Text color="#FF8C00" bold>Shellmaxxing</Text>
      <Text color="gray">|</Text>
      <Text color="white">OS-adaptive natural language command translation & risk analysis</Text>
    </Box>
  </Box>
);

export default About;
