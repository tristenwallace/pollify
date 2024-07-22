import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CreatePollForm from '../components/CreatePollForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

const mockStore = configureStore();

describe('CreatePollForm', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      users: {
        currentUser: {
          id: '123',
          name: 'User',
          username: 'User',
          pollCount: 1,
          voteCount: 0,
        },
        users: [],
        status: 'succeeded',
        error: undefined,
      },
      poll: {
        polls: {},
        status: 'idle',
        error: undefined,
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders form inputs', async () => {
    render(
      <Provider store={store}>
        <Router>
          <CreatePollForm />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText(/Option One/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Option Two/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Poll/i)).toBeInTheDocument();
  });
});
