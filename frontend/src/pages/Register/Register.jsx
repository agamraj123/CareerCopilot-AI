import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    Sparkles,
    User,
} from "lucide-react";

import { registerUser } from "../../api/authApi";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await registerUser(formData);

            alert("Registration successful! Please login.");

            navigate("/login");
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Registration failed. Please try again.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

                <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
                <div className="w-full max-w-md">

                    {/* Branding */}
                    <div className="mb-8 text-center">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="mx-auto flex items-center justify-center gap-3"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
                                <Sparkles
                                    size={21}
                                    strokeWidth={2.3}
                                    className="text-white"
                                />
                            </div>

                            <div className="text-left">
                                <p className="text-lg font-bold tracking-tight text-slate-900">
                                    CareerCopilot
                                </p>

                                <p className="text-xs font-medium text-slate-500">
                                    AI Career Assistant
                                </p>
                            </div>
                        </button>
                    </div>

                    {/* Main Card */}
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">

                        {/* Header */}
                        <div className="mb-7">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                                <Sparkles size={13} />

                                Build your career profile
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                                Create your account
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Start using AI to analyze your resume, match jobs,
                                and prepare for interviews.
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div
                                role="alert"
                                className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium leading-5 text-red-600"
                            >
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* =========================
                                NAME
                            ========================== */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Full Name
                                </label>

                                <div className="relative">
                                    <User
                                        size={18}
                                        strokeWidth={2}
                                        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        autoComplete="name"
                                        required
                                        style={{
                                            paddingLeft: "48px",
                                            paddingRight: "16px",
                                        }}
                                        className="box-border w-full rounded-xl border border-slate-200 bg-white py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>
                            </div>

                            {/* =========================
                                EMAIL
                            ========================== */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        strokeWidth={2}
                                        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
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
                                        style={{
                                            paddingLeft: "48px",
                                            paddingRight: "16px",
                                        }}
                                        className="box-border w-full rounded-xl border border-slate-200 bg-white py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>
                            </div>

                            {/* =========================
                                PASSWORD
                            ========================== */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    {/* Lock icon */}
                                    <LockKeyhole
                                        size={18}
                                        strokeWidth={2}
                                        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                        required
                                        style={{
                                            paddingLeft: "48px",
                                            paddingRight: "52px",
                                        }}
                                        className="box-border w-full rounded-xl border border-slate-200 bg-white py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />

                                    {/* Password visibility */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (previous) => !previous
                                            )
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account

                                        <ArrowRight
                                            size={17}
                                            strokeWidth={2.2}
                                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                                        />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Login */}
                        <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                            <p className="text-sm text-slate-500">
                                Already have an account?{" "}

                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="font-semibold text-blue-600 transition hover:text-blue-700"
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="mt-6 text-center text-xs text-slate-400">
                        Your AI-powered career workspace
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;