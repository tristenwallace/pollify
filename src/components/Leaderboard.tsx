import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/usersSlice';
import { AppDispatch, RootState } from '../app/store';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';

const Leaderboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => {
    return Object.values(state.users.users).sort(
      (a, b) =>
        b.questions.length +
        Object.keys(b.answers).length -
        (a.questions.length + Object.keys(a.answers).length),
    );
  });
  const userStatus = useSelector((state: RootState) => state.users.status); // Assuming you have a status in your users state
  const userError = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    if (userStatus === 'idle') {
      // Check if the users have not been fetched yet
      dispatch(fetchUsers());
    }
  }, [dispatch, userStatus]);

  if (userStatus === 'loading') {
    return <CircularProgress color="secondary" />;
  }

  if (userError) {
    return (
      <Typography
        variant="h6"
        color="error"
      >{`Error loading users: ${userError}`}</Typography>
    );
  }

  if (!users.length) {
    return <Typography variant="h6">No users to display.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 2 }}>
        Back to Home
      </Button>
      <List>
        {users.map(user => (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar
                src={user.avatarURL || '/default-avatar.png'}
                alt={`${user.name}'s avatar`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={`Questions Asked: ${user.questions.length} - Answers Given: ${Object.keys(user.answers).length}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Leaderboard;
