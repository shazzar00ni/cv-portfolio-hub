
import { vi } from 'vitest';

// Mock console methods to avoid noisy test output
vi.spyOn(console, 'error').mockImplementation(() => {});
vi.spyOn(console, 'warn').mockImplementation(() => {});

// Reset mocks after each test
vi.afterEach(() => {
  vi.clearAllMocks();
});
