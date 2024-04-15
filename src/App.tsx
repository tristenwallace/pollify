import React from 'react';
import { Route, Routes } from 'react-router-dom';
// TODO import Home from './components/Home';
import Login from './components/Login';
// TODO import Leaderboard from './components/Leaderboard';
// TODO import Poll from './components/Poll';

const App: React.FC = () => {
  return (
    <div className="app">
      {/* Application routing setup */}
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
