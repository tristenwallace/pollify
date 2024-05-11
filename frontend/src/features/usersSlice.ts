import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUsers as fetchUsersApi,
  loginUser as loginUserApi,
  registerUser as registerUserApi,
  clearToken
} from '../server/api';
import { jwtDecode } from 'jwt-decode';
import { RootState } from '../app/store';
import { addNewPoll } from './pollSlice';

// Define the user interface for the state
export interface User {
  id: string;
  password?: string;
  name: string;
  avatar_url?: string;
  voteCount?: number;
  pollCount?: number;
}

interface JWTPayload {
  user: User;
  iat: number;
  exp: number;
}

// Define the state structure for the users slice
export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  currentUser: User | null;
  error: string | undefined;
}

// Initial state for the users slice
export const initialState: UsersState = {
  users: [],
  status: 'idle',
  currentUser: null,
  error: undefined,
};

export const fetchCurrentUser = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>('users/fetchCurrentUser', async (token, { rejectWithValue }) => {
  try {
    if (!token) {
      return rejectWithValue('No token provided');
    }
    const decoded = jwtDecode<JWTPayload>(token);
    if (!decoded || !decoded.user) {
      return rejectWithValue('Failed to decode token');
    }
    return decoded.user;
  } catch (error) {
    console.error('Failed to fetch polls:', error);
    throw error;
  }
});

// Asynchronous thunk for fetching users
export const fetchUsers = createAsyncThunk<User[], void, { state: RootState }>(
  'user/fetchUsers',
  async () => {
    try {
      const users = await fetchUsersApi();
      return users;
    } catch (error) {
      console.error('Failed to fetch polls:', error);
      throw error;
    }
  },
);

// Asynchronous thunk for user login
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
      const response = await loginUserApi(username, password);
      const decoded = jwtDecode<JWTPayload>(response.token);
      return decoded.user;
    } catch (error) {
      return rejectWithValue('Invalid username or password');
    }
  },
);

// Asynchronous thunk for registering user
export const registerUser = createAsyncThunk<
  User,
  { username: string; password: string; name: string; avatar_url: string },
  { rejectValue: string }
>(
  'user/register',
  async (
    {
      username,
      password,
      name,
      avatar_url,
    }: { username: string; password: string; name: string; avatar_url: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await registerUserApi(
        username,
        password,
        name,
        avatar_url,
      );
      const decoded = jwtDecode<JWTPayload>(response.token);
      return decoded.user;
    } catch (error) {
      return rejectWithValue('Invalid username or password');
    }
  },
);

// Users slice containing the reducer logic and actions
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: state => {
      state.currentUser = null;
      state.status = 'idle';
      state.error = undefined;
      clearToken();
    },
  },
  extraReducers: builder => {
    builder
      // LOGIN
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = 'succeeded';
        state.error = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.currentUser = null;
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // GET ALL USERS
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // REGISTER NEW USER
      .addCase(registerUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = 'succeeded';
        state.error = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.currentUser = null;
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = 'succeeded';
        state.error = undefined;
      })
      // POLL & VOTE UPDATES
      .addCase(addNewPoll.fulfilled, (state, action) => {
        const userId = action.payload.userId;
        state.users = state.users.map(user => {
          if (user.id === userId) {
            return {...user, pollCount: (user.pollCount || 0) + 1};
          }
          return user;
        });
      });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
