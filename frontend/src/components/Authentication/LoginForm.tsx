import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Location } from 'react-router-dom';
import { loginUser } from '../../features/usersSlice';
import { AppDispatch, RootState } from '../../app/store';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled component for displaying error messages
const ErrorTypography = styled(Typography)({
  color: 'red',
  marginTop: 8,
});

interface LocationState {
  from: {
    pathname: string;
  };
}

const LoginForm: React.FC = () => {
  // Local state for handling user input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Access Redux state and dispatch function
  const error = useSelector((state: RootState) => state.users.error);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as Location & { state: LocationState }; // Attempt to find a redirect path in the location state; default to home page if not found
  const from = location.state?.from?.pathname || '/';

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (username && password) {
      dispatch(loginUser({ username, password }))
        .unwrap() // Ensures promise returns in either fulfilled or rejected state
        .then(() => navigate(from)) // Navigate to home page on successful login
        .catch(error => {
          console.error('Failed to login:', error.message); // Log error if login fails
        });
    }
  };

  // Render the login form
  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 3, mt: 17 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          {error && <ErrorTypography>{error}</ErrorTypography>}
        </form>
      </Paper>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Are you new here?{' '}
        <Button color="primary" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </Typography>
    </Container>
  );
};

export default LoginForm;
