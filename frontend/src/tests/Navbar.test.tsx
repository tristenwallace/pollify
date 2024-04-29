import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { store } from '../app/store';

describe('Navbar', () => {
  it('renders navigation links and conditional login/logout', () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>,
    );
    // Check for presence of links
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Poll/i)).toBeInTheDocument();
    expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();

    // Assuming the store's initial state has no user logged in
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
