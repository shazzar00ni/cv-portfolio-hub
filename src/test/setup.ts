
import { vi } from 'vitest';
import { setupFetchMock } from 'vi-fetch';

// Setup fetch mocking
setupFetchMock({
  enableMocks: true,
  // Don't throw on unmocked requests
  throwOnUnmocked: false,
});

// Mock console methods to avoid noisy test output
vi.spyOn(console, 'error').mockImplementation(() => {});
vi.spyOn(console, 'warn').mockImplementation(() => {});

// Reset mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});
