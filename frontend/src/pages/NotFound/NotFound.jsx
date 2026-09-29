import {
    ArrowLeft,
    ArrowRight,
    Home,
    SearchX,
    Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

                <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
                <div className="w-full max-w-2xl text-center">

                    {/* Brand */}
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="mx-auto mb-10 flex items-center justify-center gap-3"
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

                    {/* Illustration */}
                    <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-3xl border border-blue-100 bg-white shadow-lg shadow-slate-200/50">
                        <SearchX
                            size={42}
                            strokeWidth={1.7}
                            className="text-blue-600"
                        />
                    </div>

                    {/* 404 */}
                    <p className="text-7xl font-black tracking-tight text-blue-600 sm:text-8xl">
                        404
                    </p>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Page not found
                    </h1>

                    <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
                        The page you're looking for doesn't exist or may have
                        been moved. Let's get you back to your career workspace.
                    </p>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-600/30 sm:w-auto"
                        >
                            <ArrowLeft
                                size={17}
                                className="transition-transform duration-200 group-hover:-translate-x-0.5"
                            />

                            Back to Dashboard
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:w-auto"
                        >
                            <Home size={17} />

                            Go to Home

                            <ArrowRight
                                size={16}
                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                        </button>
                    </div>

                    {/* Small footer */}
                    <p className="mt-10 text-xs text-slate-400">
                        CareerCopilot · Your AI-powered career workspace
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;