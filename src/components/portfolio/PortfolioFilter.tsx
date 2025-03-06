
import { Button } from '../ui/button';

interface PortfolioFilterProps {
  categories: string[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const PortfolioFilter = ({ categories, selectedFilter, onFilterChange }: PortfolioFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedFilter === category ? "default" : "outline"}
          onClick={() => onFilterChange(category)}
          className="capitalize"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default PortfolioFilter;
