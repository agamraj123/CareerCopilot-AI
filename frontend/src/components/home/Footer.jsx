import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, ArrowUp, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-2">

              <Sparkles
                className="text-blue-500"
                size={30}
              />

              <h2 className="text-2xl font-bold text-white">

                CareerCopilot AI

              </h2>

            </div>

            <p className="mt-5 leading-8">

              Your AI-powered placement companion for Resume Analysis,
              ATS Optimization, Job Match Analysis, and AI Cover Letter
              Generation.

            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="text-xl font-semibold text-white">

              Product

            </h3>

            <ul className="space-y-3 mt-6">

              <li>

                <a href="#features" className="hover:text-white transition">

                  Features

                </a>

              </li>

              <li>

                <a href="#how-it-works" className="hover:text-white transition">

                  How It Works

                </a>

              </li>

              <li>

                <a href="#faq" className="hover:text-white transition">

                  FAQ

                </a>

              </li>

            </ul>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold text-white">

              Quick Links

            </h3>

            <ul className="space-y-3 mt-6">

              <li>

                <Link
                  to="/login"
                  className="hover:text-white transition"
                >

                  Login

                </Link>

              </li>

              <li>

                <Link
                  to="/register"
                  className="hover:text-white transition"
                >

                  Register

                </Link>

              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold text-white">

              Connect

            </h3>

            <div className="flex gap-4 mt-6">

              <a
                href="https://github.com/agamraj123"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://linkedin.com/in/Agam-Raj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="mailto:agamr9822@gmail.com"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <Mail size={20} />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-700 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-slate-400">

            © {new Date().getFullYear()} CareerCopilot AI. All Rights Reserved.

          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white transition"
          >

            Back to Top

            <ArrowUp size={18} />

          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;