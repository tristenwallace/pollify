import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/usersSlice';
import { AppDispatch, RootState } from '../app/store';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => {
    return Object.values(state.users.users).sort(
      (a, b) =>
        b.questions.length +
        Object.keys(b.answers).length -
        (a.questions.length + Object.keys(a.answers).length),
    );
  });
  const userStatus = useSelector((state: RootState) => state.users.status); // Assuming you have a status in your users state
  const userError = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    if (userStatus === 'idle') {
      // Check if the users have not been fetched yet
      dispatch(fetchUsers());
    }
  }, [dispatch, userStatus]);

  if (userStatus === 'loading') {
    return <p>Loading...</p>;
  }

  if (userError) {
    return <p>Error loading users: {userError}</p>;
  }

  if (!users.length) {
    return <p>No users to display.</p>;
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      <Link to="/">Back to Home</Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <img
              src={user.avatarURL || '/default-avatar.png'}
              alt={`${user.name}'s avatar`}
              style={{ width: 50, height: 50 }}
            />
            <h3>{user.name}</h3>
            <p>Questions Asked: {user.questions.length}</p>
            <p>Answers Given: {Object.keys(user.answers).length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
