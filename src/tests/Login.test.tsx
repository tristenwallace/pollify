import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme'; // Adjust the import path as necessary
import Login from '../components/Login';
import { store } from '../app/store'; // Adjust the import path as necessary

describe('Login Component', () => {
  // Function to perform the common setup
  const setup = () =>
    render(
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <Login />
          </ThemeProvider>
        </Router>
      </Provider>,
    );

  it('should display username and password inputs and a submit button', () => {
    setup();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should display an error message when incorrect credentials are used', async () => {
    setup();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'wrongusername' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Adjust the expectation according to how you handle errors
    expect(
      await screen.findByText(/invalid username or password/i),
    ).toBeInTheDocument();
  });
});
