import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Navbar = () => {

    return (

        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo */}

                <Link
                    to="/"
                    className="flex items-center gap-2"
                >

                    <Sparkles
                        className="text-blue-600"
                        size={30}
                    />

                    <h1 className="text-2xl font-bold">

                        CareerCopilot AI

                    </h1>

                </Link>

                {/* Navigation */}

                <nav className="hidden md:flex items-center gap-8">

                    <a href="#features">Features</a>

                    <a href="#how-it-works">How It Works</a>

                    <a href="#faq">FAQ</a>

                </nav>

                {/* Buttons */}

                <div className="flex items-center gap-3">

                    <Link
                        to="/login"
                        className="px-5 py-2 rounded-xl hover:bg-slate-100 transition"
                    >

                        Login

                    </Link>

                    <Link
                        to="/register"
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                    >

                        Get Started

                    </Link>

                </div>

            </div>

        </header>

    );

};

export default Navbar;