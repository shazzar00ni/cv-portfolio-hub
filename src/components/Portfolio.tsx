
import { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { useToast } from '@/hooks/use-toast';
import { PortfolioItemType } from './portfolio/types';
import PortfolioItem from './portfolio/PortfolioItem';
import PortfolioFilter from './portfolio/PortfolioFilter';

const Portfolio = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  
  // Define the portfolio items with the specified projects and images
  const portfolioItems: PortfolioItemType[] = [
    {
      id: '1',
      title: 'My Portfolio Website',
      description: 'A personal portfolio website built with React, TypeScript, and Tailwind CSS.',
      category: 'Web Development',
      image: '/lovable-uploads/bfc938d4-9cf5-4b37-bbfd-a66e8de4cc74.png',
      alt: 'Screenshot of portfolio website',
      githubUrl: 'https://github.com/users/shazzar00ni/projects/8/views/1'
    },
    {
      id: '2',
      title: 'Markdown Editor',
      description: 'A feature-rich Markdown editor with live preview and syntax highlighting.',
      category: 'Web Development',
      image: '/lovable-uploads/a3a2d048-81ec-40ae-b943-7191a568d329.png',
      alt: 'Screenshot of Markdown editor interface'
    },
    {
      id: '3',
      title: 'Artify-AI',
      description: 'An AI-powered tool for creative design and art generation.',
      category: 'AI/Machine Learning',
      image: '/lovable-uploads/2e8516bd-4d66-4599-b134-e9ddde8bcaf6.png',
      alt: 'Screenshot of Artify-AI application'
    },
    {
      id: '4',
      title: 'snips.dev',
      description: 'A platform for developers to share, organize, and showcase code snippets.',
      category: 'Developer Tools',
      image: '/lovable-uploads/a61adfc6-fb09-4958-bdb7-113c3b0ca27c.png',
      alt: 'Screenshot of snips.dev platform'
    }
  ];
  
  // Extract unique categories from portfolio items
  const categories = ['all', ...new Set(portfolioItems.map(item => item.category))];

  // Filter items based on selected category
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-12 md:py-24">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="section-heading">PORTFOLIO</h2>
          
          <PortfolioFilter 
            categories={categories}
            selectedFilter={filter}
            onFilterChange={setFilter}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {isLoading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <div 
                  key={`skeleton-${index}`} 
                  className="bg-card/30 border border-muted rounded-lg overflow-hidden h-[280px] animate-pulse"
                />
              ))
            ) : filteredItems.length > 0 ? (
              // Render portfolio items
              filteredItems.map((item) => (
                <PortfolioItem 
                  key={item.id}
                  item={item} 
                  onRemove={undefined} 
                />
              ))
            ) : (
              // No items state
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No portfolio items found in this category.</p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Portfolio;
