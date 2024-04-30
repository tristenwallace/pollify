import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/usersSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import { AppDispatch } from '../app/store';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(registerUser({ username, password, name, avatar_url: avatarUrl }))
      .unwrap()
      .then(() => {
        alert('Signup successful!');
        navigate('/');
      })
      .catch(error => {
        alert('Signup failed: ' + error.message);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 3, mt: 10 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
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
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Avatar URL (optional)"
            variant="outlined"
            value={avatarUrl}
            onChange={e => setAvatarUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Paper>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Button color="primary" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Typography>
    </Container>
  );
};

export default SignupForm;
