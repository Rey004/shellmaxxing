import React from 'react';
import { Box, Text } from 'ink';
import { Intent } from '../../core/intentMatcher.js';
import { RiskLevel } from '../../core/riskAnalyzer.js';

export interface HistoryItem {
  query: string;
  match: Intent | null;
  cmd: string | null;
  explanation: string | null;
  risk: RiskLevel | null;
}

interface HistoryStreamProps {
  items: HistoryItem[];
}

function getRiskColor(risk: RiskLevel): string {
  switch (risk) {
    case 'safe':     return 'green';
    case 'medium':   return 'yellow';
    case 'high':     return 'red';
    case 'critical': return 'redBright';
    default:         return 'gray';
  }
}

function getRiskBg(risk: RiskLevel): string {
  switch (risk) {
    case 'safe':     return 'green';
    case 'medium':   return 'yellow';
    case 'high':     return 'red';
    case 'critical': return 'redBright';
    default:         return 'gray';
  }
}

export const HistoryStream: React.FC<HistoryStreamProps> = ({ items }) => (
  <Box flexDirection="column">
    {items.map((item, index) => (
      <Box key={index} flexDirection="column" marginBottom={1} paddingLeft={2}>

        {/* User Query Row */}
        <Box marginBottom={1}>
          <Text color="#FF8C00" bold>shellmaxxing </Text>
          <Text color="#FFDD00" bold>&gt; </Text>
          <Text color="white">{item.query}</Text>
        </Box>

        {item.match ? (
          <Box paddingLeft={2}>
            <Box
              flexDirection="column"
              borderStyle="round"
              borderColor="#FF8C00"
              paddingLeft={2}
              paddingRight={2}
              paddingTop={0}
              paddingBottom={0}
              width={78}
            >
              {/* Intent Row */}
              <Box>
                <Text color="#FFDD00" bold>Intent      </Text>
                <Text color="white">{item.match.intent}</Text>
              </Box>

              {/* Command Row */}
              <Box>
                <Text color="#FFDD00" bold>Command     </Text>
                <Text color="#FF8C00" bold>{item.cmd}</Text>
              </Box>

              {/* Description Row */}
              <Box>
                <Text color="#FFDD00" bold>Description </Text>
                <Text color="gray">{item.explanation}</Text>
              </Box>

              {/* Risk Row */}
              <Box>
                <Text color="#FFDD00" bold>Risk        </Text>
                <Text
                  color="white"
                  backgroundColor={getRiskBg(item.risk ?? 'unknown')}
                  bold
                >
                  {` ${(item.risk ?? 'unknown').toUpperCase()} `}
                </Text>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box paddingLeft={2}>
            <Box
              borderStyle="round"
              borderColor="red"
              paddingLeft={2}
              paddingRight={2}
              width={78}
            >
              <Text color="red">No command intent matched for this query.</Text>
            </Box>
          </Box>
        )}
      </Box>
    ))}
  </Box>
);

export default HistoryStream;
