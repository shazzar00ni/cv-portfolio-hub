
import { X } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import { PortfolioItemType } from './types';

interface PortfolioItemProps {
  item: PortfolioItemType;
  onRemove: (id: string) => void;
}

const PortfolioItem = ({ item, onRemove }: PortfolioItemProps) => {
  return (
    <AnimatedSection 
      key={item.id} 
      className="group bg-card border border-muted rounded-lg overflow-hidden hover-lift"
      delay={parseInt(item.id) * 100}
    >
      <div className="relative aspect-video">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        <button 
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={16} className="text-destructive" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{item.title}</h3>
        <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
          {item.category}
        </span>
      </div>
    </AnimatedSection>
  );
};

export default PortfolioItem;
