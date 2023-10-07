import React from 'react';
import Container from 'react-bootstrap/Container';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/MainView/main-view';
import './index.scss';
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  return (
    <Container style={{border: ""}}>
    <MainView />
  </Container>
  );
};


const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<App />);
