import { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { voteOnPoll, PollOptionKey } from '../features/pollSlice';
import { RootState, AppDispatch } from '../app/store';

const PollDetail = () => {
  const { pollId } = useParams<{ pollId: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.currentUser);

  if (!pollId) {
    return <Navigate to="/404" />;
  }

  const poll = useSelector((state: RootState) => state.poll.polls[pollId]);
  const author = useSelector(
    (state: RootState) => poll && state.users.users[poll.author],
  );

  useEffect(() => {
    if (!poll) {
      navigate('/404');
    }
  }, [poll, navigate]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!poll || !author) {
    return <p>Poll not found or loading...</p>;
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

  const userVote = poll.optionOne.votes.includes(user.id)
    ? 'optionOne'
    : poll.optionTwo.votes.includes(user.id)
      ? 'optionTwo'
      : null;

  const handleVote = (option: PollOptionKey) => {
    if (!userVote && user) {
      dispatch(
        voteOnPoll({
          pollId: poll.id,
          option: option,
          userId: user.id,
          existingPoll: poll,
        }),
      );
    }
  };

  return (
    <div>
      <h1>Would You Rather</h1>
      <img
        src={author.avatarURL || '/default-avatar.png'}
        alt={`${author.name}'s avatar`}
        style={{ width: 50, height: 50 }}
      />
      <h2>{author.name}</h2>
      <div>
        <p>
          {poll.optionOne.text} - {totalVotesOptionOne} votes (
          {optionOnePercentage}%)
        </p>
        <p>
          {poll.optionTwo.text} - {totalVotesOptionTwo} votes (
          {optionTwoPercentage}%)
        </p>
        <div>
          <button onClick={() => handleVote('optionOne')} disabled={!!userVote}>
            {poll.optionOne.text}{' '}
            {userVote === 'optionOne' ? '(Your vote)' : ''}
          </button>
          <button onClick={() => handleVote('optionTwo')} disabled={!!userVote}>
            {poll.optionTwo.text}{' '}
            {userVote === 'optionTwo' ? '(Your vote)' : ''}
          </button>
        </div>
        {userVote && <p>You voted for: {poll[userVote].text}</p>}
      </div>
    </div>
  );
};

export default PollDetail;
