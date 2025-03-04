
import AnimatedSection from './AnimatedSection';
import Timeline from './Timeline';

const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-24 bg-secondary/50">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="section-heading">WORK EXPERIENCE</h2>
          <Timeline />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Experience;
