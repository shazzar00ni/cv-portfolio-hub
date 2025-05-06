
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { supabase } from './client';

describe('Supabase client', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should export the supabase client', () => {
    expect(supabase).toBeDefined();
  });

  it('should have the correct methods', () => {
    expect(supabase.from).toBeDefined();
    expect(supabase.auth).toBeDefined();
    expect(supabase.storage).toBeDefined();
  });
});
