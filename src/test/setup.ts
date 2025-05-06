
import { vi, afterEach } from 'vitest';
import '@testing-library/jest-dom';

// Mock console methods to avoid noisy test output
vi.spyOn(console, 'error').mockImplementation(() => {});
vi.spyOn(console, 'warn').mockImplementation(() => {});

// Reset mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});
