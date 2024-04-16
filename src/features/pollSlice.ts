import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from '../server/_DATA';

interface MyThunkAPI {
  state: RootState;
  rejectValue: string;
}

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

// Correctly defining the type for options
export type PollOptionKey = 'optionOne' | 'optionTwo';

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
export const addNewPoll = createAsyncThunk<
  Poll,
  { optionOneText: string; optionTwoText: string; author: string },
  MyThunkAPI
>(
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

// Thunk for handling voting
export const voteOnPoll = createAsyncThunk<
  {
    pollId: string;
    option: PollOptionKey;
    userId: string;
  },
  {
    pollId: string;
    option: PollOptionKey;
    userId: string;
    existingPoll: Poll;
  },
  MyThunkAPI
>(
  'poll/voteOnPoll',
  async (
    {
      pollId,
      option,
      userId,
      existingPoll,
    }: {
      pollId: string;
      option: PollOptionKey;
      userId: string;
      existingPoll: Poll;
    },
    { rejectWithValue },
  ) => {
    try {
      if (!existingPoll) {
        return rejectWithValue('Poll not found');
      }
      if (existingPoll[option].votes.includes(userId)) {
        return rejectWithValue('User has already voted');
      }
      // Simulating backend operation
      await _saveQuestionAnswer({
        authedUser: userId,
        qid: pollId,
        answer: option,
      });
      fetchPolls();
      console.log('vote saved successfully');
      return { pollId, option, userId };
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
          const { pollId, option, userId } = action.payload;
          // Update the specific poll with new vote
          const pollToUpdate = state.polls[pollId];
          if (pollToUpdate && option) {
            pollToUpdate[option].votes.push(userId); // Add the user's vote
            state.polls[pollId] = { ...pollToUpdate }; // Ensure we create a new object to help with re-rendering in React components
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
