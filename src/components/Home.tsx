import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPolls } from '../features/pollSlice';
import PollList from './PollList';
import { AppDispatch, RootState } from '../app/store';
import Login from './Login';
import CreatePollForm from './CreatePollForm';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const polls = useSelector((state: RootState) => state.poll.polls);
  const pollStatus = useSelector((state: RootState) => state.poll.status);
  const error = useSelector((state: RootState) => state.poll.error);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (pollStatus === 'idle') {
      dispatch(fetchPolls());
    }
  }, [pollStatus, dispatch]);

  if (!user) {
    return (
      <div>
        <h3>Please log in to see the polls.</h3>
        <Login />
      </div>
    ); // Or handle this case appropriately
  }

  if (pollStatus === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (pollStatus === 'succeeded' && !Object.keys(polls).length)
    return <div>No polls available.</div>;

  // Convert polls object to array if stored as an object in Redux
  const pollsArray = Object.values(polls);

  return (
    <div>
      <div>
        <h1>Polls</h1>
        <PollList polls={pollsArray} />
      </div>
      <div>
        <CreatePollForm />
      </div>
    </div>
  );
};

export default Home;
