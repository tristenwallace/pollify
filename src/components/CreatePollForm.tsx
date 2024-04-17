import { useState, useEffect, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewPoll } from '../features/pollSlice';
import { AppDispatch, RootState } from '../app/store';
import { fetchUsers } from '../features/usersSlice';
import Login from './Login';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from '@mui/material';

const CreatePollForm = () => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const user = useSelector((state: RootState) => state.users.currentUser);
  const userStatus = useSelector((state: RootState) => state.users.status);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userStatus === 'idle') {
      // Check if the users have not been fetched yet
      dispatch(fetchUsers());
    }
  }, [dispatch, userStatus]);

  if (!user) {
    return (
      <div>
        <h3>Please log in to see the polls.</h3>
        <Login />
      </div>
    ); // Or handle this case appropriately
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addNewPoll({
        optionOneText: optionOneText,
        optionTwoText: optionTwoText,
        author: user.id,
      }),
    );
    navigate('/'); // Navigate to home after submitting the form
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Create a New Poll
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="optionOneText"
            label="Option One"
            variant="outlined"
            value={optionOneText}
            onChange={e => setOptionOneText(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="optionTwoText"
            label="Option Two"
            variant="outlined"
            value={optionTwoText}
            onChange={e => setOptionTwoText(e.target.value)}
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
      </CardContent>
    </Card>
  );
};

export default CreatePollForm;
