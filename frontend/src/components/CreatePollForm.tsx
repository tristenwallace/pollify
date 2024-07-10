import { useState, useEffect, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewPoll } from '../features/pollSlice';
import { AppDispatch, RootState } from '../store/store';
import { fetchUsers } from '../features/usersSlice';
import Login from './Authentication/LoginForm';
import { Paper, TextField, Button, Typography, Container } from '@mui/material';

const CreatePollForm = () => {
  // Local state to manage form inputs
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');

  // Accessing Redux state and dispatch
  const user = useSelector((state: RootState) => state.users.currentUser);
  const userStatus = useSelector((state: RootState) => state.users.status);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch users on component mount if not already loaded
  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, userStatus]);

  // Guard to check if user is logged in before showing form
  if (!user) {
    return (
      <div>
        <h3>Please log in to see the polls.</h3>
        <Login />
      </div>
    );
  }

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addNewPoll({
        optionOne: optionOne,
        optionTwo: optionTwo,
        userId: user.id,
      }),
    )
      .unwrap()
      .then(() => {
        navigate('/'); // Redirect to home page after form submission
      })
      .catch(error => {
        console.error('Failed to create poll', error);
      });
  };

  // Render form for creating a new poll
  return (
    <Container>
      <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', mt: 10, p: 5 }}>
        <Typography variant="h4" gutterBottom>
          Create a New Poll
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="optionOneText"
            label="Option One"
            variant="outlined"
            value={optionOne}
            onChange={e => setOptionOne(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="optionTwoText"
            label="Option Two"
            variant="outlined"
            value={optionTwo}
            onChange={e => setOptionTwo(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Create Poll
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePollForm;
