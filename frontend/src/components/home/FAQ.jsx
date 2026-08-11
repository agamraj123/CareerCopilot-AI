import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const faqData = [
  {
    question: "Is CareerCopilot AI free to use?",
    answer:
      "Yes. You can use the core features for free. Premium features may be introduced in the future.",
  },
  {
    question: "How does Resume Analysis work?",
    answer:
      "CareerCopilot uses Google's Gemini AI to analyze your resume, calculate an ATS score, identify strengths, weaknesses, and provide personalized improvement suggestions.",
  },
  {
    question: "Can I compare my resume with a Job Description?",
    answer:
      "Absolutely. Paste any job description and CareerCopilot will calculate your job match percentage, identify missing skills, and recommend improvements.",
  },
  {
    question: "Does CareerCopilot generate Cover Letters?",
    answer:
      "Yes. AI generates personalized cover letters based on your resume and the selected job description.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState(null);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-600 mt-5 text-lg">
            Everything you need to know about CareerCopilot AI.
          </p>
        </div>

        <div className="space-y-5">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              layout
              className="bg-white rounded-2xl shadow-sm border overflow-hidden"
            >
              <button
                onClick={() =>
                  setActive(active === index ? null : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <h3 className="font-semibold text-lg">
                  {item.question}
                </h3>

                {active === index ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>

              {active === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0 }}
                  className="px-6 pb-6 text-slate-600 leading-8"
                >
                  {item.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;