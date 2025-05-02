
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

interface PortfolioFilterProps {
  categories: string[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const PortfolioFilter = ({ 
  categories, 
  selectedFilter, 
  onFilterChange 
}: PortfolioFilterProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Convert to title case
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Handle keyboard navigation for filter buttons
  const handleKeyDown = (e: React.KeyboardEvent, category: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onFilterChange(category);
    }
  };

  if (isMobile) {
    return (
      <div className="mb-6 flex justify-center">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full max-w-[200px]"
              aria-label={`Filter by ${formatCategory(selectedFilter)}`}
              aria-expanded={isOpen}
            >
              {formatCategory(selectedFilter)}
              <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-[200px]">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => {
                  onFilterChange(category);
                  setIsOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onFilterChange(category);
                    setIsOpen(false);
                  }
                }}
                className={selectedFilter === category ? "bg-secondary" : ""}
                role="menuitem"
                tabIndex={0}
              >
                {formatCategory(category)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2" role="toolbar" aria-label="Portfolio filters">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedFilter === category ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(category)}
          onKeyDown={(e) => handleKeyDown(e, category)}
          className="text-xs md:text-sm"
          aria-pressed={selectedFilter === category}
        >
          {formatCategory(category)}
        </Button>
      ))}
    </div>
  );
};

export default PortfolioFilter;
