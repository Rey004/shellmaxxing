import React, { useState } from 'react';
import { render, Box, useInput, useApp } from 'ink';
import { matchIntent } from '../core/intentMatcher.js';
import { getOSPlatform } from '../core/osDetector.js';
import { getCommandExplanation } from '../core/commandExplainer.js';
import { getCommandRisk } from '../core/riskAnalyzer.js';

// Import split layout components
import Banner from './components/Banner.js';
import About from './components/About.js';
import Tips from './components/Tips.js';
import HistoryStream, { HistoryItem } from './components/HistoryStream.js';
import ActivePrompt from './components/ActivePrompt.js';
import StatusBar from './components/StatusBar.js';
import Loader from './components/Loader.js';

const platform = getOSPlatform();

const ShellMaxxingTUI: React.FC = () => {
  const { exit } = useApp();
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useInput((input, key) => {
    if (loading) return; // Ignore input while loading

    if (key.return) {
      if (query.trim() === '') return;
      
      setLoading(true);
      const searchQuery = query;
      setQuery('');

      // Simulate a search delay for loading animation
      setTimeout(() => {
        const result = matchIntent(searchQuery);
        const cmd = result ? (result[platform] || 'N/A') : null;
        const explanation = cmd ? getCommandExplanation(cmd) : null;
        const risk = cmd ? getCommandRisk(cmd) : null;

        const newItem: HistoryItem = {
          query: searchQuery,
          match: result,
          cmd,
          explanation,
          risk
        };

        setHistory(prev => [...prev, newItem].slice(-3));
        setLoading(false);
      }, 600);
    } else if (key.backspace || key.delete) {
      setQuery(prev => prev.slice(0, -1));
    } else if (key.escape) {
      exit();
    } else if (input && !key.ctrl && !key.meta) {
      setQuery(prev => prev + input);
    }
  });

  return (
    <Box flexDirection="column" padding={1} width={93}>
      <Banner />
      {history.length === 0 && !loading && (
        <Box flexDirection="column">
          <About />
          <Tips />
        </Box>
      )}
      <HistoryStream items={history} />
      {loading ? <Loader /> : <ActivePrompt query={query} />}
      <StatusBar platform={platform} />
    </Box>
  );
};

render(<ShellMaxxingTUI />);
