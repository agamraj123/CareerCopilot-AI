import { motion } from "framer-motion";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import ReadinessCard from "./ReadinessCard";
import ProgressBar from "./ProgressBar";

const scores = [
  { label: "Resume Quality", value: 92 },
  { label: "ATS Compatibility", value: 89 },
  { label: "Technical Skills", value: 91 },
  { label: "Projects", value: 84 },
  { label: "Interview Readiness", value: 78 },
  { label: "Communication", value: 72 },
];

const CareerReadiness = () => {
  return (
    <section className="py-24 bg-white">

      <Container>

        <SectionTitle
  badge="⭐ Career Readiness"
  title="Track Your Career Growth"
  description="See one simple score that reflects your overall placement readiness and identify where you should improve next."
/>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ReadinessCard title="Career Readiness">

              <div className="text-center">

                <h2 className="text-7xl font-extrabold text-blue-600">
                  91%
                </h2>

                <p className="text-green-600 font-semibold">
    ✓ Ready for Campus Placements
  </p>

  <p className="text-slate-500 text-sm">
    Based on resume quality, ATS compatibility,
    technical skills and interview preparation.
  </p>
              </div>

            </ReadinessCard>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <ReadinessCard title="Detailed Breakdown">

              <div className="space-y-6">

                {scores.map((item) => (
                  <ProgressBar
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}

              </div>

            </ReadinessCard>

          </motion.div>

        </div>

      </Container>

    </section>
  );
};

export default CareerReadiness;