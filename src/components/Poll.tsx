import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteOnPoll, Poll as PollType } from '../features/pollSlice'; // Make sure the import path is correct
import { AppDispatch, RootState } from '../app/store';

interface PollProps {
  poll: PollType;
}

const Poll: React.FC<PollProps> = ({ poll }) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.currentUser);

  // Guard clause
  if (!user) {
    return <div>Please log in to vote.</div>;
  }

  const totalVotesOptionOne = poll.optionOne.votes.length;
  const totalVotesOptionTwo = poll.optionTwo.votes.length;
  const totalVotes = totalVotesOptionOne + totalVotesOptionTwo;

  const optionOnePercentage =
    totalVotes > 0
      ? ((totalVotesOptionOne / totalVotes) * 100).toFixed(1)
      : '0';
  const optionTwoPercentage =
    totalVotes > 0
      ? ((totalVotesOptionTwo / totalVotes) * 100).toFixed(1)
      : '0';

  const hasVoted =
    poll.optionOne.votes.includes(user.id!) ||
    poll.optionTwo.votes.includes(user.id!);

  const userVote = poll.optionOne.votes.includes(user.id!)
    ? 'optionOne'
    : poll.optionTwo.votes.includes(user.id!)
      ? 'optionTwo'
      : null;

  const handleVote = (option: 'optionOne' | 'optionTwo') => {
    if (!hasVoted && user) {
      dispatch(voteOnPoll({ pollId: poll.id, option, userId: user.id }));
    }
  };

  return (
    <li>
      <h4>Which would you choose?</h4>
      <div>
        <button onClick={() => handleVote('optionOne')} disabled={hasVoted}>
          {poll.optionOne.text} {userVote === 'optionOne' ? '(Your vote)' : ''}-{' '}
          {totalVotesOptionOne} votes ({optionOnePercentage}%)
        </button>
        <button onClick={() => handleVote('optionTwo')} disabled={hasVoted}>
          {poll.optionTwo.text} {userVote === 'optionTwo' ? '(Your vote)' : ''}-{' '}
          {totalVotesOptionTwo} votes ({optionTwoPercentage}%)
        </button>
      </div>
      {hasVoted && <p>You have voted on this poll.</p>}
    </li>
  );
};

export default Poll;
