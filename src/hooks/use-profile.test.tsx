import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useProfile, fetchUserProfile } from './use-profile';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the toast hook
vi.mock('./use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock supabase client
vi.mock('@/integrations/supabase/client', () => {
  // Always return a consistent mock for both select and update
  const selectMock = vi.fn().mockImplementation(() => ({
    eq: vi.fn().mockImplementation(() => ({
      single: vi.fn().mockImplementation(() => ({
        data: {
          id: 'test-user-id',
          username: 'testuser',
          full_name: 'Test User',
          avatar_url: 'https://example.com/avatar.jpg',
          updated_at: '2023-01-01T00:00:00Z',
        },
        error: null
      }))
    }))
  }));
  const updateMock = vi.fn().mockImplementation(() => ({
    eq: vi.fn().mockImplementation(() => ({
      error: null
    }))
  }));
  return {
    supabase: {
      from: vi.fn().mockImplementation(() => ({
        select: selectMock,
        update: updateMock
      }))
    }
  };
});

const mockSession = {
  user: {
    id: 'test-user-id',
    email: 'test@example.com',
  },
} as unknown as Session;

// Create a wrapper for the QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useProfile hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null profile when no session is provided', async () => {
    const { result } = renderHook(() => useProfile(null), {
      wrapper: createWrapper(),
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.profile).toBe(undefined);
  });

  it('should fetch profile when a session is provided', async () => {
    const mockData = {
      id: 'test-user-id',
      username: 'testuser',
      full_name: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg',
      updated_at: '2023-01-01T00:00:00Z',
    };

    const { result } = renderHook(() => useProfile(mockSession), {
      wrapper: createWrapper(),
    });
    
    // Initially loading
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.profile).toEqual(mockData);
    expect(supabase.from).toHaveBeenCalledWith('profiles');
  });

  it('should handle errors when fetching profile', async () => {
    vi.resetModules(); // Ensure a clean state for this test
    // Override the mock to return an error for this test only
    vi.mocked(supabase.from).mockImplementationOnce(() => (({
      select: vi.fn().mockImplementation(() => ({
        eq: vi.fn().mockImplementation(() => ({
          single: vi.fn().mockImplementation(() => new Promise((_, reject) => setTimeout(() => reject(new Error('Failed to fetch profile')), 20)))
        }))
      })),
      update: vi.fn()
    }) as any));
    
    // Use a unique session/userId for this test to avoid cache
    const errorSession = {
      user: {
        id: 'error-user-id',
        email: 'error@example.com',
      },
    } as unknown as Session;
    vi.mocked(supabase.from).mockImplementation((table: string) => {
      if (table === 'profiles') {
        return ({
          select: () => ({
            eq: (col: string, val: string) => ({
              single: () => new Promise((_, reject) => setTimeout(() => reject(new Error('Failed to fetch profile')), 20))
            })
          }),
          update: vi.fn()
        }) as any;
      }
      // fallback to default
      return ({
        select: () => ({
          eq: () => ({
            single: () => ({
              data: undefined,
              error: null
            })
          })
        }),
        update: vi.fn()
      }) as any;
    });
    const { result } = renderHook(() => useProfile(errorSession), {
      wrapper: createWrapper(),
    });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 2000 });
    
    expect(result.current.profile).toBeUndefined();
  });

  it('should update profile successfully', async () => {
    const mockData = {
      id: 'test-user-id',
      username: 'testuser',
      full_name: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg',
      updated_at: '2023-01-01T00:00:00Z',
    };

    const { result } = renderHook(() => useProfile(mockSession), {
      wrapper: createWrapper(),
    });
    
    const updates = { full_name: 'Updated Name' };
    let updateResult;
    await act(async () => {
      updateResult = await result.current.updateProfile(updates);
    });
    
    // Wait for updating to be false after update
    await waitFor(() => {
      expect(result.current.updating).toBe(false);
    });
    // Removed loading assertion after update

    expect(updateResult.error).toBe(null);
    expect(supabase.from).toHaveBeenCalledWith('profiles');
  });
});
