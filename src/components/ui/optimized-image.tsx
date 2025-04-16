
import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getOptimizedImageUrl, getFallbackImageUrl } from '@/lib/image-utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  quality?: number;
  fallback?: string;
  showFallbackOnError?: boolean;
  showLoadingState?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
}

export function OptimizedImage({
  src,
  alt,
  className,
  width = 400,
  height = 225,
  aspectRatio,
  quality = 75,
  fallback,
  showFallbackOnError = true,
  showLoadingState = true,
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = () => {
    console.log(`Image failed to load: ${src}`);
    setImageError(true);
  };
  
  const imageUrl = imageError && showFallbackOnError
    ? fallback || getFallbackImageUrl()
    : getOptimizedImageUrl(src, width, quality);
  
  return (
    <div className={cn(
      'image-blur-wrapper relative overflow-hidden',
      aspectRatio && `image-container`,
      className
    )}
    data-ratio={aspectRatio}
    >
      {showLoadingState && !imageLoaded && !imageError && (
        <div className="w-full h-full loading-skeleton absolute inset-0" />
      )}
      
      {imageError && !showFallbackOnError && (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <div className="text-center">
            <ImageOff className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Image unavailable</span>
          </div>
        </div>
      )}
      
      <img 
        src={imageUrl}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          imageLoaded ? 'opacity-100' : 'opacity-0',
          imageError && !showFallbackOnError ? 'hidden' : '',
          `object-${objectFit}`
        )}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}
