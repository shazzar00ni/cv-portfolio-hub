
import { Plus } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

interface AddPortfolioItemProps {
  onClick: () => void;
}

const AddPortfolioItem = ({ onClick }: AddPortfolioItemProps) => {
  return (
    <AnimatedSection 
      className="flex flex-col items-center justify-center border border-dashed border-muted rounded-lg p-8 hover-lift cursor-pointer h-full min-h-[280px]"
      onClick={onClick}
      delay={400}
    >
      <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
        <Plus size={24} className="text-primary" />
      </div>
      <p className="text-center font-medium">Add New Project</p>
      <p className="text-center text-muted-foreground text-sm mt-2">
        Upload images, add details and share your work
      </p>
    </AnimatedSection>
  );
};

export default AddPortfolioItem;
