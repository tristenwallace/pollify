import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteOnPoll, Poll as PollType } from '../features/pollSlice'; // Make sure the import path is correct
import { AppDispatch, RootState } from '../app/store';

interface PollProps {
  poll: PollType;
}

const Poll: React.FC<PollProps> = ({ poll }) => {
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user); // Assuming user might be undefined

  const hasVoted =
    poll.optionOne.votes.includes(userId ?? '') ||
    poll.optionTwo.votes.includes(userId ?? '');
  const userVote = poll.optionOne.votes.includes(userId ?? '')
    ? 'optionOne'
    : poll.optionTwo.votes.includes(userId ?? '')
      ? 'optionTwo'
      : null;

  const handleVote = (option: 'optionOne' | 'optionTwo') => {
    console.log(`Voting on ${option} by user ${userId}`);
    if (userId && !hasVoted) {
      dispatch(voteOnPoll({ pollId: poll.id, option, userId }));
    }
  };

  return (
    <li>
      <h4>Which would you rather?</h4>
      <div>
        <button onClick={() => handleVote('optionOne')} disabled={hasVoted}>
          {poll.optionOne.text} {userVote === 'optionOne' ? '(Your vote)' : ''}
        </button>
        <button onClick={() => handleVote('optionTwo')} disabled={hasVoted}>
          {poll.optionTwo.text} {userVote === 'optionTwo' ? '(Your vote)' : ''}
        </button>
      </div>
      {hasVoted && <p>You have voted on this poll.</p>}
    </li>
  );
};

export default Poll;
