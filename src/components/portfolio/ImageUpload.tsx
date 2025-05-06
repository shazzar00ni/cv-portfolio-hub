
import { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  imagePreview: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export const ImageUpload = ({ imagePreview, onFileChange, onRemoveImage }: ImageUploadProps) => {
  return (
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
            onClick={onRemoveImage}
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
        onChange={onFileChange}
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
  );
};
