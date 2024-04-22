import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { store } from '../app/store'; // Adjust the path as necessary
import theme from '../theme'; // Adjust the path as necessary
import PollDetails from '../components/PollDetails';

describe('PollDetail', () => {
  test('renders correctly and matches snapshot', () => {
    // Mock useParams to return a specific pollId, if your component uses it
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({
        pollId: 'mockPoloxhs1bqm25b708cmbf3gllId',
      }),
      useNavigate: () => jest.fn(),
    }));

    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <PollDetails />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>,
    );

    expect(screen).toMatchSnapshot();
  });
});
