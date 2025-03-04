
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const NavigationMenu = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);

  const sections = [
    { id: 'about', label: 'About Me' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'skills', label: 'Skills' },
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
    }
  };

  return (
    <nav className={cn(
      "transition-all duration-300 py-4 z-40 w-full border-y border-muted bg-background/80 backdrop-blur-lg",
      scrolled ? "sticky top-0" : "relative"
    )}>
      <div className="container-custom">
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
      </div>
    </nav>
  );
};

export default NavigationMenu;
