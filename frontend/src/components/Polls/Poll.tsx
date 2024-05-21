import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchPolls } from '../../features/pollSlice'; // Action to fetch polls from the server
import { fetchUsers } from '../../features/usersSlice'; // Action to fetch users from the server
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material'; // Importing Material-UI components for UI design

interface PollProps {
  pollId: string; // Props definition requiring a string 'pollId'
}

const Poll: React.FC<PollProps> = ({ pollId }) => {
  const dispatch: AppDispatch = useDispatch(); // Hook to dispatch actions
  const pollStatus = useSelector((state: RootState) => state.poll.status); // Accessing the poll loading status from Redux store
  const usersStatus = useSelector((state: RootState) => state.users.status); // Accessing the user loading status from Redux store

  const poll = useSelector((state: RootState) => state.poll.polls[pollId]); // Retrieving specific poll by ID from Redux store
  const author = useSelector((state: RootState) => {
    if (poll) {
      return state.users.users.find(user => user.id === poll.userId);
    }
    return null;
  });

  // Fetch polls if the status is 'idle', indicating they have not been fetched yet
  useEffect(() => {
    if (pollStatus === 'idle') {
      dispatch(fetchPolls());
    }
  }, [pollStatus, dispatch]);

  // Fetch users if the status is 'idle', similar to fetching polls
  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  // Display loading indicator if poll or author data is not available
  if (!poll) {
    return <CircularProgress />; // Shows a progress indicator while loading data
  }

  // Render the poll information within a card
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {author ? author.name : 'An anonymous user'} asks:
        </Typography>
        <Typography variant="body1">
          Would you rather {poll.optionOne} or {poll.optionTwo}?
        </Typography>
        <Button
          component={RouterLink}
          to={`/questions/${poll.id}`}
          size="small"
          color="primary"
        >
          View Poll
        </Button>
      </CardContent>
    </Card>
  );
};

export default Poll;
