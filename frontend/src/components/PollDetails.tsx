import { useParams, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { voteOnPoll } from '../features/pollSlice';
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
  const pollId = useParams<{ pollId: string }>().pollId as string;
  // Hook to programmatically navigate
  const dispatch: AppDispatch = useDispatch();
  // Retrieve the current user from global state
  const user = useSelector((state: RootState) => state.users.currentUser);
  // Retrieve poll and author details from the Redux store
  const poll = useSelector((state: RootState) => state.poll.polls[pollId]);
  const author = useSelector((state: RootState) => {
    if (poll) {
      return state.users.users.find(user => user.id === poll.userId);
    }
    return null;
  });

  // Redirect to not found page if no poll ID is found
  if (!pollId || !poll) {
    return <Navigate to="/404" />;
  }

  // Redirect to login if the user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Show a loading indicator while author data is being loaded
  if (!author) {
    return <CircularProgress />;
  }
  // Calculate the total votes and percentages for each poll option
  const optionOneVotes = poll.votes.filter(
    vote => vote.chosenOption === 1,
  ).length;
  const optionTwoVotes = poll.votes.filter(
    vote => vote.chosenOption === 2,
  ).length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  const optionOnePercentage =
    totalVotes > 0 ? ((optionOneVotes / totalVotes) * 100).toFixed(1) : '0';
  const optionTwoPercentage =
    totalVotes > 0 ? ((optionTwoVotes / totalVotes) * 100).toFixed(1) : '0';

  // Determine if the current user has voted and on which option
  const userVote = poll.votes.find(
    vote => vote.userId === user.id,
  )?.chosenOption;

  // Handle voting on a poll option
  const handleVote = (chosenOption: number) => {
    if (!userVote) {
      dispatch(
        voteOnPoll({
          pollId: poll.id,
          userId: user.id,
          chosenOption,
        }),
      );
    }
  };

  return (
    <Card sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <CardHeader
        avatar={<Avatar src={author.avatar_url || '/default-avatar.png'} />}
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
          {poll.optionOne} - {optionOneVotes} votes ({optionOnePercentage}%)
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {poll.optionTwo} - {optionTwoVotes} votes ({optionTwoPercentage}%)
        </Typography>
        <div>
          <Button
            variant="contained"
            onClick={() => handleVote(1)}
            disabled={!!userVote}
            sx={{ mr: 2, mt: 2 }}
          >
            Vote Option 1 {userVote === 1 ? '(Your vote)' : ''}
          </Button>
          <Button
            variant="contained"
            onClick={() => handleVote(2)}
            disabled={!!userVote}
            sx={{ mt: 2 }}
          >
            Vote Option 2 {userVote === 2 ? '(Your vote)' : ''}
          </Button>
        </div>
        {userVote && (
          <Typography sx={{ mt: 2 }}>
            You voted for: {userVote === 1 ? poll.optionOne : poll.optionTwo}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PollDetail;
