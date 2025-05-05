
import AnimatedSection from '../AnimatedSection';
import { PortfolioItemType } from './types';
import { OptimizedImage } from '../ui/optimized-image';

interface PortfolioItemProps {
  item: PortfolioItemType;
  onRemove: ((id: string) => void) | undefined;
}

const PortfolioItem = ({ item }: PortfolioItemProps) => {
  return (
    <AnimatedSection 
      key={item.id} 
      className="group bg-card border border-muted rounded-lg overflow-hidden hover-lift"
      delay={parseInt(item.id) * 100}
    >
      <article role="article" aria-labelledby={`portfolio-title-${item.id}`}>
        <div className="relative aspect-video">
          <OptimizedImage 
            src={item.image || ''}
            alt={item.alt || item.title} 
            width={400}
            height={225}
            className="w-full h-full"
            showFallbackOnError={true}
            objectFit="cover"
          />
        </div>
        <div className="p-3 md:p-4">
          <h3 id={`portfolio-title-${item.id}`} className="text-base md:text-lg font-medium mb-1 md:mb-2">{item.title}</h3>
          <p className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">{item.description}</p>
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
            {item.category}
          </span>
        </div>
      </article>
    </AnimatedSection>
  );
};

export default PortfolioItem;
