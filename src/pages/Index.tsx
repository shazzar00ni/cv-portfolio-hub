
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
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
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
      
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-muted">
        <div className="container-custom">
          <p>© {new Date().getFullYear()} Shannon Lockett. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
