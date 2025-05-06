
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserMenu from './UserMenu';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
  useNavigate: () => vi.fn(),
}));

// Mock use-toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock the ui components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, className }: any) => (
    <button onClick={onClick} data-variant={variant} className={className}>
      {children}
    </button>
  ),
}));

vi.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: any) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuContent: ({ children }: any) => <div data-testid="dropdown-content">{children}</div>,
  DropdownMenuItem: ({ children, asChild, onClick }: any) => {
    if (asChild) return <div data-testid="dropdown-item">{children}</div>;
    return <div data-testid="dropdown-item" onClick={onClick}>{children}</div>;
  },
  DropdownMenuLabel: ({ children }: any) => <div data-testid="dropdown-label">{children}</div>,
  DropdownMenuSeparator: () => <hr data-testid="dropdown-separator" />,
  DropdownMenuTrigger: ({ children, asChild }: any) => (
    <div data-testid="dropdown-trigger">{children}</div>
  ),
}));

vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }: any) => <div data-testid="avatar">{children}</div>,
  AvatarImage: ({ src, alt }: any) => <img data-testid="avatar-image" src={src} alt={alt} />,
  AvatarFallback: ({ children }: any) => <div data-testid="avatar-fallback">{children}</div>,
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
                avatar_url: 'https://example.com/avatar.jpg',
                full_name: 'Test User'
              }, 
              error: null 
            }))
          }))
        }))
      })),
      auth: {
        signOut: vi.fn().mockResolvedValue({ error: null })
      }
    }
  };
});

describe('UserMenu', () => {
  const mockSession = {
    user: {
      id: 'test-user-id',
      email: 'test@example.com',
    },
  } as unknown as Session;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login button when no session is provided', () => {
    render(<UserMenu session={null} />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders user menu when session is provided', () => {
    render(<UserMenu session={mockSession} />);
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('displays user email in the dropdown menu', () => {
    render(<UserMenu session={mockSession} />);
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('shows proper navigation links', () => {
    render(<UserMenu session={mockSession} />);
    
    // Fix getAttribute issue by properly typing the elements
    const links = screen.getAllByRole('link');
    const linkUrls = links.map(link => (link as HTMLAnchorElement).getAttribute('href'));
    
    expect(linkUrls).toContain('/profile');
    expect(linkUrls).toContain('/settings');
  });
});
