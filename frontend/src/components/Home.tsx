import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPolls } from '../features/pollSlice';
import PollPagination from './Polls/PollPagination';
import { AppDispatch, RootState } from '../store/store';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showAnswered, setShowAnswered] = useState(false);
  const user = useSelector((state: RootState) => state.users.currentUser!); // Ensure that user is always defined
  const polls = useSelector((state: RootState) => state.poll.polls);
  const pollStatus = useSelector((state: RootState) => state.poll.status);
  const error = useSelector((state: RootState) => state.poll.error);

  // Fetch polls when component mounts or status changes to idle
  useEffect(() => {
    if (pollStatus === 'idle') {
      dispatch(fetchPolls());
    }
  }, [pollStatus, dispatch]);

  // Show loading indicator during data fetch
  if (pollStatus === 'loading') return <CircularProgress />;

  // Display error if data fetch fails
  if (error) return <Typography>Error: {error}</Typography>;

  // Filter polls into answered and unanswered based on current user's activity
  const answeredPolls = Object.values(polls).filter(
    poll => poll.votes && poll.votes.some(vote => vote.userId === user?.id),
  );

  const unansweredPolls = Object.values(polls).filter(
    poll => poll.votes && !poll.votes.some(vote => vote.userId === user?.id),
  );

  return (
    <Container>
      <Box sx={{ padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Take a look at the most recent polls!
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowAnswered(!showAnswered)}
        >
          Show {showAnswered ? 'Unanswered' : 'Answered'} Polls
        </Button>
      </Box>
      {pollStatus === 'succeeded' &&
      (showAnswered ? answeredPolls.length : unansweredPolls.length) ? (
        <PollPagination
          polls={showAnswered ? answeredPolls : unansweredPolls}
        />
      ) : (
        <Typography>No polls available.</Typography>
      )}
    </Container>
  );
};

export default Home;
