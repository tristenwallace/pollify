import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Leaderboard from '../components/Leaderboard';
import { store } from '../app/store';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

describe('Leaderboard Component', () => {
  // Function to perform the common setup
  const setup = () =>
    render(
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <Leaderboard />
          </ThemeProvider>
        </Router>
      </Provider>,
    );

  it('should display sorted users by activity', async () => {
    setup();

    // Use findByText to wait for the element to appear
    const userName = await screen.findByText(/Sarah Edo/i); // Example user
    expect(userName).toBeInTheDocument();

    // Assuming these details are also loaded asynchronously
    const statsCount = await screen.findByText(
      /Questions Asked: 2 - Answers Given: 4/i,
    ); // Detail for questions
    expect(statsCount).toBeInTheDocument();
  });
});
