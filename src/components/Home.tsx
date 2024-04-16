import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPolls } from '../features/pollSlice';
import PollList from './PollList';
import { AppDispatch, RootState } from '../app/store';
import Login from './Login';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showAnswered, setShowAnswered] = useState(false);
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

  // Filter polls based on whether they have been answered by the user
  const answeredPolls = Object.values(polls).filter(
    poll =>
      poll.optionOne.votes.includes(user.id) ||
      poll.optionTwo.votes.includes(user.id),
  );
  const unansweredPolls = Object.values(polls).filter(
    poll =>
      !poll.optionOne.votes.includes(user.id) &&
      !poll.optionTwo.votes.includes(user.id),
  );

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={() => setShowAnswered(!showAnswered)}>
        Show {showAnswered ? 'Unanswered' : 'Answered'} Polls
      </button>
      <div>
        {showAnswered ? (
          <PollList polls={answeredPolls} />
        ) : (
          <PollList polls={unansweredPolls} />
        )}
      </div>
      <Link to="/create">Create New Poll</Link>
    </div>
  );
};

export default Home;
