import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/usersSlice';
import { AppDispatch, RootState } from '../app/store';

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.users.isAuthenticated,
  );

  const handleLogout = () => {
    dispatch(logout());
    // Optionally redirect the user to the login page
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/create">Create Poll</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      {isAuthenticated && (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
