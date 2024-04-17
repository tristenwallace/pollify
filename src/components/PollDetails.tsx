import { useEffect } from 'react';
import { useParams, Navigate, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { voteOnPoll, PollOptionKey } from '../features/pollSlice';
import { RootState, AppDispatch } from '../app/store';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Avatar,
  CardHeader,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PollDetail = () => {
  // Retrieve poll ID from URL parameters
  const { pollId } = useParams<{ pollId: string }>();
  // Hook to programmatically navigate
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  // Retrieve the current user from global state
  const user = useSelector((state: RootState) => state.users.currentUser);

  // Redirect to not found page if no poll ID is found
  if (!pollId) {
    return <Navigate to="/404" />;
  }

  // Retrieve poll and author details from the Redux store
  const poll = useSelector((state: RootState) => state.poll.polls[pollId]);
  const author = useSelector(
    (state: RootState) => poll && state.users.users[poll.author],
  );

  // Redirect to not found page if the poll doesn't exist
  useEffect(() => {
    if (!poll) {
      navigate('/404');
    }
  }, [poll, navigate]);

  // Redirect to login if the user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Show a loading indicator while poll or author data is being loaded
  if (!poll || !author) {
    return <CircularProgress />;
  }

  // Calculate the total votes and percentages for each poll option
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

  // Determine if the current user has voted and on which option
  const userVote = poll.optionOne.votes.includes(user.id)
    ? 'optionOne'
    : poll.optionTwo.votes.includes(user.id)
      ? 'optionTwo'
      : null;

  // Handle voting on a poll option
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
    <Card sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <CardHeader
        avatar={<Avatar src={author.avatarURL || '/default-avatar.png'} />}
        title={author.name}
        subheader="asks:"
        action={
          <Button component={Link} to="/" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        }
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Would You Rather...
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {poll.optionOne.text} - {totalVotesOptionOne} votes (
          {optionOnePercentage}%)
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {poll.optionTwo.text} - {totalVotesOptionTwo} votes (
          {optionTwoPercentage}%)
        </Typography>
        <div>
          <Button
            variant="contained"
            onClick={() => handleVote('optionOne')}
            disabled={!!userVote}
            sx={{ mr: 2, mt: 2 }}
          >
            {poll.optionOne.text}{' '}
            {userVote === 'optionOne' ? '(Your vote)' : ''}
          </Button>
          <Button
            variant="contained"
            onClick={() => handleVote('optionTwo')}
            disabled={!!userVote}
            sx={{ mt: 2 }}
          >
            {poll.optionTwo.text}{' '}
            {userVote === 'optionTwo' ? '(Your vote)' : ''}
          </Button>
        </div>
        {userVote && (
          <Typography sx={{ mt: 2 }}>
            You voted for: {poll[userVote].text}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PollDetail;
