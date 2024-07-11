import { fetchUsers } from '../features/usersSlice';
import { store } from '../store/store';
import * as mockApi from '../tests/mocks/api';

const testUsers = [
  {
    id: '566965a3-de5e-405f-8c1d-eff13c066de4',
    username: 'testuser2',
    name: 'Test User',
    avatar_url: null,
    pollsCreated: 0,
    pollsVotedOn: 0,
  },
];

describe('fetchUsers thunk', () => {
  beforeEach(() => {
    mockApi.fetchUsers.mockResolvedValue(testUsers);
  });

  it('should dispatch users/fetchUsers/fulfilled on successful fetch', async () => {
    await store.dispatch(fetchUsers());
    const state = store.getState();
    console.log(state.users);
    expect(state.users.users).toHaveLength(1);
    expect(state.users.users[0].name).toEqual('Test User');
    expect(state.users.status).toEqual('succeeded');
  });

  it('should handle exceptions when fetching users fails', async () => {
    mockApi.fetchUsers.mockRejectedValue(new Error('Failed to fetch'));

    await store.dispatch(fetchUsers());
    const state = store.getState();

    expect(state.users.error).toBe('Failed to fetch');
  });
});
