
import { Button } from '@/components/ui/button';
import { PortfolioItemType } from './types';

interface PortfolioFormProps {
  newItem: Partial<PortfolioItemType>;
  isUploading: boolean;
  onItemChange: (updates: Partial<PortfolioItemType>) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PortfolioForm = ({ 
  newItem, 
  isUploading, 
  onItemChange, 
  onCancel, 
  onSubmit 
}: PortfolioFormProps) => {
  return (
    <form onSubmit={onSubmit} className="p-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
        <input 
          type="text" 
          id="title"
          value={newItem.title} 
          onChange={(e) => onItemChange({title: e.target.value})}
          className="w-full px-3 py-2 border border-muted rounded-md" 
          required 
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
        <input 
          type="text" 
          id="category" 
          value={newItem.category} 
          onChange={(e) => onItemChange({category: e.target.value})}
          className="w-full px-3 py-2 border border-muted rounded-md" 
          required 
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
        <textarea 
          id="description" 
          value={newItem.description} 
          onChange={(e) => onItemChange({description: e.target.value})}
          className="w-full px-3 py-2 border border-muted rounded-md" 
          rows={3} 
          required 
        />
      </div>
      
      <div className="flex justify-end gap-3 mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isUploading || !newItem.title || !newItem.description || !newItem.category}
        >
          {isUploading ? 'Uploading...' : 'Add Project'}
        </Button>
      </div>
    </form>
  );
};
