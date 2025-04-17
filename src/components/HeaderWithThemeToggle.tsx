
import { ThemeToggle } from "./ThemeToggle";
import { Linkedin, Github, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const HeaderWithThemeToggle = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
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
    <header className="py-6 md:py-8 border-b border-muted">
      <div className="container-custom flex items-center justify-between">
        <div>
          <h1 className="text-4xl uppercase leading-tight">
            SHANNON
            <br />
            <span className="font-bold">LOCKETT</span>
          </h1>
        </div>
        <div className="flex items-center space-x-2" aria-label="Social media links">
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
          <ThemeToggle />
          <UserMenu session={session} />
        </div>
      </div>
    </header>
  );
};

export default HeaderWithThemeToggle;
