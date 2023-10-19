import React from 'react';
import { createRoot } from 'react-dom/client';
import MainView from './components/MainView/main-view'; // Update the import path to match your file structure
import './index.scss';

const App = () => {
  return (
    <div>
      <MainView />
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);


