import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import CreatePollForm from './components/CreatePollForm';
// TODO import Leaderboard from './components/Leaderboard';

const App: React.FC = () => {
  return (
    <div className="app">
      {/* Application routing setup */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreatePollForm />} />
      </Routes>
    </div>
  );
};

export default App;
