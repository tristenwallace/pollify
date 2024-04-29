import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Leaderboard from '../components/Leaderboard';
import { store } from '../app/store';

describe('Leaderboard', () => {
  it('renders users sorted by activity', () => {
    store.dispatch({
      type: 'user/fetchUsers/fulfilled',
      payload: [
        {
          id: '1',
          name: 'User One',
          avatar_url: null,
          voteCount: 10,
          pollCount: 5,
        },
      ],
    });

    render(
      <Provider store={store}>
        <Router>
          <Leaderboard />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/User One/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Questions Asked: 5 - Answers Given: 10/i),
    ).toBeInTheDocument();
  });
});
