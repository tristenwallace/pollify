import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';
import configureStore from 'redux-mock-store';
import { initialState } from '../features/usersSlice';

const mockStore = configureStore();

describe('Navbar Component', () => {
  it('should display logout link when user is authenticated', () => {
    const store = mockStore({
      users: { ...initialState, currentUser: { id: '123', name: 'User' } },
    });
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>,
    );

    const createPollLinks = screen.getAllByText('Create Poll');
    expect(createPollLinks.length).toBeGreaterThan(0); // Check if there's at least one
    createPollLinks.forEach(link => {
      expect(link).toBeInTheDocument();
    });
    const createLeaderboardLinks = screen.getAllByText('Leaderboard');
    expect(createLeaderboardLinks.length).toBeGreaterThan(0); // Check if there's at least one
    createPollLinks.forEach(link => {
      expect(link).toBeInTheDocument();
    });
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).toBeNull();
  });
  it('should display login and signup links when user is not authenticated', () => {
    const store = mockStore({ users: { ...initialState, currentUser: null } });
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Login/Signup')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).toBeNull();
  });
});
