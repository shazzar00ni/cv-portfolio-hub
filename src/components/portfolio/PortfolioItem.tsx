
import { useState } from 'react';
import { X, ImageOff } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import { PortfolioItemType } from './types';

interface PortfolioItemProps {
  item: PortfolioItemType;
  onRemove: (id: string) => void;
}

const PortfolioItem = ({ item, onRemove }: PortfolioItemProps) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  const handleImageError = () => {
    console.log(`Image failed to load: ${item.image}`);
    setImageError(true);
  };

  return (
    <AnimatedSection 
      key={item.id} 
      className="group bg-card border border-muted rounded-lg overflow-hidden hover-lift"
      delay={parseInt(item.id) * 100}
    >
      <div className="relative aspect-video">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="text-center">
              <ImageOff className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Image unavailable</span>
            </div>
            <img 
              src={fallbackImage} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <img 
            src={item.image} 
            alt={item.alt || item.title} 
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
            decoding="async"
          />
        )}
        <button 
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity touch:opacity-70"
          aria-label="Remove item"
        >
          <X size={16} className="text-destructive" />
        </button>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2">{item.title}</h3>
        <p className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">{item.description}</p>
        <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
          {item.category}
        </span>
      </div>
    </AnimatedSection>
  );
};

export default PortfolioItem;
