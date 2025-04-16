
import { useEffect } from 'react';

interface ResourceOptimizationOptions {
  preconnectUrls?: string[];
  prefetchUrls?: string[];
  dnsPrefetchUrls?: string[];
  preloadImages?: string[];
  lazyLoadImages?: boolean;
  markLoadedImages?: boolean;
}

/**
 * Hook to optimize resource loading (preconnect, prefetch, dns-prefetch, etc.)
 */
export const useResourceOptimization = ({
  preconnectUrls = [],
  prefetchUrls = [],
  dnsPrefetchUrls = [],
  preloadImages = [],
  lazyLoadImages = true,
  markLoadedImages = true,
}: ResourceOptimizationOptions = {}) => {
  useEffect(() => {
    // Add preconnect hints
    preconnectUrls.forEach(url => {
      if (!document.querySelector(`link[rel="preconnect"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });

    // Add dns-prefetch hints
    dnsPrefetchUrls.forEach(url => {
      if (!document.querySelector(`link[rel="dns-prefetch"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = url;
        document.head.appendChild(link);
      }
    });

    // Add prefetch hints
    prefetchUrls.forEach(url => {
      if (!document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      }
    });

    // Preload critical images
    preloadImages.forEach(url => {
      if (!document.querySelector(`link[rel="preload"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'image';
        document.head.appendChild(link);
      }
    });

    // Enable native lazy loading for browsers that support it
    // and add intersection observer fallback for older browsers
    if (lazyLoadImages) {
      if ('loading' in HTMLImageElement.prototype) {
        console.log('Native lazy loading supported');
        // Browser supports lazy loading natively
      } else {
        console.log('Native lazy loading not supported, using IntersectionObserver');
        
        if ('IntersectionObserver' in window) {
          const lazyImages = document.querySelectorAll('img:not([loading])');
          
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const lazyImage = entry.target as HTMLImageElement;
                if (lazyImage.dataset.src) {
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.classList.add('loaded');
                  lazyImage.removeAttribute('data-src');
                }
                imageObserver.unobserve(lazyImage);
              }
            });
          });
          
          lazyImages.forEach((lazyImage) => {
            const img = lazyImage as HTMLImageElement;
            if (img.src && !img.dataset.src) {
              img.dataset.src = img.src;
              img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
              imageObserver.observe(img);
            }
          });
        }
      }
    }

    // Detect which images have already loaded
    if (markLoadedImages) {
      const markLoadedImagesFunc = () => {
        document.querySelectorAll('img').forEach(img => {
          if (img.complete) {
            img.classList.add('loaded');
          } else {
            img.addEventListener('load', () => {
              img.classList.add('loaded');
            });
          }
        });
      };
      
      markLoadedImagesFunc();
      window.addEventListener('load', markLoadedImagesFunc);
      
      return () => {
        window.removeEventListener('load', markLoadedImagesFunc);
      };
    }
  }, [
    preconnectUrls,
    prefetchUrls, 
    dnsPrefetchUrls, 
    preloadImages, 
    lazyLoadImages, 
    markLoadedImages
  ]);
};
