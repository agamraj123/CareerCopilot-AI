import { motion } from "framer-motion";
import {
  Briefcase,
  Brain,
  CheckCircle,
  FileText,
  TrendingUp,
} from "lucide-react";

import GlassCard from "../../ui/GlassCard";
import HeroStats from "./HeroStats";
import SuggestionChip from "./SuggestionChip";
import { dashboardData } from "../../../data/dashboardData";
import ActivityItem from "./ActivityItem";
import ProgressRing from "../../ui/ProgressRing";

const iconMap = {
  resume: <FileText size={28} />,
  ats: <Brain size={28} />,
  job: <Briefcase size={28} />,
  interview: <CheckCircle size={28} />,
};

const HeroDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto w-full max-w-lg"
    >
      <GlassCard className="p-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Career Readiness
            </p>

            <h2 className="mt-2 text-5xl font-extrabold text-slate-900">
              {dashboardData.careerReadiness.score}%
            </h2>

            <p className="mt-2 text-sm font-medium text-green-600">
              {dashboardData.careerReadiness.status}
            </p>
          </div>

          <ProgressRing
  progress={dashboardData.careerReadiness.score}
  label="AI Score"
  color="#22c55e"
  size={120}
/>
        </div>

        {/* Stats */}

        <div className="mt-10 grid grid-cols-2 gap-4">
          {dashboardData.stats.map((stat) => (
            <HeroStats
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={iconMap[stat.icon]}
              color={stat.color}
            />
          ))}
        </div>

        {/* Recent Activity */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 rounded-2xl border border-slate-200 bg-white p-5"
        >
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Activity
          </h3>

          <div className="mt-5 space-y-3">
            {dashboardData.recentActivities.map((activity) => (
    <ActivityItem
        key={activity.id}
        title={activity.title}
        time={activity.time}
    />
))}
          </div>
        </motion.div>

        {/* AI Suggestions */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5"
        >
          <h3 className="font-semibold text-blue-700">
            🤖 AI Suggestions
          </h3>

          <div className="mt-4 flex flex-wrap gap-3">
           {dashboardData.aiSuggestions.map((suggestion) => (
    <SuggestionChip
        key={suggestion}
        text={suggestion}
    />
))}
          </div>
        </motion.div>
      </GlassCard>

      {/* Floating Badge */}

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -right-6
          -top-6
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-5
          py-3
          shadow-lg
        "
      >
        <p className="text-xs text-slate-500">
          AI Confidence
        </p>

        <p className="text-xl font-bold text-blue-600">
          98%
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HeroDashboard;