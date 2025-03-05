
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
        title="MERCHANDISER"
        period="NOV 2020 - JUN 2024"
        company="CROSSMARK"
        location="PERTH, WESTERN AUSTRALIA"
        achievements={[
          "Executed merchandising and sales solutions for various clients in corporate grocery retailers within allocated territory.",
          "Executed planograms in large grocery stores working with a variety of FMCG products and brands.",
          "Utilized Storetrack systems to record work, schedule tasks, and manage completion of client allocated tasks.",
          "Managed personal work schedule to effectively allocate tasks and meet client deadlines.",
          "Ensured correct pricing and presentation of client products according to standards.",
          "Executed pre-paid client displays and promotions across retail stores.",
          "Verified product ranging and inventory in stores.",
          "Demonstrated self-motivation and strong time management while working autonomously."
        ]}
        delay={100}
      />
      
      <TimelineItem
        title="RECEIVING CLERK"
        period="JAN 2020 - NOV 2020"
        company="COSTCO"
        location="PERTH, AUSTRALIA"
        achievements={[
          "Operated high-risk equipment including forklifts and electric pallet jacks.",
          "Unloaded deliveries efficiently to ensure stock availability before opening.",
          "Processed deliveries accurately in the computer system.",
          "Managed courier deliveries and high-value items to appropriate departments.",
          "Responded to vendor emails and booking requests promptly.",
          "Resolved receiving issues through communication with buyers and managers.",
          "Assisted with merchandising and forklift operation on warehouse floor as needed."
        ]}
        delay={200}
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
        delay={300}
      />
    </div>
  );
};

export default Timeline;
