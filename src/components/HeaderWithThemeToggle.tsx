
import { ThemeToggle } from "./ThemeToggle";
import { Linkedin, Github, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeaderWithThemeToggle = () => {
  const socialLinks = [
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/in/shannon-lockett",
      label: "LinkedIn"
    },
    {
      icon: Github,
      url: "https://github.com/shazzar00ni",
      label: "GitHub"
    },
    {
      icon: Instagram,
      url: "https://www.instagram.com/shazzar00ni/",
      label: "Instagram"
    },
    {
      icon: Mail,
      url: "mailto:shanlockett@gmail.com",
      label: "Email"
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
        <div className="flex items-center space-x-2">
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
        </div>
      </div>
    </header>
  );
};

export default HeaderWithThemeToggle;
