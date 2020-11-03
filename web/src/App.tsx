import React from 'react';

import Navbar from './components/Navbar';
import Routes from './routes';

import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Navbar />   
      <Routes />
    </div>
  );
}

export default App;
