
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

    // Fix mockReturnValue issue by properly typing the mock functions
    const mockSingle = vi.fn(() => ({ 
      data: mockData, 
      error: null 
    }));
    
    const mockEq = vi.fn(() => ({
      single: mockSingle
    }));
    
    const mockSelect = vi.fn(() => ({
      eq: mockEq
    }));

    vi.spyOn(supabase, 'from').mockReturnValue({
      select: mockSelect
    } as any);

    const { result } = renderHook(() => useProfile(mockSession));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.profile).toEqual(mockData);
    expect(supabase.from).toHaveBeenCalledWith('profiles');
    expect(mockSelect).toHaveBeenCalledWith('*');
  });

  it('should handle errors when fetching profile', async () => {
    const mockError = new Error('Failed to fetch profile');
    
    // Fix mockReturnValue issue with proper typing of mock functions
    const mockSingle = vi.fn(() => ({ 
      data: null, 
      error: mockError 
    }));
    
    const mockEq = vi.fn(() => ({
      single: mockSingle
    }));
    
    const mockSelect = vi.fn(() => ({
      eq: mockEq
    }));

    vi.spyOn(supabase, 'from').mockReturnValue({
      select: mockSelect
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

    // Fix mockReturnValue issue with proper typing of mock functions
    const mockSingle = vi.fn(() => ({ 
      data: mockData, 
      error: null 
    }));
    
    const mockEq = vi.fn(() => ({
      single: mockSingle
    }));
    
    const mockSelect = vi.fn(() => ({
      eq: mockEq
    }));

    const mockEqUpdate = vi.fn(() => ({ error: null }));
    
    const mockUpdate = vi.fn(() => ({
      eq: mockEqUpdate
    }));

    vi.spyOn(supabase, 'from').mockReturnValue({
      select: mockSelect,
      update: mockUpdate,
    } as any);

    const { result } = renderHook(() => useProfile(mockSession));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    const updates = { full_name: 'Updated Name' };
    const updateResult = await result.current.updateProfile(updates);
    
    expect(updateResult.error).toBe(null);
    expect(supabase.from).toHaveBeenCalledWith('profiles');
    expect(mockUpdate).toHaveBeenCalledWith(updates);
  });
});
