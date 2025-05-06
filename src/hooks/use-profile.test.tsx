
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useProfile } from './use-profile';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

// Mock the toast hook
vi.mock('./use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock supabase client
vi.mock('@/integrations/supabase/client', () => {
  const mockSingleDefault = {
    data: {
      id: 'test-user-id',
      username: 'testuser',
      full_name: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg',
      updated_at: '2023-01-01T00:00:00Z',
    },
    error: null
  };

  const mockProfileError = {
    data: null,
    error: new Error('Failed to fetch profile')
  };

  const mockUpdateSuccess = {
    error: null
  };

  return {
    supabase: {
      from: vi.fn((table) => {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn(() => {
                // We can customize the return value here based on test needs
                if (table === 'profiles') return mockSingleDefault;
                return { data: null, error: null };
              })
            }))
          })),
          update: vi.fn(() => ({
            eq: vi.fn(() => mockUpdateSuccess)
          }))
        };
      })
    }
  };
});

const mockSession = {
  user: {
    id: 'test-user-id',
    email: 'test@example.com',
  },
} as unknown as Session;

describe('useProfile hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null profile when no session is provided', async () => {
    const { result } = renderHook(() => useProfile(null));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.profile).toBe(null);
  });

  it('should fetch profile when a session is provided', async () => {
    const mockData = {
      id: 'test-user-id',
      username: 'testuser',
      full_name: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg',
      updated_at: '2023-01-01T00:00:00Z',
    };

    const { result } = renderHook(() => useProfile(mockSession));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.profile).toEqual(mockData);
    expect(supabase.from).toHaveBeenCalledWith('profiles');
  });

  it('should handle errors when fetching profile', async () => {
    // Override the mock to return an error for this test only
    vi.mocked(supabase.from).mockReturnValueOnce({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockReturnValue({
            data: null,
            error: new Error('Failed to fetch profile')
          })
        })
      }),
      update: vi.fn()
    } as any);

    const { result } = renderHook(() => useProfile(mockSession));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.profile).toBe(null);
  });

  it('should update profile successfully', async () => {
    const mockData = {
      id: 'test-user-id',
      username: 'testuser',
      full_name: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg',
      updated_at: '2023-01-01T00:00:00Z',
    };

    const { result } = renderHook(() => useProfile(mockSession));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    const updates = { full_name: 'Updated Name' };
    const updateResult = await result.current.updateProfile(updates);
    
    expect(updateResult.error).toBe(null);
    expect(supabase.from).toHaveBeenCalledWith('profiles');
  });
});
