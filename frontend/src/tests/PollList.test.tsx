import { configureStore, Store } from '@reduxjs/toolkit';
import pollReducer, {
  fetchPolls,
  addNewPoll,
  PollsState,
  initialState,
} from '../features/pollSlice';
import * as api from '../server/api';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store/store';
import { Action } from 'redux';

jest.mock('../server/api');

type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action>;

const mockStore = (state: PollsState) =>
  configureStore({
    reducer: {
      poll: pollReducer,
    },
    preloadedState: {
      poll: state,
    },
  });

describe('pollSlice', () => {
  let store: Store<RootState, Action> & { dispatch: AppThunkDispatch };

  beforeEach(() => {
    store = mockStore(initialState) as Store<RootState, Action> & {
      dispatch: AppThunkDispatch;
    };
    jest.clearAllMocks();
  });

  it('should handle initial state', () => {
    expect(store.getState().poll).toEqual(initialState);
  });

  it('should handle fetchPolls', async () => {
    const polls = [
      { id: '1', optionOne: 'Option 1', optionTwo: 'Option 2', votes: [] },
    ];
    (api.fetchPolls as jest.Mock).mockResolvedValue({ polls });

    await store.dispatch(fetchPolls());

    const state = store.getState().poll;
    expect(state.polls['1']).toEqual(polls[0]);
    expect(state.status).toEqual('succeeded');
    expect(state.error).toBeUndefined();
  });

  it('should handle addNewPoll', async () => {
    const newPoll = {
      id: '2',
      optionOne: 'Option 1',
      optionTwo: 'Option 2',
      userId: '1',
      votes: [],
    };
    (api.createPoll as jest.Mock).mockResolvedValue(newPoll);

    await store.dispatch(addNewPoll(newPoll));

    const state = store.getState().poll;
    expect(state.polls['2']).toEqual(newPoll);
    expect(state.status).toEqual('succeeded');
    expect(state.error).toBeUndefined();
  });

  // Add more tests for voteOnPoll
});
