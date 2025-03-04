
import { MapPin, Phone, Mail, Linkedin, Github } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      label: "Address",
      value: "17 Cagney Way, Lesmurdie, 6076, Australia",
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
      url: "https://linkedin.com/",
      label: "LinkedIn"
    },
    {
      icon: Github,
      url: "https://github.com/",
      label: "GitHub"
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary/50">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="section-heading">CONTACT</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((item, index) => (
              <AnimatedSection
                key={index}
                delay={item.delay}
                className="bg-card border border-muted rounded-lg p-6 flex flex-col items-center text-center hover-lift"
              >
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">{item.label}</h3>
                <p className="text-muted-foreground">{item.value}</p>
              </AnimatedSection>
            ))}
          </div>
          
          <div className="mt-12 flex flex-col items-center">
            <AnimatedSection delay={300}>
              <h3 className="text-xl font-medium mb-6 text-center">Connect With Me</h3>
              <div className="flex justify-center gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300"
                    aria-label={link.label}
                  >
                    <link.icon size={20} className="text-primary" />
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
