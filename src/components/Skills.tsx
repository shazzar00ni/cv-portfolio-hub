
import { CheckCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Skills = () => {
  const skillsList = [
    "Stock Replenishment",
    "Inventory Management",
    "Team Leadership",
    "Customer Service",
    "Staff Training",
    "Visual Merchandising",
    "Sales Growth",
    "Project Management",
    "Time Management",
    "Problem Solving"
  ];

  return (
    <section id="skills" className="py-8 md:py-16 lg:py-24">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="section-heading">SKILLS</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {skillsList.map((skill, index) => (
              <AnimatedSection 
                key={skill} 
                delay={index * 100}
                className="flex items-center gap-2 md:gap-2.5 p-3 md:p-4 rounded-lg border border-muted bg-card hover-lift"
              >
                <CheckCircle size={16} className="text-primary md:w-5 md:h-5" />
                <span className="text-base md:text-lg">{skill}</span>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;
