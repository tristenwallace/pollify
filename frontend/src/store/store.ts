import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import pollReducer from '../features/pollSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    poll: pollReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
