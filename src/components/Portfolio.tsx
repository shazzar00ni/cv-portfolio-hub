
import { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { useToast } from '@/hooks/use-toast';
import { PortfolioItemType } from './portfolio/types';
import PortfolioItem from './portfolio/PortfolioItem';
import AddPortfolioItem from './portfolio/AddPortfolioItem';
import PortfolioUploadModal from './portfolio/PortfolioUploadModal';
import PortfolioFilter from './portfolio/PortfolioFilter';

const Portfolio = () => {
  const { toast } = useToast();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemType[]>([
    {
      id: '1',
      image: '/lovable-uploads/2cfa2627-69fa-4f98-ac3d-b555a4378a0c.png',
      title: 'Artify-AI',
      description: 'A collaborative platform that empowers artistic creators by merging AI technology with an intuitive interface. Features include art generation, creative coding tutorials, collaboration tools, and NFT integration.',
      category: 'Web Development',
    },
    {
      id: '2',
      image: '/lovable-uploads/573196d4-cf4e-4da6-83d8-316c22eaffb2.png',
      title: 'Markdown Editor',
      description: 'A responsive web application for creating and previewing markdown content in real-time. Features include syntax highlighting, split-pane view, and a clean, modern interface.',
      category: 'Web Development',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Web Development Project',
      description: 'Modern responsive website built with React and Tailwind CSS.',
      category: 'Web Development',
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Mobile App Design',
      description: 'UI/UX design for a productivity mobile application.',
      category: 'UI/UX Design',
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Backend System',
      description: 'Robust backend architecture with Node.js and PostgreSQL.',
      category: 'Backend',
    },
  ]);

  const [filter, setFilter] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const categories = ['all', ...new Set(portfolioItems.map((item) => item.category))];

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const handleAddItem = (item: PortfolioItemType) => {
    setPortfolioItems(prev => [...prev, item]);
  };

  const handleRemoveItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Project removed",
      description: "The project has been removed from your portfolio",
    });
  };

  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="section-heading">PORTFOLIO</h2>
          
          <PortfolioFilter 
            categories={categories}
            selectedFilter={filter}
            onFilterChange={setFilter}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <PortfolioItem 
                key={item.id}
                item={item} 
                onRemove={handleRemoveItem} 
              />
            ))}
            
            <AddPortfolioItem onClick={() => setIsUploadModalOpen(true)} />
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
