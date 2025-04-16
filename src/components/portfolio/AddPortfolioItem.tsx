
import { Plus } from 'lucide-react';
import { AddItemCard } from '../ui/add-item-card';

interface AddPortfolioItemProps {
  onClick: () => void;
}

const AddPortfolioItem = ({ onClick }: AddPortfolioItemProps) => {
  return (
    <AddItemCard
      onClick={onClick}
      title="Add New Project"
      subtitle="Upload images, add details and share your work"
      icon={
        <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Plus size={24} className="text-primary" />
        </div>
      }
      className="min-h-[280px]"
      delay={400}
    />
  );
};

export default AddPortfolioItem;
