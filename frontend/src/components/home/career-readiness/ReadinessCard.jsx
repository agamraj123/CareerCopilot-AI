import { motion } from "framer-motion";
import Card from "../../ui/Card";

const ReadinessCard = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className={`h-full ${className}`}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900">
            {title}
          </h3>

          {subtitle && (
            <p className="mt-2 text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </Card>
    </motion.div>
  );
};

export default ReadinessCard;