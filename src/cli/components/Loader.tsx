import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';

interface ProgressStep {
  blocks: number;
  text: string;
}

const progressSteps: ProgressStep[] = [
  { blocks: 0, text: 'Connecting to database...' },
  { blocks: 2, text: 'Reading command intents...' },
  { blocks: 4, text: 'Checking aliases...' },
  { blocks: 6, text: 'Initializing Fuse.js engine...' },
  { blocks: 8, text: 'Scoring query match candidates...' },
  { blocks: 10, text: 'Resolving operating system commands...' },
  { blocks: 12, text: 'Analyzing command risk level...' },
  { blocks: 14, text: 'Generating suggestions...' },
  { blocks: 16, text: 'Search completed!' }
];

export const Loader: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex(prev => {
        if (prev < progressSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 65); // cycles through in ~600ms

    return () => clearInterval(timer);
  }, []);

  const currentStep = progressSteps[stepIndex] ?? progressSteps[0];
  if (!currentStep) return null;

  const filled = '█'.repeat(currentStep.blocks);
  const empty = '░'.repeat(16 - currentStep.blocks);

  return (
    <Box paddingLeft={2} marginBottom={1} gap={1}>
      <Text color="#FF8C00">[</Text>
      <Text color="#FFDD00" bold>{filled}</Text>
      <Text color="#FF8C00" dimColor>{empty}</Text>
      <Text color="#FF8C00">]</Text>
      <Text color="white" italic>{currentStep.text}</Text>
    </Box>
  );
};

export default Loader;
