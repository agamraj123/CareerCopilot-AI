import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Sparkles,
} from "lucide-react";

import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await loginUser(formData);
            const token = response.data.data.token;

            await login(token);

            navigate("/dashboard", { replace: true });
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                    "Unable to sign in. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-[70px] h-[70px] rounded-[20px] bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                            <Sparkles
                                size={36}
                                strokeWidth={2}
                                className="text-white"
                            />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-blue-950">
                        CareerCopilot
                    </h1>

                    <p className="mt-1 text-base text-slate-500">
                        Your AI-powered career assistant
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/60 p-7 sm:p-8">
                    <div className="mb-7">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Welcome back
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Sign in to continue your career journey.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-slate-700 mb-2"
                            >
                                Email address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={19}
                                    strokeWidth={1.8}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    disabled={loading}
                                    className="w-full h-12 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                                    style={{
                                        paddingLeft: "48px",
                                        paddingRight: "16px",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-slate-700"
                                >
                                    Password
                                </label>
                            </div>

                            <div className="relative">
                                <Lock
                                    size={19}
                                    strokeWidth={1.8}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                />

                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    disabled={loading}
                                    className="w-full h-12 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                                    style={{
                                        paddingLeft: "48px",
                                        paddingRight: "52px",
                                    }}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    disabled={loading}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition disabled:opacity-50"
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold flex items-center justify-center gap-2 shadow-md shadow-blue-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <span className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight size={19} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Register */}
                    <div className="mt-7 text-center">
                        <p className="text-sm text-slate-500">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-slate-400 mt-6">
                    Build your career with smarter preparation.
                </p>
            </div>
        </div>
    );
};

export default Login;