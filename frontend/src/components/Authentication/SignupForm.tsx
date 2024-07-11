import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/usersSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import { AppDispatch } from '../../store/store';

// Initial state for form errors
const initialErrorState = {
  username: '',
  password: '',
  name: '',
};

const SignupForm: React.FC = () => {
  // Local state for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [errors, setErrors] = useState(initialErrorState);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Validate individual fields
  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'username':
        return !value.trim() ? 'Username is required' : '';
      case 'password':
        return value.length < 6
          ? 'Password must be at least 6 characters long'
          : '';
      case 'name':
        return !value.trim() ? 'Name is required' : '';
      default:
        return '';
    }
  };

  // Handle input changes and validation
  const handleChange = (field: string, value: string) => {
    setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
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

  // Handle form submission
  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate all fields before submission
    const usernameError = validateField('username', username);
    const passwordError = validateField('password', password);
    const nameError = validateField('name', name);

    if (usernameError || passwordError || nameError) {
      setErrors({
        username: usernameError,
        password: passwordError,
        name: nameError,
      });
      return; // Prevent submission if there are validation errors
    }

    try {
      await dispatch(
        registerUser({ username, password, name, avatar_url: avatarUrl }),
      ).unwrap();
      alert('Signup successful!');
      navigate('/');
    } catch (error: any) {
      alert('Signup failed: ' + error.message);
    }
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
