
import AnimatedSection from './AnimatedSection';

const About = () => {
  return (
    <section id="about" className="py-8 md:py-12 lg:py-24" role="region" aria-labelledby="about-heading">
      <div className="container-custom">
        <AnimatedSection>
          <h2 id="about-heading" className="section-heading">ABOUT ME</h2>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <div className="w-full md:w-1/6 flex items-center justify-center mt-2" aria-hidden="true">
              <div 
                className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-primary relative"
                tabIndex={-1}
              >
                <span className="absolute top-0 left-0 h-full w-full bg-primary opacity-40 rounded-full animate-ping"></span>
              </div>
            </div>
            
            <div className="w-full md:w-5/6 space-y-4">
              <p className="text-base md:text-lg leading-relaxed">
                I bring over 15 years of retail experience, including management positions at one of Australia's largest retailers, Woolworths Ltd. During that time, I developed a deep understanding of team leadership, customer relations, merchandise management, and day-to-day retail operations. I'm a results-driven operator with a practical mindset and an eye for detail.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                In recent years, I've been pivoting into the tech and digital space—teaching myself web development, digital design, and the fundamentals of blockchain and AI. My goal is to bridge the gap between retail and emerging technologies by building tools, platforms, and creative projects that simplify and enhance real-world retail and e-commerce experiences. I'm particularly drawn to automation, Web3, and user-friendly design that empowers both customers and businesses.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;
