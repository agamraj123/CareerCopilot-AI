import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Brain,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import StatCard from "../ui/StatCard";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-slate-50 py-24">
      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>

      <Container>
        {/* TOP NAVIGATION */}
        <div className="absolute top-6 right-8 flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            size="sm"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>

        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge>🚀 AI Powered Career Assistant</Badge>

            <h1 className="mt-10 text-6xl font-extrabold leading-tight text-slate-900">
              Land Your
              <span className="text-blue-600"> Dream Job </span>
              Faster with AI
            </h1>

            <p className="mt-10 text-xl leading-9 text-slate-600">
              CareerCopilot analyzes your resume, improves ATS score,
              compares your profile with any Job Description, and generates
              AI-powered Cover Letters.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
              >
                <span className="flex items-center gap-2">
                  Get Started
                  <ArrowRight size={20} />
                </span>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>

            <div className="mt-10 space-y-3">
              {[
                "ATS Optimized Resume",
                "AI Job Match Analysis",
                "AI Cover Letter Generator",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle
                    size={20}
                    className="text-green-500"
                  />

                  <span className="text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8">
              <div className="grid grid-cols-2 gap-5">
                <StatCard
                  icon={<FileText size={30} />}
                  title="Resume Score"
                  value="92%"
                />

                <StatCard
                  icon={<Brain size={30} />}
                  title="ATS Score"
                  value="89%"
                />

                <StatCard
                  icon={<Briefcase size={30} />}
                  title="Job Match"
                  value="91%"
                />

                <StatCard
                  icon={<CheckCircle size={30} />}
                  title="Interview"
                  value="Ready"
                />
              </div>

              <div className="mt-10 rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold">
                  AI Suggestions
                </h3>

                <ul className="mt-6 space-y-3 text-slate-600">
                  <li>✅ Improve ATS Keywords</li>
                  <li>✅ Add Quantified Achievements</li>
                  <li>✅ Strengthen React Projects</li>
                  <li>✅ Highlight DSA Experience</li>
                </ul>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;