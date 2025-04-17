
import React from 'react';
import { cn } from "@/lib/utils";
import AnimatedSection from './AnimatedSection';

interface TimelineItemProps {
  title: string;
  period: string;
  company: string;
  location: string;
  achievements: string[];
  delay?: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  period,
  company,
  location,
  achievements,
  delay = 0
}) => {
  return (
    <AnimatedSection className="relative pl-10 mb-16 last:mb-0" delay={delay}>
      <div className="timeline-connector" aria-hidden="true" />
      <div className="timeline-dot" aria-hidden="true" />
      
      <div className="transition-all duration-300 hover-lift" role="listitem">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{title} <span className="text-muted-foreground" aria-hidden="true">|</span> <span className="text-sm md:text-base font-normal text-muted-foreground">{period}</span></h3>
        </div>
        
        <h4 className="text-base font-medium mb-3">{company}, {location}</h4>
        
        <ul className="space-y-2" role="list" aria-label="Achievements">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-2" aria-hidden="true">•</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
};

export default TimelineItem;
