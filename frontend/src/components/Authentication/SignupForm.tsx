import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/usersSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import { AppDispatch } from '../../app/store';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    name: '',
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'username':
        if (!value.trim()) return 'Username is required';
        return '';
      case 'password':
        if (value.length < 6)
          return 'Password must be at least 6 characters long';
        return '';
      case 'name':
        if (!value.trim()) return 'Name is required';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (field: string, value: string) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
    switch (field) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'avatarUrl':
        setAvatarUrl(value);
        break;
      default:
        break;
    }
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    const usernameError = validateField('username', username);
    const passwordError = validateField('password', password);
    const nameError = validateField('name', name);

    if (usernameError || passwordError || nameError) {
      setErrors({
        username: usernameError,
        password: passwordError,
        name: nameError,
      });
      return; // prevent submission if errors
    }

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
      <Paper elevation={6} sx={{ p: 5, mt: 17 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={e => handleChange('username', e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={e => handleChange('password', e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={e => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
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
