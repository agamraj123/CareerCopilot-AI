import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle,
    Play,
} from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../../ui/Badge";

const features = [
    "AI Resume Analysis",
    "ATS Optimization",
    "Job Match Analysis",
    "AI Cover Letter Generator",
];

const HeroContent = () => {
    const handleDemoClick = () => {
        const demoSection = document.getElementById("demo");

        if (demoSection) {
            demoSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-50"
        >
            <Badge>🚀 AI Career Operating System</Badge>

            <h1 className="mt-10 max-w-2xl text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                Land Your{" "}
                <span className="text-blue-600">
                    Dream Job
                </span>
                <br />
                Faster with AI
            </h1>

            <p className="mt-10 max-w-lg text-lg leading-8 text-slate-600">
                Analyze your resume, improve ATS compatibility,
                compare your profile with any job description,
                generate AI-powered cover letters, and track
                your career growth—all in one intelligent platform.
            </p>

            {/* ACTION BUTTONS */}
            <div className="relative z-[100] mt-10 flex flex-wrap gap-4">
                <Link
                    to="/register"
                    className="group relative z-[100] inline-flex cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
                >
                    Start Free

                    <ArrowRight
                        size={20}
                        className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Link>

                <button
                    type="button"
                    onClick={handleDemoClick}
                    className="group relative z-[100] inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                    <Play
                        size={18}
                        fill="currentColor"
                        className="mr-2 transition-transform duration-200 group-hover:scale-105"
                    />

                    Watch Demo
                </button>
            </div>

            {/* FEATURES */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                    <div
                        key={feature}
                        className="flex items-center gap-3"
                    >
                        <CheckCircle
                            className="shrink-0 text-green-500"
                            size={20}
                        />

                        <span className="font-medium text-slate-700">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default HeroContent;