import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Brain,
    FileSignature,
    LogOut,
    Sparkles,
} from "lucide-react";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();

    // =====================================
    // Logout
    // =====================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login", {
            replace: true,
        });

        window.location.reload();
    };

    // =====================================
    // Navigation Items
    // =====================================

    const navigationItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Resume Analysis",
            path: "/resume",
            icon: FileText,
        },
        {
            name: "Job Matching",
            path: "/jobs",
            icon: Briefcase,
        },
        {
            name: "Interview Prep",
            path: "/interview",
            icon: Brain,
        },
        {
            name: "Cover Letter",
            path: "/cover-letter",
            icon: FileSignature,
        },
    ];

    return (

        <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">

            {/* ================================= */}
            {/* Brand */}
            {/* ================================= */}

            <div className="border-b border-slate-100 px-5 py-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-sm">

                        <Sparkles
                            size={21}
                            className="text-white"
                        />

                    </div>

                    <div>

                        <h1 className="text-lg font-bold tracking-tight text-slate-900">
                            CareerCopilot
                        </h1>

                        <p className="text-xs font-medium text-slate-500">
                            AI Career Assistant
                        </p>

                    </div>

                </div>

            </div>

            {/* ================================= */}
            {/* Navigation */}
            {/* ================================= */}

            <nav className="flex-1 space-y-1 px-3 py-5">

                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Workspace
                </p>

                {navigationItems.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `
                                group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200
                                ${
                                    isActive
                                        ? "bg-blue-50 text-blue-700 shadow-sm"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }
                                `
                            }
                        >

                            {({ isActive }) => (
                                <>
                                    <Icon
                                        size={19}
                                        strokeWidth={
                                            isActive ? 2.4 : 2
                                        }
                                        className={
                                            isActive
                                                ? "text-blue-600"
                                                : "text-slate-500 group-hover:text-slate-700"
                                        }
                                    />

                                    <span>
                                        {item.name}
                                    </span>

                                </>
                            )}

                        </NavLink>

                    );

                })}

            </nav>

            {/* ================================= */}
            {/* Bottom Section */}
            {/* ================================= */}

            <div className="border-t border-slate-100 p-3">

                {/* User Profile */}

                <div className="mb-2 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        U
                    </div>

                    <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-slate-800">
                            Career Profile
                        </p>

                        <p className="text-xs text-slate-500">
                            Your workspace
                        </p>

                    </div>

                </div>

                {/* Logout */}

                <button
                    type="button"
                    onClick={handleLogout}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                >

                    <LogOut
                        size={19}
                        className="text-slate-500 transition-colors group-hover:text-red-500"
                    />

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>

    );
};

export default Sidebar;