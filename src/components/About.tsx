
import AnimatedSection from './AnimatedSection';

const About = () => {
  return (
    <section id="about" className="py-12 md:py-24" role="region" aria-labelledby="about-heading">
      <div className="container-custom">
        <AnimatedSection>
          <h2 id="about-heading" className="section-heading">ABOUT ME</h2>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <div className="w-full md:w-1/6 flex items-center justify-center mt-2" aria-hidden="true">
              <div className="h-4 w-4 rounded-full bg-primary relative">
                <span className="absolute top-0 left-0 h-full w-full bg-primary opacity-40 rounded-full animate-ping"></span>
              </div>
            </div>
            
            <div className="w-full md:w-5/6">
              <p className="text-base md:text-lg leading-relaxed">
                With over 15 years of expertise in retail and retail management, I bring a wealth of knowledge and a proven track record of success to any organisation. My extensive experience has equipped me with strong leadership skills, exceptional customer service abilities, and a deep understanding of the retail industry. I am committed to driving sales and enhancing the customer experience, always striving for excellence in every aspect of retail operations.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;
