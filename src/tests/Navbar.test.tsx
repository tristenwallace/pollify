import React, { ReactElement } from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { configureStore, Store } from '@reduxjs/toolkit';
import userReducer, { UsersState } from '../features/usersSlice';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

// Define interfaces for the test utilities
interface CustomRenderOptions {
  initialState?: { users: UsersState };
  store?: Store;
}

// Adjusted initialState in test cases to match exact status types
const initialStateAuthenticated: { users: UsersState } = {
  users: {
    isAuthenticated: true,
    currentUser: {
      id: 'sarahedo',
      password: 'password123',
      name: 'Sarah Edo',
      avatarURL: null,
      answers: {
        '8xf0y6ziyjabvozdd253nd': 'optionOne',
        '6ni6ok3ym7mf1p33lnez': 'optionOne',
        am8ehyc8byjqgar0jgpub9: 'optionTwo',
        loxhs1bqm25b708cmbf3g: 'optionTwo',
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
    },
    users: {},
    status: 'succeeded', // Ensure this matches exactly to the type definitions
    error: undefined,
  },
};

const initialStateNotAuthenticated: { users: UsersState } = {
  users: {
    isAuthenticated: false,
    currentUser: null,
    users: {},
    status: 'idle', // Ensure this matches exactly to the type definitions
    error: undefined,
  },
};

// Create a custom render function that includes all providers
const customRender = (
  ui: ReactElement,
  {
    initialState,
    store = configureStore({
      reducer: { users: userReducer },
      preloadedState: initialState,
    }),
  }: CustomRenderOptions = {},
): RenderResult =>
  render(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </Router>
    </Provider>,
  );

describe('Navbar Component', () => {
  it('should display all expected links', () => {
    customRender(<Navbar />);
    expect(screen.getByText(/home/i)).toHaveAttribute('href', '/');
    expect(screen.getByText(/create poll/i)).toHaveAttribute('href', '/create');
    expect(screen.getByText(/leaderboard/i)).toHaveAttribute(
      'href',
      '/leaderboard',
    );
  });

  it('should display the logout button when user is authenticated', () => {
    customRender(<Navbar />, { initialState: initialStateAuthenticated });
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('should not display the logout button when user is not authenticated', () => {
    customRender(<Navbar />, { initialState: initialStateNotAuthenticated });
    expect(screen.queryByText(/logout/i)).toBeNull();
  });
});
