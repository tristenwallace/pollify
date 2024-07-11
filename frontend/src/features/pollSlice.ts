import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import * as api from '../server/api';

// Interfaces for data structures
interface MyThunkAPI {
  state: RootState;
  rejectValue: string;
}

interface Vote {
  userId: string;
  chosenOption: number;
}

export interface Poll {
  id: string;
  userId: string | null;
  optionOne: string;
  optionTwo: string;
  votes: Vote[];
}

export interface PollsState {
  polls: Record<string, Poll>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

// Initial state for polls
const initialState: PollsState = {
  polls: {},
  status: 'idle',
  error: undefined,
};

// Async thunk for fetching polls
export const fetchPolls = createAsyncThunk<Poll[], void, MyThunkAPI>(
  'poll/fetchPolls',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.fetchPolls();
      return response.polls;
    } catch (error) {
      console.error('Failed to fetch polls:', error);
      return rejectWithValue('Failed to fetch polls');
    }
  },
);

// Async thunk for adding a new poll
export const addNewPoll = createAsyncThunk<
  Poll,
  { optionOne: string; optionTwo: string; userId: string },
  MyThunkAPI
>('poll/addNewPoll', async (pollData, { rejectWithValue }) => {
  try {
    const newPoll = await api.createPoll(pollData);
    return newPoll;
  } catch (error) {
    console.error('Error saving poll', error);
    return rejectWithValue('Failed to save the poll');
  }
});

// Async thunk for voting on a poll
export const voteOnPoll = createAsyncThunk<
  { pollId: string; chosenOption: number; userId: string },
  { pollId: string; chosenOption: number; userId: string },
  MyThunkAPI
>('poll/voteOnPoll', async (voteData, { rejectWithValue }) => {
  try {
    const response = await api.voteOnPoll(
      voteData.pollId,
      voteData.userId,
      voteData.chosenOption,
    );
    return response.vote;
  } catch (error) {
    console.error('Failed to save vote', error);
    return rejectWithValue('Failed to save the vote');
  }
});

// Polls slice configuration
const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle fetchPolls lifecycle
      .addCase(fetchPolls.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.status = 'succeeded';
        action.payload.forEach(poll => {
          state.polls[poll.id] = poll;
        });
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle addNewPoll lifecycle
      .addCase(addNewPoll.pending, state => {
        state.status = 'loading';
      })
      .addCase(addNewPoll.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.polls[action.payload.id] = { ...action.payload, votes: [] };
      })
      .addCase(addNewPoll.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Handle voteOnPoll lifecycle
      .addCase(voteOnPoll.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { pollId, chosenOption, userId } = action.payload;
        const poll = state.polls[pollId];
        if (poll) {
          poll.votes.push({ userId, chosenOption });
        }
      })
      .addCase(voteOnPoll.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Selector to get all polls from the state
export const selectAllPolls = (state: RootState) => state.poll.polls;

// Export the reducer
export default pollSlice.reducer;
