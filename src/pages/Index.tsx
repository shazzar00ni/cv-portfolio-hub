
import { useEffect } from 'react';
import HeaderWithThemeToggle from '@/components/HeaderWithThemeToggle';
import NavigationMenu from '@/components/NavigationMenu';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';

const Index = () => {
  useEffect(() => {
    // Change page title
    document.title = "Shannon Lockett | Portfolio";
    
    // Add smooth scrolling to the page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add viewport meta tag for mobile responsiveness
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
    
    // Enable native lazy loading for browsers that support it
    // and add intersection observer fallback for older browsers
    if ('loading' in HTMLImageElement.prototype) {
      console.log('Native lazy loading supported');
      // Browser supports lazy loading natively, already handled with loading="lazy" attributes
    } else {
      console.log('Native lazy loading not supported, using IntersectionObserver');
      // Use IntersectionObserver as fallback for browsers that don't support lazy loading
      const lazyImages = document.querySelectorAll('img:not([loading])');
      
      if ('IntersectionObserver' in window) {
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
          // Store the original src in data-src and remove src to prevent loading
          const img = lazyImage as HTMLImageElement;
          if (img.src && !img.dataset.src) {
            img.dataset.src = img.src;
            img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='; // Tiny transparent gif
            imageObserver.observe(img);
          }
        });
      }
    }
    
    // Detect which images have already loaded
    const markLoadedImages = () => {
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
    
    // Run once and also after window load
    markLoadedImages();
    window.addEventListener('load', markLoadedImages);
    
    // Add preconnect hints for external resources
    const addPreconnect = (url: string) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      document.head.appendChild(link);
    };
    
    // Add DNS-prefetch for commonly used domains
    const addDnsPrefetch = (url: string) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = url;
      document.head.appendChild(link);
    };
    
    // Add preconnects and dns-prefetch for commonly used external resources
    addPreconnect('https://images.unsplash.com');
    addDnsPrefetch('https://images.unsplash.com');
    addPreconnect('https://cdn.jsdelivr.net');
    addDnsPrefetch('https://cdn.jsdelivr.net');
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('load', markLoadedImages);
      // We don't remove the meta tag on cleanup as it should persist
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderWithThemeToggle />
      <NavigationMenu />
      
      <main className="flex-grow">
        <About />
        <Experience />
        <Skills />
        <Portfolio />
        <Blog />
        <Contact />
      </main>
      
      <footer className="py-6 md:py-8 text-center text-xs md:text-sm text-muted-foreground border-t border-muted">
        <div className="container-custom">
          <p>© {new Date().getFullYear()} Shannon Lockett. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
