import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { validateUser, _getUsers } from '../server/_DATA';
import { RootState } from '../app/store';

interface User {
  id: string;
  password: string;
  name: string;
  avatarURL: string | null;
  answers: Record<string, string>;
  questions: string[];
}

interface UsersState {
  users: Record<string, User>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isAuthenticated: boolean;
  currentUser: User | null;
  error: string | undefined;
}

const initialState: UsersState = {
  users: {},
  status: 'idle',
  isAuthenticated: false,
  currentUser: null,
  error: undefined,
};

export const fetchUsers = createAsyncThunk<User[], void, { state: RootState }>(
  'user/fetchUsers',
  async () => {
    try {
      const response = await _getUsers();
      return Object.values(response);
    } catch (error) {
      console.error('Failed to fetch polls:', error);
      throw error;
    }
  },
);

export const loginUser = createAsyncThunk<
  User,
  { username: string; password: string },
  { rejectValue: string }
>(
  'user/login',
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const user = await validateUser(username, password);
      return user; // Assuming validateUser returns user object on success
    } catch (error) {
      console.error('Error logging user', error);
      if (error instanceof Error) {
        rejectWithValue('Failed to login user: ' + error.message);
      } else {
        // If it's not an Error instance, handle it appropriately
        rejectWithValue('Failed to login user due to an unknown error');
      }
    }
  },
);

export const selectUsersForLeaderboard = (state: RootState): User[] => {
  return Object.values(state.users.users).sort(
    (a, b) =>
      b.questions.length +
      Object.keys(b.answers).length -
      (a.questions.length + Object.keys(a.answers).length),
  );
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload;
        state.error = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        action.payload.forEach(user => {
          state.users[user.id] = user;
        });
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
