import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login';
import { store } from '../app/store';
import axiosMock from 'axios-mock-adapter';
import axios from 'axios';

const mockAxios = new axiosMock(axios);

// Mocking localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mocking navigation
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    mockAxios.reset();
    mockLocalStorage.clear();
    mockNavigate.mockReset();
  });

  it('allows the user to login successfully and redirects', async () => {
    mockAxios.onPost('/user/login').reply(200, {
      token: 'fake-jwt-token',
    });

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'user' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'pass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await screen.findByText('Logout'); // Assuming that 'Logout' button will be rendered on successful login

    // Check if the token is stored correctly
    expect(localStorage.getItem('jwtToken')).toEqual('fake-jwt-token');

    // Check if navigation was called to redirect user
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
