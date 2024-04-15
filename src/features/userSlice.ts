import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface UserState {
  value: {
    isAuthenticated: boolean;
    user: string | null;
  };
}

const initialState: UserState = {
  value: {
    isAuthenticated: false,
    user: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.value.isAuthenticated = true;
      state.value.user = action.payload;
    },
    logout: state => {
      state.value.isAuthenticated = false;
      state.value.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
