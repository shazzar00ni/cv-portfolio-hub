
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header className={`py-8 md:py-16 transition-all duration-300 ${
      scrolled ? "py-4 md:py-8" : ""
    }`}>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-6">
          <AnimatedSection className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-1">SHANNON</h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">LOCKETT</h1>
          </AnimatedSection>
          
          <AnimatedSection className="flex flex-col gap-3 md:gap-4 w-full md:w-auto" delay={200}>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <MapPin size={18} className="text-primary opacity-80" />
              <span className="text-sm md:text-base">Perth, W.A.</span>
            </div>
            
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Phone size={18} className="text-primary opacity-80" />
              <span className="text-sm md:text-base">0433369652</span>
            </div>
            
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Mail size={18} className="text-primary opacity-80" />
              <span className="text-sm md:text-base">shanlockett@gmail.com</span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </header>
  );
};

export default Header;
