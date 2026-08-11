import { motion } from "framer-motion";

const ProgressBar = ({ label, value, color = "bg-blue-600" }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">

        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>

        <span className="text-sm font-semibold text-slate-900">
          {value}%
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200">

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`h-full rounded-full ${color}`}
        />

      </div>
    </div>
  );
};

export default ProgressBar;