import { createSelector } from 'reselect';
import { useEffect } from 'react';
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
  Container
} from '@mui/material';

// Memoized selector
const selectSortedUsers = createSelector(
  [(state: RootState) => state.users.users],
  users =>
    Object.values(users).sort(
      (a, b) =>
        (b.pollCount ?? 0) +
        (b.voteCount ?? 0) -
        ((a.pollCount ?? 0) + (a.voteCount ?? 0)),
    ),
);

const Leaderboard = () => {
  const dispatch: AppDispatch = useDispatch();

  // Access user-related status and error from the Redux store
  const users = useSelector(selectSortedUsers);
  const userStatus = useSelector((state: RootState) => state.users.status);
  const userError = useSelector((state: RootState) => state.users.error);

  // Fetch users when the component mounts and status is idle
  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, userStatus]);

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
    <Container>
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
                  src={user.avatar_url || '/default-avatar.png'}
                  alt={`${user.name}'s avatar`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={`Polls Created: ${user.pollCount}, Votes: ${user.voteCount}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Leaderboard;
