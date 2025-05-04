
import { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import { useToast } from '@/hooks/use-toast';
import { PortfolioItemType } from './portfolio/types';
import PortfolioItem from './portfolio/PortfolioItem';
import PortfolioFilter from './portfolio/PortfolioFilter';
import { supabase } from "@/integrations/supabase/client";

const Portfolio = () => {
  const { toast } = useToast();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>(['all']);

  // Fetch portfolio items from Supabase
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*');

        if (error) {
          console.error('Error fetching portfolio items:', error);
          toast({
            title: "Failed to load portfolio",
            description: error.message,
            variant: "destructive",
          });
          
          // Add fallback items when there's an error
          setFallbackItems();
          return;
        }

        // Transform Supabase data to match PortfolioItemType
        const items: PortfolioItemType[] = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description || '',
          category: item.category || 'Uncategorized',
          image: item.image_url || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: `Screenshot of ${item.title}`
        }));

        // If no items returned, use fallback items
        if (items.length === 0) {
          setFallbackItems();
          return;
        }
        
        setPortfolioItems(items);
        
        // Extract unique categories
        const uniqueCategories = ['all', ...new Set(items.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error in fetchPortfolioItems:', error);
        toast({
          title: "Something went wrong",
          description: "Could not load portfolio items",
          variant: "destructive",
        });
        
        // Add fallback items when there's an error
        setFallbackItems();
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioItems();
  }, [toast]);

  const setFallbackItems = () => {
    const fallbackItems: PortfolioItemType[] = [
      {
        id: '1',
        title: 'E-commerce Website',
        description: 'A modern e-commerce platform built with React and Node.js',
        category: 'Web Development',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Screenshot of e-commerce website'
      },
      {
        id: '2',
        title: 'Mobile Banking App',
        description: 'A secure mobile application for online banking services',
        category: 'Mobile App',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Screenshot of mobile banking app'
      },
      {
        id: '3',
        title: 'Company Intranet',
        description: 'Internal portal for company resources and communication',
        category: 'Web Development',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Screenshot of company intranet'
      },
      {
        id: '4',
        title: 'Task Management Dashboard',
        description: 'Project management tool with analytics and team collaboration features',
        category: 'UI/UX Design',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Screenshot of task management dashboard'
      }
    ];
    
    setPortfolioItems(fallbackItems);
    
    // Set categories for fallback items
    const uniqueCategories = ['all', ...new Set(fallbackItems.map(item => item.category))];
    setCategories(uniqueCategories);
  };

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-12 md:py-24">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="section-heading">PORTFOLIO</h2>
          
          {portfolioItems.length > 0 && (
            <PortfolioFilter 
              categories={categories}
              selectedFilter={filter}
              onFilterChange={setFilter}
            />
          )}
          
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
