
import { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import { useToast } from '@/hooks/use-toast';
import { PortfolioItemType } from './portfolio/types';
import PortfolioItem from './portfolio/PortfolioItem';
import AddPortfolioItem from './portfolio/AddPortfolioItem';
import PortfolioUploadModal from './portfolio/PortfolioUploadModal';
import PortfolioFilter from './portfolio/PortfolioFilter';
import { supabase } from "@/integrations/supabase/client";

const Portfolio = () => {
  const { toast } = useToast();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioItems();
  }, [toast]);

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const handleAddItem = async (item: PortfolioItemType) => {
    try {
      // Add item to Supabase
      const { data, error } = await supabase
        .from('portfolio_items')
        .insert({
          title: item.title,
          description: item.description,
          category: item.category,
          image_url: item.image,
          user_id: (await supabase.auth.getUser()).data.user?.id
        })
        .select();

      if (error) {
        console.error('Error adding portfolio item:', error);
        toast({
          title: "Failed to add project",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Transform returned data to match PortfolioItemType
      const newItem: PortfolioItemType = {
        id: data[0].id,
        title: data[0].title,
        description: data[0].description || '',
        category: data[0].category || 'Uncategorized',
        image: data[0].image_url || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: `Screenshot of ${data[0].title}`
      };

      setPortfolioItems(prev => [...prev, newItem]);
      
      // Update categories if new category was added
      if (!categories.includes(newItem.category) && newItem.category !== '') {
        setCategories(prev => [...prev, newItem.category]);
      }

      toast({
        title: "Project added",
        description: "Your project has been added to your portfolio",
      });
    } catch (error) {
      console.error('Error in handleAddItem:', error);
      toast({
        title: "Something went wrong",
        description: "Could not add portfolio item",
        variant: "destructive",
      });
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      // Remove item from Supabase
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error removing portfolio item:', error);
        toast({
          title: "Failed to remove project",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Remove item from state
      setPortfolioItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Project removed",
        description: "The project has been removed from your portfolio",
      });
      
      // Update categories if needed
      const updatedItems = portfolioItems.filter(item => item.id !== id);
      const updatedCategories = ['all', ...new Set(updatedItems.map(item => item.category))];
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error in handleRemoveItem:', error);
      toast({
        title: "Something went wrong",
        description: "Could not remove portfolio item",
        variant: "destructive",
      });
    }
  };

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
            ) : (
              // Render portfolio items
              <>
                {filteredItems.map((item) => (
                  <PortfolioItem 
                    key={item.id}
                    item={item} 
                    onRemove={handleRemoveItem} 
                  />
                ))}
                
                <AddPortfolioItem onClick={() => setIsUploadModalOpen(true)} />
              </>
            )}
          </div>
        </AnimatedSection>
      </div>

      <PortfolioUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </section>
  );
};

export default Portfolio;
