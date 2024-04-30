import '@testing-library/jest-dom';
import * as mockApi from './tests/mocks/api';
import { LocalStorageMock } from './tests/mocks/LocalStorageMock';

// Global mocking of the API module
jest.mock('./server/api', () => ({
  ...mockApi,
}));

const localStorageMock = new LocalStorageMock();

beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();

  // Reset localStorage
  localStorageMock.clear();
});

// Use this instance to override the global localStorage in your tests
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});
