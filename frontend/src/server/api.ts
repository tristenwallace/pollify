import axios, { AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

//--------------------------------------//
//-------- AXIOS & JWT SETUP -----------//
//--------------------------------------//

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to store the JWT token in local storage
function storeToken(token: string): void {
  localStorage.setItem('jwtToken', token);
}

// Function to get the JWT token from local storage
function getToken(): string | null {
  return localStorage.getItem('jwtToken');
}

// Function to clear the JWT token from local storage
function clearToken(): void {
  localStorage.removeItem('jwtToken');
}

// Add a request interceptor to inject the token into headers before sending them
api.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    // Directly return the response if everything is fine
    return response;
  },
  (error: AxiosError) => {
    // Check if it's an error response and if it has a status code
    if (error.response) {
      switch (error.response.status) {
        case 401: // Unauthorized or token expired
          // Token refresh logic could be initiated here if you implement token refreshing
          // For simplicity, just clear the token and redirect to login
          clearToken();
          // Optionally redirect to login or emit a global event that your application can handle to force logout
          window.location.href = '/login';
          break;
        case 403: // Forbidden - the user might not have the necessary permissions
          alert('You do not have permission to perform this action.');
          break;
        case 404: // Not found - the requested resource is not available
          alert('Requested resource not found.');
          break;
        case 500: // Internal Server Error
          alert('A server error occurred. Please try again later.');
          break;
        default:
          // Handle other status codes or generic response errors
          alert(`An unexpected error occurred: ${error.response.status}`);
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error: No response received', error.request);
      alert('No response from server. Please check your network connection.');
    } else {
      // Something happened in setting up the request and triggered an error
      console.error('Error setting up request:', error.message);
      alert('Error in setting up the request.');
    }

    // Always reject the promise if the error config does not request otherwise
    return Promise.reject(error);
  },
);

//----------------------------------//
//-------- API FUNCTIONS -----------//
//----------------------------------//

export const registerUser = async (
  username: string,
  password: string,
  name: string,
  avatar_url?: string,
) => {
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

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await api.post('/user/login', {
      username,
      password,
    });
    storeToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get('/user/all');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const fetchPolls = async () => {
  try {
    const response = await api.get('/polls');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch polls:', error);
    throw error;
  }
};

export const createPoll = async (pollData: {
  optionOne: string;
  optionTwo: string;
  userId: string;
}) => {
  try {
    const response = await api.post('/polls', pollData);
    return response.data;
  } catch (error) {
    console.error('Failed to create poll:', error);
    throw error;
  }
};

export const voteOnPoll = async (
  pollId: string,
  userId: string,
  chosenOption: number,
) => {
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
