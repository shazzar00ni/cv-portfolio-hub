
import { MapPin, Phone, Mail, Linkedin, Github, Instagram } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: "Perth, W.A.",
      delay: 0
    },
    {
      icon: Phone,
      label: "Phone",
      value: "0433369652",
      delay: 100
    },
    {
      icon: Mail,
      label: "Email",
      value: "shanlockett@gmail.com",
      delay: 200
    }
  ];

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
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary/50">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="section-heading">CONTACT</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {contactInfo.map((item, index) => (
              <AnimatedSection
                key={index}
                delay={item.delay}
                className="bg-card border border-muted rounded-lg p-4 md:p-6 flex flex-col items-center text-center hover-lift"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-secondary flex items-center justify-center mb-3 md:mb-4">
                  <item.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2">{item.label}</h3>
                <p className="text-sm md:text-base text-muted-foreground break-words w-full">{item.value}</p>
              </AnimatedSection>
            ))}
          </div>
          
          <div className="mt-8 md:mt-12 flex flex-col items-center">
            <AnimatedSection delay={300}>
              <h3 className="text-xl font-medium mb-4 md:mb-6 text-center">Connect With Me</h3>
              <div className="flex justify-center gap-3 md:gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300"
                    aria-label={link.label}
                  >
                    <link.icon size={18} className="text-primary" />
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;
