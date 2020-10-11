import React from 'react';
import './App.css';
import Routes from './routes'
import {Container} from 'reactstrap'

function App() {
  return (
    <Container>
      <h1> AI PERSONAL TRAINER </h1>
      <div className='content'>
        <Routes/>
      </div>
    </Container>
  );
}

export default App;
