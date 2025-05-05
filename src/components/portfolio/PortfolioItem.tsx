
import AnimatedSection from '../AnimatedSection';
import { PortfolioItemType } from './types';
import { OptimizedImage } from '../ui/optimized-image';
import { Github } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
          
          <div className="flex items-center justify-between">
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
              {item.category}
            </span>
            
            {item.githubUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto"
                asChild
              >
                <a 
                  href={item.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`View ${item.title} on GitHub`}
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </article>
    </AnimatedSection>
  );
};

export default PortfolioItem;
