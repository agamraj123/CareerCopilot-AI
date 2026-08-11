import { motion } from "framer-motion";

const HeroStats = ({
  icon,
  title,
  value,
  color = "text-blue-600",
}) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">{title}</p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">
            {value}
          </h3>
        </div>

        <div className={color}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroStats;