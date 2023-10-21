import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(<MainView />, document.getElementById('root'));


