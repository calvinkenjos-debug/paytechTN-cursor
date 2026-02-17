import React from 'react';
import Index from './pages/Index';
import './lib/utils'; // ensure utils is loaded if needed, mainly for side effects or type checks, though typically not needed for css

const App: React.FC = () => {
  return (
    <Index />
  );
};

export default App;