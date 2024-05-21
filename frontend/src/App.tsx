import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { fetchCurrentUser, fetchUsers } from './features/usersSlice';
import { fetchPolls } from './features/pollSlice';
import { getToken } from './server/api';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CreatePollForm from './components/CreatePollForm';
import Leaderboard from './components/Leaderboard';
import PollDetails from './components/PollDetails';
import UserSettings from './components/userSettings';
import NotFoundPage from './components/PageNotFound';
import LandingPage from './components/LandingPage/Index';
import Layout from './components/Layout';
import LandingLayout from './components/LandingPage/LandingLayout'

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.users.currentUser);

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(fetchCurrentUser(token));
    }
    dispatch(fetchUsers());
    dispatch(fetchPolls());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Layout><Home /></Layout> : <LandingLayout><LandingPage /></LandingLayout>} />
      <Route path="/login" element={<LandingLayout><LoginForm /></LandingLayout>} />
      <Route path="/signup" element={<LandingLayout><SignupForm /></LandingLayout>} />
      <Route path="/settings" element={<Layout><UserSettings /></Layout>} />
      <Route path="/create" element={<Layout><CreatePollForm /></Layout>} />
      <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
      <Route path="/questions/:pollId" element={<Layout><PollDetails /></Layout>} />
      <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
    </Routes>
  );
};

export default App;
