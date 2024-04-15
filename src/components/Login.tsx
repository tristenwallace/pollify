import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username) {
      dispatch(login(username));
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
