import React from 'react';
import 'react-dom';
import Container from 'react-bootstrap/Container';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/MainView/main-view';
import './index.scss';


const App = () => {
  return (
    <Container className="">
    <MainView />
  </Container>
  );
};


const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<App />);
