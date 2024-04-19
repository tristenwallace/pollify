import { configureStore, Store, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import userReducer, { UsersState } from '../features/usersSlice';
import pollReducer, { PollsState } from '../features/pollSlice';
import { RootState } from '../app/store';
import Leaderboard from '../components/Leaderboard';

// Define the full root state type if it's not already defined elsewhere
type FullRootState = {
  users: UsersState;
  poll: PollsState;
}

const rootReducer = combineReducers({
  users: userReducer,
  poll: pollReducer,
});

// Custom render options type definition
interface CustomRenderOptions {
  initialState?: Partial<FullRootState>;
  store?: Store<FullRootState>;
}

// Prepare initial state with a signed-in user and mock data
const initialStateAuthenticated: RootState = {
  users: {
    isAuthenticated: true,
    currentUser: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      password: 'password123',
      avatarURL: '/path/to/avatar.png',
      answers: {},
      questions: []
    },
    users: {
      'sarahedo': {
        id: 'sarahedo',
        name: 'Sarah Edo',
        password: 'password123',
        avatarURL: '/path/to/avatar.png',
        answers: {},
        questions: []
      }
    },
    status: 'succeeded',
    error: undefined
  },
  poll: {
    polls: {},
    status: 'idle',
    error: undefined
  }
};

// Create a custom render function that includes all providers
const customRender = (
  ui: React.ReactElement,
  { initialState, store }: CustomRenderOptions = {}
) => {
  // Create store only if it's not provided
  store = store || configureStore({
    reducer: rootReducer,
    preloadedState: initialState
  });

  return render(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          {ui}
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

describe('Leaderboard Component', () => {
  it('should display sorted users by activity', async () => {
    customRender(<Leaderboard />, { initialState: initialStateAuthenticated });
    expect(await screen.findByText(/Sarah Edo/)).toBeInTheDocument();
    expect(await screen.findByText(/Questions Asked: 0 - Answers Given: 0/)).toBeInTheDocument();
  });
});
