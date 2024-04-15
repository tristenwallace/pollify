import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { validateUser } from '../server/_DATA'; // Import the getUser function

interface UserState {
  isAuthenticated: boolean;
  user: string | null;
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const user = await validateUser(username, password);
      return user.name; // Assuming validateUser returns user object on success
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
