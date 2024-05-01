import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import { fetchCurrentUser, fetchUsers } from './features/usersSlice';
import { fetchPolls } from './features/pollSlice';
import { getToken } from './server/api';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CreatePollForm from './components/CreatePollForm';
import Leaderboard from './components/Leaderboard';
import PollDetails from './components/PollDetails';
import NotFoundPage from './components/PageNotFound';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(fetchCurrentUser(token));
    }
    dispatch(fetchUsers());
    dispatch(fetchPolls());
  }, [dispatch]);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Signup" element={<SignupForm />} />
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
