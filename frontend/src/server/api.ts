import axios, { AxiosError } from 'axios';
import { User } from '../features/usersSlice';

// Base URL for API requests
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create an axios instance with default settings
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store JWT token in local storage
function storeToken(token: string): void {
  localStorage.setItem('jwtToken', token);
}

// Retrieve JWT token from local storage
export function getToken(): string | null {
  return localStorage.getItem('jwtToken');
}

// Remove JWT token from local storage
export function clearToken(): void {
  localStorage.removeItem('jwtToken');
}

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          clearToken();
          window.location.href = '/login';
          break;
        case 403:
          alert('You do not have permission to perform this action.');
          break;
        case 404:
          alert('Requested resource not found.');
          break;
        case 500:
          alert('A server error occurred. Please try again later.');
          break;
        default:
          alert(`An unexpected error occurred: ${error.response.status}`);
          break;
      }
    } else if (error.request) {
      console.error('Error: No response received', error.request);
      alert('No response from server. Please check your network connection.');
    } else {
      console.error('Error setting up request:', error.message);
      alert('Error in setting up the request.');
    }
    return Promise.reject(error);
  },
);

// Register a new user
export const registerUser = async (
  username: string,
  password: string,
  name: string,
  avatar_url?: string,
): Promise<any> => {
  try {
    const response = await api.post('/user/register', {
      username,
      password,
      name,
      avatar_url,
    });
    storeToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
};

// Log in a user
export const loginUser = async (
  username: string,
  password: string,
): Promise<any> => {
  try {
    const response = await api.post('/user/login', { username, password });
    storeToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};

// Update user details
export const updateUser = async (userData: Partial<User>): Promise<any> => {
  try {
    const response = await api.put(`/user/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await api.delete(`/user/${userId}`);
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
};

// Fetch all users
export const fetchUsers = async (): Promise<any> => {
  try {
    const response = await api.get('/user/all');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

// Fetch all polls
export const fetchPolls = async (): Promise<any> => {
  try {
    const response = await api.get('/polls');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch polls:', error);
    throw error;
  }
};

// Create a new poll
export const createPoll = async (pollData: {
  optionOne: string;
  optionTwo: string;
  userId: string;
}): Promise<any> => {
  try {
    const response = await api.post('/polls', pollData);
    return response.data;
  } catch (error) {
    console.error('Failed to create poll:', error);
    throw error;
  }
};

// Vote on a poll
export const voteOnPoll = async (
  pollId: string,
  userId: string,
  chosenOption: number,
): Promise<any> => {
  try {
    const response = await api.post(`/polls/${pollId}/vote`, {
      userId,
      chosenOption,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to vote on poll:', error);
    throw error;
  }
};
