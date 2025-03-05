
import React from 'react';
import AnimatedSection from './AnimatedSection';
import TimelineItem from './TimelineItem';

const Education = () => {
  return (
    <div className="relative">
      <TimelineItem
        title="BACHELOR'S DEGREE"
        period="2008 - 2011"
        company="MURDOCH UNIVERSITY"
        location="PERTH"
        achievements={[
          "Digital Communication and Media/Multimedia"
        ]}
        delay={0}
      />
      
      <TimelineItem
        title="CERTIFICATE IV"
        period="2014 - 2015"
        company="TAFE"
        location="PERTH"
        achievements={[
          "Retail Management"
        ]}
        delay={100}
      />
      
      <TimelineItem
        title="CERTIFICATE III"
        period="2013 - 2014"
        company="TAFE"
        location="PERTH"
        achievements={[
          "Retailing and Retail Operations"
        ]}
        delay={200}
      />
      
      <TimelineItem
        title="CERTIFICATE IV"
        period="2007 - 2008"
        company="TAFE"
        location="PERTH"
        achievements={[
          "Intermedia/Multimedia"
        ]}
        delay={300}
      />
      
      <TimelineItem
        title="HIGH SCHOOL DIPLOMA"
        period="2002 - 2006"
        company="LESMURDIE SENIOR HIGH SCHOOL"
        location="PERTH"
        achievements={[
          "Graduated Year 12"
        ]}
        delay={400}
      />
    </div>
  );
};

export default Education;
