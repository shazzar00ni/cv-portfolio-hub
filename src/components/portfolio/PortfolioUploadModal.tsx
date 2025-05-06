
import { useState } from 'react';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PortfolioItemType } from './types';
import { ImageUpload } from './ImageUpload';
import { PortfolioForm } from './PortfolioForm';
import { uploadPortfolioImage, getDefaultPortfolioImage } from '@/services/portfolioService';

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
  const [isUploading, setIsUploading] = useState(false);

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

  const handleItemChange = (updates: Partial<PortfolioItemType>) => {
    setNewItem(prev => ({ ...prev, ...updates }));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.title || !newItem.description || !newItem.category) {
      toast({
        title: "Missing information",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // If image file exists, try to upload it
      let imagePath = '';
      if (imageFile) {
        imagePath = await uploadPortfolioImage(imageFile);
      }

      // Use fallback image if upload failed or no image was selected
      if (!imagePath) {
        imagePath = getDefaultPortfolioImage();
      }
    
      // Add the new item with the image URL
      onAddItem({ 
        ...newItem, 
        id: newItem.id || Math.random().toString(36).substring(2, 9),
        image: imagePath,
        alt: `Image for ${newItem.title}`
      } as PortfolioItemType);
    
      // Reset form and close modal
      resetFormAndClose();
    } catch (error) {
      console.error("Error in handleUpload:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your project",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
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

  const handleRemoveImage = () => {
    setImagePreview('');
    setImageFile(null);
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
        
        <div className="p-6 pb-0">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Project Image</label>
            <ImageUpload 
              imagePreview={imagePreview}
              onFileChange={handleFileChange}
              onRemoveImage={handleRemoveImage}
            />
          </div>
        </div>
        
        <PortfolioForm 
          newItem={newItem}
          isUploading={isUploading}
          onItemChange={handleItemChange}
          onCancel={resetFormAndClose}
          onSubmit={handleUpload}
        />
      </div>
    </div>
  );
};

export default PortfolioUploadModal;
