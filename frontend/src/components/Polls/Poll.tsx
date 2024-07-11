import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchPolls } from '../../features/pollSlice';
import { fetchUsers } from '../../features/usersSlice';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';

interface PollProps {
  pollId: string;
}

const Poll: React.FC<PollProps> = ({ pollId }) => {
  const dispatch: AppDispatch = useDispatch();
  const pollStatus = useSelector((state: RootState) => state.poll.status);
  const usersStatus = useSelector((state: RootState) => state.users.status);

  const poll = useSelector((state: RootState) => state.poll.polls[pollId]);
  const author = useSelector((state: RootState) =>
    poll ? state.users.users.find(user => user.id === poll.userId) : null,
  );

  // Fetch polls if not already fetched
  useEffect(() => {
    if (pollStatus === 'idle') {
      dispatch(fetchPolls());
    }
  }, [pollStatus, dispatch]);

  // Fetch users if not already fetched
  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  // Show loading spinner if poll data is not available
  if (!poll) {
    return <CircularProgress />;
  }

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
