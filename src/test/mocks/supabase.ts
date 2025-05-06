
// If this file doesn't exist, create it with a proper mock implementation
export const supabaseMock = {
  from: (table: string) => ({
    select: () => ({
      eq: (column: string, value: any) => ({
        single: async () => ({
          data: { id: '1', name: 'Test' },
          error: null,
        }),
      }),
    }),
    insert: (data: any) => ({
      select: () => ({
        single: async () => ({
          data: { id: '1', ...data },
          error: null,
        }),
      }),
    }),
    update: (data: any) => ({
      eq: async (column: string, value: any) => ({
        data: { id: value, ...data },
        error: null,
      }),
    }),
    delete: () => ({
      eq: async (column: string, value: any) => ({
        error: null,
      }),
    }),
  }),
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, fileBody: any) => ({
        data: { path },
        error: null,
      }),
      getPublicUrl: (path: string) => ({
        data: { publicUrl: 'https://example.com/image.jpg' },
      }),
    }),
  },
  auth: {
    getSession: async () => ({
      data: {
        session: {
          user: { id: 'user-id', email: 'test@example.com' },
          expires_at: Date.now() + 3600,
        },
      },
      error: null,
    }),
    signIn: async () => ({
      data: { user: { id: 'user-id', email: 'test@example.com' } },
      error: null,
    }),
    signOut: async () => ({ error: null }),
    signUp: async () => ({
      data: { user: { id: 'user-id', email: 'test@example.com' } },
      error: null,
    }),
    onAuthStateChange: () => ({
      subscription: { unsubscribe: () => {} },
    }),
  },
};
