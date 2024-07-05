import { render, fireEvent, screen } from '@testing-library/react';
import Home from '../components/Home';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('Home Page', () => {
  it('shows welcome message when authenticated', async () => {
    const store = mockStore({
      users: {
        currentUser: {
          id: '123',
          name: 'User',
          username: 'User',
          pollsCreated: 1,
          pollsVotedOn: 0,
        },
        users: [],
        status: 'succeeded',
        error: null,
      },
      poll: {
        polls: [
          {
            id: '1',
            optionOne: 'Question 1',
            optionTwo: 'Question 2',
            votes: [],
          },
        ],
        status: 'succeeded',
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );
    expect(await screen.findByText('Welcome, User!')).toBeInTheDocument();
    expect(await screen.findByText('Show Answered Polls')).toBeInTheDocument();
  });

  it('toggles between answered and unanswered polls', async () => {
    const store = mockStore({
      users: {
        currentUser: { id: '123', name: 'User' },
        users: [],
        status: 'succeeded',
        error: null,
      },
      poll: {
        polls: [
          {
            id: '1',
            title: 'Answered Poll Title',
            votes: [{ userId: '123', chosenOption: 1 }],
          }, //userId matches currentUser
          { id: '2', title: 'Unanswered Poll Title', votes: [] },
        ],
        status: 'succeeded',
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    fireEvent.click(screen.getByText('Show Answered Polls'));

    // Validate change in displayed polls
    expect(screen.queryByText('Show Answered Polls')).not.toBeInTheDocument();
    expect(screen.getByText('Show Unanswered Polls')).toBeInTheDocument();
  });
});
