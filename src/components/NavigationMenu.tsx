
import { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const NavigationMenu = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sections = [
    { id: 'about', label: 'About Me' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Handle fixed positioning effect
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Determine active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const currentSection = sectionElements.find(section => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, sections]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
      // Close mobile menu after clicking
      if (isMobile) setMobileMenuOpen(false);
    }
  };

  const handleAuthNavigation = () => {
    navigate('/auth');
    if (isMobile) setMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      "transition-all duration-300 py-4 z-40 w-full border-y border-muted bg-background/80 backdrop-blur-lg",
      scrolled ? "sticky top-0" : "relative"
    )}>
      <div className="container-custom">
        {isMobile ? (
          <>
            <div className="flex justify-between items-center">
              <span className="text-primary font-medium">Shannon Lockett</span>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md hover:bg-secondary/80"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {mobileMenuOpen && (
              <ul className="flex flex-col pt-4 pb-2 gap-4 animate-fade-in">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "w-full px-3 py-2 text-left rounded-md transition-all duration-300",
                        activeSection === section.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-secondary/50"
                      )}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
                {!isLoggedIn && (
                  <li>
                    <Button
                      onClick={handleAuthNavigation}
                      className="w-full flex items-center justify-center"
                      variant="outline"
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Login / Sign Up
                    </Button>
                  </li>
                )}
              </ul>
            )}
          </>
        ) : (
          <div className="flex justify-between items-center">
            <ul className="flex justify-center space-x-4 md:space-x-12">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "px-1 py-2 relative transition-all duration-300 text-sm md:text-base hover:text-primary",
                      activeSection === section.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {section.label}
                    {activeSection === section.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-fade-in" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            
            {!isLoggedIn && (
              <Button
                onClick={handleAuthNavigation}
                variant="outline"
                className="ml-4"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login / Sign Up
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationMenu;
