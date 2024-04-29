import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import PollDetails from '../components/PollDetails';
import { store } from '../app/store';

describe('PollDetails', () => {
  it('displays the poll details', () => {
    const pollId = '123';
    store.dispatch({
      type: 'poll/fetchPolls/fulfilled',
      payload: [
        {
          id: pollId,
          userId: 'user1',
          optionOne: 'Option 1',
          optionTwo: 'Option 2',
          votes: [],
        },
      ],
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/questions/${pollId}`]}>
          <Route path="/questions/:pollId">
            <PollDetails />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Option 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Option 2/i)).toBeInTheDocument();
  });
});
