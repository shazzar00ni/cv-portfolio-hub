
import TimelineItem from './TimelineItem';

const Timeline = () => {
  return (
    <div className="relative">
      <TimelineItem
        title="GROCERY TEAM MEMBER"
        period="JUN 2023 - NOV 2024"
        company="WOOLWORTHS LTD"
        location="COCKBURN/SUCCESS"
        achievements={[
          "Enhanced customer satisfaction and experience with tailored advice.",
          "Strengthened team collaboration to meet targets.",
          "Improved inventory accuracy through audits.",
          "Elevated brand visibility with creative displays.",
          "Ensured stock availability for customers."
        ]}
        delay={0}
      />
      
      <TimelineItem
        title="LONGLIFE TEAM LEADER"
        period="MAR 2007 - SEP 2019"
        company="WOOLWORTHS LTD"
        location="FORRESTFIELD, MUNDARING, KALAMUNDA"
        achievements={[
          "Boosted team productivity by 20% in six months.",
          "Led successful projects exceeding targets by 30% (e.g. store renewal).",
          "Implemented training and hiring, boosting skills and morale.",
          "Consistently achieved 90%+ customer satisfaction.",
          "Contributed to a 25% increase in revenue.",
          "Coached team to meet KPIs consistently.",
          "Enhanced team collaboration and synergy.",
          "Recognized with 'Leader of the Year' award from area manager."
        ]}
        delay={200}
      />
    </div>
  );
};

export default Timeline;
