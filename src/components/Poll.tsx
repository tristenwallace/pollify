import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchPolls } from '../features/pollSlice';
import { fetchUsers } from '../features/usersSlice';
import { Card, CardContent, Typography, Button } from '@mui/material';

interface PollProps {
  pollId: string;
}

const Poll: React.FC<PollProps> = ({ pollId }) => {
  const dispatch: AppDispatch = useDispatch();
  const pollStatus = useSelector((state: RootState) => state.poll.status);
  const usersStatus = useSelector((state: RootState) => state.users.status);

  const poll = useSelector((state: RootState) => state.poll.polls[pollId]);
  const author = useSelector(
    (state: RootState) => state.users.users[poll.author],
  );

  useEffect(() => {
    if (pollStatus === 'idle') {
      dispatch(fetchPolls());
    }
  }, [pollStatus, dispatch]);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  if (!poll || !author) {
    return <Typography>Loading...</Typography>; // or handle missing poll or author more gracefully
  }

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{author.name} asks:</Typography>
        <Typography variant="body1">
          Would you rather {poll.optionOne.text} or {poll.optionTwo.text}?
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
