import { motion } from "framer-motion";
import {
    FileText,
    Sparkles,
    BriefcaseBusiness,
    MessageSquareText,
} from "lucide-react";

const steps = [
    {
        number: "01",
        icon: FileText,
        title: "Upload Your Resume",
        description:
            "Upload your resume and let CareerCopilot extract your skills, experience, projects, and career profile.",
    },
    {
        number: "02",
        icon: Sparkles,
        title: "Get AI Analysis",
        description:
            "Receive an AI-powered resume analysis with ATS score, strengths, weaknesses, missing skills, and improvement suggestions.",
    },
    {
        number: "03",
        icon: BriefcaseBusiness,
        title: "Match With Jobs",
        description:
            "Paste any job description and discover your match score, matched skills, missing skills, and keywords to improve.",
    },
    {
        number: "04",
        icon: MessageSquareText,
        title: "Prepare & Apply",
        description:
            "Generate interview questions and personalized cover letters so you can apply with greater confidence.",
    },
];

const DemoSection = () => {
    return (
        <section
            id="demo"
            className="relative overflow-hidden bg-white py-24"
        >
            <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                        How It Works
                    </div>

                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                        Your Career Journey,
                        <span className="text-blue-600">
                            {" "}Powered by AI
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                        CareerCopilot brings resume analysis, job matching,
                        interview preparation, and career applications into
                        one intelligent workspace.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="group relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                            >
                                {/* Number */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-blue-600">
                                        {step.number}
                                    </span>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                        <Icon size={23} />
                                    </div>
                                </div>

                                <h3 className="mt-7 text-xl font-bold text-slate-900">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-16 rounded-3xl border border-blue-100 bg-blue-50 px-6 py-10 text-center md:px-12"
                >
                    <h3 className="text-2xl font-bold text-slate-900">
                        Ready to build a smarter career?
                    </h3>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                        Start with your resume and let CareerCopilot guide
                        your next career move.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default DemoSection;