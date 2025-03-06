
import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { PortfolioItemType } from './types';

interface PortfolioUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: PortfolioItemType) => void;
}

const PortfolioUploadModal = ({ isOpen, onClose, onAddItem }: PortfolioUploadModalProps) => {
  const { toast } = useToast();
  const [newItem, setNewItem] = useState<Partial<PortfolioItemType>>({
    id: Math.random().toString(36).substring(2, 9),
    title: '',
    description: '',
    category: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a preview for the UI
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.title || !newItem.description || !newItem.category || !imageFile) {
      toast({
        title: "Missing information",
        description: "Please fill all fields and select an image",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would upload the image to a storage service
    // and get back a URL. For this demo, we'll use a placeholder URL
    // if there's an actual file selected
    const imagePath = imageFile 
      ? `https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
      : '';
    
    // Add the new item with the image URL
    onAddItem({ 
      ...newItem, 
      id: newItem.id || Math.random().toString(36).substring(2, 9),
      image: imagePath 
    } as PortfolioItemType);
    
    // Show success toast
    toast({
      title: "Project added",
      description: "Your project has been added to the portfolio",
    });
    
    // Reset form and close modal
    resetFormAndClose();
  };

  const resetFormAndClose = () => {
    onClose();
    setNewItem({
      id: Math.random().toString(36).substring(2, 9),
      title: '',
      description: '',
      category: '',
      image: '',
    });
    setImageFile(null);
    setImagePreview('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-muted rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-muted">
          <h3 className="text-lg font-medium">Add New Project</h3>
          <button 
            onClick={resetFormAndClose}
            className="rounded-full p-1 hover:bg-muted"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleUpload} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Project Image</label>
            <div className={cn(
              "border-2 border-dashed border-muted rounded-lg p-4 text-center",
              imagePreview ? "border-primary" : ""
            )}>
              {imagePreview ? (
                <div className="relative aspect-video mb-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-md" 
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-background/80 rounded-full"
                  >
                    <X size={16} className="text-destructive" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4">
                  <ImageIcon size={40} className="text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Drag & drop or click to upload
                  </p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden" 
                id="image-upload" 
              />
              <label 
                htmlFor="image-upload" 
                className="mt-2 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium cursor-pointer"
              >
                {imagePreview ? 'Replace Image' : 'Select Image'}
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
            <input 
              type="text" 
              id="title"
              value={newItem.title} 
              onChange={(e) => setNewItem({...newItem, title: e.target.value})}
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
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              className="w-full px-3 py-2 border border-muted rounded-md" 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
            <textarea 
              id="description" 
              value={newItem.description} 
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              className="w-full px-3 py-2 border border-muted rounded-md" 
              rows={3} 
              required 
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={resetFormAndClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!imageFile || !newItem.title || !newItem.description || !newItem.category}>
              Add Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioUploadModal;
