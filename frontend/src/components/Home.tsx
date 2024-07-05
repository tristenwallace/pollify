import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { fetchPolls } from '../features/pollSlice';
import PollList from './Polls/PollList';
import PollPagination from './Polls/PollPagination';
import { AppDispatch, RootState } from '../app/store';
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
  const user = useSelector((state: RootState) => state.users.currentUser);
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

  if (!user) {
    // When there is no user logged in, only display 5 most voted on polls
    const topPolls = Object.values(polls)
      .sort((a, b) => b.votes.length - a.votes.length)
      .slice(0, 3);

    return (
      <Container>
        <div
          style={{
            padding: '20px',
            background: '#f0f0f0',
            borderRadius: '8px',
            marginTop: '20px',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Welcome to Employee Polls!
          </Typography>
          <Typography variant="body1" gutterBottom>
            A fun and engaging way to create and participate in polls. Get
            started by signing up or logging in!
          </Typography>
          <div>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/signup"
              sx={{ mr: 2, mt: 2 }}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/login"
              sx={{ mr: 2, mt: 2 }}
            >
              Login
            </Button>
          </div>
        </div>
        <Typography variant="h4" sx={{ my: 4 }}>
          Featured Polls
        </Typography>
        {topPolls.length ? (
          <PollList polls={topPolls} />
        ) : (
          <Typography>No polls available.</Typography>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <div
        style={{
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Take a look at the most recent polls!
        </Typography>
      </div>
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
