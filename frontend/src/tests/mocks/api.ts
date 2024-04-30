// Mock functions for registerUser, loginUser, etc.
export const registerUser = jest.fn(
  async (
    username: string,
    password: string,
    name: string,
    avatar_url?: string,
  ) => {
    return Promise.resolve({
      message: 'User created successfully',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNTY2OTY1YTMtZGU1ZS00MDVmLThjMWQtZWZmMTNjMDY2ZGU0IiwidXNlcm5hbWUiOiJ0ZXN0dXNlcjIiLCJuYW1lIjoiVGVzdCBVc2VyIiwiYXZhdGFyX3VybCI6bnVsbCwicG9sbHNDcmVhdGVkIjoyLCJwb2xsc1ZvdGVkT24iOjB9LCJpYXQiOjE3MTQ0NDQzNDcsImV4cCI6MTcxNDQ0Nzk0N30.TcqQM9cMMzrNHeIqRbBAbrvbUfmyDULJReurGuC_kMM',
    });
  },
);

export const loginUser = jest.fn(async (username: string, password: string) => {
  return Promise.resolve({
    message: 'User logged in successfully',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNTY2OTY1YTMtZGU1ZS00MDVmLThjMWQtZWZmMTNjMDY2ZGU0IiwidXNlcm5hbWUiOiJ0ZXN0dXNlcjIiLCJuYW1lIjoiVGVzdCBVc2VyIiwiYXZhdGFyX3VybCI6bnVsbCwicG9sbHNDcmVhdGVkIjoyLCJwb2xsc1ZvdGVkT24iOjB9LCJpYXQiOjE3MTQ0NDQzNDcsImV4cCI6MTcxNDQ0Nzk0N30.TcqQM9cMMzrNHeIqRbBAbrvbUfmyDULJReurGuC_kMM',
  });
});

export const fetchUsers = jest.fn(async () => {
  return Promise.resolve([
    {
      id: '566965a3-de5e-405f-8c1d-eff13c066de4',
      username: 'testuser2',
      name: 'Test User',
    },
  ]);
});

export const fetchPolls = jest.fn(async () => {
  return Promise.resolve([
    {
      id: '444438d5-0245-4e1b-a22e-030b2259dfb2',
      optionOne: 'Question 1',
      optionTwo: 'Question 2',
    },
  ]);
});

export const createPoll = jest.fn(async (pollData: any) => {
  return Promise.resolve({
    id: '3bbf2e94-347c-413e-a6a6-4d8a5742e39f',
    ...pollData,
  });
});

export const voteOnPoll = jest.fn(
  async (pollId: string, userId: string, chosenOption: number) => {
    return Promise.resolve({ pollId, userId, chosenOption });
  },
);

// Create a basic structure of the Axios instance to mimic the actual api.ts
export const api = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: {
      use: jest.fn(),
      eject: jest.fn(),
    },
    response: {
      use: jest.fn((onFulfilled, onRejected) => {
        api.onFulfilled = onFulfilled;
        api.onRejected = onRejected;
      }),
      eject: jest.fn(),
    },
  },
  onFulfilled: null, // These will hold the actual interceptor logic during tests
  onRejected: null,
};
