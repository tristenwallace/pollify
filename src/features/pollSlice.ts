import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface Poll {
  id: string;
  question: string;
  options: { optionOne: string; optionTwo: string };
  answers: Record<string, string>; // userId -> answer
}

interface PollState {
  polls: Record<string, Poll>;
}

const initialState: PollState = {
  polls: {},
};

export const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    addPoll: (state, action) => {
      const poll = action.payload;
      state.polls[poll.id] = poll;
    },
    answerPoll: (state, action) => {
      const { userId, pollId, answer } = action.payload;
      state.polls[pollId].answers[userId] = answer;
    },
  },
});

export const { addPoll, answerPoll } = pollSlice.actions;

export const selectPolls = (state: RootState) => state.poll.polls;

export default pollSlice.reducer;
