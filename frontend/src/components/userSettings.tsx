import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { updateUser, deleteUser } from '../features/usersSlice';
import { fetchPolls } from '../features/pollSlice';
import {
  Container,
  TextField,
  Button,
  Typography,
  Avatar,
  Box,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PollPagination from './PollPagination'; // Import PollPagination component

const UserSettings: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.currentUser);
  const polls = useSelector((state: RootState) =>
    Object.values(state.poll.polls),
  );
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
  const [errors, setErrors] = useState({
    password: '',
  });

  useEffect(() => {
    dispatch(fetchPolls());
  }, [dispatch]);

  const userPolls = polls.filter(poll => poll.userId === user?.id);

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'password':
        if (value.length > 0 && value.length < 6)
          return 'Password must be at least 6 characters long';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (field: string, value: string) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'avatarUrl':
        setAvatarUrl(value);
        break;
      default:
        break;
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    const passwordError = validateField('password', password);

    if (passwordError) {
      setErrors({
        password: passwordError,
      });
      return; // prevent submission if errors
    }

    dispatch(
      updateUser({ id: user?.id, name, password, avatar_url: avatarUrl }),
    )
      .unwrap()
      .then(() => {
        alert('Settings updated successfully!');
      })
      .catch(error => {
        alert('Failed to update settings: ' + error.message);
      });
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.',
      )
    ) {
      dispatch(deleteUser(user?.id || ''))
        .unwrap()
        .then(() => {
          alert('Account deleted successfully');
          navigate('/home');
        })
        .catch(error => {
          alert('Failed to delete account: ' + error.message);
        });
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Container component={Paper} sx={{ mb: 5, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Current User Details
        </Typography>
        <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
          <Avatar
            src={user?.avatar_url}
            sx={{ width: 100, height: 100, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">{user?.name}</Typography>
            <Typography variant="body1">
              Polls Created: {user?.pollCount}
            </Typography>
            <Typography variant="body1">
              Votes Cast: {user?.voteCount}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h4" gutterBottom>
          Edit User Settings
        </Typography>
        <Box component="form" onSubmit={handleUpdate}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={name}
                onChange={e => handleChange('name', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => handleChange('password', e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="User Image URL"
                value={avatarUrl}
                onChange={e => handleChange('avatarUrl', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Avatar src={avatarUrl} sx={{ width: 100, height: 100 }} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Typography variant="h5" gutterBottom>
        Your Polls
      </Typography>
      <PollPagination polls={userPolls} />
    </Container>
  );
};

export default UserSettings;
