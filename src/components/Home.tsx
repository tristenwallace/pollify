import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { fetchPolls } from '../features/pollSlice';
import PollList from './PollList';
import { AppDispatch, RootState } from '../app/store';
import { Container, Typography, Button, Box, Grid } from '@mui/material';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showAnswered, setShowAnswered] = useState(false);
  const polls = useSelector((state: RootState) => state.poll.polls);
  const pollStatus = useSelector((state: RootState) => state.poll.status);
  const error = useSelector((state: RootState) => state.poll.error);
  const user = useSelector((state: RootState) => state.users.currentUser);

  useEffect(() => {
    if (pollStatus === 'idle') {
      dispatch(fetchPolls());
    }
  }, [pollStatus, dispatch]);

  if (!user) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Please log in to see the polls.
        </Typography>
      </Container>
    );
  }

  if (pollStatus === 'loading') return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (pollStatus === 'succeeded' && !Object.keys(polls).length)
    return <Typography>No polls available.</Typography>;

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
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Welcome, {user.name}!
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowAnswered(!showAnswered)}
        >
          Show {showAnswered ? 'Unanswered' : 'Answered'} Polls
        </Button>
        <Button
          component={RouterLink}
          to="/create"
          variant="outlined"
          color="primary"
        >
          Create New Poll
        </Button>
        <Button
          component={RouterLink}
          to="/leaderboard"
          variant="outlined"
          color="primary"
        >
          Go to Leaderboard
        </Button>
      </Box>
      <Grid container spacing={2}>
        {showAnswered ? (
          <PollList polls={answeredPolls} />
        ) : (
          <PollList polls={unansweredPolls} />
        )}
      </Grid>
    </Container>
  );
};

export default Home;
