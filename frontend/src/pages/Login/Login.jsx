import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    Sparkles,
    ArrowRight,
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

        if (loading) return;

        setError("");
        setLoading(true);

        try {
            const response = await loginUser(formData);
            const token = response.data.data.token;

            await login(token);

            navigate("/dashboard", {
                replace: true,
            });
        } catch (error) {
            console.error("Login error:", error);

            const message =
                error.response?.data?.message ||
                error.message ||
                "Login failed. Please check your credentials.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">

            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />

            <div className="relative w-full max-w-md">

                {/* Brand */}
                <div className="mb-8 text-center">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200">
                        <Sparkles
                            size={27}
                            strokeWidth={2.2}
                            className="text-white"
                        />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        CareerCopilot
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Your AI-powered career assistant
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-8">

                    <div className="mb-7">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Welcome back
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Sign in to continue your career journey.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                            <p className="text-sm font-medium text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Email address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={18}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    disabled={loading}
                                    className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50"
                                />

                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Password
                                </label>
                            </div>

                            <div className="relative">

                                <LockKeyhole
                                    size={18}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    disabled={loading}
                                    className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    disabled={loading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>
                        </div>

                        {/* Login button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in

                                    <ArrowRight
                                        size={17}
                                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                                    />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Register */}
                    <div className="mt-7 border-t border-slate-100 pt-6 text-center">

                        <p className="text-sm text-slate-500">
                            Don't have an account?{" "}

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() =>
                                    navigate("/register")
                                }
                                className="font-semibold text-blue-600 transition hover:text-blue-700 disabled:opacity-50"
                            >
                                Create account
                            </button>
                        </p>

                    </div>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-slate-400">
                    Build your career with smarter preparation.
                </p>

            </div>
        </div>
    );
};

export default Login;