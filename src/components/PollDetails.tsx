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
    return <CircularProgress />;
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
