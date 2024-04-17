import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/usersSlice';
import { AppDispatch, RootState } from '../app/store';
import { Link } from 'react-router-dom';
import {
  List,
  Container,
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

  // Retrieve and sort users by activity (questions asked + answers given)
  const users = useSelector((state: RootState) => {
    return Object.values(state.users.users).sort(
      (a, b) =>
        b.questions.length +
        Object.keys(b.answers).length -
        (a.questions.length + Object.keys(a.answers).length),
    );
  });

  // Access user-related status and error from the Redux store
  const user = useSelector((state: RootState) => state.users.currentUser);
  const userStatus = useSelector((state: RootState) => state.users.status);
  const userError = useSelector((state: RootState) => state.users.error);

  // Fetch users when the component mounts and status is idle
  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, userStatus]);

  // Conditional rendering based on authentication and data loading status
  if (!user) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Please log in to see the polls.
        </Typography>
      </Container>
    );
  }

  // Display a loading spinner while users are being fetched
  if (userStatus === 'loading') {
    return <CircularProgress color="secondary" />;
  }

  // Display an error message if there is an error fetching users
  if (userError) {
    return (
      <Typography variant="h6" color="error">
        {`Error loading users: ${userError}`}
      </Typography>
    );
  }

  // Display a message if no users are available to display
  if (!users.length) {
    return <Typography variant="h6">No users to display.</Typography>;
  }

  // Render the leaderboard UI
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
