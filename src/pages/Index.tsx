import { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import HeaderWithThemeToggle from '@/components/HeaderWithThemeToggle';
import NavigationMenu from '@/components/NavigationMenu';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import { useResourceOptimization } from '@/hooks/use-resource-optimization';
import MetaTags from '@/components/MetaTags';

interface IndexProps {
  session?: Session | null;
}

const Index = ({ session }: IndexProps) => {
  // Common resources to optimize
  useResourceOptimization({
    preconnectUrls: [
      'https://images.unsplash.com',
      'https://cdn.jsdelivr.net',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ],
    dnsPrefetchUrls: [
      'https://images.unsplash.com',
      'https://cdn.jsdelivr.net'
    ],
    lazyLoadImages: true,
    markLoadedImages: true
  });

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
      <MetaTags 
        title="Shannon Lockett | Web Development & Retail Management Portfolio"
        description="Professional portfolio showcasing web development projects, retail management expertise, and published articles on technology and business."
        keywords="Shannon Lockett, Web Developer, Retail Management, Portfolio, React, TypeScript, Frontend Development"
      />
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
          {session ? (
            <p className="text-xs text-muted-foreground mt-1">
              Logged in as: {session.user?.email}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              Not logged in
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Index;
