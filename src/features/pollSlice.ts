import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { _getQuestions, _saveQuestion } from '../server/_DATA';

interface PollOption {
  votes: string[];
  text: string;
}

export interface Poll {
  id: string;
  author: string;
  optionOne: PollOption;
  optionTwo: PollOption;
}

interface PollsState {
  polls: Record<string, Poll>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

type VoteActionPayload = {
  pollId: string;
  option: keyof Poll;
  userId: string;
};

const initialState: PollsState = {
  polls: {},
  status: 'idle',
  error: undefined,
};

// Fetch existing polls
export const fetchPolls = createAsyncThunk<Poll[], void, { state: RootState }>(
  'poll/fetchPolls',
  async () => {
    try {
      const response = await _getQuestions();
      return Object.values(response);
    } catch (error) {
      console.error('Failed to fetch polls:', error);
      throw error;
    }
  },
);

// Add new poll
export const addNewPoll = createAsyncThunk(
  'poll/addNewPoll',
  async (pollData: {
    optionOneText: string;
    optionTwoText: string;
    author: string;
  }) => {
    try {
      const newPoll = await _saveQuestion({
        optionOneText: pollData.optionOneText,
        optionTwoText: pollData.optionTwoText,
        author: pollData.author,
      });
      fetchPolls();
      console.log('Poll saved successfully', newPoll);
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

function isValidOptionKey(key: string): key is 'optionOne' | 'optionTwo' {
  return key === 'optionOne' || key === 'optionTwo';
}

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    voteOnPoll: (state, action: PayloadAction<VoteActionPayload>) => {
      const { pollId, option, userId } = action.payload;
      const poll = state.polls[pollId];
      if (isValidOptionKey(option) && !poll[option].votes.includes(userId)) {
        poll[option].votes.push(userId);
      }
    },
  },
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
      });
  },
});

export const { voteOnPoll } = pollSlice.actions;
export const selectAllPolls = (state: RootState) => state.poll.polls;
export default pollSlice.reducer;
