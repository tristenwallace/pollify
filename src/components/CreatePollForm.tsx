import { useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewPoll } from '../features/pollSlice';
import { AppDispatch, RootState } from '../app/store';
import Login from './Login';

const CreatePollForm = () => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const user = useSelector((state: RootState) => state.users.currentUser);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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
    <form onSubmit={handleSubmit}>
      <h1>Create a New Poll</h1>
      <div>
        <label htmlFor="optionOneText">Option One</label>
        <input
          id="optionOneText"
          type="text"
          value={optionOneText}
          onChange={e => setOptionOneText(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="optionTwoText">Option Two</label>
        <input
          id="optionTwoText"
          type="text"
          value={optionTwoText}
          onChange={e => setOptionTwoText(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Poll</button>
    </form>
  );
};

export default CreatePollForm;
