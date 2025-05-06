
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
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
  return {
    supabase: {
      from: vi.fn().mockImplementation(() => ({
        select: vi.fn().mockImplementation(() => ({
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
        })),
        update: vi.fn().mockImplementation(() => ({
          eq: vi.fn().mockImplementation(() => ({
            error: null
          }))
        }))
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
    // Override the mock to return an error for this test only
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn().mockImplementation(() => ({
        eq: vi.fn().mockImplementation(() => ({
          single: vi.fn().mockImplementation(() => {
            throw new Error('Failed to fetch profile');
          })
        }))
      })),
      update: vi.fn()
    } as any));

    const { result } = renderHook(() => useProfile(mockSession), {
      wrapper: createWrapper(),
    });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.profile).toBe(undefined);
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
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    const updates = { full_name: 'Updated Name' };
    const updateResult = await result.current.updateProfile(updates);
    
    expect(updateResult.error).toBe(null);
    expect(supabase.from).toHaveBeenCalledWith('profiles');
  });
});
