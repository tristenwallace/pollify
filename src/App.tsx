import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import CreatePollForm from './components/CreatePollForm';
import Leaderboard from './components/Leaderboard';
import PollDetails from './components/PollDetails';
import NotFoundPage from './components/PageNotFound';

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePollForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:pollId"
          element={
            <ProtectedRoute>
              <PollDetails />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
