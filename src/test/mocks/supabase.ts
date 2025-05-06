
import { vi } from 'vitest';

// Mock Supabase client with all necessary methods
export const createSupabaseMock = () => {
  const mockStorage = {
    from: vi.fn(() => ({
      upload: vi.fn().mockResolvedValue({ error: null }),
      getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/image.jpg' } }),
    })),
  };

  const mockInsert = vi.fn().mockReturnValue({
    select: vi.fn().mockReturnValue({
      single: vi.fn().mockResolvedValue({ data: { id: '1', title: 'Test' }, error: null }),
      maybeSingle: vi.fn().mockResolvedValue({ data: { id: '1', title: 'Test' }, error: null }),
    }),
  });

  const mockUpdate = vi.fn().mockReturnValue({
    eq: vi.fn().mockResolvedValue({ error: null }),
  });

  const mockDelete = vi.fn().mockReturnValue({
    eq: vi.fn().mockResolvedValue({ error: null }),
  });

  const mockSelect = vi.fn().mockReturnValue({
    eq: vi.fn().mockReturnValue({
      single: vi.fn().mockResolvedValue({ data: { id: '1' }, error: null }),
      maybeSingle: vi.fn().mockResolvedValue({ data: { id: '1' }, error: null }),
    }),
    order: vi.fn().mockReturnValue({
      limit: vi.fn().mockResolvedValue({ data: [{ id: '1' }], error: null }),
    }),
  });

  const mockFrom = vi.fn().mockReturnValue({
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
    select: mockSelect,
  });

  const mockAuth = {
    getSession: vi.fn().mockResolvedValue({ data: { session: { user: { id: '1' } } }, error: null }),
    signUp: vi.fn().mockResolvedValue({ data: { user: { id: '1' } }, error: null }),
    signIn: vi.fn().mockResolvedValue({ data: { user: { id: '1' } }, error: null }),
    signOut: vi.fn().mockResolvedValue({ error: null }),
    onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
  };

  return {
    from: mockFrom,
    storage: mockStorage,
    auth: mockAuth,
  };
};

// Create a mock for the supabase client
export const supabaseMock = createSupabaseMock();

// Mock the entire module
vi.mock('@/integrations/supabase/client', () => ({
  supabase: supabaseMock,
}));
