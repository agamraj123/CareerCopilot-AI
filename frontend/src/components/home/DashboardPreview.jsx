import { motion } from "framer-motion";
import {
  FileText,
  Briefcase,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold">
            Powerful Dashboard
          </h2>

          <p className="text-slate-600 mt-5 text-xl">
            Everything you need to prepare for placements in one dashboard.
          </p>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 bg-slate-100 rounded-3xl shadow-xl p-8"
        >

          {/* Top Cards */}

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <FileText
                className="text-blue-600"
                size={32}
              />

              <h3 className="mt-5 text-slate-500">
                Resume Score
              </h3>

              <h1 className="text-4xl font-bold mt-2">
                92%
              </h1>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <TrendingUp
                className="text-green-600"
                size={32}
              />

              <h3 className="mt-5 text-slate-500">
                ATS Score
              </h3>

              <h1 className="text-4xl font-bold mt-2">
                88%
              </h1>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <Briefcase
                className="text-orange-500"
                size={32}
              />

              <h3 className="mt-5 text-slate-500">
                Job Match
              </h3>

              <h1 className="text-4xl font-bold mt-2">
                85%
              </h1>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <CheckCircle
                className="text-green-500"
                size={32}
              />

              <h3 className="mt-5 text-slate-500">
                Status
              </h3>

              <h1 className="text-2xl font-bold mt-3">
                Ready
              </h1>
            </div>

          </div>

          {/* Bottom Section */}

          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            <div className="bg-white rounded-2xl p-5 shadow-sm">

              <h3 className="text-xl font-bold">
                AI Suggestions
              </h3>

              <ul className="mt-5 space-y-3 text-slate-600">

                <li>✅ Add more quantified achievements.</li>

                <li>✅ Improve ATS keywords.</li>

                <li>✅ Include Git & GitHub projects.</li>

                <li>✅ Strengthen React & Node.js skills.</li>

              </ul>

            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">

              <h3 className="text-xl font-bold">
                Recent Activity
              </h3>

              <ul className="mt-5 space-y-3 text-slate-600">

                <li>📄 Resume uploaded</li>

                <li>🤖 Resume analyzed</li>

                <li>💼 Job matched with Google SDE</li>

                <li>✉️ Cover Letter generated</li>

              </ul>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default DashboardPreview;