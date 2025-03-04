
import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void; // Add onClick handler to props
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className, 
  delay = 0,
  onClick // Add onClick to the component props
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "scroll-effect",
        isVisible && "visible",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onClick} // Apply the onClick handler
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
