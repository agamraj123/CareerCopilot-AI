import { motion } from "framer-motion";

const ProgressRing = ({
  progress = 91,
  size = 120,
  strokeWidth = 10,
  color = "#2563eb",
  label = "Career Readiness",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (progress / 100) * circumference;

  return (
  <div className="flex flex-col items-center">
    <div className="relative">
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: 1.4,
            ease: "easeOut",
          }}
        />

      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-slate-900">
          {progress}%
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          {label}
        </p>
      </div>
    </div>
  </div>
);
};

export default ProgressRing;