import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {
  fetchPolls as fetchPollsApi,
  createPoll as createPollApi,
  voteOnPoll as voteOnPollApi,
} from '../server/api';

// Define interfaces to standardize the structure of data used within the slice.
interface MyThunkAPI {
  state: RootState;
  rejectValue: string;
}

interface vote {
  userId: string;
  chosenOption: number;
}

export interface Poll {
  id: string;
  userId: string;
  optionOne: string;
  optionTwo: string;
  votes: vote[];
}

export interface PollsState {
  polls: Record<string, Poll>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

// Initial state setup for the polling feature.
const initialState: PollsState = {
  polls: {},
  status: 'idle',
  error: undefined,
};

// Async thunk for fetching polls
export const fetchPolls = createAsyncThunk<Poll[], void, { state: RootState }>(
  'poll/fetchPolls',
  async () => {
    try {
      const polls = await fetchPollsApi();
      return polls;
    } catch (error) {
      console.error('Failed to fetch polls:', error);
      throw error;
    }
  },
);

// Async thunk for adding a new poll
export const addNewPoll = createAsyncThunk<
  Poll,
  { optionOne: string; optionTwo: string; userId: string },
  MyThunkAPI
>(
  'poll/addNewPoll',
  async (pollData: {
    optionOne: string;
    optionTwo: string;
    userId: string;
  }) => {
    try {
      const newPoll = await createPollApi({
        optionOne: pollData.optionOne,
        optionTwo: pollData.optionTwo,
        userId: pollData.userId,
      });
      return newPoll;
    } catch (error) {
      console.error('Error saving poll', error);
      if (error instanceof Error) {
        throw new Error('Failed to save the poll: ' + error.message);
      } else {
        // If it's not an Error instance, handle it appropriately
        throw new Error('Failed to save the poll due to an unknown error');
      }
    }
  },
);

// Async thunk for voting on a poll. Ensures users can't vote more than once per poll.
export const voteOnPoll = createAsyncThunk<
  {
    pollId: string;
    chosenOption: number;
    userId: string;
  },
  {
    pollId: string;
    chosenOption: number;
    userId: string;
  },
  MyThunkAPI
>(
  'poll/voteOnPoll',
  async (
    {
      pollId,
      chosenOption,
      userId,
    }: {
      pollId: string;
      chosenOption: number;
      userId: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const vote = await voteOnPollApi(pollId, userId, chosenOption);
      console.log('vote saved successfully');
      return vote;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(
          'Failed to save the vote due to an unknown error',
        );
      }
    }
  },
);

// Slice configuration including reducers and extraReducers for handling async actions.
const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPolls.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (Array.isArray(action.payload)) {
          action.payload.forEach(poll => {
            state.polls[poll.id] = poll;
          });
        } else {
          console.error(
            'Expected an array of polls, but received:',
            action.payload,
          );
        }
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPoll.pending, state => {
        state.status = 'loading';
      })
      .addCase(addNewPoll.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.polls[action.payload.id] = action.payload;
        }
      })
      .addCase(addNewPoll.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(voteOnPoll.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          const { pollId, chosenOption, userId } = action.payload;
          // Update the specific poll with new vote
          const pollToUpdate = state.polls[pollId];
          if (pollToUpdate && chosenOption) {
            pollToUpdate.votes.push({
              userId: userId,
              chosenOption: chosenOption,
            }); // Add the user's vote
          }
        }
      })
      .addCase(voteOnPoll.rejected, (state, action) => {
        console.error('Failed to vote:', action.payload);
        state.status = 'failed';
      });
  },
});

export const selectAllPolls = (state: RootState) => state.poll.polls;
export default pollSlice.reducer;
