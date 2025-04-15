
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

  if (isMobile) {
    return (
      <div className="mb-6 flex justify-center">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full max-w-[200px]">
              {formatCategory(selectedFilter)}
              <ChevronDown className="ml-2 h-4 w-4" />
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
                className={selectedFilter === category ? "bg-secondary" : ""}
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
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedFilter === category ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(category)}
          className="text-xs md:text-sm"
        >
          {formatCategory(category)}
        </Button>
      ))}
    </div>
  );
};

export default PortfolioFilter;
