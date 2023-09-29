import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={ <Login /> } />
      </Routes>
    </main>
  );
}

export default App;
