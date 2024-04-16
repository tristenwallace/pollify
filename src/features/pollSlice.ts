import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { _getQuestions } from '../server/_DATA';

interface PollOption {
  votes: string[];
  text: string;
}

export interface Poll {
  id: string;
  author: string;
  question: string;
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
  option: keyof Poll; // Ensures option is only "optionOne" or "optionTwo"
  userId: string;
};

const initialState: PollsState = {
  polls: {},
  status: 'idle',
  error: undefined,
};

export const fetchPolls = createAsyncThunk('poll/fetchPolls', async () => {
  try {
    const response = await _getQuestions(); // Ensure this is calling the correct function and returning data
    return response;
  } catch (error) {
    console.error('Failed to fetch polls:', error);
    throw error;
  }
});

function isValidOptionKey(key: string): key is 'optionOne' | 'optionTwo' {
  return key === 'optionOne' || key === 'optionTwo';
}

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    addPoll: (state, action: PayloadAction<Poll>) => {
      const poll = action.payload;
      state.polls[poll.id] = poll;
    },
    voteOnPoll: (state, action: PayloadAction<VoteActionPayload>) => {
      const { pollId, option, userId } = action.payload;
      const poll = state.polls[pollId];

      const hasVoted =
        poll.optionOne.votes.includes(userId) ||
        poll.optionTwo.votes.includes(userId);

      if (isValidOptionKey(option) && !hasVoted) {
        const voteOption = poll[option];
        if (!voteOption.votes.includes(userId)) {
          voteOption.votes.push(userId);
        }
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
        state.polls = action.payload; // Assuming the payload is an object with poll IDs as keys
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPoll, voteOnPoll } = pollSlice.actions;

export const selectAllPolls = (state: RootState) => state.poll.polls;

export default pollSlice.reducer;
