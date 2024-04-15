import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import pollReducer from '../features/pollSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    poll: pollReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
