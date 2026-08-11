import {
  motion,
} from "framer-motion";

import FeatureCard from "./FeatureCard";
import SectionHeading from "./SectionHeading";

import {
  featuresData,
} from "../../../data/featuresData";

const FeaturesSection = () => {
  return (
    <section className="py-28">
      <div className="container mx-auto px-6">
        <SectionHeading
          badge="Why CareerCopilot AI?"
          title="Everything You Need To Crack Placements"
          subtitle="Powerful AI-driven tools designed to help students build better resumes, prepare for interviews, and land their dream jobs."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 grid gap-8 md:grid-cols-2"
        >
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              {...feature}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;