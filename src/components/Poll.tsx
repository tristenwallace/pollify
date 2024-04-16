import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchPolls } from '../features/pollSlice';
import { fetchUsers } from '../features/usersSlice';

interface PollProps {
  pollId: string;
}

const Poll: React.FC<PollProps> = ({ pollId }) => {
  const dispatch: AppDispatch = useDispatch();
  const pollStatus = useSelector((state: RootState) => state.poll.status);
  const usersStatus = useSelector((state: RootState) => state.users.status);

  const poll = useSelector((state: RootState) => state.poll.polls[pollId]);
  const author = useSelector(
    (state: RootState) => state.users.users[poll.author],
  );

  useEffect(() => {
    if (pollStatus === 'idle') {
      dispatch(fetchPolls());
    }
  }, [pollStatus, dispatch]);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  if (!poll || !author) {
    return <div>Loading...</div>; // or handle missing poll or author more gracefully
  }

  return (
    <li>
      <h4>{author.name} asks:</h4>
      <div>
        <p>
          Would you rather {poll.optionOne.text} or {poll.optionTwo.text}?
        </p>
        <Link to={`/questions/${poll.id}`}>View Poll</Link>
      </div>
    </li>
  );
};

export default Poll;
