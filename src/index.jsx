import React from 'react';
import { createRoot } from 'react-dom';
import { MainView } from './components/MainView/main-view';
import './index.scss';

const App = () => {
  return <MainView />;
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<App />);
