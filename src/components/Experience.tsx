
import AnimatedSection from './AnimatedSection';
import Timeline from './Timeline';
import Education from './Education';

const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-24 bg-secondary/50">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="section-heading">WORK EXPERIENCE</h2>
          <Timeline />
        </AnimatedSection>
        
        <AnimatedSection className="mt-16">
          <h2 className="section-heading">EDUCATION</h2>
          <Education />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Experience;
