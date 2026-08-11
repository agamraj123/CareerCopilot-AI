import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

import Badge from "../../ui/Badge";
import Button from "../../ui/Button";

const features = [
  "AI Resume Analysis",
  "ATS Optimization",
  "Job Match Analysis",
  "AI Cover Letter Generator",
];

const HeroContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Badge>🚀 AI Career Operating System</Badge>

      <h1 className="max-w-2xl mt-10 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
        Land Your{" "}
        <span className="text-blue-600">Dream Job</span>
        <br />
        Faster with AI
      </h1>

      <p className="mt-10 text-lg leading-8 text-slate-600 max-w-lg">
        Analyze your resume, improve ATS compatibility, compare your profile
        with any job description, generate AI-powered cover letters, and track
        your career growth—all in one intelligent platform.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button to="/register" size="lg">
          Start Free
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <Button variant="secondary" size="lg">
          Watch Demo
        </Button>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <CheckCircle
              className="text-green-500 shrink-0"
              size={20}
            />
            <span className="text-slate-700 font-medium">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroContent;