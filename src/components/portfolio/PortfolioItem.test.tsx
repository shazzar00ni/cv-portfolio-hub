
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PortfolioItem from './PortfolioItem';
import { PortfolioItemType } from './types';

// Mock AnimatedSection component
vi.mock('../AnimatedSection', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="animated-section">{children}</div>
  ),
}));

// Mock OptimizedImage component
vi.mock('../ui/optimized-image', () => ({
  OptimizedImage: ({ src, alt }: { src: string; alt: string }) => (
    <img data-testid="optimized-image" src={src} alt={alt} />
  ),
}));

describe('PortfolioItem', () => {
  const mockItem: PortfolioItemType = {
    id: '1',
    image: 'https://example.com/image.jpg',
    title: 'Test Project',
    description: 'This is a test project',
    category: 'Test',
    alt: 'Test project image',
    githubUrl: 'https://github.com/test/project',
  };

  it('renders portfolio item correctly', () => {
    render(<PortfolioItem item={mockItem} onRemove={undefined} />);
    
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a test project')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByTestId('optimized-image')).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(screen.getByTestId('optimized-image')).toHaveAttribute('alt', 'Test project image');
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com/test/project');
  });

  it('renders portfolio item without GitHub link when githubUrl is not provided', () => {
    const itemWithoutGithub = { ...mockItem, githubUrl: undefined };
    render(<PortfolioItem item={itemWithoutGithub} onRemove={undefined} />);
    
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('uses title as alt text when alt is not provided', () => {
    const itemWithoutAlt = { ...mockItem, alt: undefined };
    render(<PortfolioItem item={itemWithoutAlt} onRemove={undefined} />);
    
    expect(screen.getByTestId('optimized-image')).toHaveAttribute('alt', 'Test Project');
  });
});
