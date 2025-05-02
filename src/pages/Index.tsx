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
import { Linkedin, Github, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IndexProps {
  session?: Session | null;
}

const Index = ({ session }: IndexProps) => {
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
    document.title = "Shannon Lockett - Portfolio and CV";
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const socialLinks = [
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/in/shannon-lockett",
      label: "LinkedIn profile of Shannon Lockett"
    },
    {
      icon: Github,
      url: "https://github.com/shazzar00ni",
      label: "GitHub profile of Shannon Lockett"
    },
    {
      icon: Instagram,
      url: "https://www.instagram.com/shazzar00ni/",
      label: "Instagram profile of Shannon Lockett"
    },
    {
      icon: Mail,
      url: "mailto:shanlockett@gmail.com",
      label: "Send email to Shannon Lockett"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags 
        title="Shannon Lockett - Portfolio and CV"
        description="Retail professional and web designer/developer from Perth, Western Australia."
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
          
          <div className="flex justify-center space-x-2 mt-4" aria-label="Social media links">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full hover:bg-secondary"
              >
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
