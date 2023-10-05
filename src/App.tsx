import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <main
      className="min-h-screen
        flex items-center justify-center bg-cover bg-no-repeat bg-center"
      style={ { backgroundImage: 'url(\'/src/images/background.png\')' } }
    >
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/carteira" element={ <Wallet /> } />
      </Routes>
    </main>
  );
}

export default App;
