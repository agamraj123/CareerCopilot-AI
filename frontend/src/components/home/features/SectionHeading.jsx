import { motion } from "framer-motion";

const SectionHeading = ({
  badge,
  title,
  subtitle,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl text-center"
    >
      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
        {badge}
      </span>

      <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-lg leading-8 text-slate-500">
        {subtitle}
      </p>
    </motion.div>
  );
};

export default SectionHeading;